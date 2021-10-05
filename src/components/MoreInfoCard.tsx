import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useSubscription } from '@apollo/client';
import { useAppSelector } from '../app/hooks';
import { MetricsController } from '../api/services/controllers/metricsController';

import MetricTrend from './MetricTrend';
import CardHeader from './CardHeader';

const useStyles = makeStyles({
  card: {
    marginTop: '5%',
  },
});

const MoreInfoCard: React.FC = () => {
  const classes = useStyles();
  const metric = useAppSelector((state) => state.metricAttr);
  // const dispatch = useAppDispatch();

  const MC = new MetricsController();
  const { data } = useSubscription(MC.subNewMeasurement);

  const [liveValue, setLiveValue] = useState<string>('');

  useEffect(() => {
    if (!data) return;

    if (data.newMeasurement.metric === metric.latestMeasurement.metric) {
      setLiveValue(`${data.newMeasurement.value} ${data.newMeasurement.unit}`);
    }
  });

  return (
    <Card className={classes.card}>
      <CardHeader title={`${metric.latestMeasurement.metric} ${liveValue}`} />
      <CardContent>
        <MetricTrend />
      </CardContent>
    </Card>
  );
};

export default MoreInfoCard;
