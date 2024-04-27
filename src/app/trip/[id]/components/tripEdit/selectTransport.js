'use client';

import { useState, useContext, useEffect } from 'react';
import { DataContext } from '@/app/components/dataContext';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function SelectTransport() {
  const {allTrans, setAllTrans, currGroupId, currDay} = useContext(DataContext);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!currGroupId || !currDay) return;
    if (allTrans?.[currGroupId] && allTrans?.[currGroupId]?.[currDay]) {
      setValue(allTrans?.[currGroupId]?.[currDay]);
    } 
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (!currGroupId || !currDay) return;
    setAllTrans((prev) => {
      return {
        ...prev, [currGroupId]: {...prev[currGroupId], [currDay]: event.target.value}
      };
    });
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