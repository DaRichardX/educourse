'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { logger } from '@/lib/default-logger';
import { useData } from '@/hooks/use-data';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import Typography from '@mui/material/Typography';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';
import Skeleton from '@mui/material/Skeleton';

export function SignupsSummary() {
  const data = useData(); // Custom hook providing `data.get.getTotalSignups`
  const [signups, setSignups] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const trend = 'up';
  const diff = '5';
  const title = 'Sign ups';

  React.useEffect(() => {
    let isMounted = true; // Prevent state updates if component is unmounted

    const fetchSignups = async () => {
      try {
        const result = await data.get.getTotalSignups();
        if (isMounted) {
          setSignups(result);
          setLoading(false);
        }
      } catch (error) {
        logger.error('Error fetching total signups:', error);
        if (isMounted) {
          setSignups('Error fetching data');
          setLoading(false);
        }
      }
    };

    fetchSignups();

    return () => {
      isMounted = false; // Clean up to prevent memory leaks
    };
  }, [data]); // Dependency array

  return (
    <Card>
      <CardContent>
        {loading ? (
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Skeleton variant="circular" width={48} height={48} />
            <div>
              <Skeleton width={100} height={24} />
              <Skeleton width={140} height={32} />
            </div>
          </Stack>
        ) : (
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
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
              <Typography variant="h3">
                {signups}
              </Typography>
            </div>
          </Stack>
        )}
      </CardContent>
      <Divider />
      <Box sx={{ p: '16px' }}>
        {loading ? (
          <Skeleton width="100%" height={32} />
        ) : (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                alignItems: 'center',
                color: trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {trend === 'up' ? (
                <TrendUpIcon fontSize="var(--icon-fontSize-md)" />
              ) : (
                <TrendDownIcon fontSize="var(--icon-fontSize-md)" />
              )}
            </Box>
            <Typography color="text.secondary" variant="body2">
              <Typography
                color={trend === 'up' ? 'success.main' : 'error.main'}
                component="span"
                variant="subtitle2"
              >
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
                  diff / 100
                )}
              </Typography>{' '}
              {trend === 'up' ? 'increase' : 'decrease'} vs last month
            </Typography>
          </Stack>
        )}
      </Box>
    </Card>
  );
}