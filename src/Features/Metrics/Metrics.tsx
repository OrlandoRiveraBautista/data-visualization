import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { GET_MULTIPLE_MEASUREMENTS } from '../../app/sagas/metricsSaga';
import { MeasurementQuery } from '../../interfaces/measurements';

/** Components */
import Chart from '../../components/Chart/Chart';

export const Metrics: React.FC = () => {
  const metric = useAppSelector((state) => state.metricAttr);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const payload: MeasurementQuery = {
      metricName: 'tubingPressure',
      after: 1633199775015,
    };
    const s = dispatch({ type: GET_MULTIPLE_MEASUREMENTS, payload });
    console.log(s);
  };

  useEffect(() => {
    console.log(metric);
  });

  return (
    <div>
      <Chart />
      <button type="button" onClick={handleClick}>
        Click
      </button>
    </div>
  );
};
