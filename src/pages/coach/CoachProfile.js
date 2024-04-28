import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  FormControl,
  FormLabel,
  Button,
  Heading,
  Text,
  Divider,
} from '@chakra-ui/react';
const CoachProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchProfile = async () => {
    console.log('sss');
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/coach/profile`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status < 200 || response.status > 300) {
        throw new Error('Failed to fetch profile data');
      }
      const data = response.data;
      setProfileData(data);
      console.log(`data:`, data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const redirectedhome = () => {
    return navigate('/coach/home');
  };
  const redirecteditprofile = () => {
    return navigate('/coach/coach-Edit-profile');
  };
  return (
    <div>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          width: '25rem',

          // alignContent: 'center',
        }}
      >
        <Heading as='h1' size='lg'>
          Coach Profile
        </Heading>
        {loading ? (
          <Text>Loading profile...</Text>
        ) : error ? (
          <Text color='red.500'>{error}</Text>
        ) : (
          <>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Text>{profileData.name}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Text>{profileData.emailID}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Mobile Number</FormLabel>
              <Text>{profileData.mobileNumber}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Text>{profileData.location}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Sports</FormLabel>
              <Text>{profileData.sport}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Experience</FormLabel>
              <Text>{profileData.coaching_experience_years}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Certification</FormLabel>
              <Text>{profileData.certifications}</Text>
            </FormControl>
            <Divider />
            <Heading as='h2' size='md'>
              Communication Preferences
            </Heading>
            <Text>
              {profileData.communication_preferences?.preferred_language}
            </Text>
            <Divider />

            <Heading as='h2' size='md'>
              Enrolled students
            </Heading>
            <Text>{profileData.applied_students.length}</Text>
            <Divider />

            <Heading as='h2' size='md'>
              About
            </Heading>
            <Text>{profileData.about}</Text>
            <Divider />
            {profileData.achievements.length > 0 && (
              <>
                <Heading as='h2' size='md'>
                  Achievements
                </Heading>
                {profileData.achievements.map((achievement, index) => (
                  <div key={index}>
                    <Text>Title: {achievement.title}</Text>
                    <Text>Description: {achievement.description}</Text>
                    <Text>Date: {achievement.date}</Text>
                    {index !== profileData.achievements.length - 1 && (
                      <Divider />
                    )}{' '}
                    {/* Add divider except for the last achievement */}
                  </div>
                ))}
              </>
            )}
            <Divider />
            <Heading as='h2' size='md'>
              Social Interactions
            </Heading>

            <Text>Bio: {profileData.social_interactions?.bio}</Text>
            <Text>
              facebook:{' '}
              {profileData.social_interactions?.social_media_links?.facebook}
            </Text>
            <Text>
              instagram:{' '}
              {profileData.social_interactions?.social_media_links?.instagram}
            </Text>
            <Text>
              twitter:{' '}
              {profileData.social_interactions?.social_media_links?.twitter}
            </Text>
            <Divider />
            {/* <Heading as='h2' size='md'>
              Feedback and Ratings
            </Heading>
            <Text>Ratings: {profileData.feedback_and_ratings?.ratings}</Text>
            <Text>
              Reviews: {profileData.feedback_and_ratings?.reviews?.join(', ')}
            </Text> */}
            <Button colorScheme='blue' onClick={redirecteditprofile}>
              Edit Profile
            </Button>
            <Divider />
            <Button colorScheme='blue' onClick={redirectedhome}>
              Home
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CoachProfile;
