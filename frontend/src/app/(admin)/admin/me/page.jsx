"use client";
import { toPersianDigits } from "@/utils";
import { Formik } from "formik";
import { useSelector } from "react-redux";

export default function Me() {
  const { user } = useSelector((state) => state.auth);
  const initial = {
    fullName: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    profileImage: user?.profileImage || "",
  };
  const editUserHandler = async (values) => {};
  return (
    <>
      <section className="h-screen p-10 flex items-center justify-center bg-gray-100/60 font-iranSans">
        <div className="container max-w-screen-sm  rounded-lg border border-secondary-50 bg-white px-2">
          <Formik
            initialValues={initial}
            onSubmit={editUserHandler}
            enableReinitialize={true}
          >
            {({ values, handleSubmit }) => (
              <>
                <div className="overflow-hidden shadow-sm">
                  <div className="h-28 w-full bg-gradient-to-tl from-secondary-200 to-secondary-100/30 flex items-start justify-center md:items-center">
                    <p className="mt-4 md:mt-0 md:text-base text-secondary-600 px-2 py-1 rounded-lg bg-white font-bold text-sm">
                      بزرگترین مجموعه اپتیکی شمال غرب کشور
                    </p>
                  </div>
                </div>
                <div className="bg-white">
                  <div className="-translate-y-14 flex relative items-center md:items-end flex-col md:flex-row">
                    <div className="h-28 w-28 border-[5px] border-white md:mr-7 rounded-full relative flex items-center">
                      <label
                        htmlFor="profileImage"
                        className="flex items-center justify-center w-full h-full rounded-full cursor-pointer bg-gradient-to-tl from-secondary-300 to-secondary-100 overflow-hidden relative"
                      >
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="w-8 h-8 text-white"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                          ></path>
                        </svg>
                        <input
                          accept=".gif,.jpg,.jpeg,.GIF,.png,.PNG,.JPG,.JPEG,.bmp,.BMP"
                          type="file"
                          name="profileImage"
                          id="profileImage"
                          className="sr-only"
                        />
                        <div className="muirtl">
                          <img
                            alt="رضا محمدزاده"
                            src="https://api.fronthooks.ir/uploads/avatar/2024/7/23/1724406780494-32123683.jpg"
                            className="MuiAvatar-img muirtl-1hy9t21"
                          />
                        </div>
                      </label>
                    </div>
                    <div className="md:mb-2 md:mr-2">
                      <div className="font-black text-secondary-700 text-xl">
                        رضا محمدزاده
                      </div>
                      <div className="text-secondary-500 text-sm text-center">
                        {toPersianDigits(user?.phoneNumber || 0)}
                      </div>
                    </div>
                  </div>
                  <div>trest</div>
                </div>
              </>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}
