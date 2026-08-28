/**
 * TO'Y VA TAKLIFNOMA SOZLAMALARI (CONFIGURATION)
 * Ushbu fayldagi ma'lumotlarni o'zingizga moslab osongina o'zgartirishingiz mumkin.
 */
const WEDDING_CONFIG = {
  // Qahramonlar va bosh harflar
  groom: {
    name: "Sardorbek",
    shortName: "Sardor",
    initial: "S"
  },
  bride: {
    name: "Madinabonu",
    shortName: "Madina",
    initial: "M"
  },
  monogram: "S & M",

  // To'y sanasi va vaqti (YYYY-MM-DDTHH:mm:ss formati)
  eventDateTime: "2026-10-18T18:00:00",
  dateFormatted: "18-Oktyabr, 2026",
  dayOfWeek: "Yakshanba",
  startTimeFormatted: "18:00",

  // Shior va iliq so'zlar
  title: "Sardorbek & Madinabonu — Nikoh To‘yiga Taklifnoma",
  quote: "“Ikki qalbning sevgisi va hurmati bir butun bo‘lib, yangi oila deb atalmish muqaddas ostonaga qadam qo‘ymoqdamiz.”",
  hostMessage: "Qadrli va muhtaram mehmonimiz! Sizni hayotimizdagi eng quvonchli va unutilmas lahzalar — visol oqshomimizning aziz mehmoni bo‘lishga lutfan taklif etamiz. Sizning tashrifingiz bizga katta baxt va quvonch bag‘ishlaydi.",
  
  // Ota-onalar va oila a'zolari nomidan
  hosts: "Hurmat bilan: Rahimovlar va Karimovlar xonadoni",

  // O'tadigan joy va Manzil ma'lumotlari
  venue: {
    name: "«Versal Celebration Hall»",
    hall: "Katta Marosimlar Zali",
    address: "Toshkent shahri, Yunusobod tumani, Amir Temur ko‘chasi, 107-A uy",
    landmark: "Mo‘ljal: Yunusobod metrosi, «Oazis» savdo markazi ro‘parasi",
    // Xarita koordinatalari (Toshkent uchun misol)
    latitude: 41.3654,
    longitude: 69.2885,
    // Tezkor havolalar
    yandexMapsUrl: "https://yandex.uz/maps/?text=Versal+Celebration+Hall+Tashkent",
    yandexTaxiUrl: "https://3.redirect.appmetrica.yandex.com/route?end-lat=41.3654&end-lon=69.2885&app=yandex-taxi",
    googleMapsUrl: "https://maps.google.com/?q=41.3654,69.2885",
    twoGisUrl: "https://2gis.uz/tashkent/search/41.3654%2C69.2885"
  },

  // Kun tartibi (Timeline)
  timeline: [
    {
      time: "18:00",
      title: "Mehmonlar Tashrifi",
      desc: "Qizil yo‘lakcha, jonli musiqa va Welcome Drink",
      icon: "🥂"
    },
    {
      time: "19:00",
      title: "Kelin va Kuyov Kirib Kelishi",
      desc: "Tantanali nikoh oqshomi va marosimning ochilishi",
      icon: "✨"
    },
    {
      time: "20:00",
      title: "Shou Dasturi & Tabriklar",
      desc: "Jonli ijro, diltortar kuy-qo‘shiqlar va raqslar",
      icon: "🎵"
    },
    {
      time: "21:30",
      title: "To‘y Torti & Mushakbozlik",
      desc: "Shirin tilaklar va esdalik fotosessiyasi",
      icon: "🎂"
    }
  ],

  // Dres-kod (Dress Code)
  dressCode: {
    title: "Black Tie & Romantic Pastel",
    description: "Bizning bayramimizga yanada ko‘rk bag‘ishlash uchun pastel va klassik ohanglardagi liboslarni tanlashingizni iltimos qilamiz.",
    colors: [
      { name: "Champagne Gold", hex: "#E8D8B8" },
      { name: "Soft Cream", hex: "#FAF3E8" },
      { name: "Dusty Rose", hex: "#D8A49B" },
      { name: "Sage Green", hex: "#A3B18A" },
      { name: "Classic Navy/Black", hex: "#2B2D42" }
    ]
  },

  // Telegram Bot sozlamalari (RSVP javoblarini olish uchun)
  // Haqiqiy bot token va chat_id larni kiritishingiz mumkin:
  telegram: {
    enabled: true,
    // Bot token: Masalan: "123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
    // Bo'sh qoldirilsa tizim javobni chiroyli lokal simulyatsiya qiladi va saqlaydi
    botToken: "", 
    // Chat ID: Sizning profilingiz yoki guruhingiz ID si (masalan: "123456789")
    chatId: ""
  },

  // Fon musiqasi fayli yo'li
  music: {
    title: "Romantic Piano Melody",
    audioSrc: "assets/audio/wedding_music.wav"
  }
};
