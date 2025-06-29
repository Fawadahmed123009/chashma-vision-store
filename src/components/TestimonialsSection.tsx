
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    location: 'Karachi',
    rating: 5,
    text: 'Amazing quality frames and excellent customer service. The prescription was perfect and delivery was super fast!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Fatima Khan',
    location: 'Lahore',
    rating: 5,
    text: 'Love my new sunglasses! The style is exactly what I was looking for and the quality is outstanding.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b332c46c?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Ali Raza',
    location: 'Islamabad',
    rating: 5,
    text: 'Best eyewear shopping experience in Pakistan. Professional service and trendy designs at great prices.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Chashma Co for their eyewear needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-md card-hover"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-navy">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-gold text-lg">★</span>
                ))}
              </div>
              
              <p className="text-gray-700 italic">
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
