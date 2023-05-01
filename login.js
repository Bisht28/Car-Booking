const form=document.querySelector("form");
//const login_btn=document.getElementById("login_btn");
const loginError=document.getElementById("loginError");
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
            window.location.href="/index.html"
            console.log("login successful");
            //login_btn.style.display="none";
        }
        else{
            console.log("Login Failed");
            loginError.textContent='Invalid Login'
        }
    })
    .catch((error)=>console.log(error));
})