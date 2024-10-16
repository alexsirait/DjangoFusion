"use client"; // this is a client component
import React, { useState } from "react";
import Image from "next/image";
import { Link } from "react-scroll/modules";
import { HiArrowDown } from "react-icons/hi";

const HeroSection = () => {
  const [copied, setCopied] = useState(false);

  // Fungsi untuk menyalin teks ke clipboard
  const handleCopy = () => {
    const pipCommand = "pip install djangofusion-dot"; // Teks yang akan disalin
    navigator.clipboard.writeText(pipCommand).then(
      () => {
        setCopied(true); // Berhasil menyalin
        setTimeout(() => setCopied(false), 2000); // Mengembalikan status setelah 2 detik
      },
      (err) => {
        console.error("Gagal menyalin teks: ", err);
      }
    );
  };

  return (
    <section id="home">
      <div className="flex flex-col text-center items-center justify-center animate-fadeIn animation-delay-2 my-10 py-16 sm:py-32 md:py-48 md:flex-row md:space-x-4 md:text-left">
        <div className="md:mt-2 md:w-1/2">
          {/* @ts-ignore */}
          <Image
            src="/headshot.png"
            alt=""
            width={325}
            height={325}
            className="rounded-full shadow-2xl"
          />
        </div>
        <div className="md:mt-2 md:w-3/5">
          <h1 className="text-4xl font-bold mt-6 md:mt-0 md:text-7xl">
            DjangoFusion!
          </h1>
          <p className="text-lg mt-4 mb-6 md:text-2xl">
            <span className="font-semibold text-teal-600">
              Innovation in Every Line of Code <br /><br />
            </span>
            {/* Bagian pip install dengan fitur salin */}
            <span id="pip-command" className="flex items-center space-x-2">
              <code className="bg-gray-800 rounded-md p-2 text-sm md:text-base md:p-4 text-white whitespace-nowrap">
                pip install djangofusion-dot
              </code>
              <button
                onClick={handleCopy}
                className="text-teal-600 bg-gray-800 rounded-md p-2 text-sm md:text-base md:p-4 hover:bg-gray-700 flex items-center"
              >
                <i className="fa fa-copy" aria-hidden="true"></i>
                {copied ? "Copied!" : "Copy"}
              </button>
            </span>
          </p>
          <br />
          <Link
            to="projects"
            className="text-neutral-100 font-semibold px-6 py-3 bg-teal-600 rounded shadow hover:bg-teal-700"
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Docs
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center text-center justify-center ">
        <Link
          to="about"
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          {/* @ts-ignore */}
          <HiArrowDown size={35} className="animate-bounce" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
