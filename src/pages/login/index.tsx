import React from 'react';
import CardLogin from '@/components/custom-componets/card_login';

const Login: React.FC = () => {
    return (
        <div className='flex justify-center items-center h-[660px] bg-white select-none'>
            <CardLogin />
        </div>
    );
};

export default Login;