import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <section className="body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col-reverse items-center relative">
        <div className="lg:max-w-lg lg:w-full md:w-[60%] w-5/6 flex justify-center">
          <Image
            width={1920}
            height={1080}
            className="object-cover object-center w-full max-w-300 h-full rounded"
            alt="hero"
            src={"/about.jpg"}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:l-24 md:pl-16 pt-3 flex flex-col md:items-start md:text-left mb-4 md:mb-0 items-center text-center">
          <h1 className="title-font font-bold mb-4 text-[3rem] text-headingColor">
            About Us
          </h1>
          <p className="mb-8 text-texxtColor leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
        </div>
      </div>
    </section>
  );
}
