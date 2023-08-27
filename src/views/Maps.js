import React from 'react'
import { Container } from 'react-bootstrap'
import { getBlog } from "../Services/blogServices";
import { useQuery } from "react-query";

const Maps = () => {

  const { data: getByBlog, isError } = useQuery({
    queryKey: ["getBlogs"],
    queryFn: getBlog,
    staleTime: 0,
  });
  if (isError) {
    return <div>Bir hata oluştu</div>;
  }

  return (
    <>
      <Container>
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
              {getByBlog?.data?.map((blog, index) => (
                <Chauffer key={index} Id={cheuf?.id} name={cheuf?.name} number={cheuf?.number} />
              ))}
            </div>

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Maps















// import React from "react";

// // react-bootstrap components
// import { Badge, Button, Navbar, Nav, Container } from "react-bootstrap";

// function Maps() {
//   const mapRef = React.useRef(null);
//   React.useEffect(() => {
//     let google = window.google;
//     let map = mapRef.current;
//     let lat = "40.748817";
//     let lng = "-73.985428";
//     const myLatlng = new google.maps.LatLng(lat, lng);
//     const mapOptions = {
//       zoom: 13,
//       center: myLatlng,
//       scrollwheel: false,
//       zoomControl: true,
//     };

//     map = new google.maps.Map(map, mapOptions);

//     const marker = new google.maps.Marker({
//       position: myLatlng,
//       map: map,
//       animation: google.maps.Animation.DROP,
//       title: "Light Bootstrap Dashboard PRO React!",
//     });

//     const contentString =
//       '<div class="info-window-content"><h2>Light Bootstrap Dashboard PRO React</h2>' +
//       "<p>A premium Admin for React-Bootstrap, Bootstrap, React, and React Hooks.</p></div>";

//     const infowindow = new google.maps.InfoWindow({
//       content: contentString,
//     });

//     google.maps.event.addListener(marker, "click", function () {
//       infowindow.open(map, marker);
//     });
//   }, []);
//   return (
//     <>
//       <div className="map-container">
//         <div id="map" ref={mapRef}></div>
//       </div>
//     </>
//   );
// }

// export default Maps;
