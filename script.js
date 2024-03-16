const dropDown = document.querySelector(".dropdownMenu");
const dropOption = document.querySelector(".dropOption");
const toggle = document.querySelector(".toggle");
const icon = document.querySelector("#icon");
const countriesContainer =
	document.querySelector(".countries");
const search = document.querySelector(".search");
const regions = document.querySelectorAll(".regions");

toggle.addEventListener("click", (e) => {
	document.body.classList.toggle("darkMode");
	toggle.classList.toggle("darkMode");
});

dropDown.addEventListener("click", (e) => {
	dropOption.classList.toggle("showOptions");
});

async function getCountries() {
	const URL = await fetch(
		"https://restcountries.com/v3.1/all"
	);
	const res = await URL.json();
	console.log(res);
	res.map((country) => {
		showCountry(country);
	});
}

getCountries();

function showCountry(data) {
	const countryCard = document.createElement("div");
	countryCard.classList.add("country");
	countryCard.innerHTML = `<div class="countryImg">
					<img
						src=${data.flags.png}
						alt=""
					/>
				</div>
				<div class="countryInfo">
					<h1 class="countryName"> ${data.name.common}</h1>
					<p><strong> Population :  </strong>${data.population.toLocaleString()}</p>
					<p class="regionName"><strong> Region :  </strong>${
						data.region
					}</p>
					<p><strong> Capital :  </strong>${data.capital}</p>
				</div>`;
	countriesContainer.appendChild(countryCard);
	countryCard.addEventListener("click", () => {
		showCountryDetails(data);
	});
}
const countryNames =
	document.getElementsByClassName("countryName");

search.addEventListener("input", (e) => {
	const searchTerm = e.target.value.trim().toLowerCase();

	Array.from(countryNames).forEach((country) => {
		const countryName = country.innerText
			.trim()
			.toLowerCase();

		const parentElement =
			country.parentElement.parentElement;

		if (countryName.includes(searchTerm)) {
			parentElement.style.display = "grid";
		} else {
			parentElement.style.display = "none";
		}
	});
});

const regionName =
	document.getElementsByClassName("regionName");
regions.forEach((region) => {
	region.addEventListener("click", (e) => {
		Array.from(regionName).forEach((regionGroup) => {
			if (
				regionGroup.innerText.includes(region.innerText) ||
				region.innerText === "All"
			) {
				regionGroup.parentElement.parentElement.style.display =
					"grid";
			} else {
				regionGroup.parentElement.parentElement.style.display =
					"none";
			}
		});
	});
});

const countryModal =
	document.querySelector(".countryModal");

function showCountryDetails(data) {
	countryModal.classList.toggle("show");
	countryModal.innerHTML = `<button class="back">Back</button>
			<div class="modal">
				<div class="leftModal">
					<img
						src="${data.flags.png}"
						alt=""
					/>
				</div>
				<div class="rightModal">
					<h1>${ data.name.common }</h1>
					<div class="modalInfo">
						<div class="innerLeft inner">
							<p>
								<strong> Native Name : </strong>${data.name.official}
							</p>
							<p>
								<strong> Population : </strong>${data.population.toLocaleString()}
							</p>
							<p>
								<strong> Region : </strong>${data.region}
							</p>
							<p>
								<strong> Sub-region : </strong
								>${data.subRegion}
							</p>
							<p>
								<strong> Capital : </strong
								>${data.capital}
							</p>
						</div>
						<div class="innerRight inner">
							<p>
								<strong> Top Level Domain : </strong>${data.region}
							</p>
							<p>
								<strong> Currencies : </strong
								>${data.capital}
							</p>
							<p>
								<strong> Languages : </strong
								>${data.capital}
							</p>
						</div>
					</div>
				</div>
			</div>`;

	const back = countryModal.querySelector(".back");

	back.addEventListener("click", () => {
		countryModal.classList.toggle("show");
	});
}

// For me How to appened each section by DOM
// async function getCountry() {
// await fetch(
// 	"https://restcountries.com/v3.1/all");
// 	.then((response) => response.json())
// 	.then((countries) => {
// 		countries.map((country) => {
// 			let countryName = country.name.common;
// 			let flag = country.flags.png;
// 			let population = country.population.toLocaleString();
// 			let region = country.region;
// 			let capital = country.capital;
// 			console.log(country);

// 			const card = document.createElement("section");
// 			card.className = "country";
// 			countriesCard.appendChild(card);

// 			let image = document.createElement("img");
// 			image.src = flag;
// 			image.className = "countryImg ";
// 			console.log(image);
// 			card.appendChild(image);

// 			const title = document.createElement("h1");
// 			title.textContent = countryName;
// 			title.className = "title";
// 			card.appendChild(title);

// 			const section = document.createElement("section");
// 			section.className = "infoContainer";

// 			card.appendChild(section);

// 			const populationAPI = document.createElement("p");
// 			populationAPI.innerHTML = `<span class="font-bold">Population:</span> ${population}`;
// 			section.appendChild(populationAPI);

// 			const regionAPI = document.createElement("p");
// 			regionAPI.innerHTML = `<span class="font-bold">Region:</span> ${region}`;
// 			section.appendChild(regionAPI);

// 			const capitalAPI = document.createElement("p");
// 			capitalAPI.innerHTML = `<span class="font-bold">Capital:</span> ${capital}`;
// 			section.appendChild(capitalAPI);
// 		});
// 	});
// }

// getCountry();
