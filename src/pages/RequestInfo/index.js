import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { blue500 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import ActionInfo from 'material-ui/svg-icons/action/info';
import TopBar from '../../components/TopBar';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import UserIcon from 'material-ui/svg-icons/social/person';
import WorkIcon from 'material-ui/svg-icons/action/work'
import LockIcon from 'material-ui/svg-icons/action/lock-open';
import BlockIcon from 'material-ui/svg-icons/content/block';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import PaymentIcon from 'material-ui/svg-icons/action/payment';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import RaisedButton from 'material-ui/RaisedButton';
import { getRequestById, updateRequest, bidService, getCreditsByProId } from '../../fetches';
import './style.css';

const requestBid = {
  request: {
    service: 'Serviço',
    amount: '2 pessoas',
    when: 'hoje',
    requestId: 1,
  },
  client: {
    name: 'Genê',
    phone: '(99) 99999-9999',
  }
};

export default class RequestInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClient: true, request: {}, client: {}, credits: 0, isBided: true };
  }

  async componentDidMount() {
    const { requestId, proId } = this.props.router.params;
    // const requestById = await getRequestById(requestId);

    const { request, client } = requestBid;
    if (this.isClient()) {
      this.setState({ isClient: true, request: request, client: client });
    } else {
      const credits = await getCreditsByProId(proId);
      const credit = credits.credits;
      this.setState({ isClient: false, request: request, client: client, credits: credit });
      this.isBided(proId);
    }
  }

  isClient = () => {
    const { path } = this.props.router.routes[0];
    if (path === '/requests/info/:requestId') {
      return true;
    }
    return false;
  }

  isBided = (proId) => {
    const { request } = this.state;
    const { proListId } = request;
    const find = proListId.find(pro => pro === proId);
    if (find !== undefined) {
      this.setState({ isBided: true });
    } else {
      this.setState({ isBided: false });
    }
  }
  cancelRequest = async () => {
    window.scrollTo(0, 99999);
    const { requestId } = this.props.router.params;
    await updateRequest(requestId)
    this.props.router.push('/requests/finished');
  }

  bid = async () => {
    window.scrollTo(0, 99999);
    const { proId, requestId } = this.props.router.params;
    await bidService(proId, requestId);
    this.props.router.push(`/home/${proId}?index=1`);
  }

  render() {
    window.scrollTo(0, 0);
    const { request, isClient, client, credits, isBided } = this.state;

    return (
      <div>
        <TopBar
          title={isClient ? "Informações" : ""}
          userType={isClient ? "" : "pro"}
          back
          credits={isClient ? null : credits}
        />
        <Paper className="requestClient">
          <div>
            <List>
              <ListItem
                leftIcon={<WorkIcon />}
                primaryText="Serviço"
                secondaryText={request.service}
              />
              <ListItem
                leftIcon={<UserIcon />}
                primaryText="Nome"
                secondaryText={client.name}
              />
              <ListItem
                leftIcon={<PlaceIcon />}
                primaryText="Eng. Velho de Brotas, Salvador - BA"
                secondaryText={client.cep}
              />
              <ListItem
                leftIcon={<ActionInfo />}
                primaryText="Para quem?"
                secondaryText={request.who}
              />
              <ListItem
                leftIcon={<ActionInfo />}
                primaryText="Para quantas pessoas?"
                secondaryText={request.amount}
              />
              <ListItem
                leftIcon={<ActionInfo />}
                primaryText="Para quando?"
                secondaryText={request.when}
              />
              <ListItem
                leftIcon={<ActionInfo />}
                primaryText="Informações adicionais"
                secondaryText={request.addInfo}
              />
            </List>
            <Divider inset={true} />
            <List>
              <Subheader inset={true}>Dados do Cliente</Subheader>
              <ListItem
                leftIcon={<PhoneIcon color={blue500} />}
                primaryText={client.phone}
              />
              <ListItem
                leftIcon={<EmailIcon color={blue500} />}
                primaryText={client.email}
              />
              {isClient
                ?
                null
                :
                <ListItem
                  leftIcon={<PaymentIcon color={blue500} />}
                  primaryText={`Esse serviço custa ${request.price} créditos`}
                />
              }
            </List>
          </div>
        </Paper>
        {isClient
          ?
          request.status === 'active'
            ?
            <RaisedButton
              className="bidButton"
              label="Cancelar Solicitação"
              labelPosition="before"
              style={{ height: 50 }}
              secondary
              fullWidth
              icon={<BlockIcon />}
              onClick={this.cancelRequest}
            />
            :
            <RaisedButton
              className="bidButton"
              label="Cancelar Solicitação"
              labelPosition="before"
              style={{ height: 50 }}
              disabled
              fullWidth
              icon={<BlockIcon />}
            />
          :
          isBided
            ?
            <RaisedButton
              className="bidButton"
              label="Liberar Dados"
              labelPosition="before"
              style={{ height: 50 }}
              secondary
              disabled
              icon={<LockIcon />}
            />
            :
            <RaisedButton
              className="bidButton"
              label="Liberar Dados"
              labelPosition="before"
              style={{ height: 50 }}
              secondary
              fullWidth
              icon={<LockIcon />}
              onClick={this.bid}
            />
        }
      </div >
    );
  }
}

