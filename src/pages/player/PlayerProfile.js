// what ever code u have just cjange
// player profile to
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
  Box,
} from '@chakra-ui/react';

const PlayerProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const renderInterests = (interests) => {
    return <Text>Interests: {interests.join(', ')}</Text>;
  };
  const fetchProfile = async () => {
    console.log('sss');
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/player/profile`,
        {
          headers,
        }
      );
      if (response.status < 200 || response.status > 300) {
        throw new Error('Failed to fetch profile data');
      }
      const data = response.data;
      setProfileData(data);
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
    return navigate('/player/home');
  };
  const redirecteditprofile = () => {
    return navigate('/player/player-Edit-profile');
  };
  return (
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
        Player Profile
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
          {/* <Divider /> */}
          {profileData.gaming_statistics ? (
            <>
              <Heading as='h2' size='md'>
                Gaming Statistics
              </Heading>
              {profileData.gaming_statistics.map(({ sport, skill }) => (
                <div
                  key={sport}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <Text>{sport}</Text>
                  <Box
                    ml={2}
                    minWidth='100px'
                    borderWidth='1px'
                    borderRadius='md'
                    p={1}
                    textAlign='center'
                  >
                    <Text>{skill}</Text>
                  </Box>
                </div>
              ))}
            </>
          ) : (
            <Text>No gaming statistics available</Text>
          )}

          <Divider />
          <Heading as='h2' size='md'>
            Communication Preferences
          </Heading>
          <Text>
            {profileData.communication_preferences?.preferred_language}
          </Text>
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
            Instagram:{' '}
            {profileData.social_interactions?.social_media_links?.instagram}
          </Text>
          <Text>
            Twitter:{' '}
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
          {/* <Divider /> */}
          {/* <Button colorScheme='blue' onClick={redirectedhome}>
            Home
          </Button> */}
        </>
      )}
    </div>
  );
};

export default PlayerProfile;
