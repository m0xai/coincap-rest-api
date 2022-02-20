import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(cors())

app.listen(3000, () => {
	console.log("App running on part 3000");
});

let price;

const priceJSON = async () => {
	let response = await fetch("https://api.coincap.io/v2/rates/bitcoin", {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + process.env.API_KEY
		}
	})
	
	if(!response.ok){
		throw new Error("Response is not ok. Status: " + response.status)
	}
	return await response.json();
}

setInterval(() => {
priceJSON()
	.then(data => {
		price = data;
	})
	.catch(err => {
		console.error(err);
	})
}, 1000);

app.get("/url", (req, res, next) => {
	res.json(price);
});