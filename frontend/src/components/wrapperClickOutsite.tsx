/**
 * A wrapper which triggers events when click outside
 */

import { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  handler: (...args: any[]) => void;
}

export default function WrapperClickOutside({
  children,
  handler,
}:Props) {


  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);


  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}