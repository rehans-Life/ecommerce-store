import { Field } from "formik";
import { MdSubtitles } from "react-icons/md";

const styles = {
  description: (error, touched) =>
    `bg-transparent border-dashed ${
      error && touched ? "border-red-400" : "border-gray-400"
    } border rounded-md p-2 w-full outline-none`,
  inputIcon: "text-2xl text-textColor",
};

export const Description = ({ errors, touched }) => (
  <div className="space-y-1 py-5">
    <div className="flex items-center text-lg text-gray-400 font-medium space-x-3">
      <MdSubtitles className={styles.inputIcon} />
      <p>Description</p>
    </div>
    <Field
      className={styles.description(errors.desc, touched.desc)}
      component="textarea"
      name="desc"
      rows={5}
      placeholder="Type your prjoduct's Description here"
    />
  </div>
);
