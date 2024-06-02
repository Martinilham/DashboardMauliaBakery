import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopupDetail from "./popupDetail";
import moment from "moment-timezone";

const DataTransaksi = ({ data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openadd, setOpenadd] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [openaddDetail, setOpenaddDetail] = useState(false); // Add state for detail popup

  const openPopup = (id) => {
    setProductToEdit(id);
    setOpenadd(true);
  };

  const openPopupDetail = (id) => {
    setProductToEdit(id);
    setOpenaddDetail(true); // Open detail popup
  };

  const closePopup = () => {
    setProductToEdit(null);
    setOpenadd(false);
  };

  const rupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    return formatter.format(number);
  };

  const deleteProduk = async (id) => {
    try {
      await axios.delete(`https://mauliya-bakeryserve.vercel.app/getdata/${id}`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const setLocal = (tanggal) => {
    const wibDateTime = moment.utc(tanggal).tz("Asia/Jakarta");
    return wibDateTime.format("YYYY-MM-DD HH:mm:ss");
  };

  return (
    <>
      {data
      .filter(
        (barang) =>
          barang.statusbayar === "Bayar Ditempat" || barang.statusbayar === "success" &&
          (barang.statusditerima === "processing")
      ).map((barang, index) => (
        <tr
          key={barang._id}
          className={`${index % 2 === 0 ? "dark" : "light"}:bg-white hover:bg-gray-200  dark:${
            index % 2 === 0 ? "odd" : "even"
          }:bg-gray-800 dark:hover:bg-gray-700 `}
        >
          <td className="px-3 py-4  text-sm font-medium">{setLocal(barang.tglorder)}</td>
          <td className="px-1 py-4 whitespace-nowrap text-start text-sm font-medium">
            <button
              type="button"
              className="inline-flex items-center gap-x-2 text-sm font-semibold border-none text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              onClick={() => openPopupDetail(barang._id)} 
            >
              Detail
            </button>
          </td>
          <td className="px-1 py-4 whitespace-nowrap text-start text-sm font-medium">{barang.namapemesan}</td>
          <td className="text-sm font-bold text-navy-700 dark:text-white">{barang.notlpn}</td>
          <td className="text-sm font-bold text-navy-700 dark:text-white">{barang.Items?.length}</td>
          <td className="text-sm font-bold text-navy-700 dark:text-white">{rupiah(barang.total)}</td>
          <td className="text-sm font-bold text-navy-700 dark:text-white">
            {barang.statusbayar == "success" ? (
              <p className="bg-green-500 px-1 text-center w-24 rounded-md">{barang.statusbayar}</p>
            ) : (
              <p className="bg-yellow-500 px-1 text-center w-24 rounded-md">{barang.statusbayar}</p>
            )}
          </td>
          <td className="text-sm font-bold text-navy-700 dark:text-white">
            {barang.statusditerima == "diterima" ? (
              <p className="bg-green-500 px-1 text-center w-24 rounded-md">{barang.statusditerima}</p>
            ) : (
              <p className="bg-yellow-500 px-1 text-center w-24 rounded-md">{barang.statusditerima}</p>
            )}
          </td>
        </tr>
      ))}

      {openaddDetail && (
        <PopupDetail productData={productToEdit} closePopup={() => setOpenaddDetail(false)} />
      )}
    </>
  );
};

export default DataTransaksi;
