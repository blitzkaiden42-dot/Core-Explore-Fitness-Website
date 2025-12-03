import React from "react";
import "./Subscription.css";

const plans = [
  {
    number: "01",
    title: "Basic Plan",
    price: "₱299 / month",
    benefits: [
      "Access to beginner workout programs",
      "Basic progress tracking",
      "Community forum access",
    ],
  },
  {
    number: "02",
    title: "Standard Plan",
    price: "₱599 / month",
    benefits: [
      "All Basic features",
      "Intermediate + Advanced workout programs",
      "Personalized fitness routine",
      "Monthly progress evaluation",
    ],
    highlight: true,
  },
  {
    number: "03",
    title: "Premium Plan",
    price: "₱999 / month",
    benefits: [
      "All Standard features",
      "1-on-1 virtual coaching",
      "Customized meal plan",
      "Priority support",
    ],
  },
];

const Subscription = () => {
  return (
    <div className="subscription-container">
      <h2 className="subscription-title">Fit-Explore Membership Plans</h2>
      <p className="subscription-subtitle">
        Choose a plan that accelerates your fitness journey.
      </p>

      <div className="plans-grid">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`plan-card ${plan.highlight ? "highlight" : ""}`}
          >
            <p className="plan-number">{plan.number}</p>

            <h3 className="plan-title">{plan.title}</h3>

            <ul className="benefits-list">
              {plan.benefits.map((benefit, i) => (
                <li key={i} className="benefit-item">
                  + {benefit}
                </li>
              ))}
            </ul>

            <div className="plan-bottom">
              <p className="plan-price">{plan.price}</p>
              <button className="buy-btn">Subscribe</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
