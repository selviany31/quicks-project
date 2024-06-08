const ModalCard = ({ children, paddingStyle = 'py-6 px-8', styles }) => {
  return (
    <div
      className={`bg-[white] ${paddingStyle} ${styles} rounded-sm w-[734px] h-[737px] relative opacity-0`}
      style={{
        '--delay': 0.25 + 's',
      }}
    >
      {children}
    </div>
  );
};

export default ModalCard;
