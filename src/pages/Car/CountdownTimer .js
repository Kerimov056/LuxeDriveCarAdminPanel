// import React, { useState, useEffect } from 'react';

// const CountdownTimer = ({ targetDate }) => {
//   const [countdown, setCountdown] = useState('');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const difference = targetDate - now;

//       if (difference <= 0) {
//         clearInterval(interval);
//         setCountdown('Süre doldu!');
//       } else {
//         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//         setCountdown(`${days} gün ${hours} saat ${minutes} dakika ${seconds} saniye`);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [targetDate]);

//   return <div>{countdown}</div>;
// };