// import * as React from 'react';
// import { Box, Typography, Input, Card } from '@mui/joy';

// import CardOverflow from '@mui/joy/CardOverflow';
// import CardContent from '@mui/joy/CardContent';
// import Divider from '@mui/joy/Divider';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Button from '@mui/joy/Button';

// export default function Home() {
//   return (
//     <Box>
//       {/* Header */}
//       <Box
//         sx={{
//           textAlign: 'center',
//           py: 4,
//           background: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
//         }}
//       >
//         <Typography level="h1" sx={{ mb: 2 }}>
//           Discover Your Next Auction
//         </Typography>
//         <Typography level="body-lg" sx={{ mb: 4 }}>
//           Explore the best deals and listings. Bid before its too late!
//         </Typography>
//         <Input
//           placeholder="Search for items..."
//           size="lg"
//           sx={{
//             maxWidth: '600px',
//             margin: '0 auto',
//             borderRadius: 'xl',
//             boxShadow: 'md',
//           }}
//         />
//       </Box>

//       {/* Categories Section */}
//       <Box sx={{ py: 4 }}>
//         <Typography level="h3" sx={{ textAlign: 'center', mb: 3 }}>
//           Categories
//         </Typography>
//         <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
//           {['Electronics', 'Fashion', 'Home', 'Toys', 'Vehicles'].map(
//             (category, index) => (
//               <Button
//                 key={index}
//                 variant="outlined"
//                 sx={{
//                   width: '120px',
//                   height: '40px',
//                   borderRadius: 'md',
//                 }}
//               >
//                 {category}
//               </Button>
//             )
//           )}
//         </Box>
//       </Box>

//       {/* Ending Soon Section */}
//       <Box sx={{ py: 4, px: 2, backgroundColor: 'background.level2' }}>
//         <Typography level="h3" sx={{ textAlign: 'center', mb: 3 }}>
//           Ending Soon
//         </Typography>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             gap: 2,
//             flexWrap: 'wrap',
//           }}
//         >
//           {[...Array(3)].map((_, index) => (
//             <Card
//               key={index}
//               variant="outlined"
//               sx={{
//                 width: '280px',
//                 borderRadius: 'md',
//                 boxShadow: 'lg',
//                 transition: 'transform 0.2s, box-shadow 0.2s',
//                 '&:hover': {
//                   transform: 'scale(1.05)',
//                   boxShadow: 'xl',
//                 },
//               }}
//             >
//               <CardOverflow>
//                 <AspectRatio ratio="4/3">
//                   <img //eslint-disable-next-line
//                     src="https://images.finncdn.no/dynamic/1600w/2024/11/vertical-0/22/9/379/594/409_1e833f03-e98b-416e-86b3-5e4da5cc918b.jpg"
//                     alt="Popular Item"
//                     style={{ objectFit: 'cover' }}
//                   />
//                 </AspectRatio>
//               </CardOverflow>
//               <CardContent>
//                 <Typography level="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
//                   Popular Item {index + 1}
//                 </Typography>
//                 <Typography
//                   level="body-sm"
//                   textColor="text.secondary"
//                   sx={{ mb: 1 }}
//                 >
//                   Starting bid: <strong>$199</strong>
//                 </Typography>
//                 <Button
//                   variant="solid"
//                   size="sm"
//                   sx={{
//                     backgroundColor: 'primary.500',
//                     color: 'white',
//                     mt: 1,
//                     ':hover': {
//                       backgroundColor: 'primary.600',
//                     },
//                   }}
//                 >
//                   Place Bid
//                 </Button>
//               </CardContent>
//               <CardOverflow
//                 variant="soft"
//                 sx={{
//                   bgcolor: 'background.level1',
//                   borderTop: '1px solid',
//                   borderColor: 'divider',
//                 }}
//               >
//                 <CardContent orientation="horizontal" sx={{ gap: 2 }}>
//                   <Typography level="body-xs" textColor="text.secondary">
//                     12.3k views
//                   </Typography>
//                   <Divider orientation="vertical" />
//                   <Typography level="body-xs" textColor="text.secondary">
//                     Ends in 2h
//                   </Typography>
//                 </CardContent>
//               </CardOverflow>
//             </Card>
//           ))}
//         </Box>
//       </Box>

//       {/* Popular Listings Section */}
//       <Box sx={{ py: 4, px: 2 }}>
//         <Typography level="h3" sx={{ textAlign: 'center', mb: 3 }}>
//           Popular Listings
//         </Typography>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             gap: 2,
//             flexWrap: 'wrap',
//           }}
//         >
//           {[...Array(3)].map((_, index) => (
//             <Card
//               key={index}
//               variant="outlined"
//               sx={{
//                 width: '280px',
//                 borderRadius: 'md',
//                 boxShadow: 'lg',
//                 transition: 'transform 0.2s, box-shadow 0.2s',
//                 '&:hover': {
//                   transform: 'scale(1.05)',
//                   boxShadow: 'xl',
//                 },
//               }}
//             >
//               <CardOverflow>
//                 <AspectRatio ratio="4/3">
//                   <img // eslint-disable-line no-console
//                     src="https://via.placeholder.com/300"
//                     alt="Popular Item"
//                     style={{ objectFit: 'cover' }}
//                   />
//                 </AspectRatio>
//               </CardOverflow>
//               <CardContent>
//                 <Typography level="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
//                   Popular Item {index + 1}
//                 </Typography>
//                 <Typography
//                   level="body-sm"
//                   textColor="text.secondary"
//                   sx={{ mb: 1 }}
//                 >
//                   Starting bid: <strong>$199</strong>
//                 </Typography>
//                 <Button
//                   variant="solid"
//                   size="sm"
//                   sx={{
//                     backgroundColor: 'primary.500',
//                     color: 'white',
//                     mt: 1,
//                     ':hover': {
//                       backgroundColor: 'primary.600',
//                     },
//                   }}
//                 >
//                   Place Bid
//                 </Button>
//               </CardContent>
//               <CardOverflow
//                 variant="soft"
//                 sx={{
//                   bgcolor: 'background.level1',
//                   borderTop: '1px solid',
//                   borderColor: 'divider',
//                 }}
//               >
//                 <CardContent orientation="horizontal" sx={{ gap: 2 }}>
//                   <Typography level="body-xs" textColor="text.secondary">
//                     12.3k views
//                   </Typography>
//                   <Divider orientation="vertical" />
//                   <Typography level="body-xs" textColor="text.secondary">
//                     Ends in 2h
//                   </Typography>
//                 </CardContent>
//               </CardOverflow>
//             </Card>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from '@mui/material';

export default function Home() {
  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Discover Your Next Auction
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Explore the best deals and listings. Bid before it’s too late!
        </Typography>
        <TextField
          placeholder="Search for items..."
          variant="outlined"
          size="medium"
          sx={{
            maxWidth: '600px',
            width: '100%',
            borderRadius: 2,

            boxShadow: 1,
          }}
        />
      </Box>

      {/* Categories Section */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Categories
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {['Electronics', 'Fashion', 'Home', 'Toys', 'Vehicles'].map(
            (category, index) => (
              <Button
                key={index}
                variant="outlined"
                sx={{
                  width: '120px',
                  height: '40px',
                  borderRadius: 2,
                }}
              >
                {category}
              </Button>
            )
          )}
        </Box>
      </Box>

      {/* Ending Soon Section */}
      <Box sx={{ py: 4, px: 2 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Ending Soon
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              sx={{
                width: '280px',
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image="https://images.finncdn.no/dynamic/1600w/2024/11/vertical-0/22/9/379/594/409_1e833f03-e98b-416e-86b3-5e4da5cc918b.jpg"
                alt={`Image of Popular Item ${index + 1}`}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Popular Item {index + 1}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Starting bid: <strong>$199</strong>
                </Typography>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 2,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  12.3k views
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Ends in 2h
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
