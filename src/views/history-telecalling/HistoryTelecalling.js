import { styled } from '@mui/system';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person'; // Import the Person icon
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Styled component for Paper
const CustomPaper = styled(Paper)({
  padding: '6px 16px',
});

// Custom styling for the Timeline
const CustomTimeline = styled(Timeline)({
  width: '100%', // Adjust the width as needed
  margin: '0 auto', // Center the timeline
});

export default function HistoryTelecalling({ item }) {
  const [rowData, setRowDataToUpdate] = useState([]);

  console.log(item, 'TID AAGAYAA');

  useEffect(() => {
    const fetchData = async () => {
      if (!item) return; // Exit if no item is provided
      try {
        const apiUrl = `https://apiforcorners.cubisysit.com/api/api-fetch-nextfollowup.php?Tid=${item.Tid}`;

        const response = await axios.get(apiUrl);

        if (response.data.status === 'Success') {
          console.log(response.data.data, 'Single telecalling data fetched Lol');
          setRowDataToUpdate(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching single telecalling data:', error);
      }
    };
    fetchData();
  }, [item]);

  return (
    <CustomTimeline align="alternate">
      {rowData.length > 0 ? rowData.map((data, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {data.NextFollowUpDate}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot style={{ backgroundColor: 'green' }}>
              <CheckCircleIcon style={{ color: 'white' }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <CustomPaper elevation={3}>
              <Typography variant="h6" component="h1" style={{ display: 'flex', alignItems: 'center', }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon style={{ marginRight: 8 }} /> {/* Use Person icon here */}
                  <span style={{ fontWeight: 'bold'}}>
                    {data.UserRole}
                  </span>
                </span>
                <Typography variant="body2" color="textSecondary" style={{ marginLeft: '16px' }}>
                  Time: {data.NextFollowUpTime}
                </Typography>
              </Typography>
              <Typography>Note: {data.Note}</Typography>
            </CustomPaper>
          </TimelineContent>
        </TimelineItem>
      )) : (
        <Typography variant="body2" color="textSecondary" align="center">
          No data available
        </Typography>
      )}
    </CustomTimeline>
  );
}
