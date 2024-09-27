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
        <div className='flex flex-col primary text-gray-200 wrap small justify-center w-full'>
            <div className='flex flex-row wrap justify-around p-2 gap-14 items-start'>
                <div className='fade-in-left small animate-fadeIn flex flex-col gap-7 pl-6'>
                    <h2 className='text-4xl font-bold text-green-200  mt-5 '>Contact  Us</h2>
                    <p className='text-gray-200'>We are here to help you. Please feel free to reach out to us.</p>
                    <div className='mt-6 text-gray-200 flex gap-2 flex-col'>
                        <p className='flex flex-row justify-between'>
                            <strong>Email: <FontAwesomeIcon icon={faEnvelope} /> </strong>
                            <a href="/" className='text-blue-400 underline'>
                                reubenwairicufoundation@gmail.com
                            </a>
                        </p>
                        <p className='flex flex-row justify-between'>
                            <strong>Facebook: <FontAwesomeIcon icon={faFacebook} /></strong>
                            <a href="https://www.facebook.com/profile.php?id=61554326003956&mibextid=rS40aB7S9Ucbxw6v" target="_blank" rel="noopener noreferrer" className='text-blue-400 underline'>
                                Reuben Wairicu Foundation
                            </a>
                        </p>
                        <p className='flex flex-row justify-between'>
                            <strong>Instagram: <FontAwesomeIcon icon={faInstagram} /> </strong>
                            <a href="/" target="_blank" rel="noopener noreferrer" className='text-blue-400 underline'>
                                Reuben Wairicu Foundation
                            </a>
                        </p>
                        <p className='flex flex-row justify-between'>
                            <strong>Contact Person:</strong> Millie Ochoki
                        </p>
                        <p className='flex flex-row justify-between'>
                            <strong>Phone: <FontAwesomeIcon icon={faPhone} /></strong>
                            <a href="tel:+254723237149" className='text-blue-400 underline'>
                                +254 723 237149
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Section (Form) */}
                <form
                    style={{ width: '50%' }}
                    className='text-black mt-2 bg-white small border rounded-lg p-3 flex flex-col gap-4 mb-3 fade-in-left animate-fadeIn'
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name"><FontAwesomeIcon icon={faUser} /> Full name</label>
                    <input
                        className='text-gray-200 border p-2 border-gray-200 rounded-lg'
                        id="name"
                        type="text"
                        name="name"
                        placeholder='Enter your name'
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />

                    <label htmlFor="subject"><FontAwesomeIcon icon={faFileAlt} /> Subject</label>
                    <input
                        className='text-gray-200 border p-2 border-gray-200 rounded-lg'
                        id="subject"
                        type="text"
                        name="subject"
                        placeholder='Enter the subject'
                    />
                    <ValidationError prefix="Subject" field="subject" errors={state.errors} />

                    <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /> Email Address</label>
                    <input
                        className='text-gray-200 border p-2 border-gray-200 rounded-lg'
                        id="email"
                        type="email"
                        name="email"
                        placeholder='Enter your email'
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />

                    <label htmlFor="message"><FontAwesomeIcon icon={faPaperPlane} /> Message</label>
                    <textarea
                        className='text-gray-200 border p-2 border-gray-200 rounded-lg'
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

