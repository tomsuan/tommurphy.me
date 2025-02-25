export default async (req, res) => {
  try {
    const substackPosts = [
      {
        title: "My First Substack Post",
        link: "https://example.com/first-post"
      },
      {
        title: "My Second Substack Post",
        link: "https://example.com/second-post"
      },
      {
        title: "My Third Substack Post",
        link: "https://example.com/third-post"
      }
    ];

    res.status(200).json(substackPosts);
  } catch (error) {
    console.error("Error in /api/substack:", error);
    res.status(500).json({ error: "Failed to fetch Substack posts" });
  }
};