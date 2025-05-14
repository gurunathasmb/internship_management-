import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You can use fetch or any other library to make API calls

const CompanyAnalytics = () => {
  // State to hold analytics data, loading state, and error
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data when the component mounts
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Replace with your backend API endpoint
        const response = await axios.get('http://localhost:5000/api/company/analytics');
        setAnalyticsData(response.data);
      } catch (err) {
        setError('Error fetching analytics data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <p>Loading analytics data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Company Analytics</h2>
      <div>
        <h3>Applications per Internship</h3>
        <ul>
          {analyticsData.applicationsPerInternship.map((internship, index) => (
            <li key={index}>
              {internship.title}: {internship.applicationCount} applications
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Conversion Rates</h3>
        <ul>
          {analyticsData.conversionRates.map((rate, index) => (
            <li key={index}>
              {rate.internshipTitle}: {rate.conversionRate}%
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Feedback</h3>
        <p>{analyticsData.feedback}</p>
      </div>
    </div>
  );
};

export default CompanyAnalytics;
