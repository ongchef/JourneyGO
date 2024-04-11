import { useContext } from "react";
import { DataContext } from "@/app/components/dataContext";
import Typography from '@mui/material/Typography';
import FaceIcon from '@mui/icons-material/Face';
import Button from '@mui/material/Button';
import DayPanel from './dayPanel';

export default function TripPlan(props) {
  const {allGroups} = useContext(DataContext);
  const {groupId} = props;

  return (
    <div className='px-5 w-[100%] overflow-auto h-[70vh]'>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-3">
          <Typography variant='h6'>{allGroups[groupId]?.startDate} ~ {allGroups[groupId]?.endDate}</Typography>
          <div className="flex gap-5 items-center">
            <FaceIcon className="scale-150"/>
            <FaceIcon className="scale-150"/>
            <FaceIcon className="scale-150"/>
            <Button variant="contained" className="w-28">新增成員</Button>
            <Button variant="outlined">退出</Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button variant="contained" className="w-28">編輯行程</Button>
        </div>
      </div>
      <div className="my-5">
        <DayPanel groupId={groupId} />
      </div>
    </div>
  );
}