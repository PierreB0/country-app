const result = document.querySelector(".countries-container")
const search = document.getElementById("inputSearch")
const range = document.getElementById("inputRange")
const rangeValue = document.getElementById("rangeValue")
const region = document.getElementById("region")
const min = document.getElementById("minToMax")
const max = document.getElementById("maxToMin")
const alpha = document.getElementById("alpha")

let country = []

// ---- RECUPERATION ET AFFICHAGE DES DONNEES ---

async function fetchCountry() {
    await fetch("https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags")
    .then((res) => res.json())
    .then((data) => {
        country = data;
        CountriesDisplay()
        console.log(data);
        
    })
}

function CountriesDisplay() {
    country.length = 250;

    result.innerHTML = country.map((country => `
            <div class="card">
                <img src="${country.flags?.svg || ""}" alt="Drapeau de ${country.name.common}" width="100">
                <h2>${country.name.common}</h2>
                <h3>Capitale: ${country.capital?.[0] || "N/A"}</h3>
                <p>Population : ${country.population.toLocaleString()}</p>
                <p><strong>Région :</strong> ${country.region}</p>
            </div>
        `))
        .join("");
}

fetchCountry();

// ---- RECHERCHE DYNAMIQUE ----
search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = country.filter((c) =>
    c.name.common.toLowerCase().includes(value));
    
    displayFilter(filtered)
});

function displayFilter(list) {
      result.innerHTML = list.slice(0, 250).map((country => `
  
    <div class="card">
      <img src="${country.flags?.svg}" alt="Drapeau de ${country.name.common}">
      <h2>${country.name.common}</h2>
      <p>Capitale : ${country.capital?.[0] || "N/A"}</p>
      <p>Population : ${country.population.toLocaleString()}</p>
      <p>Région : ${country.region}</p>
    </div>

  `)).join("");
}

// ---- RANGE VALUE ----
range.addEventListener("input", (e) => {
    const value = e.target.value;
    range.textContent = value;
    rangeValue.textContent = value;
    
    displayWithLimit(value);
})

function displayWithLimit(limit) {

  result.innerHTML = country
    .slice(0, limit)
    .map((country => `
      <div class="card">
        <img src="${country.flags?.svg}" alt="Drapeau ${country.name.common}">
        <h2>${country.name.common}</h2>
        <p>Capitale : ${country.capital?.[0] || "N/A"}</p>
        <p>Région : ${country.region}</p>
        <p>Population : ${country.population.toLocaleString()}</p>
      </div>
    `))
    .join("");
}

// ---- TRI PAR REGION ----
region.addEventListener("change", (e) => {

  const value = e.target.value;

  if(value === ""){
    CountriesDisplay();
    return;
  }

  const filtered = country.filter((c) => 
    c.region === value
  );

  result.innerHTML = filtered
    .slice(0, inputRange.value)
    .map((country => `
      <div class="card">
        <img src="${country.flags?.png}" alt="Drapeau ${country.name.common}">
        <h2>${country.name.common}</h2>
        <p>Capitale : ${country.capital?.[0] || "N/A"}</p>
        <p>Région : ${country.region}</p>
        <p>Population : ${country.population.toLocaleString()}</p>
      </div>
    `))
    .join("");

});


// ---- TRI CROISSANT ----
min.addEventListener("click", () => {
    country.sort((a, b) => a.population - b.population)

    CountriesDisplay()
})

// ---- TRI DECROISSANT ----
max.addEventListener("click", () => {
    country.sort((a, b) => b.population - a.population)

    CountriesDisplay()
})

// ---- TRI ALPHABETIQUE ----
alpha.addEventListener("click", () => {
    country.sort ((a, b) => a.name.common.localeCompare(b.name.common))

    CountriesDisplay()
})