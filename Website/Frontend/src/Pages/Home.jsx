import React, { useEffect } from 'react';
import HomeCard from '../Component/HomeCard';
import { useNavigate } from 'react-router-dom';
import { HealthCheck } from '../Server/server.js';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await HealthCheck();
        // console.log('Server is healthy:', response);
      } catch (error) {
        console.error('Error checking server health:', error);
      }
    };
    checkHealth();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center p-4 sm:p-6 md:px-21'>
      <div className='w-full mt-6 flex flex-col md:flex-row justify-center items-center gap-6'>
        {/* Left Section */}
        <div className='w-full md:w-[55%] h-full flex flex-col justify-center items-start'>
          <div className='text-3xl sm:text-4xl md:text-5xl font-bold text-start'>
            <p>Discover top movie recommendations & enjoy watching them anytime!</p>
          </div>
          <p className='w-full text-start text-neutral-700 mt-4 sm:mt-6 text-base sm:text-lg'>
            Get started with your movie journey.
          </p>
          <div className='w-full flex justify-start mt-4'>
            <button
              className='bg-gray-200 rounded-lg px-4 py-2 text-sm sm:text-base cursor-pointer'
              onClick={() => navigate('/recommend')}
            >
              Start Exploring
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className='w-full md:w-[45%] h-full flex justify-center items-center px-2 sm:px-4'>
          <img
            className='w-[90%] sm:w-[75%] h-auto object-cover'
            src='/home.png'
            // src=''
            alt='Movie Banner'
          />
        </div>
      </div>

      {/* Subtitle Section */}
      <div className='w-full flex justify-end mr-4 sm:mr-10 mt-4 sm:mt-0'>
        <span className='text-sm sm:text-base'>Search and discover movies</span>
      </div>

      {/* Explore Section */}
      <div className='w-full flex justify-start mt-6 sm:mt-7'>
        <span className='font-bold text-lg sm:text-xl mt-2'>Explore Top Movie Picks</span>
      </div>

      {/* Movie Cards Grid */}
      <div className='mt-6 w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          <HomeCard
            title='Captain America: The First Avenger'
            imageSrc='https://m.media-amazon.com/images/M/MV5BNzUyM2YyY2MtNzNlMS00MWU5LTgxNjAtNzZlNmI2NjU2NDZlXkEyXkFqcGc@._V1_SX300.jpg'
            genres='Action, Adventure, Sci-Fi'
          />
          <HomeCard
            title='Open Season'
            genres='Animation, Adventure, Comedy'
            imageSrc='https://m.media-amazon.com/images/M/MV5BMTQwOTg2MjU0OV5BMl5BanBnXkFtZTcwMzIzNTQzMQ@@._V1_SX300.jpg'
          />
          <HomeCard
            title='Avengers: Infinity War'
            genres='Action, Adventure, Sci-Fi'
            imageSrc='https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg'
          />
          <HomeCard
            title='Whiplash'
            genres='Drama, Music'
            imageSrc='https://m.media-amazon.com/images/M/MV5BMDFjOWFkYzktYzhhMC00NmYyLTkwY2EtYjViMDhmNzg0OGFkXkEyXkFqcGc@._V1_SX300.jpg'
          />
          <HomeCard
            title='Ghost Rider: Spirit of Vengeance'
            genres='Action, Fantasy, Thriller'
            imageSrc='https://m.media-amazon.com/images/M/MV5BN2FmZGVlNTgtYTllNC00YmUzLTk5YmUtNWNhMzk3ZmE2NmQ0XkEyXkFqcGc@._V1_SX300.jpg'
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
