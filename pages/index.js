import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Head from 'next/head';

function HomePage() {
  const [substackPosts, setSubstackPosts] = useState([]);
  
  useEffect(() => {
    // Load Substack embed script
    const script = document.createElement('script');
    script.src = 'https://substackapi.com/widget.js';
    script.async = true;
    document.body.appendChild(script);

    async function fetchSubstackPosts() {
      try {
        const response = await fetch('/api/substack');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setSubstackPosts(data);
      } catch (error) {
        console.error("Failed to fetch Substack posts:", error);
      }
    }
    fetchSubstackPosts();
    
    return () => {
      // Clean up on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Your Name</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://substackcdn.com" />
      </Head>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box sx={{ fontFamily: 'Inter, sans-serif' }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 600,
              letterSpacing: '-0.02em',
              mb: 6,
              color: '#1a1a1a',
            }}
          >
            Your Name
          </Typography>
          
          {/* Substack embed widget */}
          <Box sx={{ mb: 4 }}>
            <div 
              id="substack-feed-embed"
              data-site="tommurphy888.substack.com"
              data-theme="light"
            ></div>
          </Box>
          
          {substackPosts.length > 0 ? (
            substackPosts.map((post) => (
              <Box
                key={post.link}
                sx={{
                  mb: 4,
                  pb: 2,
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 500,
                    mb: 1,
                    color: '#333',
                  }}
                >
                  {post.title}
                </Typography>
                <Link
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 400,
                    color: '#666',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#1a1a1a',
                    },
                  }}
                >
                  Read on Substack
                </Link>
              </Box>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{ color: '#666', fontStyle: 'italic' }}
            >
              Loading posts...
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default HomePage;