import { useContext, useEffect, useState } from 'react';
import CustomSvg from '../../components/svg/svg';
import './task.css';
import { formatDate, getDaysDiff } from '../../utils/utils';
import Dropdown from '../../components/button/dropdown';
import { deleteTask } from '../../store/actions/task';
import { GlobalContext } from '../../store/store';
import Checkbox from './components/checkbox';
import TitleTask from './components/title';
import DateTask from './components/date-picker';
import DescTask from './components/description';
import BookmarkTask from './components/bookmark';

const TaskList = ({ data, onDelete }) => {
  const { taskDispatch } = useContext(GlobalContext);
  const [title, setTitle] = useState(data?.title ? false : true);
  const [desc, setDesc] = useState(false);
  const [expand, setExpand] = useState(data?.done === 1 ? true : false);
  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    setTaskData(
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
  }, [data]);

  return (
    <>
      <div className='py-[22px] text-darkSecondary'>
        <div className='flex items-center'>
          <Checkbox
            taskData={taskData}
            setTaskData={setTaskData}
            dispatch={taskDispatch}
          />
          <div className='flex justify-between items-start w-full ml-4'>
            <TitleTask
              title={title}
              setTitle={setTitle}
              taskData={taskData}
              setTaskData={setTaskData}
              onDelete={() => onDelete()}
              dispatch={taskDispatch}
            />
            <div className='flex items-center text-sm gap-4'>
              {taskData?.done === 0 && (
                <p className='text-danger'>
                  {taskData?.date ? getDaysDiff(taskData?.date) : ''}
                </p>
              )}
              <p>{formatDate(taskData?.date, 'mm/dd/yyyy')}</p>
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
                    deleteTask(taskDispatch, taskData?.id);
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
            <DateTask
              expand={expand}
              taskData={taskData}
              setTaskData={setTaskData}
              onDelete={() => onDelete()}
              dispatch={taskDispatch}
            />
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
            <DescTask
              desc={desc}
              setDesc={setDesc}
              taskData={taskData}
              setTaskData={setTaskData}
              onDelete={() => onDelete()}
              dispatch={taskDispatch}
            />
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
            <BookmarkTask
              taskData={taskData}
              setTaskData={setTaskData}
              onDelete={() => onDelete()}
              dispatch={taskDispatch}
            />
          </div>
        </div>
      </div>
      <hr
        className={`${
          expand ? '' : 'animate-moveDown'
        } border border-secondary`}
        style={{
          '--delay': 1 + 's',
        }}
      />
    </>
  );
};

export default TaskList;
