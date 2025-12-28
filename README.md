# 🎓 Exam.az - İmtahan Mərc Oyunu

**⚠️ YALNIZ ƏYLƏNCƏ MƏQSƏDLƏ ŞAKA PROYEKTİ - REAL PUL VƏ MƏRC YOXDUR! ⚠️**

Misli.az dizaynından ilham alan bu layihə universitet imtahanlarını "mərc matçları" kimi təqdim edən əyləncəli bir veb tətbiqdir.

---

## 📋 Layihə Haqqında

Bu layihə real mərc saytı **DEYİL**! Universitet tələbələrinin imtahan nəticələri üzərində şaka mərcləri etməsinə imkan verən tamamilə əyləncə məqsədli veb saytdır.

### ✨ Xüsusiyyətlər

- 🎨 **Misli.az stil dizayn** - Professional betting sayt görünüşü
- 📊 **5 İmtahan Fənni** - Statistika, Təhlükəsizlik, Modelləşmə, Süni İntellekt, Maşın Öyrənmə
- 👥 **27 Tələbə** - 3 kateqoriyaya bölünmüş (Güclü, Orta, Zəif)
- 💰 **Dinamik Əmsal Sistemi** - Tələbə kategoriyasına əsaslanan realistik əmsallar
- 🎯 **Müxtəlif Mərc Növləri**:
  - Kəsiləcək/Keçəcək
  - 100 bal alacaq
  - Kəsilən tələbə sayı
  - 90+, 80+, 70+ alacaqlar
  - Over/Under sistemi (100 bal alanların sayı)
  - Hər tələbə üçün fərdi əmsallar
- 📱 **Responsive dizayn** - Mobil uyğun
- 🎫 **Kupon sistemi** - Mərc seçimləri, ümumi əmsal hesablama

---

## 🚀 Quraşdırma və İstifadə

### Addım 1: Faylları açın
Sadəcə `index.html` faylını brauzerdə açın.

```bash
# Windows-də
start index.html

# Və ya faylı ikiqat klikləyin
```

### Addım 2: İstifadə edin
1. İmtahan kartına klikləyərək açın
2. İstədiyiniz mərc seçimlərinə klikləyin
3. Sağ tərəfdəki kuponda seçimlərinizi görün
4. "MƏRC ET" düyməsinə basın (şaka alert çıxacaq)

---

## 📁 Layihə Strukturu

```
qumar/
│
├── index.html          # Əsas HTML faylı
├── css/
│   └── style.css       # Bütün stil kodları
├── js/
│   ├── data.js         # Mock data (tələbələr, əmsallar)
│   └── app.js          # JavaScript funksionallıq
└── README.md           # Bu fayl
```

---

## 🎯 Mərc Növləri

### 1. Ümumi Mərclər
- **Kəsiləcək** - İmtahandan kəsilən olacaqmı?
- **100 Bal Alacaq** - Kimsə tam bal alacaqmı?

### 2. Kəsilən Tələbə Sayı
1, 2, 3, 4, 5 və ya 6+ nəfər seçimi

### 3. Bal Aralığı
- 90+ alacaq
- 80+ alacaq
- 70+ alacaq

### 4. Over/Under (100 Bal Alanlar)
```
1.5 üst/alt
2.5 üst/alt
3.5 üst/alt
4.5 üst/alt
5.5 üst/alt
6.5 üst/alt
```

### 5. Tələbə Spesifik
Hər tələbə üçün:
- 90+ bal əmsalı
- 100 bal əmsalı

---

## 👥 Tələbə Kateqoriyaları və Əmsallar

### Güclü Tələbələr (1.20 - 1.80)
Onur, Isa, Hüseyn, Coşqun, Diana, Kaan, Kamran, Zülfiyyə, Təbriz

### Orta Tələbələr (1.80 - 2.80)
Ayan, Ayaz, Elnarə, Fəxriyyə, İslam, Prabesh, Səma, Şükufə

### Zəif Tələbələr (2.80 - 4.50)
Sebuhi, Seyfi, Rəhim, Aslan, Nihad, Mütəllib, Fidan, İsmayıl, Abbas Haider

---

## 🛠️ Texnologiyalar

- **HTML5** - Struktur
- **CSS3** - Styling (Flexbox, Grid, Animations)
- **JavaScript (ES6+)** - Funksionallıq
- **No frameworks** - Vanilla JavaScript

---

## 🎨 Dizayn Elementləri

### Rəng Paleti
- **Primary**: `#ff4500` (Orange)
- **Secondary**: `#00a651` (Green)
- **Background**: `#1a1a1a` (Dark)
- **Cards**: `#232323`
- **Odds**: `#ffbb33` (Yellow)

### Komponentlər
- Expandable accordion cards
- Hover effects
- Click-to-select odds buttons
- Live betslip calculator
- Responsive grid layouts

---

## 📝 Kod Strukturu

### data.js
```javascript
- students: Bütün tələbələr və kateqoriyaları
- exams: 5 imtahan fənni
- generateOdds(): Kateqoriyaya görə əmsal yaradır
- generateBettingOptions(): Mərc seçimlərini yaradır
```

### app.js
```javascript
- betSlip[]: Seçilmiş mərcləri saxlayır
- renderExamCards(): İmtahan kartlarını yaradır
- addToBetslip(): Kupon əlavə edir
- updateBetslipUI(): Kuponu yeniləyir
- calculateOdds(): Ümumi əmsalı hesablayır
```

---

## 🎭 Xüsusi Funksiyalar

### 1. Dinamik Əmsal Generasiyası
```javascript
function generateOdds(category) {
    switch(category) {
        case "Güclü": return 1.20 - 1.80
        case "Orta": return 1.80 - 2.80
        case "Zəif": return 2.80 - 4.50
    }
}
```

### 2. Kupon Kalkulyatoru
```javascript
totalOdds = bet1.odds × bet2.odds × bet3.odds × ...
potentialWin = totalOdds × betAmount
```

### 3. Expandable Cards
Akkordion effekti ilə imtahan detallarını açıb bağlayır.

---

## ⚡ Performance

- Minimum JavaScript library
- Optimized CSS animations
- Fast load time (~50KB total)
- No external dependencies

---

## 📱 Responsive Breakpoints

```css
@media (max-width: 1200px) → Tablet landscape
@media (max-width: 992px)  → Tablet portrait
@media (max-width: 768px)  → Mobile landscape
@media (max-width: 480px)  → Mobile portrait
```

---

## 🔮 Gələcək Təkmilləşdirmələr

- [ ] Local Storage ilə kupon saxlama
- [ ] Qaranlıq/İşıqlı modu
- [ ] Daha çox imtahan əlavə etmək
- [ ] Animasiyalı konfeti effekti
- [ ] Səs effektləri
- [ ] Statistika səhifəsi
- [ ] Tələbə profil səhifələri

---

## ⚠️ Vacib Qeydlər

1. **Bu real mərc saytı deyil!**
2. **Heç bir pul əməliyyatı yoxdur**
3. **Yalnız əyləncə məqsədlidir**
4. **Universitet layihəsi üçün hazırlanmışdır**
5. **Real mərc asılılıqlarından uzaq durun!**

---

## 👨‍💻 Müəllif

**Razil**
- 🎓 Universitet tələbəsi
- 💻 Full-stack developer
- 🎨 UI/UX dizayner

---

## 📜 Lisenziya

Bu layihə **yalnız təhsil və əyləncə məqsədlidir**. İstənilən məqsəd üçün istifadə edilə bilər, lakin real mərc platforması kimi istifadə **ETMƏYİN**!

---

## 🙏 Təşəkkürlər

- Misli.az - Dizayn ilhamı üçün
- Bütün sinif yoldaşlarıma - Test data üçün 😄
- İmtahanlarda hamıya uğurlar! 🎓📚

---

**Xatırlatma**: Bu layihə şaka xarakterlidir və real mərc platforması deyil. Real pullu mərc oyunlarından uzaq durun və təhsilinizə fokuslanın! 📖✨
