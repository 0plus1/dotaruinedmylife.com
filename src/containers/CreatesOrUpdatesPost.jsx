import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Container,
  Modal,
  ModalBackground,
  ModalContent,
  Button,
  ModalCard,
  ModalCardBody,
  ModalCardTitle,
  ModalCardHeader,
  Tabs,
  Tab,
  TabList,
  TabLink,
} from 'bloomer';

import { storeLog, LOG_LEVEL_ERROR } from '../modules/Logger';
import PostForm from '../components/PostForm';
import PostPreview from '../components/PostPreview';
import { apiCreatePost, raiseApiGenericError } from '../actions';
import { authShape } from '../shapes';

import './CreatesOrUpdatesPost.css';

class CreatesOrUpdatesPost extends Component {
  state = {
    formData: {
      playtime: 0,
      markdown: '',
      anonymous: false,
    },
    activeTab: 'create',
    formKey: Math.random(),
  };

  /**
   * Reset form, forces a re-render of the form component by issuing a new key
   */
  resetForm() {
    this.setState({
      formData: {
        playtime: 0,
        markdown: '',
        anonymous: false,
      },
      formKey: Math.random(),
    });
  }

  createPost() {
    const {
      clickCloseModalHandler,
      auth,
      actionApiCreatePost,
      actionRaiseApiGenericError,
    } = this.props;
    const { formData } = this.state;
    actionApiCreatePost(formData, auth.token).then(() => {
      this.resetForm();
      clickCloseModalHandler();
    }).catch((error) => {
      this.resetForm();
      clickCloseModalHandler();
      actionRaiseApiGenericError('Cannot submit data. Please try again!');
      storeLog(error, LOG_LEVEL_ERROR);
    });
  }

  updatePost() {
    const {
      clickCloseModalHandler,
      auth,
      actionApiCreatePost,
      actionRaiseApiGenericError,
    } = this.props;
    const { formData } = this.state;
    actionApiCreatePost(formData, auth.token).then(() => {
      this.resetState();
      clickCloseModalHandler();
    }).catch((error) => {
      this.resetState();
      clickCloseModalHandler();
      actionRaiseApiGenericError('Cannot submit data. Please try again!');
      storeLog(error, LOG_LEVEL_ERROR);
    });
  }

  toggleTab(state) {
    this.setState({ activeTab: state });
  }

  renderModalHeader() {
    const { clickCloseModalHandler } = this.props;
    return (
      <ModalCardHeader>
        <ModalCardTitle>Create new post</ModalCardTitle>
        <Button isLink onClick={() => { clickCloseModalHandler(); }}>
          Cancel
        </Button>
      </ModalCardHeader>
    );
  }

  renderTabs() {
    const { activeTab } = this.state;
    return (
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
    );
  }

  render() {
    const {
      activeTab,
      formData,
      formKey,
    } = this.state;
    const { openModal, auth } = this.props;

    return (
      <Modal isActive={openModal}>
        <ModalBackground />
        <ModalCard>
          { this.renderModalHeader() }
          <ModalCardBody>
            <ModalContent>
              <Container>
                { this.renderTabs() }
                { activeTab === 'create'
                && (
                  <PostForm
                    key={formKey}
                    createPostHandler={() => this.createPost()}
                    formData={formData}
                  />
                )}
                { (activeTab === 'preview')
                && (
                  <PostPreview
                    authUser={auth.user}
                    formData={formData}
                  />
                )}
              </Container>
            </ModalContent>
          </ModalCardBody>
        </ModalCard>
      </Modal>
    );
  }
}

CreatesOrUpdatesPost.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatesOrUpdatesPost);
