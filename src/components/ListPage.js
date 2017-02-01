import React from 'react';
import Photo from '../components/presentational/Photo';
import Loading from './presentational/Loading';
import Infinite from 'react-infinite';
import Dataset from 'impagination';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const ITEM_HEIGHT = 600;
const HEADER_HEIGHT = 80;
const PAGE_SIZE = 2;

class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  state = {
    dataset: null,
    datasetState: null,
  }

  setupImpagination() {
    let _this = this;

    let dataset = new Dataset({
      pageSize: PAGE_SIZE,
      loadHorizon: PAGE_SIZE * 2,

      // Anytime there's a new state emitted, we want to set that on
      // the componets local state.
      observe(datasetState) {
        _this.setState({datasetState});
      },

      // Where to fetch the data from.
      fetch(pageOffset, pageSize, stats) {
        let skip = pageOffset * pageSize;

        console.group('skip + pagesize');
        console.log('skip:', skip);
        console.log('pageSize:', pageSize);
        console.groupEnd();

        return _this.props.data.fetchMore({
          variables: {
            skip: skip,
            first: pageSize
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            return;
          }
        }).then(response => response.data.allPhotos);
      }
    });

    dataset.setReadOffset(0);
    this.setState({dataset});
  }

  componentWillMount() {
    this.setupImpagination();
  }

  setCurrentReadOffset = (event) => {
    let currentItemIndex = Math.ceil((window.scrollY - HEADER_HEIGHT) / ITEM_HEIGHT);

    this.state.dataset.setReadOffset(currentItemIndex);
  }

  render () {
    if (this.props.data.loading) {
      return <Loading />;
    }
    return (
      <div style={{maxWidth: "600px", margin: "0 auto", padding: "20px 0"}}>
        <Infinite elementHeight={ITEM_HEIGHT} handleScroll={this.setCurrentReadOffset} useWindowAsScrollContainer>
          {this.state.datasetState.map(record => {
            if ((record.isPending && !record.isSettled)) {
              return <div key={Math.random()} style={{height: "600px"}}>Loading...</div>;
            }

            return (<Photo key={record.content.id} photo={record.content} user={record.content.user} />);
          })}
        </Infinite>
      </div>
    );
  }
}

const FeedQuery = gql`query($skip: Int!, $first: Int!) {
  allPhotos(orderBy: createdAt_DESC, first: $first, skip: $skip) {
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

export default graphql(FeedQuery, {options: {variables: { skip: 0, first: PAGE_SIZE }}})(ListPage);
