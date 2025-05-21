'use client';
import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const tidioScript = document.createElement('script');
    tidioScript.src = '//code.tidio.co/ydpvrhrtcuupqqnhjmqun5uevjbrv2co.js';
    tidioScript.async = true;
    document.body.appendChild(tidioScript);

    return () => {
      document.body.removeChild(tidioScript);
    };
  }, []);

  return null; // no visible component — Tidio handles the UI
};

export default Chatbot;
