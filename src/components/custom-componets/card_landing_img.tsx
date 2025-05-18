import React from 'react';

interface CardLandingImgProps {
    imageUrlBackground: string;
   
}

const CardLandingImg: React.FC<CardLandingImgProps> = ({ imageUrlBackground }) => {
    return (
        <div className="card-landing-img ">
            <img src={imageUrlBackground} className="card-image" />
            <div className="card-content">
            </div>
        </div>
    );
};

export default CardLandingImg;