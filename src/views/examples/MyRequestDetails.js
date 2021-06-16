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
import { handleSuccess, handleError } from "components/SweetAlerts";

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
import { selectThemeColors } from "./FormSelectTheme";
import { useParams } from "react-router-dom";


const colourOptions = [
    { value: 'Departments', label: 'Departments' },
    { value: 'Directions', label: 'Directions' },
    { value: 'Divisions', label: 'Divisions' },
    { value: 'Services', label: 'Services' },
    { value: 'Themes', label: 'Themes' }

]


export default function MyRequestDetails() {
    // const { id } = useParams()
    const [code, setCode] = useState('')
    const [request, setRequest] = useState()
    const [squares1to6, setSquares1to6] = React.useState("");
    const [squares7and8, setSquares7and8] = React.useState("");





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

    async function getRequest() {
        await axios.get(`https://pfe-cims.herokuapp.com/request/requestwithcode/${code}`
        )
            .then(res => {
                // setThemes(res.data);

                setRequest(res.data)


            })
            .catch(err => handleError({ props: { title: 'Error', text: err.response.data.message } }));

    }
    return (
        <>
            <CustomNavbar />
            <div className="wrapper">

                <div style={{ margin: '150px 100px', display: 'grid', placeItems: 'center' }}>
                    <Row>
                        <Col lg="12" sm="6">
                            <FormGroup>
                                <Input defaultValue="" placeholder="Entrer votre code "
                                    type="text"
                                    onChange={val => setCode(val.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <Button color="default" onClick={e => {
                                e.preventDefault()
                                getRequest()

                            }}>Envoyer</Button>
                        </Col>

                        {
                            request ?
                                <Row>
                                    <Col lg={12}>
                                        <p>
                                            <span>Formation: </span> {request.theme}
                                        </p>
                                    </Col>
                                    <Col lg={12}>
                                        <p>
                                            <span>Nom: </span> {request.fullName}
                                        </p>
                                    </Col>

                                    <Col lg={12}>
                                        <p>
                                            <span>Email: </span> {request.email}
                                        </p>
                                    </Col>


                                    <Col lg={12}>
                                        <p>
                                            <span>Etat: </span> {
                                                !request.confirmation ? 'Encours' : 'Confirmer'

                                            }
                                        </p>
                                    </Col>

                                </Row>
                                : null

                        }

                    </Row>
                </div>

                <Footer />
            </div>
        </>
    );
}
