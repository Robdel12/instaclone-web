import React from 'react';
import Post from '../components/Post';
import Loading from './presentational/Loading';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return <Loading />;
    }
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.data.allPhotos.map((post) =>
            <Post key={post.id} post={post} />
          )}
        </div>
      </div>
    );
  }
}

const FeedQuery = gql`query {
  allPhotos(orderBy: createdAt_DESC) {
    id
    imageUrl
    description
  }
}`;

export default graphql(FeedQuery)(ListPage);
