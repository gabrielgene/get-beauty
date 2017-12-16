import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import RequestsList from '../../components/RequestsList';
import TopBar from '../../components/TopBar';
import { getRequestsByProId, getRequestsBid, getCreditsByProId } from '../../fetches';
import './style.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credits: 0,
      oportunities: [],
      myRequests: [],
      slideIndex: 0,
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);

    const { location, params } = this.props.router;
    const { proId } = params;
    const { query } = location;

    const creditsObject = await getCreditsByProId(proId)
    const { credits } = creditsObject;
    this.setState({ credits: credits });

    const index = parseInt(query.index, 0);
    if (index < 2 && index >= 0) {
      this.setState({
        slideIndex: index,
      }, () => this.makeRequest(index));
    } else {
      this.makeRequest(0);
    }
  }

  handleChange = (value) => {
    this.makeRequest(value)
  };

  makeRequest = async (value) => {
    if (value === 0) {
      const { params } = this.props.router;
      const requests = await getRequestsByProId(params.proId);
      this.setState({
        oportunities: requests,
        slideIndex: value,
      });
    } else {
      const { params } = this.props.router;
      const requests = await getRequestsBid(params.proId);
      this.setState({
        myRequests: requests,
        slideIndex: value,
      });
    }
  }

  render() {
    const { credits, slideIndex, oportunities, myRequests } = this.state;
    const { router } = this.props;
    return (
      <div>
        <div className="tabFixed">
          <TopBar
            credits={credits}
            title=""
            userType="pro"
          />
          <Tabs
            className="homeTab"
            onChange={this.handleChange}
            value={slideIndex}
          >
            <Tab label="Oportunidades" value={0} />
            <Tab label="Meus Contatos" value={1} />
          </Tabs>
        </div>
        <div className="contentScroll">
          <SwipeableViews
            index={slideIndex}
            onChangeIndex={this.handleChange}
          >
            <div>
              <RequestsList
                requests={oportunities}
                router={router}
                userType="pro"
              />
            </div>
            <div >
              <RequestsList
                requests={myRequests}
                router={router}
                userType="pro"
              />
            </div>
          </SwipeableViews>
        </div>
      </div>
    );
  }
}
