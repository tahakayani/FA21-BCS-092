// Get the image element
const image = document.getElementById('hoverImage');

image.addEventListener('mouseover', function(event) {
  const imageName = event.target.alt;

  console.log(`Image Name: ${imageName}`);
});
