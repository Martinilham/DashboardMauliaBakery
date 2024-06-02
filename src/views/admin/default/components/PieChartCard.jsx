import React, { useState, useEffect } from "react";
import PieChart from "components/charts/PieChart";
import Card from "components/card";

const PieChartCard = () => {
  const [salesData, setSalesData] = useState([]);
  const [pieChartData, setPieChartData] = useState([0, 0]);
  const [timeframe, setTimeframe] = useState("monthly");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://maulia-bakeryserver.vercel.app/pesanan"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
  
        const monthlySales = {};
        data.forEach((order) => {
          const yearMonth = order.tglorder.split("-").slice(0, 2).join("-");
          if (!monthlySales[yearMonth]) {
            monthlySales[yearMonth] = { "Roti Kering": 0, "Roti Basah": 0 };
          }
  
          order.items.forEach((item) => {
            if (item.kategori === "Kue Kering") {
              monthlySales[yearMonth]["Roti Kering"] +=
                item.harga * item.jumlah;
            } else if (item.kategori === "Kue Basah") {
              monthlySales[yearMonth]["Roti Basah"] +=
                item.harga * item.jumlah;
            }
          });
        });
  
        const formattedData = Object.keys(monthlySales).map((yearMonth) => ({
          yearMonth,
          "Roti Kering": monthlySales[yearMonth]["Roti Kering"],
          "Roti Basah": monthlySales[yearMonth]["Roti Basah"],
        }));
  
        setSalesData(formattedData);
        calculatePieChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const calculatePieChartData = (data) => {
    let totalKering = 0;
    let totalBasah = 0;

    data.forEach((monthData) => {
      totalKering += monthData["Roti Kering"];
      totalBasah += monthData["Roti Basah"];
    });

    const total = totalKering + totalBasah;
    const keringPercentage = (totalKering / total) * 100;
    const basahPercentage = (totalBasah / total) * 100;

    setPieChartData([keringPercentage, basahPercentage]);
  };

  const pieChartOptions = {
    labels: ["Roti Kering", "Roti Basah"],
    colors: ["#4318FF", "#6AD2FF"],
  };

  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Sales Comparison
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <select
            className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart options={pieChartOptions} series={pieChartData} />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-brand-500" />
            <p className="ml-1 text-sm font-normal text-gray-600">Roti Kering</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {pieChartData[0].toFixed(2)}%
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">Roti Basah</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {pieChartData[1].toFixed(2)}%
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PieChartCard;
