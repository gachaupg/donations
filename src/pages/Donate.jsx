import React from 'react';
import './Donate.css';

const Donate = () => {
  return (
    <div className='fade-in-left fade-in-left text-white primary animate-fadeIn small w-full'>


    <div className=" donate-container primary">
      <h2 className="text-center text mb-3">Support the Reuben Wairicu Foundation!
      </h2>
      <p className="text-center white">
      Your generous contributions will help us support the vulnerable people      </p>
      <p className='white ml-8'>Every donation counts!</p>

      <div className="payment-details">
        <h3>For Financial Support:</h3>
        <p>
            <strong>Reuben Wairicu Foundation</strong><br />
            Account Number: <strong>0330284842169</strong><br />
            Equity Bank, Kitale
        </p>
        <p>
            <strong>Mpesa:</strong><br />
            <strong>+254 723 237149</strong> (Milcah Ochoki)
        </p>
      </div>


      <div className="call-to-action">
        <p>Thank you for considering a donation!</p>
        <button className="btn">Donate Now</button>
      </div>
    </div>
    </div>
  );
};

export default Donate;
