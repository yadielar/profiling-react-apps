import { memo } from 'react';
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
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export const MainNav = memo(function MainNav() {
  return (
    <NavigationMenu className="p-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink to="/">Home</NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Calendar</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavUl>
              <li>
                <NavLink to="/calendar-not-optimized">
                  Calendar (Not optimized)
                </NavLink>
              </li>
              <li>
                <NavLink to="/calendar-optimized-memoization">
                  Calendar (Optimized using Memoization)
                </NavLink>
              </li>
              <li>
                <NavLink to="/calendar-optimized-store">
                  Calendar (Optimized using a Store)
                </NavLink>
              </li>
            </NavUl>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Form</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavUl>
              <li>
                <NavLink to="/form-not-optimized">Form (Not optimized)</NavLink>
              </li>
              <li>
                <NavLink to="/form-optimized-uncontrolled">
                  Form (Optimized by making it Uncontrolled)
                </NavLink>
              </li>
              <li>
                <NavLink to="/form-optimized-encapsulation">
                  Form (Optimized using Encapsulation)
                </NavLink>
              </li>
            </NavUl>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Table</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavUl>
              <li>
                <NavLink to="/table-not-optimized">
                  Table (Not optimized)
                </NavLink>
              </li>
              <li>
                <NavLink to="/table-optimized-virtualization">
                  Table (Optimized by using Virtualization)
                </NavLink>
              </li>
            </NavUl>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
});

// Subcomponents
// =============================================================================

function NavLink({ to, ...props }: RouterNavLinkProps) {
  const href = useHref(to);
  const match = useMatch(href);

  return (
    <NavigationMenuLink
      className={navigationMenuTriggerStyle()}
      active={match !== null}
      asChild
    >
      <RouterNavLink to={to} {...props} />
    </NavigationMenuLink>
  );
}

function NavUl({ children }: { children: React.ReactNode }) {
  return <ul className="grid gap-3 p-4">{children}</ul>;
}
