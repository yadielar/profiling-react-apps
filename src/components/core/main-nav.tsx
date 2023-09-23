import {
  NavLink as RouterNavLink,
  NavLinkProps as RouterNavLinkProps,
  useHref,
  useMatch,
} from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const NavLink = ({ to, ...props }: RouterNavLinkProps) => {
  const href = useHref(to);
  const match = useMatch(href);

  return (
    <NavigationMenuLink active={match !== null} asChild>
      <RouterNavLink to={to} {...props} />
    </NavigationMenuLink>
  );
};

export function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink to="/">Home</NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Calendar</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavLink to="/calendar">Calendar (Not optimized)</NavLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
