import { MdTitle, MdColorLens, MdFormatSize } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { FaUniregistry } from "react-icons/fa";
import { RiStockFill } from "react-icons/ri";

const styles = {
  inputIcon: "text-2xl text-textColor",
};

export const inputs1 = [
  {
    name: "title",
    placeholder: "Write your products title here...",
    icon: <MdTitle className={styles.inputIcon} />,
    type: "text",
  },
  {
    name: "slug",
    placeholder: "Provide a unique Slug for your product..",
    icon: <FaUniregistry className={styles.inputIcon} />,
    type: "text",
  },
];

export const inputs3 = [
  {
    name: "price",
    placeholder: "Price",
    icon: <BiDollar className={styles.inputIcon} />,
    type: "number",
  },
  {
    name: "availableQty",
    placeholder: "Stock of your Product",
    icon: <RiStockFill className={styles.inputIcon} />,
    type: "number",
  },
];
export const inputs4 = [
  {
    name: "color",
    placeholder: "Color",
    type: "text",
    icon: <MdColorLens className={styles.inputIcon} />,
  },
  {
    name: "size",
    placeholder: "Size",
    type: "text",
    icon: <MdFormatSize className={styles.inputIcon} />,
  },
];
