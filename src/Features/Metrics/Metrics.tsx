import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { GET_LATEST_MEASUREMENT, GET_METRIC_NAMES, RESET_MEASUREMENTS } from '../../app/sagas/metricsSaga';

/** Components */
import Select from '../../components/Select';
import Card from '../../components/Card';
import MoreInfoCard from '../../components/MoreInfoCard';

const divStyle: React.CSSProperties | undefined = {
  display: 'flex',
  alignContent: 'center',
  flexDirection: 'column',
  padding: '18px',
  margin: '5% 25%',
};

export const Metrics: React.FC = () => {
  const metric = useAppSelector((state) => state.metricAttr);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string | undefined>(undefined);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: RESET_MEASUREMENTS });
    setShowMoreInfo(false);
  }, [metric.latestMeasurement]);

  // get metric names on application load
  useEffect(() => {
    dispatch({ type: GET_METRIC_NAMES });
  }, []);

  const handleChange = (e: any) => {
    const { value: name } = e.target;
    setValue(name);
    dispatch({ type: GET_LATEST_MEASUREMENT, payload: name });
  };

  const handleAction = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  return (
    <div style={divStyle}>
      <Select handleChange={handleChange} options={metric.metricNames} />
      {value ? (
        <Card measurement={metric.latestMeasurement} actions={[{ text: 'View More', handleClick: handleAction }]} />
      ) : null}
      {showMoreInfo ? <MoreInfoCard /> : null}
    </div>
  );
};
