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


// core components
import Footer from "components/Footer/Footer.js";
import CustomNavbar from "components/Navbars/CustomNavbar";
import axios from "axios";

import { useParams } from "react-router-dom";




export default function ActivateRequest() {
  const { id } = useParams()

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
            <p className="blockquote blockquote-info" style={{ color: 'white' }}>
              Nous sommes heureux de vous annoncer que votre demande est activée maintenant.
              <br />
              Utiliser ce code pour suivre l'état de votre demmande:  <span style={{ color: 'red' }}>{request.code}</span>
              <br />

            </p>

          </blockquote>
        </div>

        <Footer />
      </div>
    </>
  );
}
