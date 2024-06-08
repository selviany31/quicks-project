import CustomSvg from '../svg/svg';

const CircleBtn = ({ icon, isActive, onClick, onClose, bgStyle }) => {
  return (
    <div className='relative'>
      {isActive === 'active' && (
        <button
          className='w-[60px] h-[60px] bg-darkSecondary rounded-full'
          onClick={onClose}
        ></button>
      )}
      <button
        className={`${
          isActive === 'active'
            ? `${bgStyle} absolute top-0 left-3`
            : 'bg-[#F2F2F2]'
        } w-[60px] h-[60px] rounded-full flex justify-center items-center`}
        onClick={onClick}
      >
        <CustomSvg icon={icon} isActive={isActive} />
      </button>
    </div>
  );
};

export default CircleBtn;
