'use client';

import { useState, useContext, useEffect } from 'react';
import { DataContext } from '@/app/components/dataContext';
import { getRoute } from '@/services/getRoute';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function SelectTransport() {
  const {allTrans, setAllTrans, currGroupId, currDay, Token, allSpots} = useContext(DataContext);
  const [value, setValue] = useState("大眾運輸"); // default value

  async function updateTrans(transOption) {
    if (allSpots?.[currGroupId]?.[currDay] === undefined) return;
    const res = await getRoute(Token, currGroupId, currDay, transOption);
    if (res === undefined) {
      window.location.reload(true);
    }
    setAllTrans((prev) => {
      let updatedDay = prev?.[currGroupId]?.[currDay] || [];
      updatedDay = [transOption, res];  
      return {
        ...prev,
        [currGroupId]: {
          ...prev[currGroupId] || {},
          [currDay]: updatedDay,
        },
      };
    });
  }

  useEffect(() => {
    if (!currGroupId || !currDay) return;
    if (allTrans?.[currGroupId] && allTrans?.[currGroupId]?.[currDay]) {
      setValue(allTrans?.[currGroupId]?.[currDay][0]);
      updateTrans(allTrans?.[currGroupId]?.[currDay][0]);
    } else {
      updateTrans(value); // default value
    }
  }, [currGroupId, currDay, allSpots]);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (!currGroupId || !currDay) return;
    updateTrans(event.target.value);
  };

  return (
    <div className='text-center'>
      <FormControl>
        {/* <FormLabel id="demo-controlled-radio-buttons-group">交通工具</FormLabel> */}
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="大眾運輸" control={<Radio />} label="大眾運輸" />
          <FormControlLabel value="汽車" control={<Radio />} label="汽車" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}