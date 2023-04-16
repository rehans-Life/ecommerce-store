import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { deleteImage, handleFile } from "./Functions";
const styles = {
  imageUpload: (noImages) =>
    `w-full border-dashed relative h-64 ${
      noImages ? "border-red-400" : "border-gray-300"
    } border-2 p-4 rounded-md transition-all ease-in duration-200 flex items-center justify-center text-gray-500 text-lg font-medium flex-col space-y-2`,
  uploadIcon: "text-3xl",
  label:
    "h-full w-full flex items-center justify-center text-gray-500 text-lg font-medium flex-col cursor-pointer space-y-2",
  delete:
    "bg-red-500 text-white text-2xl hover:bg-red-600 transtion-all ease-in duration-200 cursor-pointer absolute right-max bottom-4 left-max p-2 rounded-full",
};

export const ImageInput = ({
  name,
  imageUrls,
  setImageUrls,
  setNoImages,
  noImages,
}) => (
  <div className={styles.imageUpload(noImages)}>
    {imageUrls[name] ? (
      <>
        <Image
          src={imageUrls[name]}
          alt=""
          width={300}
          height={300}
          className="w-[85%] h-[85%] object-contain rounded-md"
        />
        <div
          className={styles.delete}
          onClick={() => deleteImage(name, imageUrls, setImageUrls)}
        >
          <BiTrash className={styles.deleteIcon} />
        </div>
      </>
    ) : (
      <>
        <label for="image" className={styles.label}>
          <BsFillCloudUploadFill className={styles.uploadIcon} />
          <p className="text-center">Click Here to Upload Image</p>
        </label>
        <input
          id="image"
          name={name}
          className="hidden"
          onChange={(e) =>
            handleFile(
              name,
              e.target.files[0],
              setImageUrls,
              setNoImages,
              noImages
            )
          }
          type="file"
          accept="image.png, image.gif, image.jpeg, image.jpg, image.svg"
        />
      </>
    )}
  </div>
);
