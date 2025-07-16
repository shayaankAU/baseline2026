const playerStats = {
  "Luka Doncic": { points: 32.4, assists: 8.6, rebounds: 9.1 },
  "Shai Gilgeous-Alexander": { points: 30.8, assists: 6.5, rebounds: 5.5 },
  "Victor Wembanyama": { points: 21.4, assists: 2.9, rebounds: 10.6 },
  "Jayson Tatum": { points: 27.2, assists: 4.6, rebounds: 8.1 },
  "Scoot Henderson": { points: 19.1, assists: 6.2, rebounds: 4.0 },
  "Joel Embiid": { points: 33.1, assists: 4.2, rebounds: 10.2 },
  "Stephen Curry": { points: 26.4, assists: 5.1, rebounds: 4.5 },
  "Giannis Antetokounmpo": { points: 30.2, assists: 5.8, rebounds: 11.5 },
  "LeBron James": { points: 25.3, assists: 7.9, rebounds: 7.2 },
  "Kevin Durant": { points: 27.1, assists: 5.2, rebounds: 6.6 },
  "Anthony Edwards": { points: 26.3, assists: 4.4, rebounds: 5.5 },
  "Tyrese Haliburton": { points: 20.1, assists: 10.9, rebounds: 3.9 },
  "Kawhi Leonard": { points: 24.5, assists: 3.6, rebounds: 6.2 },
  "Zion Williamson": { points: 23.0, assists: 4.3, rebounds: 6.4 },
  "Chet Holmgren": { points: 17.3, assists: 2.5, rebounds: 7.8 },
  "Jalen Brunson": { points: 27.9, assists: 6.7, rebounds: 3.6 },
  "Donovan Mitchell": { points: 26.4, assists: 5.0, rebounds: 4.3 },
  "Devin Booker": { points: 27.1, assists: 6.9, rebounds: 4.9 },
  "Bam Adebayo": { points: 19.3, assists: 3.9, rebounds: 10.1 },
  "Paolo Banchero": { points: 22.4, assists: 5.3, rebounds: 6.9 }
};

const leaderboardData = [
  { player: "Luka Doncic", team: "Dallas Mavericks", score: 97 },
  { player: "Shai Gilgeous-Alexander", team: "OKC Thunder", score: 92 },
  { player: "Jayson Tatum", team: "Boston Celtics", score: 88 },
  { player: "Joel Embiid", team: "Philadelphia 76ers", score: 84 },
  { player: "Victor Wembanyama", team: "San Antonio Spurs", score: 81 },
  { player: "Scoot Henderson", team: "Portland Trail Blazers", score: 78 },
  { player: "Stephen Curry", team: "Golden State Warriors", score: 83 },
  { player: "Giannis Antetokounmpo", team: "Milwaukee Bucks", score: 90 },
  { player: "LeBron James", team: "Los Angeles Lakers", score: 85 },
  { player: "Anthony Edwards", team: "Minnesota Timberwolves", score: 86 },
  { player: "Kevin Durant", team: "Phoenix Suns", score: 84 },
  { player: "Jalen Brunson", team: "New York Knicks", score: 82 },
  { player: "Donovan Mitchell", team: "Cleveland Cavaliers", score: 83 },
  { player: "Devin Booker", team: "Phoenix Suns", score: 85 },
  { player: "Tyrese Haliburton", team: "Indiana Pacers", score: 80 }
];

const playerPool = [
  { name: "Luka Doncic", position: "PG", salary: 47, rating: 97 },
  { name: "Shai Gilgeous-Alexander", position: "SG", salary: 40, rating: 92 },
  { name: "Jayson Tatum", position: "SF", salary: 38, rating: 88 },
  { name: "Joel Embiid", position: "C", salary: 46, rating: 84 },
  { name: "Scoot Henderson", position: "PG", salary: 12, rating: 78 },
  { name: "Victor Wembanyama", position: "PF", salary: 35, rating: 81 },
  { name: "Stephen Curry", position: "PG", salary: 50, rating: 93 },
  { name: "Giannis Antetokounmpo", position: "PF", salary: 45, rating: 95 },
  { name: "LeBron James", position: "SF", salary: 44, rating: 89 },
  { name: "Kevin Durant", position: "SF", salary: 43, rating: 90 },
  { name: "Anthony Edwards", position: "SG", salary: 36, rating: 87 },
  { name: "Damian Lillard", position: "PG", salary: 42, rating: 86 },
  { name: "Bam Adebayo", position: "C", salary: 34, rating: 85 },
  { name: "Kawhi Leonard", position: "SF", salary: 41, rating: 88 },
  { name: "Tyrese Haliburton", position: "PG", salary: 30, rating: 86 }
];

let selectedPlayers = [];
const SALARY_CAP = 100;

const team = [];
let salaryCap = 100;

function renderPlayerPool() {
  const poolDiv = document.getElementById("player-pool");
  poolDiv.innerHTML = ""; // Clear previous

  playerPool.forEach(player => {
    const btn = document.createElement("button");
    btn.textContent = `${player.name} (${player.position}) - $${player.salary}M | Rating: ${player.rating}`;
    btn.onclick = () => selectPlayer(player);
    btn.disabled = team.includes(player);
    poolDiv.appendChild(btn);
  });
}

function selectPlayer(player) {
  const currentSalary = team.reduce((sum, p) => sum + p.salary, 0);
  if (team.length >= 5) {
    alert("You can only select 5 players.");
    return;
  }
  if (currentSalary + player.salary > salaryCap) {
    alert("Salary cap exceeded!");
    return;
  }
  team.push(player);
  updateTeamDisplay();
  renderPlayerPool();
}

function updateTeamDisplay() {
  const list = document.getElementById("selected-team");
  list.innerHTML = team.map(p => `<li>${p.name} - $${p.salary}M | Rating: ${p.rating}</li>`).join("");

  const totalSalary = team.reduce((sum, p) => sum + p.salary, 0);
  const avgRating = team.reduce((sum, p) => sum + p.rating, 0) / (team.length || 1);
  document.getElementById("team-summary").textContent = 
    `Total Salary: $${totalSalary}M | Avg Rating: ${avgRating.toFixed(1)}`;
}

function resetTeam() {
  team.length = 0;
  updateTeamDisplay();
  renderPlayerPool();
}


function addPlayerToTeam(playerName) {
  const player = playerPool.find(p => p.name === playerName);
  if (!player || selectedPlayers.includes(player)) return alert("Invalid or duplicate selection");

  const currentCost = selectedPlayers.reduce((sum, p) => sum + p.salary, 0);
  if (currentCost + player.salary > SALARY_CAP) return alert("Salary cap exceeded!");
  if (selectedPlayers.length >= 5) return alert("Team is full");

  selectedPlayers.push(player);
  renderTeam();
}

function renderTeam() {
  const container = document.getElementById("team-builder-output");
  const totalCost = selectedPlayers.reduce((sum, p) => sum + p.salary, 0);
  const avgRating = selectedPlayers.length
    ? (selectedPlayers.reduce((sum, p) => sum + p.rating, 0) / selectedPlayers.length).toFixed(1)
    : 0;

  container.innerHTML = `
    <h3>Your Team</h3>
    <ul>
      ${selectedPlayers.map(p => `<li>${p.name} (${p.position}) - $${p.salary}M</li>`).join("")}
    </ul>
    <p>Total Cost: $${totalCost}M / $${SALARY_CAP}M</p>
    <p>Average Rating: ${avgRating}</p>
  `;
}

const ratingCounts = {
  "Luka Doncic": 0,
  "Jayson Tatum": 0,
  "Shai Gilgeous-Alexander": 0
};

const hasVoted = {
  "Luka Doncic": false,
  "Jayson Tatum": false,
  "Shai Gilgeous-Alexander": false
};
function hideSection(id) {
  document.getElementById(id).classList.remove("active");
}
function showSection(id) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => section.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if (id === "leaderboard") renderLeaderboard();
}

function comparePlayers() {
  const player1 = document.getElementById("player1").value;
  const player2 = document.getElementById("player2").value;
  if (player1 === player2) {
    document.getElementById("comparison-result").innerHTML = "Please select two different players.";
    return;
  }
  const stats1 = playerStats[player1];
  const stats2 = playerStats[player2];
  const resultHTML = `
    <table>
      <tr><th>Stat</th><th>${player1}</th><th>${player2}</th></tr>
      <tr><td>Points</td><td>${stats1.points}</td><td>${stats2.points}</td></tr>
      <tr><td>Assists</td><td>${stats1.assists}</td><td>${stats2.assists}</td></tr>
      <tr><td>Rebounds</td><td>${stats1.rebounds}</td><td>${stats2.rebounds}</td></tr>
    </table>
  `;
  document.getElementById("comparison-result").innerHTML = resultHTML;
}

function ratePlayer(player) {
  if (hasVoted[player]) {
    document.getElementById("rating-result").innerText = `You have already voted for ${player}.`;
    return;
  }
  ratingCounts[player]++;
  hasVoted[player] = true;
  const results = Object.keys(ratingCounts).map(name => `${name}: ${ratingCounts[name]} vote(s)`).join(" | ");
  document.getElementById("rating-result").innerText = results;
}

function searchPlayer() {
  const input = document.getElementById("searchInput").value.trim();
  const player = Object.keys(playerStats).find(p => p.toLowerCase() === input.toLowerCase());
  const resultDiv = document.getElementById("search-result");
  if (!player) {
    resultDiv.innerHTML = "Player not found.";
    return;
  }
  const stats = playerStats[player];
  resultDiv.innerHTML = `
    <p><strong>${player}</strong></p>
    <p>Points: ${stats.points}</p>
    <p>Assists: ${stats.assists}</p>
    <p>Rebounds: ${stats.rebounds}</p>
  `;
}

function renderLeaderboard() {
  const table = document.getElementById("leaderboard-table");
  table.innerHTML = `
    <tr>
      <th>Rank</th>
      <th>Player</th>
      <th>Team</th>
      <th>Score</th>
    </tr>
  `;

  const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score);

  sortedData.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.player}</td>
      <td>${entry.team}</td>
      <td>${entry.score}</td>
    `;
    table.appendChild(row);
  });
}

function registerUser() {
  const name = document.getElementById("regName").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  if (!name || !pass) {
    alert("Please enter both a username and password.");
    return;
  }
  const userData = { name: name, pass: pass };
  localStorage.setItem("baselineUser", JSON.stringify(userData));
  updateWelcome();
}

function loginUser() {
  const name = document.getElementById("regName").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const stored = localStorage.getItem("baselineUser");
  if (!stored) {
    alert("No user found. Please register first.");
    return;
  }
  const user = JSON.parse(stored);
  if (user.name === name && user.pass === pass) {
    updateWelcome();
  } else {
    alert("Incorrect username or password.");
  }
}

function updateWelcome() {
  const stored = localStorage.getItem("baselineUser");
  if (!stored) return;
  const user = JSON.parse(stored);
  document.getElementById("login-form").style.display = "none";
  document.getElementById("welcome-section").style.display = "flex";
  document.getElementById("welcomeMessage").textContent = `Welcome, ${user.name}`;
}

function logoutUser() {
  localStorage.removeItem("baselineUser");
  document.getElementById("login-form").style.display = "flex";
  document.getElementById("welcome-section").style.display = "none";
}

function postMessage() {
  const user = JSON.parse(localStorage.getItem("baselineUser"));
  if (!user) {
    alert("You must be logged in to post.");
    return;
  }
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  if (msg === "") return;
  const chatHistory = JSON.parse(localStorage.getItem("chatMessages") || "[]");
  const message = {
    name: user.name,
    text: msg,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  chatHistory.push(message);
  localStorage.setItem("chatMessages", JSON.stringify(chatHistory));
  input.value = "";
  renderChat();
}

function renderChat() {
  const container = document.getElementById("chat-messages");
  const chatHistory = JSON.parse(localStorage.getItem("chatMessages") || "[]");
  container.innerHTML = chatHistory.reverse().map(msg => `
    <div class="chat-msg">
      <strong>${msg.name}</strong>
      <time>${msg.time}</time>
      <div>${msg.text}</div>
    </div>
  `).join("");
}
const nbaFacts = [
  "Wilt Chamberlain once averaged 50.4 points per game for an entire season.",
  "Steph Curry made more threes in 2016 than any other player had ever attempted.",
  "LeBron James is the only player with 30,000+ points, 10,000+ rebounds, and 10,000+ assists.",
  "The shortest player in NBA history, Muggsy Bogues, blocked 39 shots.",
  "Shaquille O’Neal made only one three-pointer in his entire career.",
  "Kobe Bryant scored 81 points in a single game, second only to Wilt Chamberlain.",
  "Steve Nash never averaged double-digit assists until his 10th season.",
  "Manute Bol once had more blocks than points in a season.",
  "The Boston Celtics have the most retired jersey numbers of any team.",
  "Dirk Nowitzki played 21 seasons with one franchise — the Dallas Mavericks."
];

function showRandomFact() {
  const fact = nbaFacts[Math.floor(Math.random() * nbaFacts.length)];
  document.getElementById("nba-fact").innerText = fact;
}

window.onload = () => {
  updateWelcome();
  renderChat();
  showRandomFact();
};


function renderTeamBuilder() {
  const selectContainer = document.getElementById("player-selects");
  selectContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const select = document.createElement("select");
    select.innerHTML = `<option value="">-- Choose Player ${i + 1} --</option>` + 
      Object.keys(playerStats).map(player => `<option value="${player}">${player}</option>`).join("");
    selectContainer.appendChild(select);
  }
}

function buildTeam() {
  const selects = document.querySelectorAll("#player-selects select");
  const picked = [];

  selects.forEach(sel => {
    if (sel.value && !picked.includes(sel.value)) {
      picked.push(sel.value);
    }
  });

  if (picked.length === 0) {
    document.getElementById("team-output").innerHTML = "<p>Please select at least one player.</p>";
    return;
  }

  let totalPoints = 0, totalAssists = 0, totalRebounds = 0;

  const playerCards = picked.map(name => {
    const stats = playerStats[name];
    totalPoints += stats.points;
    totalAssists += stats.assists;
    totalRebounds += stats.rebounds;
    return `
      <div class="team-card">
        <h3>${name}</h3>
        <p>Points: ${stats.points}</p>
        <p>Assists: ${stats.assists}</p>
        <p>Rebounds: ${stats.rebounds}</p>
      </div>
    `;
  }).join("");

  const summary = `
    <div class="team-summary">
      <h4>Team Totals:</h4>
      <p><strong>Points:</strong> ${totalPoints.toFixed(1)}</p>
      <p><strong>Assists:</strong> ${totalAssists.toFixed(1)}</p>
      <p><strong>Rebounds:</strong> ${totalRebounds.toFixed(1)}</p>
    </div>
  `;

  document.getElementById("team-output").innerHTML = summary + `<div class="team-grid">${playerCards}</div>`;
}

function showSection(id) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => section.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "leaderboard") renderLeaderboard();
  if (id === "team-builder") renderTeamBuilder();
}
