import React, { createContext, useState } from "react";

export const LvlContext = createContext(null);

export default function LevelContext({children}) {
  const [level, setLevel] = useState(0);

  return (
    <LvlContext.Provider value={[level, setLevel]}>
      {children}
    </LvlContext.Provider>
  );
}
