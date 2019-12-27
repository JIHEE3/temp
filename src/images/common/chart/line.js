import React from 'react';
import { useTheme } from '@material-ui/core/styles';

export default function LineIcon({ fill }) {
  const theme = useTheme();
  fill = typeof fill === 'undefined' ? theme.palette.icon.default : fill;

  return (
    <svg
      className="recharts-surface"
      width="14"
      height="14"
      viewBox="0 0 32 32"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: '4px',
      }}
    >
      <path
        strokeWidth="4"
        fill="none"
        stroke={fill}
        d="M0,16h10.666666666666666
            A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
            H32M21.333333333333332,16
            A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
        className="recharts-legend-icon"
      ></path>
    </svg>
  );
}
