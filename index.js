const axios = require("axios"); //librairie qui permet faire les requetes vers l'API
const yargs = require("yargs"); //librairie qui permet de parse les données

const argv = yargs.argv;
const filmId = argv._[0];

//fonction pour récupérer les informations des films
async function getFilmInfo(filmId) {
    try {
        const response = await axios.get(`https://swapi.dev/api/films/${filmId}/`);
        return response.data;
    } catch (error) {
        console.error("error fetching film information", error.message);
    }
}

//fonction pour récupérer les informations des planètes
async function getPlanetInfo(planetURL) {
    try {
        const response = await axios.get(planetURL);
        return response.data;
    } catch (error) {
        console.error("error fetching Planet information", error.message);
        process.exit(1);
    }
}

//fonction qui calcule le diametre total des planètes avec des montagnes et de l'eau
async function calculDiametreTotal(filmId) {
    try {
        const filmInfo = await getFilmInfo(filmId);
        const planets = filmInfo.planets;
        let diametreTotal = 0;

        for (const planetURL of planets) {
            const planetInfo = await getPlanetInfo(planetURL);

            if (planetInfo.terrain.includes("mountains") && parseFloat(planetInfo.surface_water) > 0) {
                diametreTotal += parseFloat(planetInfo.diameter);
            }
        }
        return diametreTotal;
    } catch (error) {
        console.error("error fetching diameter", error.message);
        process.exit(1);
    }
}

//fonction main
async function main() {
    const diametreTotal = await calculDiametreTotal(filmId);
    console.log(`diametre total: ${diametreTotal}`);
}

main();
