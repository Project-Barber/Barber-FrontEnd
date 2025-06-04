import React from 'react';

interface DataStepProps {
    value: string;
    onChange: (date: string) => void;
}

const DataStep: React.FC<DataStepProps> = ({ value, onChange }) => {
    return (
        <div>
            <h2>Selecione a Data</h2>
            <input
                type="date"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
};

export default DataStep;