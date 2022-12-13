function logout(){
    axios.get('http://localhost:3000/logout') 
    .then(function (response) {
        if (response && response.data) {
            
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}