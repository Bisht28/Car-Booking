const form=document.querySelector("form");
const login_btn=document.getElementById("login_btn");
form.addEventListener("submit",(event)=>{
    event.preventDefault()
    const formData= new FormData(form);

    const loginData={
        username: formData.get("Username"),
        password: formData.get("Password")
    }
    fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    })
    .then(response=>{
        if(response.ok){
            console.log("login successful");
            window.location.href="/index.html"
            login_btn.style.display="none";
        }
        else{
            console.log("Login Failed");
        }
    })
    .catch((error)=>console.log(error));
})