const form = document.querySelector("form");
form.addEventListener("submit",(event)=>{
    event.preventDefault();

    const formData=new FormData(form);

    const searchData={
        source: formData.get("source"),
        destination: formData.get("destination"),
        date: formData.get("date"),
        time: formData.get("time")
    };

    fetch("http://localhost:5000/rider-request",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(searchData),
    })
        .then((response)=>response.text())
        .then((data)=>{
            console.log(data);
            form.reset();
        })
        .catch((error)=>console.error(error));
});