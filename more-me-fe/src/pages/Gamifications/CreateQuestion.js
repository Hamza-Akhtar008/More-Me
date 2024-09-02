import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { StyledQuestion } from "./Question.styled";
import {
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { createCompanyGamification, getQuestionCategories } from "src/api";
import { useAuth } from "src/context/AuthContext";
import { areas, question_emojies } from "src/utils/baseURL";
import { uploadImageAndGetURL } from "src/utils/uploadImageAndGetURL";
import { useQuery } from "react-query";

const CreateGamification = (props) => {
  const [question, setQuestion] = useState({
    question: "",
    question_options_attributes: [],
  });
  const [options, setOptions] = useState([""]);
  const [image, setImage] = useState(null);
  const [optionImages, setOptionImages] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);

  const [questionType, setQuestionType] = useState(areas[0].name);
  
  const [correctAnswer, setCorrectAnswer] = useState('');

  const [questionCategories, setQuestionCategories] = useState({});
  const [type, setType] = useState("");

  const getMessages = async () => await getQuestionCategories();

  const { data, isLoading, error } = useQuery(
    ["questionCategories"], getMessages);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>;

  const handleTypeChange2 = (event) => {
    setType(event.target.value);
    if (event.target.value == 'yes-no')
    {
      setOptions(['Yes', 'No'])
    }
  };

  const handleTypeChange = (event) => {
    setQuestionType(event.target.value);
  };

  const handleQuestionChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuestion((values) => ({ ...values, [name]: value }));
  };

  const handleOptionChange = (e, index) => {
    const { value } = e.target;
    const list = [...options];
    list[index] = value;
    setOptions(list);
  };

  const handleAdd = () => {
    setOptions([...options, ""]);
  };

  const handleRemove = (index) => {
    const list = [...options];
    list.splice(index, 1);
    setOptions(list);
    if (type === "multiple-img-choice") {
      const list = [...optionImages];
      list.splice(index, 1);
      setOptionImages(list);
    }
  };
  const handleImageChange = (e, index) => {
    if (type === "multiple-img-choice") {
      const list = [...optionImages];
      list[index] = e.target.files[0];
      setOptionImages(list);
    } else {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "multiple-img-choice" && optionImages.length !== options.length) {
      toast.error(`All options with image required`)
      return
    };
    
    const storedUserData = JSON.parse(localStorage.getItem("currentUser"));
    setLoading(true);
    let optionWithImages = [];
    let img = '';
    if (type === "multiple-img-choice") {
      for (let i = 0; i < optionImages.length; i++ ) {
        const url = await uploadImageAndGetURL(optionImages[i]);
        const option = JSON.stringify({
          text: options[i],
          img: url
        })
        optionWithImages.push(option)
      }
    } else {
      img = await uploadImageAndGetURL(image);
    }
    const data = {
      text: question.question,
      options: type === "multiple-img-choice" ? optionWithImages : options,
      companyId: userData?.company.id,
      type: type,
      questionCategoryId: questionType,
      image: img ? img : "",
      correctOption: correctAnswer,
    };

    await createCompanyGamification([data], storedUserData.token).then(
      (response) => {
        if (response.code === 200) {
          window.location.reload()
          // toast.success(`Question added successfully!`)

          setQuestion({ question: "" });
          setOptions([""]);
        } else {
          toast.error(`Some error occured`);
        }
      }
    );
    setLoading(false);
  };

  return (
    <StyledQuestion>
      {/* <StyledForm> */}
      <div className="main">
        <p className="form-title text-center text-xl font-semibold">Add Gamification</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <TextareaAutosize
            type="text"
            name="question"
            value={question.question || ""}
            onChange={handleQuestionChange}
            placeholder="Enter Gamification Headline"
            required="required"
            minRows={3}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />

          <div className="mb-2 mt-2">
            <FormControl fullWidth sx={{ fieldset: { legend: {maxWidth: '100%'}} }}>
              <InputLabel id="demo-simple-select-label" inputlabelprops={{ shrink: true }}>
                Select Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={questionType}
                label="Age"
                onChange={handleTypeChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                {data?.data?.map((area, index) => (
                  <MenuItem value={area.id}>{area.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div
            className="question-type"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <FormControl fullWidth>
              <InputLabel id="type-label">Select Type</InputLabel>
              <Select
                labelId="type-label"
                id="type-select"
                value={type}
                onChange={handleTypeChange2}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
                <MenuItem value="single-choice">Single Choice</MenuItem>
                {/* <MenuItem value="input">Input</MenuItem> */}
                {/* <MenuItem value="emoji">Emoji</MenuItem> */}
                <MenuItem value="yes-no">Yes/No</MenuItem>
                <MenuItem value="multiple-img-choice">Options with Image</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="mb-2 mt-2">
            <FormControl fullWidth sx={{ fieldset: { legend: {maxWidth: '100%'}} }}>
              <InputLabel id="demo-simple-select-label" inputlabelprops={{ shrink: true }}>
                Select Correct Option
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={questionType}
                label="Age"
                onChange={(e) => {setCorrectAnswer(e.target.value)}}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                {type == "yes-no" ?
                  options?.map((value, index) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))
                  :
                  options?.map((value, index) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>

          {(type !== "multiple-img-choice") && <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />}
          {imageURL && (
            <img src={imageURL} alt="Uploaded" width="200px" height="200px" />
          )}

          {(type == "multiple-choice" || type == "single-choice") && (
            <div className="mt-4">
            <div className="space-y-4">
              {options.map((value, index) => (
                <div className="flex items-center space-x-4" key={index}>
                  <Input
                    type="text"
                    name="option"
                    value={value || ""}
                    onChange={(e) => handleOptionChange(e, index)}
                    placeholder={`Option ${index + 1}`}
                    required
                    className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
        
                  {/* Render remove button for each option except the last one */}
                  {options.length !== 1 && (
                    <Button onClick={() => handleRemove(index)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                      Remove
                    </Button>
                  )}
        
                  {/* Render add button for the last option */}
                  {options.length - 1 === index && (
                    <Button variant="outlined" onClick={() => handleAdd()} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Add New
                    </Button>
                  )}
                </div>
              ))}
            </div>
            </div>
          )}

          {(type == "multiple-img-choice") && (
            <div>
              <div className="question-option">
                {options.map((value, index) => (
                  <div className="" key={index}>
                    <Input
                      type="text"
                      name="option"
                      value={value || ""}
                      onChange={(e) => handleOptionChange(e, index)}
                      placeholder="Gamification option text"
                      required="required"
                      width="30%"
                      radius="5px"
                      className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />

                    <input required type="file" accept="image/png, image/jpeg" onChange={(e) => handleImageChange(e, index)} />

                    <div className="options-btn">
                      {options.length !== 1 && (
                        <Button onClick={() => handleRemove(index)}>
                          Remove
                        </Button>
                      )}

                      {options.length - 1 === index && (
                        <Button variant="outlined" onClick={() => handleAdd()}>
                          Add New
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(type == "emoji") && (
            <>
              <Divider className="m-3"/>
              <Typography className="m-0 text-xl">Options visible to user:</Typography>
              <FormGroup className="justify-center	flex-nowrap flex flex-row">
              {question_emojies.map((emoji) => (
                <Card
                  className="flex justify-center px-4 py-4 m-2 cursor-default border-solid border-slate-400"
                >
                  <Typography className="m-0 text-3xl">{emoji.name}</Typography>
                </Card>
              ))}
            </FormGroup>
            </>
          )}
          
          {(type == "yes-no") && (
            <>
              <Divider className="m-3"/>
              <Typography className="m-0 text-xl">Options visible to user:</Typography>
              <FormGroup className="justify-center	flex-nowrap flex flex-row">
              {["✅ Yes", "❌ No"].map((emoji) => (
                <Card
                  className="flex justify-center px-4 py-4 m-2 cursor-default border-solid border-slate-400"
                >
                  <Typography className="m-0 text-3xl">{emoji}</Typography>
                </Card>
              ))}
            </FormGroup>
            </>
          )}

          {!loading && (
            <input
              type="submit"
              className="submit mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
          )}
        </form>
      </div>
      {/* </StyledForm> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </StyledQuestion>
  );
};

export default CreateGamification;
