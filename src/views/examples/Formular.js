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
import React, { useState } from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import Footer from "components/Footer/Footer.js";
import CustomNavbar from "components/Navbars/CustomNavbar";
import axios from "axios";
import { handleSuccess, handleError } from "components/SweetAlerts";

export default function Formular() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [professionFocus, setProffesionFocus] = React.useState(false);
  const [phoneFocus, setPhoneFocus] = React.useState(false);
  const [establishmentFocus, setEstablishmentFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [themes, setThemes] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', lastName: '', email: '', proffesion: '', phone: '', establishment: '', theme: {} });




  async function loadThemes() {
    await axios.get(`https://cims-server.herokuapp.com/theme`)
      .then(res => {
        setThemes(res.data['data']);
        setisLoading(false);
      })
      .catch(err => alert(`Error ==> ${err}`));

  }

  React.useEffect(() => {
    loadThemes()
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)"
    );
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await axios.post("https://cims-server.herokuapp.com/participant", formData)
      .then(res => {
        return handleSuccess({ props: { title: 'Seccess' } });
      }).catch(err => handleError({ props: { title: 'Error', text: err.message } }));
    // alert('Your form submitted Successfully');


    // console.log(formData)

  }

  if (isLoading) {
    return <h3>Loading..</h3>
  }

  return (
    <>
      <CustomNavbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png").default}
                      />
                      <CardTitle tag="h4">Register</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form" onSubmit={handleSubmit}>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": fullNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Name"
                            type="text"
                            onFocus={(e) => setFullNameFocus(true)}
                            onBlur={(e) => setFullNameFocus(false)}
                            onChange={val => setFormData({ ...formData, name: val.target.value })}

                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                            onChange={val => setFormData({ ...formData, email: val.target.value })}
                          />
                        </InputGroup>

                        <InputGroup
                          className={classnames({
                            "input-group-focus": professionFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Proffetion"
                            type="text"
                            onFocus={(e) => setProffesionFocus(true)}
                            onBlur={(e) => setProffesionFocus(false)}
                            onChange={val => setFormData({ ...formData, proffesion: val.target.value })}

                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": phoneFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="phone"
                            type="number"
                            onFocus={(e) => setPhoneFocus(true)}
                            onBlur={(e) => setPhoneFocus(false)}
                            onChange={val => setFormData({ ...formData, phone: val.target.value })}

                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": establishmentFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="establishment"
                            type="text"
                            onFocus={(e) => setEstablishmentFocus(true)}
                            onBlur={(e) => setEstablishmentFocus(false)}
                            onChange={val => setFormData({ ...formData, establishment: val.target.value })}

                          />
                        </InputGroup>
                        <FormGroup>
                          <Label for="exampleSelect">Theme</Label>
                          <Input type="select" name="select" id="exampleSelect"
                            defaultValue={themes[0].name}

                            onChange={val => setFormData({ ...formData, theme: val.target.value })}
                          >
                            {themes.map(theme => {
                              // console.log(theme)
                              return <option value={theme._id}>
                                {theme.name}</option>
                            })}


                          </Input>
                        </FormGroup>
                        <Button className="btn-round" color="primary" size="lg" type={'submit'}>
                          Get Started
                      </Button>
                      </Form>
                    </CardBody>
                    <CardFooter>

                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
