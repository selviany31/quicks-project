import CircleBtn from '../button/circle-btn';
import { useEffect, useState } from 'react';
import CustomSvg from '../svg/svg';
import ChatCard from '../chats/chat';
import TaskCard from '../tasks/task';

const Layout = () => {
  const [expand, setExpand] = useState('opacity-0');
  const [show, setShow] = useState('');
  const [move, setMove] = useState('');
  const [btnArr, setBtnArr] = useState(['task', 'message']);

  const handleExpand = () => {
    if (expand === 'opacity-0') {
      return 'animate-slideIn opacity-0';
    } else if (expand === 'animate-slideIn opacity-0') {
      return 'animate-slideOut';
    } else if (expand === 'animate-slideOut') {
      return `animate-slideIn opacity-0`;
    }
  };

  useEffect(() => {
    if (show === 'task') {
      setBtnArr(['message', 'task']);
    } else {
      setBtnArr(['task', 'message']);
    }
  }, [show]);

  return (
    <div className='bg-[#333333] min-h-screen'>
      <div className='flex'>
        <div className='border-e border-[white] w-[285px] h-screen'></div>
        <div className='w-full'>
          <div className='bg-[#4F4F4F] w-full flex h-[58px] items-center px-6'>
            <CustomSvg
              icon='assets/icons/search.svg'
              styles='w-[16px] h-[16px]'
            />
            <input className='w-full bg-transparent focus:outline-none ml-3 text-[#fff]' />
          </div>
          <div className='fixed bottom-6 right-6'>
            <div className='mb-3'>
              {show === 'message' ? (
                <ChatCard show={show} />
              ) : (
                <TaskCard show={show} />
              )}
            </div>
            <div className='flex items-center justify-end'>
              <>
                {btnArr?.map((el, i) => (
                  <div
                    className={`${!move ? expand : ''} ${move} ml-5`}
                    style={{
                      '--delay': !show ? i * 0.25 + 's' : '',
                    }}
                  >
                    <CircleBtn
                      icon={`assets/icons/${el}.svg`}
                      onClick={() => {
                        setShow(el);
                        setMove('animate-moveRight');
                      }}
                      onClose={() => {
                        setShow('');
                        setMove('');
                      }}
                      bgStyle={show === 'message' ? 'bg-info' : 'bg-warning'}
                      isActive={show === el && 'active'}
                    />
                  </div>
                ))}
              </>
              <button
                onClick={() => setExpand(handleExpand)}
                className={`z-10 ml-5 ${
                  show ? 'w-0 z-0 ml-0 opacity-0' : 'animate-moveLeft'
                }`}
              >
                <CustomSvg
                  icon='assets/icons/quicks.svg'
                  styles='w-[68px] h-[68px]'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
