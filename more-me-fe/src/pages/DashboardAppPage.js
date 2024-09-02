// import { useEffect, useState } from 'react';
// import * as React from 'react';
// import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// import { useNavigate } from 'react-router-dom';
// // @mui
// import { useTheme } from '@mui/material/styles';
// import {
//   Button,
//   Box,
//   Grid,
//   Container,
//   Typography,
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Collapse,
//   List,
//   ListItem,
//   ListItemText,
//   Card,
//   CardHeader,
//   IconButton,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import Questionnaire from 'src/components/feedback/dailyQuestions';
// import { getAllDailyQuestions, getUserStartUpQuestions, getArticlesFromTopicAndContentPref } from 'src/api';
// import { toast } from 'react-toastify';
// import Chip from '@mui/material/Chip';
// import { styled } from '@mui/system';

// // components
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppCurrentSubject,
// } from '../sections/@dashboard/app';
// import DashLeaderBoard from './DashLeaderBoard';
// import ThreadPage from 'src/components/thread/ThreadPage';
// import { QUESTIONS_ANSWERED, areas } from 'src/utils/baseURL';
// import { useProfileSetUp } from '../App';

// // Add the path to the uploaded image
// const backgroundImagePath = '/mnt/data/image.png';

// const ArticleCard = styled(Card)(({ theme, background }) => ({
//   position: 'relative', // Ensure positioning context
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'flex-end',
//   backgroundImage: `url(${background})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   padding: '1rem',
//   color: '#fff',
//   borderRadius: '8px',
//   marginBottom: '1rem',
//   height: '150px', // Set a fixed height for the cards
//   '&:hover': {
//     filter: 'brightness(0.8)', // Adjust the hover effect if necessary
//   },
// }));

// const ArticleTitle = styled(Typography)({
//   position: 'absolute',
//   bottom: '0',
//   left: '0',
//   right: '0',
//   color: '#fff',
//   background: 'rgba(0, 0, 0, 0.5)',
//   padding: '0.5rem',
//   borderRadius: '4px',
// });

// export default function DashboardAppPage() {
//   const [user, setUser] = useState({});
//   const [openQuestionare, setOpenQuestionare] = useState(false);
//   const [troubleEmpData, setTroubleEmpData] = useState([]);
//   const [troubledUsers, setTroubledUsers] = useState([]);
//   const [hobbies, setHobbies] = useState([]);
//   const [interestTopics, setInterestTopics] = useState([]);
//   const [contentPreferences, setContentPreferences] = useState([]);
//   const [expandedTopic, setExpandedTopic] = useState(null);
//   const [articles, setArticles] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [courseStartIndex, setCourseStartIndex] = useState(1); // Added state for course start index
//   const { profileSetUp, setProfileSetUp } = useProfileSetUp();

//   const lastShownTimestamp = localStorage.getItem('snackbarLastShown');
//   let today = new Date().toLocaleDateString();

//   useEffect(() => {
//     const userObj = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
//     setUser(userObj.user);
//   }, []);

//   const theme = useTheme();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const userObj = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
//       if (userObj.user.role === 'admin') {
//         const isCompanyAdmin = userObj.user.role === 'admin';
//         try {
//           let questionData = await getAllDailyQuestions(userObj?.token, userObj?.company.id, isCompanyAdmin).then(
//             (res) => res.data
//           );

//           // Example data for testing
//           questionData = [
//             {
//               createdAt: '2024-05-20T20:35:32.038Z',
//               feeling: 'sad',
//               userId: 1,
//               companyId: 1,
//               firstName: 'John',
//               lastName: 'Doe',
//               email: 'john.doe@example.com',
//               anxietyLevel: 5,
//               reason: 'work stress',
//               symptom: 'headache',
//               hobbies: ['Gardening', 'Reading'],
//             },
//             {
//               createdAt: '2024-05-21T20:35:32.038Z',
//               feeling: 'sad',
//               userId: 1,
//               companyId: 1,
//               firstName: 'John',
//               lastName: 'Doe',
//               email: 'john.doe@example.com',
//               anxietyLevel: 6,
//               reason: 'work stress',
//               symptom: 'insomnia',
//               hobbies: 'Socializing',
//             },
//             {
//               createdAt: '2024-05-22T20:35:32.038Z',
//               feeling: 'sad',
//               userId: 1,
//               companyId: 1,
//               firstName: 'John',
//               lastName: 'Doe',
//               email: 'john.doe@example.com',
//               anxietyLevel: 7,
//               reason: 'work stress',
//               symptom: 'fatigue',
//             },
//             {
//               createdAt: '2024-05-23T20:35:32.038Z',
//               feeling: 'sad',
//               userId: 1,
//               companyId: 1,
//               firstName: 'John',
//               lastName: 'Doe',
//               email: 'john.doe@example.com',
//               anxietyLevel: 8,
//               reason: 'work stress',
//               symptom: 'lack of concentration',
//             },
//             {
//               createdAt: '2024-05-24T20:35:32.038Z',
//               feeling: 'sad',
//               userId: 1,
//               companyId: 1,
//               firstName: 'John',
//               lastName: 'Doe',
//               email: 'john.doe@example.com',
//               anxietyLevel: 9,
//               reason: 'work stress',
//               symptom: 'irritability',
//             },
//             {
//               createdAt: '2024-05-20T20:35:32.038Z',
//               feeling: 'happy',
//               userId: 2,
//               companyId: 1,
//               firstName: 'Jane',
//               lastName: 'Smith',
//               email: 'jane.smith@example.com',
//               anxietyLevel: 2,
//               reason: 'good day at work',
//               symptom: 'none',
//             },
//           ];
//           setTroubleEmpData(questionData);

//           // Function to check if dates are consecutive
//           const areConsecutiveDates = (dates) => {
//             for (let i = 0; i < dates.length - 1; i++) {
//               const date1 = new Date(dates[i]);
//               const date2 = new Date(dates[i + 1]);
//               const diffInDays = (date2 - date1) / (1000 * 60 * 60 * 24);

//               if (diffInDays !== 1) {
//                 return false;
//               }
//             }
//             return true;
//           };

//           const groupedData = questionData.reduce((acc, curr) => {
//             if (!acc[curr.userId]) {
//               acc[curr.userId] = [];
//             }
//             acc[curr.userId].push(curr);
//             return acc;
//           }, {});

//           const usersWithIssues = [];
//           Object.keys(groupedData).forEach((userid) => {
//             const userEntries = groupedData[userid];
//             const sadEntries = userEntries.filter((entry) => entry.feeling === 'sad');
//             sadEntries.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

//             if (sadEntries.length >= 5) {
//               for (let i = 0; i <= sadEntries.length - 5; i++) {
//                 const dateSlice = sadEntries.slice(i, i + 5).map((entry) => entry.createdAt);
//                 if (areConsecutiveDates(dateSlice)) {
//                   usersWithIssues.push(userEntries[0]);
//                   break;
//                 }
//               }
//             }
//           });
//           setTroubledUsers(usersWithIssues);
//         } catch (error) {
//           console.error(error);
//         }
//       } else {
//         setTroubleEmpData([]);
//         setTroubledUsers([]);
//       }
//     };
//     fetchData();
//   }, [navigate]);

//   useEffect(() => {
//     const fetchData2 = async () => {
//       const userObj = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
//       if (userObj.user.role === 'user') {
//         const isCompanyUser = userObj.user.role === 'user';
//         const questionData = await getUserStartUpQuestions(
//           userObj?.token,
//           userObj?.company.id,
//           userObj?.user.id,
//           isCompanyUser
//         ).then((res) => res.data);

//         const hobbiesData = questionData
//           .map((q) => (Array.isArray(q.hobbies) ? q.hobbies : q.hobbies.split(',')))
//           .flat()
//           .filter(Boolean);
//         const interestsData = questionData
//           .map((q) => (Array.isArray(q.interestTopics) ? q.interestTopics : q.interestTopics.split(',')))
//           .flat()
//           .filter(Boolean);
//         const contentPreferencesData = questionData
//           .map((q) =>
//             Array.isArray(q.contentPreferences) ? q.contentPreferences : q.contentPreferences.split(',')
//           )
//           .flat()
//           .filter(Boolean);

//         setHobbies(hobbiesData);
//         setInterestTopics(interestsData);
//         setContentPreferences(contentPreferencesData);

//         localStorage.setItem('userHobbies', JSON.stringify(hobbiesData));
//         localStorage.setItem('userInterestTopics', JSON.stringify(interestsData));
//         localStorage.setItem('userContentPreferences', JSON.stringify(contentPreferencesData));

//         if (!questionData || questionData.length === 0) {
//           setProfileSetUp(!profileSetUp);
//         } else {
//           const questionUserId = questionData[0].userId;
//           if (profileSetUp && (!questionUserId || questionUserId < 0)) {
//             setProfileSetUp(true);
//             navigate('/questionnaire');
//           } else {
//             const lastShownTimestamp = localStorage.getItem('snackbarLastShown');
//             const today = new Date().toLocaleDateString();
//             if (lastShownTimestamp !== today || lastShownTimestamp === null) {
//               setOpenQuestionare(true);
//               setProfileSetUp(true);
//               localStorage.setItem('snackbarLastShown', today);
//             } else {
//               setOpenQuestionare(false);
//             }
//           }
//         }
//       }
//     };
//     fetchData2();
//   }, [navigate, setProfileSetUp]);

//   const handleClose = () => {
//     setOpenQuestionare(false);
//   };

//   const handleInterestExpand = async (topic) => {
//     if (expandedTopic === topic) {
//       setExpandedTopic(null);
//       return;
//     }
//     try {
//       const result = await getArticlesFromTopicAndContentPref({ topic, contentPreferences });
//       if (result && result.items) {
//         const filteredArticles = result.items.slice(0, 3);
//         setArticles(filteredArticles);
//         setExpandedTopic(topic);
//       } else {
//         toast.error('No articles found');
//       }
//     } catch (error) {
//       console.error('Error while fetching articles', error);
//       toast.error('Error while fetching articles');
//     }
//   };

//   const fetchCourses = async (startIndex = 1) => {
//     console.log("topic", interestTopics);
//     if (interestTopics.length > 0 && contentPreferences.length > 0) {
//       try {
//         const result = await getArticlesFromTopicAndContentPref({ topic: interestTopics.join(' '), contentPreferences, start: startIndex });
//         if (result && result.items) {
//           if (startIndex === 1) {
//             setCourses(result.items);
//           } else {
//             setCourses((prevCourses) => [...prevCourses, ...result.items]);
//           }
//         } else {
//           toast.error('No courses found');
//         }
//       } catch (error) {
//         console.error('Error while fetching courses', error);
//         toast.error('Error while fetching courses');
//       }
//     } else {
//       toast.error('No interest topics or content preferences provided');
//     }
//   };

//   const handleLoadMore = () => {
//     setCourseStartIndex((prevStartIndex) => {
//       const newIndex = prevStartIndex + 10;
//       fetchCourses(newIndex);
//       return newIndex;
//     });
//   };

//   useEffect(() => {
//     if (interestTopics.length > 0) {
//       fetchCourses();
//     }
//   }, [interestTopics]);

//   return (
//     <>
//       <Helmet>
//         <title> Dashboard | More.Me </title>
//       </Helmet>

//       <div>
//         <Dialog open={openQuestionare} onClose={handleClose} maxWidth="sm" fullWidth>
//           <DialogContent>
//             <Questionnaire username={user.firstName} />
//           </DialogContent>
//           <DialogActions></DialogActions>
//         </Dialog>
//       </div>

//       <Container maxWidth="xl">
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6} lg={12}>
//             {['admin', 'super-admin'].includes(user.role) ? (
//               <AppWebsiteVisits
//                 title="Employees Onboarded by Companies"
//                 subheader="(+43%) than last year"
//                 chartLabels={[
//                   '01/01/2003',
//                   '02/01/2003',
//                   '03/01/2003',
//                   '04/01/2003',
//                   '05/01/2003',
//                   '06/01/2003',
//                   '07/01/2003',
//                   '08/01/2003',
//                   '09/01/2003',
//                   '10/01/2003',
//                   '11/01/2003',
//                 ]}
//                 chartData={[
//                   {
//                     name: 'Alpha A',
//                     type: 'column',
//                     fill: 'solid',
//                     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//                   },
//                   {
//                     name: 'Beta B',
//                     type: 'area',
//                     fill: 'gradient',
//                     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
//                   },
//                   {
//                     name: 'Gamma C',
//                     type: 'line',
//                     fill: 'solid',
//                     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
//                   },
//                 ]}
//               />
//             ) : (
//               <></>
//             )}
//           </Grid>

//           {/* New Section for Hobbies and Interest */}
//           {user.role === 'user' && (
//             <Grid item xs={12} md={12} lg={12}>
//               <Card>
//                 <CardHeader title="Selected Areas" subheader="Your Hobbies and Interests" />
//                 <Grid container>
//                   <Grid item xs={6}>
//                     <Box sx={{ p: 4, pb: 4, flexWrap: 'wrap', alignItems: 'center' }} dir="ltr">
//                       <Typography variant="h6">Hobbies</Typography>
//                       {hobbies.length > 0 ? (
//                         hobbies.map((hobby) => (
//                           <Chip
//                             key={hobby}
//                             label={hobby}
//                             component="a"
//                             href="#basic-chip"
//                             variant="outlined"
//                             clickable
//                             className="w-[200px] h-[100px] rounded-lg bg-sky-200 font-semibold mr-3 ml-5 mt-5"
//                           />
//                         ))
//                       ) : (
//                         <Typography>No hobbies available</Typography>
//                       )}
//                     </Box>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Box sx={{ p: 4, pb: 4, flexWrap: 'wrap', alignItems: 'center' }} dir="ltr">
//                       <Typography variant="h6">Interest Topics</Typography>
//                       {interestTopics.length > 0 ? (
//                         interestTopics.map((topic) => (
//                           <div key={topic}>
//                             <Chip
//                               className="w-[200px] h-[100px] rounded-lg bg-sky-200 font-semibold mr-3 ml-5 mt-5"
//                               variant="outlined"
//                               label={topic}
//                               clickable
//                               onClick={() => handleInterestExpand(topic)}
//                               icon={expandedTopic === topic ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                               sx={{
//                                 transition: 'all 1.0s ease-in-out', // slower animation
//                               }}
//                             />
//                             <Collapse in={expandedTopic === topic} timeout="auto" unmountOnExit>
//                               <List>
//                                 {articles.length > 0 ? (
//                                   articles.map((article, index) => (
//                                     <ArticleCard
//                                       key={index}
//                                       component="a"
//                                       href={article.link}
//                                       target="_blank"
//                                       rel="noopener noreferrer"
//                                       background={article.pagemap?.cse_image?.[0]?.src || backgroundImagePath}
//                                     >
//                                       <ArticleTitle variant="h6">{article.title}</ArticleTitle>
//                                     </ArticleCard>
//                                   ))
//                                 ) : (
//                                   <Typography>No articles available</Typography>
//                                 )}
//                               </List>
//                             </Collapse>
//                           </div>
//                         ))
//                       ) : (
//                         <Typography>No interest topics available</Typography>
//                       )}
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Card>
//             </Grid>
//           )}

//           {/* New Section for Courses You Might Be Interested In */}
//           {courses.length > 0 && (
//             <Grid item xs={12} md={12} lg={12}>
//               <Card>
//                 <CardHeader title="Courses You Might Be Interested In" />
//                 <Box sx={{ p: 4, pb: 4, flexWrap: 'wrap', alignItems: 'center' }} dir="ltr">
//                   <Grid container spacing={2}>
//                     {courses.map((course, index) => (
//                       <Grid item xs={12} md={6} key={index}>
//                         <ArticleCard
//                           component="a"
//                           href={course.link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           background={course.pagemap?.cse_image?.[0]?.src || backgroundImagePath}
//                         >
//                           <ArticleTitle variant="h6">{course.title}</ArticleTitle>
//                         </ArticleCard>
//                       </Grid>
//                     ))}
//                   </Grid>
//                   {courses.length >= 10 && (
//                     <Button
//                       type="button"
//                       fullWidth
//                       color="secondary"
//                       onClick={handleLoadMore}
//                       sx={{ mt: 2, mb: 1 }}
//                     >
//                       Load More
//                     </Button>
//                   )}
//                 </Box>
//               </Card>
//             </Grid>
//           )}

//           {/* dynamic content for user side */}
//           <Grid item xs={12} md={6} lg={4}>
//             <AppCurrentVisits
//               title="Rewards based Leader Board"
//               chartData={[
//                 { label: 'America', value: 4344 },
//                 { label: 'Asia', value: 5435 },
//                 { label: 'Europe', value: 1443 },
//                 { label: 'Africa', value: 4443 },
//               ]}
//               chartColors={[
//                 theme.palette.primary.main,
//                 theme.palette.info.main,
//                 theme.palette.warning.main,
//                 theme.palette.error.main,
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={8}>
//             {/* <AppNewsUpdate
//               className="mb-5"
//               title="Motivation & Leadership Courses"
//               list={[...Array(2)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: faker.name.jobTitle(),
//                 description: faker.name.jobTitle(),
//                 image: `/assets/images/covers/cover_${index + 1}.jpg`,
//                 postedAt: faker.date.recent(),
//               }))}
//             /> */}
//             <AppNewsUpdate
//               title="Company Suggested Courses"
//               list={[...Array(3)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: faker.name.jobTitle(),
//                 description: faker.name.jobTitle(),
//                 image: `/assets/images/covers/cover_${index + 1}.jpg`,
//                 postedAt: faker.date.recent(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppCurrentSubject
//               title="Your Activity Breakdown"
//               chartLabels={['Connects', 'Policies', 'Tasks', 'Announcements', 'Courses', 'Buy n Sell']}
//               chartData={[
//                 { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
//                 { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
//                 { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
//               ]}
//               chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={6}>
//             <DashLeaderBoard />
//           </Grid>

//           <Grid item xs={12} md={6} lg={6}>
//             <AppTasks
//               title="Assigned Tasks"
//               list={[
//                 { id: '1', label: 'Create FireStone Logo' },
//                 { id: '2', label: 'Add SCSS and JS files if required' },
//                 { id: '3', label: 'Stakeholder Meeting' },
//                 { id: '4', label: 'Scoping & Estimations' },
//                 { id: '6', label: 'Sprint Planning' },
//                 { id: '7', label: 'Line Up' },
//                 { id: '8', label: 'Retrospective Meeting' },
//               ]}
//             />
//           </Grid>

//           {user.role === 'user' && (
//             <Grid item xs={12} md={6} lg={12}>
//               <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
//                 <ThreadPage />

//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   onClick={() => navigate('/dashboard/thread')}
//                   sx={{ mt: 2, mb: 1, width: 200, display: 'flex', alignSelf: 'center' }}
//                 >
//                   See all threads
//                 </Button>
//               </Card>
//             </Grid>
//           )}

//           {user.role === 'admin' && troubledUsers.length > 0 && (
//             <Grid item xs={12} md={6} lg={12}>
//               <Card>
//                 <CardHeader title="List of Troubled Employees" />
//                 <List>
//                   {troubledUsers.map((employee) => (
//                     <ListItem key={employee.userId}>
//                       <ListItemText
//                         primary={`${employee.firstName} ${employee.lastName}`}
//                         secondary={`Email: ${employee.email}`}
//                       />
//                     </ListItem>
//                   ))}
//                 </List>
//               </Card>
//             </Grid>
//           )}
//         </Grid>
//       </Container>
//     </>
//   );
// }

import { useEffect, useState } from 'react';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Box,
  Grid,
  Container,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Card,
  CardHeader,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Questionnaire from 'src/components/feedback/dailyQuestions';
import { getAllDailyQuestions, getUserStartUpQuestions, getArticlesFromTopicAndContentPref } from 'src/api';
import { toast } from 'react-toastify';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


// components
import {
  AppTasks,
  AppNewsUpdate,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppCurrentSubject,
} from '../sections/@dashboard/app';
import DashLeaderBoard from './DashLeaderBoard';
import ThreadPage from 'src/components/thread/ThreadPage';
import { QUESTIONS_ANSWERED, areas } from 'src/utils/baseURL';
import { useProfileSetUp } from '../App';

// Add the path to the uploaded image
const backgroundImagePath = '/mnt/data/image.png';

const ArticleCard = styled(Card)(({ theme, background }) => ({
  position: 'relative', // Ensure positioning context
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '1rem',
  color: '#fff',
  borderRadius: '8px',
  marginBottom: '1rem',
  height: '150px', // Set a fixed height for the cards
  '&:hover': {
    filter: 'brightness(0.8)', // Adjust the hover effect if necessary
  },
}));

const ArticleTitle = styled(Typography)({
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  color: '#fff',
  background: 'rgba(0, 0, 0, 0.5)',
  padding: '0.5rem',
  borderRadius: '4px',
});

const RewardIcon = styled('div')`
  display: inline-block;
  margin-right: 8px;
`;

const calculateRewards = (points) => {
  let stars = Math.floor(points / 10);
  let cups = Math.floor(stars / 5);
  stars = stars % 5; // Remaining stars after converting to cups
  let trophies = Math.floor(cups / 5);
  cups = cups % 5; // Remaining cups after converting to trophies
  return { stars, cups, trophies };
};


export default function DashboardAppPage() {
  const [user, setUser] = useState({});
  const [openQuestionare, setOpenQuestionare] = useState(false);
  const [troubleEmpData, setTroubleEmpData] = useState([]);
  const [troubledUsers, setTroubledUsers] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [interestTopics, setInterestTopics] = useState([]);
  const [contentPreferences, setContentPreferences] = useState([]);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [articles, setArticles] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseStartIndex, setCourseStartIndex] = useState(1); // Added state for course start index
  const { profileSetUp, setProfileSetUp } = useProfileSetUp();

  const lastShownTimestamp = localStorage.getItem('snackbarLastShown');
  let today = new Date().toLocaleDateString();

  // Dummy variable for reward points
  const rewardPoints = 1230;

  const { stars, cups, trophies } = calculateRewards(rewardPoints);

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    setUser(userObj.user);
    
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userObj = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
      if (userObj.user.role === 'admin') {
        const isCompanyAdmin = userObj.user.role === 'admin';
        try {
          let questionData = await getAllDailyQuestions(userObj?.token, userObj?.company.id, isCompanyAdmin).then(
            (res) => res.data
          );

          // Example data for testing
          questionData = [
            {
              createdAt: '2024-05-20T20:35:32.038Z',
              feeling: 'sad',
              userId: 1,
              companyId: 1,
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              anxietyLevel: 5,
              reason: 'work stress',
              symptom: 'headache',
              hobbies: ['Gardening', 'Reading'],
            },
            {
              createdAt: '2024-05-21T20:35:32.038Z',
              feeling: 'sad',
              userId: 1,
              companyId: 1,
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              anxietyLevel: 6,
              reason: 'work stress',
              symptom: 'insomnia',
              hobbies: 'Socializing',
            },
            {
              createdAt: '2024-05-22T20:35:32.038Z',
              feeling: 'sad',
              userId: 1,
              companyId: 1,
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              anxietyLevel: 7,
              reason: 'work stress',
              symptom: 'fatigue',
            },
            {
              createdAt: '2024-05-23T20:35:32.038Z',
              feeling: 'sad',
              userId: 1,
              companyId: 1,
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              anxietyLevel: 8,
              reason: 'work stress',
              symptom: 'lack of concentration',
            },
            {
              createdAt: '2024-05-24T20:35:32.038Z',
              feeling: 'sad',
              userId: 1,
              companyId: 1,
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              anxietyLevel: 9,
              reason: 'work stress',
              symptom: 'irritability',
            },
            {
              createdAt: '2024-05-20T20:35:32.038Z',
              feeling: 'happy',
              userId: 2,
              companyId: 1,
              firstName: 'Jane',
              lastName: 'Smith',
              email: 'jane.smith@example.com',
              anxietyLevel: 2,
              reason: 'good day at work',
              symptom: 'none',
            },
          ];
          setTroubleEmpData(questionData);

          // Function to check if dates are consecutive
          const areConsecutiveDates = (dates) => {
            for (let i = 0; i < dates.length - 1; i++) {
              const date1 = new Date(dates[i]);
              const date2 = new Date(dates[i + 1]);
              const diffInDays = (date2 - date1) / (1000 * 60 * 60 * 24);

              if (diffInDays !== 1) {
                return false;
              }
            }
            return true;
          };

          const groupedData = questionData.reduce((acc, curr) => {
            if (!acc[curr.userId]) {
              acc[curr.userId] = [];
            }
            acc[curr.userId].push(curr);
            return acc;
          }, {});

          const usersWithIssues = [];
          Object.keys(groupedData).forEach((userid) => {
            const userEntries = groupedData[userid];
            const sadEntries = userEntries.filter((entry) => entry.feeling === 'sad');
            sadEntries.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

            if (sadEntries.length >= 5) {
              for (let i = 0; i <= sadEntries.length - 5; i++) {
                const dateSlice = sadEntries.slice(i, i + 5).map((entry) => entry.createdAt);
                if (areConsecutiveDates(dateSlice)) {
                  usersWithIssues.push(userEntries[0]);
                  break;
                }
              }
            }
          });
          setTroubledUsers(usersWithIssues);
        } catch (error) {
          console.error(error);
        }
      } else {
        setTroubleEmpData([]);
        setTroubledUsers([]);
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchData2 = async () => {
      const userObj = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
      if (userObj.user.role === 'user') {
        const isCompanyUser = userObj.user.role === 'user';
        const questionData = await getUserStartUpQuestions(
          userObj?.token,
          userObj?.company.id,
          userObj?.user.id,
          isCompanyUser
        ).then((res) => res.data);

        const hobbiesData = questionData
          .map((q) => (Array.isArray(q.hobbies) ? q.hobbies : q.hobbies.split(',')))
          .flat()
          .filter(Boolean);
        const interestsData = questionData
          .map((q) => (Array.isArray(q.interestTopics) ? q.interestTopics : q.interestTopics.split(',')))
          .flat()
          .filter(Boolean);
        const contentPreferencesData = questionData
          .map((q) =>
            Array.isArray(q.contentPreferences) ? q.contentPreferences : q.contentPreferences.split(',')
          )
          .flat()
          .filter(Boolean);

        setHobbies(hobbiesData);
        setInterestTopics(interestsData);
        setContentPreferences(contentPreferencesData);

        localStorage.setItem('userHobbies', JSON.stringify(hobbiesData));
        localStorage.setItem('userInterestTopics', JSON.stringify(interestsData));
        localStorage.setItem('userContentPreferences', JSON.stringify(contentPreferencesData));
        console.log("questionData", questionData);
        if (!questionData || questionData.length > 0) {
          setProfileSetUp(true);
          console.log("profileSetUp", profileSetUp);
          const lastShownTimestamp = localStorage.getItem('snackbarLastShown');
            let today = new Date().toLocaleDateString();
            //today = "15/11/2023"
            console.log("lastShownTimestamp", lastShownTimestamp);
            if (lastShownTimestamp !== today || lastShownTimestamp === null) {
              console.log("Daily Questions active");
              setOpenQuestionare(true);
              setProfileSetUp(true);
              localStorage.setItem('snackbarLastShown', today);
            } else {
              setOpenQuestionare(false);
            }
        } else {
          //const questionUserId = questionData[0].userId;
          if (questionData.length === 0) {
            setProfileSetUp(false);
            navigate('/questionnaire');
          } else {
            
          }
        }
      }
    };
    fetchData2();
  }, [navigate, setProfileSetUp]);

  const handleClose = () => {
    setOpenQuestionare(false);
  };

  const handleInterestExpand = async (topic) => {
    if (expandedTopic === topic) {
      setExpandedTopic(null);
      return;
    }
    try {
      const result = await getArticlesFromTopicAndContentPref({ topic, contentPreferences });
      if (result && result.items) {
        const filteredArticles = result.items.slice(0, 3);
        setArticles(filteredArticles);
        setExpandedTopic(topic);
      } else {
        toast.error('No articles found');
      }
    } catch (error) {
      console.error('Error while fetching articles', error);
      toast.error('Error while fetching articles');
    }
  };

  const fetchCourses = async (startIndex = 1) => {
    console.log("topic", interestTopics);
    if (interestTopics.length > 0 && contentPreferences.length > 0) {
      try {
        const result = await getArticlesFromTopicAndContentPref({ topic: interestTopics.join(' '), contentPreferences, start: startIndex });
        if (result && result.items) {
          if (startIndex === 1) {
            setCourses(result.items);
          } else {
            setCourses((prevCourses) => [...prevCourses, ...result.items]);
          }
        } else {
          toast.error('No courses found');
        }
      } catch (error) {
        console.error('Error while fetching courses', error);
        toast.error('Error while fetching courses');
      }
    } else {
      toast.error('No interest topics or content preferences provided');
    }
  };

  const handleLoadMore = () => {
    setCourseStartIndex((prevStartIndex) => {
      const newIndex = prevStartIndex + 10;
      fetchCourses(newIndex);
      return newIndex;
    });
  };

  useEffect(() => {
    if (interestTopics.length > 0) {
      fetchCourses();
    }
  }, [interestTopics]);

  return (
    <>
      <Helmet>
        <title> Dashboard | More.Me </title>
      </Helmet>

      <div>
        <Dialog open={openQuestionare} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogContent>
            <Questionnaire username={user.firstName} />
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            {['admin', 'super-admin'].includes(user.role) ? (
              <AppWebsiteVisits
                title="Employees Onboarded by Companies"
                subheader="(+43%) than last year"
                chartLabels={[
                  '01/01/2003',
                  '02/01/2003',
                  '03/01/2003',
                  '04/01/2003',
                  '05/01/2003',
                  '06/01/2003',
                  '07/01/2003',
                  '08/01/2003',
                  '09/01/2003',
                  '10/01/2003',
                  '11/01/2003',
                ]}
                chartData={[
                  {
                    name: 'Alpha A',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: 'Beta B',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: 'Gamma C',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ]}
              />
            ) : (
              <></>
            )}
          </Grid>

          {/* New Section for Hobbies and Interest */}
          {user.role === 'user' && (
            <Grid item xs={12} md={12} lg={6}>
              <Card>
                <CardHeader title="Selected Areas" subheader="Your Hobbies and Interests" />
                <Grid container>
                  <Grid item xs={6}>
                    <Box sx={{ p: 4, pb: 4, flexWrap: 'wrap', alignItems: 'center' }} dir="ltr">
                      <Typography variant="h6">Hobbies</Typography>
                      {hobbies.length > 0 ? (
                        hobbies.map((hobby) => (
                          <Chip
                            key={hobby}
                            label={hobby}
                            component="a"
                            href="#basic-chip"
                            variant="outlined"
                            clickable
                            className="w-[200px] h-[100px] rounded-lg bg-sky-200 font-semibold mr-3 ml-5 mt-5"
                          />
                        ))
                      ) : (
                        <Typography>No hobbies available</Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ p: 4, pb: 4, flexWrap: 'wrap', alignItems: 'center' }} dir="ltr">
                      <Typography variant="h6">Interest Topics</Typography>
                      {interestTopics.length > 0 ? (
                        interestTopics.map((topic) => (
                          <div key={topic}>
                            <Chip
                              className="w-[200px] h-[100px] rounded-lg bg-sky-200 font-semibold mr-3 ml-5 mt-5"
                              variant="outlined"
                              label={topic}
                              clickable
                              onClick={() => handleInterestExpand(topic)}
                              icon={expandedTopic === topic ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                              sx={{
                                transition: 'all 1.0s ease-in-out', // slower animation
                              }}
                            />
                            <Collapse in={expandedTopic === topic} timeout="auto" unmountOnExit>
                              <List>
                                {articles.length > 0 ? (
                                  articles.map((article, index) => (
                                    <ArticleCard
                                      key={index}
                                      component="a"
                                      href={article.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      background={article.pagemap?.cse_image?.[0]?.src || backgroundImagePath}
                                    >
                                      <ArticleTitle variant="h6">{article.title}</ArticleTitle>
                                    </ArticleCard>
                                  ))
                                ) : (
                                  <Typography>No articles available</Typography>
                                )}
                              </List>
                            </Collapse>
                          </div>
                        ))
                      ) : (
                        <Typography>No interest topics available</Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )}

          {/* New Section for Courses You Might Be Interested In */}
          {courses.length > 0 && (
            <Grid item xs={12} md={12} lg={6}>
              <Card>
                <CardHeader title="Courses You Might Be Interested In" />
                <Box sx={{ p: 4, pb: 4, flexWrap: 'wrap', alignItems: 'center' }} dir="ltr">
                  <Grid container spacing={2}>
                    {courses.map((course, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <ArticleCard
                          component="a"
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          background={course.pagemap?.cse_image?.[0]?.src || backgroundImagePath}
                        >
                          <ArticleTitle variant="h6">{course.title}</ArticleTitle>
                        </ArticleCard>
                      </Grid>
                    ))}
                  </Grid>
                  {courses.length >= 10 && (
                    <Button
                      type="button"
                      fullWidth
                      color="secondary"
                      onClick={handleLoadMore}
                      sx={{ mt: 2, mb: 1 }}
                    >
                      Load More
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          )}

          <Grid item xs={12} md={6} lg={6}>
            <AppNewsUpdate
              title="Company Suggested Courses"
              list={[...Array(3)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          {/* Reward Points Section */}
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <CardHeader title="Reward Points" subheader="Here it will show the rewards achieved." />
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <RewardIcon>
                    <StarIcon sx={{ color: '#FFD700', fontSize: '2rem' }} />
                  </RewardIcon>
                  <Typography variant="h6">{stars} Stars</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <RewardIcon>
                    <LocalDrinkIcon sx={{ color: '#8B4513', fontSize: '3rem' }} />
                  </RewardIcon>
                  <Typography variant="h5">{cups} Cups</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <RewardIcon>
                    <EmojiEventsIcon sx={{ color: '#FFD700', fontSize: '4rem' }} />
                  </RewardIcon>
                  <Typography variant="h4">{trophies} Trophies</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppCurrentSubject
              title="Your Activity Breakdown"
              chartLabels={['Connects', 'Policies', 'Tasks', 'Announcements', 'Courses', 'Buy n Sell']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppTasks
              title="Task Master: Your assigned tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '6', label: 'Sprint Planning' },
                { id: '7', label: 'Line Up' },
                { id: '8', label: 'Retrospective Meeting' },
                { id: '9', label: 'Stakeholder Meeting' },
                { id: '10', label: 'Scoping & Estimations' },
              ]}
            />
          </Grid>

          {/* New Announcement Section */}
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <CardHeader title="Announcements" subheader="Latest updates and news" />
              <Box sx={{ p: 2 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>Employee Management System Update:</strong>
                </Typography>
                <Typography variant="body2" paragraph>
                  Dear team, we are excited to announce the upcoming launch of our new Employee Management System. This system will streamline our HR processes, making it easier to manage employee records, track performance, and handle payroll.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Key Features:</strong>
                  <ul style={{ paddingLeft: '20px' }}>
                    <li>Automated attendance tracking</li>
                    <li>Performance evaluation tools</li>
                    <li>Seamless integration with payroll</li>
                    <li>Employee self-service portal</li>
                  </ul>
                </Typography>
                <Typography variant="body2" paragraph>
                  We will be conducting training sessions over the next few weeks to ensure everyone is comfortable using the new system. Please stay tuned for more information on the training schedule.
                </Typography>
                <Typography variant="body2">
                  Thank you for your cooperation and support as we transition to this new platform.
                </Typography>
              </Box>
            </Card>
          </Grid>
          
          {/* dynamic content for user side */}
          <Grid item xs={12} md={6} lg={6}>
            <AppCurrentVisits
              title="Rewards based Leader Board"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <DashLeaderBoard />
          </Grid>

          {user.role === 'user' && (
            <Grid item xs={12} md={6} lg={12}>
              <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                <ThreadPage />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={() => navigate('/dashboard/thread')}
                  sx={{ mt: 2, mb: 1, width: 200, display: 'flex', alignSelf: 'center' }}
                >
                  See all threads
                </Button>
              </Card>
            </Grid>
          )}

          {user.role === 'admin' && troubledUsers.length > 0 && (
            <Grid item xs={12} md={6} lg={12}>
              <Card>
                <CardHeader title="List of Troubled Employees" />
                <List>
                  {troubledUsers.map((employee) => (
                    <ListItem key={employee.userId}>
                      <ListItemText
                        primary={`${employee.firstName} ${employee.lastName}`}
                        secondary={`Email: ${employee.email}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
