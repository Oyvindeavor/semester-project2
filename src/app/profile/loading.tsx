import { Skeleton } from '@mui/joy';

export default function Loading() {
  return (
    <div>
      {/* Skeleton for the banner */}
      <div
        style={{
          height: '200px',
          width: '100%',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Skeleton
          variant="rectangular"
          height="100%"
          width="100%"
          animation="pulse"
        />
      </div>

      {/* Skeleton for the avatar and name */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '-50px',
          paddingLeft: '10px',
        }}
      >
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          sx={{ border: '5px solid white' }}
          animation="pulse"
        />
        <Skeleton
          variant="text"
          width={200}
          height={30}
          sx={{ marginLeft: '20px' }}
          animation="pulse"
        />
      </div>

      {/* Skeleton for email */}
      <Skeleton variant="text" width="80%" height={25} animation="pulse" />
      {/* Skeleton for bio */}
      <Skeleton variant="text" width="60%" height={25} animation="pulse" />
    </div>
  );
}
