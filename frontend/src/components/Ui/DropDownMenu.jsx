"use client";
import React, { useState } from "react";
import DropDownButton from "@/components/Ui/DropDownButton";
import ConditionalLink from "@/components/tools/Roles";
import { toPersianDigits } from "@/utils";
import Image from "next/image";

const Dropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="inline-block">
      <DropDownButton toggleDropdown={toggleDropdown} />
      {isOpen && (
        <div className="origin-top-right absolute left-0 top-14 mt-2 w-52 rounded-lg shadow-lg bg-secondary-50 ring-1 ring-black ring-opacity-5">
          <ul
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="px-5 py-3 font-iranSans flex items-center border">
              <div className="">
                {user.profileImage ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${user.profileImage}`}
                    alt={user.name}
                    width="30"
                    height="30"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-7 rounded-full bg-secondary-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col items-start gap-x-3 mr-2">
                  <h3>{user.name}</h3>
                  <span className="text-sm">
                    {toPersianDigits(user.phoneNumber)}
                  </span>
                </div>
              </div>
            </div>
            <li>
              <ConditionalLink />
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                Option 2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                Option 3
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
