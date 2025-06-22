function generateResume() {
  document.getElementById("previewName").textContent = document.getElementById("name").value;
  document.getElementById("previewTitle").textContent = document.getElementById("title").value;
  document.getElementById("previewSummary").textContent = document.getElementById("summary").value;
  document.getElementById("previewExperience").textContent = document.getElementById("experience").value;
  document.getElementById("previewEducation").textContent = document.getElementById("education").value;

  const skillsInput = document.getElementById("skills").value.split(",");
  const skillsList = document.getElementById("previewSkills");
  skillsList.innerHTML = "";
  skillsInput.forEach(skill => {
    if (skill.trim()) {
      const li = document.createElement("li");
      li.textContent = skill.trim();
      skillsList.appendChild(li);
    }
  });
}

function downloadPDF() {
  const element = document.getElementById("resumePreview");
  html2pdf().from(element).save("my-resume.pdf");
}
