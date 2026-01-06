# 🎨 Algoritmik Görüntü İşleme: Alpha Blending

![Tech](https://img.shields.io/badge/Tech-JavaScript%20(Canvas%20API)-yellow)
![Category](https://img.shields.io/badge/Category-Computer%20Graphics-blue)
![Algorithm](https://img.shields.io/badge/Algorithm-Linear%20Interpolation-red)

> **Canlı Demo:** 🌍 [Simülasyonu Canlı İzlemek İçin Tıklayın](https://mehmet-yagli.github.io/js-image-processing-algorithms/)

Bu proje, HTML5 Canvas API kullanarak **ham piksel manipülasyonu (raw pixel manipulation)** yöntemiyle iki görüntünün farklı algoritmalarla harmanlanmasını (Alpha Blending) simüle eder. CSS filtreleri yerine, görüntüler `Uint8ClampedArray` formatında işlenerek matematiksel interpolasyon uygulanmıştır.

---

## 📐 Matematiksel Arkaplan

Alpha Blending işlemi, her pikselin RGB kanalları için **Lineer İnterpolasyon (Lerp)** formülü kullanılarak hesaplanmıştır:

$$C_{out} = \alpha \cdot C_A + (1 - \alpha) \cdot C_B$$

Burada:
* $C_{out}$: Çıktı piksel değeri (Output Pixel)
* $C_A$: Ön plan piksel değeri (Image A)
* $C_B$: Arka plan piksel değeri (Image B)
* $\alpha$: Opaklık katsayısı ($0 \le \alpha \le 1$)

---

## 🚀 Özellikler & Algoritmalar

Proje üç farklı blending tekniğini içerir:

### 1. Statik Blending (Static)
Tüm pikseller sabit bir $\alpha$ değeri (örn: 0.5) ile işlenir.

### 2. Konumsal Blending (Positional - Radial)
Alpha değeri pikselin merkeze olan uzaklığına göre dinamik hesaplanır. Merkezde görüntü A, kenarlarda görüntü B ağırlıklıdır.

$$\alpha(x, y) = 1 - \frac{\sqrt{(x - x_c)^2 + (y - y_c)^2}}{d_{max}}$$

### 3. Zamansal Blending (Temporal - Animation)
Alpha değeri zamanın bir fonksiyonu olarak sinüzoidal dalga şeklinde değişir, bu da nefes alma (breathing) efekti yaratır.

$$\alpha(t) = \frac{\sin(t) + 1}{2}$$

---

## 🛠️ Kurulum ve Çalıştırma

Bu proje herhangi bir kütüphane gerektirmez. Doğrudan tarayıcıda çalışır.

1.  Repoyu klonlayın veya indirin.
2.  Klasör içine `imageA.png` ve `imageB.png` adında iki görsel ekleyin.
3.  `index.html` dosyasını tarayıcınızda açın.

---

## 👨‍💻 Geliştirici Notu
Bu çalışma, bilgisayar grafiklerinin temeli olan piksel dizisi (pixel array) işleme mantığını kavramak amacıyla JavaScript kullanılarak geliştirilmiştir.
