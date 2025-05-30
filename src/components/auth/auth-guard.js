'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { config } from '@/config';
import { paths } from '@/paths';
import { AuthStrategy } from '@/lib/auth/strategy';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export function AuthGuard({ children }) {
  const router = useRouter();
  const { isAuthenticated, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState(true);

  const checkPermissions = async () => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (!isAuthenticated) {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');

      switch (config.auth.strategy) {
        case AuthStrategy.CUSTOM: {
          router.replace(paths.auth.custom.signIn);
          return;
        }
        case AuthStrategy.FIREBASE: {
          router.replace(paths.auth.firebase.signIn);
          return;
        }
        case AuthStrategy.SUPABASE: {
          router.replace(paths.auth.supabase.signIn);
          return;
        }
        default: {
          logger.error('[AuthGuard]: Unknown auth strategy');
          return;
        }
      }
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [isAuthenticated, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
