const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Görüntüleri yükle
const imageA = new Image();
const imageB = new Image();
imageA.src = "imageA.png"; 
imageB.src = "imageB.png"; 

// Görüntüler yüklendiğinde sabit alpha ile harmanlamayı başlat
Promise.all([imageA.decode(), imageB.decode()])
  .then(() => {
    alphaBlending(imageA, imageB, 0.5); 
  })
  .catch((error) => {
    console.error("Görsel yüklenemedi:", error);
  });

// Alpha blending fonksiyonu (sabit alpha)
function alphaBlending(imgA, imgB, alpha) {
  ctx.drawImage(imgB, 0, 0); 
  const imageDataB = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.drawImage(imgA, 0, 0); 
  const imageDataA = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const blendedData = ctx.createImageData(canvas.width, canvas.height);

  for (let i = 0; i < blendedData.data.length; i += 4) {
    blendedData.data[i] =
      alpha * imageDataA.data[i] + (1 - alpha) * imageDataB.data[i]; 
    blendedData.data[i + 1] =
      alpha * imageDataA.data[i + 1] + (1 - alpha) * imageDataB.data[i + 1]; 
    blendedData.data[i + 2] =
      alpha * imageDataA.data[i + 2] + (1 - alpha) * imageDataB.data[i + 2]; 
    blendedData.data[i + 3] = 255; 
  }

  ctx.putImageData(blendedData, 0, 0);
}

// Konuma bağlı α fonksiyonu
function positionalAlpha(x, y) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
  return 1 - distance / maxDistance; // 1'e yakın merkezde, köşelere doğru 0'a yaklaşır
}

// Konumsal alpha blending işlemi
function alphaBlendingPositional(imgA, imgB) {
  ctx.drawImage(imgB, 0, 0);
  const imageDataB = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.drawImage(imgA, 0, 0);
  const imageDataA = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const blendedData = ctx.createImageData(canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;
      const alpha = positionalAlpha(x, y);

      blendedData.data[i] =
        alpha * imageDataA.data[i] + (1 - alpha) * imageDataB.data[i]; 
      blendedData.data[i + 1] =
        alpha * imageDataA.data[i + 1] + (1 - alpha) * imageDataB.data[i + 1]; 
      blendedData.data[i + 2] =
        alpha * imageDataA.data[i + 2] + (1 - alpha) * imageDataB.data[i + 2]; 
      blendedData.data[i + 3] = 255; 
    }
  }

  ctx.putImageData(blendedData, 0, 0);
}

// Zamanlı α fonksiyonu
let t = 0;
function temporalAlpha(t) {
  return (Math.sin(t) + 1) / 2; 
}

// Zamana bağlı alpha blending işlemi
function alphaBlendingTemporal(imgA, imgB) {
  ctx.drawImage(imgB, 0, 0);
  const imageDataB = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.drawImage(imgA, 0, 0);
  const imageDataA = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const blendedData = ctx.createImageData(canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;
      const alpha = temporalAlpha(t); // Zaman bağlı α değeri

      blendedData.data[i] =
        alpha * imageDataA.data[i] + (1 - alpha) * imageDataB.data[i]; 
      blendedData.data[i + 1] =
        alpha * imageDataA.data[i + 1] + (1 - alpha) * imageDataB.data[i + 1]; 
      blendedData.data[i + 2] =
        alpha * imageDataA.data[i + 2] + (1 - alpha) * imageDataB.data[i + 2]; 
      blendedData.data[i + 3] = 255; 
    }
  }

  ctx.putImageData(blendedData, 0, 0);
  t += 0.05; 
  requestAnimationFrame(() => alphaBlendingTemporal(imgA, imgB)); 
}

// Başlangıçta zamanlı harmanlamayı başlat
Promise.all([imageA.decode(), imageB.decode()])
  .then(() => {
    alphaBlendingTemporal(imageA, imageB); // Zamana bağlı harmanlama
  })
  .catch((error) => {
    console.error("Görsel yüklenemedi:", error);
  });
