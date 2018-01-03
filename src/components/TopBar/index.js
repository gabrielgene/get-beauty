import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Payment from 'material-ui/svg-icons/action/payment';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { withRouter } from 'react-router';
import './style.css';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  backToHome = () => this.props.router.goBack();

  render() {
    const { back, userType, router, title, credits } = this.props;

    return (
      <div className="topBar">
        <AppBar
          zDepth={0}
          title={title}
          iconElementLeft={back ? <IconButton><Back /></IconButton> : <IconButton><MenuIcon /></IconButton>}
          onLeftIconButtonClick={back ? this.backToHome : this.handleToggle}
        >{
            userType === "pro"
              ?
              <div className="payment" onClick={() => router.push('/credit')}>
                <span>Seus créditos:</span>
                <div className="icon">
                  <Payment color="white" />
                </div>
                <span>{credits}</span>
              </div>
              :
              <div />
          }
        </AppBar>
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <div>{
            userType === "pro"
              ?
              <Menu>
                <Divider />
                <MenuItem
                  onClick={() => router.push('/')}
                  primaryText="Inicio"
                />
                <Divider />
                <MenuItem
                  primaryText="Comprar Créditos"
                  onClick={() => router.push(`/credit`)}
                />
                <Divider />
              </Menu>
              :
              <Menu>
                <Divider />
                <MenuItem
                  onClick={() => router.push('/')}
                  primaryText="Inicio"
                />
                <Divider />
                <MenuItem
                  primaryText="Nova Solicitação"
                  onClick={() => router.push('/request')}
                />
                <Divider />
                <MenuItem
                  primaryText="Solicitações"
                  onClick={() => router.push('/requests/active')}
                />
                <Divider />
                <MenuItem
                  primaryText="Solicitações Finalizadas"
                  onClick={() => router.push('/requests/finished')}
                />
                <Divider />
              </Menu>
          }
          </div>
        </Drawer>
      </div >
    );
  }
}

export default withRouter(TopBar);
