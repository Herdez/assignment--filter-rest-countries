function getApi() {

	var request = superagent;
	var API_URL = "https://restcountries.eu/rest/v2/all";
	var table = document.querySelector("table tbody");
	var total = document.querySelector('p');
	var buttons = document.querySelectorAll("button");

	buttons.forEach(function(button) {
	  button.addEventListener("click", function(e) {
	    var language = e.target.textContent.toLowerCase();
	    var count_countries = 0;
	  
	    request
	      .get(API_URL)
	      .then(response => {
	        var countries = response.body;
	        countries.forEach(function(country) {
	          if (language === country.languages[0].iso639_1) {
	            count_countries++; 
	            table.innerHTML += '<tr>' + '<td>' + country.name + '</td>' + 
	            				   '<td>' + country.latlng[0] +'</td>' + 
	            				   '<td>' + country.latlng[1] +'</td>' + 
	            				   '<td>' + '<img src="' + country.flag + '" class="flag" />' +'</td>' + '</tr>';

	          } else if (language === "all") {
	            count_countries++;   
	            table.innerHTML += '<tr>' + '<td>' + country.name + '</td>' + 
	            				   '<td>' + country.latlng[0] +'</td>' + 
	            				   '<td>' + country.latlng[1] +'</td>' + 
	            				   '<td>' + '<img src="' + country.flag + '" class="flag" />' +'</td>' + '</tr>';
	          }
	        });
	        total.textContent = count_countries;
	      })
	  });
	});

}

getApi();