import { logoutAction } from "@/lib/actions";
import Link from "next/link";
import {
  Container,
  Navbar as NavbarLayout,
  NavbarBrand,
  Button,
} from "react-bootstrap";

export default function Navbar({ children }) {
  return (
    <>
      <NavbarLayout className="bg-body-tertiary">
        <Container>
          <NavbarBrand>
            <Link href={"/task"}>Task Management</Link>
          </NavbarBrand>
          <Button variant="danger" onClick={logoutAction}>
            Logout
          </Button>
        </Container>
      </NavbarLayout>
      {children}
    </>
  );
}
