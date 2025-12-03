import React, { useState } from "react";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Paul Padasas",
    role: "Fitness Coach",
    rating: 5,
    image: "https://via.placeholder.com/500x600",
    text: `Joining Fit-Explore has transformed my life! I've shed 15 pounds and built incredible strength. 
    The motivating trainers and welcoming atmosphere make it ideal for anyone beginning their fitness adventure. 
    I wholeheartedly recommend Fit-Explore to anyone ready to change their lifestyle!`,
  },
  {
    name: "Dharellene Selfaison",
    role: "Gym Member",
    rating: 4,
    image: "https://via.placeholder.com/500x600",
    text: `Fit-Explore helped me stay consistent with training. The programs are well designed and easy to follow!`,
  },
  {
    name: "Mark Navarra",
    role: "Athlete",
    rating: 5,
    image: "https://via.placeholder.com/500x600",
    text: `The coaches and community encouraged me every step of the way. Best fitness decision I've made!`,
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () => setIndex((index - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[index];

  return (
    <section className="testimonial-section">
      <div className="testimonial-header">
        <span className="category">TESTIMONIALS</span>
        <h2 className="title">MEMBER SUCCESS STORIES</h2>
      </div>

      <div className="testimonial-wrapper">

        {/* LEFT ARROW */}
        <button className="arrow left" onClick={prev}>❮</button>

        {/* MAIN CONTENT */}
        <div className="testimonial-card">
          <img src={t.image} alt={t.name} className="testimonial-image" />

          <div className="testimonial-content">
            <span className="quote-icon">❞</span>

            <p className="testimonial-text">"{t.text}"</p>

            <div className="testimonial-footer">
              <div>
                <h3 className="testimonial-name">{t.name}</h3>
                <span className="testimonial-role">{t.role}</span>
              </div>

              <div className="stars">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT ARROW */}
        <button className="arrow right" onClick={next}>❯</button>

      </div>
    </section>
  );
};

export default Testimonials;
