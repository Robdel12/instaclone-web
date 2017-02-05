import React, { Component } from 'react';
import Infinite from 'react-infinite';
import Photo from '../presentational/Photo';
import LoadingPost from '../presentational/LoadingPost';

const ITEM_HEIGHT = 600;
const HEADER_HEIGHT = 80;

class ListPageView extends Component {
  setCurrentReadOffset = (event) => {
    let currentItemIndex = Math.ceil((window.scrollY - HEADER_HEIGHT) / ITEM_HEIGHT);

    this.props.setCurrentReadOffset(currentItemIndex);
  }

  render() {
    return (
      <div style={{maxWidth: "600px", margin: "0 auto", padding: "20px 0"}}>
        <Infinite elementHeight={ITEM_HEIGHT} handleScroll={this.setCurrentReadOffset} useWindowAsScrollContainer>
          {this.props.datasetState.map(record => {
            if (record.isPending && !record.isSettled) {
              return <LoadingPost key={Math.random()} />;
            }

            return <Photo key={record.content.id} photo={record.content} user={record.content.user} />;
          })}
        </Infinite>
      </div>
    );
  }
}

export default ListPageView;
