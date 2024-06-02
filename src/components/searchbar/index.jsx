import React from 'react'
import { FiSearch } from "react-icons/fi";

const SearchBar = (props) =>{
    const {setSearch} = props
    return (
        <>
        <div className="mt-3 flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            class="block h-10 w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
            onChange={setSearch}
          />
        </div>
        </>
    )
}

export default SearchBar;