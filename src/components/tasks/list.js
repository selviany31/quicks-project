import { useContext, useState } from 'react';
import CustomSvg from '../svg/svg';
import DatePicker from 'react-multi-date-picker';
import './task.css';
import { formatDate, getDaysDiff, uid } from '../../utils/utils';
import Dropdown from '../button/dropdown';
import {
  addBookmark,
  addTask,
  deleteTask,
  editTask,
} from '../../store/actions/task';
import { GlobalContext } from '../../store/store';
import StickerCard from '../stickers/sticker';

const TaskList = ({ data, onDelete }) => {
  const { taskDispatch, taskState } = useContext(GlobalContext);
  const [title, setTitle] = useState(data?.title ? false : true);
  const [desc, setDesc] = useState(false);
  const [expand, setExpand] = useState(data?.done === 1 ? true : false);
  const [taskData, setTaskData] = useState(
    data
      ? data
      : {
          id: '',
          title: '',
          date: '',
          desc: '',
          bookmark: [],
          done: 0,
        }
  );
  console.log(
    data
      ? data
      : {
          id: '',
          title: '',
          date: '',
          desc: '',
          bookmark: [],
          done: 0,
        }
  );

  return (
    <>
      <div className='py-[22px] text-darkSecondary'>
        <div className='flex items-center'>
          <button
            onClick={() => {
              if (data) {
                console.log(taskData.done, 'check');
                setTaskData({
                  ...taskData,
                  done: taskData?.done === 1 ? 0 : 1,
                });
                editTask(taskDispatch, {
                  ...taskData,
                  done: taskData?.done === 1 ? 0 : 1,
                });
              }
            }}
          >
            <CustomSvg
              icon={`assets/icons/${
                data?.done === 1 ? 'checkbox' : 'checkbox-blank'
              }.svg`}
              styles='w-[18px] h-[18px]'
            />
          </button>
          <div className='flex justify-between items-start w-full ml-4'>
            <div className='w-[60%]'>
              {title ? (
                <div className='border border-secondary w-full py-1 px-2 rounded-md'>
                  <input
                    type='text'
                    value={taskData?.title}
                    className='focus:outline-none w-full text-sm placeholder-darkSecondary'
                    placeholder='Type Task Title'
                    onChange={(e) =>
                      setTaskData({ ...taskData, title: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setTitle(!title);
                        setTaskData({ ...taskData, title: e.target.value });
                        if (data) {
                          editTask(taskDispatch, {
                            ...taskData,
                            title: e.target.value,
                          });
                        } else {
                          addTask(taskDispatch, {
                            ...taskData,
                            id: uid(),
                            title: e.target.value,
                          });
                        }
                        onDelete();
                      }
                    }}
                  />
                </div>
              ) : (
                <p
                  className={`font-bold cursor-pointer ${
                    data?.done === 1 ? 'line-through text-secondary' : ''
                  }`}
                  onClick={() => (data?.done === 1 ? '' : setTitle(!title))}
                >
                  {data?.title}
                </p>
              )}
            </div>
            <div className='flex items-center text-sm gap-4'>
              {data?.done === 0 && (
                <p className='text-danger'>
                  {data?.date ? getDaysDiff(data?.date) : ''}
                </p>
              )}
              <p>{formatDate(data?.date, 'mm/dd/yyyy')}</p>
              <button onClick={() => setExpand(!expand)}>
                <CustomSvg
                  icon={`assets/icons/arrow-${expand ? 'down' : 'up'}.svg`}
                  styles='w-[10px] h-[10px]'
                />
              </button>
              <Dropdown
                btn={
                  <CustomSvg
                    icon='assets/icons/more.svg'
                    styles='w-[14px] h-[14px]'
                  />
                }
                width='w-[126px]'
                position='right-0'
              >
                <button
                  className='p-2 font-bold text-danger hover:bg-danger hover:text-white hover:rounded-md w-full text-start'
                  onClick={() => {
                    deleteTask(taskDispatch, data?.id);
                    onDelete();
                  }}
                >
                  Delete
                </button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className={`${expand ? '' : 'grid gap-y-3'}`}>
          <div
            className={`ml-8 flex items-center ${
              expand
                ? 'animate-moveUp opacity-0 h-0 mt-0'
                : 'animate-moveDown h-auto mt-3'
            }`}
            style={{
              '--delay': 0.25 + 's',
            }}
          >
            <CustomSvg
              icon='assets/icons/clock.svg'
              isActive={data?.date ? 'primary' : ''}
            />
            <div className='ml-4 flex items-center border border-secondary py-1 px-2 rounded-md text-sm'>
              <DatePicker
                placeholder='Set Date'
                value={formatDate(taskData?.date, 'mm/dd/yyyy')}
                disabled={taskData?.done === 1}
                onChange={(e) => {
                  setTaskData({
                    ...taskData,
                    date: new Date(e).toString(),
                  });
                  if (data) {
                    editTask(taskDispatch, {
                      ...taskData,
                      date: new Date(e).toString(),
                    });
                  } else {
                    addTask(taskDispatch, {
                      ...taskData,
                      id: uid(),
                      date: new Date(e).toString(),
                    });
                  }
                  onDelete();
                }}
                format='DD/MM/YYYY'
                style={{
                  borderTopRightRadius: '0',
                  borderBottomRightRadius: '0',
                }}
                containerStyle={{
                  flex: '1',
                }}
                inputClass='border-0 placeholder-darkSecondary focus:outline-none'
                weekDays={['S', 'M', 'T', 'W', 'Th', 'F', 'S']}
                weekStartDayIndex={1}
              />
              <CustomSvg icon='assets/icons/calendar.svg' />
            </div>
          </div>
          <div
            className={`ml-8 flex ${
              expand
                ? 'animate-moveUp opacity-0 h-0'
                : 'animate-moveDown h-auto'
            }`}
            style={{
              '--delay': 0.5 + 's',
            }}
          >
            <CustomSvg
              icon='assets/icons/pencil.svg'
              isActive={data?.desc ? 'primary' : ''}
            />
            <div className='ml-5 text-xs w-[90%]'>
              {desc ? (
                <div className='border border-lightSecondary py-1 px-2 rounded-md'>
                  <textarea
                    value={taskData?.desc}
                    className='focus:outline-none w-full'
                    onChange={(e) =>
                      setTaskData({ ...taskData, desc: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setDesc(!desc);
                        setTaskData({ ...taskData, desc: e.target.value });
                        if (data) {
                          editTask(taskDispatch, {
                            ...taskData,
                            desc: e.target.value,
                          });
                        } else {
                          addTask(taskDispatch, {
                            ...taskData,
                            id: uid(),
                            desc: e.target.value,
                          });
                        }
                        onDelete();
                      }
                    }}
                  />
                </div>
              ) : (
                <p
                  className='cursor-pointer'
                  onClick={() => (taskData?.done === 1 ? '' : setDesc(!desc))}
                >
                  {data?.desc ? data?.desc : 'No Description'}
                </p>
              )}
            </div>
          </div>
          <div
            className={`mx-4 flex items-center bg-[#F9F9F9] py-2 rounded-md ${
              expand
                ? 'animate-moveUp opacity-0 h-0 hidden'
                : 'animate-moveDown h-[49px]'
            }`}
            style={{
              '--delay': 0.75 + 's',
            }}
          >
            <div className='ml-4 flex items-center'>
              <Dropdown
                btn={
                  <CustomSvg
                    icon='assets/icons/bookmark.svg'
                    isActive={data?.bookmark?.length ? 'primary' : ''}
                    styles='w-[19px] h-[20px]'
                  />
                }
                // styles='flex'
              >
                <div className='p-3 grid gap-y-2'>
                  <button
                    className='text-start'
                    onClick={() =>
                      addBookmark(taskDispatch, data?.id, 'Important ASAP')
                    }
                  >
                    <StickerCard label='Important ASAP' size='w-[246px]' />
                  </button>
                  <button
                    className='text-start'
                    onClick={() =>
                      addBookmark(taskDispatch, data?.id, 'Offline Meeting')
                    }
                  >
                    <StickerCard label='Offline Meeting' size='w-[246px]' />
                  </button>
                  <button
                    className='text-start'
                    onClick={() =>
                      addBookmark(taskDispatch, data?.id, 'Virtual Meeting')
                    }
                  >
                    <StickerCard label='Virtual Meeting' size='w-[246px]' />
                  </button>
                  <button
                    className='text-start'
                    onClick={() => addBookmark(taskDispatch, data?.id, 'ASAP')}
                  >
                    <StickerCard label='ASAP' size='w-[246px]' />
                  </button>
                  <button
                    className='text-start'
                    onClick={() =>
                      addBookmark(taskDispatch, data?.id, 'Client Related')
                    }
                  >
                    <StickerCard label='Client Related' size='w-[246px]' />
                  </button>
                  <button
                    className='text-start'
                    onClick={() =>
                      addBookmark(taskDispatch, data?.id, 'Self Task')
                    }
                  >
                    <StickerCard label='Self Task' size='w-[246px]' />
                  </button>
                  <button
                    className='text-start'
                    onClick={() =>
                      addBookmark(taskDispatch, data?.id, 'Appointments')
                    }
                  >
                    <StickerCard label='Appointments' size='w-[246px]' />
                  </button>
                  <button
                    className='text-start'
                    onClick={() =>
                      addBookmark(taskDispatch, data?.id, 'Court Related')
                    }
                  >
                    <StickerCard label='Court Related' size='w-[246px]' />
                  </button>
                </div>
              </Dropdown>
              <div className='ml-4 flex gap-x-2'>
                {data?.bookmark?.map((el) => (
                  <StickerCard label={el} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr
        className={expand ? '' : 'animate-moveDown'}
        style={{
          '--delay': 1 + 's',
        }}
      />
    </>
  );
};

export default TaskList;
