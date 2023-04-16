import Image from "next/image";
import React from "react";

const styles = {
  delivery:
    "flex items-center rounded-[50px] w-fit bg-orange-100 py-1 px-3 space-x-2 absolute left-8 md:left-14 top-10",
};

export default function Hero() {
  return (
    <section className="body-font">
      <div className="container mx-auto flex px-7 py-24 md:px-14 md:flex-row flex-col items-center relative">
        <div className={styles.delivery}>
          <p className="text-headingColor font-semibold text-md">
            Worldwide Delivery
          </p>
          <div className="h-10 w-10 p-1 bg-slate-50 shadow-md rounded-full">
            <Image
              alt=""
              width={1920}
              height={1080}
              className=""
              src={"/delivery.png"}
            />
          </div>
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 pt-7 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font font-bold mb-4 lg:text-[4rem] md:text-[3.5rem] text-[3rem] text-headingColor">
            Beechwood Baby
          </h1>
          <p className="mb-8 text-texxtColor leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-[60%] w-5/6">
          <Image
            width={1920}
            height={1080}
            className="object-center w-full h-full rounded"
            alt="hero"
            src={"/heroImage2.png"}
          />
        </div>
      </div>
    </section>
  );
}
