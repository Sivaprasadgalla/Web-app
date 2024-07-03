// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const projects = [
    { id: 1, name: '24015-237 WHC- Delaware Ranch, TX - 466MW', date: '2024-05-31', status: 'Active' },
    { id: 2, name: '24015-254 WHC - Green Mallard', date: '2024-05-31', status: 'Active' },
    { id: 3, name: '24015.145,WHC - Hillsboro-1', date: '2024-05-31', status: 'Active' },
    { id: 4, name: 'McCarthy Demo', date: '2024-05-15', status: 'Active' },
    { id: 5, name: '24015.260 PCL-Case', date: '2024-05-15', status: 'Active' },
];

const Dashboard = ({setCurrentTab}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(projects);

    function onTabChange(e){
        e.preventDefault();
        setCurrentTab('pmultiplier');
    }

    useEffect(() => {
        setFilteredProjects(
            projects.filter(project =>
                project.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm]);

    return (
        <div className="dashboard">
            <div className="header">
                <h2>Projects</h2>
                <a href='#' onClick={onTabChange} className="create-new">+ Create New</a>
            </div>
            <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <table className="projects-table">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjects.length > 0 ?
                    filteredProjects.map(project => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.date}</td>
                            <td><span className="status active">{project.status}</span></td>
                            <td><button className="run-btn">Run</button></td>
                        </tr>
                    )) 
                    :
                    <tr>
                        <td>No results found.</td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
