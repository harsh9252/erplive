import React from 'react';
import { Link } from 'react-router-dom';

const TestPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>✅ React App is Working!</h1>
      <p>If you can see this page, React is running properly.</p>

      <div
        style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '5px' }}
      >
        <h3>Quick Checks:</h3>
        <ul>
          <li>✅ React is loaded</li>
          <li>✅ Routing is working</li>
          <li>✅ Components are rendering</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Test Links:</h3>
        <ul>
          <li>
            <Link to="/">Home Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard">Admin Dashboard</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/invoices">Invoices</Link>
          </li>
        </ul>
      </div>

      <div
        style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '5px' }}
      >
        <h3>⚠️ If you see errors:</h3>
        <ol>
          <li>Open browser console (F12)</li>
          <li>Look for red error messages</li>
          <li>Copy the error message</li>
          <li>Share it with me</li>
        </ol>
      </div>
    </div>
  );
};

export default TestPage;
