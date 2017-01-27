import React from 'react';
import Post from '../components/Post';
import Loading from './presentational/Loading';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          <h1>{this.props.data.user.name}</h1>
          {this.props.data.user.photos.map(photo => {
            return (
              <Post key={photo.id} post={photo} />
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
    photos(orderBy: createdAt_DESC) {
      id,
      description,
      imageUrl
    }
  }
}`;

export default graphql(FeedQuery)(UserProfile);
