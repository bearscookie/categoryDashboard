import React, { useState, useEffect } from 'react';

const ScrollableArray = ({ array }) => {
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    if (array.length > 3) {
      const interval = setInterval(() => {
        setScrollIndex((prevIndex) => {
          if (prevIndex === array.length - 1) {
            return 0;
          } else {
            return prevIndex + 1;
          }
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [array]);

  return (
    <div style={{ height: '40px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', transform: `translateY(-${scrollIndex * 40}px)` }}>
        {array.map((item, index) => (
          <div key={index} style={{ height: '40px' }}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableArray;
