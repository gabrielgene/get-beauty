import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blue700, deepOrangeA400, blueGrey700 } from 'material-ui/styles/colors';
import { browserHistory, Route, Router, Redirect } from 'react-router';
import LandingPage from './pages/LandingPage';
import RequestsActive from './pages/RequestsActive';
import RequestsFinished from './pages/RequestsFinished';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RequestInfo from './pages/RequestInfo';
import Request from './pages/Request';
import Register from './pages/Register';
import Login from './pages/Login';
import Credit from './pages/Credit';
import Home from './pages/Home';
import './style.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey700,
    primary2Color: blue700,
    accent1Color: deepOrangeA400,
  },
},
  {
    userAgent: global.navigator
      ? global.navigator.userAgent
      : 'all',
  });

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory}>
      <Route path="/" component={LandingPage} />
      <Route path="/requests/active" component={RequestsActive} />
      <Route path="/request/data/:proId/:requestId" component={RequestInfo} />
      <Route path="/requests/finished" component={RequestsFinished} />
      <Route path="/requests/info/:requestId" component={RequestInfo} />
      <Route path="/request" component={Request} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/credit" component={Credit} />
      <Route path="/home/:proId" component={Home} />
      <Redirect path="**" to="/" />
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
