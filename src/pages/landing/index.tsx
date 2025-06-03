import React from 'react';
import CardLandingImg from '@/components/custom-componets/card_landing_img';
import { Button } from '@/components/ui/button';
import logo from '@/assets/paulista-logo-branco-removebg-preview 3.png';
import BarberShopServiceCard from '@/components/custom-componets/BarberShopServiceCard';
import UserReview from '@/components/custom-componets/UserReview';
import Footer from '@/components/custom-componets/Footer';
import cabeloImg from '@/assets/cabelo.png';
import barbaImg from '@/assets/barbar.png';
import skincareImg from '@/assets/Skincare.png';
import CarrosselBarbersCard from '@/components/custom-componets/CarrosselBarbersCard';

const Landing: React.FC = () => {
    return (
        <div>
            <div className="flex justify-center items-center h-[630px] bg-white select-none overflow-y-hidden relative">
                <CardLandingImg
                    imageUrlBackground="src/assets/pexels-rdne-7697233 2.svg"
                />
                <div className="absolute z-10 inset-0 flex flex-col justify-center items-center gap-6">
                    <img
                        src={logo}
                        alt="Logo Paulista Barber Shop"
                        width={500}
                        height={200}
                        className="object-contain"
                    />
                    <Button className="bg-[#C8B101] text-white w-[264px] h-[54px] text-xl rounded-xl">
                        Agendar
                    </Button>
                </div>
            </div>

      {/* Grid de cards */}      
      
      <div className="bg-gray-50 py-16 px-6 md:px-12">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Conheça nossos barbeiros
        </h2>
        <p className="text-gray-500 text-base md:text-lg">
          Profissionais qualificados prontos para atender você
        </p>
      </div>

      <CarrosselBarbersCard />
    </div>

      {/* Grid de cards */}


            <div>
                <section className="bg-[#2D2926] py-16 text-white">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">Agende nossos serviços</h2>
                         <p className="text-lg mt-4 text-gray-300">
                            Cortes de cabelo, barba, e skincare avaliados positivamente pela nossa consolidada base de clientes
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-4">
                        <BarberShopServiceCard
                            imageSrc={cabeloImg}
                            title="Cabelo"
                            description="Cortes de cabelo com estilo, precisão e muito profissionalismo."
                        />
                        <BarberShopServiceCard
                            imageSrc={barbaImg}
                            title="Barba"
                            description="Barbas modernas e vintages com tratamento adequado para manter a saúde dos fios."
                        />
                        <BarberShopServiceCard
                             imageSrc={skincareImg}
                             title="Skincare"
                             description="Tratamento adequado e específico para a saúde e hidratação da pele do homem."
                         />
        
                    </div>
                 </section>
            </div>



                <div>
                    <section className="py-16 px-4 text-center">
                        <h2 className="text-4xl font-bold mb-6">Sobre nós</h2>
                        <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
                            Nos inspirados na tradição das barbearias vintage, trazemos a sofisticação e o cuidado do clássico para o estilo moderno. 
                            Cada corte, cada barba, cada experiência é pensada para proporcionar a você não só um visual impecável, 
                            mas também um momento de relaxamento e autenticidade. Aqui, seu estilo é mais do que um corte – é uma expressão de personalidade.
                        </p>

                        <div className="border-t border-gray-300 mt-12 w-full max-w-5xl mx-auto"></div>
                    </section>


                    <section className="py-12 px-4 text-center">
                        <h2 className="text-3xl font-bold mb-2">O que dizem os nossos clientes</h2>
                        <p className="text-gray-500 mb-8">Veja a experiência de quem já utilizou os nossos serviços</p>

                        <div className="flex flex-wrap justify-center gap-6">
                            <UserReview
                                name="Giordanni Formiga"
                                rating={5}
                                review="Atendimento excelente e corte perfeito. Ambiente moderno e confortável. Recomendo!"
                            />
                            <UserReview
                                name="Henrique Machado"
                                rating={5}
                                review="O serviço de barba é incrível. Saí de lá totalmente renovado!"
                            />
                            <UserReview
                                name="Danillo Queiroga"
                                rating={5}
                                review="Experimentei o serviço de skincare e fiquei muito satisfeito com os resultados!"
                            />
                        </div>
                    </section>

                </div>


                <div>
                    <Footer />
                </div>


        </div>
    );
};

export default Landing;
