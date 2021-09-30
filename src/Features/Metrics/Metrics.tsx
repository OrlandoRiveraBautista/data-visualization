import React from 'react';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { updateMetricNamesThunk } from '../../app/thunks/metricsThunk';

import { MetricsController } from '../../api/services/controllers/metricsController';

const metricsController = new MetricsController();
// const metricNames = useAppSelector((state) => state.metricNames.value);
// const dispatch = useAppDispatch();

export const Metrics: React.FC = () => (
  <div>
    {/* <h1>{metricNames[1]}</h1> */}
    <button type="button" onClick={() => metricsController.subNewMeasurement()}>
      Click
    </button>
  </div>
);
