import React from "react";
import NewProduct from "..";
import { IoClose } from "react-icons/io5";

export default function Modal(props) {
    const {setclose} = props

  return (
 
        <>
          <div
            className="bg-blue-700  bg-opacity-30 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="w-full relative md:my-5 md:w-auto md:mx-auto ">
              {/*content*/}
              <div className="transition ease-in-out border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none mt-5 focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="font-sans text-3xl font-bold">
                    Tambah Produk
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-shadow-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={setclose}
                  >
                    <span className="bg-transparent text-shadow-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    <IoClose />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow-y-hidden">
                  <NewProduct closeTab={setclose}/>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
