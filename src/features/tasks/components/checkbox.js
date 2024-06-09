import CustomSvg from '../../../components/svg/svg';
import { editTask } from '../../../store/actions/task';

const Checkbox = ({ taskData, setTaskData, dispatch }) => {
  return (
    <button
      onClick={() => {
        if (taskData) {
          setTaskData({
            ...taskData,
            done: taskData?.done === 1 ? 0 : 1,
          });
          editTask(dispatch, {
            ...taskData,
            done: taskData?.done === 1 ? 0 : 1,
          });
        }
      }}
    >
      <CustomSvg
        icon={`assets/icons/${
          taskData?.done === 1 ? 'checkbox' : 'checkbox-blank'
        }.svg`}
        styles='w-[18px] h-[18px]'
      />
    </button>
  );
};

export default Checkbox;
