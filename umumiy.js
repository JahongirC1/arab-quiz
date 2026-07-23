// Umumiy yordamchi funksiyalar (ikkala sahifa uchun)

const $ = id => document.getElementById(id);

function esc(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function post(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()).catch(() => ({ xato: 'Ulanishda xatolik' }));
}

// Sahifalar orasida almashish
document.querySelectorAll('nav button[data-p]').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('nav button').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.page').forEach(x => x.classList.remove('on'));
    b.classList.add('active');
    $(b.dataset.p).classList.add('on');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
});

// 1-2-3 o'rin podiumi
function podium(box, jadval) {
  const rang = ['#C98B3A', '#9AA0A6', '#B85042'];
  const med = ['🥇', '🥈', '🥉'];
  const bal = [132, 112, 96];
  box.innerHTML = '';
  [1, 0, 2].forEach(i => {
    if (!jadval[i]) return;
    const d = document.createElement('div');
    d.className = 'pod';
    d.style.background = rang[i];
    d.style.height = bal[i] + 'px';
    d.innerHTML = `<div class="m">${med[i]}</div><b>${esc(jadval[i].name)}</b><span>${jadval[i].score} ball</span>`;
    box.appendChild(d);
  });
}

// To'liq natijalar jadvali
function jadvalChiz(tbl, jadval) {
  const med = ['🥇', '🥈', '🥉'];
  if (!jadval.length) {
    tbl.innerHTML = '<tr><td class="mini" style="text-align:center">Natijalar yoʻq</td></tr>';
    return;
  }
  tbl.innerHTML =
    '<thead><tr><th>Oʻrin</th><th>Ishtirokchi</th><th>Toʻgʻri</th><th>Ball</th></tr></thead><tbody>' +
    jadval.map((p, i) =>
      `<tr class="${i < 3 ? 'r' + (i + 1) : ''}">
         <td class="rank">${i < 3 ? med[i] : i + 1}</td>
         <td>${esc(p.name)}</td>
         <td>${p.correct}</td>
         <td><b>${p.score}</b></td>
       </tr>`).join('') + '</tbody>';
}
