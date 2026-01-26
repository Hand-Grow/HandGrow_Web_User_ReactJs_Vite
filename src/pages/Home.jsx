import React from 'react';
import Button from '../components/common/Button';

const Home = () => {
  return (
    <div>
      <h1>Welcome to HandGrow Web</h1>
      <p>This is a sample application demonstrating a scalable folder structure.</p>
      
      <section style={{ marginTop: '20px' }}>
        <h2>Features</h2>
        <ul>
          <li>Best practice folder structure</li>
          <li>React Router integration</li>
          <li>Context API for theme management</li>
          <li>Reusable components</li>
        </ul>
      </section>

      <div style={{ marginTop: '20px' }}>
        <Button onClick={() => alert('Hello from HandGrow!')}>
          Click Me
        </Button>
      </div>
    </div>
  );
};

export default Home;
