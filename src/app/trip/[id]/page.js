'use client';

import { useState, useContext, useEffect } from 'react';
import { DataContext } from "@/app/components/dataContext";
import TripPlan from './components/tripEdit/tripPlan';
import TripSearch from './components/tripEdit/tripSearch';
import GoogleMap from './components/tripEdit/googleMap';
import Loading from '@/app/components/loading';
import { getTripGroupOverview } from '@/services/getTripGroupOverview';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TabPanel from './components/tripEdit/tabPanel';
import RoomIcon from '@mui/icons-material/Room';
import DescriptionIcon from '@mui/icons-material/Description';

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Trip({params}) {
  const {currGroupId, setCurrGroupId, Token} = useContext(DataContext);
  const [value, setValue] = useState(0);
  const [groupInfo, setGroupInfo] = useState({}); 
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const groupId = String(params.id);
    setCurrGroupId(groupId);
  }, []);

  useEffect(() => {
    async function getGroup() {
      if (currGroupId === undefined) {
        return;
      } else {
        const res = await getTripGroupOverview(Token, currGroupId);
        // console.log('getGroup res:', res);
        if (res !== undefined) {
          setGroupInfo(res);
          setIsLoad(true);
        }
      };
    }
    getGroup();
  }, [currGroupId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <main>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab 
            label={
              <div className='flex flex-row items-center gap-3'>
                <RoomIcon className='scale-125'/>
                <Typography variant='p'>景點規劃</Typography>
              </div>
            } 
            {...tabProps(0)}   
          />
          <Tab 
            label={
              <div className='flex flex-row items-center gap-3'>
                <DescriptionIcon className='scale-125'/>
                <Typography variant='p'>分帳</Typography>
              </div>
            }
            {...tabProps(1)} 
          />
        </Tabs>
      </Box>
      <Box>
        <Typography variant='h4' sx={{mx: 2, my: 2}}>{groupInfo?.group_name}</Typography>
        <TabPanel value={value} index={0}>
          {!isLoad && <Loading />}
          {isLoad && <div className='flex lg:flex-row flex-col'>
            <TripPlan groupInfo={groupInfo} />
            {/* <TripSearch /> */}
            <GoogleMap />
          </div>}
        </TabPanel>
        <TabPanel value={value} index={1}>
          分帳
        </TabPanel>
      </Box>
    </Box>
    </main>
  );
}