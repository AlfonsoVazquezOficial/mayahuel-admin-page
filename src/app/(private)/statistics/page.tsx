'use client'
import React from "react";
import BasePage from "../../common/BasePage";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StatisticsPage = () => {
  const data = [
    { name: "Ene", ventas: 400 },
    { name: "Feb", ventas: 300 },
    { name: "Mar", ventas: 200 },
  ];
  return (
    <BasePage
      title="Estadísticas"
      description={"Aquí puedes ver las estadísticas de tu tienda."}
    >
      <div>
        <LineChart width={400} height={250} data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="ventas" stroke="#8884d8" />
        </LineChart>
      </div>
    </BasePage>
  );
};

export default StatisticsPage;
