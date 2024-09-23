import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faPhone, faPaperPlane, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function ContactForm() {
    const [state, handleSubmit] = useForm("mrgwzwgj");
    const [showModal, setShowModal] = useState(false);
   const submitForm = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully');
    navigate('/contact');
   }
   if (state.succeeded) {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '70vh', 
            color: 'black' 
        }}>
            <p className='mb-3'>Thanks for sending your message!</p>
            <div style={{ display: 'flex', gap: '10px' }}>
               <Link to='/contact'>
               <button 
               className='bg-green-900 text-white p-2 rounded-lg'
                    style={{ padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    Send Another Message
                </button>
               </Link>
              <Link to='/'>
              <button 
                  className='bg-green-900 text-white p-2 rounded-lg'
                    style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    Go Back Home
                </button>
              </Link>
            </div>
        </div>
    );
}
    return (
        <div className='flex flex-col justify-center w-full'>
            <div className='flex flex-row justify-around p-2 gap-14 items-start'>
                <div className='fade-in-left animate-fadeIn flex flex-col gap-7 pl-6'>
                    <h2 className='text-4xl font-bold text-green-700  mt-5 '>Contact  Us</h2>
                    <p className='text-slate-700'>We are here to help you. Please feel free to reach out to us.</p>
                    <div className='mt-6 text-slate-700 flex gap-2 flex-col'>
                        <p className='flex flex-row justify-between'>
                            <strong>Email: <FontAwesomeIcon icon={faEnvelope} /> </strong>
                            <a href="mailto:reubenwairicufoundation@gmail.com" className='text-blue-600 underline'>
                                reubenwairicufoundation@gmail.com
                            </a>
                        </p>
                        <p className='flex flex-row justify-between'>
                            <strong>Facebook: <FontAwesomeIcon icon={faFacebook} /></strong>
                            <a href="https://www.facebook.com/Reuben-Wairicu-Foundation" target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>
                                Reuben Wairicu Foundation
                            </a>
                        </p>
                        <p className='flex flex-row justify-between'>
                            <strong>Instagram: <FontAwesomeIcon icon={faInstagram} /> </strong>
                            <a href="https://www.instagram.com/ReubenWairicuFoundation" target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>
                                Reuben Wairicu Foundation
                            </a>
                        </p>
                        <p className='flex flex-row justify-between'>
                            <strong>Contact Person:</strong> Millie Ochoki
                        </p>
                        <p className='flex flex-row justify-between'>
                            <strong>Phone: <FontAwesomeIcon icon={faPhone} /></strong>
                            <a href="tel:+254723237149" className='text-blue-600 underline'>
                                +254 723 237149
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Section (Form) */}
                <form
                    style={{ width: '50%' }}
                    className='text-black mt-2 bg-white border rounded-lg p-3 flex flex-col gap-4 mb-3 fade-in-left animate-fadeIn'
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name"><FontAwesomeIcon icon={faUser} /> Full name</label>
                    <input
                        className='text-slate-700 border p-2 border-slate-700 rounded-lg'
                        id="name"
                        type="text"
                        name="name"
                        placeholder='Enter your name'
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />

                    <label htmlFor="subject"><FontAwesomeIcon icon={faFileAlt} /> Subject</label>
                    <input
                        className='text-slate-700 border p-2 border-slate-700 rounded-lg'
                        id="subject"
                        type="text"
                        name="subject"
                        placeholder='Enter the subject'
                    />
                    <ValidationError prefix="Subject" field="subject" errors={state.errors} />

                    <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /> Email Address</label>
                    <input
                        className='text-slate-700 border p-2 border-slate-700 rounded-lg'
                        id="email"
                        type="email"
                        name="email"
                        placeholder='Enter your email'
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />

                    <label htmlFor="message"><FontAwesomeIcon icon={faPaperPlane} /> Message</label>
                    <textarea
                        className='text-slate-700 border p-2 border-slate-700 rounded-lg'
                        id="message"
                        name="message"
                        placeholder='Enter your message'
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />

                    <button
                        className='flex text-center items-center justify-center gap-2 bg-green-900 p-1 text-white rounded-lg'
                        type="submit"
                        disabled={state.submitting}>
                        <FontAwesomeIcon icon={faPaperPlane} /> {state.submitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;

