// edit profile to
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
const EditProfileformcoach = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    // mobileNumber: '',
    About: '',
    location: '',
    achievements: [], // Array of objects with title, description, and date
    communication_preferences: {
      preferred_language: 'English',
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
  const handleAddStatistic = () => {
    setFormData({
      ...formData,
      achievements: [
        ...formData.achievements,
        { title: '', description: '', date: '' },
      ],
    });
  };
  const handleDeleteStatistic = (index) => {
    const updatedFormData = [...formData.achievements];
    updatedFormData.splice(index, 1);
    setFormData({ ...formData, achievements: updatedFormData });
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    console.log('sss');
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };

      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/coach/profile`,
        {
          headers,
        }
      );
      if (response.status < 200 || response.status > 300) {
        throw new Error('Failed to fetch profile data');
      }
      const data = response.data;
      setProfileData(data);
      setFormData(data); // Initialize form data with fetched profile data
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // console.log(`formdata:`, formData);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}api/coach/updateProfile`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        // Redirect to player profile page
        return navigate('/coach/coach-profile');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const sportList = [
    'Football',
    'Basketball',
    'Tennis',
    'Swimming',
    'Badminton',
  ];
  return (
    <div>
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
              {' '}
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
                  name='name'
                  value={formData.name || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  type='text'
                  name='location'
                  value={formData.location || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, location: e.target.value });
                  }}
                />
              </FormControl>
              {/* <FormControl>
                <FormLabel>About</FormLabel>
                <Input
                  type='text'
                  name='About'
                  value={formData.About || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, About: e.target.value });
                  }}
                />
              </FormControl> */}
              <Divider />
              <Heading as='h2' size='md'>
                Achievements
              </Heading>
              {formData.achievements.map((stat, index) => (
                <div key={index}>
                  <FormLabel>Achievements {index + 1}</FormLabel>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      type='text'
                      name={stat.title}
                      value={stat.title || ''}
                      onChange={(e) => {
                        let new_data = formData.achievements;
                        new_data[index].title = e.target.value;
                        setFormData({
                          ...formData,
                          achievements: new_data,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                      type='text'
                      name={stat.description}
                      value={stat.description || ''}
                      onChange={(e) => {
                        let new_data = formData.achievements;
                        new_data[index].description = e.target.value;
                        setFormData({
                          ...formData,
                          achievements: new_data,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type='date'
                      name={stat.date}
                      value={stat.date || ''}
                      onChange={(e) => {
                        let new_data = formData.achievements;
                        new_data[index].date = e.target.value;
                        setFormData({
                          ...formData,
                          achievements: new_data,
                        });
                      }}
                    />
                  </FormControl>
                  <Button onClick={() => handleDeleteStatistic(index)}>
                    Delete
                  </Button>
                  <Divider />
                </div>
              ))}
              <Button onClick={handleAddStatistic}>Add Achievements</Button>
              {/* <Divider />
            {formData.gaming_statistics.length === 0 && (
              <Button onClick={handleAddStatistic}>Add Gaming Statistic</Button>
            )} */}
              <Divider />
              <Heading as='h2' size='md'>
                Communication Preferences
              </Heading>
              <FormControl>
                <FormLabel>Preferred Language</FormLabel>
                <Input
                  type='text'
                  name='communication_preferences.preferred_language'
                  value={formData.communication_preferences.preferred_language}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      communication_preferences: {
                        preferred_language: e.target.value,
                      },
                    });
                  }}
                />
              </FormControl>
              <Divider />
              <Heading as='h2' size='md'>
                Social Interactions
              </Heading>
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Input
                  type='text'
                  name='social_interactions.bio'
                  value={formData.social_interactions.bio}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      social_interactions: {
                        ...formData.social_interactions,
                        bio: e.target.value,
                      },
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Facebook</FormLabel>
                <Input
                  type='text'
                  name='social_interactions.social_media_links.facebook'
                  value={
                    formData?.social_interactions?.social_media_links?.facebook
                  }
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      social_interactions: {
                        ...formData.social_interactions,
                        social_media_links: {
                          ...formData.social_interactions.social_media_links,
                          facebook: e.target.value,
                        },
                      },
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Twitter</FormLabel>
                <Input
                  type='text'
                  name='social_interactions.social_media_links.twitter'
                  value={
                    formData?.social_interactions?.social_media_links?.instagram
                  }
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      social_interactions: {
                        ...formData.social_interactions,
                        social_media_links: {
                          ...formData.social_interactions.social_media_links,
                          instagram: e.target.value,
                        },
                      },
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Instagram</FormLabel>
                <Input
                  type='text'
                  name='social_interactions.social_media_links.instagram'
                  value={
                    formData?.social_interactions?.social_media_links?.twitter
                  }
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      social_interactions: {
                        ...formData.social_interactions,
                        social_media_links: {
                          ...formData.social_interactions.social_media_links,
                          twitter: e.target.value,
                        },
                      },
                    });
                  }}
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
    </div>
  );
};

export default EditProfileformcoach;
