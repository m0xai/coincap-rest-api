// import * as pureNav from '../pure-nav/src/nav';

// const myNav = pureNav.create();

// console.log(myNav);

const price = async () => {
	const response = await fetch("http://127.0.0.1:3000/url/");
	if (!response.ok) {
		throw new Error("Response is not ok with this, Message: " + response.message);
	}
	return await response.json();
} 

setInterval(() => {
	price().then(blob => {
		console.log(blob.data.rateUsd)
		const h2 = document.body.querySelector("#btc-title");
		const data = blob.data;
		const newPrice = blob.data.rateUsd
		setColor(newPrice)
		h2.innerText = newPrice;
	});

	price().catch(err => {
		console.log(err)
	})
}, 1000);

function setColor(newVal) {
	const priceEl = document.body.querySelector("#btc-title");
	const currentPrice = priceEl.innerText || 1;
	if(currentPrice > newVal) {
		priceEl.style.color = "red"
	} else if (currentPrice < newVal) {
		priceEl.style.color = "green";
	} else if (currentPrice == newVal) {
		priceEl.style.color = "black"
	}
}