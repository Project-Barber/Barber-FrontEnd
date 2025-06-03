import React from 'react';
import { Star } from 'lucide-react';

interface UserReviewProps {
  name: string;
  review: string;
  rating: number;
}

const UserReview: React.FC<UserReviewProps> = ({ name, review, rating }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border text-left w-full max-w-sm">
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <div className="flex items-center mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className={`mr-1 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
          />
        ))}
        <span className="text-gray-500 text-sm ml-1">{rating.toFixed(1)}</span>
      </div>
      <p className="text-gray-800 text-sm">“{review}”</p>
    </div>
  );
};

export default UserReview;