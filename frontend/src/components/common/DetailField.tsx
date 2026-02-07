import React from 'react';

interface DetailFieldProps {
    label: string;
    value: string;
}

export const DetailField: React.FC<DetailFieldProps> = ({ label, value }) => (
    <div className="py-5 border-b border-gray-100 last:border-0">
        <p className="text-sm font-bold text-gray-900 mb-1">{label}</p>
        <p className="text-sm text-gray-500 font-medium">{value}</p>
    </div>
);
