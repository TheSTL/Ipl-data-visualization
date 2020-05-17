export const getDataFromMatchJson = (matchData) => {
  const matchPerVenue = {};
  const matchPerCity = {};
  const matchPerCountry = {};
  const matchExtraDetails = {};
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

    if (
      Object.prototype.hasOwnProperty.call(matchPerCountry, match.Host_Country)
    ) {
      matchPerCountry[match.Host_Country]++;
    } else {
      matchPerCountry[match.Host_Country] = 1;
    }
    matchExtraDetails[match.Match_Id] = {
      matchDate: match.Match_Date,
      winType: match.Win_Type,
      wonBy: match.Won_By,
      season: match.Season_Id,
    };
  });
  return {
    matchPerVenue,
    matchPerCity,
    matchPerCountry,
    matchExtraDetails,
  };
};

export const getDataFromBallJson = (ballData) => {
  const matchDetails = {};
  ballData.forEach((ball) => {
    if (!Object.prototype.hasOwnProperty.call(matchDetails, ball.Match_Id)) {
      matchDetails[ball.Match_Id] = {};
    }

    if (
      !Object.prototype.hasOwnProperty.call(
        matchDetails[ball.Match_Id],
        ball.Innings_Id
      )
    ) {
      matchDetails[ball.Match_Id][ball.Innings_Id] = {
        ballHistory: [],
        matchHistory: [],
        totalScore: 0,
        extraRuns: 0,
        totalWicketFallen: 0,
      };
    }

    const currentInning = matchDetails[ball.Match_Id][ball.Innings_Id];
    currentInning.totalScore += +ball.Batsman_Scored + ball.Extra_Runs;
    currentInning.totalWicketFallen += ball.Player_dissimal_Id ? 1 : 0;
    currentInning.extraRuns += ball.Extra_Runs;
    // match history
    if (currentInning.matchHistory.length === 0) {
      currentInning.matchHistory.push({
        over: ball.Over_Id,
        score: currentInning.totalScore,
        overScore: +ball.Batsman_Scored + ball.Extra_Runs,
        totalWickets: currentInning.totalWicketFallen,
        overWicket: ball.Player_dissimal_Id ? 1 : 0,
      });
    } else {
      const matchHistoryLength = currentInning.matchHistory.length;
      const lastmatchHistory =
        currentInning.matchHistory[matchHistoryLength - 1];

      if (lastmatchHistory.over === ball.Over_Id) {
        currentInning.matchHistory[matchHistoryLength - 1].score =
          currentInning.totalScore;
        currentInning.matchHistory[matchHistoryLength - 1].overScore +=
          +ball.Batsman_Scored + ball.Extra_Runs;
        currentInning.matchHistory[matchHistoryLength - 1].totalWickets =
          currentInning.totalWicketFallen;
        currentInning.matchHistory[
          matchHistoryLength - 1
        ].overWicket += ball.Player_dissimal_Id ? 1 : 0;
      } else {
        currentInning.matchHistory.push({
          over: ball.Over_Id,
          score: currentInning.totalScore,
          overScore: +ball.Batsman_Scored + ball.Extra_Runs,
          totalWickets: currentInning.totalWicketFallen,
          overWicket: ball.Player_dissimal_Id ? 1 : 0,
        });
      }
    }
    // ball history
    currentInning.ballHistory.push({
      over: ball.Over_Id,
      run: +ball.Batsman_Scored + ball.Extra_Runs,
      wicket: ball.Player_dissimal_Id ? true : false,
    });
  });

  return {
    matchDetails,
  };
};
