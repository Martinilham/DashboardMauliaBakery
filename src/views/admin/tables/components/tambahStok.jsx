import React, { useState } from "react";
import axios from "axios";

export default function EditStok(props) {
  const { closeTab, idProduct } = props;
  const [jumlah, setJumlah] = useState(0);

  const Finish = async (e) => {
    e.preventDefault();

    const jumlahNumber = parseInt(jumlah, 10);

    if (isNaN(jumlahNumber) || jumlahNumber <= 0) {
      console.error("Invalid input for jumlah. Please enter a valid positive number.");
      return;
    }

    const payload = { jumlah: jumlahNumber };

    try {
      const response = await axios.put(
        `https://maulia-bakeryserver.vercel.app/tambahstok/${idProduct}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        closeTab();
      } else {
        console.error("Failed to update product:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="mx-auto mt-7 w-full">
        <label
          className="ml-3 mb-2 block font-sans font-bold text-gray-700"
          htmlFor="jumlah"
        >
          Stok
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border border-gray-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="jumlah"
          type="number"
          placeholder="contoh: 20"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
        />
      </div>

      <button
        className="mx-auto mt-4 linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
        onClick={Finish}
      >
        Update Stock
      </button>
    </div>
  );
}
