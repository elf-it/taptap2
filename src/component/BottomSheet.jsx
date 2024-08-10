import React, { useState } from "react";
import { Icon } from "./IconSprite";

export default function BottomSheet({
  image,
  btnText,
  children,
  isBottomSheetVisible,
  toggleBottomSheetVisible,
}) {
  const onOverlayClose = (e) => {
    if (e && e.target === e.currentTarget) {
      toggleBottomSheetVisible(false);
    }
  };

  const close = () => {
    toggleBottomSheetVisible(false);
  };

  const saveAndClose = () => {
    // other code
    toggleBottomSheetVisible(false);
  };

  return (
    <div
      onClick={onOverlayClose}
      className={`h-full  w-full absolute top-0 transition-all ${
        !isBottomSheetVisible
          ? "pointer-events-none backdrop-blur-none"
          : "pointer-events-auto backdrop-blur-md"
      } flex flex-row items-end z-[20]`}
    >
      <div
        className={`transition-all will-change-auto relative p-[1px] ${
          !isBottomSheetVisible ? "bottom-[-100%]" : "bottom-0"
        } bg-gradient-to-b from-gradientStartColor to-[#0F0F0F] rounded-t-[13px] w-full`}
      >
        <div className="bg-[#0F0F0F] w-full h-full rounded-[12px] p-[25px] flex flex-col items-center">
          <div className="bg-gradient-to-b from-gradientStartColor to-gradientEndColor p-[16px] rounded-[18px] absolute top-[-40px] shadow-[#45E9B8] shadow-lg">
            <img className="w-[52px] h-[52px]" src={image} alt="" />
          </div>
          <button onClick={close} className="self-end">
            <Icon name="cross" color={"rgba(255,255,255,0.5)"} size={24} />
          </button>
          <div className="mt-[20px]">{children}</div>
          <button
            onClick={close}
            className={`font-comic text-sm text-black py-[15px] rounded-xl w-full flex flex-row items-center justify-center gap-[10px] bg-gradient-to-b from-gradientStartColor to-gradientEndColor`}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}
