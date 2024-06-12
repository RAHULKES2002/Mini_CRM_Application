// src/App.js

import React, { useState } from 'react';
import Login from './components/Login';
import AudienceForm from './components/AudienceForm';
import CampaignList from './components/CampaignList';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setUser(user);
  };

  const handleAudienceCreated = () => {
    // Handle audience created action
  };

  return (
    <div>
      {!user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <h1>Welcome, {user.name}</h1>
          <AudienceForm onAudienceCreated={handleAudienceCreated} />
          <CampaignList />
        </>
      )}
    </div>
  );
};

export default App;
