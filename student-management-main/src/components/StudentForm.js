import React, { useState } from 'react';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Student added successfully!');
    setFormData({ name: '', email: '', class: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      backgroundColor: '#fff', 
      padding: '20px', 
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3>Add New Student</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Name
        </label>
        <input 
          type="text" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Email
        </label>
        <input 
          type="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Class
        </label>
        <input 
          type="text" 
          name="class" 
          value={formData.class}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
      </div>

      <button 
        type="submit"
        style={{ 
          backgroundColor: '#0056b3', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Add Student
      </button>
    </form>
  );
};

export default StudentForm;
