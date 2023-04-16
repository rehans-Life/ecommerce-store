import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const MenuItem = ({ category }) => {
  return (
    <div className="px-1 py-1 ">
      <Menu.Item>
        {({ active }) => (
          <Link
            href={`/products?category=${category}`}
            className={`${
              active ? "bg-orange-300 text-white" : "text-headingColor"
            } group flex w-full font-semibold text-md items-center capitalize rounded-md px-2 py-2 text-sm`}
          >
            {category}
          </Link>
        )}
      </Menu.Item>
    </div>
  );
};

export default function Dropdown({ categories, style }) {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            onClick={() => setClicked(!clicked)}
            className={`w-full justify-center whitespace-nowrap space-x-2 rounded-lg text-[17px] font-medium ${
              style
                ? "text-slate-50 shadow-md hover:shadow-lg transtion-all ease-in duration-200 p-2 bg-headingColor"
                : "text-textColor"
            }  flex items-center`}
          >
            {({ active }) => (
              <>
                <p>Our Products</p>
                <BiChevronDown
                  className={`${
                    clicked ? "rotate-180" : "rotate-0"
                  } transtion-all ease-in duration-200 text-2xl`}
                />
              </>
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {categories?.map((category, index) => (
              <MenuItem key={index} category={category} />
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
