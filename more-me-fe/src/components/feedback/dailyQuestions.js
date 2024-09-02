// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Snackbar, IconButton, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem, TextField, Button, Alert } from '@mui/material';
// // import CloseIcon from '@mui/icons-material/Close';
// import { createDailyQuestions } from "src/api";
// import { motion, useAnimation } from 'framer-motion';


// export default function QuestionnaireForm({ username }) {
//   const storedUserData = JSON.parse(localStorage.getItem("currentUser"));
//   const [step, setStep] = useState(1);
//   const [thanksNote, setThanksNote] = useState(false);
//   const [formValues, setFormValues] = useState({
//     feeling: '',
//     reason: '',
//     otherReason: '',
//     symptom: '',
//     otherSymptom: '',
//     anxietyLevel: ''
//   });
//   const [thankYouOpen, setThankYouOpen] = useState(false);
//   const [isComplete, setIsComplete] = useState(false);
//   const [anxietyLevelError, setAnxietyLevelError] = useState(false);
//   const [error, setError] = useState('');
//   const controls = useAnimation();

//   useEffect(() => {
//     if (isComplete) {
//       handleSubmit();
//     }
//   }, [isComplete]);

//   const handleNext = () => {
//     setError('');
//     if (step === 1 && !formValues.feeling) {
//       setError('Please select an option.');
//     } else if (step === 2 && (!formValues.anxietyLevel || anxietyLevelError)) {
//       setError('Please enter a valid anxiety level between 1 and 10.');
//     } else if (step === 3 && !formValues.reason) {
//       setError('Please select a reason.');
//     } else if (step === 3 && formValues.reason === 'other' && !formValues.otherReason.trim()) {
//       setError('Please specify the reason.');
//     } else {
//       if(formValues.feeling === "satisfied" || formValues.feeling === "excited"){
//         setThankYouOpen(true);
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       }
//       else{
//         setStep(step + 1);
//       }
      
//     }
//   };

//   const handleRadioChange = (e) => {
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       feeling: e.target.value,
//     }));
//   };

//   const handleAnxietyLevelChange = (e) => {
//     const value = e.target.value;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       anxietyLevel: value,
//     }));

//     if (value < 1 || value > 10) {
//       setAnxietyLevelError(true);
//     } else {
//       setAnxietyLevelError(false);
//     }
//   };

//   const handleReasonChange = (e) => {
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       reason: e.target.value,
//     }));
//   };

//   const handleOtherReasonChange = (e) => {
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       otherReason: e.target.value,
//     }));
//   };

//   const handleSymptomChange = (e) => {
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       symptom: e.target.value,
//     }));
//   };

//   const handleOtherSymptomChange = (e) => {
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       otherSymptom: e.target.value,
//     }));
//   };

//   const handleSymptomNext = () => {
//     if (formValues.symptom !== 'other' || formValues.otherSymptom.trim() !== '') {
//       setIsComplete(true);
//     } else {
//       setError('Please specify the symptom.');
//     }
//     console.log("handle submit")
//   };

//   const handleSubmit = async () => {

//     if (formValues.symptom === '' || (formValues.symptom === 'other' && formValues.otherSymptom.trim() === '')) {
//       setError('Please select a symptom.');
//       return;
//     }

//     setThanksNote(true);
//     setThankYouOpen(true);
//     console.log("Form Data on Submit: ", formValues);
//     let reasonVal, symptomVal;
//     if(formValues.otherReason === ""){
//       reasonVal = formValues.reason;
//     }
//     else{
//       reasonVal = formValues.otherReason;
//     }
//     if(formValues.otherSymptom === ""){
//       symptomVal = formValues.symptom;
//     }
//     else{
//       symptomVal = formValues.otherSymptom;
//     }
//     // console.log("user data first name ", storedUserData.user.firstName);
//     // console.log("user data last name ", storedUserData.user.lastName);
//     // console.log("user data email ", storedUserData.user.email);

//     const data = {
//       anxietyLevel: formValues.anxietyLevel,
//       feeling: formValues.feeling,
//       reason: reasonVal,
//       symptom: symptomVal,
//       companyId: storedUserData?.company.id,
//       userId: storedUserData?.user.id,
//       userFirstName: storedUserData.user.firstName,
//       userLastName: storedUserData.user.lastName,
//       userEmail: storedUserData.user.email,
//     };

//     console.log("Complete data:", data);
//     await createDailyQuestions(data, storedUserData.token);
    
//     controls.start("exitSubmit").then(() => {

//     setTimeout(() => {
//       window.location.reload();
//     }, 2000);
//   });
//   };

//   const handleThankYouClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setThankYouOpen(false);
//   };

//   //for animations
//   const stepVariants = {
//     initial: { opacity: 0, x: '-100vw' },
//     animate: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: '100vw' },
//     exitSubmit: { opacity: 0, x: '100vw', y: '100vh' }
//   };

//   return (
//     <Box sx={{ mt: 3, width: '100%' }}>
//       <Typography variant="h2" gutterBottom style={{ textAlign: 'center' }}>
//         Welcome, {username}!
//       </Typography>
//       <Box component="form" sx={{ mt: 3 }}>
//         <motion.div
//           key={step}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           variants={stepVariants}
//           transition={{ duration: 0.5 }}
//         >
//           {step === 1 && (
//             <FormControl component="fieldset" sx={{ mb: 2 }} style={{ width: "100%" }}>
//               <FormLabel component="legend">How are you feeling today?</FormLabel>
//               <RadioGroup
//                 aria-label="feeling"
//                 name="feeling"
//                 value={formValues.feeling}
//                 onChange={handleRadioChange}
//               >
//                 <FormControlLabel value="satisfied" control={<Radio />} label="😊 Satisfied" />
//                 <FormControlLabel value="frustrated" control={<Radio />} label="😤 Frustrated" />
//                 <FormControlLabel value="hurt" control={<Radio />} label="😢 Hurt" />
//                 <FormControlLabel value="depressed" control={<Radio />} label="😞 Depressed" />
//                 <FormControlLabel value="anxious" control={<Radio />} label="😰 Anxious" />
//                 <FormControlLabel value="tired" control={<Radio />} label="😴 Tired" />
//                 <FormControlLabel value="sad" control={<Radio />} label="😔 Sad" />
//                 <FormControlLabel value="excited" control={<Radio />} label="🤩 Excited" />
//               </RadioGroup>
//               {error && <Alert severity="error">{error}</Alert>}
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 sx={{ mt: 2 }}
//               >
//                 Next
//               </Button>
//             </FormControl>
//           )}

//           {step === 2 && (
//             <Box sx={{ mb: 2 }}>
//               <FormControl fullWidth>
//                 <FormLabel component="legend">What is your level of anxiety?</FormLabel>
//                 <TextField
//                   type="number"
//                   inputProps={{ min: 1, max: 10 }}
//                   name="anxietyLevel"
//                   value={formValues.anxietyLevel}
//                   onChange={handleAnxietyLevelChange}
//                   fullWidth
//                   label="Enter a number from 1 to 10"
//                   margin="normal"
//                   required
//                   error={anxietyLevelError}
//                   helperText={anxietyLevelError ? "Value must be in range 1-10" : ""}
//                 />
//                 {error && <Alert severity="error">{error}</Alert>}
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleNext}
//                   sx={{ mt: 2 }}
//                 >
//                   Next
//                 </Button>
//               </FormControl>
//             </Box>
//           )}

//           {step === 3 && (
//             <Box sx={{ mb: 2 }}>
//               <FormControl fullWidth>
//                 <FormLabel component="legend">Reason for feeling this way</FormLabel>
//                 <Select
//                   value={formValues.reason}
//                   onChange={handleReasonChange}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>Select a reason</MenuItem>
//                   <MenuItem value="positivity">Positivity</MenuItem>
//                   <MenuItem value="general well being">General Well Being</MenuItem>
//                   <MenuItem value="planning">Planning</MenuItem>
//                   <MenuItem value="work">Work</MenuItem>
//                   <MenuItem value="lack of sleep">Lack of Sleep</MenuItem>
//                   <MenuItem value="career choices">Career Choices</MenuItem>
//                   <MenuItem value="financial">Financial</MenuItem>
//                   <MenuItem value="health">Health</MenuItem>
//                   <MenuItem value="spiritual">Spiritual</MenuItem>
//                   <MenuItem value="mental health">Mental Health</MenuItem>
//                   <MenuItem value="other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//               {formValues.reason === 'other' && (
//                 <TextField
//                   fullWidth
//                   label="Please specify"
//                   value={formValues.otherReason}
//                   onChange={handleOtherReasonChange}
//                   margin="normal"
//                   inputProps={{ maxLength: 500 }}
//                 />
//               )}
//               {error && <Alert severity="error">{error}</Alert>}
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 sx={{ mt: 2 }}
//                 style={{ width: "100%" }}
//               >
//                 Next
//               </Button>
//             </Box>
//           )}

//           {step === 4 && (
//             <Box sx={{ mb: 2 }}>
//               <FormControl fullWidth>
//                 <FormLabel component="legend">Do you have any of the below symptoms?</FormLabel>
//                 <Select
//                   value={formValues.symptom}
//                   onChange={handleSymptomChange}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>Select a symptom</MenuItem>
//                   <MenuItem value="nervousness">Nervousness</MenuItem>
//                   <MenuItem value="feeling on edge">Feeling on Edge</MenuItem>
//                   <MenuItem value="constant worrying">Constant Worrying</MenuItem>
//                   <MenuItem value="trouble relaxing">Trouble Relaxing</MenuItem>
//                   <MenuItem value="trouble concentrating">Trouble Concentrating</MenuItem>
//                   <MenuItem value="other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//               {formValues.symptom === 'other' && (
//                 <TextField
//                   fullWidth
//                   label="Please specify"
//                   value={formValues.otherSymptom}
//                   onChange={handleOtherSymptomChange}
//                   margin="normal"
//                   inputProps={{ maxLength: 500 }}
//                 />
//               )}
//               {error && <Alert severity="error">{error}</Alert>}
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSymptomNext}
//                 sx={{ mt: 2 }}
//                 style={{ width: "100%" }}
//               >
//                 Submit
//               </Button>
//             </Box>
//           )}
//         </motion.div>

//         <Snackbar
//           open={thankYouOpen}
//           autoHideDuration={2000}
//           onClose={handleThankYouClose}
//           message="Thank you for your response. Have a nice day"
//           action={
//             <IconButton size="small" aria-label="close" color="inherit" onClick={handleThankYouClose}>
//               {/* <CloseIcon fontSize="small" /> */}
//             </IconButton>
//           }
//         />
//       </Box>
//     </Box>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Box, Typography, Snackbar, IconButton, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem, TextField, Button, Alert } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import { createDailyQuestions } from "src/api";
import { motion, useAnimation } from 'framer-motion';

export default function QuestionnaireForm({ username }) {
  const storedUserData = JSON.parse(localStorage.getItem("currentUser"));
  const [step, setStep] = useState(1);
  const [thanksNote, setThanksNote] = useState(false);
  const [formValues, setFormValues] = useState({
    feeling: '',
    reason: '',
    otherReason: '',
    symptom: '',
    otherSymptom: '',
    anxietyLevel: ''
  });
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [anxietyLevelError, setAnxietyLevelError] = useState(false);
  const [error, setError] = useState('');
  const controls = useAnimation();

  useEffect(() => {
    if (isComplete) {
      handleSubmit();
    }
  }, [isComplete]);

  const handleNext = () => {
    setError('');
    if (step === 1 && !formValues.feeling) {
      setError('Please select an option.');
    } else if (step === 2 && (!formValues.anxietyLevel || anxietyLevelError)) {
      setError('Please enter a valid anxiety level between 1 and 10.');
    } else if (step === 3 && !formValues.reason) {
      setError('Please select a reason.');
    } else if (step === 3 && formValues.reason === 'other' && !formValues.otherReason.trim()) {
      setError('Please specify the reason.');
    } else {
      if (formValues.feeling === "satisfied" || formValues.feeling === "excited") {
        setThankYouOpen(true);
        setTimeout(() => {
          setStep(step + 1); // Move to the next step even if feeling is satisfied or excited
        }, 2000);
      } else {
        setStep(step + 1);
      }
    }
  };

  const handleRadioChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      feeling: e.target.value,
    }));
  };

  const handleAnxietyLevelChange = (e) => {
    const value = e.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      anxietyLevel: value,
    }));

    if (value < 1 || value > 10) {
      setAnxietyLevelError(true);
    } else {
      setAnxietyLevelError(false);
    }
  };

  const handleReasonChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      reason: e.target.value,
    }));
  };

  const handleOtherReasonChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      otherReason: e.target.value,
    }));
  };

  const handleSymptomChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      symptom: e.target.value,
    }));
  };

  const handleOtherSymptomChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      otherSymptom: e.target.value,
    }));
  };

  const handleSymptomNext = () => {
    if (formValues.symptom !== 'other' || formValues.otherSymptom.trim() !== '') {
      setIsComplete(true);
    } else {
      setError('Please specify the symptom.');
    }
  };

  const handleSubmit = async () => {
    if (formValues.symptom === '' || (formValues.symptom === 'other' && formValues.otherSymptom.trim() === '')) {
      setError('Please select a symptom.');
      return;
    }

    setThanksNote(true);
    setThankYouOpen(true);
    console.log("Form Data on Submit: ", formValues);

    let reasonVal = formValues.otherReason ? formValues.otherReason : formValues.reason;
    let symptomVal = formValues.otherSymptom ? formValues.otherSymptom : formValues.symptom;

    const data = {
      anxietyLevel: formValues.anxietyLevel,
      feeling: formValues.feeling,
      reason: reasonVal,
      symptom: symptomVal,
      companyId: storedUserData?.company.id,
      userId: storedUserData?.user.id,
      userFirstName: storedUserData.user.firstName,
      userLastName: storedUserData.user.lastName,
      userEmail: storedUserData.user.email,
    };

    console.log("Complete data:", data);
    await createDailyQuestions(data, storedUserData.token);

    controls.start("exitSubmit").then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  const handleThankYouClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setThankYouOpen(false);
  };

  //for animations
  const stepVariants = {
    initial: { opacity: 0, x: '-100vw' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100vw' },
    exitSubmit: { opacity: 0, x: '100vw', y: '100vh' }
  };

  return (
    <Box sx={{ mt: 3, width: '100%' }}>
      <Typography variant="h2" gutterBottom style={{ textAlign: 'center' }}>
        Welcome, {username}!
      </Typography>
      <Box component="form" sx={{ mt: 3 }}>
        <motion.div
          key={step}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={stepVariants}
          transition={{ duration: 0.5 }}
        >
          {step === 1 && (
            <FormControl component="fieldset" sx={{ mb: 2 }} style={{ width: "100%" }}>
              <FormLabel component="legend">How are you feeling today?</FormLabel>
              <RadioGroup
                aria-label="feeling"
                name="feeling"
                value={formValues.feeling}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="satisfied" control={<Radio />} label="😊 Satisfied" />
                <FormControlLabel value="frustrated" control={<Radio />} label="😤 Frustrated" />
                <FormControlLabel value="hurt" control={<Radio />} label="😢 Hurt" />
                <FormControlLabel value="depressed" control={<Radio />} label="😞 Depressed" />
                <FormControlLabel value="anxious" control={<Radio />} label="😰 Anxious" />
                <FormControlLabel value="tired" control={<Radio />} label="😴 Tired" />
                <FormControlLabel value="sad" control={<Radio />} label="😔 Sad" />
                <FormControlLabel value="excited" control={<Radio />} label="🤩 Excited" />
              </RadioGroup>
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ mt: 2 }}
              >
                Next
              </Button>
            </FormControl>
          )}

          {step === 2 && (
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <FormLabel component="legend">What is your level of anxiety?</FormLabel>
                <TextField
                  type="number"
                  inputProps={{ min: 1, max: 10 }}
                  name="anxietyLevel"
                  value={formValues.anxietyLevel}
                  onChange={handleAnxietyLevelChange}
                  fullWidth
                  label="Enter a number from 1 to 10"
                  margin="normal"
                  required
                  error={anxietyLevelError}
                  helperText={anxietyLevelError ? "Value must be in range 1-10" : ""}
                />
                {error && <Alert severity="error">{error}</Alert>}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  sx={{ mt: 2 }}
                >
                  Next
                </Button>
              </FormControl>
            </Box>
          )}

          {step === 3 && (
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <FormLabel component="legend">Reason for feeling this way</FormLabel>
                <Select
                  value={formValues.reason}
                  onChange={handleReasonChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select a reason</MenuItem>
                  <MenuItem value="positivity">Positivity</MenuItem>
                  <MenuItem value="general well being">General Well Being</MenuItem>
                  <MenuItem value="planning">Planning</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="lack of sleep">Lack of Sleep</MenuItem>
                  <MenuItem value="career choices">Career Choices</MenuItem>
                  <MenuItem value="financial">Financial</MenuItem>
                  <MenuItem value="health">Health</MenuItem>
                  <MenuItem value="spiritual">Spiritual</MenuItem>
                  <MenuItem value="mental health">Mental Health</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              {formValues.reason === 'other' && (
                <TextField
                  fullWidth
                  label="Please specify"
                  value={formValues.otherReason}
                  onChange={handleOtherReasonChange}
                  margin="normal"
                  inputProps={{ maxLength: 500 }}
                />
              )}
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ mt: 2 }}
                style={{ width: "100%" }}
              >
                Next
              </Button>
            </Box>
          )}

          {step === 4 && (
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <FormLabel component="legend">Do you have any of the below symptoms?</FormLabel>
                <Select
                  value={formValues.symptom}
                  onChange={handleSymptomChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select a symptom</MenuItem>
                  <MenuItem value="nervousness">Nervousness</MenuItem>
                  <MenuItem value="feeling on edge">Feeling on Edge</MenuItem>
                  <MenuItem value="constant worrying">Constant Worrying</MenuItem>
                  <MenuItem value="trouble relaxing">Trouble Relaxing</MenuItem>
                  <MenuItem value="trouble concentrating">Trouble Concentrating</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              {formValues.symptom === 'other' && (
                <TextField
                  fullWidth
                  label="Please specify"
                  value={formValues.otherSymptom}
                  onChange={handleOtherSymptomChange}
                  margin="normal"
                  inputProps={{ maxLength: 500 }}
                />
              )}
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSymptomNext}
                sx={{ mt: 2 }}
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Box>
          )}
        </motion.div>

        <Snackbar
          open={thankYouOpen}
          autoHideDuration={2000}
          onClose={handleThankYouClose}
          message="Thank you for your response. Have a nice day"
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleThankYouClose}>
              {/* <CloseIcon fontSize="small" /> */}
            </IconButton>
          }
        />
      </Box>
    </Box>
  );
};
