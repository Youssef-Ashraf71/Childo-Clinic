import React, { useEffect, useState } from 'react';
import Doctor from '../Assets/doctor-picture.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../Styles/Hero.css';

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookAppointmentClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener('scroll', onPageScroll);

    return () => {
      window.removeEventListener('scroll', onPageScroll);
    };
  }, []);

  return (
    <div className='section-container'>
      <div className='hero-section'>
        <div className='text-section'>
          <p className='text-headline'>
            👶🏥 Your child's health is our priority!
          </p>
          <h2 className='text-title'>
            Discover your Pediatrician and Schedule Appointments
          </h2>
          <p className='text-descritpion'>
            Connect with pediatric specialists for consultations, medical
            guidance, prescriptions, and health records swiftly.
          </p>
          <button
            className='text-appointment-btn'
            type='button'
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
          </button>
          <div className='text-stats'>
            <div className='text-stats-container'>
              <p>2k+</p>
              <p>Received Patients</p>
            </div>

            <div className='text-stats-container'>
              <p>5k+</p>
              <p>Consultants</p>
            </div>
          </div>
        </div>

        <div className='hero-image-section'>
          <img className='hero-image1' src={Doctor} alt='Doctor' />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? 'show-scroll' : ''}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;
