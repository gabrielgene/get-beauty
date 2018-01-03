import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { postPro } from '../../fetches';
import './style.css';

const servicesName = [
  'Cabeleireiro',
  'Manicure',
  'Pedicure',
  'Massagista',
];

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { services: [], cep: '', name: '', email: '', phone: '' };
  }

  serviceChange = (_, index, values) => this.setState({
    ...this.state,
    services: values,
  });

  handleChange = (name, value) => this.setState({
    ...this.state,
    [name]: value,
  });

  cepChange = (_, value) =>
    this.handleChange('cep', value);

  nameChange = (_, value) =>
    this.handleChange('name', value);

  emailChange = (_, value) =>
    this.handleChange('email', value);

  phoneChange = (_, value) =>
    this.handleChange('phone', value);

  menuTypes(type, names) {
    return names.map((name) => (
      <MenuItem
        key={name}
        insetChildren
        checked={type && type.indexOf(name) > - 1}
        value={name}
        primaryText={name}
      />
    ));
  }

  register = () => {
    this.props.router.push('/home/0');
    // postPro(this.state).then(pro => {
    //   if (pro === 'OK') {
    //     alert('Profissional já existe');
    //   } else {
    //     const { proId } = pro;
    //     this.props.router.push(`/home/${proId}`);
    //   }
    // });
  }

  render() {
    window.scrollTo(0, 0);
    const { services, cep, name, email, phone } = this.state;
    return (
      <div className="register">
        <div>
          <header>
            <h2>Preencha seus dados</h2>
          </header>
          <div className="textFieldWrapper">
            <div className="textField">
              <Divider style={{ height: 2 }} />
              <SelectField
                className="selectService"
                floatingLabelText="Serviço"
                value={services}
                multiple
                onChange={this.serviceChange}
                fullWidth
              >
                {this.menuTypes(services, servicesName)}
              </SelectField>
              <span className="cepWarning">Não lembra seu CEP ?</span>
              <TextField
                floatingLabelText="CEP"
                value={cep}
                fullWidth
                onChange={this.cepChange}
              />
              <TextField
                floatingLabelText="Nome"
                value={name}
                fullWidth
                onChange={this.nameChange}
              />
              <TextField
                floatingLabelText="Email"
                value={email}
                fullWidth
                onChange={this.emailChange}
              />
              <TextField
                floatingLabelText="DDD + Celular"
                value={phone}
                fullWidth
                onChange={this.phoneChange}
              />
              <section>
                Vamos enviar um SMS com o código de verificação para confirmar o número do seu celular.
              </section>
            </div>
          </div>
        </div>
        <div className="button">
          <RaisedButton
            label="Começar"
            fullWidth
            primary
            style={{ height: 50 }}
            onClick={this.register}
          />
        </div>
      </div>
    );
  }
}


export default Register;
