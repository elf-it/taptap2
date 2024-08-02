import AutoFarm from "../pages/AutoFarm";
import Dashboard from "../pages/Dashboard";
import Lottery from "../pages/Lottery";
import Main from "../pages/Main";

import mamothIcon from "../assets/icons/icon__nav-mamoth.svg";
import dashboardIcon from "../assets/icons/icon__nav-dashboard.svg";
import autofarmIcon from "../assets/icons/icon__nav-autofarm.svg";
import lotteryIcon from "../assets/icons/icon__nav-lottery.svg";
import gamesIcon from "../assets/icons/icon__nav-games.svg";

export const routes = [
  {
    path: "/",
    element: <Main setNumPage={setNumPage} person={person} addStep={addStep} count={count} allSteps={allSteps} />,
    label: "Games",
    icon: mamothIcon,
    visible: true,
  },
  {
    path: "/",
    element: <Dashboard person={person} count={count} />,
    label: "Дашборд",
    icon: dashboardIcon,
    visible: true,
  },
  {
    path: "/",
    element: <AutoFarm setNumPage={setNumPage} />,
    label: "Auto Farm",
    icon: autofarmIcon,
    visible: true,
  },
  {
    path: "/",
    element: <Lottery />,
    label: "Лотерея",
    icon: lotteryIcon,
    visible: true,
  },
  {
    path: "/",
    element: null,
    label: "Games",
    icon: gamesIcon,
    visible: true,
  }
];
