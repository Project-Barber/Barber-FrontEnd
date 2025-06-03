import useEmblaCarousel from 'embla-carousel-react';
import BarbersCard from './barbersCard';

const CarrosselBarbersCard = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  const barbers = [
    { name: 'Rafael Oliveira' },
    { name: 'José Ferreira' },
    { name: 'Carlos Silva' },
    { name: 'André Santos' },
    { name: 'Aldo Albuquerque' },
  ];

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {barbers.map((barber, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-[400px] md:w-[450px] px-4"
          >
            <BarbersCard name={barber.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarrosselBarbersCard;
