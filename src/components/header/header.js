import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./header.scss";
import logo from "../../assets/img/logo.svg";
import {
  FaInstagramSquare,
  FaLinkedin,
  FaYoutubeSquare,
  FaBehanceSquare,
} from "react-icons/fa";

const Header = () => {
  return (
    <Container className="header">
      <Navbar bg="white" expand="lg" className="my-3">
        <Container fluid>
          <Navbar.Brand href="/" className="me-5">
            <img src={logo} alt="RastMobileLogo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link
                href="https://rastmobile.com/iletisim/"
                target="_blank"
              >
                Hakkımızda
              </Nav.Link>
              <Nav.Link
                href="https://rastmobile.com/case-study/juri-yarisma-yazilimi/"
                target="_blank"
              >
                Jüri - Yarışma Yazılımı
              </Nav.Link>
              <Nav.Link
                href="https://getwordninja.com/"
                target="_blank"
              >
                Word Ninja
              </Nav.Link>
              <Nav.Link
                href="https://rastmobile.com/case-study/word-pyramids-kelime-bulmaca-oyunu/"
                target="_blank"
              >
                Word Pyramids
              </Nav.Link>
            </Nav>
            <div className="social-media">
              <Nav.Link
                href="https://www.youtube.com/channel/UC9zhWu89h4AqolHrVspLkVw"
                target="_blank"
                title="Rast Mobile Youtube"
              >
                <FaYoutubeSquare />
              </Nav.Link>
              <Nav.Link
                href="https://www.instagram.com/mobilerast/"
                target="_blank"
                title="Rast Mobile Instagram"
              >
                <FaInstagramSquare />
              </Nav.Link>
              <Nav.Link
                href="https://www.behance.net/rastmobile"
                target="_blank"
                title="Rast Mobile Behance"
              >
                <FaBehanceSquare />
              </Nav.Link>
              <Nav.Link
                href="https://www.linkedin.com/company/rastmobile/"
                target="_blank"
                title="Rast Mobile LinkedIn"
              >
                <FaLinkedin />
              </Nav.Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Header;
