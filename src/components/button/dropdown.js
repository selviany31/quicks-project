import { useState } from 'react';

const Dropdown = ({ btn, children, width, position, styles }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={`relative ${styles}`} onMouseLeave={() => setShow(false)}>
      <button onClick={() => setShow(!show)}>{btn}</button>
      {show && (
        <div
          className={`absolute z-10 bg-white border border-secondary rounded-md grid ${width} ${position}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
