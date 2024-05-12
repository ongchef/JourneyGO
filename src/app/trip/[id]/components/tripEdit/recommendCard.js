'use client';

import { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import StarIcon from '@mui/icons-material/Star';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function RecommendCard({recommend}) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card sx={{ boxShadow: 3 }} className='p-5 flex flex-col lg:gap-3 gap-2'>
        <p className='lg:text-xl text-lg'>{recommend?.title}</p>
        <p className='text-sm'>{recommend?.location}</p>
        <div className='flex flex-row text-neutral-500 gap-2'>
          <div className='flex flex-row items-center'>
            <p className='text-base'>{recommend?.rating}</p>
            <StarIcon />
          </div>
          <p className='text-base'>{recommend?.review_count}則評論</p>
        </div>
        <CardMedia
          component="img"
          image={recommend?.img}
          alt="place_photo"
          sx={{ objectFit: 'cover', height: {lg: 240, xs: 180}}}
        />
        <Button variant="outlined" onClick={handleClickOpen}>查看更多</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{fontSize: {lg: 24, xs: 18}}}>{recommend?.title}</DialogTitle>
          <DialogContent>
            <div className='flex flex-row'>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
              </DialogContentText>
              <img src={recommend?.img} alt='place_photo' width={240} className='object-cover aspect-square'/>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>返回</Button>
            <Button variant='contained' onClick={handleClose} autoFocus>新增景點</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
}