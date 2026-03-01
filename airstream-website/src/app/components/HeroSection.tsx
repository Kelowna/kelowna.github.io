import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative w-full h-[30vh] md:h-[35vh] lg:h-[40vh] overflow-hidden">
      {/* Hero Image */}
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjByb2FkJTIwdHJpcCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzI0MDY0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Adventure road trip landscape"
        className="w-full h-full object-cover"
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Start Your Adventure
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto">
            Discover the freedom of the open road with custom trailers and modifications
          </p>
        </div>
      </div>
    </section>
  );
}