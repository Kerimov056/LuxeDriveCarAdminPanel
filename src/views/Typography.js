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
import Chauffer from "./FoCompanent/Chauffer";
import { getChauffeurs } from "../Services/chauffeursServices";
import { useQuery } from "react-query";

function Typography() {

  const { data: getChufers, isError } = useQuery({
    queryKey: ["getChauffeurs"],
    queryFn: getChauffeurs,
    staleTime: 0,
  });
  if (isError) {
    return <div>Bir hata oluştu</div>;
  }


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

            <div className="Chauffersss">
              {getChufers?.data?.map((cheuf, index) => (
                <Chauffer key={index} Id={cheuf?.id} name={cheuf?.name} number={cheuf?.number} />
              ))}
            </div>

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Typography;
