import About from "../components/Index/About";
import Hero from "../components/Index/Hero";
import Contact from "../components/Index/Contact";
import LatestProducts from "../components/Index/LatestProducts";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import OurProdcuts from "../components/Index/OurProdcuts";

const styles = {
  container: "flex flex-col items-center",
  heading: "py-5 font-bold text-[4rem] text-headingColor",
};

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/getLatestProducts`
  );
  const { latestProducts } = await response.json();

  const colRef = collection(db, "categories");
  const snap = await getDocs(colRef);
  const categories = [];
  snap.forEach((doc) => {
    categories.push(doc.data().name);
  });

  return {
    props: {
      latestProducts: JSON.parse(JSON.stringify(latestProducts)),
      categories,
    },
  };
};

export default function Home({ latestProducts, categories }) {
  return (
    <div className={styles.container}>
      <Hero />
      <div className=" bg-[rgba(0,0,0,0.2)] w-[80vw] h-[1px]"></div>
      <About />
      <div className=" bg-[rgba(0,0,0,0.2)] w-[80vw] h-[1px]"></div>
      <LatestProducts latestProducts={latestProducts} />
      <div className=" bg-[rgba(0,0,0,0.2)] w-[80vw] h-[1px]"></div>
      <OurProdcuts categories={categories} />
      <div className=" bg-[rgba(0,0,0,0.2)] w-[80vw] h-[1px]"></div>
      <Contact />
    </div>
  );
}
