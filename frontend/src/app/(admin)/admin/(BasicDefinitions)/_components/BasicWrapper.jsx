"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BasicWrapper = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <section className="mt-5 md:mt-0 py-1 md:px-10 font-iranSans">
      <div className="container max-w-screen-lg rounded-lg border border-secondary-50">
        <div
          className="font-bold text-center bg-gradient-to-tr from-gray-900 to-gray-600 bg-gradient-to-r text-white border border-gray-800/75 rounded-xl py-2 cursor-pointer"
          onClick={toggleOpen}
        >
          {title}
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-secondary-100 rounded-tr-xl rounded-tl-xl mt-1"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BasicWrapper;
