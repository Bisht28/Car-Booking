const form = document.querySelector("form");

function bookNow(event) 
{
    console.log("hello")
    fetch("http://localhost:5000/book-now", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id:event.target.getAttribute('data-id'),seats:event.target.getAttribute('data-seats')}),
    })
}
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const searchData = {
        source: formData.get("source"),
        destination: formData.get("destination"),
        date: formData.get("date"),
        seats: formData.get("num_seats")
    };
    fetch("http://localhost:5000/rider-request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
    })
        .then(response => response.json())
        .then((data) => {
            //console.log(typeof data);
            //console.log(data);
            //window.location.href="/Avl_Car.html";
            const wrapper = document.querySelector(".wrapper");
            const arr = Object.values(data);
            console.log(arr);
            const elarr=[]
            arr.forEach((ele) => {
                //console.log(arr);
                console.log(ele);
                const element=`
                <div class="container">
                <div class="col1">
           <h2>Car Model: ${ele.carModel}</h2>
           <h3>Source: ${ele.source}</h3>
           <h3>Date: ${ele.date}</h3>
           <h3>Seats Available: ${ele.carSeats}</h3>
        </div>
        <div class="col2">
            <h2>Car No: ${ele.numberPlate}</h2>
            <h3>Destination:${ele.destination}</h3>
            <h3>Time: ${ele.time}</h3>
            <h3>Total Amount:${ele.price*searchData.seats}</h3>
        </div>
        <div class="col3">
        <button type="button" data-id="${ele._id}" data-seats="${searchData.seats}" id="book">Book Now</button>
        </div> </div>`
            elarr.push(element)
            });
            wrapper.innerHTML=elarr.join("")
            const bookButton=document.querySelectorAll('#book')
            bookButton.forEach((button)=>{
                button.addEventListener('click', bookNow)
            })
        })
        .catch((error) => console.error(error));
});


