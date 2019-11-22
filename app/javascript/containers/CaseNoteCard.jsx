import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

class CaseNoteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      title: this.props.title,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={11}>
            <Paper className="case-note-card">
              <div className="case-note-title">
                <h3>{this.state.title}</h3>
                <p className="case-note-desc">{this.state.description}</p>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

CaseNoteCard.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default CaseNoteCard;
