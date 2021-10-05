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
import { Measurement, MultipleMeasurements } from '../../interfaces/measurements';

const accessors = {
  xAccessor: (d: any) => d.at,
  yAccessor: (d: any) => d.value,
};

interface ChartProps {
  input: Measurement[] | MultipleMeasurements[] | any;
}

const Chart: React.FC<ChartProps> = ({ input }: ChartProps) => {
  const renderMulitpleLines = () => input.map((i: MultipleMeasurements) => <AnimatedLineSeries dataKey={`${i.metric}`} data={i.measurements} {...accessors} />);

  return (
    <XYChart height={300} xScale={{ type: 'log' }} yScale={{ type: 'radial' }}>
      <AnimatedAxis orientation="bottom" />
      <AnimatedGrid columns={false} />
      {!input[0].measurements ? <AnimatedLineSeries dataKey={`${input.metric}`} data={input} {...accessors} /> : renderMulitpleLines()}
      {/* <AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} /> */}
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
};

export default Chart;
