export const containerStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px 15px',
  textAlign: 'center',
  boxSizing: 'border-box',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  lineHeight: 1.6,
};

export const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '24px',
  margin: '40px 0',
  flexWrap: 'wrap',
};

export const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '30px',
  justifyItems: 'center',
};

export const cardStyle = {
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  borderRadius: '12px',
  overflow: 'hidden',
  background: '#fff',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

export const imageWrapperStyle = {
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  backgroundColor: '#f0f0f0',
};

export const titleStyle = {
  display: 'block',
  padding: '16px',
  fontSize: '1.1rem',
  fontWeight: 500,
  textAlign: 'left',
  color: '#000',
};