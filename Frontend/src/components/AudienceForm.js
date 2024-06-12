// src/components/AudienceForm.js

import React, { useState } from 'react';
import axios from 'axios';

const AudienceForm = ({ onAudienceCreated }) => {
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({ field: '', operator: '', value: '' });
  const [audienceSize, setAudienceSize] = useState(null);

  const addRule = () => {
    setRules([...rules, newRule]);
    setNewRule({ field: '', operator: '', value: '' });
  };

  const checkAudienceSize = async () => {
    const response = await axios.post('/api/check-audience', { rules });
    setAudienceSize(response.data.size);
  };

  const saveAudience = async () => {
    await axios.post('/api/save-audience', { rules });
    onAudienceCreated();
  };

  return (
    <div>
      <h2>Create Audience</h2>
      <div>
        <input
          type="text"
          placeholder="Field"
          value={newRule.field}
          onChange={(e) => setNewRule({ ...newRule, field: e.target.value })}
        />
        <input
          type="text"
          placeholder="Operator"
          value={newRule.operator}
          onChange={(e) => setNewRule({ ...newRule, operator: e.target.value })}
        />
        <input
          type="text"
          placeholder="Value"
          value={newRule.value}
          onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
        />
        <button onClick={addRule}>Add Rule</button>
      </div>
      <button onClick={checkAudienceSize}>Check Audience Size</button>
      {audienceSize !== null && <div>Audience Size: {audienceSize}</div>}
      <button onClick={saveAudience}>Save Audience</button>
    </div>
  );
};

export default AudienceForm;
