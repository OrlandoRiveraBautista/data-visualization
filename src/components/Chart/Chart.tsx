/* eslint-disable react/jsx-props-no-spreading */
/* eslint operator-linebreak: [2, "after"] */

import React from 'react';
import {
  //
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  // space
} from '@visx/xychart';

const data1 = [
  { x: '2020-01-01', y: 50 },
  { x: '2020-01-02', y: 10 },
  { x: '2020-01-03', y: 20 },
];

const data2 = [
  { x: '2020-01-01', y: 30 },
  { x: '2020-01-02', y: 40 },
  { x: '2020-01-03', y: 80 },
];

const accessors = {
  xAccessor: (d: any) => d.x,
  yAccessor: (d: any) => d.y,
};

const Chart: React.FC = () => (
  <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
    <AnimatedAxis orientation="bottom" />
    <AnimatedGrid columns={false} numTicks={4} />
    <AnimatedLineSeries dataKey="Line 1" data={data1} {...accessors} />
    <AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} />
    <Tooltip
      snapTooltipToDatumX
      snapTooltipToDatumY
      showVerticalCrosshair
      showSeriesGlyphs
      renderTooltip={({ tooltipData, colorScale }) => {
        const tool =
          tooltipData?.nearestDatum && colorScale ? (
            <div>
              <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                {tooltipData?.nearestDatum?.key ?? 'nothing'}
              </div>
              {accessors.xAccessor(tooltipData.nearestDatum.datum)}
              {', '}
              {accessors.yAccessor(tooltipData.nearestDatum.datum)}
            </div>
          ) : (
            <div>
              <h1>loading</h1>
            </div>
          );
        return tool;
      }}
    />
  </XYChart>
);

export default Chart;
