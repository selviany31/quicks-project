import { useContext } from 'react';
import { deleteMessage } from '../../store/actions/inbox';
import { formatDate } from '../../utils/utils';
import Dropdown from '../button/dropdown';
import CustomSvg from '../svg/svg';
import { GlobalContext } from '../../store/store';

const MessageCard = ({ data, id, setEdit, setMessage, setReply }) => {
  const { inboxDispatch } = useContext(GlobalContext);
  return (
    <div className='max-w-[80%]'>
      <p
        className={`text-sm font-bold ${
          data?.participant === 'You'
            ? 'text-end text-darkInfo'
            : `text-start ${data?.color}`
        }`}
      >
        {data?.participant}
      </p>
      {data?.reply ? (
        <div
          className={`flex ${data?.participant === 'You' ? 'justify-end' : ''}`}
        >
          <div className='text-sm text-darkSecondary bg-[#F2F2F2] border border-lightSecondary p-2 rounded-md mb-1 w-fit'>
            <p>{data?.reply}</p>
          </div>
        </div>
      ) : (
        ''
      )}
      <div
        className={`flex ${data?.participant === 'You' ? 'justify-end' : ''}`}
      >
        <div
          className={data?.participant === 'You' ? 'order-first' : 'order-last'}
        >
          <Dropdown
            btn={
              <button className={`m-1 flex items-start `}>
                <CustomSvg icon='assets/icons/more.svg' />
              </button>
            }
            position={data?.participant === 'You' ? 'left-0' : 'right-0'}
            width='w-[126px]'
          >
            {data?.participant === 'You' ? (
              <>
                <button
                  className='p-2 border-b border-lightSecondary text-primary text-start hover:bg-primary hover:text-white hover:rounded-t-md'
                  onClick={() => {
                    setEdit({
                      id: data?.id,
                      time: data?.time,
                      reply: data?.reply,
                    });
                    setMessage(data?.message);
                  }}
                >
                  Edit
                </button>
                <button
                  className='p-2 text-danger text-start hover:bg-danger hover:text-white hover:rounded-b-md'
                  onClick={() => deleteMessage(inboxDispatch, id, data?.id)}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button className='p-2 border-b border-lightSecondary text-primary text-start hover:bg-primary hover:text-white hover:rounded-t-md'>
                  Share
                </button>
                <button
                  className='p-2 text-primary text-start hover:bg-primary hover:text-white hover:rounded-b-md'
                  onClick={() => {
                    setReply({
                      to: data?.participant,
                      message: data?.message,
                    });
                  }}
                >
                  Reply
                </button>
              </>
            )}
          </Dropdown>
        </div>
        <div
          className={`text-darkSecondary ${
            data?.participant === 'You' ? 'bg-lightInfo' : data?.bg_color
          } p-2 rounded-md`}
        >
          <p className='mb-1 text-sm'>{data?.message}</p>
          <div className='flex justify-between'>
            <p className='text-xs'>{formatDate(data?.time, 'hh:mm')}</p>
            {data?.isEdit === 1 ? <p className='text-xs italic'>Edited</p> : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
