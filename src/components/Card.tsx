/* eslint implicit-arrow-linebreak: ["error", "beside"] */

import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Measurement } from '../interfaces/measurements';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '5%',
  },
  success: {
    color: theme.palette.success.main,
  },
  error: {
    color: theme.palette.error.main,
  },
}));

interface ActionProps {
  handleClick: () => void;
  text: string;
}

interface CardProps {
  measurement: Measurement;
  actions: ActionProps[];
}

const CardComp: React.FC<CardProps> = ({ measurement, actions }: CardProps) => {
  const classes = useStyles();

  const renderActionButtons = () => actions.map((action) => (<Button variant="outlined" key={`${action.text}-action`} size="small" onClick={action.handleClick}>{action.text}</Button>));

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" gutterBottom component="h2">
          {measurement.metric}
        </Typography>
        <Typography component="p">{`${measurement.value} ${measurement.unit}`}</Typography>
        <Typography component="p">{new Date(measurement.at).toLocaleTimeString()}</Typography>
      </CardContent>
      <CardActions>{renderActionButtons()}</CardActions>
    </Card>
  );
};

export default CardComp;
