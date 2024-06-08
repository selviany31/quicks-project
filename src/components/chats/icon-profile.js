import CustomSvg from '../svg/svg';

const IconProfile = ({ isGroup, label }) => {
  const handleLabel = () => {
    const result = label?.split('').shift();
    return result;
  };

  return isGroup ? (
    <div className='relative w-[51px] mr-5'>
      <div className='bg-lightSecondary p-[11px] w-fit rounded-full'>
        <CustomSvg
          icon='assets/icons/person.svg'
          isActive='dark'
          styles='w-3 h-3'
        />
      </div>
      <div className='bg-primary p-[11px] w-fit rounded-full absolute top-0 left-4'>
        <CustomSvg
          icon='assets/icons/person.svg'
          isActive='active'
          styles='w-3 h-3'
        />
      </div>
    </div>
  ) : (
    <div className='w-[51px] mr-5 flex justify-center'>
      <div className='bg-primary px-[14px] py-[8px] rounded-full h-fit w-fit'>
        <p className='text-white text-sm uppercase'>{handleLabel()}</p>
      </div>
    </div>
  );
};

export default IconProfile;
