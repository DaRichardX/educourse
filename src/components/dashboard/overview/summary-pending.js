import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

export function SummaryPending({ amount, icon: Icon, title }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={3} sx={{ apercentlignItems: 'center' }}>
          <Avatar
            sx={{
              '--Avatar-size': '48px',
              bgcolor: 'var(--mui-palette-background-paper)',
              boxShadow: 'var(--mui-shadows-8)',
              color: 'var(--mui-palette-text-primary)',
            }}
          >
            <Icon fontSize="var(--icon-fontSize-lg)" />
          </Avatar>
          <div>
            <Typography color="text.secondary" variant="body1">
              {title}
            </Typography>
            <Typography variant="h3">{new Intl.NumberFormat('en-US').format(amount)}</Typography>
          </div>
        </Stack>
      </CardContent>
      <Divider />
      <Box sx={{ p: '16px' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Button variant="contained" style={{ fontSize: '0.8rem' }} size='small' color="secondary">
            Resend Links
          </Button>

        </Stack>
      </Box>
    </Card>
  );
}
