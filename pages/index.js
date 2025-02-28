import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Head from 'next/head'; // Import the Head component

function HomePage() {
  const [substackPosts, setSubstackPosts] = useState([]);

  useEffect(() => {
    async function fetchSubstackPosts() {
      try {
        const response = await fetch('/api/substack'); // Accesses your API route
        const data = await response.json();
        setSubstackPosts(data);
      } catch (error) {
        console.error("Failed to fetch Substack posts:", error);
        // Handle the error (e.g., display an error message)
      }
    }

    fetchSubstackPosts();
  }, []);

  return (
    <div>
      <Head>
        <title>Tom Suan's Substack Posts</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container maxWidth="md">
        <Box sx={{ my: 4, fontFamily: 'Inter, sans-serif' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Tom Suan's Substack Posts
          </Typography>
          {substackPosts.map((post) => (
            <Box key={post.link} sx={{ my: 2 }}>
              <Typography variant="h6" component="h2">
                {post.title}
              </Typography>
              <Link
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'block',
                  mt: 0.5,
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                View Post
              </Link>
            </Box>
          ))}
        </Box>
      </Container>
    </div>
  );
}

export default HomePage;