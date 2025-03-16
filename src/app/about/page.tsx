import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About BearingTech</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Learn about our company, our mission, and our commitment to providing high-quality bearing solutions.
          </p>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 1985, BearingTech has grown from a small local supplier to a global provider of high-quality bearings and related products. Our journey began with a simple mission: to provide reliable bearing solutions that help our customers succeed.
                </p>
                <p className="text-gray-600 mb-4">
                  Over the years, we have expanded our product range and technical expertise to serve a wide variety of industries, from automotive and manufacturing to energy and agriculture. Today, we are proud to be a trusted partner for businesses around the world.
                </p>
                <p className="text-gray-600">
                  Our commitment to quality, innovation, and customer service has been the foundation of our success, and it continues to drive everything we do.
                </p>
              </div>
              <div className="md:w-1/2 bg-gray-200 rounded-lg overflow-hidden h-80 relative">
                {/* Placeholder for company image - in a real application, you would use an actual image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                  <p className="text-gray-600">Company image would be displayed here</p>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission & Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
                  <p className="text-gray-600">
                    We are committed to providing products that meet the highest standards of quality and reliability, ensuring optimal performance and longevity.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-gray-600">
                    We continuously invest in research and development to create innovative bearing solutions that address the evolving needs of our customers.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Service</h3>
                  <p className="text-gray-600">
                    We are dedicated to providing exceptional customer service, offering technical support and expertise to help our customers find the right solutions.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Team</h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                Our team of experienced professionals is committed to providing the highest level of service and expertise to our customers.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Team member cards - in a real application, you would use actual images and information */}
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="h-64 bg-gray-200 relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                        <p className="text-gray-600">Team member image</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">John Doe</h3>
                      <p className="text-blue-600 mb-3">CEO & Founder</p>
                      <p className="text-gray-600 text-sm">
                        With over 20 years of experience in the bearing industry, John leads our company with a focus on innovation and customer satisfaction.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 