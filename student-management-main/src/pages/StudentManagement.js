import React from 'react';
import StudentForm from '../components/StudentForm';

const StudentManagement = () => {
  // Sample Data
  const students = [
    { id: 1, name: 'Sanjay', email: 'sanjay@test.com', class: '10th' },
    { id: 2, name: 'Priya', email: 'priya@test.com', class: '12th' },
  ];

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>Student Management</h2>
      <div style={{ display: 'flex', gap: '40px' }}>
        
        {/* Left Side: Form */}
        <div style={{ flex: 1 }}>
          <StudentForm />
        </div>

        {/* Right Side: Table */}
        <div style={{ flex: 2 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#0056b3', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Class</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{s.name}</td>
                  <td style={{ padding: '12px' }}>{s.email}</td>
                  <td style={{ padding: '12px' }}>{s.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default StudentManagement;
