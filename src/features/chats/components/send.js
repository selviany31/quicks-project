import { useContext } from 'react';
import CustomSvg from '../../../components/svg/svg';
import { GlobalContext } from '../../../store/store';
import { addMessage, editMessage } from '../../../store/actions/inbox';
import { uid } from '../../../utils/utils';

const SendComponent = ({
  reply,
  setReply,
  id,
  edit,
  setEdit,
  message,
  setMessage,
  setScroll,
}) => {
  const { inboxDispatch } = useContext(GlobalContext);

  const onSubmit = () => {
    if (edit) {
      editMessage(inboxDispatch, id, edit.id, {
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
      addMessage(inboxDispatch, id, {
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
    setScroll(true);
  };
  return (
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
  );
};

export default SendComponent;
