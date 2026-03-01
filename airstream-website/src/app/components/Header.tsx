import { Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="text-2xl font-bold text-gray-900">
            Airstream
          </div>

          {/* Desktop Menu - Right Aligned */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#trailer" 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Trailer
            </a>
            <a 
              href="#trip" 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Trip
            </a>
            <a 
              href="#modifications" 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Modifications
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <a 
              href="#trailer" 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Trailer
            </a>
            <a 
              href="#trip" 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Trip
            </a>
            <a 
              href="#modifications" 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Modifications
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}