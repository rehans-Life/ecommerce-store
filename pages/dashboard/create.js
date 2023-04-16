import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formSchema } from "../../components/Create/FormSchema";
import { inputs1 } from "../../components/Create/Data";
import { inputs3 } from "../../components/Create/Data";
import { inputs4 } from "../../components/Create/Data";
import { Input } from "../../components/Create/Input";
import { ImageInput } from "../../components/Create/ImageInput";
import { Description } from "../../components/Create/Description";
import Loading from "../../components/Create/Loading";
import { addProduct } from "../../components/Create/Functions";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const styles = {
  container: "p-5 flex flex-col items-center",
  formContainer: "p-4 border border-gray-300 rounded-lg w-full",
  button:
    "my-6 w-full md:w-32 rounded-md hover:bg-green-600 transtion-all ease-in duration-200 bg-green-500 p-2 text-white flex items-center cursor-pointer justify-center font-semibold text-lg",
  heading:
    "text-4xl md:text-[4vw] font-extrabold tracking-wide text-center w-full mt-12 mb-5",
};

export default function Create() {
  const [categories, setCategories] = useState([]);
  const inputs2 = [
    {
      name: "category",
      type: "select",
      options: categories,
    },
  ];
  const [imageUrls, setImageUrls] = useState({});
  const [noImages, setNoImages] = useState(false);

  useEffect(() => {
    const colRef = collection(db, "categories");
    onSnapshot(colRef, (snapshot) => {
      setCategories(snapshot.docs.map((doc) => doc.data().name));
    });
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Add Product</p>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={styles.formContainer}>
        <Formik
          initialValues={{
            title: "",
            slug: "",
            price: "",
            category: "clothes - girl",
            availableQty: "",
            color: "",
            desc: "",
            size: "",
          }}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            const add = async () => {
              const data = await addProduct({ ...values, images: imageUrls });
              if (!data.success) {
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
              } else {
                toast.success("Product Added Successfully", {
                  position: "top-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                resetForm({
                  title: "",
                  slug: "",
                  price: "",
                  category: "clothes - girl",
                  availableQty: "",
                  color: "",
                  desc: "",
                  size: "",
                });
                setImageUrls({});
              }
            };
            add();
            setSubmitting(false);
          }}
          validateOnMount={true}
          validationSchema={formSchema}
        >
          {({ isValid, isSubmitting, touched, errors, handleSubmit }) => (
            <div className="">
              <div className="grid md:grid-cols-2 md:gap-10 gap-2 mb-7">
                {inputs1.map(
                  ({ name, placeholder, icon, type, options }, index) => (
                    <Input
                      key={index}
                      name={name}
                      errors={errors}
                      touched={touched}
                      type={type}
                      placeholder={placeholder}
                      icon={icon}
                      options={options}
                    />
                  )
                )}
              </div>
              {inputs2.map(
                ({ name, placeholder, icon, type, options }, index) => (
                  <Input
                    key={index}
                    name={name}
                    type={type}
                    errors={errors}
                    touched={touched}
                    placeholder={placeholder}
                    icon={icon}
                    options={options}
                  />
                )
              )}
              <div className="grid md:grid-cols-2 md:gap-10 gap-2 my-7">
                {inputs3.map(
                  ({ name, placeholder, icon, type, options }, index) => (
                    <Input
                      key={index}
                      name={name}
                      errors={errors}
                      touched={touched}
                      type={type}
                      placeholder={placeholder}
                      icon={icon}
                      options={options}
                    />
                  )
                )}
              </div>
              <div className="grid md:grid-cols-2 md:gap-10 gap-2 my-7">
                {inputs4.map(
                  ({ name, placeholder, icon, type, options }, index) => (
                    <Input
                      key={index}
                      name={name}
                      errors={errors}
                      touched={touched}
                      type={type}
                      placeholder={placeholder}
                      icon={icon}
                      options={options}
                    />
                  )
                )}
              </div>
              <Description errors={errors} touched={touched} />
              <div className="flex flex-col md:place-items-center md:grid md:grid-cols-2 lg:flex lg:flex-row gap-7">
                <ImageInput
                  name="image1"
                  imageUrls={imageUrls}
                  noImages={noImages}
                  setImageUrls={setImageUrls}
                  setNoImages={setNoImages}
                />
                <ImageInput
                  name="image2"
                  imageUrls={imageUrls}
                  noImages={noImages}
                  setImageUrls={setImageUrls}
                  setNoImages={setNoImages}
                />
                <ImageInput
                  name="image3"
                  imageUrls={imageUrls}
                  noImages={noImages}
                  setImageUrls={setImageUrls}
                  setNoImages={setNoImages}
                />
              </div>
              <button
                className={styles.button}
                disabled={isSubmitting}
                onClick={
                  isValid
                    ? !imageUrls.image1 &&
                      !imageUrls.image2 &&
                      !imageUrls.image3
                      ? () => {
                          setNoImages(true);
                          toast.error(
                            "Please Provide Atleast One Image of the Product",
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
                        }
                      : handleSubmit
                    : () =>
                        toast.error(
                          "Form is not Valid Please fill out All the Details",
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
                        )
                }
              >
                {isSubmitting ? <Loading /> : "Submit"}
              </button>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
