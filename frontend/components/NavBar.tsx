import { getCurrentUser } from '@/lib/auth';
import NavBarClient from './NavBarClient';

const NavBar = async () => {
  const user = await getCurrentUser();

  return <NavBarClient user={user} />;
};

export default NavBar;
