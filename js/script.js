var baseURL = "https://www.thesportsdb.com/api/v1/json/1/";

var searchTeamsStr = "searchteams.php?";

var teamsVar = "t=";

var team = "Arsenal";

var request = new XMLHttpRequest();

var requestString = "https://www.thesportsdb.com/api/v1/json/1/all_sports.php";
//var requestString = baseURL + searchTeamsStr + teamsVar + team;

request.open('GET', requestString, true );

request.onload = function () {
    var data = JSON.parse(this.response);

    data.sports.forEach(element => {
        var container = document.getElementsByClassName("container")[0];
        var row = container.getElementsByClassName("row")[0];
        const card = document.createElement('div');
        const cardImg = document.createElement('img');
        cardImg.setAttribute('class', 'card-img-top');
        card.setAttribute('class' ,'card col-md-4 col-s-4');
       

        const h1 = document.createElement('h1');
        h1.setAttribute('class', 'card-title');
        h1.textContent = element.strSport;

        const p = document.createElement('p');
        p.setAttribute('class', 'card-text');
        var img = element.strSportThumb;
        cardImg.setAttribute("src", img);
        element.strSportDescription = element.strSportDescription.substring(0, 300);
        p.innerHTML =`${element.strSportDescription}...`;

        row.appendChild(card);
        card.appendChild(cardImg);
        card.appendChild(h1);
        card.appendChild(p);
    });
}

request.send();