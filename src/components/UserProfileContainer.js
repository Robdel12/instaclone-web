import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import UserProfileView from '../components/presentational/UserProfileView';

class UserProfileContainer extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }


  render () {
    return <UserProfileView data={this.props.data} />;
  }
}

const FeedQuery = gql`query {
  user {
    id,
    name,
    displayName,
    profileImage,
    photos(orderBy: createdAt_DESC) {
      id,
      description,
      imageUrl,
      createdAt
    }
  }
}`;

export default graphql(FeedQuery)(UserProfileContainer);
