
import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHover, setLinkHover] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleLinkHoverIn = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).tagName === 'BUTTON' ||
          (e.target as HTMLElement).classList.contains('menu-card-hover')) {
        setLinkHover(true);
      }
    };
    
    const handleLinkHoverOut = () => {
      setLinkHover(false);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', updatePosition);
    document.addEventListener('mouseleave', () => setHidden(true));
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleLinkHoverIn);
    document.addEventListener('mouseout', handleLinkHoverOut);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', updatePosition);
      document.removeEventListener('mouseleave', () => setHidden(true));
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleLinkHoverIn);
      document.removeEventListener('mouseout', handleLinkHoverOut);
    };
  }, []);

  return (
    <div 
      className={`custom-cursor ${hidden ? 'opacity-0' : 'opacity-100'} 
                ${clicked ? 'scale-75' : 'scale-100'} 
                ${linkHover ? 'w-8 h-8 bg-cafe-gold/30' : 'w-6 h-6 bg-cafe-mocha/30'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;
