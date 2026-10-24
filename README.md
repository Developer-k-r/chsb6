# CHSB-1 onlayn test (6-sinf matematika)

O‘quvchilar telefonidan test yechadi, natija o‘qituvchining Google jadvaliga tushadi.

- `index.html` — o‘quvchi sahifasi (test).
- `teacher.html` — o‘qituvchi paneli: test havolasini yaratish va natijalarni ko‘rish.
- `apps-script/Code.gs` — Google jadvalga natija yozuvchi skript.
- `config.js` — skript manzili shu yerga yoziladi.
- `data.js` — 25 savol × 12 masala (300 ta, javoblari kod bilan tekshirilgan).

## 1. Google jadval va skriptni sozlash (bir marta, ~5 daqiqa)

1. [sheets.google.com](https://sheets.google.com) da yangi bo‘sh jadval oching, nomini masalan “CHSB natijalari” qo‘ying.
2. Menyudan **Kengaytmalar → Apps Script** (Extensions → Apps Script) ni bosing.
3. Ochilgan oynadagi bor kodni o‘chirib, `apps-script/Code.gs` fayl matnini to‘liq qo‘ying.
4. Kodning boshidagi `KEY = 'MAXFIY-SOZ-NI-ALMASHTIRING'` ni o‘zingizning maxfiy so‘zingizga almashtiring (masalan `KEY = 'Bahor2026'`). Saqlang (💾).
5. O‘ng yuqoridagi **Deploy → New deployment** ni bosing:
   - Turi (Select type, ⚙️): **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - **Deploy** ni bosing, Google ruxsat so‘raydi — o‘z hisobingizni tanlab, ruxsat bering
     (“Google hasn’t verified this app” chiqsa: **Advanced → Go to … (unsafe)** — bu sizning o‘z skriptingiz).
6. Hosil bo‘lgan **Web app URL** (`https://script.google.com/macros/s/…/exec`) ni nusxalang.
7. Shu manzilni `config.js` dagi `endpoint: ""` ichiga yozing.

> Skript kodini keyin o‘zgartirsangiz: **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**. Manzil o‘zgarmaydi.

## 2. Saytni yoqish (GitHub Pages)

Repo → **Settings → Pages → Source: Deploy from a branch → Branch: `main`, `/ (root)` → Save**.
1–2 daqiqadan keyin sayt `https://<foydalanuvchi>.github.io/<repo>/` manzilida ochiladi.

- O‘qituvchi paneli: `…/teacher.html`
- O‘quvchilarga panelda yaratilgan havolani yuborasiz (Telegram orqali).

## 3. Darsda / uyda ishlatish

1. `teacher.html` ni oching → qismlarni tanlang (masalan faqat 1-qism) → vaqtni tekshiring → **Havolani nusxalash**.
2. Havolani o‘quvchilarga yuboring. Har biri ism-familiya va sinfini yozib boshlaydi.
3. Har o‘quvchiga har savoldan 10 ta testdan tasodifiy biri tushadi.
4. Yakunlagach o‘quvchi balini va (yoqilgan bo‘lsa) yechimlarni ko‘radi; natija jadvalga tushadi.
5. Panelda kalitni yozib **Natijalarni yuklash** → test va sinfni tanlang: savollar, qismlar va umumiy o‘zlashtirish foizi, o‘quvchilar ro‘yxati.

## Eslatmalar

- Javoblar sahifa kodida saqlanadi (shifrlanmagan, faqat yashirilgan). Nazorat ishi uchun emas, mashq va diagnostika uchun mo‘ljallangan.
- O‘quvchi sahifani yopib qayta ochsa, javoblari va taymeri saqlanib qoladi. Bir telefonda bitta test bir marta yechiladi.
- Bir natija ikki marta yuborilsa, jadvalga bir marta yoziladi.
- Natijani o‘chirish kerak bo‘lsa — Google jadvaldagi qatorni o‘chiring.
