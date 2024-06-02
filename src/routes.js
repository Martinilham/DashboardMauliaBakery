import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import TablesClients from "views/admin/client";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdProductionQuantityLimits,
  MdPersonAdd
} from "react-icons/md";
import Transaksi from "views/admin/Transaksi/transaksi";
import TransaksiBerhasil from "views/admin/TransaksiBerhasil/transaksiBerhasil";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  
  {
    name: "Tabel Produk",
    layout: "/admin",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Riwayat Transaksi",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "transaksi",
    component: <Transaksi />,
  },
  {
    name: "Transaksi Berhasil",
    layout: "/admin",
    icon: <MdPerson className="h-6 w-6" />,
    path: "berhasil",
    component: <TransaksiBerhasil />,
  },


];
export default routes;
