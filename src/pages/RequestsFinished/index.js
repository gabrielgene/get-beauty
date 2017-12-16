import React from 'react';
import TopBar from '../../components/TopBar';
import RequestsList from '../../components/RequestsList';
import { getRequests } from '../../fetches';
import './style.css';

export default class RequestsActive extends React.Component {
  constructor(props) {
    super(props);
    this.state = { requests: [] };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    const requests = await getRequests('deactive');
    this.setState({ requests });
  }

  render() {
    const { requests } = this.state;
    return (
      <div>
        <TopBar title="Solicitações Finalizadas" userType="client" back={false} />
        <div className="requestListClient">
          <RequestsList
            router={this.props.router}
            requests={requests}
            userType="client"
          />
        </div>
      </div>
    )
  }
}

