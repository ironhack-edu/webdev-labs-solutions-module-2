const startMap = (location, courseTitle) => {
  // const directionsService = new google.maps.DirectionsService;
  // const directionsDisplay = new google.maps.DirectionsRenderer;

  const ironhackSP = {
  	lat: -23.5617375,
  	lng: -46.6623218};

  // const bullguer = {
  //   lat: -23.5621038,
  //   lng: -46.6600982
  // }

  // const directionRequest = {
  //   origin: ironhackSP,
  //   destination: bullguer,
  //   travelMode: 'WALKING'
  // };

  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 15,
      center: {
        lat: location[1],
        lng: location[0]
      }
    }
  );

  if (location.length < 1) {
    location[0] = ironhackSP.lat;
    location[1] = ironhackSP.lng;
  }
  // console.log(location, typeof courseTitle)
  const ironrackMarquer = new google.maps.Marker({
      position: {
        lat: location[1],
        lng: location[0]
      },
      map: map,
      title: courseTitle
    });

  // directionsService.route(
  //   directionRequest, (res, status) => {
  //     if (status === 'OK') {
  //       // everything is ok
  //       directionsDisplay.setDirections(res);
  //       // window.alert('OK')

  //     } else {
  //       // something went wrong
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   }
  // );
  // directionsDisplay.setMap(map);
}