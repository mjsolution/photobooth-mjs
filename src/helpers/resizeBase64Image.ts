export const resizeBase64Image = (
  base64Image: string,
  width: number,
  height: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const resizedBase64 = canvas.toDataURL();
      resolve(resizedBase64);
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
};
