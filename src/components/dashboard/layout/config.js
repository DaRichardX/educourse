import { paths } from '@/paths';

export const layoutConfig = {
  navItems: [
    {
      key: 'dashboards',
      title: 'Dashboards',
      items: [
        { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'house' }
      ],
    },
    {
      key: 'capstone',
      title: 'Capstone',
      items: [
        {
          key: 'capstone',
          title: 'Capstone',
          items: [
            {
              key: 'capstone:rooms',
              title: 'Rooms',
              href: paths.dashboard.capstone.rooms,
            },
            {
              key: 'capstone:presentors',
              title: 'Presentors',
              href: paths.dashboard.capstone.presenters,

            },
            {
              key: 'capstone:registration',
              title: 'Registrations',
              href: paths.dashboard.capstone.registration,

            },
            {
              key: 'capstone:placement',
              title: 'Export Placement',
              href: paths.dashboard.capstone.placement,

            }
          ],
          //href: paths.dashboard.settings.account,
          icon: 'read-cv-logo',
          //matcher: { type: 'startsWith', href: '/dashboard/settings' },
        },
      ]
    },
    // {
    //   key: 'courseplanning',
    //   title: 'Course Planning',
    //   items: [
    //     {
    //       key: 'teachers_and_courses',
    //       title: 'Teachers & Courses',
    //       icon: 'chalkboard',
    //       items: [
    //         {
    //           key: 'teachers_and_courses:overview',
    //           title: 'Section Overview',
    //         },
    //         {
    //           key: 'teachers_and_courses:courses',
    //           title: 'Courses',
    //         },
    //         {
    //           key: 'teachers_and_courses:teachers',
    //           title: 'Teachers',
    //         },
    //       ],
    //     },
    //     {
    //       key: 'students',
    //       title: 'Students',
    //       icon: 'student',
    //       items: [
    //         {
    //           key: 'students:overview',
    //           title: 'Section Overview',
    //         },
    //         {
    //           key: 'students:manage',
    //           title: 'View & Manage Students',
    //           href: paths.dashboard.students.list
    //         },
    //       ],
    //     },
    //     {
    //       key: 'current_schedule',
    //       title: 'Current Schedule',
    //       icon: 'calendardots',
    //       items: [
    //         {
    //           key: 'current_schedule:overview',
    //           title: 'Schedule Overview',
    //         },
    //         {
    //           key: 'current_schedule:classes',
    //           title: 'Classes',
    //         },
    //         {
    //           key: 'current_schedule:view_individual',
    //           title: 'View as Individual',
    //         },
    //       ],
    //     },
    //     { key: 'courseplan_settings', title: 'Settings', href: paths.pricing, icon: 'gear' },
    //     { key: 'build_course', title: 'Checkout', href: paths.checkout, icon: 'sign-out' },
    //     { key: 'contact', title: 'Contact', href: paths.contact, icon: 'address-book' },
    //     {
    //       key: 'error',
    //       title: 'Error',
    //       icon: 'file-x',
    //       items: [
    //         { key: 'error:not-authorized', title: 'Not authorized', href: paths.notAuthorized },
    //         { key: 'error:not-found', title: 'Not found', href: paths.notFound },
    //         { key: 'error:internal-server-error', title: 'Internal server error', href: paths.internalServerError },
    //       ],
    //     },
    //   ],
    // }
  ],
};
