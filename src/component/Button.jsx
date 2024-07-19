import React from 'react'

export default function Button({children,handler, color, textColor = 'black', icon = null, ...props}) {
  return (
    <button onClick={handler} style={{backgroundColor:color}} className={`py-[8px] rounded-xl w-full flex flex-row items-center justify-center gap-[10px]`}>
        {icon}
        <div className='font-comic text-sm' style={{color:textColor}}>{children}</div>
    </button>
  )
}
