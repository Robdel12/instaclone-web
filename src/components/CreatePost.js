import React from 'react';
import Loading from './presentational/Loading';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreatePost extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
    data: React.PropTypes.object,
  }

  state = {
    description: '',
    imageUrl: '',
    user: null,
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.user === null && nextProps.data.user) {
      this.setState({user: nextProps.data.user });
    }
  }

  render () {
    if (this.props.data.loading) {
      return <Loading />;
    }

    // redirect if no user is logged in
    if (!this.props.data.user) {
      console.warn('only logged in users can create new posts');
      this.props.router.push('/');
    }

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.description}
            placeholder='Description'
            onChange={(e) => this.setState({description: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.imageUrl}
            placeholder='Image Url'
            onChange={(e) => this.setState({imageUrl: e.target.value})}
          />
          {this.state.imageUrl &&
            <img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
          }
          {this.state.description && this.state.imageUrl &&
           <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handlePost.bind(this)}>Post</button>
          }
        </div>
      </div>
    );
  }

  handlePost() {
    const { description, imageUrl } = this.state;

    this.props.mutate({ variables: { description, imageUrl, userId: this.state.user.id }})
      .then(() => {
        this.props.router.replace('/');
      });
  }
}

const createPost = gql`
  mutation ($description: String!, $imageUrl: String!, $userId: ID!){
    createPhoto(description: $description, imageUrl: $imageUrl, userId: $userId) {
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

export default graphql(createPost)(
  graphql(userQuery, { options: { forceFetch: true }} )(withRouter(CreatePost))
);
