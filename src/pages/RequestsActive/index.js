import React from 'react';
import TopBar from '../../components/TopBar';
import RequestsList from '../../components/RequestsList';
import { getRequests } from '../../fetches';
import './style.css';

const requestsData = [
  {
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
  },
  {
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
  },
]

export default class RequestsActive extends React.Component {
  constructor(props) {
    super(props);
    this.state = { requests: [] };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    // const requests = await getRequests('active');
    // this.setState({ requests });
  }

  render() {
    const { requests } = this.state;
    return (
      <div>
        <TopBar title="Solicitações" userType="client" back={false} />
        <div className="requestListClient">
          <RequestsList
            router={this.props.router}
            requests={requestsData}
            userType="client"
          />
        </div>
      </div>
    );
  }
}
