'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { logger } from '@/lib/default-logger';

import Typography from '@mui/material/Typography';
import { CaretUpDown as CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';

import { usePopover } from '@/hooks/use-popover';

import { WorkspacesPopover } from './workspaces-popover';
import { useUser } from '@/hooks/use-user';

export function WorkspacesSwitch() {
  const popover = usePopover();
  const user = useUser().user;
  logger.debug("worksplace", user)
  if(user === null){
    return;
  }
  const workspace = [{name: user.org_name, id: user.org_id, avatar: '/assets/workspace-avatar-uhill.jpg'}]

  //await multi workspace, currently userData only has one org_id field. In future, it will be
  // orgid, role pairs so that they can log onto multi workspaces. This is hardcoded so that it work currently.
  return (
    <React.Fragment>
      <Stack
        direction="row"
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        spacing={2}
        sx={{
          alignItems: 'center',
          border: '1px solid var(--Workspaces-border-color)',
          borderRadius: '12px',
          cursor: 'pointer',
          p: '4px 8px',
        }}
      >
        <Avatar src={workspace[0].avatar} variant="rounded" />
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography color="var(--Workspaces-title-color)" variant="caption">
            Workspace
          </Typography>
          <Typography color="var(--Workspaces-name-color)" variant="subtitle2">
            {workspace[0].name}
          </Typography>
        </Box>
        <CaretUpDownIcon color="var(--Workspaces-expand-color)" fontSize="var(--icon-fontSize-sm)" />
      </Stack>
      <WorkspacesPopover
        workspaces={workspace}
        anchorEl={popover.anchorRef.current}
        onChange={popover.handleClose}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </React.Fragment>
  );
}
