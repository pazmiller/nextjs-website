"use client";
import React, { useEffect, useState, useRef } from 'react';

interface SciFiGreetingProps {
  glow_text: string;
}

export default function SciFiGreeting({ glow_text="Hello"}: SciFiGreetingProps) {
  const [displayText, setDisplayText] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);
  const fullText = glow_text;
  const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const glitchIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const startDelayRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    let index = 0;
    
    // Initial delay before typing starts
    startDelayRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (index < fullText.length) {
          setDisplayText(fullText.substring(0, index + 1));
          index++;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          
          // Start occasional glitching after text is complete
          startGlitchEffect();
        }
      }, 120); // Speed of typing
    }, 1000);
    
    return () => {
      if (startDelayRef.current) clearTimeout(startDelayRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    };
  }, [fullText]);

  const startGlitchEffect = () => {
    glitchIntervalRef.current = setInterval(() => {
      // Randomly decide to glitch
      if (Math.random() < 0.2) {
        setIsGlitching(true);
        
        // Revert glitch after a short period
        setTimeout(() => {
          setIsGlitching(false);
        }, 150);
      }
    }, 1000); // Check for glitch opportunity every 2 seconds
  };

  const getGlitchedText = () => {
    return fullText
      .split('')
      .map(char => 
        Math.random() < 0.3 
          ? glitchChars[Math.floor(Math.random() * glitchChars.length)] 
          : char
      )
      .join('');
  };

  return (
    <div className="flex justify-center items-center w-full">
      <h1 
        className={`font-mono text-4xl md:text-6xl tracking-wider
                   ${isGlitching ? 'text-red-500' : 'text-cyan-400'} 
                   transition-colors duration-100
                   animate-pulse text-center min-h-[1.2em] min-w-[300px]`}
        style={{
          textShadow: `0 0 10px ${isGlitching ? '#ff0000' : '#00d7ff'},
                       0 0 20px ${isGlitching ? '#ff0000' : '#00d7ff'},
                       0 0 30px ${isGlitching ? '#ff0000' : '#00d7ff'}`,
        }}
      >
        {isGlitching ? getGlitchedText() : displayText}
        <span className="animate-blink">_</span>
      </h1>
    </div>
  );
}