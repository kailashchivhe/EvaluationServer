function addExamier(){
  
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var company = document.getElementById("company").value;
  var gender = document.getElementById("gender").value;

  var url = new URL("http://localhost:3000/addExamier");
  url.searchParams.append('firstName', firstName);
  url.searchParams.append('lastName', lastName);
  url.searchParams.append('email', email);
  url.searchParams.append('password', password);
  url.searchParams.append('company', company);
  url.searchParams.append('gender', gender);

  axios.post(url.toString()) 
    .then(function (response) {
        if (response && response.data) {
          console.log(response.data.message);
          //Flash - Examier added
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}