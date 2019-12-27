import React from 'react';
import { useTheme } from '@material-ui/core/styles';

export default function RectIcon({ fill }) {
  const theme = useTheme();
  fill = typeof fill === 'undefined' ? theme.palette.icon.default : fill;

  return (
    <svg
      className="recharts-surface"
      width="14"
      height="14"
      viewBox="0 0 32 32"
      version="1.1"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: '4px',
      }}
    >
      <path
        stroke="none"
        fill={fill}
        d="M0,4h32v24h-32z"
        className="recharts-legend-icon"
      ></path>
    </svg>
  );
}
