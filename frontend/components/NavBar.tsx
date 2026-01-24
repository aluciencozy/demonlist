import { getCurrentUser } from '@/lib/auth';
import NavBarClient from './NavBarClient';
import { Suspense } from 'react';

const NavBar = async () => {
  const user = await getCurrentUser();

  return (
    <NavBarClient user={user} />
  );
};

export default NavBar;