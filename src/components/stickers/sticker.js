const StickerCard = ({ label, size, styles }) => {
  const handleBgColor = () => {
    switch (label) {
      case 'Important ASAP':
        return 'bg-[#E5F1FF]';
      case 'Offline Meeting':
        return 'bg-[#FDCFA4]';
      case 'Virtual Meeting':
        return 'bg-[#F9E9C3]';
      case 'ASAP':
        return 'bg-[#AFEBDB]';
      case 'Client Related':
        return 'bg-[#CBF1C2]';
      case 'Self Task':
        return 'bg-[#CFCEF9]';
      case 'Appointments':
        return 'bg-[#F9E0FD]';
      case 'Court Related':
        return 'bg-[#9DD0ED]';
      default:
        break;
    }
  };
  return (
    <div
      className={`py-1.5 px-4 rounded-lg ${handleBgColor()} ${size} ${styles}`}
    >
      <p className='text-darkSecondary text-sm font-bold'>{label}</p>
    </div>
  );
};

export default StickerCard;
