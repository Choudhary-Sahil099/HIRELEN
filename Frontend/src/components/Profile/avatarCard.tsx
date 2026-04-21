import Avatar from '../../assets/Avatar.png';
import { Share2, UserRoundPen,Dot } from 'lucide-react';
const AvatarCard = () => {
  return (
    <div className="w-full p-8 flex bg-white rounded-xl gap-5 relative">
        <button className='absolute top-9 right-9 flex gap-2 items-center'>Edit <UserRoundPen size={18}/></button>
     <div className='bg-gray-200 p-1 rounded-xl'>
        <img src={Avatar} className='w-45 h-45 rounded-xl shrink-0' />
     </div>
     <div className='flex flex-col gap-4 justify-center'>
        <div className='flex gap-4'>
            <h1 className='text-3xl font-semibold text-teal-900'>Sahil Choudhary</h1>
            <p className='bg-teal-900 px-2 py-1 rounded-xl text-white font-semibold'>Grand Master</p>
            <Share2 className='border border-gray-400 p-1 rounded-lg' size={30}/>
        </div>
        <div className='text-lg '>
            <p>Distinguished software architect and algorithm enthusiast.<br/> Specializing in high-performance computing and complex<br/> data structures.</p>
        </div>
        <div className='flex gap-7'>
            <h1 className='flex gap-1'><Dot/><span className='font-semibold'>8</span>Followers</h1>
            <h1 className='flex gap-1'><Dot/><span className='font-semibold'>12</span>Following</h1>
        </div>
     </div>
     <div className='absolute bottom-9 right-9 flex flex-col'>
        <p className='text-[12px] text-center'>ELO RATING</p>
        <h2 className='text-3xl font-semibold inter text-teal-900'>2,840</h2>
     </div>
    </div>
  )
}

export default AvatarCard
