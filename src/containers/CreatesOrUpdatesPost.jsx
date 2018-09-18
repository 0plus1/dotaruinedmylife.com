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
import { apiCreatePost, apiUpdatePost, raiseApiGenericError } from '../actions';
import { postShape, authShape } from '../shapes';

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

  componentWillMount() {
    const { post } = this.props;
    if (post !== null) {
      const {
        playtime,
        markdown,
      } = post;
      this.setState({
        formData: {
          playtime,
          markdown,
          anonymous: (post.user_name === ''),
        },
      });
    }
  }

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

  createOrUpdatePost() {
    const {
      clickCloseModalHandler,
      auth,
      post,
      actionApiCreatePost,
      actionApiUpdatePost,
      actionRaiseApiGenericError,
    } = this.props;
    const { formData } = this.state;

    let action = null;
    if (post === null) {
      action = actionApiCreatePost(formData, auth.token).then(() => {
        this.resetForm();
        clickCloseModalHandler();
      });
    } else {
      action = actionApiUpdatePost(post.slug, formData, auth.token).then(() => {
        this.setState({ formKey: Math.random() });
        clickCloseModalHandler();
      });
    }

    action.catch((error) => {
      this.resetForm();
      clickCloseModalHandler();
      actionRaiseApiGenericError('Cannot submit data. Please try again!');
      storeLog(error, LOG_LEVEL_ERROR);
    });
  }

  toggleTab(state) {
    this.setState({ activeTab: state });
  }

  renderModalHeader() {
    const { post, clickCloseModalHandler } = this.props;
    return (
      <ModalCardHeader>
        { post ? (
          <ModalCardTitle>Update post</ModalCardTitle>
        ) : (
          <ModalCardTitle>Create new post</ModalCardTitle>
        )}
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
                    createPostHandler={() => this.createOrUpdatePost()}
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
  post: postShape,
  clickCloseModalHandler: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  actionApiCreatePost: PropTypes.func.isRequired,
  actionApiUpdatePost: PropTypes.func.isRequired,
  actionRaiseApiGenericError: PropTypes.func.isRequired,
};

CreatesOrUpdatesPost.defaultProps = {
  post: null,
};

function mapStateToProps({ auth, cuPostModal }) {
  return { auth, cuPostModal };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    actionApiCreatePost: apiCreatePost,
    actionApiUpdatePost: apiUpdatePost,
    actionRaiseApiGenericError: raiseApiGenericError,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatesOrUpdatesPost);
