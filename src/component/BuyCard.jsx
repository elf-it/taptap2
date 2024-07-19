import React from "react";
import Button from "./Button";

export default function BuyCard({ data = [] }) {
  return (
    <div className={`${data.colorClass} px-[24px] py-[20px] rounded-[15px] w-full flex flex-col items-center gap-[8px]`}>
      <div className="flex flex-row gap-[18px]">
        <img className="w-[70px] h-[70px]" src={data.image} alt="" />
        <div className="flex flex-col gap-[3px]">
          <h3 className="text-white font-comic text-lg font-bold">
            {data.title}
          </h3>
          <p className="text-sm font-comic text-white">{data.descr}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[8px]">
        {data.tarrifs.map((tarrif, i) => (
          <div 
            key={i}
            className={`flex flex-row items-center gap-[8px] justify-between pb-[8px] ${
              i !== data.tarrifs.length - 1 ? "border-b" : ""
            } border-white/20`}
          >
            <div className="flex flex-row items-center gap-[8px]">
              <img src={tarrif.image} alt="" />
              <p className="text-white font-bold font-comic text-lg">
                {tarrif.time}
              </p>
            </div>
            <p
              style={{ color: data.btn.color }}
              className="text-white font-bold font-comic text-xl"
            >
              {tarrif.count} TON
            </p>
          </div>
        ))}
      </div>
      <Button
        handler={() => data.btn.handler(data)}
        textColor={data.btn.textColor}
        icon={<img src={data.btn.icon} alt="" />}
        color={data.btn.color}
        children={data.btn.text}
      />
      {data.info && (
        <p className="text-white/50 font-bold font-comic text-sm">
          {data.info}
        </p>
      )}
    </div>
  );
}
