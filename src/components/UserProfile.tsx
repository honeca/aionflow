import React from 'react';

const UserProfile: React.FC = () => {
  return (
    <div className="flex items-center gap-3 bg-[#0d1b2a] rounded-full p-2 pr-4 border border-gray-800/50">
      <img
        src="https://i.pravatar.cc/150?img=32"
        alt="Júlia Santos"
        className="w-12 h-12 rounded-full border-2 border-blue-500"
      />
      <div>
        <p className="text-sm font-semibold">Júlia Santos</p>
        <p className="text-xs text-gray-400">Contadora</p>
      </div>
    </div>
  );
};

export default UserProfile;
