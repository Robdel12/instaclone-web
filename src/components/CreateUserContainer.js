import React from 'react';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CreateUserView from '../components/presentational/CreateUserView';

class CreateUserContainer extends React.Component {

  static propTypes = {
    router: React.PropTypes.object.isRequired,
    createUser: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  render () {
    return <CreateUserView data={this.props.data} createUser={this.createUser} />;
  }

  createUser = (emailAddress, name, displayName, profileImage) => {
    const variables = {
      idToken: window.localStorage.getItem('auth0IdToken'),
      emailAddress,
      name,
      displayName,
      profileImage
    };

    this.props.createUser({ variables })
      .then((response) => {
        this.props.router.push('/');
      }).catch((e) => {
        console.error(e);
        // lol handle errors
        this.props.router.push('/');
      });
  }
}

const createUser = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String!, $displayName: String!, $profileImage: String!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress, displayName: $displayName, profileImage: $profileImage) {
      id
    }
  }
`;

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: { forceFetch: true }})(withRouter(CreateUserContainer))
);
