import React from 'react';
import Loading from './presentational/Loading';
import InputField from './InputField';
import Photo from './presentational/Photo';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreatePost extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
    data: React.PropTypes.object,
  }

  get isDisabledBtn() {
    return !this.state.imageUrl;
  }

  state = {
    description: '',
    imageUrl: '',
  }

  handleInput = (stateKey, event) => {
    this.setState({[stateKey]: event.target.value});
  }

  render () {
    if (this.props.data.loading) {
      return <Loading />;
    }

    // redirect if no user is logged in
    // Todo: this can be done before render.
    if (!this.props.data.user) {
      // Todo show a flash message
      console.warn('only logged in users can create new posts');
      this.props.router.push('/');
    }

    return (
      <div className="columns" style={{maxWidth: "1040px", margin: "0 auto"}}>
        <div className="column">
          <InputField
            labelName='Description'
            placeholder='Description'
            stateKey="description"
            value={this.state.description}
            handleChange={this.handleInput}
            />

          <InputField
            labelName='Image URL'
            placeholder='example.com/images/01.jpg'
            stateKey="imageUrl"
            value={this.state.imageUrl}
            handleChange={this.handleInput}
            />

          <div className="control is-grouped" style={{marginTop: "15px"}}>
            <p className="control">
              <button
                disabled={this.isDisabledBtn}
                className="button is-primary"
                onClick={this.handlePost}>
                Submit
              </button>
            </p>
            <p className="control">
              <button className="button is-link">Cancel</button>
            </p>
          </div>
        </div>
        <div className="column">
          <div style={{maxWidth: "600px", margin: "0 auto", padding: "20px 0"}}>
            <Photo user={this.props.data.user} photo={this.state} />
          </div>

        </div>
      </div>
    );
  }

  handlePost = () => {
    let { description, imageUrl } = this.state;

    this.props.mutate({ variables: { description, imageUrl, userId: this.props.data.user.id }})
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
      id,
      name,
      displayName,
      profileImage
    }
  }
`;

export default graphql(createPost)(
  graphql(userQuery, { options: { forceFetch: true }} )(withRouter(CreatePost))
);
