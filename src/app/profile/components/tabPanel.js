'use client';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import React from 'react';


export default function TabPanel(props) {
  const { children, value, index, groupId, ...other } = props;  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  groupId: PropTypes.string,
};