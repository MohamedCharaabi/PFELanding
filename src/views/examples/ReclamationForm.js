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
  CardText
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


export default function ReclamationForm() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [NameFocus, setNameFocus] = React.useState(false);
  const [lastNameFocus, setLastNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  // const [professionFocus, setProffesionFocus] = React.useState(false);
  // const [phoneFocus, setPhoneFocus] = React.useState(false);
  // const [establishmentFocus, setEstablishmentFocus] = React.useState(false);
  // const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [formData, setFormData] = useState({ nomDem: '', prenomDem: '', emailDem: '', themeDem: '', etatDem: 4, name: 'ser', dep_name: '', dir_name: '', div_name: '', ser_name: '' });



  React.useEffect(() => {
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

  return (
    <>
      <CustomNavbar />
      <div className="wrapper">
        <div style={{marginRight: '50px'}}>
        <Card style={{ margin: '150px 100px', marginRight: '50px' }}>
          <CardHeader>
            <CardTitle tag='h4'>Envoyer Reclamation </CardTitle>
          </CardHeader>

          <CardBody>
            <CardText>
              {/* Use <code>.form-label-group</code> as a wrapper to add a Floating Label with Textarea */}
            </CardText>
            <FormGroup>
              <Label for='firstNameBasic'>Titre</Label>
              <Input
                id='firstNameBasic'
                name='title'
                // innerRef={register({ required: true })}
                // invalid={errors.firstNameBasic && true}
                onChange={e => setFormData({ ...formData, title: e.target.value })}

                placeholder='Titre'
              />
            </FormGroup>

            <div className='form-label-group mt-2'>
              <Input type='textarea'
                name='content'
                id='exampleText'
                rows='3'
                placeholder='Enter alert'
                // innerRef={register({ required: true })}
                // invalid={errors.firstNameBasic && true}

                onChange={e => setFormData({ ...formData, content: e.target.value })}
              />
              <Label>Entrer alert</Label>
            </div>

            <Button className='mr-1' color='primary'
            // type='submit'
            // onClick={handleSubmit(onSubmit)}
            >
              Envoyer
            </Button>
          </CardBody>
        </Card>
</div>
        <Footer />
      </div>
    </>
  );
}
