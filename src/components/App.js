import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import gql from 'graphql-tag';
import Navigation from './Navigation';

class App extends React.Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  render () {
    return (
      <div>
        <Navigation user={this.props.data.user} />
        {this.props.children}
      </div>
    );
  }
}

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(userQuery, { options: {forceFetch: true }})(withRouter(App));
