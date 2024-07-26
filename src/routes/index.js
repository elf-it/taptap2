import AutoFarm from "../pages/AutoFarm";
import Dashboard from "../pages/Dashboard";
import Lottery from "../pages/Lottery";
import Main from "../pages/Main";

export const routes = [
  {
    path: "/",
    element: <Main />,
    label: "Games",
    icon: "mamoth"
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    label: "Дашборд",
    icon:"dashboard"
  },
  {
    path: "/auto-farm",
    element: <AutoFarm />,
    label: "Auto Farm",
    icon:"autofarm"
  },
  {
    path: "/lottery",
    element: <Lottery />,
    label: "Лоторея",
    icon: "lottery",
  },
];
