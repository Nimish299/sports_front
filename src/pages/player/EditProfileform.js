import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Heading,
  Text,
  Divider,
} from '@chakra-ui/react';
import axios from 'axios';
const EditProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    gaming_statistics: [],
    communication_preferences: {
      preferred_language: '',
    },
    social_interactions: {
      bio: '',
      interests: [],
      social_media_links: {
        facebook: '',
        twitter: '',
        instagram: '',
      },
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          'https://sports-back.onrender.com/api/player/profile'
        );
        const data = response.data;
        setProfileData(data);
        setFormData(data); // Initialize form data with fetched profile data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const handleAddStatistic = () => {
    setFormData({
      ...formData,
      gaming_statistics: [
        ...formData.gaming_statistics,
        { sport: '', skill: '' },
      ],
    });
  };
  const handleDeleteStatistic = (index) => {
    const updatedFormData = [...formData.gaming_statistics];
    updatedFormData.splice(index, 1);
    setFormData({ ...formData, gaming_statistics: updatedFormData });
  };

  // Handle changes in form fields
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith('gaming_statistics[')) {
      const fieldName = name.split('.')[1]; // Extracting field name from gaming_statistics[index].field_name
      const updatedStats = [...formData.gaming_statistics];
      updatedStats[index][fieldName] = value;
      setFormData({ ...formData, gaming_statistics: updatedStats });
    } else if (name.startsWith('social_interactions.interests')) {
      const interests = value.split(',').map((item) => item.trim()); // Convert comma-separated interests to an array
      setFormData({
        ...formData,
        social_interactions: {
          ...formData.social_interactions,
          interests,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.put(
        'https://sports-back.onrender.com/api/player/updateProfile',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Redirect to player profile page
      window.location.href = '/player/player-profile'; // Or use React Router for navigation
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align='flex-start'>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        <Heading as='h1' size='lg'>
          Edit Profile
        </Heading>
        {loading ? (
          <Text>Loading profile...</Text>
        ) : error ? (
          <Text color='red.500'>{error}</Text>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type='text'
                name='name'
                value={formData.name || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                type='text'
                name='location'
                value={formData.location || ''}
                onChange={handleChange}
              />
            </FormControl>
            <Divider />
            <Heading as='h2' size='md'>
              Gaming Statistics
            </Heading>
            {formData.gaming_statistics.map((stat, index) => (
              <div key={index}>
                <FormLabel>Game {index + 1}</FormLabel>
                <FormControl>
                  <FormLabel>Sport</FormLabel>
                  <Input
                    type='text'
                    name={`gaming_statistics[${index}].sport`}
                    value={stat.sport || ''}
                    onChange={(e) => handleChange(e, index)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Skill</FormLabel>
                  <Input
                    type='text'
                    name={`gaming_statistics[${index}].skill`}
                    value={stat.skill || ''}
                    onChange={(e) => handleChange(e, index)}
                  />
                </FormControl>
                <Button onClick={() => handleDeleteStatistic(index)}>
                  Delete
                </Button>
                <Divider />
              </div>
            ))}
            <Button onClick={handleAddStatistic}>Add Gaming Statistic</Button>
            <Divider />
            {formData.gaming_statistics.length === 0 && (
              <Button onClick={handleAddStatistic}>Add Gaming Statistic</Button>
            )}
            <Divider />
            <Heading as='h2' size='md'>
              Communication Preferences
            </Heading>
            <FormControl>
              <FormLabel>Preferred Language</FormLabel>
              <Input
                type='text'
                name='communication_preferences.preferred_language'
                value={
                  formData.communication_preferences?.preferred_language || ''
                }
                onChange={handleChange}
              />
            </FormControl>
            <Divider />
            <Heading as='h2' size='md'>
              Social Interactions
            </Heading>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea
                name='social_interactions.bio'
                value={formData.social_interactions?.bio || ''}
                onChange={handleChange}
                type='text'
              />
            </FormControl>
            <FormControl>
              <FormLabel>Interests</FormLabel>
              <Input
                type='text'
                name='social_interactions.interests'
                value={(formData.social_interactions?.interests || []).join(
                  ', '
                )}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Facebook</FormLabel>
              <Input
                type='text'
                name='social_interactions.social_media_links.facebook'
                value={
                  formData.social_interactions?.social_media_links?.facebook ||
                  ''
                }
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Twitter</FormLabel>
              <Input
                type='text'
                name='social_interactions.social_media_links.twitter'
                value={
                  formData.social_interactions?.social_media_links?.twitter ||
                  ''
                }
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Instagram</FormLabel>
              <Input
                type='text'
                name='social_interactions.social_media_links.instagram'
                value={
                  formData.social_interactions?.social_media_links?.instagram ||
                  ''
                }
                onChange={handleChange}
              />
            </FormControl>
            <Divider />

            <Button type='submit' colorScheme='blue'>
              Submit
              {/* <a href='/player/player-profile'>Submit</a> */}
            </Button>
          </form>
        )}
      </div>
    </VStack>
  );
};
export default EditProfile;
