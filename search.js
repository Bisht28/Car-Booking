const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const searchData = {
        source: formData.get("source"),
        destination: formData.get("destination"),
        date: formData.get("date"),
        time: formData.get("time")
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
                const element=`<div class="container">
                <div id="left-col">
                    <div id="left-col-cont">
                        <h2>Car Model : ${ele.carModel}</h2>
                        <div class="item">
                            <div class="meta-col">
                                <h3>Source</h3>
                                ${ele.source}
                            </div>
                            <div class="meta-col">
                                <h3>Destination</h3>
                                ${ele.destination}
                            </div>
                        </div>
                        <div class="item">
                            <div class="meta-col">
                                <h3>Date</h3>
                                <p class="price">${ele.date}</p>
                            </div>
                        </div>
                        <p id="total"><b>Time</b></p>
                        <p style="font-size: 1.2rem; margin: 8px;">${ele.time}</p>
                    </div>
                </div>
                <div id="right-col">
                <button><a href="congo.html"><h3>Book Now</h3></a></button>    
                </div>
            </div>`
            elarr.push(element)
            });
            wrapper.innerHTML=elarr.join("")
        })
        .catch((error) => console.error(error));
});