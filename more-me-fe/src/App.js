// import { useState, useEffect } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'tailwindcss/tailwind.css';
// import Router from './routes';
// import ThemeProvider from './theme';
// import { StyledChart } from './components/chart';
// import ScrollToTop from './components/scroll-to-top';
// import TipsAvatar from './components/Avatar-help';
// import { AuthProvider, useAuth } from './context/AuthContext';

// const client = new QueryClient();

// function AppContent({ profileSetUp }) {
//   console.log("profileSetUp", profileSetUp);
//   //profileSetUp =false;
//   const { userData } = useAuth();

//   return (
//     <>
//       <ScrollToTop />
//       {userData?.user.role === 'user' && !profileSetUp && <TipsAvatar />}
//       <StyledChart />
//       <Router />
//     </>
//   );
// }

// export default function App() {
//   const [profileSetUp, setProfileSetUp] = useState(false);

//   useEffect(() => {
//     // Simulate fetching user profile setup status
//     const userObj = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
//     const profileSetUpStatus = true; // Set this to the actual condition
//     setProfileSetUp(profileSetUpStatus);
//   }, []);

//   return (
//     <HelmetProvider>
//       <QueryClientProvider client={client}>
//         <AuthProvider>
//           <BrowserRouter>
//             <ThemeProvider>
//               <AppContent profileSetUp={profileSetUp} />
//             </ThemeProvider>
//           </BrowserRouter>
//         </AuthProvider>
//       </QueryClientProvider>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </HelmetProvider>
//   );
// }

import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import Router from './routes';
import ThemeProvider from './theme';
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import TipsAvatar from './components/Avatar-help';
import { AuthProvider, useAuth } from './context/AuthContext';

const client = new QueryClient();

// Create a context for profileSetUp
const ProfileSetUpContext = createContext();

export function useProfileSetUp() {
  return useContext(ProfileSetUpContext);
}

function AppContent() {
  const { profileSetUp } = useProfileSetUp();
  const { userData } = useAuth();

  return (
    <>
      <ScrollToTop />
      {userData?.user.role === 'user' && profileSetUp && <TipsAvatar />}
      <StyledChart />
      <Router />
    </>
  );
}

export default function App() {
  const [profileSetUp, setProfileSetUp] = useState(false);

  useEffect(() => {
    //const userObj = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    const profileSetUpStatus = false; // Set this to the actual condition
    setProfileSetUp(profileSetUpStatus);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <ProfileSetUpContext.Provider value={{ profileSetUp, setProfileSetUp }}>
            <BrowserRouter>
              <ThemeProvider>
                <AppContent />
              </ThemeProvider>
            </BrowserRouter>
          </ProfileSetUpContext.Provider>
        </AuthProvider>
      </QueryClientProvider>
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
    </HelmetProvider>
  );
}
