'use client';

import { fetchuser } from '@/actions/useractions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (session?.user?.email) {
        try {
          const data = await fetchuser(session.user.email);
          setUserData(data);
        } catch (error) {
          console.error('Error loading user data:', error);
        }
        setLoading(false);
      }
    };

    loadUserData();
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">No Profile Data Found</h2>
          <p className="mt-2 text-gray-600">Please complete your profile first.</p>
          <a href="/profile" className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Complete Profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{userData.FullName}</h1>
              <p className="text-gray-600 mt-1">{userData.Email}</p>
              <p className="text-gray-600">{userData.Location}</p>
            </div>
            <div className="flex gap-4">
              <a
                href="/assessment"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Take Career Quiz
              </a>
              <a
                href="/profile"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Edit Profile
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">📚</span>
              <h2 className="text-xl font-semibold text-gray-900">Education</h2>
            </div>
            <div className="space-y-4">
              {userData.Degree && (
                <div>
                  <h3 className="font-medium text-gray-900">{userData.Degree}</h3>
                  <p className="text-gray-600">{userData.Institution}</p>
                  <p className="text-gray-500">
                    Graduation Year: {userData.GraduationYear}
                    {userData.Grade && ` • Grade: ${userData.Grade}`}
                  </p>
                </div>
              )}
              {!userData.Degree && (
                <p className="text-gray-500 italic">No education details provided</p>
              )}
            </div>
          </div>

          {/* Experience Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">💼</span>
              <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
            </div>
            <div className="space-y-4">
              {userData.Company && (
                <div>
                  <h3 className="font-medium text-gray-900">{userData.Position}</h3>
                  <p className="text-gray-600">{userData.Company}</p>
                  <p className="text-gray-500">
                    {userData.Duration && `Since ${new Date(userData.Duration).toLocaleDateString()}`}
                  </p>
                  {userData.Description && (
                    <p className="text-gray-600 mt-2">{userData.Description}</p>
                  )}
                </div>
              )}
              {!userData.Company && (
                <p className="text-gray-500 italic">No experience details provided</p>
              )}
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">💡</span>
              <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Technical Skills</h3>
                <p className="text-gray-600">{userData.Skills}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Soft Skills</h3>
                <p className="text-gray-600">{userData.SoftSKills}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Languages</h3>
                <p className="text-gray-600">{userData.Languages}</p>
              </div>
            </div>
          </div>

          {/* Interests Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">🎯</span>
              <h2 className="text-xl font-semibold text-gray-900">Interests</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">{userData.Interests}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 