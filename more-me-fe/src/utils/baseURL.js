import { AttachMoneyOutlined, FitnessCenterOutlined, TagFacesOutlined, Man3Outlined, HealingOutlined, SpaOutlined, PsychologyOutlined } from '@mui/icons-material';

export const baseURL = 'http://localhost:3004';

export const QUESTIONS_ANSWERED = 'questionsAnswered';

export const areas = [
    {name: 'Motivation', icon: <TagFacesOutlined /> }, 
    {name: 'Exercise', icon: <FitnessCenterOutlined /> }, 
    {name: 'Leadership', icon: <Man3Outlined /> }, 
    {name: 'Nutrition', icon: <HealingOutlined /> }, 
    {name: 'Self-Care', icon: <SpaOutlined /> }, 
    {name: 'Mindset', icon: <PsychologyOutlined /> }, 
    {name: 'Personal Finance', icon: <AttachMoneyOutlined /> },
  ];

export const question_emojies = [
  {
    name: "⛔",
  },
  {
    name: "👎",
  },
  {
    name: "🤷",
  },
  {
    name: "👍",
  },
  {
    name: "✅",
  },
];

export const buyAndSellCategories = [
  {
    value: 'All Products' 
  },
  {
    value: 'Clothing'
  },
  {
    value: 'Electronics'
  },
  {
    value: 'Sports'
  },
  {
    value: 'Others'
  },
]
