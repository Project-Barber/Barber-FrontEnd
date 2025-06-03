import React from 'react';

interface BarberShopServiceCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const BarberShopServiceCard: React.FC<BarberShopServiceCardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-sm mx-auto border-t-4 border-[#fff]">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-center text-black mb-2">{title}</h3>
      <p className="text-gray-700 text-center">{description}</p>
    </div>
  );
};

export default BarberShopServiceCard;