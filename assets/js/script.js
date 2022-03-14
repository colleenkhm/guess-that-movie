// TODO: Establish connection with google translate to get languages
fetch("https://google-translate1.p.rapidapi.com/language/translate/v2/languages", {
	"method": "GET",
	"headers": {
		"accept-encoding": "application/gzip",
		"x-rapidapi-host": "google-translate1.p.rapidapi.com",
		"x-rapidapi-key": "7dfdabab39mshe66929e496b9f2fp1579a2jsn3839847d0fe0"
	}
})
.then(response => response.json())
.then(data => {
	console.log(data);
})
.catch(err => {
	console.error(err);
});

// TODO: Get languages result and store so we do not have to hit this but one time