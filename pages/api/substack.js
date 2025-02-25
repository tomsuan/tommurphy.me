import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 5000, // Set timeout to 5 seconds (adjust as needed)
});

export default async (req, res) => {
  try {
    console.log("Starting to fetch the feed...");
    const feed = await parser.parseURL('https://tommurphy888.substack.com/feed', { // **REPLACE WITH YOUR URL!**
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });
   console.log("Successfully fetched and parsed the feed:", feed); // Log the feed object
      if (feed && feed.items) {
          const items = feed.items.slice(0, 5); // Get the 5 most recent posts
          const simplifiedItems = items.map(item => ({
              title: item.title,
              link: item.link,
              // Optionally include other fields you want (e.g., description, pubDate)
          }));

          res.status(200).json(simplifiedItems);
      } else {
           console.error("Feed or feed items are undefined.");
           res.status(200).json([]);
      }

  } catch (error) {
    console.error("Error in /api/substack:", error);  // Add this line
    console.error(error.message); //Add this line
     console.error(error.stack); //Add this line
    res.status(500).json({ error: 'Failed to fetch the feed' + error.message });
  }
};