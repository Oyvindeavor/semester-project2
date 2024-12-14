import React from 'react';
import ProfileHeaderLoading from '@/components/profile/skeleton/ProfileHeader';
import TabPanelProfileLoading from '@/components/profile/skeleton/TabPanelProfile';

const ProfileLoading = () => {
  return (
    <>
      <ProfileHeaderLoading />

      <TabPanelProfileLoading />
    </>
  );
};

export default ProfileLoading;
