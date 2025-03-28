'use client';

import { fetchuser, updateProfile } from '@/actions/useractions';
import { validateInput } from '@/utils/geminiValidation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Age: '',
    Location: '',
    // Education fields
    Degree: '',
    Institution: '',
    GraduationYear: '',
    Grade: '',
    // Experience fields
    Company: '',
    Position: '',
    Duration: '',
    Description: '',
    // Skills fields
    Skills: '',
    SoftSKills: '',
    Languages: '',
    Interests: ''
  });

  // Load user data when component mounts
  useEffect(() => {
    const loadUserProfile = async () => {
      if (session?.user?.email) {
        try {
          const userProfile = await fetchuser(session.user.email);
          if (userProfile) {
            setFormData({
              FullName: userProfile.FullName || '',
              Email: userProfile.Email || '',
              Age: userProfile.Age || '',
              Location: userProfile.Location || '',
              Degree: userProfile.Degree || '',
              Institution: userProfile.Institution || '',
              GraduationYear: userProfile.GraduationYear || '',
              Grade: userProfile.Grade || '',
              Company: userProfile.Company || '',
              Position: userProfile.Position || '',
              Duration: userProfile.Duration || '',
              Description: userProfile.Description || '',
              Skills: userProfile.Skills || '',
              SoftSKills: userProfile.SoftSKills || '',
              Languages: userProfile.Languages || '',
              Interests: userProfile.Interests || ''
            });
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      }
    };

    loadUserProfile();
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = async (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Full Name validation
      if (!formData.FullName.trim()) {
        newErrors.FullName = 'Full Name is required';
      } else {
        const isValidName = await validateInput('full name', formData.FullName);
        console.log(isValidName);
        if (!isValidName) {
          newErrors.FullName = 'Please enter a valid full name';
        }
      }

      // Email validation
      if (!formData.Email.trim()) {
        newErrors.Email = 'Email is required';
      } else {
        const isValidEmail = await validateInput('email address', formData.Email);
        if (!isValidEmail) {
          newErrors.Email = 'Please enter a valid email address';
        }
      }

      // Age validation
      if (!formData.Age) {
        newErrors.Age = 'Age is required';
      } else {
        const isValidAge = await validateInput('age', formData.Age);
        if (!isValidAge) {
          newErrors.Age = 'Please enter a valid age';
        }
      }

      // Location validation
      if (!formData.Location.trim()) {
        newErrors.Location = 'Location is required';
      } else {
        const isValidLocation = await validateInput('location', formData.Location);
        if (!isValidLocation) {
          newErrors.Location = 'Please enter a valid location';
        }
      }
    }

    if (step === 2) {
      // Degree validation (if provided)
      if (formData.Degree.trim()) {
        const isValidDegree = await validateInput('degree', formData.Degree);
        console.log('Degree validation result:', isValidDegree, 'for value:', formData.Degree);
        if (!isValidDegree) {
          newErrors.Degree = 'Please enter a valid degree (e.g., B.Tech, BCA, MCA)';
        }
      }

      // Institution validation (if provided)
      if (formData.Institution.trim()) {
        const isValidInstitution = await validateInput('institution', formData.Institution);
        console.log('Institution validation result:', isValidInstitution, 'for value:', formData.Institution);
        if (!isValidInstitution) {
          newErrors.Institution = 'Please enter a valid institution name or abbreviation';
        }
      }

      // Graduation Year validation (if provided)
      if (formData.GraduationYear) {
        const currentYear = new Date().getFullYear();
        const year = parseInt(formData.GraduationYear);
        const isValidYear = year >= currentYear - 100 && year <= currentYear + 10;
        console.log('Year validation result:', isValidYear, 'for value:', year);
        if (!isValidYear) {
          newErrors.GraduationYear = 'Please enter a valid graduation year';
        }
      }

      // Grade validation (if provided)
      if (formData.Grade) {
        const grade = parseFloat(formData.Grade);
        const isValidGrade = !isNaN(grade) && ((grade >= 0 && grade <= 10) || (grade >= 0 && grade <= 100));
        console.log('Grade validation result:', isValidGrade, 'for value:', grade);
        if (!isValidGrade) {
          newErrors.Grade = 'Please enter a valid grade (0-10 for CGPA or 0-100 for percentage)';
        }
      }
    }

    if (step === 3) {
      // Company validation (if provided)
      if (formData.Company.trim()) {
        const isValidCompany = await validateInput('company name', formData.Company);
        if (!isValidCompany) {
          newErrors.Company = 'Please enter a valid company name';
        }
      }

      // Position validation (if provided)
      if (formData.Position.trim()) {
        const isValidPosition = await validateInput('job position', formData.Position);
        if (!isValidPosition) {
          newErrors.Position = 'Please enter a valid position';
        }
      }

      // Duration validation (if provided)
      // if (formData.Duration) {
      //   const isValidDuration = await validateInput('work duration', formData.Duration);
      //   if (!isValidDuration) {
      //     newErrors.Duration = 'Please enter a valid duration';
      //   }
      // }

      // Description validation (if provided)
      if (formData.Description.trim()) {
        const isValidDescription = await validateInput('job description', formData.Description);
        if (!isValidDescription) {
          newErrors.Description = 'Please enter a valid description';
        }
      }
    }

    if (step === 4) {
      // Technical Skills validation
      if (!formData.Skills.trim()) {
        newErrors.Skills = 'Technical Skills are required';
      } else {
        const isValidSkills = await validateInput('Skills', formData.Skills);
        if (!isValidSkills) {
          newErrors.Skills = 'Please enter a valid technical skill';
        }
      }

      // Soft Skills validation
      if (!formData.SoftSKills.trim()) {
        newErrors.SoftSKills = 'Soft Skills are required';
      } else {
        const isValidSoftSkills = await validateInput('Soft Skills', formData.SoftSKills);
        if (!isValidSoftSkills) {
          newErrors.SoftSKills = 'Please enter a valid soft skill';
        }
      }

      // Languages validation
      if (!formData.Languages.trim()) {
        newErrors.Languages = 'Languages are required';
      } else {
        const isValidLanguages = await validateInput('Soft Skills', formData.Languages);
        if (!isValidLanguages) {
          newErrors.Languages = 'Please enter a valid language';
        }
      }

      // Interests validation
      if (!formData.Interests.trim()) {
        newErrors.Interests = 'Interests are required';
      } else {
        const isValidInterests = await validateInput('Soft Skills', formData.Interests);
        if (!isValidInterests) {
          newErrors.Interests = 'Please enter a valid interest';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      if (currentStep === 4) {
        try {
          // Create FormData to match the User schema
          const formDataToSend = new FormData();
          Object.keys(formData).forEach(key => {
            let value = formData[key];
            if (key === 'Age' || key === 'GraduationYear' || key === 'Grade') {
              value = value === '' ? null : Number(value);
            }
            if (key === 'Duration' && value) {
              value = new Date(value).toISOString();
            }
            formDataToSend.append(key, value);
          });

          // Update user profile in database
          const result = await updateProfile(formDataToSend, session.user.email);
          
          if (result && result.error) {
            alert(result.error);
          } else {
            alert('Profile updated successfully!');
            router.push('/dashboard');
          }
        } catch (error) {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again.');
        }
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
                  name="FullName"
                  value={formData.FullName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.FullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.FullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.FullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.Email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.Email && (
                  <p className="mt-1 text-sm text-red-500">{errors.Email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleInputChange}
                  placeholder="Your age"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.Age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.Age && (
                  <p className="mt-1 text-sm text-red-500">{errors.Age}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="Location"
                  value={formData.Location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.Location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.Location && (
                  <p className="mt-1 text-sm text-red-500">{errors.Location}</p>
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
                  name="Degree"
                  value={formData.Degree}
                  onChange={handleInputChange}
                  placeholder="Your degree"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  name="Institution"
                  value={formData.Institution}
                  onChange={handleInputChange}
                  placeholder="Your institution"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                <input
                  type="number"
                  name="GraduationYear"
                  value={formData.GraduationYear}
                  onChange={handleInputChange}
                  placeholder="Year of graduation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade/CGPA</label>
                <input
                  type="number"
                  name="Grade"
                  value={formData.Grade}
                  onChange={handleInputChange}
                  placeholder="Your grade or CGPA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  step="0.01"
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
                  name="Company"
                  value={formData.Company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  name="Position"
                  value={formData.Position}
                  onChange={handleInputChange}
                  placeholder="Your position"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="date"
                  name="Duration"
                  value={formData.Duration ? new Date(formData.Duration).toISOString().split('T')[0] : ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="Description"
                  value={formData.Description}
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
                  name="Skills"
                  value={formData.Skills}
                  onChange={handleInputChange}
                  placeholder="Your technical skills"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.Skills ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="2"
                  required
                />
                {errors.Skills && (
                  <p className="mt-1 text-sm text-red-500">{errors.Skills}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Soft Skills <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="SoftSKills"
                  value={formData.SoftSKills}
                  onChange={handleInputChange}
                  placeholder="Your soft skills"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.SoftSKills ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="2"
                  required
                />
                {errors.SoftSKills && (
                  <p className="mt-1 text-sm text-red-500">{errors.SoftSKills}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Languages <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="Languages"
                  value={formData.Languages}
                  onChange={handleInputChange}
                  placeholder="Languages you know"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.Languages ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.Languages && (
                  <p className="mt-1 text-sm text-red-500">{errors.Languages}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interests <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="Interests"
                  value={formData.Interests}
                  onChange={handleInputChange}
                  placeholder="Your interests and hobbies"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.Interests ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="2"
                  required
                />
                {errors.Interests && (
                  <p className="mt-1 text-sm text-red-500">{errors.Interests}</p>
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