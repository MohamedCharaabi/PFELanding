/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="3">
            <h1 className="title">PFE-CIMS</h1>
          </Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/formular" tag={Link}>
                  Appliquer
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink to="/myrequest" tag={Link}>
                  MonEtat
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/reclamation" tag={Link}>
                  Reclamer
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="6">
            <Nav>
              <NavItem>
                <Row >
                  <i className="tim-icons icon-square-pin " style={{ marginRight: '15px' }} />
                  <span>
                    1 Rue de libérai 1002, Tunis, Le belvédère</span>
                </Row>
              </NavItem>
              <NavItem>
                <Row >
                  <i className="tim-icons icon-mobile " style={{ marginRight: '15px' }} />
                  <span> Tél : +216 71 789 855 /+216 71 113 600
                    Fax :+216 71 790 440</span>
                </Row>
              </NavItem>
              <NavItem>
                <Row >
                  <i className="tim-icons icon-email-85 " style={{ marginRight: '15px' }} />
                  <span> cims@rns.tn</span>                </Row>
              </NavItem>

            </Nav>
          </Col>
          {/* <Col md="3">
            <h3 className="title">Follow us:</h3>
            <div className="btn-wrapper profile">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://twitter.com/creativetim"
                id="tooltip622135962"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip622135962">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.facebook.com/creativetim"
                id="tooltip230450801"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip230450801">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://dribbble.com/creativetim"
                id="tooltip318450378"
                target="_blank"
              >
                <i className="fab fa-dribbble" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Follow us
              </UncontrolledTooltip>
            </div>
          </Col>
        */}
        </Row>
      </Container>
    </footer>
  );
}
