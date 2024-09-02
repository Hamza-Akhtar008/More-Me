  // import React, { useState } from 'react';
  // import { Button, TextField, Box } from '@mui/material';
  // import { keyframes } from '@mui/system';

  // const vibration = keyframes`
  //   0%, 100% {
  //     transform: translateX(0);
  //   }
  //   25% {
  //     transform: translateX(-5px);
  //   }
  //   50% {
  //     transform: translateX(5px);
  //   }
  //   75% {
  //     transform: translateX(-5px);
  //   }
  // `;

  // const Q4 = ({ handleNext, handleAnswerChange }) => {
  //   const [dateOfBirth, setDateOfBirth] = useState('');
  //   const [error, setError] = useState(false);

  //   // Get today's date in YYYY-MM-DD format
  //   const today = new Date().toISOString().split('T')[0];

  //   const handleSubmit = () => {
  //     if (!dateOfBirth) {
  //       setError(true);
  //       return;
  //     }

  //     const answer = { dateOfBirth };
  //     console.log("Submitting answer for Q4:", answer);
  //     handleAnswerChange(answer); // Save the answer as { dateOfBirth: "selectedDate" }
  //     handleNext(); // Move to the next question
  //   };

  //   return (
  //     <>
  //       <h2 className='text-l font-semibold text-slate-700 mt-3 mb-6'>Question No 4: Tell us your date of birth?</h2>
  //       <p className='text-l font-semibold text-slate-700 mt-3 mb-6'>Select your date of birth.</p>
  //       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  //         <TextField
  //           id="date"
  //           label="Date of Birth"
  //           type="date"
  //           value={dateOfBirth}
  //           onChange={(e) => {
  //             setDateOfBirth(e.target.value);
  //             setError(false);
  //           }}
  //           InputLabelProps={{
  //             shrink: true,
  //           }}
  //           inputProps={{
  //             max: today, // Disable future dates
  //           }}
  //           error={error}
  //           helperText={error ? "Date of birth is required" : ""}
  //           sx={error ? { animation: `${vibration} 0.3s ease` } : {}}
  //         />
  //         <Button className='mt-10 w-60' variant='outlined' onClick={handleSubmit}>Next!</Button>
  //       </Box>
  //     </>
  //   );
  // };

  // export default Q4;

  import React, { useState } from 'react';
  import { Button, TextField, Box } from '@mui/material';
  import { keyframes } from '@mui/system';
  
  const vibration = keyframes`
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
  `;
  
  const Q4 = ({ handleNext, handleAnswerChange }) => {
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [error, setError] = useState(false);
  
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
  
    const handleSubmit = () => {
      if (!dateOfBirth) {
        setError(true);
        return;
      }
  
      const answer = { dateOfBirth };
      console.log("Submitting answer for Q4:", answer);
      handleAnswerChange(answer, 'persona'); // Save the answer in the persona category
      handleNext(); // Move to the next question
    };
  
    return (
      <>
        <h2 className='text-l font-semibold text-slate-700 mt-3 mb-6'>Question No 4: Tell us your date of birth?</h2>
        <p className='text-l font-semibold text-slate-700 mt-3 mb-6'>Select your date of birth.</p>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            id="date"
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
              setError(false);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: today, // Disable future dates
            }}
            error={error}
            helperText={error ? "Date of birth is required" : ""}
            sx={error ? { animation: `${vibration} 0.3s ease` } : {}}
          />
          <Button className='mt-10 w-60' variant='outlined' onClick={handleSubmit}>Next!</Button>
        </Box>
      </>
    );
  };
  
  export default Q4;
  