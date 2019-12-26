import React from 'react';
import { useTheme } from '@material-ui/core/styles';

export default function StatisticsIcon({ fill }) {
  const theme = useTheme();
  fill = typeof fill === 'undefined' ? theme.palette.icon.default : fill;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill={fill}
    >
      <path
        id="icon_advertiser_statistics"
        d="M6.5 11h-.119A4.2 4.2 0 0 1 5 11.25 4.2 4.2 0 0 1 3.619 11H3.5A3.5 3.5 0 0 0 0 14.5 1.5 1.5 0 0 0 1.5 16h7a1.5 1.5 0 0 0 1.5-1.5A3.5 3.5 0 0 0 6.5 11zm12-11h-12A1.527 1.527 0 0 0 5 1.55V3a3.955 3.955 0 0 1 2 .556V2h11v9H9.618a3.983 3.983 0 0 1 1.24 2H18.5a1.527 1.527 0 0 0 1.5-1.55v-9.9A1.527 1.527 0 0 0 18.5 0zM5 10a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm5.28-4.78a.75.75 0 0 0-1.061 0l-.461.461A3.953 3.953 0 0 1 9 7a3.943 3.943 0 0 1-.063.623l.813-.813 1.72 1.72a.75.75 0 0 0 1.061 0l2.25-2.25.759.759a.563.563 0 0 0 .96-.4V3.875a.375.375 0 0 0-.375-.375h-2.767a.563.563 0 0 0-.4.96l.759.759L12 6.939z"
      />
    </svg>
  );
}
