import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css'; // estilos personalizados

interface DataStepProps {
    value: string;
    onChange: (date: string) => void;
}

const DataStep: React.FC<DataStepProps> = ({ value, onChange }) => {
    const selectedDate = value ? new Date(value) : null;

    return (
        <div className="min-h-[400px] bg-white p-0 items-center flex flex-col justify-center space-y-4">
            <h2 className="text-xl font-bold mt-[-100px]">Selecione a Data</h2>
            <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => {
                    if (date) {
                        // Salva como "yyyy-MM-dd"
                        onChange(date.toISOString().split('T')[0]);
                    }
                }}
                openToDate={selectedDate || new Date()} // força início no mês atual se não houver data
                placeholderText="dd/mm/aaaa"
                dateFormat="dd/MM/yyyy"
                className="border-2 border-black rounded-lg p-2 w-[300px] text-lg focus:border-[#C8B101] focus:outline-none"
                popperPlacement="bottom"
                calendarClassName="custom-datepicker"
            />
        </div>
    );
};

export default DataStep;
