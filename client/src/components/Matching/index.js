import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
import ProgramSelection from './ProgramSelection';
import CareerSelection from './CareerSelection';
import TimeDate from './TimeDate';
import UniversitySelection from './UniversitySelection';
import GraduationYearSelection from './GraduationYearSelection';
import RelevantSkills from './RelevantSkills';

function App() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [skills, setSkills] = useState('');

  const handleProgramChange = program => {
    setSelectedProgram(program);
  };

  const handleInterestChange = interest => {
    setSelectedInterest(interest);
  };

  const handleUniversityChange = university => {
    setSelectedUniversity(university);
  };

  const handleYearChange = year => {
    setSelectedYear(year);
  };

  const handleSkillsChange = event => {
    setSkills(event.target.value);
  };

  const handleSubmit = () => {
    console.log('University:', selectedUniversity);
    console.log('Program:', selectedProgram);
    console.log('Interest:', selectedInterest);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
    >
      <Grid container spacing={2} style={{maxWidth: 400}}>
        <Grid item xs={12}>
          <Box>
            <UniversitySelection
              selectedUniversity={selectedUniversity}
              handleUniversityChange={handleUniversityChange}
            />
          </Box>
          <Box pb={2}>
            <ProgramSelection
              selectedProgram={selectedProgram}
              handleProgramChange={handleProgramChange}
            />
          </Box>
          <Box pb={2}>
            <GraduationYearSelection
              selectedYear={selectedYear}
              handleYearChange={handleYearChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box pb={2}>
            <CareerSelection
              selectedInterest={selectedInterest}
              handleInterestChange={handleInterestChange}
            />
          </Box>
          <Box pb={2}>
            <RelevantSkills
              skills={skills}
              handleSkillsChange={handleSkillsChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TimeDate />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
