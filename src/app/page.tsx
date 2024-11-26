import * as React from 'react';
import { Box, Sheet, Typography, Input, Card, Stack } from '@mui/joy';
import Link from 'next/link';
import CardOverflow from '@mui/joy/CardOverflow';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import AspectRatio from '@mui/joy/AspectRatio';
import GlobalStyles from '@mui/joy/GlobalStyles';

export default function Home() {
  return (
    <Box>
      <Box
        className="search-container"
        sx={{
          width: '1000px',
          margin: '0 auto',
          padding: 2,
        }}
      >
        <Link href="/about">About</Link>

        <Link href="/login">login</Link>
        <Link href="/register">register</Link>
        <Typography level="h1" sx={{ marginBottom: 2 }}>
          Test Joy UI
        </Typography>
        <Typography level-md="body" sx={{ marginBottom: 4 }}>
          This is a sample Joy UI integration with Next.js.
        </Typography>

        <Input placeholder="Search" size="lg" />

        <Card>
          <Sheet>
            <Typography level="h2">Card Title</Typography>
            <Typography>
              This is a card with a sheet inside. It has a title and body text.
            </Typography>
          </Sheet>
        </Card>

        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Link href={'/'}>
            <Card variant="outlined" sx={{ width: 250 }}>
              <CardOverflow>
                <AspectRatio ratio="1">
                  <img
                    src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                    srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">Yosemite National Park</Typography>
                <Typography level="body-sm">299$ latest bid</Typography>
              </CardContent>
              <CardOverflow
                variant="soft"
                sx={{ bgcolor: 'background.level1' }}
              >
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                  <Typography
                    level="body-xs"
                    textColor="text.secondary"
                    sx={{ fontWeight: 'md' }}
                  >
                    6.3k views
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography
                    level="body-xs"
                    textColor="text.secondary"
                    sx={{ fontWeight: 'md' }}
                  >
                    1 hour ago
                  </Typography>
                </CardContent>
              </CardOverflow>
            </Card>
          </Link>

          <Link href={'/'}>
            <Card variant="outlined" sx={{ width: 320 }}>
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img
                    src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                    srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">Yosemite National Park</Typography>
                <Typography level="body-sm">299$ latest bid</Typography>
              </CardContent>
              <CardOverflow
                variant="soft"
                sx={{ bgcolor: 'background.level1' }}
              >
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                  <Typography
                    level="body-xs"
                    textColor="text.secondary"
                    sx={{ fontWeight: 'md' }}
                  >
                    6.3k views
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography
                    level="body-xs"
                    textColor="text.secondary"
                    sx={{ fontWeight: 'md' }}
                  >
                    1 hour ago
                  </Typography>
                </CardContent>
              </CardOverflow>
            </Card>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
