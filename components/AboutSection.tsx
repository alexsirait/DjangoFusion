import React from "react"
import Image from "next/image"

const skills = [
  { skill: "Database API" },
  { skill: "Transaction Management" },
  { skill: "Eksekusi Query SQL" },
  { skill: "CRUD Operation" },
  { skill: "Performansi dan Optimisas" },
  { skill: "Pengelolaan Dat" },
  { skill: "Explorasi Databas" },
]

const AboutSection = () => {
  return (
    <section id="about">
      <div className="my-12 pb-12 md:pt-16 md:pb-48">
        <h1 className="text-center font-bold text-4xl">
          About
          <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
        </h1>

        <div className="flex flex-col space-y-10 items-stretch justify-center align-top md:space-x-10 md:space-y-0 md:p-4 md:flex-row md:text-left">
          <div className="md:w-1/2 ">
            <h1 className="text-center text-2xl font-bold mb-6 md:text-left">
              Get to know Framework!
            </h1>
            <p>
              Framework ini dirancang untuk memudahkan eksekusi transaksi yang ada di Django. Dengan Framework ini, pengguna dapat:
            </p>
            <br />
            <li>
              Mengeksekusi query secara langsung, memberikan fleksibilitas dalam menjalankan perintah SQL yang spesifik.
            </li>
            <br />
            <li>
              Melakukan operasi memasukkan, membaca, memperbarui, dan menghapus data dari tabel database, sehingga memungkinkan pengelolaan data yang lebih efektif dan responsif.
            </li>
            <br />
            <p>
              Menggunakan django.db.connection dan django.db.transaction, helper ini memberikan kontrol penuh kepada developer untuk berinteraksi langsung dengan database. Ini memastikan efisiensi dan fleksibilitas dalam pengelolaan data, serta sangat ideal bagi developer yang ingin melakukan optimisasi performa atau menangani query kompleks dengan lebih mudah.
            </p>
            <br />
            <p>
              Dengan fitur ini, developer dapat dengan cepat menyesuaikan query sesuai kebutuhan aplikasi, mengurangi waktu development, dan meningkatkan produktivitas secara keseluruhan. Selain itu, kemampuan untuk menjalankan query yang tidak terbatas pada struktur model memungkinkan eksplorasi lebih dalam terhadap kemampuan database, sehingga menghasilkan solusi yang lebih inovatif dan sesuai dengan kebutuhan bisnis.
            </p>
          </div>
          <div className="text-center md:w-1/2 md:text-left">
            <h1 className="text-2xl font-bold mb-6">Tech & Feature</h1>
            <div className="flex flex-wrap flex-row justify-center z-10 md:justify-start">
              {skills.map((item, idx) => {
                return (
                  <p
                    key={idx}
                    className="bg-gray-200 px-4 py-2 mr-2 mt-2 text-gray-500 rounded font-semibold"
                  >
                    {item.skill}
                  </p>
                )
              })}
            </div>
            {/* @ts-ignore */}
            <Image
              src="/hero-image.png"
              alt=""
              width={200}
              height={200}
              className="hidden md:block md:relative md:left-32 md:z-0 rounded-full shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
