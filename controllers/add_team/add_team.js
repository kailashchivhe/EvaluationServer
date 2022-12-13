function addTeam(){
  
  var teamName = document.getElementById("teamName").value;
  var memberCount = document.getElementById("memberCount").value;
  var topic = document.getElementById("topic").value;
  var department = document.getElementById("department").value;

  var url = new URL("http://localhost:3000/addTeam");
  url.searchParams.append('name', teamName);
  url.searchParams.append('memberCount', memberCount);
  url.searchParams.append('topic', topic);
  url.searchParams.append('department', department);

  axios.post(url.toString()) 
    .then(function (response) {
        if (response && response.data) {
          console.log(response.data.message);
          //Flash - Team added
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}