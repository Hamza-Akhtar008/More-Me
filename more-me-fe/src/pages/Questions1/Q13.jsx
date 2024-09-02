// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

// const Q13 = ({ handleNext, handleAnswerChange }) => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredAuthors, setFilteredAuthors] = useState([]);
//   const [selectedAuthor, setSelectedAuthor] = useState(null);

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
//         book.author.toLowerCase().startsWith(searchTerm.toLowerCase())
//       );
//       setFilteredAuthors(results);
//     } else {
//       setFilteredAuthors([]);
//     }
//   }, [searchTerm, books]);

//   const handleSelectAuthor = (author) => {
//     setSelectedAuthor(author);
//   };

//   const handleSubmit = () => {
//     if (selectedAuthor) {
//       handleAnswerChange({ authorName: selectedAuthor.author });
//       handleNext();
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Question No 13: Who is your favorite author?
//       </Typography>
//       <TextField
//         label="Enter author name"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <List>
//         {filteredAuthors.map((author) => (
//           <ListItem button onClick={() => handleSelectAuthor(author)} key={author.author}>
//             <ListItemText primary={author.author} />
//           </ListItem>
//         ))}
//       </List>
//       {selectedAuthor && (
//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
//           <Typography variant="body1" component="p">
//             <strong>Author Name:</strong> {selectedAuthor.author}
//           </Typography>
//           <Typography variant="body1" component="p">
//             <strong>Country:</strong> {selectedAuthor.country}
//           </Typography>
//           <Typography variant="body1" component="p">
//             <strong>Language:</strong> {selectedAuthor.language}
//           </Typography>
//           <Typography variant="body1" component="p">
//             <strong>Title:</strong> {selectedAuthor.title}
//           </Typography>
//           <Typography variant="body1" component="p">
//             <strong>Year:</strong> {selectedAuthor.year}
//           </Typography>
//           <Button onClick={handleSubmit} variant="outlined" sx={{ marginTop: 2 }} style={{width: "65%"}}>
//             Next
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Q13;

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

const Q13 = ({ handleNext, handleAnswerChange }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

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
        book.author.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredAuthors(results);
    } else {
      setFilteredAuthors([]);
    }
  }, [searchTerm, books]);

  const handleSelectAuthor = (author) => {
    setSelectedAuthor(author);
  };

  const handleSubmit = () => {
    if (selectedAuthor) {
      const answer = { authorName: selectedAuthor.author };
      console.log("Submitting answer for favorite author:", answer);
      handleAnswerChange(answer, 'preference'); // Save the answer in the preference category
      handleNext();
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Question No 13: Who is your favorite author?
      </Typography>
      <TextField
        label="Enter author name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <List>
        {filteredAuthors.map((author) => (
          <ListItem button onClick={() => handleSelectAuthor(author)} key={author.author}>
            <ListItemText primary={author.author} />
          </ListItem>
        ))}
      </List>
      {selectedAuthor && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
          <Typography variant="body1" component="p">
            <strong>Author Name:</strong> {selectedAuthor.author}
          </Typography>
          <Typography variant="body1" component="p">
            <strong>Country:</strong> {selectedAuthor.country}
          </Typography>
          <Typography variant="body1" component="p">
            <strong>Language:</strong> {selectedAuthor.language}
          </Typography>
          <Typography variant="body1" component="p">
            <strong>Title:</strong> {selectedAuthor.title}
          </Typography>
          <Typography variant="body1" component="p">
            <strong>Year:</strong> {selectedAuthor.year}
          </Typography>
          <Button onClick={handleSubmit} variant="outlined" sx={{ marginTop: 2 }} style={{ width: "65%" }}>
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Q13;
