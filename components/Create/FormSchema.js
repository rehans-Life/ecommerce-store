import * as yup from "yup";

export const formSchema = yup.object({
  title: yup.string().required().min(3),
  slug: yup.string().required().min(3),
  price: yup.number().required(),
  availableQty: yup.number().required(),
  category: yup.string().required(),
  color: yup.string().required(),
  desc: yup.string().required().min(20),
  size: yup.string().required(),
});
