mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 10 // starting zoom
    });


// Create a default Marker and add it to the map.
    const marker = new mapboxgl.Marker({ color: "red"})
        .setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
        .setPopup(new mapboxgl.Popup({ offset: 32 })
        .setHTML(`<h4>${listing.location}</h4><h6>Exact location provided after booking
</h6>`)
        .setMaxWidth("300px"))
        .addTo(map);