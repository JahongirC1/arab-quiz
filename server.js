// ============================================================
//  ARAB YARIMOROLI MAMLAKATLARI — quiz serveri
//  Hech qanday tashqi paket kerak emas (faqat Node.js)
// ============================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const { TOPICS } = require('./data');

const PORT = process.env.PORT || 3000;
const ADMIN_PAROL = process.env.ADMIN_PAROL || 'ustoz2026';

// ---------- XOTIRADAGI XONALAR ----------
const rooms = {};   // { "483920": {...} }

function kodYarat() {
  let k;
  do { k = String(Math.floor(100000 + Math.random() * 900000)); } while (rooms[k]);
  return k;
}

function aralash(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

// Savollarni to'plash: topicId === 'umumiy' bo'lsa hammasini qo'shadi
function savollarOl(topicId) {
  if (topicId === 'umumiy') {
    let all = [];
    TOPICS.forEach(t => { all = all.concat(t.questions.map(q => ({ ...q, _t: t.name }))); });
    return all;
  }
  const t = TOPICS.find(x => x.id === topicId);
  return t ? t.questions.map(q => ({ ...q, _t: t.name })) : [];
}

// ---------- SSE: ulanganlarga xabar yuborish ----------
function yubor(room, hodisa, malumot) {
  const matn = `event: ${hodisa}\ndata: ${JSON.stringify(malumot)}\n\n`;
  room.clients.forEach(res => { try { res.write(matn); } catch (e) {} });
}

function jadval(room) {
  return Object.values(room.players)
    .sort((a, b) => b.score - a.score || b.correct - a.correct)
    .map(p => ({ name: p.name, score: p.score, correct: p.correct }));
}

function holat(room) {
  return {
    phase: room.phase,
    kod: room.kod,
    mavzu: room.mavzuNomi,
    jami: room.qs.length,
    qIdx: room.qIdx,
    vaqt: room.vaqt,
    players: Object.values(room.players).map(p => ({ name: p.name, score: p.score }))
  };
}

// ---------- SAVOL YURITISH ----------
function savolYubor(room) {
  if (room.qIdx >= room.qs.length) return tugat(room);

  const q = room.qs[room.qIdx];
  room.javoblar = {};
  room.savolVaqti = Date.now();

  yubor(room, 'savol', {
    idx: room.qIdx,
    jami: room.qs.length,
    q: q.q,
    o: q.o,
    vaqt: room.vaqt,
    mavzu: q._t
  });

  clearTimeout(room.timer);
  room.timer = setTimeout(() => natijaYubor(room), room.vaqt * 1000 + 700);
}

function natijaYubor(room) {
  clearTimeout(room.timer);
  const q = room.qs[room.qIdx];
  yubor(room, 'javob', { a: q.a, e: q.e, jadval: jadval(room).slice(0, 5) });

  room.qIdx++;
  if (room.qIdx >= room.qs.length) {
    setTimeout(() => tugat(room), 4000);
  } else {
    room.oraliq = setTimeout(() => savolYubor(room), 4000);
  }
}

function tugat(room) {
  clearTimeout(room.timer);
  clearTimeout(room.oraliq);
  room.phase = 'tugadi';
  yubor(room, 'tugadi', { jadval: jadval(room) });
}

// ---------- YORDAMCHILAR ----------
function jsonOqi(req, cb) {
  let d = '';
  req.on('data', c => { d += c; if (d.length > 1e5) req.destroy(); });
  req.on('end', () => { try { cb(JSON.parse(d || '{}')); } catch (e) { cb({}); } });
}

function javobJson(res, kod, obj) {
  res.writeHead(kod, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

// ============================================================
//  SERVER
// ============================================================
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const yol = url.pathname;

  // ---------- API ----------

  // Mavzular ro'yxati (dars sahifasi uchun)
  if (yol === '/api/mavzular') {
    return javobJson(res, 200, {
      topics: TOPICS.map(t => ({
        id: t.id, name: t.name, tagline: t.tagline, icon: t.icon, ready: t.ready,
        stats: t.stats, sections: t.sections, timeline: t.timeline,
        savolSoni: t.questions.length
      }))
    });
  }

  // Mashq testi savollari (javoblari bilan — mashq uchun ruxsat)
  if (yol === '/api/mashq') {
    const id = url.searchParams.get('mavzu') || 'umumiy';
    const qs = aralash(savollarOl(id)).slice(0, 10);
    return javobJson(res, 200, { qs });
  }

  // --- ADMIN: xona ochish ---
  if (yol === '/api/xona' && req.method === 'POST') {
    return jsonOqi(req, d => {
      if (d.parol !== ADMIN_PAROL) return javobJson(res, 403, { xato: 'Parol noto\u02bbg\u02bbri' });

      const barcha = savollarOl(d.mavzu || 'umumiy');
      if (!barcha.length) return javobJson(res, 400, { xato: 'Bu bo\u02bblimda hali savol yo\u02bbq' });

      const soni = Math.min(+d.soni || 10, barcha.length);
      const qs = (d.aralash ? aralash(barcha) : barcha).slice(0, soni);
      const kod = kodYarat();
      const mavzuNomi = d.mavzu === 'umumiy' ? 'Umumiy test' : (TOPICS.find(t => t.id === d.mavzu) || {}).name;

      rooms[kod] = {
        kod, phase: 'kutish', qs, qIdx: 0,
        vaqt: Math.min(Math.max(+d.vaqt || 20, 5), 120),
        mavzuNomi, players: {}, clients: [], javoblar: {},
        yaratilgan: Date.now(), token: 'a' + Math.random().toString(36).slice(2)
      };
      return javobJson(res, 200, { kod, token: rooms[kod].token, jami: qs.length, mavzu: mavzuNomi });
    });
  }

  // --- ADMIN: boshlash / to'xtatish ---
  if (yol === '/api/boshqar' && req.method === 'POST') {
    return jsonOqi(req, d => {
      const room = rooms[d.kod];
      if (!room) return javobJson(res, 404, { xato: 'Xona topilmadi' });
      if (d.token !== room.token) return javobJson(res, 403, { xato: 'Ruxsat yo\u02bbq' });

      if (d.amal === 'boshla' && room.phase === 'kutish') {
        room.phase = 'ketmoqda';
        yubor(room, 'boshlandi', { jami: room.qs.length, vaqt: room.vaqt });
        setTimeout(() => savolYubor(room), 2500);
      }
      if (d.amal === 'toxtat') tugat(room);
      if (d.amal === 'ochir') { tugat(room); delete rooms[d.kod]; }

      return javobJson(res, 200, { ok: true, holat: room.phase });
    });
  }

  // --- O'QUVCHI: xonaga kirish ---
  if (yol === '/api/kir' && req.method === 'POST') {
    return jsonOqi(req, d => {
      const room = rooms[d.kod];
      if (!room) return javobJson(res, 404, { xato: 'Bunday kodli xona topilmadi' });
      if (room.phase !== 'kutish') return javobJson(res, 400, { xato: 'Test allaqachon boshlangan' });

      const ism = String(d.ism || '').trim().slice(0, 28);
      if (!ism) return javobJson(res, 400, { xato: 'Ismingizni kiriting' });

      const bor = Object.values(room.players).some(p => p.name.toLowerCase() === ism.toLowerCase());
      if (bor) return javobJson(res, 400, { xato: 'Bu ism band. Boshqasini kiriting' });

      const pid = 'p' + Date.now() + Math.floor(Math.random() * 999);
      room.players[pid] = { name: ism, score: 0, correct: 0 };
      yubor(room, 'royxat', { players: Object.values(room.players).map(p => p.name) });

      return javobJson(res, 200, { pid, mavzu: room.mavzuNomi, jami: room.qs.length });
    });
  }

  // --- O'QUVCHI: javob berish ---
  if (yol === '/api/javob' && req.method === 'POST') {
    return jsonOqi(req, d => {
      const room = rooms[d.kod];
      if (!room || room.phase !== 'ketmoqda') return javobJson(res, 400, { xato: 'Faol test yo\u02bbq' });
      const p = room.players[d.pid];
      if (!p) return javobJson(res, 403, { xato: 'Ishtirokchi topilmadi' });
      if (d.idx !== room.qIdx) return javobJson(res, 400, { xato: 'Savol o\u02bbtib ketdi' });
      if (room.javoblar[d.pid] !== undefined) return javobJson(res, 400, { xato: 'Javob berilgan' });

      room.javoblar[d.pid] = d.tanlov;
      const q = room.qs[room.qIdx];
      const togri = d.tanlov === q.a;
      let ball = 0;

      if (togri) {
        const ketgan = (Date.now() - room.savolVaqti) / 1000;
        ball = Math.max(200, Math.round(1000 * (1 - Math.min(ketgan / room.vaqt, 1) * 0.8)));
        p.score += ball; p.correct++;
      }

      // hamma javob bergan bo'lsa — kutmasdan davom etamiz
      if (Object.keys(room.javoblar).length >= Object.keys(room.players).length) {
        clearTimeout(room.timer);
        setTimeout(() => natijaYubor(room), 600);
      }

      return javobJson(res, 200, { togri, ball, jami: p.score });
    });
  }

  // --- SSE oqim ---
  if (yol === '/api/oqim') {
    const kod = url.searchParams.get('kod');
    const room = rooms[kod];
    if (!room) { res.writeHead(404); return res.end(); }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    });
    res.write(`event: holat\ndata: ${JSON.stringify(holat(room))}\n\n`);
    room.clients.push(res);

    const puls = setInterval(() => { try { res.write(': puls\n\n'); } catch (e) {} }, 25000);
    req.on('close', () => {
      clearInterval(puls);
      const i = room.clients.indexOf(res);
      if (i > -1) room.clients.splice(i, 1);
    });
    return;
  }

  // --- Render uxlab qolmasligi uchun ---
  if (yol === '/ping') { res.writeHead(200); return res.end('pong'); }

  // ---------- STATIK FAYLLAR ----------
  let fayl = yol === '/' ? '/index.html' : yol;
  const toliq = path.join(__dirname, 'public', path.normalize(fayl).replace(/^(\.\.[\/\\])+/, ''));

  fs.readFile(toliq, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Sahifa topilmadi'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(toliq)] || 'application/octet-stream' });
    res.end(buf);
  });
});

// ---------- Eski xonalarni tozalash (3 soat) ----------
setInterval(() => {
  const hozir = Date.now();
  Object.keys(rooms).forEach(k => {
    if (hozir - rooms[k].yaratilgan > 3 * 3600 * 1000) {
      tugat(rooms[k]); delete rooms[k];
    }
  });
}, 10 * 60 * 1000);

// ---------- SELF-PING (Render uxlab qolmasligi uchun) ----------
const SAYT = process.env.SAYT_URL;
if (SAYT) {
  setInterval(() => {
    require('https').get(SAYT.replace(/\/$/, '') + '/ping', r => r.resume())
      .on('error', () => {});
  }, 8 * 60 * 1000);
}

server.listen(PORT, () => console.log('Server ishga tushdi: http://localhost:' + PORT));
