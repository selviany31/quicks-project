import { useContext } from 'react';
import { formatDay } from '../../../utils/utils';
import MessageCard from './message';
import { GlobalContext } from '../../../store/store';

const ListComponent = ({ id, setEdit, setMessage, setReply }) => {
  const { inboxState } = useContext(GlobalContext);
  const { chats } = inboxState;

  const selectedChat = chats?.filter((el) => el.inboxId === id)?.[0];
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

  return (
    <>
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
                      id={id}
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
                    data={el?.participant === 'You' ? el : renderColor(el?.id)}
                    id={id}
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
    </>
  );
};

export default ListComponent;
