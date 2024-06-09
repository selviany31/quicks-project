import Dropdown from '../../../components/button/dropdown';
import StickerCard from '../../../components/stickers/sticker';
import CustomSvg from '../../../components/svg/svg';
import { addTask, editTask } from '../../../store/actions/task';
import { uid } from '../../../utils/utils';

const BookmarkTask = ({ data, taskData, setTaskData, onDelete, dispatch }) => {
  const bookmark = [
    'Important ASAP',
    'Offline Meeting',
    'Virtual Meeting',
    'ASAP',
    'Client Related',
    'Self Task',
    'Appointments',
    'Court Related',
  ];
  return (
    <div className='ml-4 flex items-center'>
      <Dropdown
        btn={
          <CustomSvg
            icon='assets/icons/bookmark.svg'
            isActive={data?.bookmark?.length ? 'primary' : ''}
            styles='w-[19px] h-[20px]'
          />
        }
      >
        <div className='p-3 grid gap-y-2'>
          {bookmark.map((el) => (
            <button
              className='text-start'
              onClick={() => {
                if (data) {
                  editTask(dispatch, {
                    ...taskData,
                    bookmark: taskData.bookmark.concat(el),
                  });
                } else {
                  addTask(dispatch, {
                    ...taskData,
                    id: uid(),
                    bookmark: taskData.bookmark.concat(el),
                  });
                }
                setTaskData({
                  ...taskData,
                  bookmark: taskData.bookmark.concat(el),
                });
                onDelete();
              }}
            >
              <StickerCard label={el} size='w-[246px]' />
            </button>
          ))}
        </div>
      </Dropdown>
      <div className='ml-4 flex gap-x-2'>
        {data?.bookmark?.map((el) => (
          <StickerCard label={el} />
        ))}
      </div>
    </div>
  );
};

export default BookmarkTask;
