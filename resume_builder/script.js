let experienceCount = 0;

function addExperience() {
  const div = document.createElement("div");
  div.innerHTML = `
    <textarea class="experience" placeholder="Describe your work experience"></textarea>
    <button type="button" onclick="improveExperience(this)">Rewrite</button>
  `;
  document.getElementById("experienceInputs").appendChild(div);
  experienceCount++;
}

async function improveText(id) {
  const text = document.getElementById(id).value;
  const res = await fetch("http://localhost:5000/rewrite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section: "summary", content: text })
  });
  const data = await res.json();
  document.getElementById(id).value = data.rewritten;
}

async function improveExperience(btn) {
  const textarea = btn.previousElementSibling;
  const text = textarea.value;
  const res = await fetch("http://localhost:5000/rewrite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section: "experience", content: text })
  });
  const data = await res.json();
  textarea.value = data.rewritten;
}

function generateResume() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const gender = document.getElementById("gender").value;
  const summary = document.getElementById("summary").value;
  const education = document.getElementById("education").value;
  const languages = document.getElementById("languages").value;
  const skills = document.getElementById("skills").value;
  const layout = document.getElementById("layout").value;

  const experiences = Array.from(document.querySelectorAll(".experience"))
    .map(el => `<li>${el.value}</li>`)
    .join("");

  const preview = document.getElementById("resumePreview");
  const layoutClass = layout === "modern" ? "modern-resume" : "classic-resume";
  preview.className = `preview ${layoutClass}`;
  preview.innerHTML = `
    <h2>${name}</h2>
    <p><strong>${phone}</strong> | ${email} | ${address}</p>
    <p><strong>Gender:</strong> ${gender}</p>
    <h3>Summary</h3><p>${summary}</p>
    <h3>Education</h3><p>${education}</p>
    <h3>Languages</h3><p>${languages}</p>
    <h3>Skills</h3><p>${skills}</p>
    <h3>Experience</h3><ul>${experiences}</ul>
  `;
  preview.classList.remove("hidden");
}

function downloadPDF() {
  const element = document.getElementById("resumePreview");
  html2pdf().from(element).save("resume.pdf");
}

window.onload = () => {
  for (let i = 0; i < 6; i++) addExperience();
};
