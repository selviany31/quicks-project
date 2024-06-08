import { useContext, useEffect, useState } from 'react';
import { formatDay, uid } from '../../utils/utils';
import CustomSvg from '../svg/svg';
import MessageCard from './message';
import {
  addMessage,
  editMessage,
  getDataChats,
} from '../../store/actions/inbox';
import { GlobalContext } from '../../store/store';
import Spinner from '../spinner/spinner';

const ChatDetail = ({ setShowDetail, data }) => {
  const { inboxState, inboxDispatch } = useContext(GlobalContext);
  const { chats, loading } = inboxState;

  const selectedChat = chats?.filter((el) => el.inboxId === data)?.[0];

  // grouping array by selected key
  const groupBy = function (items, key) {
    return items?.reduce(function (rv, x) {
      (rv[x[key].slice(0, 15)] = rv[x[key]?.slice(0, 15)] || []).push(x);
      return rv;
    }, {});
  };

  // grouping array by time key
  const groupByTime = groupBy(selectedChat?.messages, 'time');

  // get participant key of object
  const groupKey = groupByTime ? Object.keys(groupByTime) : [];

  // filtering array when isRead = 0
  const groupNew = selectedChat?.messages?.filter((el) => el?.isRead === 0);

  const filterUser = selectedChat?.messages?.filter(
    (el) => el.participant !== 'You'
  );

  // put color value by participant
  const renderColor = (value) => {
    const bgColor = ['bg-lightWarning', 'bg-lightSuccess'];
    const color = ['text-darkWarning', 'text-darkSuccess'];

    const groupByUser = groupBy(filterUser, 'participant');

    const groupByKey = groupByUser ? Object.keys(groupByUser) : [];

    const putColor = groupByKey?.map((el, i) =>
      groupByUser?.[el]?.map((el) => {
        return {
          ...el,
          bg_color: bgColor[i % bgColor.length],
          color: color[i % color.length],
        };
      })
    );

    const mergeArr = [...new Set([].concat(...putColor))];

    return mergeArr.filter((el) => el.id === value)[0];
  };

  const handleScroll = (e) => {
    const bottom =
      parseInt(e.target.scrollHeight - e.target.scrollTop + 1) ===
      e.target.clientHeight;
    if (bottom) {
      setShowNew(false);
    }
  };

  const [message, setMessage] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [edit, setEdit] = useState(null);
  const [reply, setReply] = useState(null);

  const onSubmit = () => {
    if (edit) {
      editMessage(inboxDispatch, data, edit.id, {
        id: edit,
        isRead: 1,
        message: message,
        participant: 'You',
        reply: edit?.reply,
        isEdit: 1,
        time: edit.time,
      });
      setMessage('');
      setEdit(null);
    } else {
      addMessage(inboxDispatch, data, {
        id: uid(),
        isRead: 1,
        message: message,
        participant: 'You',
        reply: reply?.message,
        time: new Date().toString(),
      });
      setMessage('');
      setReply(null);
    }
  };

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
      >
        {groupKey?.map((el, i) => (
          <>
            <div className='flex justify-between items-center mb-2 mt-4'>
              <hr className='border-darkSecondary w-1/3' />
              <p className='font-bold text-darkSecondary'>{formatDay(el)}</p>
              <hr className='border-darkSecondary w-1/3' />
            </div>
            {groupByTime?.[`${el}`]?.map((el, i) => (
              <>
                {el?.isRead === 0 ? (
                  <>
                    <div className='flex justify-between items-center mb-2 mt-4'>
                      <hr className='border-danger w-[40%]' />
                      <p className='font-bold text-danger'>New Message</p>
                      <hr className='border-danger w-[40%]' />
                    </div>
                    <div
                      key={i}
                      className={`flex mb-2.5 ${
                        el?.participant === 'You' ? 'justify-end' : ''
                      }`}
                    >
                      <MessageCard
                        data={
                          el?.participant === 'You' ? el : renderColor(el?.id)
                        }
                        id={data}
                        setEdit={setEdit}
                        setMessage={setMessage}
                        setReply={setReply}
                      />
                    </div>
                  </>
                ) : (
                  <div
                    key={i}
                    className={`flex mb-2.5 ${
                      el?.participant === 'You' ? 'justify-end' : ''
                    }`}
                  >
                    <MessageCard
                      data={
                        el?.participant === 'You' ? el : renderColor(el?.id)
                      }
                      id={data}
                      setEdit={setEdit}
                      setMessage={setMessage}
                      setReply={setReply}
                    />
                  </div>
                )}
              </>
            ))}
          </>
        ))}
      </div>
      <div className='px-8 absolute bottom-6 w-full'>
        {selectedChat?.participants === '' && filterUser?.length < 2 ? (
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
        ) : (
          ''
        )}
        {showNew ? (
          <div className='flex justify-center mb-1'>
            <div className='bg-lightPrimary p-2 text-primary font-bold rounded-md w-fit'>
              <p>New Message</p>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className='flex'>
          <div className='w-full mr-2'>
            {reply ? (
              <div className='text-sm text-darkSecondary bg-[#F2F2F2] border border-b-0 border-secondary p-2 rounded-t-md tetx-darkSecondary'>
                <div className='flex justify-between items-center'>
                  <p className='font-bold mb-1'>
                    Replying to <span>{reply?.to}</span>
                  </p>
                  <button onClick={() => setReply('')}>
                    <CustomSvg icon='assets/icons/close.svg' styles='w-3 h-3' />
                  </button>
                </div>
                <p>{reply?.message}</p>
              </div>
            ) : (
              ''
            )}
            <div
              className={`border border-secondary ${
                reply ? 'rounded-b-md' : 'rounded-md'
              } px-4 py-2 w-full`}
            >
              <input
                value={message}
                className='focus:outline-none w-full'
                placeholder='Type a new message'
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSubmit();
                  }
                }}
              />
            </div>
          </div>
          <div className='flex items-end'>
            <button
              className='bg-primary text-white px-4 rounded-md py-2'
              onClick={onSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
