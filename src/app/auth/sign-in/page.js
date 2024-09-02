import * as React from 'react';

import { config } from '@/config';
import { SignInForm } from '@/components/auth/firebase/sign-in-form';
import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';
import { CenteredLayout } from '@/components/auth/centered-layout';

export const metadata = { title: `Log In to Your ${config.site.name} Account` };

export default function Page() {
  return (
    <GuestGuard>
      <CenteredLayout>
        <SignInForm />
      </CenteredLayout>
    </GuestGuard>
  );
}
