import React from 'react';
import Photo from '../components/Photo';
import Loading from './presentational/Loading';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Link,
} from 'react-router';

class UserProfile extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  get _isLoggedIn() {
    return this.props.data.user;
  }

  render () {
    if (this.props.data.loading) {
      return <Loading />;
    }

    if (!this._isLoggedIn) {
      return (<h1>You must login to see your profile</h1>);
    }

    return (
      <div>
        <h1>{this.props.data.user.name}</h1>
        <Link to="/profile/edit">Edit profile</Link>
        <div style={{maxWidth: "600px", margin: "0 auto", padding: "20px 0"}}>
          {this.props.data.user.photos.map(photo => {
            return (
              <Photo key={photo.id} photo={photo} user={this.props.data.user} />
            );
          })}
        </div>
      </div>
    );
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

export default graphql(FeedQuery)(UserProfile);
