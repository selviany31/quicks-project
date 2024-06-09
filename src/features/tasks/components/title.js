import { addTask, editTask } from '../../../store/actions/task';
import { uid } from '../../../utils/utils';

const TitleTask = ({
  title,
  setTitle,
  taskData,
  setTaskData,
  onDelete,
  dispatch,
}) => {
  return (
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
                if (taskData?.id) {
                  editTask(dispatch, {
                    ...taskData,
                    title: e.target.value,
                  });
                } else {
                  addTask(dispatch, {
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
            taskData?.done === 1 ? 'line-through text-secondary' : ''
          }`}
          onClick={() => (taskData?.done === 1 ? '' : setTitle(!title))}
        >
          {taskData?.title}
        </p>
      )}
    </div>
  );
};

export default TitleTask;
