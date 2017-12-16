import React from 'react';
import ClientCard from '../ClientCard';
import './style.css';

export default class RequestsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { requests: [] };
  }

  render() {
    const { requests } = this.props;
    const requestsList = requests.map((request, index) =>
      (
        <ClientCard
          key={index}
          router={this.props.router}
          request={request}
          userType={this.props.userType}
        />
      ));

    return (
      <div className="requestList">
        {requestsList}
      </div>
    );
  }
}
