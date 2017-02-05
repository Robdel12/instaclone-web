import React from 'react';
import ListPageContainer from './ListPageContainer';
import ListPageView from './presentational/ListPageView';

class ListPage extends React.Component {
  render () {
    return (
      <ListPageContainer>
        <ListPageView />
      </ListPageContainer>
    );
  }
}

export default ListPage;
