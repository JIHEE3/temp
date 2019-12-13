import React from 'react';
import numeral from 'numeral';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tooltipRoot: {
    backgroundColor: '#fff',
    padding: '5px 10px',
    border: theme.palette.box.border,
  },
  list: {
    listStyle: 'none',
  },
}));

export default function ChartTooltip({
  isPercent,
  label,
  payload = [],
  keyLabel,
  customizeData = {},
}) {
  const classes = useStyles();

  return (
    <div className={classes.tooltipRoot}>
      {/* <p className="total">{`${label} (Total: ${total})`}</p> */}
      <p className="total">{label}</p>
      <ul className={classes.list}>
        {Boolean(payload) &&
          payload.map((entry, index) => {
            const { dataKey } = entry;
            const vanillaValue = entry.payload[`vanilla_${dataKey}`];
            const hasPercent =
              isPercent ||
              (typeof customizeData[dataKey] !== 'undefined' &&
                customizeData[dataKey].isPercent)
                ? '%'
                : '';
            const formatInfo =
              typeof customizeData[dataKey] === 'undefined' ||
              typeof customizeData[dataKey].tooltipFormat === 'undefined'
                ? ''
                : customizeData[dataKey].tooltipFormat;

            return (
              <li key={`item-${index}`} style={{ color: entry.color }}>
                {typeof keyLabel === 'undefined'
                  ? ''
                  : `${keyLabel[dataKey]}: `}
                {typeof vanillaValue === 'undefined'
                  ? `${numeral(entry.value).format(formatInfo)}${hasPercent}`
                  : `${numeral(vanillaValue).format(formatInfo)}(${numeral(
                      entry.value
                    ).format(formatInfo)}${hasPercent})`}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
