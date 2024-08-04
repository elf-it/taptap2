import React, { createContext, useState } from "react";

export const LngContext = createContext(null);

export default function LangContext({children}) {
  const [lang, setLang] = useState(null);

  return (
    <LngContext.Provider value={[lang, setLang]}>
      {children}
    </LngContext.Provider>
  );
}