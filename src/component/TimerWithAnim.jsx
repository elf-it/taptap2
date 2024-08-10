import React from "react";

const TEXT_SIZE = 32
const LINE_HEIGHT = TEXT_SIZE * 1.5

export default function TimerWithAnim({ integers, signature, description }) {
  const { units, dozens } = integers;
  return (
    <div>
      <div style={{height:LINE_HEIGHT}} className={`overflow-hidden flex flex-row `}>
        <Integers current={dozens} />
        <Integers current={units} />
      </div>
      <div>{signature}</div>
    </div>
  );
}

function Integers({ current }) {
  const integers = [0,1,2,3,4,5,6,7,8,9]
  return (
    <div
      style={{ top: `-${current * LINE_HEIGHT}px` }}
      className={`flex flex-col items-center font-comic text-white relative text-[${TEXT_SIZE}px] transition-all`}
    >
      {integers.map((int) => {
        const isActive = int === current
        return <p className={`${isActive ? 'opacity-100' : 'opacity-0'} transition-all duration-75`}>{int}</p>
      })}
    </div>
  );
}
