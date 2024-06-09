import { useState } from 'react';
import Dropdown from '../../../components/button/dropdown';
import CustomSvg from '../../../components/svg/svg';
import { filterTask } from '../../../store/actions/task';

const LayoutTask = ({
  children,
  numberTask,
  setNumberTask,
  setScroll,
  dispatch,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [label, setLabel] = useState('My Task');

  return (
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
                  filterTask(dispatch, []);
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
                  filterTask(dispatch, ['Self Task', 'Appointments']);
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
                  filterTask(dispatch, ['Important ASAP', 'ASAP']);
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
          onClick={() => {
            setNumberTask(numberTask + 1);
            setScroll(true);
          }}
        >
          New Task
        </button>
      </div>
      {children}
    </div>
  );
};

export default LayoutTask;
