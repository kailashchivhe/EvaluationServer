function scoreBoard(){
  axios.get('http://localhost:3000/getScore') 
    .then(function (response) {
        const list = document.getElementById('scoreList'); 
        if (response && response.data) {
            list.innerHTML = '';
            response.data.scoreBoard.forEach(team => {
              var scores = team.scores;
              var li = '';
              scores.forEach(score =>{
                li += '<tr> '
                  + '<td>' + score.examier + '</td>'
                  + '<td>' + score.date + '</td>'
                  + '<td>' + score.score + '</td>'
                  + '</tr>'; 
              });
              list.innerHTML +=           
              '<div>'
                + '<h2>'+ team.name + '</h2>'
                + '<div class="table-responsive">'
                  +'<table class="table table-striped table-sm">'
                    +'<thead>'
                      +'<tr>'
                        +'<th scope="col">Examier</th>'
                        +'<th scope="col">Date</th>'
                        +'<th scope="col">Score</th>'
                      +'</tr>'
                    +'</thead>'
                    +'<tbody>'
                    + li
                    +'</tbody>'
                  +'</table>'
                + '</div>'
              + '</div>'
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}