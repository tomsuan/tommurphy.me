// Minimized: Only truly dynamic or complex styles retained if needed.
// Most have been migrated to Tailwind in globals.css and components.
export const cardStyle = {
  // Retained for any legacy usage during transition
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  borderRadius: '12px',
  overflow: 'hidden',
  background: '#fff',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};