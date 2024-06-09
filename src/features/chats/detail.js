import { useContext, useEffect, useRef, useState } from 'react';
import CustomSvg from '../../components/svg/svg';
import { getDataChats } from '../../store/actions/inbox';
import { GlobalContext } from '../../store/store';
import Spinner from '../../components/spinner/spinner';
import ListComponent from './components/list-component';
import SpinnerSticker from './components/spinner-sticker';
import NewSticker from './components/new-sticker';
import SendComponent from './components/send';

const ChatDetail = ({ setShowDetail, data }) => {
  const { inboxState, inboxDispatch } = useContext(GlobalContext);
  const { chats, loading } = inboxState;

  const selectedChat = chats?.filter((el) => el.inboxId === data)?.[0];

  // filtering array when isRead = 0
  const groupNew = selectedChat?.messages?.filter((el) => el?.isRead === 0);

  const filterUser = selectedChat?.messages?.filter(
    (el) => el.participant !== 'You'
  );

  const handleScroll = (e) => {
    const position = e.target.scrollHeight - e.target.scrollTop;
    const bottom = position <= e.target.clientHeight + 20;
    if (bottom) {
      setShowNew(false);
    }
  };

  const [message, setMessage] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [edit, setEdit] = useState(null);
  const [reply, setReply] = useState(null);
  const [scroll, setScroll] = useState(false);

  const listRef = useRef();

  useEffect(() => {
    if (scroll) {
      listRef?.current?.lastElementChild?.scrollIntoView();
      setScroll(false);
    }
  }, [scroll]);

  useEffect(() => {
    setShowNew(groupNew?.length ? true : false);
  }, [groupNew?.length]);

  useEffect(() => {
    if (!selectedChat) {
      getDataChats(inboxDispatch, data);
    }
  }, [data, inboxDispatch, selectedChat]);

  return loading ? (
    <div className='h-full w-full flex justify-center items-center'>
      <Spinner
        width='w-[84px]'
        height='h-[84px]'
        halfHeight='h-[42px]'
        containerSize='150'
        text='Loading Chats...'
      />
    </div>
  ) : (
    <div className='h-full'>
      <div className='flex justify-between items-center px-8 pb-4'>
        <div className='flex items-center'>
          <button onClick={setShowDetail}>
            <CustomSvg icon='assets/icons/arrow-back.svg' />
          </button>
          <div className='ml-5'>
            <p className='text-primary font-bold text-md'>
              {selectedChat?.title}
            </p>
            <p className='text-darkSecondary text-xs'>
              {selectedChat?.participants}
            </p>
          </div>
        </div>
        <CustomSvg icon='assets/icons/close.svg' />
      </div>
      <hr className='border-[#BDBDBD]' />
      <div
        className='pl-8 pr-4 mr-2 py-3 h-[85%] overflow-y-auto'
        onScroll={handleScroll}
        ref={listRef}
      >
        <ListComponent
          id={data}
          setEdit={setEdit}
          setMessage={setMessage}
          setReply={setReply}
        />
      </div>
      <div className='px-8 absolute bottom-6 w-full'>
        {selectedChat?.participants === '' && filterUser?.length < 2 ? (
          <SpinnerSticker />
        ) : (
          ''
        )}
        {showNew ? <NewSticker /> : ''}
        <SendComponent
          reply={reply}
          setReply={setReply}
          id={data}
          edit={edit}
          setEdit={setEdit}
          message={message}
          setMessage={setMessage}
          setScroll={setScroll}
        />
      </div>
    </div>
  );
};

export default ChatDetail;
