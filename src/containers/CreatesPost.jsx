import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalBackground,
  ModalContent,
  ModalClose,
  Field,
  Label,
  Control,
  Input,
  TextArea,
  Button,
  Checkbox,
  Help,
  Tabs,
  Tab,
  TabList,
  TabLink,
} from 'bloomer';

import { storeLog, LOG_LEVEL_ERROR } from '../modules/Logger';
import FormValidator from '../modules/FormValidator';
import PostPreview from '../components/PostPreview';
import { apiCreatePost, raiseApiGenericError } from '../actions';
import { authShape } from '../shapes';

import './CreatesPost.css';

const initialState = {
  playtime: '',
  markdown: '',
  dirty: false,
  anonymous: false,
  validation: false,
  submitting: false,
  submitted: false,
  activeTab: 'create',
};


class CreatesPost extends Component {
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

  state = initialState;

  resetState() {
    this.setState(initialState);
  }

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    let { value } = target;

    if (target.type === 'checkbox') {
      value = target.checked;
    }
    this.setState({
      [name]: value,
      dirty: true,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { auth } = this.props;
    const validation = this.validator.validate(this.state);
    const { clickCloseModalHandler, actionApiCreatePost, actionRaiseApiGenericError } = this.props;
    if (validation.isValid) {
      this.setState({ submitting: true });
      actionApiCreatePost(this.state, auth.token).then(() => {
        this.resetState();
        clickCloseModalHandler();
      }).catch((error) => {
        this.resetState();
        clickCloseModalHandler();
        actionRaiseApiGenericError('Cannot submit data. Please try again!');
        storeLog(error, LOG_LEVEL_ERROR);
      });
    } else {
      this.setState({ dirty: true });
    }
  }

  toggleTab(state) {
    this.setState({ activeTab: state });
  }

  render() {
    const {
      dirty,
      activeTab,
      playtime,
      markdown,
      anonymous,
      submitting,
    } = this.state;
    const { openModal, clickCloseModalHandler, auth } = this.props;
    const { user: authUser } = auth;
    // if the form has been submitted at least once
    // then check validity every time we render
    // otherwise just use what's in state
    let validation = this.validator.valid();
    if (dirty === true) {
      validation = this.validator.validate(this.state);
    }

    const getColorForFormFields = (state) => {
      if (state === true) {
        return 'danger';
      }
      return 'success';
    };

    return (
      <Modal isActive={openModal}>
        <ModalBackground />
        <ModalContent>
          <Tabs>
            <TabList>
              <Tab isActive={activeTab === 'create'}>
                <TabLink onClick={() => this.toggleTab('create')}>
                  <span>Create</span>
                </TabLink>
              </Tab>
              <Tab isActive={activeTab === 'preview'}>
                <TabLink onClick={() => this.toggleTab('preview')}>
                  <span>Preview</span>
                </TabLink>
              </Tab>
            </TabList>
          </Tabs>
          { activeTab === 'create'
          && (
            <form onSubmit={event => this.handleSubmit(event)}>
              <Field>
                <Label>Hours of playtime</Label>
                <Control>
                  <Input
                    name="playtime"
                    type="text"
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
                <Control>
                  <Button isLink onClick={() => { clickCloseModalHandler(); }}>
                    Cancel
                  </Button>
                </Control>
              </Field>
            </form>
          )}
          { (activeTab === 'preview')
          && (
            <PostPreview
              authUser={authUser}
              anonymous={anonymous}
              playtime={playtime}
              markdown={markdown}
            />
          )}
        </ModalContent>
        <ModalClose onClick={() => { clickCloseModalHandler(); }} />
      </Modal>
    );
  }
}

CreatesPost.propTypes = {
  // https://github.com/yannickcr/eslint-plugin-react/issues/1389
  // TODO follow up
  // eslint-disable-next-line react/no-typos
  auth: authShape.isRequired,
  clickCloseModalHandler: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  actionApiCreatePost: PropTypes.func.isRequired,
  actionRaiseApiGenericError: PropTypes.func.isRequired,
};

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    actionApiCreatePost: apiCreatePost,
    actionRaiseApiGenericError: raiseApiGenericError,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatesPost);
