// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

// const Q12 = ({ handleNext, handleAnswerChange }) => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);

//   useEffect(() => {
//     fetch('/assets/books.json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => setBooks(data))
//       .catch(error => console.error('There was a problem with the fetch operation:', error));
//   }, []);

//   useEffect(() => {
//     if (searchTerm) {
//       const results = books.filter(book =>
//         book.title.toLowerCase().startsWith(searchTerm.toLowerCase())
//       );
//       setFilteredBooks(results);
//     } else {
//       setFilteredBooks([]);
//     }
//   }, [searchTerm, books]);

//   const handleSelectBook = (book) => {
//     setSelectedBook(book);
//   };

//   const handleSubmit = () => {
//     if (selectedBook) {
//       handleAnswerChange({ bookTitle: selectedBook.title });
//       handleNext();
//     }
//   };

//   return (
//     <div style={{overflow: "auto", scrollbarWidth: "none"}}>
//       <Box sx={{ maxWidth: 600, padding: 2 }}>
//         <Typography variant="h4" gutterBottom>
//           Question No 12: Do you like books?
//         </Typography>
//         <TextField
//           label="Enter book title"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <Box sx={{ maxHeight: 300, overflow: 'auto', marginBottom: 2 }}>
//           <List>
//             {filteredBooks.map((book) => (
//               <ListItem button onClick={() => handleSelectBook(book)} key={book.title}>
//                 <ListItemText primary={book.title} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//         {selectedBook && (
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
//             <img src={selectedBook.imageLink} alt={selectedBook.title} style={{ width: '50%', height: 'auto', borderRadius: 8 }} />
//             <Typography variant="body1" component="p" sx={{ marginTop: 2 }}>
//               <strong>Book Title:</strong> {selectedBook.title}
//             </Typography>
//             <Typography variant="body1" component="p">
//               <strong>Author:</strong> {selectedBook.author}
//             </Typography>
//             <Typography variant="body1" component="p">
//               <strong>Country:</strong> {selectedBook.country}
//             </Typography>
//             <Typography variant="body1" component="p">
//               <strong>Language:</strong> {selectedBook.language}
//             </Typography>
//             <Typography variant="body1" component="p">
//               <strong>Year:</strong> {selectedBook.year}
//             </Typography>
//             <Button onClick={handleSubmit} variant="outlined" sx={{ marginTop: 2 }} style={{ width: "65%" }}>
//               Next
//             </Button>
//           </Box>
//         )}
//       </Box>
//     </div>
//   );
// };

// export default Q12;

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

const Q12 = ({ handleNext, handleAnswerChange }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch('/assets/books.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setBooks(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = books.filter(book =>
        book.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredBooks(results);
    } else {
      setFilteredBooks([]);
    }
  }, [searchTerm, books]);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleSubmit = () => {
    if (selectedBook) {
      const answer = { bookTitle: selectedBook.title };
      console.log("Submitting answer for book:", answer);
      handleAnswerChange(answer, 'preference'); // Save the answer in the preference category
      handleNext();
    }
  };

  return (
    <div style={{ overflow: "auto", scrollbarWidth: "none" }}>
      <Box sx={{ maxWidth: 600, padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Question No 12: Do you like books?
        </Typography>
        <TextField
          label="Enter book title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ maxHeight: 300, overflow: 'auto', marginBottom: 2 }}>
          <List>
            {filteredBooks.map((book) => (
              <ListItem button onClick={() => handleSelectBook(book)} key={book.title}>
                <ListItemText primary={book.title} />
              </ListItem>
            ))}
          </List>
        </Box>
        {selectedBook && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
            <img src={selectedBook.imageLink} alt={selectedBook.title} style={{ width: '50%', height: 'auto', borderRadius: 8 }} />
            <Typography variant="body1" component="p" sx={{ marginTop: 2 }}>
              <strong>Book Title:</strong> {selectedBook.title}
            </Typography>
            <Typography variant="body1" component="p">
              <strong>Author:</strong> {selectedBook.author}
            </Typography>
            <Typography variant="body1" component="p">
              <strong>Country:</strong> {selectedBook.country}
            </Typography>
            <Typography variant="body1" component="p">
              <strong>Language:</strong> {selectedBook.language}
            </Typography>
            <Typography variant="body1" component="p">
              <strong>Year:</strong> {selectedBook.year}
            </Typography>
            <Button onClick={handleSubmit} variant="outlined" sx={{ marginTop: 2 }} style={{ width: "65%" }}>
              Next
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Q12;
