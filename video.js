// Get the modal and elements
var modal = document.getElementById("videoModal");
var iframe = document.getElementById("videoIframe");
var links = document.querySelectorAll('.video-link');
var span = document.getElementsByClassName("close-btn")[0];

// Open the modal and set the video source when a link is clicked
links.forEach(function(link) {
  link.onclick = function(event) {
    event.preventDefault(); // Prevent default action (so it doesn't jump to the link)
    var videoId = link.getAttribute("data-video");
    iframe.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1"; // Set the video source
    modal.style.display = "block"; // Show the modal
  };
});

// Close the modal when the "X" button is clicked
span.onclick = function() {
  modal.style.display = "none"; // Hide the modal
  iframe.src = ""; // Reset the iframe src to stop the video from playing
}

// Close the modal when the user clicks anywhere outside of the modal content
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none"; // Hide the modal
    iframe.src = ""; // Reset the iframe src to stop the video from playing
  }
}

