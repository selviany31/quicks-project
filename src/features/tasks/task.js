import { useEffect, useRef, useState } from 'react';
import ModalCard from '../../components/modal/modal';
import TaskList from './list';
import { getDataTask } from '../../store/actions/task';
import { useContext } from 'react';
import { GlobalContext } from '../../store/store';
import Spinner from '../../components/spinner/spinner';
import LayoutTask from './components/layout';

const TaskCard = ({ show }) => {
  const { taskState, taskDispatch } = useContext(GlobalContext);
  const { data, loading } = taskState;

  const [numberTask, setNumberTask] = useState(0);
  const [scroll, setScroll] = useState(false);

  const onDeleteTask = () => {
    setNumberTask(numberTask - 1);
  };

  const listRef = useRef();

  useEffect(() => {
    if (scroll) {
      listRef?.current?.lastElementChild?.scrollIntoView();
      setScroll(false);
    }
  }, [scroll]);

  useEffect(() => {
    if (show === 'task' && !data?.length) {
      getDataTask(taskDispatch);
    }
  }, [show, data?.length, taskDispatch]);

  return (
    <ModalCard
      styles={
        show === 'task' ? 'animate-slideUp opacity-0' : 'animate-slideDown'
      }
      paddingStyle='py-6 pl-8 pr-2'
    >
      <LayoutTask
        numberTask={numberTask}
        setNumberTask={setNumberTask}
        dispatch={taskDispatch}
        setScroll={setScroll}
      >
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
          <div className='h-[95%] overflow-y-auto pr-4' ref={listRef}>
            {data?.map((item, i) => (
              <TaskList key={i} data={item} onDelete={() => {}} />
            ))}
            {Array.from({ length: numberTask })?.map((_, i) => (
              <TaskList key={i} onDelete={onDeleteTask} />
            ))}
          </div>
        )}
      </LayoutTask>
    </ModalCard>
  );
};

export default TaskCard;
