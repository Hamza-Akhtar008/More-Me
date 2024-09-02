import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Autocomplete,
  Chip,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { getUserStartUpQuestions, updateStartUpQuestions } from 'src/api';

const EditPreferencePage = () => {
  // Default hobbies and topics
  const defaultHobbies = [
    'Cooking', 'Baking', 'Reading', 'Outdoor activities', 'Tech/Computers', 
    'Traveling', 'Socializing', 'Gaming', 'Gardening', 'DIY', 'Arts', 
    'Writing', 'Photography'
  ];

  const defaultTopics = [
    'Inspiration', 'Leadership', 'Human behaviour', 'Self-care', 'Physical wellbeing',
    'Mental wellbeing', 'Finance', 'Nutrition', 'Mindfulness'
  ];

  const [questions, setQuestions] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [interestTopics, setInterestTopics] = useState([]);
  const [contentPreferences, setContentPreferences] = useState([]);
  const [error, setError] = useState(false);
  const [maxError, setMaxError] = useState(false);

  const currentUserData = React.useMemo(() => JSON.parse(localStorage.getItem("currentUser")), []);
  const isCompanyUser = currentUserData.user.role === 'user';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserStartUpQuestions(
          currentUserData?.token,
          currentUserData?.company.id,
          currentUserData?.user.id,
          isCompanyUser
        );

        const questionData = response.data[0]; // Assuming the data array has at least one item
        setQuestions([
          { label: 'Hobbies', value: questionData.hobbies },
          { label: 'Interest Topics', value: questionData.interestTopics },
        ]);

        const hobbiesArray = questionData.hobbies ? questionData.hobbies.split(',') : [];
        setHobbies(hobbiesArray);

        const interestTopicsArray = questionData.interestTopics ? questionData.interestTopics.split(',') : [];
        setInterestTopics(interestTopicsArray);

        const contentPreferencesArray = questionData.contentPreferences ? questionData.contentPreferences.split(',') : [];
        setContentPreferences(contentPreferencesArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, [currentUserData, isCompanyUser]);

  const handleHobbyChange = (event, newValue) => {
    if (newValue.length > 5) {
      setMaxError(true);
      return;
    }
    setMaxError(false);
    const uniqueHobbies = newValue.filter((hobby, index) => newValue.indexOf(hobby) === index);
    setHobbies(uniqueHobbies);
    setError(false);
  };

  const handleInterestTopicsChange = (event, newValue) => {
    if (newValue.length > 5) {
      setMaxError(true);
      return;
    }
    const uniqueTopics = newValue.filter((topic, index) => newValue.indexOf(topic) === index);
    setInterestTopics(uniqueTopics);
    setMaxError(false);
  };

  const handleContentPreferenceChange = (event) => {
    const { value } = event.target;
    if (contentPreferences.length < 5 || contentPreferences.includes(value)) {
      setContentPreferences((prev) =>
        prev.includes(value) ? prev.filter((pref) => prev !== value) : [...prev, value]
      );
    } else {
      setMaxError(true);
    }
  };

  const handleSubmit = async () => {
    if (hobbies.length === 0 || interestTopics.length === 0) {
      setError(true);
      return;
    }

    const answer = {
      hobbies,
      interestTopics,
      contentPreferences,
    };

    console.log("Submitting answer:", answer);
    const finalAnswerPersona = {
      ...answer,
      userId: currentUserData.user.id,
      companyId: currentUserData.user.companyId,
    };
    await updateStartUpQuestions(finalAnswerPersona, currentUserData.token);
    window.location.reload();
  };

  return (
    <Card style={{ height: "80vh", overflowY: "auto" }}>
      <CardContent>
        <Typography variant="h4" component="h2" gutterBottom>
          Update Preference
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Autocomplete
            multiple
            freeSolo
            openOnFocus
            id="hobbies-autocomplete"
            options={defaultHobbies}
            value={hobbies}
            onChange={handleHobbyChange}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Search hobbies"
                placeholder="Hobbies"
                error={error || maxError}
                helperText={
                  error ? 'Please select at least one hobby' : 
                  maxError ? 'You can select a maximum of 5 hobbies' : ''
                }
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            style={{ width: '100%' }}
          />
          <Autocomplete
            multiple
            freeSolo
            openOnFocus
            id="topics-autocomplete"
            options={defaultTopics}
            value={interestTopics}
            onChange={handleInterestTopicsChange}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Search interest topics"
                placeholder="Interest Topics"
                error={maxError}
                helperText={
                  maxError ? 'You can select a maximum of 5 interest topics' : ''
                }
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            style={{ width: '100%' }}
          />
          <FormGroup style={{marginRight:"auto"}}>
            <Typography variant="h6" component="h4" gutterBottom>
              Content Preferences
            </Typography>
            {['Reading', 'Video', 'Podcast'].map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={contentPreferences.includes(option)}
                    onChange={handleContentPreferenceChange}
                    value={option}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
          <Button
            onClick={handleSubmit}
            fullWidth
            sx={{ marginTop: 2 }}
            variant="contained"
            color="primary"
            style={{position:"absolute", bottom:"20px", width:"91%"}}
          >
            Update
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EditPreferencePage;
