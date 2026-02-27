import React from 'react';

const StudentList = ({ title, count }) => {
  return (
    <div style={{
      backgroundColor: '#007bff', // Blue color
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      width: '200px',
      marginRight: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'normal' }}>
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
        {count}
      </p>
    </div>
  );
};

export default StudentList;
