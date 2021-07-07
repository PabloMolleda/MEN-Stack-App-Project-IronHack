function initMap() {

    const myMap = new google.maps.Map(
        document.querySelector('#myMap'),
        { zoom: 12, center: { lat: 40.7312741015127, lng: -73.99190373151602 }, styles: mapStyles.silver }

    )


    new google.maps.Marker({
        map: myMap,
        position: directions.wallStreetOffice.coords,
        title: directions.wallStreetOffice.title
    })
    new google.maps.Marker({
        map: myMap,
        position: directions.chelseaOffice.coords,
        title: directions.chelseaOffice.title
    })
    new google.maps.Marker({
        map: myMap,
        position: directions.tribecaOffice.coords,
        title: directions.tribecaOffice.title
    })
}