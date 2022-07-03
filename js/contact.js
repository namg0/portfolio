//27ffcbfa0210347ca32835272ed89d45
var mapContainer = document.getElementById('map');

let drag = true;
let zoom = true;

mapOption = {
    center: new kakao.maps.LatLng(37.5431644, 127.0418547),
    level: 3
};

var map = new kakao.maps.Map(mapContainer, mapOption);

var markerPosition  = new kakao.maps.LatLng(37.5431644, 127.0418547);

var marker = new kakao.maps.Marker({
    position: markerPosition
});

marker.setMap(map);

var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

setDraggable(drag);
function setDraggable(draggable){
    map.setDraggable(draggable);
}
setZoomable(zoom);
function setZoomable(zoomable){
    map.setZoomable(zoomable)
}

function moveTo(target){
    var moveLatLon = target;
     map.setCenter(moveLatLon);
 }
