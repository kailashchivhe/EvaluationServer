function allTeams(){
  axios.default.headers['Authorization'] = localStorage.getItem('token')
  axios.get('http://localhost:3000/allTeams') 
    .then(function (response) {
        const list = document.getElementById('teamList'); 
        if (response && response.data) {
            list.innerHTML = '';
            var count = 1;
            response.data.teams.forEach(team => {
              var url = new URL("https://api.qrserver.com/v1/create-qr-code/?size=150x150");
              url.searchParams.append('data', team._id);
              list.innerHTML += '<tr><td>'+ count+ '</td><td>'+ team.name + '</td><td>' 
                + team.memberCount + ' </td> <td>' + team.department + '</td><td>' + team.topic + '</td>'
                + '<td class=pb-3> <img src='+ url.toString() + ' height=150 width=150></img> </td></tr>';
              count++;
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}