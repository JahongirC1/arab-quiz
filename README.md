# Arab yarimoroli mamlakatlari — interaktiv sayt

Oʻzbekiston davlat jahon tillari universiteti · Mamlakatshunoslik fani

## Fayllar

| Fayl | Vazifasi |
|---|---|
| `server.js` | Server. Tegmasangiz ham boʻladi |
| `data.js` | **Barcha matn va savollar shu yerda.** Oʻzgartirish faqat shu faylda |
| `public/index.html` | Oʻquvchi sahifasi |
| `public/admin.html` | Admin sahifasi |
| `public/uslub.css` | Dizayn |
| `public/umumiy.js` | Yordamchi kod |
| `package.json` | Render uchun sozlama |

## Ishga tushirish (kompyuterda)

```
node server.js
```
Keyin brauzerda: `http://localhost:3000`

## Manzillar

- Oʻquvchi: `/`
- Admin: `/admin.html`

## Admin paroli

Standart parol: **ustoz2026**

Render'da oʻzgartirish uchun `ADMIN_PAROL` nomli Environment Variable qoʻshing.

## Yangi savol qoʻshish

`data.js` faylini oching, kerakli boʻlimning `questions` roʻyxatiga qoʻshing:

```js
{ q: "Savol matni?", o: ["A varianti","B varianti","C varianti","D varianti"], a: 1, e: "Izoh" }
```

`a: 1` — toʻgʻri javob raqami. **0 = A, 1 = B, 2 = C, 3 = D**

## Yangi boʻlimni toʻldirish

`data.js` da `ready: false` ni `ready: true` ga oʻzgartiring va `stats`, `sections`,
`timeline`, `questions` boʻlimlarini toʻldiring. Namuna sifatida Nabatiylar boʻlimiga qarang.

## Render.com ga joylash

1. GitHub'ga yangi repository ochib, shu papkadagi hamma faylni yuklang
2. Render.com → New → Web Service → repository'ni tanlang
3. Sozlamalar:
   - Build Command: (boʻsh qoldiring)
   - Start Command: `node server.js`
4. Environment Variables:
   - `ADMIN_PAROL` = oʻz parolingiz
   - `SAYT_URL` = Render bergan manzil (masalan `https://arab-quiz.onrender.com`) — sayt uxlab qolmasligi uchun
