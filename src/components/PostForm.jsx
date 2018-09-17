import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  Label,
  Control,
  Input,
  TextArea,
  Button,
  Checkbox,
  Help,
} from 'bloomer';

import FormValidator from '../modules/FormValidator';
import { postFormShape } from '../shapes';

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: 'playtime',
        method: 'isNumeric',
        validWhen: true,
        message: 'Only numbers, please.',
      },
      {
        field: 'markdown',
        method: 'isEmpty',
        validWhen: false,
        message: 'Markdown is required.',
      },
    ]);
  }

  state = {
    formData: null,
    dirty: false,
    submitting: false,
  };

  componentWillMount() {
    const { formData } = this.props;
    this.setState({ formData });
  }

  handleInputChange(event) {
    const { formData } = this.props;
    const { target } = event;
    const { name } = target;
    let { value } = target;

    if (target.type === 'checkbox') {
      value = target.checked;
    }
    // If value is a number, typecast
    if (/^\d+$/.test(value)) {
      value = parseInt(value, 10);
    }
    // Update formData props
    // Todo this is a bit dodgy
    formData[name] = value;
    this.setState({
      formData,
      dirty: true,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { formData, createPostHandler } = this.props;
    const validation = this.validator.validate(formData);
    if (validation.isValid) {
      this.setState({ submitting: true });
      createPostHandler();
    } else {
      this.setState({ dirty: true });
    }
  }

  render() {
    const {
      formData,
      dirty,
      submitting,
    } = this.state;
    const {
      markdown,
      playtime,
      anonymous,
    } = formData;
    // if the form has been submitted at least once
    // then check validity every time we render
    // otherwise just use what's in state
    let validation = this.validator.valid();
    if (dirty === true) {
      validation = this.validator.validate(formData);
    }

    const getColorForFormFields = (state) => {
      if (state === true) {
        return 'danger';
      }
      return 'success';
    };

    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <Field>
          <Label>Hours of playtime</Label>
          <Control>
            <Input
              name="playtime"
              type="number"
              isColor={getColorForFormFields(validation.playtime.isInvalid)}
              value={playtime}
              onChange={event => this.handleInputChange(event)}
            />
          </Control>
          <Help isColor={getColorForFormFields(validation.playtime.isInvalid)}>
            {validation.playtime.message}
          </Help>
        </Field>
        <Field>
          <Label>Message (Markdown supported)</Label>
          <Control>
            <TextArea
              name="markdown"
              placeholder="Your story.."
              value={markdown}
              onChange={event => this.handleInputChange(event)}
            />
          </Control>
          <Help isColor={getColorForFormFields(validation.markdown.isInvalid)}>
            {validation.markdown.message}
          </Help>
        </Field>

        <Field>
          <Control>
            <Checkbox
              name="anonymous"
              onChange={event => this.handleInputChange(event)}
              defaultChecked={anonymous}
            >
              Hide steam username
            </Checkbox>
          </Control>
        </Field>

        <Field isGrouped>
          <Control>
            <Button isColor="primary" isLoading={submitting} type="submit">Submit</Button>
          </Control>
        </Field>
      </form>
    );
  }
}

PostForm.propTypes = {
  createPostHandler: PropTypes.func.isRequired,
  formData: postFormShape.isRequired,
};

export default PostForm;
