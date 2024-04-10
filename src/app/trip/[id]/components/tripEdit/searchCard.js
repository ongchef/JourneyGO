import Image from 'next/image';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';

// const imageLoader = ({ src, width, quality }) => {
//   return `https://random.splash.com/${src}?w=${width}&q=${quality || 75}`
// }

export default function SearchCard() {
  return (
    <div className='flex flex-row'>
      <Image src='/images/hualian.jpg' alt='random' width={100} height={100} />
      <div className='flex flex-row shadow-lg w-full justify-between'>
        <div className='flex flex-col p-3'>
          <Typography variant='h6'>景點名稱</Typography>
          <Typography variant='subtitile'>景點地址</Typography>
        </div>
        <div className='p-1 h-full flex items-center gap-2'>
          <div className='flex items-center'>
            <Typography variant='body2'>4.3/5</Typography>
            <StarIcon />
          </div>
          <Button variant='contained'>新增</Button>
        </div>
      </div>
    </div>
  );
}