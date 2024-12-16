import * as React from 'react';

import { config } from '@/config';
import { Faqs } from '@/components/marketing/home/faqs';
import { Features } from '@/components/marketing/home/features';
import { Hero } from '@/components/marketing/home/hero';
import { redirect } from 'next/navigation'
import { Included } from '@/components/marketing/home/included';
import { Productivity } from '@/components/marketing/home/productivity';
import { StartBuilding } from '@/components/marketing/home/start-building';
import { Testimonails } from '@/components/marketing/home/testimonials';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  //redirect("/auth/sign-in")
  //^^ page lock
  return (
    <div>
      <Hero />
      {/* Include productivity for schools later*/}
      {/*<Productivity />*/}
      <Included />
      {/*<Features />*/}
      {/*<Testimonails />*/}
      <Faqs />
      <StartBuilding />
    </div>
  );
}
