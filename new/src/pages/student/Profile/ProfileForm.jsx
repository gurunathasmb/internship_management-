import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileForm = () => {
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    academicDetails: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/student/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setStudent(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          contact: response.data.contact,
          academicDetails: response.data.academicDetails
        });
        setLoading(false);
      } catch (err) {
        setError('Error fetching profile. Please try again.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for creating or updating the profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (student) {
        // Update existing profile
        response = await axios.put('/api/student/profile', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        // Create new profile if no profile exists
        response = await axios.post('/api/student/profile', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }

      setStudent(response.data.student); // Update the student profile after successful action
      setIsEditing(false); // Exit edit mode
      alert(response.data.message); // Show success message
    } catch (err) {
      console.error('Error handling profile', err);
      setError('Error processing the profile. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{student ? 'Update Profile' : 'Create Profile'}</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={student} // Prevent email editing if already created
          />
        </div>
        <div>
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Academic Details</label>
          <textarea
            name="academicDetails"
            value={formData.academicDetails}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{student ? 'Update' : 'Create'} Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
