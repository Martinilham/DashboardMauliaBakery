import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "components/widget/Widget";
import { useEffect,useState } from "react";
import axios from "axios";


const Dashboard = () => {
  const [salesTotal, setSalesTotal] = useState(0);
  const [kueKeringTotal, setKueKeringTotal] = useState(0);
  const [kueBasahTotal, setKueBasahTotal] = useState(0);
  const [clientTotal, setClientTotal] = useState(0);
  const [jumlahOrderTotal, setJumlahOrderTotal] = useState(0);
  const [orderDikonfirmasiTotal, setOrderDikonfirmasiTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://maulia-bakeryserver.vercel.app/getdata", {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        let kueKering_Total = 0;
        let kueBasah_Total = 0;
        
        res.data.getBarang.forEach((item) => {
          if (item.kategori === "Kue Kering") {
            kueKering_Total+= item.jumlah;
          } else if (item.kategori === "Kue Basah") {
            kueBasah_Total+= item.jumlah;
          }
        });
  
        setKueKeringTotal(kueKering_Total)
        setKueBasahTotal(kueBasah_Total)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://maulia-bakeryserver.vercel.app/pesanan", {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        let totalSales = 0;
        let jumlah_order = res.data.length
        let dikonfirmasi = 0;
        res.data.forEach((item) => {
          if(item.statusbayar == "di bayar"){
            dikonfirmasi ++
          }
          totalSales += item.total;
        });
        setOrderDikonfirmasiTotal(dikonfirmasi)
        setJumlahOrderTotal(jumlah_order)
        setSalesTotal(totalSales);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://maulia-bakeryserver.vercel.app/user", {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        let totalUser = res.data.length;
  
        setClientTotal(totalUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const rupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    return formatter.format(number);
};
  
  return (
    <div>

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Penjualan"}
          subtitle={rupiah(salesTotal)}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Kue Kering"}
          subtitle={kueKeringTotal}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Kue Basah"}
          subtitle={kueBasahTotal}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Client"}
          subtitle={clientTotal}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Jumlah Order"}
          subtitle={jumlahOrderTotal}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Order Dikonfirmasi"}
          subtitle={orderDikonfirmasiTotal}
        />
        
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        </div>
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <MiniCalendar />
          <PieChartCard />
        </div>
      </div>
    
  );
};

export default Dashboard;
