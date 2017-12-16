import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const CallToActionCard = (props) => (
  <Paper
    className="callToActionCard"
    zDepth={2}
  >
    <header>
      <h3>{props.title}</h3>
    </header>
    <div className="buttonWrapper">
      <div className="button">
        <RaisedButton fullWidth primary label={props.label} onClick={() => props.router.push(`${props.link}`)} />
      </div>
    </div>
  </Paper>
);

export default CallToActionCard;
