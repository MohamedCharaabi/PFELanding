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
import Select from 'react-select'

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
  Col
} from "reactstrap";

// core components
import Footer from "components/Footer/Footer.js";
import CustomNavbar from "components/Navbars/CustomNavbar";
import axios from "axios";
import { handleSuccess, handleError } from "components/SweetAlerts";
import { selectThemeColors } from "./FormSelectTheme";


const colourOptions = [
  { value: 'Departments', label: 'Departments' },
  { value: 'Directions', label: 'Directions' },
  { value: 'Divisions', label: 'Divisions' },
  { value: 'Services', label: 'Services' },
  { value: 'Themes', label: 'Themes' }

]


export default function Formular() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [NameFocus, setNameFocus] = React.useState(false);
  const [lastNameFocus, setLastNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  // const [professionFocus, setProffesionFocus] = React.useState(false);
  // const [phoneFocus, setPhoneFocus] = React.useState(false);
  // const [establishmentFocus, setEstablishmentFocus] = React.useState(false);
  // const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [themes, setThemes] = useState([])
  // const [isLoading, setisLoading] = useState(true)
  const [allLevels, setAllLevels] = useState([])
  const [depOptions, setDepOptions] = useState()
  const [dirOptions, setDirOptions] = useState()
  const [divOptions, setDivOptions] = useState()
  const [departments, setDepartments] = useState([])
  const [directions, setDirections] = useState([])
  const [divisions, setDivisions] = useState([])

  const [formData, setFormData] = useState({ nomDem: '', prenomDem: '', emailDem: '', themeDem: '', etatDem: 4, name: 'ser', dep_name: '', dir_name: '', div_name: '', ser_name: '' });


  async function loadAllLevels() {
    await axios.get(`https://pfe-cims.herokuapp.com/all`)
      .then(res => {
        // console.log(res.data)
        setAllLevels(res.data);
        // setDepartments(res.data)
        // setisLoading(false);
      })
      .catch(err => alert(`Error ==> ${err}`));

  }

  async function loadThemes() {
    await axios.get(`https://pfe-cims.herokuapp.com/theme`
    )
      .then(res => {
        setThemes(res.data);
        // setisLoading(false);
      })
      .catch(err => alert(`Error ${err}`));

  }

  React.useEffect(() => {
    loadThemes()
    loadAllLevels()
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
    await axios.post("https://pfe-cims.herokuapp.com/request", formData, {
      headers: { "Access-Control-Allow-Origin": "*" }

    })
      .then(res => {
        return handleSuccess({ props: { title: 'Votre demande envoyer ', text: 'svp confirmmer votre email' } });
      }).catch(err => handleError({ props: { title: 'Error', text: err.message } }));
    // alert('Your form submitted Successfully');


    console.log(formData)

  }

  if (allLevels.length < 1) {
    return <span></span>
  }
  // console.log(allLevels)
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
                    <CardHeader style={{ marginBottom: '50px' }}>
                      <CardImg
                        width={300}
                        alt="..."
                        src={require("assets/img/square-purple-1.png").default}
                      />
                      <CardTitle tag="h4"></CardTitle>
                    </CardHeader>

                    <CardBody>
                      <Form className="form" onSubmit={handleSubmit}>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": NameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Nom"
                            type="text"
                            onFocus={(e) => setNameFocus(true)}
                            onBlur={(e) => setNameFocus(false)}
                            onChange={val => setFormData({ ...formData, nomDem: val.target.value })}

                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": lastNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Prenom"
                            type="text"
                            onFocus={(e) => setLastNameFocus(true)}
                            onBlur={(e) => setLastNameFocus(false)}
                            onChange={val => setFormData({ ...formData, prenomDem: val.target.value })}

                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                            onChange={val => setFormData({ ...formData, emailDem: val.target.value })}
                          />
                        </InputGroup>



                        <FormGroup>
                          <Label for="exampleSelect">Theme</Label>
                          <Input type="select" name="select" id="exampleSelect"
                            // defaultValue={themes[0].name}

                            onChange={val => setFormData({ ...formData, themeDem: val.target.value })}
                          >
                            {themes.map(theme => {
                              // console.log(theme)
                              return <option value={theme.theme}>
                                {theme.theme}</option>
                            })}


                          </Input>
                        </FormGroup>



                        <FormGroup>
                          <Label for="exampleSelect">Department</Label>
                          <Input type="select" name="select" id="exampleSelect"
                            defaultValue={themes[0].name}

                            onChange={val => setFormData({ ...formData, dep_name: val.target.value, dir_name: '', div_name: '', ser_name: '' })}
                          >
                            {allLevels.departments.map(theme => {
                              // console.log(theme)
                              return <option value={theme.name}>
                                {theme.name}</option>
                            })}


                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleSelect">Direction</Label>
                          <Input type="select" name="select" id="exampleSelect"
                            defaultValue={themes[0].name}
                            onChange={val => setFormData({ ...formData, dir_name: val.target.value, div_name: '', ser_name: '' })}
                          >
                            {allLevels.directions.map(dir => {
                              // console.log(dir)
                              if (dir.dep_name === formData.dep_name) {

                                return <option value={dir.name}>
                                  {dir.name}</option>
                              }
                              return null

                            })}


                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleSelect">Division</Label>
                          <Input type="select" name="select" id="exampleSelect"
                            defaultValue={themes[0].name}

                            onChange={val => setFormData({ ...formData, div_name: val.target.value, ser_name: '' })}
                          >
                            {allLevels.divisions.map(div => {
                              // console.log(theme)

                              if (div.dir_name === formData.dir_name) {


                                return <option value={div.name}>
                                  {div.name}</option>

                              }
                              return null

                            })}


                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleSelect">Service</Label>
                          <Input type="select" name="select" id="exampleSelect"
                            defaultValue={themes[0].name}

                            onChange={val => setFormData({ ...formData, ser_name: val.target.value })}
                          >
                            {allLevels.services.map(ser => {
                              // console.log(ser)
                              if (ser.div_name === formData.div_name) {

                                return <option value={ser.name}>
                                  {ser.name}</option>

                              }
                              return null
                            })}


                          </Input>
                        </FormGroup>

                        <Button className="btn-round" color="primary" size="lg" type={'submit'}>
                          Appliquer
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
