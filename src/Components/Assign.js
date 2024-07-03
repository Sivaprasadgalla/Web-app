// src/App.js
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import PMultiplier from './PMultiplier';

const Assign = () => {
    const [currentTab, setCurrentTab] = useState('dashboard');

    return (
        <div className="Assign">
            <div className="tabs">
                <button onClick={() => setCurrentTab('dashboard')} className={`${(currentTab === 'dashboard') ? "active" : ""}`}>Dashboard</button>
                <button onClick={() => setCurrentTab('pmultiplier')} className={`${(currentTab !== 'dashboard') ? "active" : ""}`}>P Multiplier</button>
            </div>
            {currentTab === 'dashboard' && <Dashboard setCurrentTab={setCurrentTab} />}
            {currentTab === 'pmultiplier' && <PMultiplier />}
        </div>
    );
};

export default Assign;
