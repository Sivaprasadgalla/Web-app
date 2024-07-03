// src/components/PMultiplier.js
import React, { useState } from 'react';
import './PMultiplier.css';

const PMultiplier = () => {
    const [soilLayers, setSoilLayers] = useState([]);
    const [pMultiplierStart, setPMultiplierStart] = useState('');
    const [pMultiplierEnd, setPMultiplierEnd] = useState('');
    const [Error, setError] = useState('')
    const [multiplierError, setMultiplierError] = useState('');

    const handleAddSoilLayer = () => {
        setSoilLayers([
            ...soilLayers,
            { id: soilLayers.length + 1, soilLayer: '' },
        ]);
    };

    const handleSoilLayerChange = (index, field, value) => {
        const newSoilLayers = soilLayers.map((layer, i) =>
            i === index ? { ...layer, [field]: value } : layer
        );
        setSoilLayers(newSoilLayers);
    };

    const handleRemoveSoilLayer = (index) => {
        const newSoilLayers = soilLayers.filter((_, i) => i !== index);
        setSoilLayers(newSoilLayers);
    };

    const handlePMultiplierStartChange = (value) => {
        setPMultiplierStart(value);
        if (parseFloat(value) > parseFloat(pMultiplierEnd)) {
            setError('P Multiplier Start should not be greater than P Multiplier End.');
        } else {
            setError('');
        }
    };

    const handlePMultiplierEndChange = (value) => {
        setPMultiplierEnd(value);
        if (parseFloat(pMultiplierStart) > parseFloat(value)) {
            setError('P Multiplier Start should not be greater than P Multiplier End.');
        } else {
            setError('');
        }
    };

    setTimeout(() => {
        setMultiplierError('');
    }, 3000);


    const handleSubmit = () => {
        const data = {
            pMultiplierStart,
            pMultiplierEnd,
            soilLayers
        };
        if(pMultiplierEnd !== '' && pMultiplierStart !== ''){
            const jsonData = JSON.stringify(data, null, 2);
    
            // Create a Blob object for the JSON data
            const blob = new Blob([jsonData], { type: 'application/json' });
    
            // Create a URL for the Blob object
            const url = URL.createObjectURL(blob);
    
            // Create a temporary <a> element to trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'formData.json'; // File name
            document.body.appendChild(a);
            a.click();
    
            // Clean up: remove the <a> element and revoke the URL object
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            // Send data to python backend
        }else{
            setMultiplierError('Please fill all the fields')
        }
    };

    return (
        <div className="pmultiplier">
            {multiplierError && <div className="error">{multiplierError}</div>}
            <h2>P Multiplier</h2>
            <div className="form-group">
                <label>P Multiplier Start</label>
                <input
                    type="number"
                    value={pMultiplierStart}
                    onChange={(e) => handlePMultiplierStartChange(e.target.value)}
                    />
            </div>
            <div className="form-group">
                <label>P Multiplier End</label>
                <input
                    type="number"
                    value={pMultiplierEnd}
                    onChange={(e) => handlePMultiplierEndChange(e.target.value)}
                />
                {Error && <div className="error">{Error}</div>}
            </div>
            <div className="soil-layers">
                {soilLayers.map((layer, index) => (
                    <div key={layer.id} className="form-group soil-layer">
                        <div className='form-input'>
                            <label>Soil Layer {layer.id}</label>
                            <input type="number" value={layer.soilLayer}
                            onChange={(e) =>
                                handleSoilLayerChange(index, 'soilLayer', e.target.value)
                            } />
                        </div>
                        <button onClick={() => handleRemoveSoilLayer(index)}>- Remove</button>
                    </div>
                ))}
            </div>
            <button onClick={handleAddSoilLayer}>+ Add Soil Layer</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default PMultiplier;
