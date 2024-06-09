import DatePicker from 'react-multi-date-picker';
import CustomSvg from '../../../components/svg/svg';
import { formatDate, uid } from '../../../utils/utils';
import { addTask, editTask } from '../../../store/actions/task';

const DateTask = ({ data, taskData, setTaskData, onDelete, dispatch }) => {
  return (
    <>
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
              editTask(dispatch, {
                ...taskData,
                date: new Date(e).toString(),
              });
            } else {
              addTask(dispatch, {
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
    </>
  );
};

export default DateTask;
