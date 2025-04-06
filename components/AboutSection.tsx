import React from "react"
import Image from "next/image"

const features = [
  {
    title: "Database Operations",
    items: [
      { skill: "Execute Query", description: "Direct SQL query execution with parameters" },
      { skill: "CRUD Operations", description: "Create, Read, Update, Delete data easily" },
      { skill: "Transaction Management", description: "Safe database transactions" },
      { skill: "Multi-DB Support", description: "Work with multiple databases" },
    ]
  },
  {
    title: "Data Management",
    items: [
      { skill: "Data Validation", description: "Request validation and sanitization" },
      { skill: "File Handling", description: "Secure file upload and management" },
      { skill: "Rate Limiting", description: "Request rate limiting and caching" },
      { skill: "Security Features", description: "API key validation and protection" },
    ]
  },
  {
    title: "Helper Functions",
    items: [
      { skill: "Excel Generation", description: "Create Excel reports dynamically" },
      { skill: "Error Logging", description: "Comprehensive error tracking" },
      { skill: "Data Aggregation", description: "Sum, count, and aggregate data" },
      { skill: "URL Processing", description: "URL and query parameter handling" },
    ]
  }
]

const AboutSection = () => {
  return (
    <section id="about" className="bg-gradient-to-b from-white to-gray-50 dark:from-stone-900 dark:to-stone-800">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">COMPREHENSIVE TOOLKIT</h2>
          <h1 className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Django Database Helper
          </h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-300">
            A powerful collection of helper functions designed to simplify database operations and enhance Django development.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, featureIdx) => (
              <div key={featureIdx} className="bg-white dark:bg-stone-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                  <div className="mt-4 space-y-4">
                    {feature.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-900 dark:text-white">{item.skill}</p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#projects"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors duration-300"
          >
            View Documentation
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
