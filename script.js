var teams = ['MI', 'CSK', 'KKR', 'SRH'];
function getPortNumber() {
    let port = window.location.port;
    let protocol = window.location.protocol;
    let host = window.location.hostname;
    let portNumber = "";

    if (port) {
        portNumber = ":" + port;
    }

    return protocol + "//" + host + portNumber + "/";
}
// Function to show/hide previous match results
function showPreviousMatchResults(id) {
    let dropDownBtn = 'dropDownButton' + id;
    let imageSource = document.getElementById(dropDownBtn).src;
    let portNumber = getPortNumber();
    alert(portNumber);
    let triangleUpImageAbsoluteSourceWithPort = portNumber + "triangle_facing_up.png";
    let triangleDownImageAbsoluteSourceWithPort = portNumber + "triangle_facing_down.png";

    // Close all other dropdowns
    let allDropDownBtns = document.querySelectorAll('[id^="dropDownButton"]');
    let allResultsDivs = document.querySelectorAll('[id^="results"]');
    for (let i = 0; i < allDropDownBtns.length; i++) {
        let btn = allDropDownBtns[i];
        let resultsDiv = allResultsDivs[i];
        if (btn.id !== dropDownBtn) {
            btn.src = triangleDownImageAbsoluteSourceWithPort;
            resultsDiv.style.display = "none";
        }
    }

    // Toggle visibility of selected dropdown
    if (imageSource == triangleDownImageAbsoluteSourceWithPort) {
        document.getElementById(dropDownBtn).src = triangleUpImageAbsoluteSourceWithPort;
        document.getElementById('results' + id).style.display = "inline";
    } else {
        document.getElementById(dropDownBtn).src = triangleDownImageAbsoluteSourceWithPort;
        document.getElementById('results' + id).style.display = "none";
    }
}

// Function to hide team one options
function hideTeamOne(teamA) {
    let oppID = "opp" + teamA;
    document.getElementById(oppID).style.display = "none";
}

// Function to hide team two options
function hideTeamTwo(teamB) {
    for (var i = 0; i < teams.length; i++) {
        if (teams[i] != teamB) {
            document.getElementById(teams[i]).style.display = "inline";
        }
    }
}

// Function to change the team two select box
function changeTeamTwoSelectBox() {
    teams.forEach(team => {
        document.getElementById('opp' + team).style.display = "inline";
    });
    let teamA = document.getElementById('teamOne').value;
    hideTeamOne(teamA); // Call the hideTeamOne function
    let teamB = document.getElementById('teamTwo').value;
    let teamAhomeID = "homeGround" + teamA;
    let teamBhomeID = "homeGround" + teamB;
}

// Function to change the winning team select box
function changeWinningTeamSelectBox() {
    let teamA = document.getElementById('teamOne').value;
    let teamB = document.getElementById('teamTwo').value;
    setWinningTeamSelectBox(teamA, teamB); // Call the setWinningTeamSelectBox function
    let teamAhomeID = "homeGround" + teamA;
    let teamBhomeID = "homeGround" + teamB;
    displayHomeGround(teamAhomeID, teamBhomeID); // Call the displayHomeGround function
    hideTeamTwo(teamB); // Call the hideTeamTwo function
}

/**
 * Updates the statistics of both teams based on the match result.
 */
function updateBothTeamStats() {
    let teamA = document.getElementById('teamOne').value;
    let teamB = document.getElementById('teamTwo').value;
    let winningTeam = document.getElementById('winner').value;
    let a = 'matchesPlayed' + teamA;
    let b = 'matchesPlayed' + teamB;
    let awin = 'matchesWon' + teamA;
    let bwin = 'matchesWon' + teamB;
    let alost = 'matchesLost' + teamA;
    let blost = 'matchesLost' + teamB;
    let apoints = 'points' + teamA;
    let bpoints = 'points' + teamB;
    let aNRR = 'NRR' + teamA;
    let bNRR = 'NRR' + teamB;
    let teamAPlayed = parseInt(document.getElementById(a).innerHTML);
    let teamBPlayed = parseInt(document.getElementById(b).innerHTML);
    let teamAWon = parseInt(document.getElementById(awin).innerHTML);
    let teamBWon = parseInt(document.getElementById(bwin).innerHTML);
    let teamALost = parseInt(document.getElementById(alost).innerHTML);
    let teamBLost = parseInt(document.getElementById(blost).innerHTML);
    teamAPlayed++;
    teamBPlayed++;
    if (teamA == winningTeam) {
        teamAWon++;
        teamBLost++;
    } else {
        teamALost++;
        teamBWon++;
    }
    document.getElementById(a).innerHTML = teamAPlayed;
    document.getElementById(b).innerHTML = teamBPlayed;
    document.getElementById(awin).innerHTML = teamAWon;
    document.getElementById(bwin).innerHTML = teamBWon;
    document.getElementById(alost).innerHTML = teamALost;
    document.getElementById(blost).innerHTML = teamBLost;
    let teamAPoints = parseInt(document.getElementById(apoints).innerHTML);
    let teamBPoints = parseInt(document.getElementById(bpoints).innerHTML);
    if (teamA == winningTeam) {
        teamAPoints += 2;
    } else {
        teamBPoints += 2;
    }
    document.getElementById(apoints).innerHTML = teamAPoints;
    document.getElementById(bpoints).innerHTML = teamBPoints;
    let totalANRR = parseFloat(document.getElementById(aNRR).innerHTML) * teamAPlayed;
    let totalBNRR = parseFloat(document.getElementById(bNRR).innerHTML) * teamBPlayed;
    let winMargin = document.getElementById('winMargin').value;
    if (winMargin == "byRuns") {
        let winMarginQty = document.getElementById('winMarginQty').value * 0.05;
        let teamANRR;
        let teamBNRR;
        if (winningTeam == teamA) {
            teamANRR = totalANRR + parseFloat(winMarginQty);
            teamBNRR = totalBNRR - parseFloat(winMarginQty);
        } else {
            teamANRR = totalANRR - parseFloat(winMarginQty);
            teamBNRR = totalBNRR + parseFloat(winMarginQty);
        }
        document.getElementById(aNRR).innerHTML = (teamANRR / teamAPlayed).toFixed(2);
        document.getElementById(bNRR).innerHTML = (teamBNRR / teamBPlayed).toFixed(2);
    } else if (winMargin == "byWickets") {
        let teamANRR;
        let teamBNRR;
        let winMarginQty = document.getElementById('winMarginQty').value * 0.15;
        if (winningTeam == teamA) {
            teamANRR = totalANRR + parseFloat(winMarginQty);
            teamBNRR = totalBNRR - parseFloat(winMarginQty);
        } else {
            teamANRR = totalANRR - parseFloat(winMarginQty);
            teamBNRR = totalBNRR + parseFloat(winMarginQty);
        }
        document.getElementById(aNRR).innerHTML = (teamANRR / teamAPlayed).toFixed(2);
        document.getElementById(bNRR).innerHTML = (teamBNRR / teamBPlayed).toFixed(2);
    }
}

// Function to display home ground based on team selection
function displayHomeGround(teamAhomeID, teamBhomeID) {
    document.getElementById("homeGroundMI").style.display = "none";
    document.getElementById("homeGroundCSK").style.display = "none";
    document.getElementById("homeGroundKKR").style.display = "none";
    document.getElementById("homeGroundSRH").style.display = "none";
    document.getElementById(teamAhomeID).style.display = "inline";
    document.getElementById(teamBhomeID).style.display = "inline";
}

// Function to set winning team select box based on team selection
function setWinningTeamSelectBox() {
    let teamA = document.getElementById('teamOne').value;
    let teamB = document.getElementById('teamTwo').value;
    let teamAwinID = "win" + teamA;
    let teamBwinID = "win" + teamB;
    document.getElementById("winMI").style.display = "none";
    document.getElementById("winCSK").style.display = "none";
    document.getElementById("winKKR").style.display = "none";
    document.getElementById("winSRH").style.display = "none";
    document.getElementById(teamAwinID).style.display = "inline";
    document.getElementById(teamBwinID).style.display = "inline";
}

// Function to add a match report
function addMatchReport() {
    if (validateWinMarginQty() == false) {
        return;
    }
    let teamA = document.getElementById('teamOne').value;
    let teamB = document.getElementById('teamTwo').value;
    let dateFullString = document.getElementById('date').value;
    let dateMonth = new Date(dateFullString).toLocaleString('default', {
        month: 'long'
    });
    let dateNumber = new Date(dateFullString).getDate();
    let date = dateNumber + " " + dateMonth;
    let venue = document.getElementById('venue').value;
    let teamAID = 'prevResult' + teamA;
    let teamBID = 'prevResult' + teamB;
    var x = document.getElementById(teamAID);
    var y = document.getElementById(teamBID);
    // deep clone the targeted row
    var new_row = x.rows[0].cloneNode(true);
    var new_row2 = y.rows[0].cloneNode(true);
    // get the total number of rows
    var len = x.rows.length;
    var winningTeam = document.getElementById('winner').value;
    var winMargin = document.getElementById('winMargin').value;
    var winMarginQty = document.getElementById('winMarginQty').value;
    var winningStatement;
    if (teamA == winningTeam) {
        if (winMargin == "byRuns") {
            winningStatement = winningTeam + " beat " + teamB + " by " + winMarginQty + " Runs";
        } else {
            winningStatement = winningTeam + " beat " + teamB + " by " + winMarginQty + " Wickets";
        }
    } else {
        if (winMargin == "byRuns") {
            winningStatement = winningTeam + " beat " + teamA + " by " + winMarginQty + " Runs";
        } else {
            winningStatement = winningTeam + " beat " + teamA + " by " + winMarginQty + " Wickets";
        }
    }
    new_row.cells[0].innerHTML = teamB;
    new_row.cells[1].innerHTML = date;
    new_row.cells[2].innerHTML = venue;
    new_row.cells[3].innerHTML = winningStatement;
    new_row2.cells[0].innerHTML = teamA;
    new_row2.cells[1].innerHTML = date;
    new_row2.cells[2].innerHTML = venue;
    new_row2.cells[3].innerHTML = winningStatement;
    if (winningTeam == teamA) {
        for (i = 0; i < 4; i++) {
            new_row.cells[i].style.color = "green";
            new_row.cells[i].style.backgroundColor = "#ccccff";
            new_row.cells[i].style.padding = "0.5rem";
        }
    } else {
        for (i = 0; i < 4; i++) {
            new_row.cells[i].style.color = "red";
            new_row.cells[i].style.backgroundColor = "#ccccff";
            new_row.cells[i].style.padding = "0.5rem";
        }
    }
    if (winningTeam == teamB) {
        for (i = 0; i < 4; i++) {
            new_row2.cells[i].style.color = "green";
            new_row2.cells[i].style.backgroundColor = "#ccccff";
            new_row2.cells[i].style.padding = "0.5rem";
        }
    } else {
        for (i = 0; i < 4; i++) {
            new_row2.cells[i].style.color = "red";
            new_row2.cells[i].style.backgroundColor = "#ccccff";
            new_row2.cells[i].style.padding = "0.5rem";
        }
    }
    x.appendChild(new_row);
    y.appendChild(new_row2);
    updateBothTeamStats();
    sortTable();
    changeRankingOfTeams();
    resetForm();
}

// Function to handle venue change
function venueChange() {
    let teamA = document.getElementById('teamOne').value;
    let teamB = document.getElementById('teamTwo').value;
    let teamAhomeID = "homeGround" + teamA;
    let teamBhomeID = "homeGround" + teamB;
    let selectedOption = document.getElementById('venue').value;
    let isChecked = document.getElementById(selectedOption).checked;
    alert(isChecked);
}

// Function to show the add match report main div
function showAddMatchReportMainDiv() {
    document.getElementById('matchReportMainDiv').style.display = "inline";
    document.getElementById('addANewMatchReportButton').style.display = "none";
}

function sortTable() {
    var table = document.getElementById("pointsTable");
    var rows = table.rows;
    var sortingRows = [];

    // Collect odd indexed rows
    for (var i = 1; i < rows.length; i += 2) {
        sortingRows.push([rows[i], rows[i + 1]]);
    }

    // Sort based on the values in the 6th column
    sortingRows.sort(function (b, a) {
        var aPoints = parseFloat(a[0].cells[6].innerHTML);
        var bPoints = parseFloat(b[0].cells[6].innerHTML);
        if (aPoints == bPoints) {
            var aNettRunRate = parseFloat(a[0].cells[5].innerHTML);
            var bNettRunRate = parseFloat(b[0].cells[5].innerHTML);
            return aNettRunRate - bNettRunRate;
        }
        return aPoints - bPoints;
    });

    // Update the table with sorted rows
    for (var i = 0; i < sortingRows.length; i++) {
        table.appendChild(sortingRows[i][0]);
        table.appendChild(sortingRows[i][1]);
    }
}

function changeRankingOfTeams() {
    var table = document.getElementById("pointsTable");
    var rows = table.rows;
    var teamRank = 1;
    for (var i = 1; i < rows.length; i += 2) {
        rows[i].cells[0].innerHTML = teamRank;
        teamRank++;
    }
}

// Function to validate the winMarginQty input field
function validateWinMarginQty() {
    var winMarginQty = document.getElementById('winMarginQty').value;
    var regex = /^\d+$/;
    if (!regex.test(winMarginQty)) {
        alert("Please enter digits only in the winMarginQty field.");
        return false;
    }
    return true;
}

// Function to reset the form
function resetForm() {
    document.getElementById('teamOne').selectedIndex = 0;
    document.getElementById('teamTwo').selectedIndex = 0;
    document.getElementById('winner').selectedIndex = 0;
    document.getElementById('winMargin').selectedIndex = 0;
    document.getElementById('winMarginQty').value = '';
    document.getElementById('date').value = '';
    document.getElementById('venue').selectedIndex = 0;
    // Add code to show all options in teamOne and teamTwo select boxes
    let teamOneSelectBox = document.getElementById('teamOne');
    for (let i = 0; i < teamOneSelectBox.options.length; i++) {
        teamOneSelectBox.options[i].style.display = "block";
    }
    let teamTwoSelectBox = document.getElementById('teamTwo');
    for (let i = 0; i < teamTwoSelectBox.options.length; i++) {
        teamTwoSelectBox.options[i].style.display = "none";
    }
    // Add code to show all options in venue select box
    let venueSelectBox = document.getElementById('venue');
    for (let i = 0; i < venueSelectBox.options.length; i++) {
        venueSelectBox.options[i].style.display = "none";
    }
    let winningTeamSelectBox = document.getElementById('winner');
    for (let i = 0; i < winningTeamSelectBox.options.length; i++) {
        winningTeamSelectBox.options[i].style.display = "none";
    }
}




// function showAllFromTeam1() {
//     let teamOneSelectBox = document.getElementById('teamOne');
//     for (let i = 0; i < teamOneSelectBox.options.length; i++) {
//         teamOneSelectBox.options[i].style.display = "block";
//     }
// }

// function showAllFromTeam2() {
//     let teamTwoSelectBox = document.getElementById('teamTwo');
//     for (let i = 0; i < teamTwoSelectBox.options.length; i++) {
//         teamTwoSelectBox.options[i].style.display = "block";
//     }
// }

// function displayAllVenueOptions() {
//     let venueSelectBox = document.getElementById('venue');
//     for (let i = 0; i < venueSelectBox.options.length; i++) {
//         venueSelectBox.options[i].style.display = "block";
//     }
// }
