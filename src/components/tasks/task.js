import { useEffect, useState } from 'react';
import ModalCard from '../modal/modal';
import TaskList from './list';
import { getDataTask, filterTask } from '../../store/actions/task';
import { useContext } from 'react';
import { GlobalContext } from '../../store/store';
import CustomSvg from '../svg/svg';
import Dropdown from '../button/dropdown';
import Spinner from '../spinner/spinner';

const TaskCard = ({ show }) => {
  const { taskState, taskDispatch } = useContext(GlobalContext);
  const { data, backUp, loading } = taskState;

  const [dropdown, setDropdown] = useState(false);
  const [numberTask, setNumberTask] = useState(0);
  const [label, setLabel] = useState('My Task');

  console.log(data, 'task', backUp);

  const onDeleteTask = () => {
    setNumberTask(numberTask - 1);
  };

  useEffect(() => {
    getDataTask(taskDispatch);
  }, []);

  return (
    <ModalCard
      styles={
        show === 'task' ? 'animate-slideUp opacity-0' : 'animate-slideDown'
      }
      paddingStyle='py-6 pl-8 pr-2'
    >
      <div className='h-full'>
        <div className='flex justify-between text-sm pr-6'>
          <div className='w-1/2'>
            <Dropdown
              btn={
                <button
                  className='flex items-center border border-secondary text-darkSecondary font-bold p-2 rounded-md'
                  onClick={() => setDropdown(!dropdown)}
                >
                  {label}
                  <CustomSvg icon='assets/icons/arrow-down.svg' styles='ml-2' />
                </button>
              }
              width='w-[75%]'
            >
              {label !== 'My Task' ? (
                <button
                  className='p-2 border-b border-secondary text-start text-darkSecondary font-bold hover:bg-primary hover:text-white hover:rounded-t-md'
                  onClick={() => {
                    setLabel('My Task');
                    filterTask(taskDispatch, []);
                  }}
                >
                  My Task
                </button>
              ) : (
                ''
              )}
              {label !== 'Personal Errands' ? (
                <button
                  className='p-2 border-b border-secondary text-start text-darkSecondary font-bold hover:bg-primary hover:text-white hover:rounded-t-md'
                  onClick={() => {
                    setLabel('Personal Errands');
                    filterTask(taskDispatch, ['Self Task', 'Appointments']);
                  }}
                >
                  Personal Errands
                </button>
              ) : (
                ''
              )}
              {label !== 'Urgent To Do' ? (
                <button
                  className='p-2 text-start text-darkSecondary font-bold hover:bg-primary hover:text-white hover:rounded-b-md'
                  onClick={() => {
                    setLabel('Urgent To Do');
                    filterTask(taskDispatch, ['Important ASAP', 'ASAP']);
                  }}
                >
                  Urgent To Do
                </button>
              ) : (
                ''
              )}
            </Dropdown>
          </div>

          <button
            className='bg-primary text-white rounded-md px-3 font-bold'
            onClick={() => setNumberTask(numberTask + 1)}
          >
            New Task
          </button>
        </div>
        {loading ? (
          <div className='h-[90%] w-full flex justify-center items-center'>
            <Spinner
              width='w-[84px]'
              height='h-[84px]'
              halfHeight='h-[42px]'
              containerSize='150'
              text='Loading Tasks...'
            />
          </div>
        ) : (
          <div className='h-[95%] overflow-y-auto pr-4'>
            {data?.map((item, i) => (
              <TaskList key={i} data={item} onDelete={() => {}} />
            ))}
            {Array.from({ length: numberTask })?.map((_, i) => (
              <TaskList key={i} onDelete={onDeleteTask} />
            ))}
          </div>
        )}
      </div>
    </ModalCard>
  );
};

export default TaskCard;
