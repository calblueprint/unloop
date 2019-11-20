/**
 *
 * PaperworkFormContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { apiPost } from 'utils/axios';
import PaperworkForm from 'components/PaperworkForm';

class PaperworkFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paperwork: {
        title: this.props.title,
        link: this.props.link,
      },
      errors: {
        title: '',
        link: '',
      },
    };
  }

  checkErrors = field => () => {
    let errorMessage = '';
    if (field === 'title') {
      const { title } = this.state.paperwork;
      if (
        title === '' ||
        validator.isEmpty(title, { ignore_whitespace: true })
      ) {
        errorMessage = 'Title is required';
      }
    } else if (field === 'link') {
      const { link } = this.state.paperwork;
      if (link === '' || validator.isEmpty(link, { ignore_whitespace: true })) {
        errorMessage = 'Link is required';
      } else if (!validator.isURL(link, { require_protocol: true })) {
        errorMessage = 'Link is not valid';
      }
    }

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [field]: errorMessage,
      },
    }));
  };

  handleSubmit = () => {
    const body = {
      ...this.state.paperwork,
      participant_id: this.props.participantId,
      agree: false,
    };

    const { errors } = this.state;
    let hasErrors = false;
    Object.keys(errors).forEach(field => {
      this.checkErrors(field)();
      hasErrors = hasErrors || errors[field] !== '';
    });

    if (!hasErrors) {
      apiPost('/api/paperworks', { paperwork: body })
        .then(() => window.location.reload())
        .catch(error => console.error(error));
      // TODO: Change this to flash an error message
    }
  };

  onFormFieldChange = (field, value) => {
    this.setState(prevState => ({
      paperwork: {
        ...prevState.paperwork,
        [field]: value,
      },
    }));
  };

  render() {
    const { open, onClose } = this.props;
    const {
      paperwork: { title, link },
      errors,
    } = this.state;
    return (
      <PaperworkForm
        title={title}
        link={link}
        errors={errors}
        checkErrors={this.checkErrors}
        handleSubmit={this.handleSubmit}
        onChange={this.onFormFieldChange}
        open={open}
        onClose={onClose}
      />
    );
  }
}

PaperworkFormContainer.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  participantId: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

PaperworkFormContainer.defaultProps = {
  title: '',
  link: '',
};

export default PaperworkFormContainer;
