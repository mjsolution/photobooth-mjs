import { supabase } from "./supabase-client";

export const uploadImage = async (base64Image: string) => {
  const fileName = `MJS-${Date.now()}`;
  const base64Data = base64Image.replace(/^data:image\/png;base64,/, "");
  const imageBuffer = Buffer.from(base64Data, "base64");

  const { data, error } = await supabase.storage
    .from("photobooth")
    .upload(`${fileName}.png`, imageBuffer, {
      contentType: "image/png",
    });

  return { data, error };
};
