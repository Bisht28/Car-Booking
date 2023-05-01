const form = document.querySelector("form");
const passwordField = form.elements['password'];
const confirmPasswordField = form.elements['password2'];
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const submitButton = form.querySelector('button[type="submit"]');

//form validation
passwordField.addEventListener('input', function() {
    if (passwordField.value.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters';
      submitButton.disabled = true;
    } else {
      passwordError.textContent = '';
      submitButton.disabled = false;
    }
  });

confirmPasswordField.addEventListener('input', () => {
    if (confirmPasswordField.value !== passwordField.value) {
      confirmPasswordError.textContent = 'Passwords do not match';
      submitButton.disabled = true;
    } else {
      confirmPasswordError.textContent = 'Password Matched';
      submitButton.disabled = false;
    }
  });

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const formData=new FormData(form);

    const userData= {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    }

    fetch("http://localhost:5000/register",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Log the response from the server
      form.reset();
    })
    .catch((error) => console.error(error));
})
