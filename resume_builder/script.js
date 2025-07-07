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
  alert("Pretend ChatGPT rewrote: " + text);
}

async function improveExperience(btn) {
  const textarea = btn.previousElementSibling;
  const text = textarea.value;
  alert("Pretend ChatGPT rewrote: " + text);
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
  if (!element || element.innerHTML.trim() === "") {
    alert("Please fill in your resume and click 'Preview Resume' before downloading.");
    return;
  }

  const clone = element.cloneNode(true);
  clone.style.display = "block";
  clone.style.position = "static";
  clone.style.width = "100%";

  const opt = {
    margin:       0.5,
    filename:     'resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(clone).set(opt).save();
}

window.onload = () => {
  for (let i = 0; i < 6; i++) addExperience();
};
