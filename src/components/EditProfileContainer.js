import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import EditProfileView from '../components/presentational/EditProfileView';

class EditProfileContainer extends Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  handleSubmit = (displayName, name, profileImage, emailAddress) => {
    let id = this.props.data.user.id;

    this.props.mutate({ variables: { id, displayName, name, profileImage, emailAddress}}).then(() => {
        this.props.router.push('/profile');
      });
  }

  render() {
    return <EditProfileView data={this.props.data} handleSubmit={this.handleSubmit} />;
  }
}

const UserQuery = gql`query {
  user {
    id,
    name,
    displayName,
    profileImage,
    emailAddress
  }
}`;

const UpdateUser = gql`
  mutation ($id: ID!, $name: String!, $displayName: String!, $profileImage: String!, $emailAddress: String!){
    updateUser(id: $id, name: $name, displayName: $displayName, profileImage: $profileImage, emailAddress: $emailAddress) {
      id
    }
  }
`;


export default graphql(UpdateUser)(graphql(UserQuery)(withRouter(EditProfileContainer)));
