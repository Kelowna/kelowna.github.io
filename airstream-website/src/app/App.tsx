import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ThreeColumnSection } from './components/ThreeColumnSection';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <ThreeColumnSection />
    </div>
  );
}