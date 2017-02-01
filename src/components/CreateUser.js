import React from 'react';
import Loading from './presentational/Loading';
import InputField from './InputField';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreateUser extends React.Component {

  static propTypes = {
    router: React.PropTypes.object.isRequired,
    createUser: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  state = {
    emailAddress: '',
    name: '',
    displayName: '',
    profileImage: '',
  }

  get isDisabledBtn() {
    return !this.state.emailAddress && !this.state.name && !this.state.displayName;
  }

  handleInput = (stateKey, event) => {
    this.setState({[stateKey]: event.target.value});
  }

  render () {
    if (this.props.data.loading) {
      return <Loading />;
    }

    // redirect if user is logged in or did not finish Auth0 Lock dialog
    if (this.props.data.user || window.localStorage.getItem('auth0IdToken') === null) {
      console.warn('not a new user or already logged in');
      this.props.router.replace('/');
    }

    return (
      <div className="columns" style={{maxWidth: "1040px", margin: "0 auto"}}>
        <div className="column">
          <InputField
            labelName="Email Address"
            value={this.state.emailAddress}
            placeholder='example@domain.com'
            stateKey="emailAddress"
            handleChange={this.handleInput}
            />

          <InputField
            labelName="Name"
            value={this.state.name}
            placeholder='Jimmy Doe'
            stateKey="name"
            handleChange={this.handleInput}
            />

          <InputField
            labelName="Display Name"
            value={this.state.displayName}
            placeholder='@jimmyDoe'
            stateKey="displayName"
            handleChange={this.handleInput}
            />

          <InputField
            labelName="Profile Image"
            value={this.state.profileImage}
            placeholder='example.com/profile.png'
            stateKey="profileImage"
            handleChange={this.handleInput}
            />


          <div className="control is-grouped" style={{marginTop: "15px"}}>
            <p className="control">
              <button
                disabled={this.isDisabledBtn}
                className="button is-primary"
                onClick={this.createUser}>
                Submit
              </button>
            </p>
            <p className="control">
              <button className="button is-link">Cancel</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  createUser = () => {
    const variables = {
      idToken: window.localStorage.getItem('auth0IdToken'),
      emailAddress: this.state.emailAddress,
      name: this.state.name,
      displayName: this.state.displayName,
      profileImage: this.state.profileImage
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
  graphql(userQuery, { options: { forceFetch: true }})(withRouter(CreateUser))
);
