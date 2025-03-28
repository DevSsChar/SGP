"use client";
import { fetchuser } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

/**
 * Checks if user profile is complete based on user data
 * @param {string} email - User's email
 * @returns {Object} - Object with isComplete boolean and missingFields array
 */
export const profileDone = async (email) => {
  try {
    // Check if email is provided
    if (!email) {
      return { isComplete: false, missingFields: ['Email required'] };
    }

    // Fetch user data
    const userData = await fetchuser(email);
    
    // Check if user exists
    if (!userData) {
      return { isComplete: false, missingFields: ['User not found'] };
    }

    // Required fields
    const requiredFields = [
      'FullName',
      'Email',
      'Age',
      'Location',
      'Skills',
      'SoftSKills',
      'Languages',
      'Interests'
    ];

    // Check for missing fields
    const missingFields = [];
    
    for (const field of requiredFields) {
      if (
        userData[field] === undefined ||
        userData[field] === null ||
        (typeof userData[field] === 'string' && userData[field].trim() === '') ||
        (typeof userData[field] === 'number' && isNaN(userData[field]))
      ) {
        missingFields.push(field);
      }
    }
    console.log(missingFields);
    return {
      isComplete: missingFields.length === 0,
      missingFields
    };
  } catch (error) {
    console.error("Error checking profile:", error);
    return { isComplete: false, error: error.message };
  }
};

export function useProfileCompleteness() {
  const { data: session } = useSession();
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [missingFields, setMissingFields] = useState([]);

  useEffect(() => {
    const checkProfileCompleteness = async () => {
      setLoading(true);

      try {
        // If no session or email, profile is incomplete
        if (!session?.user?.email) {
          setIsComplete(false);
          setMissingFields(['Not authenticated']);
          setLoading(false);
          return;
        }

        // Use profileDone function to check profile completeness
        const { isComplete: complete, missingFields: missing } = await profileDone(session.user.email);

        setMissingFields(missing);
        setIsComplete(complete);
      } catch (error) {
        console.error("Error checking profile completion:", error);
        setIsComplete(false);
        setMissingFields(['Error: ' + error.message]);
      } finally {
        setLoading(false);
      }
    };

    checkProfileCompleteness();
  }, [session]);

  return { isComplete, loading, missingFields };
}

export default profileDone;