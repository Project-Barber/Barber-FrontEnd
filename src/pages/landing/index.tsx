import React from 'react';
import CardLandingImg from '@/components/custom-componets/card_landing_img';

const Landing: React.FC = () => {
    return (
        <div>
            <div className="flex justify-center items-center h-[630px]  bg-white select-none overflow-y-hidden">
                <CardLandingImg
                    imageUrlBackground="src\assets\pexels-rdne-7697233 2.svg"
                  
                />
            </div>
        </div>
    );
};

export default Landing;