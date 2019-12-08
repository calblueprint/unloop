import React from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Menu, MenuItem, IconButton, Grid, Paper } from '@material-ui/core/';
import MUIRichTextEditor from 'mui-rte';
import CaseNoteForm from 'components/CaseNoteForm';
import DeleteModal from 'components/DeleteModal';
import CaseNoteCardModal from 'components/CaseNoteCardModal';
import PropTypes from 'prop-types';

const styles = {
  buttonStyle: {
    marginTop: '10px',
  },
  casenoteCardStyle: {
    marginLeft: '20px',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
    borderRadius: '10px',
    height: '240px',
  },
  casenoteDescStyle: {
    height: '100px',
    marginTop: '-20px',
    overflow: 'auto',
  },
  dialogActionsStyle: {
    padding: '30px',
  },
  MUIRichTextEditorStyle: {
    border: '5px solid',
    padding: '10px',
  },
  dialogStyle: {
    padding: '20px',
  },
  dialogContentTextStyle: {
    color: 'black',
    marginBottom: '2px',
  },
  dialogContentTextFieldStyle: {
    marginTop: '2px',
    borderStyle: 'solid 4px grey',
  },
  saveDocumentButtonStyle: {
    borderStyle: 'solid 3px grey',
  },
};

class CaseNoteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      title: this.props.title,
      internal: this.props.internal,
      id: this.props.id,
      anchorEl: null,
      participantId: this.props.participantId,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuClose() {
    this.setState({ anchorEl: null });
  }

  renderMenuItems() {
    if (this.props.showMenu) {
      return (
        <div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 180,
                width: 200,
              },
            }}
          >
            <CaseNoteForm
              type="edit"
              title={this.state.title}
              description={this.state.description}
              internal={this.state.internal}
              participantId={this.state.participantId}
              id={this.state.id}
            />
            <DeleteModal
              message="Are you sure you want to delete this casenote?"
              body={{
                title: this.state.title,
                description: this.state.description,
                internal: this.state.internal,
                participant_id: this.props.participantId,
              }}
              req={`/api/case_notes/${this.state.id}`}
            />
          </Menu>
        </div>
      );
    }
  }

  render() {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={11}>
            <Paper style={styles.casenoteCardStyle}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <h3>{this.state.title}</h3>
                </Grid>
                <Grid item xs={2}>
                  {this.renderMenuItems()}
                </Grid>
              </Grid>
              <div style={styles.casenoteDescStyle}>
                <MUIRichTextEditor
                  value={this.state.description}
                  readOnly
                  toolbar={false}
                />
              </div>

              <Grid container spacing={2} style={styles.buttonStyle}>
                <Grid item xs={10}></Grid>
                <Grid item xs={2}>
                  <CaseNoteCardModal
                    description={this.state.description}
                    title={this.state.title}
                    internal={this.state.internal}
                  />
                </Grid>
              </Grid>
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
  internal: PropTypes.bool,
  id: PropTypes.number,
  anchorEl: PropTypes.bool,
  participantId: PropTypes.number,
  showMenu: PropTypes.bool,
};

export default CaseNoteCard;
