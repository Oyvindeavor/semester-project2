export async function fetchProfile() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profile`
  );
  const data = await response.json();

  if (response.ok) {
    console.log('Profile data:', data.profile);
  } else {
    console.error('Error fetching profile:', data.error);
  }
}
