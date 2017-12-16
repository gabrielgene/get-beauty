import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';

export default class ClientCard extends React.Component {

  seeContact = () => {
    const { request } = this.props.request;
    const { requestId } = request;
    this.props.router.push(`/request/data/${this.props.router.params.proId}/${requestId}`);
  }

  info = () => {
    const { request } = this.props.request;
    const { requestId } = request;
    this.props.router.push(`/requests/info/${requestId}`);
  }
  render() {
    const { request, client } = this.props.request;

    return (
      <Paper
        className="clientCard"
        zDepth={2}
      >
        <header>
          <h3>{request.service}</h3>
        </header>
        <section>
          <text>
            {`Olá sou ${client.name} e preciso do seu serviço
            para ${request.amount} para ${request.when}, por
            favor entrar em contato através do telefone ${client.phone}.`}
          </text>
        </section>
        {
          this.props.userType === "pro"
            ?
            <RaisedButton
              label="Ver Contato"
              primary
              fullWidth
              onClick={this.seeContact}
            />
            :
            <RaisedButton
              label="Informações"
              primary
              fullWidth
              onClick={this.info}
            />
        }
      </Paper>
    )
  }
}
