// Get the image element
const image = document.getElementById('hoverImage');

// Add event listener for mouseover event on image
image.addEventListener('mouseover', function(event) {
  // Get the alt attribute of the image, which contains its name
  const imageName = event.target.alt;
  
  // Print the image name
  console.log(`Image Name: ${imageName}`);
});
