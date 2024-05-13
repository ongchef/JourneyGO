'use client';

import { useState, useContext } from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import StarIcon from '@mui/icons-material/Star';
import { getToken } from '@/utils/getToken';
import { DataContext } from '@/app/components/dataContext';
import { postSpots } from '@/services/postSpots';


export default function RecommendDialog({recommend}) {
  const [open, setOpen] = useState(false);
  const {allSpots, currGroupId, currDay, setNewSpot} = useContext(DataContext);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePost = () => {
    async function post(Token) {
      let spotIds;
      if (allSpots?.[currGroupId]?.[currDay]?.length) {
        spotIds = allSpots?.[currGroupId]?.[currDay]?.length;
      } else {
        spotIds = 0;
      }
      const data = {
        spotName: recommend?.title,
        description: "",
        location: recommend?.location,
        lon: recommend?.lng,
        lat: recommend?.lat,
        sequence: spotIds, 
      }
      try {
        const res = await postSpots(Token, currGroupId, currDay, data);
        const spotData = res?.formattedData;
        const status = res?.status;
        if (status === 201 || status === 200) {
          setNewSpot([...(allSpots?.[currGroupId]?.[currDay] ?? []), spotData]);
        } else {
          router.push(pathname, undefined, { scroll: false });
        }
      } catch (error) {
        console.log("post", error)
      }
    }
    const Token = getToken();
    post(Token);
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>查看更多</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{fontSize: {lg: 24, xs: 18}}}>{recommend?.title}</DialogTitle>
          <DialogContent>
            <div className='flex lg:flex-row flex-col gap-4'>
              <div id="alert-dialog-description" className='flex flex-col gap-2'>
                {recommend?.location}
                {recommend?.phone}
                {recommend?.is_closed ? <div className='font-bold text-rose-600'>非營業時間</div> : <div className='font-bold text-green-700'>營業中</div>}
                <div className='flex flex-row gap-1'>
                  {recommend?.categories?.map((category, index) => (
                    <div key={index} className='bg-slate-200 p-1'>{category}</div>
                    ))
                  }
                </div>
                <div className='flex flex-row gap-2'>
                  <div className='flex flex-row items-center'>
                    {recommend?.rating}
                    <StarIcon />
                  </div>
                  {recommend?.review_count}則評論
                </div>
                價位：{recommend?.price || "未提供"}
              </div>
              <img src={recommend?.img} alt='place_photo' width={240} className='object-cover aspect-square'/>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>返回</Button>
            <Button variant='contained' onClick={handlePost} autoFocus>新增景點</Button>
          </DialogActions>
        </Dialog>
    </>
  );
}