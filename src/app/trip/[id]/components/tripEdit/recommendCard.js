'use client';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import StarIcon from '@mui/icons-material/Star';
import RecommendDialog from './recommendDialog';
import { DataContext } from '@/app/components/dataContext.jsx';


export default function RecommendCard({recommend}) {
  const { currentLang } = useContext(DataContext);

  const translate = (key) => {
    const translations = {
        reviews: {
            zh: "則評論",
            en: "reviews",
        },
    };
    return translations[key][currentLang];
  };

  return (
    <div>
      <Card sx={{ boxShadow: 3 }} className='p-5 flex flex-col lg:gap-3 gap-2'>
        <div className='lg:text-xl text-lg'>{recommend?.title}</div>
        <div className='text-sm'>{recommend?.location}</div>
        <div className='flex flex-row text-neutral-500 gap-2'>
          <div className='flex flex-row items-center'>
            <div className='text-base'>{recommend?.rating}</div>
            <StarIcon />
          </div>
          <div className='text-base'>{recommend?.review_count}{translate('reviews')}</div>
        </div>
        <CardMedia
          component="img"
          image={recommend?.img}
          alt="place_photo"
          sx={{ objectFit: 'cover', height: {lg: 240, xs: 180}}}
        />
        <RecommendDialog recommend={recommend} />
      </Card>
    </div>
  );
}