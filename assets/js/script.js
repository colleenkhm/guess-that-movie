// Key used to cycle-translate quote
const API_KEY = "7dfdabab39mshe66929e496b9f2fp1579a2jsn3839847d0fe0";
const LANG_KEY_ARRAY = ['en', 'hi', 'sw', 'en'];
const QUOTES_STORE = "quotesStore"
var date = moment().format('DD')

// Fetching movie quotes and storing in local storage, setting parameters for when to call from api, calling "quote" and "quote from" variables
function getQuotes() {
	var quotes = JSON.parse(localStorage.getItem(QUOTES_STORE)) ?? [];
	if (quotes.length === 0 || date > quotes[0].date) {
		fetch("https://movie-and-tv-shows-quotes.p.rapidapi.com/quotes", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "movie-and-tv-shows-quotes.p.rapidapi.com",
				"x-rapidapi-key": "4893a70909msh1d3b01b61d29cb4p1fc0c6jsnf048abdff636"
			}
		})
		.then(function (response) {
			return response.json();
		})
		.then(data => {
			for(var index = 0; index < data.length; index++){
                const {quote, quoteFrom} = data[index];
				quotes.push({date, quote, quoteFrom});
            }
			localStorage.setItem(QUOTES_STORE, JSON.stringify(quotes));
		})
		.catch(err => {
			console.error(err);
		});
	}
}


// TODO: get random quote and movie title for question. Plus get 3 random titles for incorrect answer
function randomQuotes() {
	var quotes = JSON.parse(localStorage.getItem(QUOTES_STORE)) ?? [];
	var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
 console.log(randomQuotes)
}

getQuotes();
randomQuotes();

//TODO: Function to pass quote through translate-cycle. overwrite quote value till final translate value of english
// fetch("https://fast-translate.p.rapidapi.com/fastTranslate/translate?text=Heres looking at you!&langDest=es&from=en", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "fast-translate.p.rapidapi.com",
// 		"x-rapidapi-key": "7dfdabab39mshe66929e496b9f2fp1579a2jsn3839847d0fe0"
// 	}
// })
// .then(function(response) {
// 	return response.json();
// })
// .then(data => {
// 	console.log(data);
// })
// .catch(err => {
// 	console.error(err);
// });

// TODO: Post translated quote into read-only text-area
// TODO: Create buttons containing 1 true answer and 3 false answers
// TODO: Based on user answer indicate whether anser correct or incorrect