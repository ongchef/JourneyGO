import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

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
          <p>groupId: {groupId}</p>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  groupId: PropTypes.number.isRequired,
};