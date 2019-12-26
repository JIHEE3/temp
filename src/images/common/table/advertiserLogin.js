import React from 'react';
import { useTheme } from '@material-ui/core/styles';

export default function AdvertiserLoginIcon({ fill }) {
  const theme = useTheme();
  fill = typeof fill === 'undefined' ? theme.palette.icon.default : fill;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill={fill}
    >
      <g id="icon_advertiser_login" transform="translate(0 62.222)">
        <path
          id="패스_194"
          d="M6.648 352h-.122a4.291 4.291 0 0 1-1.412.256A4.291 4.291 0 0 1 3.7 352h-.12A3.58 3.58 0 0 0 0 355.58a1.534 1.534 0 0 0 1.534 1.534h7.16a1.534 1.534 0 0 0 1.534-1.534 3.58 3.58 0 0 0-3.58-3.58z"
          data-name="패스 194"
          transform="translate(0 -401.336)"
        />
        <circle
          id="타원_1"
          cx="3.068"
          cy="3.068"
          r="3.068"
          data-name="타원 1"
          transform="translate(2.046 -56.318)"
        />
        <circle
          id="타원_2"
          cx="1.388"
          cy="1.388"
          r="1.388"
          data-name="타원 2"
          transform="translate(11.494 -53.408)"
        />
        <path
          id="패스_195"
          d="M269.037-56.672h-2.388v-2.081a3.469 3.469 0 0 0-3.469-3.469 3.469 3.469 0 0 0-3.469 3.469v2.081h-.388a1.381 1.381 0 0 0-.944.371.931.931 0 0 0-.158.553 3.27 3.27 0 0 1 .7 1.157h9.418v5.55h-8.325a5.255 5.255 0 0 1 1.3 2.081h7.723a1.388 1.388 0 0 0 1.388-1.388v-6.938a1.388 1.388 0 0 0-1.388-1.386zm-4.469 0h-2.775v-2.081a1.388 1.388 0 0 1 1.388-1.388 1.388 1.388 0 0 1 1.388 1.388z"
          data-name="패스 195"
          transform="translate(-250.424)"
        />
      </g>
    </svg>
  );
}
