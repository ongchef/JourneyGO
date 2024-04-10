import Typography from '@mui/material/Typography';
import SearchField from './searchField';
import SearchCard from './searchCard';

export default function TripSearch() {



  return (
    <div className='w-[100%] mx-5 flex flex-col gap-3'>
      <div className='flex flex-row'>
        <Typography variant='h6'>新增景點</Typography>
      </div>
      <SearchField />
      <div className='overflow-auto h-[55vh] flex flex-col gap-3 p-3'>
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
      </div>
    </div>
  );
}