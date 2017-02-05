import React from 'react';
import Photo from './Photo';

// Fake loading post for when the data is still loading
const LoadingPost = (props) => {
  let photo = {
    imageUrl: '//:0',
    description: 'Loading...',
    createdAt: new Date(),
  };

  let user = {
    profileImage: '//:0',
    name: 'Loading...',
    displayName: 'Loading...',
  };

  return <Photo photo={photo} user={user} />;
};

export default LoadingPost;
