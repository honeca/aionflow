import React from 'react';
import StatCards from '../components/StatCards';
import BookingChart from '../components/BookingChart';
import DeviceChart from '../components/DeviceChart';
import NextMeeting from '../components/NextMeeting';
import UpcomingEvents from '../components/UpcomingEvents';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <StatCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingChart />
        <DeviceChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NextMeeting />
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default Dashboard;
