import React from 'react';
import Moment from 'react-moment';

export default class Photo extends React.Component {

  static propTypes = {
    photo: React.PropTypes.object,
    user: React.PropTypes.object,
  }

  render () {
    let photo = this.props.photo;
    let user = this.props.user;

    return (
      <div className="card" style={{margin: "20px 0"}}>
        <div className="card-image" style={{
               backgroundImage: `url(${photo.imageUrl})`,
               backgroundSize: 'contain',
               paddingBottom: '75%',
             }}>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image" style={{height: "40px", width: "40px"}}>
                <img src={user.profileImage} alt={user.name} />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{user.name}</p>
              <p className="subtitle is-6">@{user.displayName}</p>
            </div>
          </div>
          <div className="content">
            {photo.description}
            <br />
            <small>
              <Moment format="h:mm A - MMM Do, YYYY">{photo.createdAt}</Moment>
            </small>
          </div>
        </div>
      </div>
    );
  }
}
