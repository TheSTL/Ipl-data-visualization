
export const getDataFromMatchJson = (matchData) => {
    console.log(matchData[0]);
    console.log(matchData.length);
    const matchPerVenue = {};
    const matchPerCity = {};
    const matchPerCountry = {};
    matchData.forEach((match) => {
        if (Object.prototype.hasOwnProperty.call(matchPerVenue, match.Venue_Name)) {
            matchPerVenue[match.Venue_Name]++;
        } else {
            matchPerVenue[match.Venue_Name] = 1;
        }
        if (Object.prototype.hasOwnProperty.call(matchPerCity, match.City_Name)) {
            matchPerCity[match.City_Name]++;
        } else {
            matchPerCity[match.City_Name] = 1;
        }
        if (Object.prototype.hasOwnProperty.call(matchPerCountry, match.Host_Country)) {
            matchPerCountry[match.Host_Country]++;
        } else {
            matchPerCountry[match.Host_Country] = 1;
        }
    });
    return {
        matchPerVenue,
        matchPerCity,
        matchPerCountry,
    }   
}