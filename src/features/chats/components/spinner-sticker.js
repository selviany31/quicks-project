import Spinner from '../../../components/spinner/spinner';

const SpinnerSticker = () => {
  return (
    <div className='flex items-center bg-lightPrimary p-3 rounded-md mb-2'>
      <Spinner
        width='w-[20px]'
        height='h-[20px]'
        halfHeight='h-[10px]'
        border='border-[3px]'
        color='border-primary'
      />
      <p className='ml-4 text-xs font-bold text-darkSecondary'>
        Please wait while we connect you with one of our team ...
      </p>
    </div>
  );
};

export default SpinnerSticker;
