
import { assets } from '../assets/assest';

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#e4e2e2]">
      <div className="w-16 h-16 border-4 border-t-4 border-[#FFBBBB] border-solid rounded-full animate-spin">
       <div className='flex items-center justify-center'>
        <img className='w-12' src={assets.logo_2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
