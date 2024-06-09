import { useContext, useEffect, useState } from 'react';
import { getDataInbox, searchInbox } from '../../store/actions/inbox';
import { GlobalContext } from '../../store/store';
import { formatDate } from '../../utils/utils';
import CustomSvg from '../../components/svg/svg';
import Spinner from '../../components/spinner/spinner';
import IconProfile from './components/icon-profile';

const ChatList = ({ setShowDetail, setDetail }) => {
  const { inboxState, inboxDispatch } = useContext(GlobalContext);
  const { data, filter, loading } = inboxState;

  const [currentData, setCurrentData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (isSearch) {
      setCurrentData(filter);
    } else {
      setCurrentData(data);
    }
  }, [data, filter, isSearch]);

  useEffect(() => {
    if (!data?.length) {
      getDataInbox(inboxDispatch);
    }
  }, [inboxDispatch, data?.length]);

  return (
    <div className='px-8 h-full'>
      <div className='flex border border-[#828282] rounded-md px-3 items-center py-2.5'>
        <input
          placeholder='Search'
          className='w-full focus:outline-none'
          onChange={(e) => {
            if (e.target.value) {
              searchInbox(inboxDispatch, e.target.value);
              setIsSearch(true);
            } else {
              setIsSearch(false);
            }
          }}
        />
        <CustomSvg
          icon='assets/icons/search.svg'
          isActive='dark'
          styles='w-3 h-3'
        />
      </div>
      <div className='h-[90%]'>
        {loading ? (
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
          currentData?.map((item, i) => (
            <div key={i}>
              <button
                key={i}
                className='py-[1.375rem] flex justify-between items-center w-full'
                onClick={() => {
                  setShowDetail(true);
                  setDetail(item?.id);
                }}
              >
                <div className='flex w-full'>
                  <IconProfile
                    isGroup={item?.isGroup === 1}
                    label={item?.title}
                  />
                  <div className='w-full'>
                    <div className='flex items-start'>
                      <p className='text-primary font-bold text-md mr-5 max-w-[70%] text-start'>
                        {item?.title}
                      </p>
                      <p className='text-sm text-darkSecondary'>
                        {formatDate(item?.updatedChat?.time, 'mmm dd, yyyy')}
                      </p>
                    </div>
                    <div className='text-darkSecondary text-start'>
                      {item?.isGroup === 1 && (
                        <p className='text-sm font-bold'>
                          {item?.updatedChat?.participant}:
                        </p>
                      )}
                      <p className='text-xs'>{item?.updatedChat?.message}</p>
                    </div>
                  </div>
                </div>
                {item?.updatedChat?.isRead === 0 && (
                  <div className='w-2.5 h-2.5 bg-danger rounded-full flex justify-end'></div>
                )}
              </button>
              <hr
                className={`border-secondary ${
                  data?.length - 1 === i ? 'hidden' : ''
                }`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
