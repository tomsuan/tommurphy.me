import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

function HomePage() {
  const [substackPosts, setSubstackPosts] = useState([]);

  useEffect(() => {
    async function fetchSubstackPosts() {
      try {
        const response = await fetch('/api/substack'); // Accesses your API route
        const data = await response.json();
        console.log("Data from /api/substack:", data); // Add this line
        setSubstackPosts(data);
      } catch (error) {
        console.error("Failed to fetch Substack posts:", error);
        // Handle the error (e.g., display an error message)
      }
    }

    fetchSubstackPosts();
  }, []);

  return (
      <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tom Suan's Substack Posts
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {substackPosts && substackPosts.map((post) => (
                <TableRow
                  key={post.link}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {post.title}
                  </TableCell>
                  <TableCell align="right">
                    <Link href={post.link} target="_blank" rel="noopener noreferrer">
                      View Post
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default HomePage;