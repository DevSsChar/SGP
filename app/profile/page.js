'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    location: '',
    education: {
      degree: '',
      institution: '',
      graduationYear: '',
      grade: ''
    },
    experience: {
      company: '',
      position: '',
      duration: '',
      description: ''
    },
    skills: {
      technical: '',
      soft: '',
      languages: '',
      interests: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full Name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.age.trim()) {
        newErrors.age = 'Age is required';
      }
      if (!formData.location.trim()) {
        newErrors.location = 'Location is required';
      }
    }

    if(step==4)
    {
        if(!formData.skills.technical.trim())
        {
            newErrors.technical = 'Technical Skills are required';
        }
        if(!formData.skills.soft.trim())
        {
            newErrors.soft = 'Soft Skills are required';
        }
        if(!formData.skills.languages.trim())
        {
            newErrors.languages = 'Languages are required';
        }
        if(!formData.skills.interests.trim())
        {
            newErrors.interests = 'Interests are required';
        }
        
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      if (currentStep === 4) {
        // Handle form submission
        console.log('Form submitted:', formData);
        // Add your submission logic here
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const steps = [
    { id: 1, name: 'Personal', icon: '👤' },
    { id: 2, name: 'Education', icon: '📚' },
    { id: 3, name: 'Experience', icon: '💼' },
    { id: 4, name: 'Skills & Interests', icon: '🎯' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mt-16">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg
                  ${currentStep === step.id ? 'bg-blue-500 text-white' : 
                    currentStep > step.id ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step.icon}
                </div>
                <span className={`mt-2 text-sm font-medium
                  ${currentStep === step.id ? 'text-blue-500' : 
                    currentStep > step.id ? 'text-green-500' : 'text-gray-500'}`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Your age"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-500">{errors.age}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Education</h2>
              <h6>
                <span className='text-green-400'>* optional</span>
              </h6>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input
                  type="text"
                  name="education.degree"
                  value={formData.education.degree}
                  onChange={handleInputChange}
                  placeholder="Your degree"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  name="education.institution"
                  value={formData.education.institution}
                  onChange={handleInputChange}
                  placeholder="Your institution"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                <input
                  type="text"
                  name="education.graduationYear"
                  value={formData.education.graduationYear}
                  onChange={handleInputChange}
                  placeholder="Year of graduation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade/CGPA</label>
                <input
                  type="text"
                  name="education.grade"
                  value={formData.education.grade}
                  onChange={handleInputChange}
                  placeholder="Your grade or CGPA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Experience</h2>
              <h6>
                <span className='text-green-400'>* optional</span>
              </h6>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  name="experience.company"
                  value={formData.experience.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  name="experience.position"
                  value={formData.experience.position}
                  onChange={handleInputChange}
                  placeholder="Your position"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  name="experience.duration"
                  value={formData.experience.duration}
                  onChange={handleInputChange}
                  placeholder="Duration of employment"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="experience.description"
                  value={formData.experience.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of your role"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Skills & Interests</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technical Skills <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="skills.technical"
                  value={formData.skills.technical}
                  onChange={handleInputChange}
                  placeholder="Your technical skills"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.technical ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="2"
                  required
                />
                {errors.technical && (
                  <p className="mt-1 text-sm text-red-500">{errors.technical}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Soft Skills <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="skills.soft"
                  value={formData.skills.soft}
                  onChange={handleInputChange}
                  placeholder="Your soft skills"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.soft ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="2"
                  required
                />
                {errors.soft && (
                  <p className="mt-1 text-sm text-red-500">{errors.soft}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Languages <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="skills.languages"
                  value={formData.skills.languages}
                  onChange={handleInputChange}
                  placeholder="Languages you know"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.languages ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.languages && (
                  <p className="mt-1 text-sm text-red-500">{errors.languages}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interests <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="skills.interests"
                  value={formData.skills.interests}
                  onChange={handleInputChange}
                  placeholder="Your interests and hobbies"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.interests ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="2"
                  required
                />
                {errors.interests && (
                  <p className="mt-1 text-sm text-red-500">{errors.interests}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
                currentStep === 1 ? 'ml-auto' : ''
              }`}
            >
              {currentStep === 4 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 