'use client';

import { useState, useContext, useEffect } from 'react';
import { DataContext } from '@/app/components/dataContext';
import { updateRoute } from '@/services/updateRoute';
import { getRoute } from '@/services/getRoute';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getToken } from '@/utils/getToken';

export default function SelectTransport() {
  const {allTrans, setAllTrans, currGroupId, currDay, allSpots, setNewSpot} = useContext(DataContext);
  const [value, setValue] = useState("大眾運輸"); // default value

  async function updateTrans(transOption, Token) {
    if (allSpots?.[currGroupId]?.[currDay] === undefined) return;
    const res = await updateRoute(Token, currGroupId, currDay, transOption);
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
    // console.log("allTrans", allTrans);
  }

  async function getTrans(Token) {
    if (allSpots?.[currGroupId]?.[currDay] === undefined) return;
    const {durations, status, option} = await getRoute(Token, currGroupId, currDay);
    if (status !== 200) {
      updateTrans(value, Token); // if no route data
      return;
    }
    if (durations !== undefined){
      let newValue = "";
      if(option === "TRANSIT") {
        newValue = "大眾運輸";
      } else if (option === "DRIVING") {
        newValue = "汽車";
      }
      setValue(newValue);
      setAllTrans((prev) => {
        const updatedDay = [newValue, durations];  
        return {
          ...prev,
          [currGroupId]: {
            ...prev[currGroupId] || {},
            [currDay]: updatedDay,
          },
        };
      });
    }
  }

  // get transportation data
  useEffect(() => {
    if (!currGroupId || !currDay) return;
    const Token = getToken();
    getTrans(Token);
  }, [currGroupId, currDay, allSpots]);

  //update transportation data
  const handleChange = (event) => {
    setValue(event.target.value);
    if (!currGroupId || !currDay) return;
    const Token = getToken();
    updateTrans(event.target.value, Token);
    const spotSequence = allSpots?.[currGroupId]?.[currDay];
    setNewSpot(spotSequence);
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