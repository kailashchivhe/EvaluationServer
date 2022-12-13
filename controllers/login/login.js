function login() {
    console.log("login");        
    const email = document.getElementById("email");
    const password = document.getElementById('password');


    var url = new URL("http://127.0.0.1:3000/login");
    url.searchParams.append('email', email.value);
    url.searchParams.append('password', password.value);
    axios.post(url.toString(),
    {
        withCredentials: true
    })
    .then((response) => {
        console.log("response " , response);
        response.cookie('cookie',response.data);
        console.log("response " , response);
    })
    .catch((err) => {
        console.log(err)
    });
}