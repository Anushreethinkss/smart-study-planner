// Add more subject input fields
function addSubject() {
  const container = document.getElementById('subjectsContainer');
  const div = document.createElement('div');
  div.className = "subjectInput";
  div.innerHTML = `<input type="text" placeholder="Subject Name" class="subjectName">
                   <select class="subjectDifficulty">
                     <option value="easy">Easy</option>
                     <option value="medium">Medium</option>
                     <option value="hard">Hard</option>
                   </select>`;
  container.appendChild(div);
}

// Generate study plan
function generatePlan() {
  const studyHours = parseFloat(document.getElementById('studyHours').value);
  const mood = document.getElementById('mood').value;
  if(!studyHours || studyHours <= 0) {
    alert("Please enter valid study hours!");
    return;
  }

  // Collect subjects
  const names = document.querySelectorAll('.subjectName');
  const diffs = document.querySelectorAll('.subjectDifficulty');
  let subjects = [];
  for(let i=0; i<names.length; i++) {
    if(names[i].value.trim() !== "") {
      subjects.push({name: names[i].value.trim(), difficulty: diffs[i].value});
    }
  }

  if(subjects.length === 0) {
    alert("Please add at least one subject!");
    return;
  }

  // Calculate weights
  let totalWeight = 0;
  subjects.forEach(s => {
    if(s.difficulty === "hard") totalWeight += 3;
    else if(s.difficulty === "medium") totalWeight += 2;
    else totalWeight += 1;
  });

  // Random motivational quotes
  const quotes = [
    "Consistency beats talent.",
    "Small steps every day lead to big results.",
    "Don't watch the clock; do what it does. Keep going!",
    "Stay positive, work hard, make it happen."
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  // Generate schedule
  let output = "<h3>Today's Study Plan:</h3><ul>";
  subjects.forEach(s => {
    let weight = s.difficulty === 'hard' ? 3 : s.difficulty === 'medium' ? 2 : 1;
    let time = (weight / totalWeight * studyHours * 60); // in minutes

    // Adjust for mood
    if(mood === "tired") time *= 0.8;
    else if(mood === "stressed") time *= 0.9;

    time = Math.round(time);

    output += `<li>${s.name} → ${time} mins</li>`;
  });
  output += `</ul><p>💡 Motivation: "${quote}"</p>`;
  document.getElementById('scheduleOutput').innerHTML = output;
}
