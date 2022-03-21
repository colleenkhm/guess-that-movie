// Key used to cycle-translate quote
//const LANG_KEY_ARRAY = [ 'en', 'hi', 'sw', 'en'];


// // TODO: Grab movie quotes for the day if local storage is empty or day has passed due to cap limit(10) hits on the api for a day
// // Fetch to grab all movie quotes
// fetch("https://movie-and-tv-shows-quotes.p.rapidapi.com/quotes", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "movie-and-tv-shows-quotes.p.rapidapi.com",
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

// TODO: get random quote and movie title for question. Plus get 3 random titles for incorrect answer

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