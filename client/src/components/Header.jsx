import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  // State to track if the page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  // State to manage the mobile menu's visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Hook from react-router-dom to get the current URL path
  const location = useLocation();

  // Effect to add a scroll listener when the component mounts
  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if user has scrolled more than 50px
      setIsScrolled(window.scrollY > 50);
    };
    // Add the listener
    window.addEventListener('scroll', handleScroll);
    // Clean up the listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle navigation clicks, primarily for closing the mobile menu
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  // Array of navigation links to keep the code clean
  const navLinks = [
    { href: '/forge', label: 'The Forge' },
    { href: '/showroom', label: 'The Showroom' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-4 md:p-6 z-50">
        <nav className={`container mx-auto flex justify-between items-center bg-base/50 backdrop-blur-md p-4 rounded-xl border transition-all duration-300 ${isScrolled ? 'border-border' : 'border-transparent'}`}>

          {/* Logo */}
          <Link to="/" onClick={handleNavClick} className="text-3xl font-heading tracking-wider">
            <span className="text-text-primary">E</span><span className="text-text-secondary">nclope</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 text-sm">
            {navLinks.map(link => (
              <Link key={link.href} to={link.href} className={`hover:text-text-primary transition-colors ${location.pathname === link.href ? 'text-text-primary' : ''}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/apply" className="btn-primary px-6 py-2 rounded-full">
              Apply to Join
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-text-primary z-50">
            {/* Simple hamburger/close icon SVG */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Panel */}
      <div id="mobile-menu" className={`fixed top-0 left-0 w-full h-full bg-base/90 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-10 text-2xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {navLinks.map(link => (
          <Link key={link.href} to={link.href} onClick={handleNavClick} className="hover:text-text-primary transition-colors">
            {link.label}
          </Link>
        ))}
        <Link to="/apply" onClick={handleNavClick} className="btn-primary px-8 py-3 rounded-full mt-4">
          Apply to Join
        </Link>
      </div>
    </>
  );
}