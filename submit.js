const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting normally

  const formData = new FormData(form); // Get the form data

  const carData = {
    phoneNumber: formData.get("phone-number"),
    numberPlate: formData.get("car-number_plate"),
    carModel: formData.get("car-model"),
    carSeats: formData.get("car-seats"),
    source: formData.get("source"),
    destination: formData.get("destination"),
    date: formData.get("date"),
    time: formData.get("time"),
  }; // Convert the form data to JSON

  fetch("http://localhost:5000/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  })
    .then((response) => response.text())
    .then((data) => {
      //console.log(data); // Log the response from the server
      window.location.href="index.html"
    })
    .catch((error) => console.error(error));
});