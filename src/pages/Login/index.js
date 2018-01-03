import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import { postProLogin } from '../../fetches';
import './style.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: '' }
  }

  loginChange = (_, value) =>
    this.setState({ login: value });

  login = () => {
    this.props.router.push('/home/0')
    // if (this.state.login === "") {
    //   alert("Email não pode ser vazio");
    // } else {
    //   postProLogin(this.state).then(pro => {
    //     if (pro.message !== undefined) {
    //       alert('Email invalido');
    //     } else {
    //       const { proId } = pro;
    //       this.props.router.push(`/home/${proId}`);
    //     }
    //   });
    // }
  }

  render() {
    const { value } = this.state;

    return (
      <div>
        <AppBar
          title="Get Beauty"
          titleStyle={{ fontSize: 20 }}
          iconElementLeft={<div />}
        />
        <div className="login">
          <Paper
            className="login-card"
            zDepth={2}
          >
            <header>
              <h3>Entre e acesse suas solicitações ou possiveis clientes.</h3>
            </header>
            <section>
              <TextField
                floatingLabelText="Email"
                fullWidth
                value={value}
                onChange={this.loginChange}
              />
              <div className="text">
                Vamos enviar um email com o link de acesso a sua conta.
              </div>
              <RaisedButton label="Entrar" fullWidth primary onClick={this.login} />
            </section>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Login;
