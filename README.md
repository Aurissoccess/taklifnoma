# 💍 Romantik va Minimalist Interaktiv Online Taklifnoma

> Zamonaviy, nafis, romantik va 100% Mobile-First online nikoh to‘yi taklifnomasi.

---

## 🌟 Asosiy Imkoniyatlar va Xususiyatlar

1. **💌 Interaktiv Kirish Qatlami (Intro Gate)**:
   - 3D nafis konvert, monogramma va tebranish effekti bilan ishlovchi mumli muhr (wax seal).
   - "Taklifnomani ochish" tugmasi bosilganda konvert ochiladi va fonda yoqimli romantik pianino kuylari (Web Audio Synthesizer) avtomatik tarzda boshlanadi. Bu brauzerlarning audio autoplay blokirovkasini to'liq yechadi.

2. **👤 Dinamik Shaxsiy Murojaat (Personalized Guest URL)**:
   - Har bir mehmonga alohida nom bilan havola yuborish imkoniyati:
     - `https://sizning-sayt.uz/?guest=Sardorbek`
     - `https://sizning-sayt.uz/?guest=Azizbek+va+Guli`
     - Sayt avtomatik ravishda *"Hurmatli Azizbek va Guli, sizni..."* deb moslashadi va RSVP formasida ism avtomatik to'ldiriladi.

3. **⏳ Jonli Countdown Taymer**:
   - To'y boshlanishigacha qolgan vaqtni real vaqt rejimida (Kun, Soat, Daqiqa, Soniya) hisoblaydi.

4. **📅 Kalendarga Qo‘shish**:
   - **Google Calendar**: Bitta bosish bilan Google taqvimida eslatma yaratish.
   - **Apple Calendar (.ics)**: iPhone va Mac foydalanuvchilari uchun to'y sanasi va manzilini o'z ichiga olgan kalendar faylini yuklash.

5. **🗺️ Lokatsiya & Tezkor Navigatsiya Tugmalari**:
   - 🚕 **Yandex Go**: Bitta bosish bilan to'yxonaga taksi chaqirish havolasi.
   - 🗺️ **Yandex Maps**
   - 📍 **Google Maps**
   - 🟢 **2GIS**

6. **👗 Kun Tartibi (Timeline) & Dres-kod (Dress Code)**:
   - Marosim soatlari va vizual pastel ranglar palitrasi doirachalari.

7. **✉️ RSVP (Tashrifni Tasdiqlash) & Telegram Bot**:
   - Mehmon ismini kiritadi, tashrif holatini tanlaydi va ezgu tilaklarini yozadi.
   - "Yuborish" bosilganda ma'lumotlar to'g'ridan-to'g'ri Telegram Botga kelib tushadi hamda sahifada bayramona konfetti va yurakchalar yog'iladi.

8. **🎵 Suzuvchi Musiqa Pleyeri**:
   - Ekranning o'ng pastki qismida aylanib turuvchi nafis mini-disk (Musiqani to'xtatish / yoqish).

---

## ⚙️ Qanday Qilib O'zgartirish va Sozlash Mumkin?

Loyiha juda qulay va modulli tuzilgan. Barcha asosiy ma'lumotlarni [`config.js`](file:///c:/Users/Victus/Desktop/taklifnoma/config.js) fayli orqali bir necha daqiqada o'zgartirishingiz mumkin:

```javascript
const WEDDING_CONFIG = {
  // Qahramonlar
  groom: { name: "Sardorbek", initial: "S" },
  bride: { name: "Madinabonu", initial: "M" },
  monogram: "S & M",

  // Sana va vaqt
  eventDateTime: "2026-10-18T18:00:00",
  dateFormatted: "18-Oktyabr, 2026",
  dayOfWeek: "Yakshanba",
  startTimeFormatted: "18:00",

  // To'yxona va Manzil
  venue: {
    name: "«Versal Celebration Hall»",
    hall: "Katta Marosimlar Zali",
    address: "Toshkent shahri, Yunusobod tumani, Amir Temur ko‘chasi, 107-A uy",
    landmark: "Mo‘ljal: Yunusobod metrosi",
    latitude: 41.3654,
    longitude: 69.2885
  },

  // Telegram Bot sozlamalari (Ixtiyoriy)
  telegram: {
    enabled: true,
    botToken: "BOT_TOKEN_SHU_YERGA", 
    chatId: "SIZNING_CHAT_ID"
  }
};
```

---

## 🤖 Telegram Botni Ulash (RSVP xabarlari uchun)

1. Telegramda [@BotFather](https://t.me/BotFather) ga kiring va `/newbot` buyrug'i orqali yangi bot yarating.
2. Bot bergan `HTTP API Token`ni nusxalang.
3. Chat ID ni bilish uchun [@userinfobot](https://t.me/userinfobot) ga `/start` yuboring va `Id` raqamingizni oling.
4. [`config.js`](file:///c:/Users/Victus/Desktop/taklifnoma/config.js) faylidagi `botToken` va `chatId` qatorlariga joylashtiring.
5. Telegram botingizga kiring va bir marotaba `/start` tugmasini bosing (bu bot sizga xabar yubora olishi uchun zarur).

---

## 🚀 Saytni Internetga Joylashtirish (Hosting)

Loyiha toza HTML, CSS va JavaScript asosida yaratilgani sababli uni istalgan bepul platformaga 1 daqiqada joylashtirish mumkin:
- **Vercel** / **Netlify** — Fayllarni shunchaki Drag & Drop orqali yuklang.
- **GitHub Pages** — Repository ochib `gh-pages` orqali yoqing.
