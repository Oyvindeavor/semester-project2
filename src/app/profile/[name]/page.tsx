import Profile from '@/components/profile/profile';

export default async function ProfilePage(props: {
  params: Promise<{ name: string }>;
}) {
  const params = await props.params;
  const { name } = params;

  return (
    <div>
      <h1>Profile Page</h1>
      <Profile name={name} />
    </div>
  );
}
