function allExamiers(){
    axios.get('http://localhost:3000/allExamier') 
    .then(function (response) {
        const list = document.getElementById('examierList'); 
        if (response && response.data) {
            list.innerHTML = '';
            var count = 1;
            response.data.examier.forEach(examer => {
                var url = new URL("https://api.qrserver.com/v1/create-qr-code/?size=150x150");
                url.searchParams.append('data', examer.email + ',' + examer.password);
                list.innerHTML += '<tr><td>'+ count+ '</td><td>'+ examer.firstName + ' ' + examer.lastName + '</td><td>' 
                    + examer.email + ' </td> <td>' + examer.company + '</td><td>' + examer.gender + '</td>'
                    + '<td class=p-3> <img src='+ url.toString() + ' height=150 width=150></img> </td> </tr>';
                count++;
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}