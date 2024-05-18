'use client';

import { useState, useContext, useEffect } from 'react';
import { DataContext } from '@/app/components/dataContext';
import { updateRoute } from '@/services/updateRoute';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getToken } from '@/utils/getToken';


export default function SelectTransport({spotChange}) {
  const {allTrans, setAllTrans, currGroupId, currDay, allSpots, setRefetch, newSpot, currentLang } = useContext(DataContext);
  const [value, setValue] = useState("大眾運輸"); // default value

  const translate = (key) => {
    const translations = {
      public: {
        zh: "大眾運輸",
        en: "Public Transport",
      },
      drive: {
        zh: "汽車",
        en: "Drive",
      },
    };
    return translations[key][currentLang];
  };

  async function updateTrans(transOption, Token) {
    if (allSpots?.[currGroupId]?.[currDay] === undefined) return;
    const res = await updateRoute(Token, currGroupId, currDay, transOption);
    const durations = res?.durations;
    const option = res?.option;
    const status = res?.status;
    if (status !== 200) {
      return;
    }
    // console.log("updateTrans data", durations, option, status);
    return status;
  }

  // set initial transportation option
  useEffect(() => {
    const newValue = allTrans?.[currGroupId]?.[currDay]?.[0];
    if (newValue === undefined || newValue === "") return;
    setValue(newValue);
  }, [allTrans]);

  // update transportation when newSpot is added
  useEffect(() => {
    async function update() {
        if (allSpots?.[currGroupId]?.[currDay] === undefined) return;
        const Token = getToken();
        const status = await updateTrans(value, Token);
        if (status == 200) {
          spotChange(currDay, newSpot);
        }
      }
    if (newSpot) {
      update();
    }
  }, [newSpot])

  //update transportation when new option is selected
  const handleChange = async (event) => {
    setValue(event.target.value);
    if (!currGroupId || !currDay) return;
    const Token = getToken();
    const status = await updateTrans(event.target.value, Token);
    const spotSequence = allSpots?.[currGroupId]?.[currDay];
    if (status === 200) {
      spotChange(currDay, spotSequence);
    }
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
          <FormControlLabel value="大眾運輸" control={<Radio />} label={translate('public')} />
          <FormControlLabel value="汽車" control={<Radio />} label={translate('drive')} />
        </RadioGroup>
      </FormControl>
    </div>
  );
}