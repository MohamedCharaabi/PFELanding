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
import { useParams } from "react-router-dom";


const colourOptions = [
  { value: 'Departments', label: 'Departments' },
  { value: 'Directions', label: 'Directions' },
  { value: 'Divisions', label: 'Divisions' },
  { value: 'Services', label: 'Services' },
  { value: 'Themes', label: 'Themes' }

]


export default function ActivateRequest() {
  const { id } = useParams()
  const [isLaoding, setIsLoading] = useState(true)
  const [request, setRequest] = useState()
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");



  async function activateRequets() {
    await axios.patch(`https://pfe-cims.herokuapp.com/request/activate/${id}`
    )
      .then(res => {
        // setThemes(res.data);
        if (res.data.etat === 'active') {
          setRequest(res.data)
          // setIsLoading(false);
        }
      })
      .catch(err => alert(`Error ${err}`));

  }

  React.useEffect(() => {
    activateRequets()
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


  if (!request) {
    return <span></span>
  }
  // console.log(allLevels)
  return (
    <>
      <CustomNavbar />
      <div className="wrapper">

        <div style={{ margin: '150px 100px' }}>
          {/* <span>Quote</span> */}
          <blockquote>
            <p className="blockquote blockquote-info">
              "I will be the leader of a company that ends up being worth
              billions of dollars, because I got the answers. I understand
              culture. I am the nucleus. I think that’s a responsibility
              that I have, to push possibilities, to show people, this is
              the level that things could be at." <br />
              <br />
              <small>- Noaa</small>
            </p>
            <p>This is you code : {request.code} </p>
          </blockquote>
        </div>

        <Footer />
      </div>
    </>
  );
}
