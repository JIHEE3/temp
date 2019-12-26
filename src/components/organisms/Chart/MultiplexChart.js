import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useTheme } from '@material-ui/core/styles';
import CartWrap from './ChartWrap';
import ChartTooltip from './ChartTooltip';

import { toPercent, numberFormatter } from 'lib/commonLib';

// 임시 나중에 합쳐야함
const renderTooltipContent = ({
  isPercent,
  payload,
  label,
  keyLabel,
  customizeData,
  dataKeys,
  makeLabel,
}) => {
  if (typeof makeLabel !== 'undefined') {
    label = makeLabel(label);
  }

  return (
    <ChartTooltip
      label={label}
      payload={payload}
      keyLabel={keyLabel}
      isPercent={isPercent}
      customizeData={customizeData}
      dataKeys={dataKeys}
    />
  );
};

/**
 * y 축 만들어 주는 함수
 * @param {json} param0 { axisData: 축데이터, orientation: 'right' || 'left' }
 */
const makeYAxis = ({ axisData, orientation, keyLabel, maxData = {} }) => {
  const result = [];
  if (axisData.individually === true) {
    for (let key in axisData) {
      if (axisData.hasOwnProperty(key) && key !== 'individually') {
        const { isPercent } = axisData[key];
        result.push(
          <YAxis
            key={key}
            yAxisId={key}
            orientation={orientation}
            tickFormatter={Boolean(isPercent) ? toPercent : numberFormatter}
            label={
              typeof keyLabel[key] !== 'undefined' && {
                value: `(${keyLabel[key]})`,
                // angle: -90,
                position: 'insideBottom',
                offset: -25,
                fill: '#666',
              }
            }
            domain={
              maxData[key] !== undefined
                ? ['auto', isPercent ? maxData[key] * 100 : maxData[key]]
                : [0, 'auto']
            }
          />
        );
      }
    }
  } else {
    let key = null;
    let isPercent = false;
    for (let curKey in axisData) {
      if (axisData.hasOwnProperty(curKey)) {
        if (curKey === 'isPercent') {
          isPercent = axisData['isPercent'];
        } else {
          key = curKey;
        }
      }
    }

    result.push(
      <YAxis
        key={`yAxis_${orientation}`}
        yAxisId={orientation}
        orientation={orientation}
        tickFormatter={Boolean(isPercent) ? toPercent : numberFormatter}
        domain={
          maxData[key] !== undefined
            ? ['auto', isPercent ? maxData[key] * 100 : maxData[key]]
            : [0, 'auto']
        }
      />
    );
  }

  return result;
};

const handleHiddenData = e => {
  console.log(e.dataKey);
};

/**
 * 축 id 반환
 * @param {json} param0 { axisData: 축데이터, key: dataKey }
 */
const getYAxisId = ({ axisData, key }) => {
  let yAxisId = 'left';
  if (typeof axisData !== 'undefined') {
    if (
      axisData.left.individually === true &&
      typeof axisData.left[key] !== 'undefined'
    ) {
      yAxisId = key;
    } else if (typeof axisData.right[key] !== 'undefined') {
      if (axisData.right.individually === true) {
        yAxisId = key;
      } else {
        yAxisId = 'right';
      }
    }
  }

  return yAxisId;
};

export default function MultiplexChart({
  xInterval = 0,
  xAxisTick,
  makeLabel,
  className = '',
  width = 500,
  height = 300,
  title,
  isPercent,
  data,
  dataKeys,
  legend = false,
  variousColoredCells = false,
  legendData,
  keyLabel,
  customizeData = {},
  barLabel = false,
  stackId,
  yAxisData,
  maxData,
}) {
  const theme = useTheme();
  const { graph } = theme.palette;

  const makeTootipContent = props => {
    return renderTooltipContent({
      ...props,
      keyLabel,
      isPercent,
      customizeData,
      dataKeys,
      makeLabel,
    });
  };

  const legendHeight = 35;
  const tickFormatter = isPercent ? toPercent : numberFormatter;
  const maxIndex = Object.keys(graph.color).length;
  let colorIndex = 0;

  const haveRightYAxis =
    typeof yAxisData !== 'undefined' &&
    Object.keys(yAxisData.right).length !== 0;
  const { bar, line } = dataKeys;
  return (
    <CartWrap className={`${className}`} title={title}>
      <div style={{ width, height }}>
        <ResponsiveContainer>
          <ComposedChart
            // width={width}
            // height={height}
            data={data}
            margin={{
              top: 5,
              right:
                typeof yAxisData !== 'undefined' && !haveRightYAxis ? 0 : 30,
              left: 40,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={xAxisTick} interval={xInterval} />
            {typeof yAxisData !== 'undefined' ? (
              (() => {
                const result = [
                  ...makeYAxis({
                    axisData: yAxisData.left,
                    orientation: 'left',
                    keyLabel,
                    maxData,
                  }),
                ];

                if (haveRightYAxis) {
                  result.push(
                    ...makeYAxis({
                      axisData: yAxisData.right,
                      orientation: 'right',
                      keyLabel,
                      maxData,
                    })
                  );
                }
                return result;
              })()
            ) : (
              <YAxis
                yAxisId="left"
                orientation="left"
                tickFormatter={tickFormatter}
                domain={isPercent ? [0, 100] : [0, 'auto']}
              />
            )}
            <Tooltip content={makeTootipContent} />
            {legend &&
              (typeof legendData === 'undefined' ? (
                <Legend
                  onClick={handleHiddenData}
                  verticalAlign="top"
                  // align="right"
                  height={legendHeight}
                  // wrapperStyle={{ marginRight: haveRightYAxis ? 50 : -10 }}
                  formatter={(value, entry) => {
                    return (
                      <span>
                        {typeof keyLabel === 'undefined'
                          ? value
                          : keyLabel[value]}
                      </span>
                    );
                  }}
                />
              ) : (
                <Legend
                  height={legendHeight}
                  verticalAlign="top"
                  align="right"
                  content={legendData}
                />
              ))}
            {/* <Area
            type="monotone"
            dataKey="amt"
            fill={graph.groundColor}
            stroke={graph.line[1]}
          /> */}
            {Boolean(bar) &&
              bar.map((key, idx) => {
                const yAxisId = getYAxisId({ axisData: yAxisData, key });

                return (
                  <Bar
                    yAxisId={yAxisId}
                    stackId={stackId}
                    key={key}
                    dataKey={key}
                    fill={
                      variousColoredCells
                        ? null
                        : graph.color[colorIndex++ % maxIndex]
                    }
                    label={barLabel ? { position: 'top' } : null}
                  >
                    {data.map((d, index) =>
                      variousColoredCells ? (
                        <Cell
                          key={`cell-${key}`}
                          fill={graph.color[colorIndex++ % maxIndex]}
                        />
                      ) : (
                        <Cell key={`cell-${key}`} />
                      )
                    )}
                  </Bar>
                );
              })}
            {Boolean(line) &&
              line.map(key => {
                const yAxisId = getYAxisId({ axisData: yAxisData, key });

                return (
                  <Line
                    key={key}
                    yAxisId={yAxisId}
                    type="monotone"
                    dataKey={key}
                    stroke={graph.color[colorIndex++ % maxIndex]}
                  />
                );
              })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </CartWrap>
  );
}
