export const uploadToCloudinary = async (file: File, folder: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );
  formData.append("folder", folder);
  // console.log(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
  // console.log(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    console.log(data);
   return { url: data.secure_url, err: null };
  } catch (err) {
    return { url: null, err };
  }
};
