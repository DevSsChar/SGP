'use client';
import { useEffect, useState } from 'react';

export default function LearningPath() {
  const [likedCareers, setLikedCareers] = useState([]);

  useEffect(() => {
    // Load liked careers from localStorage
    const loadLikedCareers = () => {
      try {
        const savedCareers = localStorage.getItem('likedCareers');
        if (savedCareers) {
          setLikedCareers(JSON.parse(savedCareers));
        }
      } catch (error) {
        console.error('Error loading liked careers:', error);
      }
    };

    loadLikedCareers();
  }, []);

  const getLearningPathData = (career) => {
    return {
      education: [
        "Bachelor's degree in relevant field",
        "Professional certifications",
        "Online courses and workshops"
      ],
      skills: [
        "Technical skills specific to the role",
        "Problem-solving abilities",
        "Communication skills",
        "Project management"
      ],
      timeline: [
        "0-2 years: Entry level positions",
        "2-5 years: Mid-level roles",
        "5+ years: Senior positions"
      ],
      courses: [
        { name: "Intro to UX Design", provider: "Coursera", link: "https://www.coursera.org/learn/ux-design" },
        { name: "Advanced UI/UX", provider: "Udemy", link: "https://www.udemy.com/course/advanced-ux-design/" }
      ],
      resources: [
        { name: "UX Design Guide", link: "https://www.interaction-design.org/literature/topics/ux-design" },
        { name: "Figma Learning", link: "https://help.figma.com/hc/en-us/articles/360040314933-Learn-Design-in-Figma" }
      ]

      
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Your Learning Paths
        </h1>

        {likedCareers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">
              You haven't liked any careers yet. Visit the Recommendations page to explore career options!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {likedCareers.map((career, index) => {
              const pathData = getLearningPathData(career);
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                    {career.title}
                  </h2>
                  
                  {/* Education Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">📚</span> Required Education
                    </h3>
                    <ul className="space-y-2">
                      {pathData.education.map((item, i) => (
                        <li key={i} className="text-gray-600 ml-6">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <hr className="my-6" />

                  {/* Skills Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">💡</span> Key Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pathData.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <hr className="my-6" />

                  {/* Timeline Section */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">⏳</span> Career Timeline
                    </h3>
                    <ul className="space-y-2">
                      {pathData.timeline.map((item, i) => (
                        <li key={i} className="text-gray-600 ml-6">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <hr className="my-6" />

                  {/* Courses Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">🎓</span> Recommended Courses
                    </h3>
                    <ul className="space-y-2">
                      {pathData.courses.map((course, i) => (
                        <li key={i} className="text-gray-600 ml-6">
                          <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {course.name} - {course.provider}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="my-6" />

                  {/* Resources Section */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">🔗</span> Useful Resources
                    </h3>
                    <ul className="space-y-2">
                      {pathData.resources.map((resource, i) => (
                        <li key={i} className="text-gray-600 ml-6">
                          <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {resource.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}



