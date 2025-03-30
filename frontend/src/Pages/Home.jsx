import React from 'react';
import HomeCard from '../Component/HomeCard';

function Home() {
  return (
    <div className='flex flex-col items-center justify-center p-6 px-21'>
      <div className='w-full mt-6 flex justify-center items-center '>
        <div className='w-[55%] h-full flex flex-col justify-center items-center'>
          <div className='text-5xl font-bold flex justify-start items-start text-start'>
            <p className=''>Discover top movie recommendations & enjoy watching them anytime!</p>
          </div>
          <p className=' flex w-full justify-start text-start items-start text-neutral-700 mt-6 text-lg'>
            Get started with your movie journey.
          </p>
          <div className='flex flex-col justify-start items-start w-full'>
          <button className='bg-gray-200 rounded-lg px-5 py-2 cursor-pointer mt-4'>Start Exploring</button>
          </div>
        </div>
        <div className='w-[45%] h-full flex justify-center items-center px-4'>
          <img className='w-[75%] h-auto object-cover' src='/home.png' alt='Movie Banner' />
        </div>
      </div>

      <div className='w-full flex justify-end mr-10 '>
        <span>Search and discover movies</span>
      </div>

      <div className='w-full flex justify-start mt-7'>
        <span className='font-bold text-xl mt-2'>Explore Top Movie Picks</span>
      </div>

      <div>
        <div className='grid grid-rows-1 grid-cols-5 gap-6 mt-6'>
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </div>
      </div>

    </div>
  );
}

export default Home;
