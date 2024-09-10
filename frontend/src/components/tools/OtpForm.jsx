"use client"
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import OtpTimer from "./OtpTimer.jsx";
import {useAuth} from "@/context/AuthContext";

export default function OtpForm({
  phoneNumber,
  setShowOtpInput,
  codeLength = 5,
}) {
  const [otp, setOtp] = useState(new Array(codeLength).fill(""));
  const inputRefs = useRef([]);
  const {isLoading, login} = useAuth()

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.codeLength === codeLength) setOtp(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < codeLength - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await  login({
      phoneNumber,
      code: otp.join(""),
    })
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        data-aos="zoom-in"
        className="flex flex-col"
      >
        <div className="text-right font-kalamehBlack text-lg">
          لطفا کد احراز هویت خود را وارد کنید
        </div>
        <div className="otpContainer flex justify-evenly items-center p-2">
          {otp.map((value, index) => {
            return (
              <input
                key={index}
                type="text"
                ref={(input) => (inputRefs.current[index] = input)}
                name="otp"
                maxLength="1"
                inputMode="numeric"
                className="otpInput"
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            );
          })}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="mt-10 bg-[#22C55E] py-3 px-4 rounded-lg w-full shadow shadow-green-500/20 hover:shadow-green-500/30 cursor-pointer focus:scale-95 transition-all ease-linear text-md disabled:opacity-50"
        >
          {isLoading ? <div className="spinner-mini" /> : "ورود"}
        </button>
        <OtpTimer setShowOtpInput={setShowOtpInput} />
      </form>
    </>
  );
}
