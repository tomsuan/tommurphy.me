export const containerStyle = {
  maxWidth: '800px',
  margin: 'auto',
  padding: '20px',
  textAlign: 'center',
};

export const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '40px',
  flexWrap: 'wrap',
};

export const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '30px',
  justifyItems: 'center',
};

export const cardStyle = {
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
};

export const imageWrapperStyle = {
  position: 'relative',
  width: '100%',
  aspectRatio: '4 / 3',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
};

export const titleStyle = {
  display: 'block',
  marginTop: '10px',
  fontSize: '18px',
  color: 'black',
  transition: 'color 0.3s ease, transform 0.3s ease',
};
