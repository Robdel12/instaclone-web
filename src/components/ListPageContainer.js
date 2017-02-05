import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dataset from 'impagination';

const PAGE_SIZE = 10;

class ListPageContainer extends React.Component {

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

        return _this.props.data.fetchMore({
          variables: {
            skip: skip,
            first: pageSize
          },
          updateQuery: () => {
            // This is a required method when using `fetchMore`.
            // You're supposed to use this to add the results to the data on
            // your component. But Impagination does that for us already.
            // So we just return here.
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

  /**
   * Based on scroll position determine which card is in the current
   * viewport. From there you can set the impagination readOffset
   * equal to the current visibile card.
   *
   * @method setCurrentReadOffset
   */
  setCurrentReadOffset = (currentItemIndex) => {
    this.state.dataset.setReadOffset(currentItemIndex);
  }

  render () {
    let childrenWithProps = React.cloneElement(this.props.children, {
      setCurrentReadOffset: this.setCurrentReadOffset,
      datasetState: this.state.datasetState
    });

    return childrenWithProps;
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

export default graphql(FeedQuery, {options: {variables: { skip: 0, first: PAGE_SIZE }}})(ListPageContainer);
