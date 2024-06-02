import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopupEdit from "views/admin/editProduct/components/popup";


const DataClient = (props)=>{
    const {data} = props
    const navigate = useNavigate();
    const [openadd, setOpenadd] = React.useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
  
  const openPopup = (id) =>{
    setProductToEdit(id)
    setOpenadd(true)
  }
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



    return (
        <>
            {data.map((barang, index) => (
                <tr
                key={barang._id}
                  className={`${index % 2 === 0 ? "dark" : "light"}:bg-white hover:bg-gray-200  dark:${
                    index % 2 === 0 ? "odd" : "even"
                  }:bg-gray-800 dark:hover:bg-gray-700 `}
                >
                  <td className="px-3 py-4  text-sm font-medium ">
                    <img
                      src={barang.imgpath}
                      alt={barang.namaproduk}
                      style={{ maxWidth: "60px", height: "60px" }}
                    />
                  </td>
                  <td className="px-1 py-4 whitespace-nowrap text-start text-sm font-medium">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2 text-sm font-semibold border-none text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={()=>openPopup(barang._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-1 py-4 whitespace-nowrap text-start text-sm font-medium">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2 text-sm font-semibold border-none text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={()=>deleteProduk(barang._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {barang.nama}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {barang.email}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {barang.kategori}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {barang.jumlah}
                  </td>
                </tr>
              ))}
              {openadd && (
                <>
                  <PopupEdit productData={productToEdit} closePopup={closePopup}/>
                </>
              )}
        </>
    )
}

export default DataClient;