import CustomSvg from '../../../components/svg/svg';
import { addTask, editTask } from '../../../store/actions/task';
import { uid } from '../../../utils/utils';

const DescTask = ({
  data,
  desc,
  setDesc,
  taskData,
  setTaskData,
  onDelete,
  dispatch,
}) => {
  return (
    <>
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
                    editTask(dispatch, {
                      ...taskData,
                      desc: e.target.value,
                    });
                  } else {
                    addTask(dispatch, {
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
    </>
  );
};

export default DescTask;
