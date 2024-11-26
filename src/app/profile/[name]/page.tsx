import Profile from '@/components/profile/profile';

export default function ProfilePage({ params }: { params: { name: string } }) {
  const { name } = params;

  return (
    <div>
      <h1>Profile Page</h1>
      <Profile name={name} />
    </div>
  );
}
