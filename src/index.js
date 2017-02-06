import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import CreatePostContainer from './components/CreatePostContainer';
import CreateUserContainer from './components/CreateUserContainer';
import ListPageContainer from './components/ListPageContainer';
import UserProfileContainer from './components/UserProfileContainer';
import EditProfileContainer from './components/EditProfileContainer';
import Logout from './components/Logout';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/ciy4kveic00340143rzx2qgck' });

// use the auth0IdToken in localStorage for authorized requests
networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('auth0IdToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`;
    }
    next();
  }
}]);

const client = new ApolloClient({ networkInterface });

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={ListPageContainer} />
        <Route path='feed' component={ListPageContainer} />
        <Route path='new' component={CreatePostContainer} />
        <Route path='signup' component={CreateUserContainer} />
        <Route path='profile'>
          <IndexRoute component={UserProfileContainer} />
          <Route path='edit' component={EditProfileContainer} />
        </Route>
        <Route path='logout' component={Logout} />
      </Route>
    </Router>
  </ApolloProvider>
), document.getElementById('root'));
