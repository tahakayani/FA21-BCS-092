$(document).ready(function () {
    $('#contactForm').submit(function (e) {
        e.preventDefault();

        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields.');
            return false; // Prevent form submission if fields are empty
        }
        alert('Form submitted successfully!');
    });
});

function initMap() {
    // The location of your desired map center
    var location = {lat: -34.397, lng: 150.644};
    // The map, centered at your desired location
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 8, center: location});
    // The marker, positioned at your desired location
    var marker = new google.maps.Marker({position: location, map: map});
}