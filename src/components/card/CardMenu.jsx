import React, { useState, useEffect } from "react";
import Dropdown from "components/dropdown";
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { TbBrandCakephp, TbCake } from "react-icons/tb";
import { AiOutlineShop } from "react-icons/ai";
import { TiLightbulb } from "react-icons/ti";
import { useNavigate } from 'react-router-dom'
import Modal from "views/admin/newProduct/components/popup";


function CardMenu(props) {
  const navigate = useNavigate()
  const { transparent,kategori,menuItems, setKat } = props;
  const [open, setOpen] = React.useState(false);
  const [openadd, setOpenadd] = React.useState(false);
  
  const openPopup = () =>{
    setOpenadd(true)
  }
  const closePopup = () =>{
    setOpenadd(false)
  }

  return (
    <>
      <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          open={open}
          className={`flex items-center text-xl hover:cursor-pointer ${
            transparent
              ? "bg-none text-white hover:bg-none active:bg-none"
              : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          <BsThreeDots className="h-6 w-6" />
        </button>
      }
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
      children={
        <div className="z-50 w-max rounded-xl bg-white py-5 px-5 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <button onClick={openPopup} className="hover:text-navy-900 dark:bg-navy-800 dark:text-white rounded-md hover:bg-blue-300 bg-blue-50 px-2 py-2 flex items-center gap-2 text-gray-600">
            <span>
              <AiOutlinePlus />
            </span>
            Tambah Produk
          </button>
          <p className="px-3 pt-3">Kategori</p>
          <button onClick={setKat} className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600  hover:font-medium">
            <span>
              <AiOutlineShop />
            </span>
            Semua
          </button>
          
          {menuItems.map((Kat)=>(
            <button onClick={()=>kategori(Kat)} className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
            <span>
            <TbCake />
            </span>
            {Kat}
          </button>
          ))}
        </div>
      }
    />
    {openadd && (
      <Modal setclose={closePopup} />
    )} 
    </>
  );
}

export default CardMenu;
