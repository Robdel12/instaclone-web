import React from 'react';

const Loading = (props) => {
  return (
      <div className="is-fullwidth" style={{textAlign: "center", padding: "40px 0"}}>
      <span className="icon is-large">
      <i className="fa fa-circle-o-notch fa-spin"></i>
      </span>
      </div>
  );
};

export default Loading;
