import React from 'react';
import { Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ActionItemCreationContainer from 'components/ActionItemCreationContainer';
import ActionItemSearchParticipants from 'components/ActionItemSearchParticipants';
import LoadModal from 'components/LoadModal';
import ActionItemList from 'components/ActionItemList';
import ViewMoreModal from 'components/ViewMoreModal';
import ActionItemModal from 'components/ActionItemModal';
import ActionItemDisplayParticipants from 'components/ActionItemDisplayParticipants';
import { apiPost, apiDelete } from 'utils/axios';
import * as Sentry from '@sentry/browser';
import styles from './styles';

class ActionItemCreationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      participants: this.props.participants,
      selectedParticipants: [],
      actionItemTitle: '',
      actionItemDescription: '',
      actionItemDueDate: '',
      actionItemCategory: null,
      actionItemFile: null,
      templateActionItems: this.props.templates,
      // Submit failed occurs if ASSIGN is pressed without
      // at least 1 assignment and 1 participant
      submitFailed: false,
      // Submit errored occurs if API request to
      // create assignment comes back with an error
      submitErrored: false,
      selectedActionItems: [],
      submissionStatus: null,
      // State given to the view more and edit modals when invoked
      modalActionItem: null,
      viewMoreModalOpen: false,
      editModalOpen: false,
    };

    this.addUserToState = this.addUserToState.bind(this);
    this.removeUserFromState = this.removeUserFromState.bind(this);
    this.addAllUsersToState = this.addAllUsersToState.bind(this);
    this.removeAllUsersFromState = this.removeAllUsersFromState.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.getMainComponents = this.getMainComponents.bind(this);
    this.getButtonsGrid = this.getButtons.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createActionItem = this.createActionItem.bind(this);
    this.selectActionItemTemplate = this.selectActionItemTemplate.bind(this);
    this.removeSelectedActionItem = this.removeSelectedActionItem.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkActionItemsEqual = this.checkActionItemsEqual.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.editActionItem = this.editActionItem.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
    this.handleExitSubmitModal = this.handleExitSubmitModal.bind(this);
  }

  reloadPage() {
    window.location.href = '/assignments';
  }

  // Only passed to LoadModal if submissionStatus == 'error'
  handleExitSubmitModal() {
    this.setState({ submissionStatus: null });
  }

  checkActionItemsEqual(actionItem1, actionItem2) {
    return (
      actionItem1.title === actionItem2.title &&
      actionItem1.description === actionItem2.description &&
      actionItem1.category === actionItem2.category &&
      actionItem1.dueDate === actionItem2.dueDate &&
      actionItem1.fileURL === actionItem2.fileURL
    );
  }

  // Used to close both the edit and view more modals
  handleCloseModal() {
    this.setState({
      modalActionItem: null,
      viewMoreModalOpen: false,
      editModalOpen: false,
    });
  }

  // Used to open both the edit and view more modals
  handleOpenModal(actionItem) {
    return modalType => {
      const modalOpen =
        modalType === 'edit' ? 'editModalOpen' : 'viewMoreModalOpen';
      this.setState({
        modalActionItem: actionItem,
        [modalOpen]: true,
      });
    };
  }

  editActionItem({
    title,
    description,
    categorySelected,
    dueDate,
    actionItem,
    file,
    fileURL,
  }) {
    this.setState(prevState => {
      const newSelectedActionItems = prevState.selectedActionItems.map(item => {
        const itemCopy = { ...item };
        if (this.checkActionItemsEqual(actionItem, item)) {
          // id needs to be null so checkmark doesn't appear
          itemCopy.id = null;
          itemCopy.title = title;
          itemCopy.description = description;
          itemCopy.category = categorySelected;
          itemCopy.dueDate = dueDate;
          itemCopy.file = file;
          itemCopy.fileURL = fileURL;
        }
        return itemCopy;
      });
      return { selectedActionItems: newSelectedActionItems };
    });
  }

  handleChange(name) {
    return event => {
      const { value } = event.target;
      this.setState({ [name]: value });
    };
  }

  handleFile(event) {
    const file = event.target.files[0];
    this.setState({ actionItemFile: file || null });
  }

  handleSubmit = async () => {
    if (
      this.state.selectedParticipants.length === 0 ||
      this.state.selectedActionItems.length === 0
    ) {
      this.setState({ submitFailed: true });
      return;
    }
    const participantIds = this.state.selectedParticipants.map(
      participant => participant.id,
    );

    this.setState({ submissionStatus: 'loading' });
    const actionItemList = [...this.state.selectedActionItems];

    // Wait until all http requests are done before rendering complete or error
    await Promise.all(
      actionItemList.map(async actionItem => {
        const singleForm = new FormData();
        singleForm.append('title', actionItem.title);
        singleForm.append('description', actionItem.description);
        singleForm.append('due_date', actionItem.dueDate);
        singleForm.append('category', actionItem.category);
        singleForm.append('file', actionItem.file);
        singleForm.append('participant_ids', participantIds);
        singleForm.append('fileURL', actionItem.fileURL);
        try {
          await apiPost('/api/assignments', singleForm);
          this.removeSelectedActionItem(actionItem);
        } catch (error) {
          Sentry.configureScope(function(scope) {
            scope.setExtra('file', 'ActionItemCreationPage');
            scope.setExtra('action', 'apiPost (handleSubmit)');
            scope.setExtra('participantIds', participantIds);
            scope.setExtra('body', JSON.stringify(singleForm));
          });
          Sentry.captureException(error);
        }
      }),
    );

    // After Promise only error'd action items will be in selectedActionItems
    this.setState(prevState => {
      const allRequestsSuccessful = prevState.selectedActionItems.length === 0;
      return {
        submissionStatus: allRequestsSuccessful ? 'complete' : 'error',
        submitErrored: !allRequestsSuccessful,
      };
    });
  };

  deleteTemplate(templateActionItem) {
    if (!templateActionItem.is_template || !templateActionItem.id) {
      return;
    }
    apiDelete(`/api/assignments/templates/${templateActionItem.id}`)
      .then(() =>
        this.setState(prevState => {
          const remainingTemplates = prevState.templateActionItems.filter(
            item => !this.checkActionItemsEqual(item, templateActionItem),
          );
          return { templateActionItems: remainingTemplates };
        }),
      )
      .catch(error => {
        Sentry.configureScope(function(scope) {
          scope.setExtra('file', 'ActionItemCreationPage');
          scope.setExtra('action', 'apiDelete');
          scope.setExtra('templateActionItemId', templateActionItem.id);
        });
        Sentry.captureException(error);
      });
  }

  removeSelectedActionItem(actionItem) {
    this.setState(prevState => {
      const filteredActionItems = prevState.selectedActionItems.filter(
        item =>
          !(
            this.checkActionItemsEqual(actionItem, item) &&
            actionItem.id === item.id
          ),
      );
      return { selectedActionItems: filteredActionItems };
    });
  }

  createActionItem(saveToTemplates) {
    const {
      actionItemTitle,
      actionItemDescription,
      actionItemCategory,
      actionItemDueDate,
      actionItemFile,
    } = this.state;
    if (
      actionItemTitle === '' ||
      actionItemDescription === '' ||
      actionItemCategory === null
    ) {
      return;
    }

    const actionItem = {
      title: actionItemTitle,
      description: actionItemDescription,
      category: actionItemCategory,
      dueDate: actionItemDueDate,
      file: actionItemFile,
      fileURL: actionItemFile
        ? window.URL.createObjectURL(actionItemFile)
        : null,
      is_template: saveToTemplates,
    };

    if (saveToTemplates) {
      const singleForm = new FormData();
      singleForm.append('title', actionItem.title);
      singleForm.append('description', actionItem.description);
      singleForm.append('due_date', actionItem.dueDate);
      singleForm.append('category', actionItem.category);
      singleForm.append('file', actionItem.file);
      apiPost('/api/assignments/templates', singleForm)
        .then(resp => {
          actionItem.id = resp.data.id;
          actionItem.fileURL = resp.data.fileURL;
          this.setState(prevState => ({
            templateActionItems: [actionItem, ...prevState.templateActionItems],
          }));
        })
        .catch(error => {
          Sentry.configureScope(function(scope) {
            scope.setExtra('file', 'ActionItemCreationPage');
            scope.setExtra('action', 'apiPost (createActionItem)');
            scope.setExtra('template', JSON.stringify(actionItem));
          });
          Sentry.captureException(error);
        });
    }

    this.setState(prevState => ({
      selectedActionItems: [actionItem, ...prevState.selectedActionItems],
      actionItemTitle: '',
      actionItemDescription: '',
      actionItemDueDate: '',
      actionItemCategory: null,
      actionItemFile: null,
    }));
  }

  selectActionItemTemplate(actionItem) {
    this.setState(prevState => ({
      selectedActionItems: [
        { ...actionItem },
        ...prevState.selectedActionItems,
      ],
    }));
  }

  nextStep() {
    this.setState(prevState => ({ step: prevState.step + 1 }));
  }

  prevStep() {
    // Clear any submit error text too
    this.setState(prevState => ({
      step: prevState.step - 1,
      submitErrored: false,
    }));
  }

  // Adds selected user to state to be displayed
  addUserToState(user) {
    this.setState(prevState => ({
      selectedParticipants: [...prevState.selectedParticipants, user],
    }));
  }

  // Removes user from display
  removeUserFromState(user) {
    this.setState(prevState => {
      const copy = [...prevState.selectedParticipants];
      const index = this.state.selectedParticipants.indexOf(user);
      copy.splice(index, 1); // Removes one element at `index` location
      return { selectedParticipants: copy };
    });
  }

  // Adds all users at once to be displayed
  addAllUsersToState(filteredParticipants) {
    const toAdd = [];
    const selectedIds = new Set(this.state.selectedParticipants.map(p => p.id));
    for (let i = 0; i < filteredParticipants.length; i += 1) {
      if (!selectedIds.has(filteredParticipants[i].id)) {
        toAdd.push(filteredParticipants[i]);
      }
    }

    this.setState(prevState => ({
      selectedParticipants: prevState.selectedParticipants.concat(toAdd),
    }));
  }

  // Removes all users at once from display
  removeAllUsersFromState(filteredParticipants) {
    const newParticipants = [];
    const filteredIds = new Set(filteredParticipants.map(p => p.id));
    for (let i = 0; i < this.state.selectedParticipants.length; i += 1) {
      if (!filteredIds.has(this.state.selectedParticipants[i].id)) {
        newParticipants.push(this.state.selectedParticipants[i]);
      }
    }

    this.setState({
      selectedParticipants: newParticipants,
    });
  }

  getMainComponents(stepSize) {
    let leftComponent;
    let rightComponent;
    let leftComponentText;
    let rightComponentText;
    let headerText;
    switch (stepSize) {
      case 0:
        leftComponentText = 'Assignments';
        rightComponentText = 'Add Assignments';
        headerText = 'Add Assignments to List';
        leftComponent = (
          <ActionItemList
            selectedActionItems={this.state.selectedActionItems}
            removeSelectedActionItem={this.removeSelectedActionItem}
            handleOpenModal={this.handleOpenModal}
          />
        );
        rightComponent = (
          <ActionItemCreationContainer
            templates={this.state.templateActionItems}
            selectedActionItemIds={
              new Set(this.state.selectedActionItems.map(item => item.id))
            }
            title={this.state.actionItemTitle}
            setTitle={this.handleChange('actionItemTitle')}
            description={this.state.actionItemDescription}
            setDescription={this.handleChange('actionItemDescription')}
            categorySelected={this.state.actionItemCategory}
            setCategory={this.handleChange('actionItemCategory')}
            dueDate={this.state.actionItemDueDate}
            setDueDate={this.handleChange('actionItemDueDate')}
            createActionItem={this.createActionItem}
            removeSelectedActionItem={this.removeSelectedActionItem}
            selectActionItemTemplate={this.selectActionItemTemplate}
            deleteTemplate={this.deleteTemplate}
            setFile={this.handleFile}
            handleOpenModal={this.handleOpenModal}
            categories={this.props.categories}
          />
        );
        break;
      case 1:
        leftComponentText = 'Students';
        rightComponentText = 'Add Students';
        headerText = 'Add Students to Assignments';

        leftComponent = (
          <ActionItemDisplayParticipants
            selectedParticipants={this.state.selectedParticipants}
          />
        );
        rightComponent = (
          <ActionItemSearchParticipants
            participants={this.state.participants}
            selectedParticipants={this.state.selectedParticipants}
            statuses={this.props.statuses}
            addUser={this.addUserToState}
            removeUser={this.removeUserFromState}
            addAllUsers={this.addAllUsersToState}
            removeAllUsers={this.removeAllUsersFromState}
          />
        );
        break;
      case 2:
        leftComponentText = 'Review Students';
        rightComponentText = this.state.submitErrored
          ? 'Failed Assignments'
          : 'Review Assignments';
        headerText = 'Review and Assign';

        leftComponent = (
          <ActionItemDisplayParticipants
            selectedParticipants={this.state.selectedParticipants}
          />
        );
        rightComponent = (
          <ActionItemList
            selectedActionItems={this.state.selectedActionItems}
            removeSelectedActionItem={this.removeSelectedActionItem}
            handleOpenModal={this.handleOpenModal}
          />
        );
        break;
      default:
        leftComponent = null;
        rightComponent = null;
        leftComponentText = null;
        rightComponentText = null;
        headerText = null;
    }
    return {
      leftComponent,
      rightComponent,
      leftComponentText,
      rightComponentText,
      headerText,
    };
  }

  getButtons(stepSize) {
    const { classes } = this.props;
    const forwardButtonText = stepSize === 2 ? 'ASSIGN' : 'SAVE & CONTINUE';
    const handleForwardButtonClick =
      stepSize === 2 ? this.handleSubmit : this.nextStep;

    const backButton = (
      <Grid item>
        <Fab
          className={classes.iconStyle}
          component="span"
          variant="extended"
          size="medium"
          aria-label="category"
          onClick={this.prevStep}
        >
          <Typography className={classes.categoryButtonStyle} align="center">
            BACK
          </Typography>
        </Fab>
      </Grid>
    );
    const forwardButton = (
      <Grid item style={{ 'padding-left': '16px' }}>
        <Fab
          className={classes.iconStyle}
          component="span"
          variant="extended"
          size="medium"
          aria-label="category"
          onClick={handleForwardButtonClick}
        >
          <Typography className={classes.categoryButtonStyle} align="center">
            {forwardButtonText}
          </Typography>
        </Fab>
      </Grid>
    );

    return (
      <Grid container alignItems="center" justify="flex-end">
        {/* No back button if at beginning of form */}
        {stepSize === 0 ? null : backButton}
        {forwardButton}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    const {
      leftComponent,
      leftComponentText,
      rightComponent,
      rightComponentText,
      headerText,
    } = this.getMainComponents(this.state.step);
    const buttonsGrid = this.getButtonsGrid(this.state.step);

    return (
      <div>
        {this.state.viewMoreModalOpen ? (
          <ViewMoreModal
            open={this.state.viewMoreModalOpen}
            handleClose={this.handleCloseModal}
            title={this.state.modalActionItem.title}
            description={this.state.modalActionItem.description}
            category={this.state.modalActionItem.category}
            dueDate={this.state.modalActionItem.dueDate}
            fileURL={this.state.modalActionItem.fileURL}
          />
        ) : null}
        {this.state.editModalOpen ? (
          <ActionItemModal
            open={this.state.editModalOpen}
            handleClose={this.handleCloseModal}
            handleSubmit={this.editActionItem}
            actionItem={this.state.modalActionItem}
            title={this.state.modalActionItem.title}
            description={this.state.modalActionItem.description}
            categorySelected={this.state.modalActionItem.category}
            categories={this.props.categories}
            dueDate={this.state.modalActionItem.dueDate}
            file={this.state.modalActionItem.file}
            fileURL={this.state.modalActionItem.fileURL}
            type="edit"
          />
        ) : null}

        <LoadModal
          open={this.state.submissionStatus !== null}
          status={this.state.submissionStatus}
          handleClick={
            this.state.submissionStatus === 'complete'
              ? this.reloadPage
              : this.handleExitSubmitModal
          }
          handleClose={
            this.state.submissionStatus === 'error'
              ? this.handleExitSubmitModal
              : null
          }
          errorCount={
            this.state.submissionStatus === 'error'
              ? this.state.selectedActionItems.length
              : null
          }
        />
        <Snackbar
          open={this.state.submitFailed}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          onClose={(event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            this.handleChange('submitFailed')({ target: { value: false } });
          }}
        >
          <SnackbarContent
            classes={{ root: classes.snackbarStyle }}
            message="There must be at least 1 assignment and 1 student"
          />
        </Snackbar>
        <Grid container className={classes.pageStyle} spacing={1}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            wrap="nowrap"
          >
            <Grid
              container
              item
              direction="row"
              alignItems="flex-start"
              justifyContent="center"
              className={classes.headerStyle}
            >
              <Grid item>
                <img
                  src={`/assets/action_item_step_${this.state.step}.svg`}
                  alt={`Step ${this.state.step + 1} of form`}
                />
              </Grid>
              <Grid item>
                <Typography className={classes.topLeftTextStyle}>
                  {headerText}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              className={classes.mainBackgroundStyle}
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography className={classes.underlineStyle}>
                  {leftComponentText}
                </Typography>
                <hr className={classes.borderStyle}></hr>
                <Divider style={{ marginBottom: '10px' }} />
                {leftComponent}
              </Grid>
              <Grid item>
                <Typography
                  className={classes.underlineStyle}
                  style={{ color: this.state.submitErrored ? 'red' : null }}
                >
                  {rightComponentText}
                </Typography>
                <hr className={classes.borderStyle}></hr>
                <Divider style={{ marginBottom: '10px' }} />
                {rightComponent}
              </Grid>
            </Grid>
            {buttonsGrid}
          </Grid>
        </Grid>
      </div>
    );
  }
}

ActionItemCreationPage.propTypes = {
  classes: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  statuses: PropTypes.object.isRequired,
  participants: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

export default withStyles(styles)(ActionItemCreationPage);
