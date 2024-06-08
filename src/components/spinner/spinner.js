const Spinner = ({
  width,
  height,
  halfHeight,
  containerSize,
  text,
  border = 'border-8',
  color = 'border-[#C4C4C4]',
  // darkColor = 'border-[#F8F8F8]',
}) => {
  return (
    <div className={`w-[${containerSize}px]`}>
      <div className='w-full flex justify-center'>
        <div className={`relative ${height} ${width} animate-spin`}>
          <div
            className={`${height} ${width} mr-3 ${border} ${color} rounded-full`}
          ></div>
          <div
            className={`${halfHeight}
            )}px] ${width} mr-3 ${border} border-[#F8F8F8] rounded-t-full border-b-0 absolute top-0`}
          ></div>
        </div>
      </div>
      {text && (
        <p className='text-darkSecondary font-bold mt-3 text-center'>{text}</p>
      )}
    </div>
  );
};

export default Spinner;
