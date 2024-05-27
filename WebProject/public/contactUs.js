const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function initMap() {
    
    var location = {lat:31.5204,lng: 74.3587};
        var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 8, center: location});
    var marker = new google.maps.Marker({position: location, map: map});
}