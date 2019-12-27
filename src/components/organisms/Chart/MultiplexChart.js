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
  ReferenceLine,
} from 'recharts';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import CartWrap from './ChartWrap';
import ChartTooltip from './ChartTooltip';

import { toPercent, numberFormatter } from 'lib/commonLib';

import LineIcon from 'images/common/chart/line';
import RectIcon from 'images/common/chart/rect';

const legendStyles = makeStyles(theme => ({
  ul: {
    listStyle: 'none',
    textAlign: 'center',
  },
  li: {
    display: 'inline-block',
    marginRight: '10px',
    '&.invisible': {
      opacity: 0.5,
    },
    cursor: 'pointer',
  },
}));

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

/**
 * legend 컴포넌트
 * @param {json} props
 */
const CustomizedLegend = props => {
  const { payload, keyLabel = {}, handleOnCilck, visible } = props;
  const classes = legendStyles();
  const [legendList /*, setLegendList*/] = React.useState(
    (() => {
      const result = [];
      // 처음에 legend list 셋팅해줌
      for (let i = 0; i < payload.length; i++) {
        const { dataKey } = payload[i];
        result.push({
          name:
            typeof keyLabel[dataKey] === 'undefined'
              ? dataKey
              : keyLabel[dataKey],
          ...payload[i],
        });
      }

      return result;
    })()
  );

  return (
    <ul className={classes.ul}>
      {(() => {
        return legendList.map((entry, index) => {
          const { value, name, type, color } = entry;
          return (
            <li
              key={`item-${index}`}
              className={clsx(classes.li, { invisible: !visible[value] })}
              onClick={() => handleOnCilck(value)}
            >
              {type === 'line' ? (
                <LineIcon fill={color} />
              ) : (
                <RectIcon fill={color} />
              )}
              {name}
            </li>
          );
        });
      })()}
    </ul>
  );
};

const CustomizedLabel = props => {
  const { viewBox, label } = props;

  return (
    <text {...viewBox} textAnchor="middle">
      <tspan x={viewBox.width} dy="18">
        {label}
      </tspan>
    </text>
  );
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
  referenceLine,
}) {
  const theme = useTheme();
  const { graph } = theme.palette;
  const [visible, setVisible] = React.useState(
    (() => {
      const result = {};
      for (let item in dataKeys) {
        if (dataKeys.hasOwnProperty(item)) {
          const curChartData = dataKeys[item];
          for (let i = 0; i < curChartData.length; i++) {
            const curKey = curChartData[i];
            result[curKey] = true;
          }
        }
      }
      return result;
    })()
  );

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

  const handleHiddenData = value => {
    setVisible({
      ...visible,
      [value]: !visible[value],
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
    <CartWrap className={`${className}`} title={title} key={title}>
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
                  content={
                    <CustomizedLegend
                      keyLabel={keyLabel}
                      handleOnCilck={handleHiddenData}
                      visible={visible}
                    />
                  }
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
                let result = null;

                result = (
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

                if (
                  typeof visible[key] !== 'undefined' &&
                  visible[key] === false
                ) {
                  result = null;
                }

                return result;
              })}
            {Boolean(line) &&
              line.map(key => {
                const yAxisId = getYAxisId({ axisData: yAxisData, key });
                let result = null;

                result = (
                  <Line
                    key={key}
                    yAxisId={yAxisId}
                    type="monotone"
                    dataKey={key}
                    stroke={graph.color[colorIndex++ % maxIndex]}
                  />
                );

                if (
                  typeof visible[key] !== 'undefined' &&
                  visible[key] === false
                ) {
                  result = null;
                }

                return result;
              })}
            {typeof referenceLine !== 'undefined' &&
              // 평균선 한개로 임의 정의 여러개 추가된다거나 max 등은 추후 개선
              (() => {
                const reulst = [];
                for (let key in referenceLine) {
                  const yAxisId = getYAxisId({ axisData: yAxisData, key });
                  reulst.push(
                    <ReferenceLine
                      key={key}
                      y={referenceLine[key].y}
                      label={
                        <CustomizedLabel label={referenceLine[key].label} />
                      }
                      yAxisId={yAxisId}
                      stroke={theme.palette.common.red}
                      // 아래는 점선
                      // strokeDasharray="3 3"
                    />
                  );
                }
                return reulst;
              })()}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </CartWrap>
  );
}
