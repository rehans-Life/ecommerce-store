import Image from "next/image";
import React from "react";

export default function ErrorPage() {
  return (
    <div className="flex flex-col my-10 pb-24 w-full items-center">
      <Image
        alt=""
        width={1920}
        height={1080}
        src={"/logo.png"}
        className="max-h-[400px] max-w-[400px]"
      />
      <p className="font-semibold text-xl md:text-4xl -mt-16">
        Error 404 This Page Does not Exist
      </p>
    </div>
  );
}
