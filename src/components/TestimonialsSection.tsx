
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    location: 'Karachi',
    rating: 5,
    text: 'Amazing quality frames and excellent customer service. The prescription was perfect and delivery was super fast!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&fm=webp&q=80'
  },
  {
    id: 2,
    name: 'Fatima Khan',
    location: 'Lahore',
    rating: 5,
    text: 'Love my new sunglasses! The style is exactly what I was looking for and the quality is outstanding.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b332c46c?w=100&h=100&fit=crop&crop=face&fm=webp&q=80'
  },
  {
    id: 3,
    name: 'Ali Raza',
    location: 'Islamabad',
    rating: 5,
    text: 'Best eyewear shopping experience in Pakistan. Professional service and trendy designs at great prices.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&fm=webp&q=80'
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-bold text-foreground mb-6 section-heading">
            What Our Customers Say
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust Chashma Co for their eyewear needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-card rounded-2xl p-8 shadow-lg border border-border card-hover animate-stagger-${Math.min(index + 1, 3)}`}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 shadow-md"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-foreground text-lg">{testimonial.name}</h4>
                  <p className="text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-accent text-xl">★</span>
                ))}
              </div>
              
              <p className="text-muted-foreground italic text-lg leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
