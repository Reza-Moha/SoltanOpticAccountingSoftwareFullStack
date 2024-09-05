"use client";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import Image from "next/image";
import { RegisterSchema } from "@/validators/auth";
import classNames from "classnames";
import logo from "@/assets/image/logoBlcak.svg";
import { useState } from "react";

export default function Page() {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="w-full min-h-screen bg-[#030014] text-slate-900 flex items-center justify-center">
        <div className="container w-full max-w-[400px] rounded-xl shadow-xl border-2 border-[#e0e0e2] p-5 md:p-8 flex flex-col items-center justify-center bg-slate-100 fixed z-50">
          <div className="w-full">
            <Link href="/">
              <Image
                className="w-20 h-14 mx-auto rounded-xl"
                src={logo}
                alt="logo"
              />
            </Link>
            <div className="text-2xl font-kalamehBlack">ورود | ثبت نام</div>
            {!showOtpInput ? (
              <div className="text-lg font-kalamehReqular">
                <div>سلام!</div>
                <div>لطفا شماره موبایل خود را وارد کنید.</div>
              </div>
            ) : null}
            <Formik
              initialValues={{ phoneNumber: "" }}
              validationSchema={RegisterSchema}
              onSubmit={async (values, actions) => {
                try {
                } catch (error) {}
              }}
            >
              {({ errors, values, touched }) => (
                <>
                  {!showOtpInput ? (
                    <Form>
                      <Field
                        name="phoneNumber"
                        value={values.phoneNumber}
                        id="phoneNumber"
                        autoFocus={true}
                        inputMode="numeric"
                        autoComplete="off"
                        className={classNames({
                          "bg-black text-md rounded-lg block w-full py-3.5 px-2.5 mb-3 text-slate-100 font-semibold text-center outline-none ring-0 focus:outline-none focus:ring-0 border  border-[#7042f861] ": true,
                          "border-[0.170rem] border-red-600":
                            errors.phoneNumber && touched.phoneNumber,
                          "border-green-500 ": !errors.phoneNumber,
                        })}
                      />
                      {errors.phoneNumber || touched.phoneNumber ? (
                        <p className="text-sm text-red-500 font-iranSansLight">
                          {errors.phoneNumber}
                        </p>
                      ) : null}
                      <button
                        type="submit"
                        disabled={errors?.phoneNumber?.length > 1 || loading}
                        className="rounded bg-emerald-400 text-emerald-900 w-full py-2 text-lg font-kalamehBlack mt-4 disabled:opacity-35"
                      >
                        ارسال رمز یکبار مصرف
                      </button>
                    </Form>
                  ) : (
                    <div className="py-4">
                      {loading ? <div>loading ...</div> : <h1>otp form</h1>}
                      {/*    <OtpForm
                          phoneNumber={phoneNumber}
                          setShowOtpInput={setShowOtpInput}
                          codeLen={codeLen}
                          roles={role}
                        />*/}
                    </div>
                  )}
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
