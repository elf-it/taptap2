import React from "react";
import Icons from '../assets/sprite.svg'
 
export const Icon = ({ name, color, size, styles }) => (
    <svg style={styles} className={`icon icon-${name}`} fill={color} width={size} height={size} >
      <use xlinkHref={`${Icons}#${name}`} />
    </svg>
  );
 
   
