import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "src/utils/firebase";

export async function uploadImageAndGetURL(image) {
  if (!image) return null;

  const storageRef = ref(storage, "media/" + new Date().getTime() + image.name);
  const uploadTask = uploadBytesResumable(storageRef, image);

  try {
    await uploadTask;

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    return downloadURL;
  } catch (error) {
    // Handle any errors during the upload and URL retrieval
    console.error("Error uploading image:", error);
    return null;
  }
}

// Usage example:
// const imageUrl = await uploadImageAndGetURL(imageFile);
