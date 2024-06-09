import { useContext, useEffect, useState } from 'react';
import ModalCard from '../../components/modal/modal';
import ChatDetail from './detail';
import ChatList from './list';
import { GlobalContext } from '../../store/store';
import { readMessage } from '../../store/actions/inbox';

const ChatCard = ({ show }) => {
  const { inboxState, inboxDispatch } = useContext(GlobalContext);
  const { chats } = inboxState;

  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    if (chats?.length && !showDetail) {
      readMessage(inboxDispatch, detail);
    }
  }, [inboxDispatch, chats?.length, showDetail, detail]);

  return (
    <ModalCard
      paddingStyle='py-6 px-0'
      styles={
        show === 'message' ? 'animate-slideUp opacity-0' : 'animate-slideDown'
      }
    >
      {showDetail ? (
        <ChatDetail setShowDetail={() => setShowDetail(false)} data={detail} />
      ) : (
        <ChatList setShowDetail={setShowDetail} setDetail={setDetail} />
      )}
    </ModalCard>
  );
};

export default ChatCard;
