import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { BsFillCloudUploadFill } from "react-icons/bs";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { collection, onSnapshot } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../components/Create/Loading";

const styles = {
  imgContainer: (noImages) => `w-full border-dashed relative h-64 ${
    noImages ? "border-red-300" : "border-gray-300"
  }
     border-2 rounded-md flex items-center justify-center text-gray-500 text-lg font-medium flex-col space-y-2`,
  heading:
    "text-4xl md:text-[4vw] font-extrabold tracking-wide text-center w-full mt-12 mb-5",
  input: (error, touched) =>
    `px-2 py-1 w-full bg-primary rounded border ${
      touched && error
        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
        : "border-gray-400 focus:border-gray-500 focus:ring-gray-200"
    } focus:ring-2 text-base outline-none text-textColor leading-8 transition-colors duration-200 ease-in-out`,
  wrapper: "my-2",
  uploadIcon: "text-3xl",
  description: (
    error,
    touched
  ) => `p-2 bg-transparent border-dashed text-textColor ${
    error && touched ? "border-red-400" : "border-gray-400"
  }
    border rounded-md w-full outline-none`,
  label:
    "h-full flex items-center justify-center text-gray-500 text-md font-medium flex-col cursor-pointer space-y-2",
  delete:
    "bg-red-500 text-white p-2 text-2xl hover:bg-red-600 transtion-all ease-in duration-200 cursor-pointer absolute right-max bottom-4 left-max rounded-full",
  confirmBtn:
    "group md:w-[303px] w-full my-5 relative flex justify-center rounded-sm border border-transparent  bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in duration-100 border-0 py-2 px-3 focus:outline-none hover:shadow-md shadow-sm text-md font-medium text-white focus:outline-none whitespace-nowrap",
  categoryContainer: `w-full p-2 capitalize rounded-md border border-gray-300
    shadow-md outline-none text-lg font-medium transition-all ease-in duration-200`,
  categoryHeading:
    "flex items-center space-x-3 font-medium text-lg text-gray-400",
};

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/getProductsById`,
    {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    }
  );
  const product = await response.json();
  return {
    props: {
      product,
    },
  };
};

const updateProductSchema = yup.object({
  title: yup.string().required(),
  category: yup.string().required(),
  size: yup.string().required(),
  desc: yup.string().required(),
  color: yup.string().required(),
  price: yup.string().required(),
});

export const inputsArray = [
  [
    {
      name: "title",
      type: "text",
    },
    {
      name: "price",
      type: "number",
    },
  ],
  [
    {
      name: "color",
      type: "text",
    },
    {
      name: "size",
      type: "text",
    },
  ],
  [
    {
      name: "availableQty",
      type: "number",
    },
  ],
];

const InputContianer = ({ inputs, errors, touched }) => (
  <div className="grid w-full grid-cols-1 md:grid-cols-2 md:space-x-3">
    {inputs.map((input, index) => (
      <div key={index} className={styles.wrapper}>
        <label
          htmlFor={input.name}
          className="capitalize font-base text-textColor"
        >
          {input.name}
        </label>
        <Field
          name={input.name}
          type={input.type}
          className={styles.input(errors[input.name], touched[input.name])}
        />
      </div>
    ))}
  </div>
);

const handleFile = (setImages, image, file, noImages, setNoImages) => {
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
        setImages((prevValue) => ({
          ...prevValue,
          [image[0]]: url,
        }));
      });
    }
  );
};

const deleteFile = (setImages, image, images) => {
  setImages((prevValue) => ({
    ...prevValue,
    [image[0]]: "",
  }));
};

const ImageInput = ({ image, images, setImages, noImages, setNoImages }) => (
  <div className={styles.imgContainer(noImages)}>
    {images[image[0]] ? (
      <div
        className={`w-full h-full flex items-center justify-center rounded-md`}
      >
        <Image
          src={image[1]}
          alt=""
          width={300}
          height={300}
          className={`w-[85%] h-[85%] object-contain rounded-md`}
        />
        <div
          className={styles.delete}
          onClick={() => deleteFile(setImages, image, images)}
        >
          <BiTrash className={styles.deleteIcon} />
        </div>
      </div>
    ) : (
      <>
        <label for="image" className={styles.label}>
          <BsFillCloudUploadFill className={styles.uploadIcon} />
          <p className="text-center">Click Here to Upload Image</p>
        </label>
        <input
          id="image"
          className="hidden"
          onChange={(e) =>
            handleFile(
              setImages,
              image,
              e.target.files[0],
              noImages,
              setNoImages
            )
          }
          type="file"
          accept="image.png, image.gif, image.jpeg, image.jpg, image.svg"
        />
      </>
    )}
  </div>
);

export default function UpdateProduct({ product }) {
  const [images, setImages] = useState(product.images);
  const router = useRouter();
  const id = router.query.id;
  const [categories, setCategories] = useState([]);
  const [noImages, setNoImages] = useState(false);

  useEffect(() => {
    const colRef = collection(db, "categories");
    onSnapshot(colRef, (snapshot) => {
      setCategories(snapshot.docs.map((doc) => doc.data().name));
    });
  }, []);

  useEffect(() => {
    for (let i = 1; i <= 3; i++) {
      if (!Object.entries(images)[i]) {
        if (i == 1) {
          images["image2"] = "";
        } else {
          images["image3"] = "";
        }
      }
    }
  }, []);
  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <p className={styles.heading}>Update Product</p>
      <div>
        <Formik
          initialValues={{
            title: product.title,
            category: product.category,
            size: product.size,
            desc: product.desc,
            color: product.color,
            price: product.price,
            availableQty: product.availableQty,
          }}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            if (!Object.values(images).join("")) {
              setNoImages(true);
              toast.error(
                "Please provide atleast one image of the product to update it",
                {
                  position: "top-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
              setSubmitting(false);
              return;
            }
            const data = {
              ...values,
              images,
              id,
            };
            fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateProduct`, {
              method: "POST",
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  toast.success(data.message, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                } else {
                  toast.error(data.message, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              })
              .catch((error) => {
                toast.error(error.message, {
                  position: "top-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              });
            setSubmitting(false);
          }}
          validateOnMount={true}
          validationSchema={updateProductSchema}
        >
          {({
            isSubmitting,
            errors,
            touched,
            values,
            handleSubmit,
            isValid,
          }) => (
            <div className="w-full p-5">
              {inputsArray.map((inputs, index) => (
                <InputContianer
                  key={index}
                  inputs={inputs}
                  errors={errors}
                  touched={touched}
                />
              ))}
              <div className="my-2">
                <label
                  htmlFor="desc"
                  className="capitalize font-base text-textColor"
                >
                  Categories
                </label>
                <Field
                  as="select"
                  name="category"
                  className={styles.categoryContainer}
                >
                  {categories?.map((option, index) => (
                    <option
                      className={styles.category}
                      key={index}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="py-3">
                <label
                  htmlFor="desc"
                  className="capitalize font-base text-textColor"
                >
                  Description
                </label>
                <Field
                  className={styles.description(
                    errors["desc"],
                    touched["desc"]
                  )}
                  component="textarea"
                  name="desc"
                  rows={5}
                />
              </div>
              <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-7 my-2">
                {Object.entries(images).map((image, index) => (
                  <ImageInput
                    key={index}
                    image={image}
                    images={images}
                    setImages={setImages}
                    noImages={noImages}
                    setNoImages={setNoImages}
                  />
                ))}
              </div>
              <button
                disabled={!isValid || isSubmitting}
                onClick={handleSubmit}
                className={styles.confirmBtn}
              >
                {isSubmitting ? <Loading /> : "Confirm Changes"}
              </button>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
