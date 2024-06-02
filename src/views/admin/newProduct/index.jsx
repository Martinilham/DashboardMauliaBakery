import React, { useState } from "react";
import "./step.css";
import { TiTick } from "react-icons/ti";
import InputField from "components/fields/InputField";
import axios from "axios"

export default function NewProduct(props) {
  const {closeTab} = props
  const [produk, setproduk] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [kategori, setkategori] = useState("");
  const [jumlah, setjumlah] = useState(0);
  const [harga, setharga] = useState(0);
  const [discount, setdiscount] = useState(0);
  const [gambar, setGambar] = useState("");
  const steps = ["Info Barang", "Media", "Harga", "Konfirmasi"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [file, setFile] = useState();

  function handleChange(e) {
    setGambar(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  

  const handleNextOrFinish = async (e) => {
    if (currentStep === steps.length) {
      e.preventDefault();
    
        var formData = new FormData();
        formData.append("fname", produk);
        formData.append("deskripsi", deskripsi);
        formData.append("kategori", kategori);
        formData.append("jumlah", jumlah);
        formData.append("harga", harga);
        formData.append("discount", discount);
        formData.append("photo", gambar);
    
      try {
        
        const response = await axios.post("https://mauliya-bakeryserve.vercel.app/register", formData, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data"
          }
          
        });
        if (response.status == 201) {
          setComplete(true);
        }else {
          
          console.error("Failed to post data:", response.statusText);
        }
      } catch (error) {
        
        console.error("Network error:", error.message);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className=" relative flex w-full flex-col items-center">
      <div className="flex w-full justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            }`}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>

      {/* Text input field */}
      {currentStep === 1 && (
        <div className="mx-auto mt-2 w-full">
        <label
          className="ml-3 mb-2 block font-sans font-bold text-gray-700"
          htmlFor="text"
        >
          Nama Barang
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border border-gray-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="produk"
          type="text"
          placeholder="contoh: Kue Salju"
          autoComplete="off"
          value={produk}
          onChange={(e) => setproduk(e.target.value)}
        ></input>
      
        <label 
          className="mt-2 ml-3 mb-2 block font-sans font-bold text-gray-700"
          htmlFor="jenis_kue">
          Kategory
        </label>
        
        <select
          name="jenis_kue"
          id="jenis_kue"
          placeholder="Pilih Kategori"
          className="font-sans focus:shadow-outline w-full appearance-none rounded border border-gray-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          autoComplete="off"
          value={kategori}
          onChange={(e) => setkategori(e.target.value)}
        >
          <option value="" disabled defaultValue>
            pilih kategori
          </option>
          <option value="Kue Kering">Kue Kering</option>
          <option value="Kue Basah">Kue Basah</option>
        </select>
      
        <label
          className="mt-5 ml-3 mb-2 block font-sans font-bold text-gray-700"
          htmlFor="text"
        >
          Deskripsi
        </label>
        <textarea
          className="mb-4 h-24 w-full resize-none rounded border border-gray-500 px-3 py-1 text-sm outline-none placeholder:text-sm"
          placeholder="Tambahkan deskripsi"
          value={deskripsi}
          onChange={(e) => setdeskripsi(e.target.value)}
        ></textarea>
      </div>      
      )}

      {currentStep === 2 && (
        <div className="bg-black flex h-full w-full bg-opacity-60">
          <div className="extraOutline bg-whtie m-auto w-full rounded-lg bg-white p-4">
            <div className="file_upload relative w-full rounded-lg border-4 border-dotted border-gray-300 p-5">
              {file == null && (
                <svg
                  className="mx-auto mb-4 w-24 text-indigo-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              )}
              <img src={file} alt="" className="mx-auto w-72" />
              <div className="input_field mx-auto flex w-max flex-col text-center">
                <label>
                  <input
                    className="hidden w-36 cursor-pointer text-sm"
                    type="file"
                    onChange={handleChange}
                  />
                  <div className="text cursor-pointer rounded border border-gray-300 bg-indigo-600 p-1 px-3 font-semibold text-white hover:bg-indigo-500">
                    Select
                  </div>
                </label>
                <div className="title uppercase text-indigo-500">
                  or drop files here
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="mx-auto mt-7 w-full">
          <label
            className="ml-3 mb-2 block font-sans font-bold text-gray-700"
            for="text"
          >
            Stok
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border border-gray-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            type="text"
            placeholder="contoh: 20"
            value={jumlah}
            onChange={(e) => setjumlah(e.target.value)}
          ></input>

          <label
            className="ml-3 mb-2 block font-sans font-bold text-gray-700"
            for="text"
          >
            Diskon
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border border-gray-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="text"
            type="text"
            placeholder="contoh: 10"
            value={discount}
            onChange={(e) => setdiscount(e.target.value)}
          ></input>

          <label
            className="ml-3 mb-2 block font-sans font-bold text-gray-700"
            for="text"
          >
            Harga
          </label>
          <input
            className=" focus:shadow-outline w-full appearance-none rounded border border-gray-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="text"
            type="text"
            placeholder="contoh: 10000"
            value={harga}
            onChange={(e) => setharga(e.target.value)}
          ></input>
        </div>
      )}
      {currentStep === 4 && !complete && (
        <>
          <img src={file} alt="" className="mx-auto w-72" />
          <div className="flex flex-row gap-2 mr-24">
            <div className="">
              <h3>Nama Produk</h3>
              <h3>Kategory</h3>
              <h3>Deskripsi</h3>
              <h3>Harga</h3>
              <h3>Stok</h3>
              <h3>diskon</h3>
            </div>
            <div>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
            <div>
              <h3>{produk}</h3>
              <h3>{kategori}</h3>
              <h3>{deskripsi}</h3>
              <h3>{harga}</h3>
              <h3>{jumlah}</h3>
              <h3>{discount}</h3>
            </div>
          </div>
          
          
        </>
      )}

      {/* Next or Finish button */}
      {!complete && (
        <div className=" mt-2 flex w-full flex-row justify-between">
          {currentStep !== 1 && (
            <button
              className=" linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
              onClick={handlePrev}
            >
              Previous
            </button>
          )}
          {currentStep === 1 && (
            <button
              className="linear pointer-events-none rounded-[20px] bg-brand-100 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
              onClick={handlePrev}
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNextOrFinish}
            className=" linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          >
            {currentStep === steps.length ? "Finish" : "Next"}
          </button>
        </div>
      )}

      {/* Success message */}
      {complete && (
        <div className="my-5 flex justify-center mt-4 flex-col">
          <img
            src={require("../../../assets/img/icon/accept.png")}
            alt=""
            className="w-24 h-24 mx-auto"
          ></img>
          <p className="mt-4 font-medium text-green-500">
            Success! Produk Berhasil Ditambahkan.
          </p>
          <button
            className="mx-auto mt-4 linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            onClick={closeTab}
          >
            Tutup
          </button>
        </div>
      )}
    </div>
  );
}
