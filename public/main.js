document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();

    const registerForm = document.forms["registerForm"];
    const userName = registerForm.elements["userName"].value;
    const userAge = registerForm.elements["userAge"].value;

    const user = {userName: userName, userAge: userAge};

    fetch('/user6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch((err) => console.log(err))
});