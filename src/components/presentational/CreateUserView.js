import React from 'react';
import Loading from './Loading';
import InputField from './InputField';
import { withRouter } from 'react-router';

class CreateUserView extends React.Component {

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
        <h1>Sign up</h1>
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
    const {
      emailAddress,
      name,
      displayName,
      profileImage
    } = this.state;

    this.props.createUser(emailAddress, name, displayName, profileImage);
  }
}

export default withRouter(CreateUserView);
