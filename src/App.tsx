import React from 'react';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';
import { Metrics } from './Features/Metrics/Metrics';

import store from './app/store';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        <Header />
        <NowWhat />
        <Metrics />
        <ToastContainer />
      </Wrapper>
    </MuiThemeProvider>
  </Provider>
);

export default App;
