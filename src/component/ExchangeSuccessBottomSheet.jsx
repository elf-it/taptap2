import React from "react";
import mamothIcon from "../assets/icons/icon__nav-mamoth.svg";
import coinsIcon from "../assets/icons/icon__coins.svg";
import { createPortal } from "react-dom";
import BottomSheet from "./BottomSheet";

export default function ExchangeSuccessBottomSheet({
  isBottomSheetVisible,
  toggleBottomSheetVisible,
  automoney
}) {
  console.log(automoney)
  return createPortal(
    <BottomSheet
      image={mamothIcon}
      btnText="Спасибо!"
      isBottomSheetVisible={isBottomSheetVisible}
      toggleBottomSheetVisible={toggleBottomSheetVisible}
    >
      <div className="flex flex-col items-center mb-[20px]">
        <p className="text-white font-comic text-center">
          Биржа начала работать на вас
        </p>
        <div className="flex flex-row gap-[10px] items-end">
          <img className="mb-[15px]" src={coinsIcon} alt="" />
          <p className="text-[50px] text-gradient font-comic font-bold">
            {automoney}
          </p>
        </div>
      </div>
    </BottomSheet>,
    document.body
  );
}
