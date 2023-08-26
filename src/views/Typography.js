import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import './Chauffeurss.scss'

function Typography() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <div className='LxDrC'>
              <button onClick={() => setCreateSlider(!createSlider)} data-text="Awesome" class="buttonLXDC">
                <span class="actual-text">&nbsp;Chauffeurss&nbsp;</span>
                <span class="hover-textLCD" aria-hidden="true">&nbsp;Chauffeurss&nbsp;</span>
              </button>
            </div>
            <div>
              <Button>Create Chauffeurss</Button>
            </div>

            <div>
                maın
            </div>

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Typography;
