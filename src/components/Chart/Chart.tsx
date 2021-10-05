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
  xAccessor: (d: any) => new Date(d.at).toLocaleTimeString(),
  yAccessor: (d: any) => d.value,
};

const extra = {
  uAccessor: (d: any) => d.unit,
};

interface ChartProps {
  input: Measurement[] | MultipleMeasurements[] | any;
}

const Chart: React.FC<ChartProps> = ({ input }: ChartProps) => {
  const renderMulitpleLines = () => input.map((i: MultipleMeasurements) => <AnimatedLineSeries key={i.metric} dataKey={`${i.metric}`} data={i.measurements} {...accessors} />);

  return (
    <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'radial' }}>
      <AnimatedAxis orientation="bottom" numTicks={4} />
      <AnimatedGrid columns={false} />
      {!input[0].measurements ?
        (
          <AnimatedLineSeries
            key={input[0].metric}
            dataKey={`${input[0].metric}`}
            data={input}
            {...accessors}
          />
        ) :
        renderMulitpleLines()}
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
                {`${accessors.yAccessor(tooltipData?.nearestDatum?.datum)} ${extra.uAccessor(tooltipData.nearestDatum.datum)}`}
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
