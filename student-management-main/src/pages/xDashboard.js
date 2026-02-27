import React, { useState } from 'react';
import StudentList from '../components/StudentList';

const Dashboard = () => {
  // Default-a 'students' view vecha udane details theriyum
  const [view, setView] = useState('students'); 
  const [username, setUsername] = useState('annabeck99');
  const [fullName, setFullName] = useState('Anna Becker');

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#f5f5dc', padding: '20px' }}>
        <h2 style={{ color: 'blue' }}>ADMIN</h2>
        <p onClick={() => setView('dashboard')} style={{ cursor: 'pointer', marginTop: '20px' }}>📊 Dashboard</p>
        <p onClick={() => setView('students')} style={{ cursor: 'pointer', color: 'purple', fontWeight: 'bold' }}>👥 students</p>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '40px' }}>
        {/* Inga thaan details varanum */}
        {view === 'students' ? (
          <div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <StudentList title="Regd users" count="8" />
              <StudentList title="Subject Listed" count="8" />
            </div>
            
            <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px', marginBottom: '20px' }}>Add student</button>
            
            <h2>Hello Mohan</h2>
            <div style={{ display: 'flex', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
               <div style={{ flex: 1 }}>
                  <h3>Account details</h3>
                  <p>👤 kemira sejal</p>
                  <p>📧 kemirasejal@gmail.com</p>
               </div>
               <div style={{ flex: 1, borderLeft: '1px solid #ddd', paddingLeft: '20px' }}>
                  <h3>Edit</h3>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ display: 'block', marginBottom: '10px' }} />
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ display: 'block', marginBottom: '10px' }} />
                  <button onClick={() => alert('Updated!')} style={{ backgroundColor: '#1a237e', color: 'white', padding: '10px 20px' }}>Update</button>
               </div>
            </div>
          </div>
        ) : (
          <h2>Dashboard Home - Click 'students' to see details</h2>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
