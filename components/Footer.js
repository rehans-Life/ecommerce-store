import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";
const styles = {
  container: "bg-cartBg mt-10 flex flex-col items-center px-3 pb-3",
  logo: "w-32 h-32 object-contain -mt-16",
  pageLink: "text-md font-medium text-slate-50",
  icon: "text-slate-50 text-xl md:text-2xl",
};

const pageLinks = [
  {
    name: "About Us",
    link: "about",
  },
  {
    name: "Contact Us",
    link: "contact",
  },
];

const socialMediaLinks = [
  <Link key={0} href={"https://www.instagram.com/beechwood__baby/"}>
    <AiOutlineInstagram className={styles.icon} />
  </Link>,
  <Link
    key={1}
    href={"https://www.facebook.com/profile.php?id=100071135809704"}
  >
    <BsFacebook className={styles.icon} />
  </Link>,
  <Link key={2} href={"https://www.twitter.com"}>
    <BsTwitter className={styles.icon} />
  </Link>,
];

export default function Footer() {
  return (
    <div className={styles.container}>
      <Image
        src={"/logo.png"}
        width={1920}
        height={1080}
        alt=""
        className={styles.logo}
      />
      <div className="py-2 w-full flex justify-center space-x-5">
        {pageLinks.map(({ name, link }, index) => (
          <Link key={{ index }} href={`/${link}`} className={styles.pageLink}>
            {name}
          </Link>
        ))}
      </div>
      <div className="py-5 w-full flex justify-center space-x-10 ">
        {socialMediaLinks.map((icon, index) => (
          <Link href={"/"} key={index}>
            {icon}
          </Link>
        ))}
      </div>
      <p className="w-full text-center text-slate-50 text-xs py-2">
        STARBUCKS and the Starbucks® logo are used under license by Nestlé. Pike
        Place is a registered trademark of The Pike Place Market PDA, used under
        license. Nespresso® and NESCAFÉ® Dolce Gusto® are registered trademarks
        of Société de Produits Nestlé S.A.. All other trademarks are the
        property of their owners.
      </p>
    </div>
  );
}
