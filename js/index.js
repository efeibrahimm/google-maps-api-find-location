const browse = document.getElementById('browse');
var x = document.getElementById("coordinate");
var y = document.getElementById("json");


function initMap(lat = 38.4237, lng = 27.1428, text = "Default information") {

    const coordinate = { lat: lat, lng: lng };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: coordinate,
    });
    const contentString = text;

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    const marker = new google.maps.Marker({
        position: coordinate,
        map,
    });
    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });

}

function showPosition(lat, lng) {
    var data;
    //Create query for the API.
    var latitude = "latitude=" + lat;
    var longitude = "&longitude=" + lng;
    var query = latitude + longitude + "&localityLanguage=tr";

    const Http = new XMLHttpRequest();

    var bigdatacloud_api =
        "https://api.bigdatacloud.net/data/reverse-geocode-client?";

    bigdatacloud_api += query;

    Http.open("GET", bigdatacloud_api);
    Http.send();

    Http.onreadystatechange = e => {
        data = Http.responseText;

        var arr = data.split(',');

        var text = arr[7] + '<br/> ' + arr[11] + '<br/> ' + arr[12] + '<br/> ' + arr[13] + '<br/> ' + arr[17] + '<br/> ' + arr[18];



        initMap(lat, lng, text);


    };

}



browse.addEventListener('click', () => {
    const lat = Number(document.getElementById('lat').value);
    const lng = Number(document.getElementById('lng').value);

    showPosition(lat, lng);


});