import React from 'react';
import Photo from '../components/Photo';
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
      <div style={{maxWidth: "600px", margin: "0 auto", padding: "20px 0"}}>
        {this.props.data.allPhotos.map(photo =>
          <Photo key={photo.id} photo={photo} user={photo.user} />
        )}
      </div>
    );
  }
}

const FeedQuery = gql`query {
  allPhotos(orderBy: createdAt_DESC) {
    id,
    imageUrl,
    description,
    createdAt,
    user {
      id,
      name,
      profileImage,
      displayName
    }
  }
}`;

export default graphql(FeedQuery)(ListPage);
