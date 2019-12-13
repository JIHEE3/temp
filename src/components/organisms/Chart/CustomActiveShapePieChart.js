import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell, Legend } from 'recharts';
import numeral from 'numeral';
import { useTheme } from '@material-ui/core/styles';
import ChartWrap from './ChartWrap';

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    total,
    tooltipFormat,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  // const mx = cx + (outerRadius + 30) * cos;
  // const my = cy + (outerRadius + 30) * sin;
  const mx = cx + (outerRadius + 6) * cos;
  const my = cy + (outerRadius + 6) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill={fill}>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#999"
      >
        {numeral(total).format(tooltipFormat)}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`of ${numeral(value).format(tooltipFormat)}`}
      </text>
    </g>
  );
};

export default function CustomActiveShapePieChart({
  width = 400,
  height = 400,
  label,
  title,
  data = [],
  total = 0,
  cxSubtractVal = 0,
  cySubtractVal = 0,
  innerRadius = 60,
  outerRadius = 80,
  dataKey,
  tooltipFormat = '',
}) {
  const theme = useTheme();
  const { graph } = theme.palette;
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  const makeActiveShape = props => {
    return renderActiveShape({ ...props, total, tooltipFormat });
  };

  const maxIndex = Object.keys(graph.color).length;
  return (
    <ChartWrap title={title} label={label}>
      <PieChart width={width} height={height}>
        <Legend verticalAlign="top" align="left" layout="vertical" />
        <Pie
          activeIndex={activeIndex}
          activeShape={makeActiveShape}
          data={data}
          // cx={width / 2}
          // cy={height / 2}
          cx={parseInt(width / 2) - cxSubtractVal}
          cy={parseInt(height / 2) - cySubtractVal}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          dataKey={dataKey}
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={graph.color[index % maxIndex]}
              />
            );
          })}
        </Pie>
      </PieChart>
    </ChartWrap>
  );
}
