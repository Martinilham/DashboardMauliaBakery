import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopupEditStok from "views/admin/tables/components/popupStok";
import PopupEdit from "views/admin/editProduct/components/popup";

const Data = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const [productToEdit, setProductToEdit] = useState(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openStockPopup, setOpenStockPopup] = useState(false);

  const openPopup = (id) => {
    setProductToEdit(id);
    setOpenEditPopup(true);
  };

  const openPopupStok = (id) => {
    setProductToEdit(id);
    setOpenStockPopup(true);
  };

  const closePopup = () => {
    setProductToEdit(null);
    setOpenEditPopup(false);
    setOpenStockPopup(false);
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
      await axios.delete(`https://maulia-bakeryserver.vercel.app/getdata/${id}`);
      
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      {data.map((barang, index) => (
        <tr
          key={barang._id}
          className={`${
            index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"
          } hover:bg-gray-200 dark:hover:bg-gray-600`}
        >
          <td className="px-3 py-4 text-sm font-medium">
            <img
              src={barang.imgpath}
              alt={barang.namaproduk}
              style={{ maxWidth: "60px", height: "60px" }}
            />
          </td>
          <td className="px-1 py-4 whitespace-nowrap text-start text-sm font-medium">
            <button
              type="button"
              className="inline-flex items-center gap-x-2 text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
              onClick={() => openPopup(barang._id)}
            >
              Edit
            </button>
          </td>
          <td className="px-1 py-4 whitespace-nowrap text-start text-sm font-medium">
            <button
              type="button"
              className="inline-flex items-center gap-x-2 text-sm font-semibold text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
              onClick={() => deleteProduk(barang._id)}
            >
              Delete
            </button>
          </td>
          <td className="text-sm font-bold text-navy-700 dark:text-white">
            {barang.fname}
          </td>
          <td className="text-sm font-bold text-navy-700 dark:text-white">
            {rupiah(barang.harga)}
          </td>
          <td className="text-sm font-bold text-navy-700 dark:text-white">
            {barang.kategori}
          </td>
          <td className="text-sm font-bold text-navy-700 dark:text-white">
            {barang.jumlah === 0 ? (
              <button
                className="bg-red-500 px-1 rounded-md mx-auto"
                onClick={() => openPopupStok(barang._id)}
              >
                Tambah
              </button>
            ) : (
              barang.jumlah
            )}
          </td>
        </tr>
      ))}
      {openEditPopup && (
        <PopupEdit productData={productToEdit} closePopup={closePopup} />
      )}
      {openStockPopup && (
        <PopupEditStok productData={productToEdit} closePopup={closePopup} />
      )}
    </>
  );
};

export default Data;
