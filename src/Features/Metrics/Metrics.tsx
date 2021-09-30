import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateMetricNamesThunk } from '../../app/thunks/metricsThunk';

export const Metrics: React.FC = () => {
  const metricNames = useAppSelector((state) => state.metricNames.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>{metricNames[1]}</h1>
      <button type="button" onClick={() => dispatch(updateMetricNamesThunk())}>
        Click
      </button>
    </div>
  );
};
