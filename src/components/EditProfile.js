import React, { Component } from 'react';
import Loading from './presentational/Loading';
import InputField from './InputField';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class EditProfile extends Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      displayName: nextProps.data.user.displayName,
      name: nextProps.data.user.name,
      profileImage: nextProps.data.user.profileImage,
      emailAddress: nextProps.data.user.emailAddress
    });
  }

  setInput = (stateKey, event) => {
    this.setState({[stateKey]: event.target.value});
  }

  handleSubmit = () => {
    let { displayName, name, profileImage, emailAddress } = this.state;
    let id = this.props.data.user.id;

    this.props.mutate({ variables: { id: id, displayName, name, profileImage, emailAddress}}).then(() => {
        this.props.router.push('/profile');
      });
  }

  render() {
    let user = this.props.data.user;
    let state = this.state;

    if (!user) {
      return <Loading />;
    }

    return (
      <div className="columns" style={{maxWidth: "1040px", margin: "0 auto"}}>
        <div className="column">
          <InputField
            iconClass="fa-user"
            stateKey="displayName"
            labelName="Username"
            placeholder="@somebody"
            value={state.displayName}
            handleChange={this.setInput}
            />

          <InputField
            iconClass="fa-user"
            stateKey="name"
            labelName="Name"
            placeholder="Jimmy Doe"
            value={state.name}
            handleChange={this.setInput}
            />

          <InputField
            iconClass="fa-picture-o"
            stateKey="profileImage"
            labelName="Profile Image"
            placeholder="example.com/image.png"
            value={state.profileImage}
            handleChange={this.setInput}
            />

          <InputField
            iconClass="fa-envelope-o"
            stateKey="emailAddress"
            labelName="Email"
            placeholder="jimmy@example.com"
            value={state.emailAddress}
            handleChange={this.setInput}
            />

          <div className="control is-grouped">
            <p className="control">
              <button className="button is-primary" onClick={this.handleSubmit}>Submit</button>
            </p>
            <p className="control">
              <button className="button is-link">Cancel</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const UserQuery = gql`query {
  user {
    id,
    name,
    displayName,
    profileImage,
    emailAddress
  }
}`;

const UpdateUser = gql`
  mutation ($id: ID!, $name: String!, $displayName: String!, $profileImage: String!, $emailAddress: String!){
    updateUser(id: $id, name: $name, displayName: $displayName, profileImage: $profileImage, emailAddress: $emailAddress) {
      id
    }
  }
`;


export default graphql(UpdateUser)(graphql(UserQuery)(withRouter(EditProfile)));
