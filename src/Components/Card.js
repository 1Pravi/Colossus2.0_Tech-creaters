import React from "react";

const Card = ({ title, value, icon }) => (
  <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center justify-center w-full">
    <div className="text-gray-500 text-sm">{title}</div>
    <div className="text-2xl font-bold flex items-center gap-2">{icon} {value}</div>
  </div>
);

export default Card;