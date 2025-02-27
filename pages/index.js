import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Head from 'next/head';
import { motion } from 'framer-motion';

function HomePage() {
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted client-side
  const [substackPosts, setSubstackPosts] = useState([]); // Keep for potential fallback, but not used now

  // Load Substack embed client-side only to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true); // Mark as mounted

    // Inject Substack embed script dynamically
    const script = document.createElement('script');
    script.src = 'https://substack.com/embedjs/embed.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);

    // Clean up script on unmount
    return () => {
      document.body.removeChild(script);
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
              textShadow: '1px 1px 2px rgba(255, 107, 107, 0.3)', // Fun shadow effect
            }}
          >
            Your Name
          </Typography>
          
          {/* Conditionally render Substack embeds only on client-side */}
          {isMounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Embeds in reverse chronological order */}
              <div className="substack-post-embed">
                <p lang="en">Creators, Entrepreneurs and the Vanishing Gatekeepers in the Age of AI by Tom Murphy</p>
                <p>How Artificial Intelligence is Democratising Creation While Threatening Originality</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/creators-entrepreneurs-and-the-vanishing">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">Why AI Cannot Write The Iliad: The Limits of Artificial Creativity by Tom Murphy</p>
                <p>Cultural expression requires more than data - it needs the peculiar magic of human experience</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/why-ai-cannot-write-the-iliad-the">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">AI Must Follow the Law—And Nothing More by Tom Murphy</p>
                <p>Big Tech executives making up their own extra-legal rules is not a good thing.</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/ai-must-follow-the-lawand-nothing">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">The Nature of Creativity: The Limits of Human Perception by Tom Murphy</p>
                <p>Is creativity a product of the mind, or does it arise from a deeper, universal principle?</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/the-nature-of-creativity-the-limits">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">AI and the Inescapable Nature of Bias by Tom Murphy</p>
                <p>The amplification of bad things.</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/ai-and-the-inescapable-nature-of">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">AI and the Ownership of Reality by Tom Murphy</p>
                <p>Preserving the future</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/ai-and-the-ownership-of-reality">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">What If AI Is Creative—But Not in the Way We Think? by Tom Murphy</p>
                <p>Maybe it is humans who have to change?</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/what-if-ai-is-creativebut-not-in">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">Consciousness as an Interface Between the Material World and Beyond by Tom Murphy</p>
                <p>A speculation on how things might work</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/consciousness-as-an-interface-between">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">The AI Development Paradox: by Tom Murphy</p>
                <p>Power, Innovation, and Accountability</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/the-ai-development-paradox">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">The High Priests of AI by Tom Murphy</p>
                <p>Who Holds the Reins of Power?</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/the-high-priests-of-ai">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">AI: A New Way of Seeing the World by Tom Murphy</p>
                <p>A paradigm shift is beckoning.</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/ai-a-new-way-of-seeing-the-world">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">AI: The Third Wheel for Artists and Their Creations by Tom Murphy</p>
                <p>How AI Changes the Relationship Between Creators and Their Work</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/ai-the-third-wheel-for-artists-and">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">AI: To Live with Lies? by Tom Murphy</p>
                <p>Creativity and Ethics in the AI Era</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/ai-to-live-with-lies">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">Creativity in the Age of AI by Tom Murphy</p>
                <p>A Question of What Comes Through Us</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/creativity-in-the-age-of-ai">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">Originality Maybe Overvalued By Humans by Tom Murphy</p>
                <p>But It's Impossible for AI</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/originality-maybe-overvalued-by-humans">Read on Substack</a>
              </div>

              <div className="substack-post-embed">
                <p lang="en">First Steps by Tom Murphy</p>
                <p>A Creative Journey</p>
                <a data-post-link href="https://tommurphy888.substack.com/p/first-steps">Read on Substack</a>
              </div>
            </motion.div>
          )}

          {/* Optional Fallback (Commented Out) - Remove if not needed */}
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