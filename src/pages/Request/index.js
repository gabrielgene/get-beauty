import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
// import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { SelectValidator, TextValidator } from 'react-material-ui-form-validator';
import { postRequest } from '../../fetches';
import './style.css';

const servicesName = [
  'Cabeleireiro',
  'Manicure',
  'Pedicure',
  'Massagista',
];

const whoNames = [
  'Homem',
  'Mulher',
  'Criança',
];

const amountNames = [
  '1 pessoa',
  '2 pessoas',
  '3 ou mais pessoas',
];

const whenNames = [
  'hoje ou próximos dias',
  'o próximo mês',
  'daqui a varios meses',
];

export default class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        request: {
          service: null,
          who: null,
          amount: null,
          when: null,
          addInfo: '',
        },
        client: {
          name: '',
          cep: '',
          email: '',
          phone: '',
        },
      },
      slideIndex: 0,
    };
  }

  indexChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  continue = () => {
    this.setState({
      slideIndex: 1
    });
  };

  request = async () => {
    // await postRequest(this.state.data);
    this.props.router.push('/requests/active');
  }

  RequestHandleChange = (_, index, value, name) => this.setState({
    data: {
      ...this.state.data,
      request: {
        ...this.state.data.request,
        [name]: value,
      },
    },
  });

  clientHandleChange = (name, value) => this.setState({
    data: {
      ...this.state.data,
      client: {
        ...this.state.data.client,
        [name]: value,
      },
    },
  });

  nameChange = (_, value) =>
    this.clientHandleChange('name', value);

  cepChange = (_, value) =>
    this.clientHandleChange('cep', value);
  emailChange = (_, value) =>
    this.clientHandleChange('email', value);
  phoneChange = (_, value) =>
    this.clientHandleChange('phone', value);

  serviceChange = (_, index, value) =>
    this.RequestHandleChange(_, index, value, 'service');

  whoChange = (_, index, value) =>
    this.RequestHandleChange(_, index, value, 'who');

  amountChange = (_, index, value) =>
    this.RequestHandleChange(_, index, value, 'amount');

  whenChange = (_, index, value) =>
    this.RequestHandleChange(_, index, value, 'when');

  addChange = (_, value) =>
    this.RequestHandleChange(_, _, value, 'addInfo');

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

  render() {
    window.scrollTo(0, 0);
    const { data } = this.state;
    const { service, who, amount, when, addInfo } = data.request;
    const { name, cep, email, phone } = data.client;

    return (
      <div className="request">
        <Tabs
          className="tab"
          onChange={this.indexChange}
          value={this.state.slideIndex}
        >
          <Tab label="Solicitar Serviço" value={0}
            style={{ height: 64 }}

          />
          <Tab label="Meus Dados" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.indexChange}
        >
          <div className="request-info">
            <ValidatorForm
              ref="form"
              name="form1"
              onSubmit={this.continue}
            >
              <SelectValidator
                name="service"
                floatingLabelText="Qual serviço ?"
                value={service}
                fullWidth
                onChange={this.serviceChange}
              >
                {this.menuTypes(service, servicesName)}
              </SelectValidator>
              <SelectValidator
                name="who"
                floatingLabelText="Para quem é ?"
                value={who}
                fullWidth
                onChange={this.whoChange}
              >
                {this.menuTypes(who, whoNames)}
              </SelectValidator>
              <SelectValidator
                name="amount"
                floatingLabelText="Para quantas pessoas ?"
                value={amount}
                fullWidth
                onChange={this.amountChange}
              >
                {this.menuTypes(amount, amountNames)}
              </SelectValidator>
              <SelectValidator
                name="when"
                floatingLabelText="Para quando é ?"
                value={when}
                fullWidth
                onChange={this.whenChange}
              >
                {this.menuTypes(when, whenNames)}
              </SelectValidator>
              <TextField
                floatingLabelText="Informações Adicionais"
                multiLine
                fullWidth
                rows={2}
                rowsMax={6}
                onChange={this.addChange}
                value={addInfo}
              />
              <RaisedButton
                primary
                fullWidth
                className="request-button"
                label="Continuar"
                style={{ height: 50 }}
                type="submit"
              />
            </ValidatorForm>
          </div>
          <div className="request-info">
            <ValidatorForm
              ref="form"
              name="form2"
              onSubmit={this.request}
            >
              <TextValidator
                name="name"
                floatingLabelText="Nome"
                fullWidth
                value={name}
                onChange={this.nameChange}
              />
              <div className="cep-warning">
                <span>
                  Não lembra seu CEP?
              </span>
              </div>
              <TextValidator
                name="cep"
                floatingLabelText="CEP"
                fullWidth
                value={cep}
                onChange={this.cepChange}
              />
              <TextValidator
                name="email"
                floatingLabelText="Email"
                fullWidth
                value={email}
                onChange={this.emailChange}
              />
              <TextValidator
                name="phone"
                floatingLabelText="DDD + Celular"
                fullWidth
                value={phone}
                onChange={this.phoneChange}
              />
              <section>
                Vamos enviar um SMS com o código de
                verificação para confirmar o número do seu celular.
              </section>
              <RaisedButton
                primary
                fullWidth
                label="Solicitar"
                style={{ height: 50 }}
                type="submit"
              />
            </ValidatorForm>
          </div >
        </SwipeableViews >
      </div >
    );
  }
}
