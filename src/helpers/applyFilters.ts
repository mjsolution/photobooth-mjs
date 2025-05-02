export const applyFilters = async (
  base64s: (string | null)[],
  filter?: string
) => {
  const modifiedImages = [];

  for (const base64 of base64s) {
    if (base64) {
      const img = new Image();
      img.src = base64;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        ctx.filter = filter || "none";
        ctx.drawImage(img, 0, 0);
      }

      const modifiedBase64 = canvas.toDataURL();
      modifiedImages.push(modifiedBase64);
    }
  }

  return modifiedImages;
};
