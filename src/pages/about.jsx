import React from 'react'
import { useInView } from 'react-intersection-observer'

const About = () => {
    const { ref: section1Ref, inView: section1InView } = useInView({
        triggerOnce: true, // Trigger animation only once
        threshold: 0.1, // Trigger when 10% of the element is in view
    })

    const { ref: section2Ref, inView: section2InView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <div className='fade-in-left fade-in-left animate-fadeIn small  text-black flex flex-col gap-16 items-center justify-center p-10'>
            <h2 className={`text-4xl font-bold text-green-700 mb-8 ${section1InView ? 'animate-fadeIn' : ''}`}>
                About Us
            </h2>

            <div ref={section1Ref} className={`flex fade-in-left small animate-fadeIn wrap  flex-row gap-10 items-start justify-center ${section1InView ? 'animate-fadeIn' : ''}`}>
                <div className='w-1/2 small'>
                    <img className='w-full small rounded-lg shadow-lg' src="https://res.cloudinary.com/pitz/image/upload/v1727035164/WhatsApp_Image_2024-09-22_at_13.06.50_w4efmx.jpg" alt="Wairicu Family Farm" />
                </div>
                <div className='w-1/2 small text-justify'>
                    <h3 className='text-2xl text-green-700 font-semibold mb-4'>The Journey</h3>
                    <p className='leading-7 text-gray-700'>
                        In the early 70's, Mr & Mrs Reuben Wairicu relocated to Kitale. Their farm was neighboring "Farm Prison" as it was known.
                        As children in the Wairicu family, we interacted with the Prison Wardens as they would get milk from our farm and occasionally accompanied inmates during small tasks outside the facilities.
                    </p>
                    <p className='mt-4 leading-7 text-gray-700'>
                        For us, these were our brothers and sisters as we knew some of them personally from neighboring villages, schools, churches, and other community gatherings.
                        We also enjoyed the indirect support from the prison in terms of security and the creative works produced by the inmates.
                        <br /><br />
                        Our vision is to support communities targeting the elderly, inmates, teenage moms, widowers, people living with disabilities, recovering addicts, and vulnerable persons.
                    </p>
                    <p className='mt-4 leading-7 text-gray-700'>
                        Reuben Wairicu Foundation (RWF) is a registered family initiative, started by the 8 children of Mr. Reuben and Mrs. Hellen Wairicu of Waigama Farm, Kitale, Kenya.
                        The foundation gives back to the community, originally starting small with family members using their gifts and abilities.
                    </p>
                </div>
            </div>

            <div ref={section2Ref} className={`flex flex-row small wrap gap-10 items-start justify-center ${section2InView ? 'animate-fadeIn' : ''}`}>
                <div className='w-1/2 small'>
                    <img className='w-full rounded-lg shadow-lg' src="https://res.cloudinary.com/pitz/image/upload/v1727035586/WhatsApp_Image_2024-09-22_at_13.06.47_1_l4xolk.jpg" alt="Community Support" />
                </div>
                <div className='w-1/2 text-justify small'>
                    <h3 className='text-2xl text-green-700 font-semibold mb-4'>Our Prison Ministry</h3>
                    <p className='leading-7 text-gray-700'>
                        As the years progressed, our visits became regular, occurring quarterly in recent years. Even during COVID, we continued supporting inmates with basic needs via prison administration.
                        <br /><br />
                        Simple items like bars of soap became precious to inmates, and though meeting the increasing needs was challenging, with the help of friends and community members, we were able to provide soap, toilet rolls, and baby supplies.
                    </p>
                    <p className='mt-4 leading-7 text-gray-700'>
                        <strong>Our impact has been:</strong>
                        <ol className='list-decimal ml-6'>
                            <li>Building great friendships.</li>
                            <li>Invitations to structured prison programs.</li>
                            <li>Advocating for ex-convicts to join the workforce with their acquired skills.</li>
                            <li>Assisting with integration into families and society to reduce stigma.</li>
                        </ol>
                    </p>
                    <p className='mt-4 leading-7 text-gray-700'>
                        We appreciate your support as we hope to engage more with the community and targeted groups.
                    </p>
                </div>
            </div>
            <div ref={section1Ref} className={`flex flex-colgap-10 items-start justify-center ${section1InView ? 'animate-fadeIn' : ''}`}>



            <div className='primary p-4 rounded-lg text-white'>
            <h2>RAISING MATURE SELFLESS INDIVIDUALS WHO WILL SUPPORT AND GIVE HOPE TO COMMUNITIES.</h2>
            <p className='text-ex text-lg font-extrabold text-2xl'>Our Core Values</p>
                <ul className='mt-3'>
                    <li>1. SUSTAINABILITY</li>
                    <li>2. INTERGRITY.</li>
                    <li>3. COLLABORATION.</li>
                    <li>4. COMPASSION</li>
                </ul>
            </div>
            </div>
            <div>
            </div>
            <section className="programs text-white">
                <h2 className="programs-heading">Our Programs</h2>
                <div className="program-container">
                    <div className="program">
                        <h3>Prison Ministry</h3>
                        <p>Supporting inmates with basic needs and counseling.</p>
                    </div>
                    <div className="program">
                        <h3>Elderly Care</h3>
                        <p>Providing assistance and companionship to the elderly.</p>
                    </div>
                    <div className="program">
                        <h3>Support for Teen Mums</h3>
                        <p>Empowering young mothers with skills and support.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
