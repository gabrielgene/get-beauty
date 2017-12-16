import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import { withRouter } from 'react-router';
import CallToActionCard from '../../components/CallToActionCard';
import './style.css';

const TITLE = 'Get Beauty';

const LOGIN_BUTTON_LABEL = 'Entrar';
const LOGIN_ROUTE = '/login';

const CLIENT_TITLE_CARD = 'Quer solicitar profissionais de estética qualificados ?';
const CLIENT_LABEL_BUTTON = 'Solicitar';
const CLIENT_ROUTE = '/request';

const PRO_TITLE_CARD = 'Gostaria de conseguir clientes de forma rápida ?';
const PRO_LABEL_BUTTON = 'Trabalhe Conosco';
const PRO_ROUTE = '/register';

class LandingPage extends React.Component {
  render() {
    window.scrollTo(0, 0);

    return (
      <div className="landingPage">
        <AppBar
          title={TITLE}
          titleStyle={{ fontSize: 20 }}
          iconElementLeft={<div />}
        >
          <div className="modalButton">
            <RaisedButton fullWidth label={LOGIN_BUTTON_LABEL} onClick={() => this.props.router.push(LOGIN_ROUTE)} />
          </div>
        </AppBar>
        <section>
          <CallToActionCard
            title={CLIENT_TITLE_CARD}
            label={CLIENT_LABEL_BUTTON}
            link={CLIENT_ROUTE}
            router={this.props.router}
          />
          <CallToActionCard
            title={PRO_TITLE_CARD}
            label={PRO_LABEL_BUTTON}
            link={PRO_ROUTE}
            router={this.props.router}
          />
        </section>
      </div>
    );
  }
}

export default withRouter(LandingPage);
