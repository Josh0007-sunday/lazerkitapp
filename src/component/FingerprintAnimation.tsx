import React, { useState, useEffect } from 'react';
import { Fingerprint, Check, Wallet } from 'lucide-react';

const FingerprintAnimation = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prevStage) => (prevStage + 1) % 3);
    }, 1500); // Change icon every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-48 h-48">
        <Fingerprint
          className={`absolute w-full h-full text-gray-900 transition-opacity duration-500 ${
            stage === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <Check
          className={`absolute w-full h-full text-green-500 transition-opacity duration-500 ${
            stage === 1 ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <Wallet
          className={`absolute w-full h-full text-gray-900 transition-opacity duration-500 ${
            stage === 2 ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

export default FingerprintAnimation;