import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { GET_MEASUREMENTS, GET_MULTIPLE_MEASUREMENTS } from '../app/sagas/metricsSaga';

import Select from './Select';
import Chart from './Chart/Chart';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TimeOptions = ['0.5 minutes ago', '1 minute ago', '2 minutes ago', '30 minutes ago', '60 minutes ago'];
const millisecondMinute = 60000;

const MetricTrend: React.FC = () => {
  const metric = useAppSelector((state) => state.metricAttr);
  const dispatch = useAppDispatch();

  const [beforeTime, setBeforeTime] = useState<number>();
  const [afterTime, setAfterTime] = useState<number>();
  const [compare, setCompare] = useState<string | undefined>(undefined);

  const classes = useStyles();

  const handleTimeChange = (e: any) => {
    const { value, name } = e.target;
    const millisecondsValue = new Date().getTime() - (value.split(' ')[0] * millisecondMinute);

    let payload = {};
    switch (name) {
      case 'after':
        setAfterTime(millisecondsValue);
        payload = {
          metricName: metric.latestMeasurement.metric,
          before: beforeTime,
          after: millisecondsValue,
        };
        dispatch({ type: GET_MEASUREMENTS, payload });
        break;
      case 'before':
        setBeforeTime(millisecondsValue);
        payload = {
          metricName: metric.latestMeasurement.metric,
          before: millisecondsValue,
          after: afterTime,
        };
        dispatch({ type: GET_MEASUREMENTS, payload });
        break;
      case 'compare':
        if (value === metric.latestMeasurement.metric) {
          window.alert(`${value} is already displayed`);
          return;
        }
        if (!beforeTime && !afterTime) {
          window.alert('Please pick a before or after value');
        }
        if (value === 'none') {
          setCompare(undefined);
          return;
        }
        setCompare(value);
        payload = [
          {
            metricName: metric.latestMeasurement.metric,
            after: afterTime,
            before: beforeTime,
          },
          {
            metricName: value,
            after: afterTime,
            before: beforeTime,
          },
        ];

        dispatch({ type: GET_MULTIPLE_MEASUREMENTS, payload });
        break;
      default:
        console.log('here by default');
        break;
    }
  };

  const compareOptions = ['none'].concat(metric.metricNames);

  return (
    <div>
      <Typography>Metrics Trend | Comparison</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="after">After</InputLabel>
        <Select handleChange={handleTimeChange} options={TimeOptions} name="after" />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="before">Before</InputLabel>
        <Select handleChange={handleTimeChange} options={TimeOptions} name="before" />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="compare">Compare</InputLabel>
        <Select handleChange={handleTimeChange} options={compareOptions} name="compare" />
      </FormControl>
      {beforeTime || afterTime || compare
        ? <Chart input={compare ? metric.multipleMeasurements : metric.measurements} />
        : null}
    </div>
  );
};

export default MetricTrend;
