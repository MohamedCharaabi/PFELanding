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
  Col,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

// core components
import Footer from "components/Footer/Footer.js";
import CustomNavbar from "components/Navbars/CustomNavbar";
import axios from "axios";
import { handleSuccess, handleError } from "components/SweetAlerts";
import { selectThemeColors } from "./FormSelectTheme";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { ErrorMessage } from '@hookform/error-message';

const colourOptions = [
  { value: 'Departments', label: 'Departments' },
  { value: 'Directions', label: 'Directions' },
  { value: 'Divisions', label: 'Divisions' },
  { value: 'Services', label: 'Services' },
  { value: 'Themes', label: 'Themes' }

]

const schema = yup.object().shape({
  name: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
});


export default function Formular(props) {

  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [NameFocus, setNameFocus] = React.useState(false);
  const [ThemePropFocus, setThemePropFocus] = React.useState(false);
  const [lastNameFocus, setLastNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  // const [professionFocus, setProffesionFocus] = React.useState(false);
  // const [phoneFocus, setPhoneFocus] = React.useState(false);
  // const [establishmentFocus, setEstablishmentFocus] = React.useState(false);
  // const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [themes, setThemes] = useState([])
  // const [isLoading, setisLoading] = useState(true)
  const [allLevels, setAllLevels] = useState([])
  const [showProp, setShowProp] = useState(false)
  const [themeProp, setThemeProp] = useState('')

  const [formData, setFormData] = useState({ nomDem: '', prenomDem: '', emailDem: '', themeDem: '', etatDem: 4, name: 'ser', dep_name: '', dir_name: '', div_name: '', ser_name: '' });
  const { register, handleSubmit, formState: { errors } } = useForm();

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

  const toggle = () => setModal(!modal);


  async function onSubmit(event) {
    event.preventDefault();
    console.log(formData)
     await axios.post("https://pfe-cims.herokuapp.com/request", formData, {
       headers: { "Access-Control-Allow-Origin": "*" }

     })
       .then(res => {
         return handleSuccess({ props: { title: 'Votre demande envoyer ', text: 'Svp confirmmer votre email' } });
       }).catch(err => handleError({ props: { title: 'Error', text: err.message } }));
    // alert('Your form submitted Successfully');


    //console.log(data)

  } 
  async function submitThemeProp(event) {
    event.preventDefault();
    await axios.post("https://pfe-cims.herokuapp.com/requesttheme", { theme: themeProp, creator: 'personnel' }, {
      headers: { "Access-Control-Allow-Origin": "*" }

    })
      .then(res => {
        return handleSuccess({ props: { title: 'Votre proposition envoyer ', text: 'nous allons le prendre en compte de votre suggestion' } });
      }).catch(err => handleError({ props: { title: 'Error', text: err.message } }));
    // alert('Your form submitted Successfully');


    console.log(themeProp)

  }
  const showProposition = () => setShowProp(!showProp)
  if (allLevels.length < 1) {
    return <span></span>
  }

  // console.log(allLevels)
  return (
    <>
      <CustomNavbar />
      <div className="wrapper" style={{ paddingBottom: '250px' }}>
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="8" md="6">
                  {/* <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  /> */}
                  <Card className="card-register">
                    <CardHeader style={{ padding: '10px 30px' }}>
                      {/* <CardImg
                        width={400}
                        alt="..."
                        src={require("assets/img/square-purple-1.png").default}
                      /> */}
                      <CardTitle tag={'h3'} >Formulaire Application</CardTitle>
                      {/* <h2>Formulaire d'pplication</h2> */}
                    </CardHeader>

                    <CardBody>
                      <Form className="form" onSubmit={onSubmit}>
                        <Row>


                          <Col lg={5}>
                            <FormGroup>
                              <Label for="nominput">Nom</Label>
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
                                  // id='nominput'
                                  // name='singleErrorInput'
                                  {...register("nomDem", { required: "This is required." })}
                                  onFocus={(e) => setNameFocus(true)}
                                  onBlur={(e) => setNameFocus(false)}
                                  onChange={val => setFormData({ ...formData, nomDem: val.target.value })}
                                // ref={register}
                                />
                              </InputGroup>
                              {errors.nomDem && <p>Last name is required.</p>}
                            </FormGroup>

                          </Col>
                          <Col lg={5}>
                            <FormGroup>
                              <Label for="prenominput">Prenom</Label>
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
                                  id='prenominput'

                                  onFocus={(e) => setLastNameFocus(true)}
                                  onBlur={(e) => setLastNameFocus(false)}
                                  onChange={val => setFormData({ ...formData, prenomDem: val.target.value })}

                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>

                          <Col lg={5} >
                            <FormGroup>
                              <Label for="emailinput">Email</Label>
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
                                  id='emailinput'

                                  onFocus={(e) => setEmailFocus(true)}
                                  onBlur={(e) => setEmailFocus(false)}
                                  onChange={val => setFormData({ ...formData, emailDem: val.target.value })}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>



                          <Col lg={5}>
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

                          </Col>

                          <Col lg={5}>
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

                          </Col>

                          <Col lg={5}>
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

                          </Col>

                          <Col lg={5}>
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

                          </Col>

                          <Col lg={5}>
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

                          </Col>

                          <Button className="btn-round" color="defult" size="lg" type={'submit'}>
                            Appliquer
                          </Button>

                        </Row>

                      </Form>
                      <br />
                      <p onClick={toggle}>Proposer Theme!</p>
                      {
                        showProp ?
                          <Form onSubmit={submitThemeProp}>
                            <InputGroup
                              className={classnames({
                                "input-group-focus": ThemePropFocus,
                              })}
                            >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="tim-icons icon-notes" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Theme Titre "
                                type="text"
                                onFocus={(e) => setThemePropFocus(true)}
                                onBlur={(e) => setThemePropFocus(false)}
                                onChange={val => setThemeProp(val.target.value)}

                              />
                            </InputGroup>
                            <Button className="btn-round" color="default" size="lg" type={'submit'}>
                              Proposer
                            </Button>

                          </Form>
                          : null
                      }
                    </CardBody>
                    <CardFooter>

                    </CardFooter>
                  </Card>
                </Col>
                <Col>
                </Col>
              </Row>
              {/* 
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
                /> */}
            </Container>
          </div>
        </div>
        <Footer />
      </div>


      <Modal isOpen={modal} toggle={toggle} className='modal-theme' style={{ color: '#000' }}>
        <ModalHeader toggle={toggle}>Proposer Theme</ModalHeader>
        <ModalBody>
          <Col lg={8}>
            <FormGroup >
              <Label for="propsinput">Theme</Label>


              <Input
                className='input-modal'
                placeholder="Theme"
                type="text"
                id='propsinput'
                onFocus={(e) => setThemePropFocus(true)}
                onBlur={(e) => setThemePropFocus(false)}
                onChange={val => setThemeProp(val.target.value)}

              />

            </FormGroup>
          </Col>

        </ModalBody>
        <ModalFooter style={{ display: "flex", justifyContent: 'flex-end' }}>
          <Button onClick={submitThemeProp} color='info' style={{ margin: '0 15px' }}>Envoyer</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
