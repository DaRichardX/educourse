'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { logger } from '@/lib/default-logger';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTotalSignups } from "@/queries/capstone-queries";

export function SignupsSummary() {
  const percentage = '70.1'
  const title = 'Sign ups';

  const { data: totalSignups, error, isLoading } = useTotalSignups("example");

  
  return (
    <Card>
      <CardContent>
      {isLoading ? (
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Skeleton variant="circular" width={48} height={48} />
            <div>
              <Skeleton width={100} height={24} />
              <Skeleton width={140} height={32} />
            </div>
          </Stack>
        ) : (
          <Stack direction="row" spacing={3} sx={{ apercentlignItems: 'center' }}>
            <Avatar
              sx={{
                '--Avatar-size': '48px',
                bgcolor: 'var(--mui-palette-background-paper)',
                boxShadow: 'var(--mui-shadows-8)',
                color: 'var(--mui-palette-text-primary)',
              }}
            >
              <UsersIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
            <div>
              <Typography color="text.secondary" variant="body1">
                {title}
              </Typography>
              <Typography variant="h3">{new Intl.NumberFormat('en-US').format(totalSignups)}</Typography>
            </div>
          </Stack>
          )}
      </CardContent>
      <Divider />
      <Box sx={{ p: '16px' }}>
      {isLoading ? (
          <Skeleton width="100%" height={32} />
        ) : (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            <Typography component="span" sx={{ fontSize: '1.2rem' }}>
              {percentage}%
            </Typography>{' '}
            completed
          </Typography>
        </Stack>
        )}
      </Box>
    </Card>
  );
}