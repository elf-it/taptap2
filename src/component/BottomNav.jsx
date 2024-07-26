import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "../routes";
import { Icon } from "./IconSprite";

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname.replace("/", "");
  const routesCurrentIndex = routes.findIndex((route) => route.path.includes(currentPath));

  return routesCurrentIndex > -1 &&  (
    <div className="absolute bottom-[10px] left-[17px] right-[17px]">
      <nav className="bg-bgColorGreen backdrop-blur-xl h-[76px] rounded-[15px] w-full relative">
        <div
          style={{ width: "25%", left: `${routesCurrentIndex * 25}%` }}
          className=" absolute h-full z-0 p-[4px] transition-all"
        >
          <div className="elem-bg_green h-full w-full rounded-[12px]"></div>
        </div>
        <ul className="flex flex-row justify-between gap-[2px] h-full">
          {routes.map((link, i) => (
            <NavLink
              key={i}
              className={
                "font-comic text-gradient text-sm flex-1 flex flex-col items-center justify-end gap-[4px] z-10 mb-[8px]"
              }
              to={link.path}
            >
              {({ isActive }) => {
                const normalOpacity = isActive || link.icon === "mamoth";
                return (
                  <>
                    <Icon
                      styles={{ opacity: normalOpacity ? 1 : 0.3 }}
                      name={link.icon}
                      size={link.icon === "mamoth" ? 38 : 24}
                      color={isActive ? "#79F2CE" : "#fff"}
                    />
                    {link.label}
                  </>
                );
              }}
            </NavLink>
          ))}
        </ul>
      </nav>
    </div>
  );
}
