export async function fetchProfile() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profile`
  );
  const data = await response.json();

  if (response.ok) {
  } else {
    console.error('Error fetching profile:', data.error);
  }
}
