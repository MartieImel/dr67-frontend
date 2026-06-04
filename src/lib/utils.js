// ── Derived stats ───────────────────────────────────────────────────
export const derive = (a) => ({
  pvMax:    a.RES * 3 + 10,
  psMax:    a.ESP * 3 + 10,
  init:     a.INT + a.SOR,
  def:      Math.floor(a.RES / 2),
  coinsMax: a.SOR * 5,
});

// ── Compress image via canvas before saving ─────────────────────────
export const compressImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_W = 380, MAX_H = 480;
        const ratio = Math.min(MAX_W / img.width, MAX_H / img.height, 1);
        const canvas = document.createElement("canvas");
        canvas.width  = Math.round(img.width  * ratio);
        canvas.height = Math.round(img.height * ratio);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
