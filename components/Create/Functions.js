import { v4 as uuid } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase";

export const handleFile = (name, file, setImageUrls, setNoImages, noImages) => {
  const uid = uuid();
  const storageRef = ref(storage, `images/${uid}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    () => {},
    (error) => console.log(error),
    () => {
      getDownloadURL(storageRef).then((url) => {
        noImages && setNoImages(false);
        setImageUrls((prevValue) => ({
          ...prevValue,
          [name]: url,
        }));
      });
    }
  );
};
export const deleteImage = (name, imageUrls, setImageUrls) => {
  const deleteRef = ref(storage, imageUrls[name]);
  deleteObject(deleteRef)
    .then(() => console.log("success"))
    .catch((error) => console.log(error.message));
  setImageUrls((prevValue) => ({ ...prevValue, [name]: "" }));
};

export const addProduct = async (product) => {
  const response = await fetch(`http://localhost:3000/api/addProducts`, {
    method: "POST",
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
};
