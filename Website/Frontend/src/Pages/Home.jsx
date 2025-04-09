import React from 'react';
import HomeCard from '../Component/HomeCard';
import {useNavigate} from 'react-router-dom';

const defaultMovies = [

]

function Home() {

  const navigate = useNavigate();

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
          <button className='bg-gray-200 rounded-lg px-5 py-2 cursor-pointer mt-4'
          onClick={()=>navigate('/recommend')}>Start Exploring</button>
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
          <HomeCard title='Captain America: The First Avenger' imageSrc='https://m.media-amazon.com/images/M/MV5BNzUyM2YyY2MtNzNlMS00MWU5LTgxNjAtNzZlNmI2NjU2NDZlXkEyXkFqcGc@._V1_SX300.jpg' genres='Action, Adventure, Sci-Fi' />
          <HomeCard title='Open Season' genres='Animation, Adventure, Comedy' imageSrc="https://m.media-amazon.com/images/M/MV5BMTQwOTg2MjU0OV5BMl5BanBnXkFtZTcwMzIzNTQzMQ@@._V1_SX300.jpg" />
          <HomeCard title='Avengers: Infinity War' genres='Action, Adventure, Sci-Fi' imageSrc="https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"/>
          <HomeCard title='Whiplash' genres='Drama, Music' imageSrc="https://m.media-amazon.com/images/M/MV5BMDFjOWFkYzktYzhhMC00NmYyLTkwY2EtYjViMDhmNzg0OGFkXkEyXkFqcGc@._V1_SX300.jpg" />
          <HomeCard title='Ghost Rider: Spirit of Vengeance' genres='Action, Fantasy, Thriller' imageSrc="https://m.media-amazon.com/images/M/MV5BN2FmZGVlNTgtYTllNC00YmUzLTk5YmUtNWNhMzk3ZmE2NmQ0XkEyXkFqcGc@._V1_SX300.jpg"/>
        </div>
      </div>

    </div>
  );
}

export default Home;
