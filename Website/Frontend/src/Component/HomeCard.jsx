import React from 'react';

function HomeCard({
    title = '5 Must-Watch Films',
    genres = "Action, Romance, Comedy",
    imageSrc = '/home.png',
}) {
  return (
    <div className='w-52 bg-white overflow-hidden p-3'>
      <img 
        src={imageSrc}
        alt='Movie Thumbnail' 
        className='w-full h-40 object-cover rounded-md' 
      />
      <div className='mt-3'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='text-gray-500 text-sm'>{genres}</p>
      </div>
    </div>
  );
}

export default HomeCard;