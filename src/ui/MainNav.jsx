/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineLink,
  HiOutlineUsers,
  HiUser,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const { user } = useUser();
  let userRole = user.role;
  // console.log("role:", userRole);
  // Check if the user is an admin or super admin
  let isAdmin = userRole === "ADMIN";
  let isSuperAdmin = userRole === "SUPERADMIN";
  let isUser = userRole === "USER";
  let isDoctor = userRole === "DOCTOR";
  // Conditionally render the navigation based on user role
  if (isAdmin || isSuperAdmin) {
    return (
      <nav>
        <NavList>
          <li>
            <StyledNavLink to="/dashboard">
              <HiOutlineHome />
              <span>Home</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/account">
              <HiUser />
              <span>Profile</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/reservations">
              <HiOutlineCalendarDays />
              <span>Reservations</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/users">
              <HiOutlineUsers />
              <span>Create new member</span>
            </StyledNavLink>
          </li>
          {/* Additional navigation items for admin or super admin */}
        </NavList>
      </nav>
    );
  } else if (isUser || isDoctor) {
    return (
      <nav>
        <NavList>
          <li>
            <StyledNavLink to="/account">
              <HiOutlineHome />
              <span>Profile</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/reservations">
              <HiOutlineCalendarDays />
              <span>Reservations</span>
            </StyledNavLink>
          </li>
          {/* Additional navigation items for admin or super admin */}
        </NavList>
      </nav>
    );
  } else {
    // Render nothing if the user is not an admin or super admin
    return null;
  }
}

export default MainNav;
