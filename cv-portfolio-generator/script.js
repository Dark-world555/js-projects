// Add experience section dynamically
function addExperience() {
    const experienceSection = document.getElementById('experienceSection');
    const newExperienceInput = document.createElement('input');
    newExperienceInput.type = 'text';
    newExperienceInput.placeholder = 'Company Name, Job Title';
    
    const newExperienceDesc = document.createElement('textarea');
    newExperienceDesc.rows = 4;
    newExperienceDesc.placeholder = 'Describe your work experience';
    
    experienceSection.appendChild(newExperienceInput);
    experienceSection.appendChild(newExperienceDesc);
}

// Handle form submission to generate CV preview
document.getElementById('cvForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const summary = document.getElementById('summary').value;
    const experience = document.getElementById('experience').value;
    const experienceDescription = document.getElementById('experienceDescription').value;
    const skills = document.getElementById('skills').value;
    const projects = document.getElementById('projects').value;
    const certifications = document.getElementById('certifications').value;
    const hobbies = document.getElementById('hobbies').value;

    // Preview the CV content
    document.getElementById('cvOutput').innerHTML = `
        <h3>${name}</h3>
        <p>Email: ${email} | Phone: ${phone}</p>
        <h4>Professional Summary</h4>
        <p>${summary}</p>
        <h4>Work Experience</h4>
        <p><strong>${experience}</strong></p>
        <p>${experienceDescription}</p>
        <h4>Skills</h4>
        <p>${skills}</p>
        <h4>Projects</h4>
        <p>${projects}</p>
        <h4>Certifications</h4>
        <p>${certifications}</p>
        <h4>Hobbies</h4>
        <p>${hobbies}</p>
    `;

    // Show preview and hide form
    document.getElementById('cvForm').style.display = 'none';
    document.getElementById('cvPreview').style.display = 'block';
});

// Go back to home page (reset form)
function goHome() {
    location.reload(); // Reloads the page to start over
}

// PDF download functionality with enhanced design
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const summary = document.getElementById('summary').value;
    const experience = document.getElementById('experience').value;
    const experienceDescription = document.getElementById('experienceDescription').value;
    const skills = document.getElementById('skills').value;
    const projects = document.getElementById('projects').value;
    const certifications = document.getElementById('certifications').value;
    const hobbies = document.getElementById('hobbies').value;

    // Title
    doc.setFontSize(22);
    doc.text(name, 20, 20);

    // Contact Info
    doc.setFontSize(12);
    doc.text(`Email: ${email} | Phone: ${phone}`, 20, 30);

    // Summary
    doc.setFontSize(16);
    doc.text("Professional Summary", 20, 40);
    doc.setFontSize(12);
    doc.text(summary, 20, 50, { maxWidth: 170 });

    // Work Experience
    doc.setFontSize(16);
    doc.text("Work Experience", 20, 70);
    doc.setFontSize(12);
    doc.text(`Company: ${experience}`, 20, 80);
    doc.text(experienceDescription, 20, 90, { maxWidth: 170 });

    // Skills
    doc.setFontSize(16);
    doc.text("Skills", 20, 110);
    doc.setFontSize(12);
    doc.text(skills, 20, 120, { maxWidth: 170 });

    // Projects
    doc.setFontSize(16);
    doc.text("Projects", 20, 140);
    doc.setFontSize(12);
    doc.text(projects, 20, 150, { maxWidth: 170 });

    // Certifications
    doc.setFontSize(16);
    doc.text("Certifications", 20, 170);
    doc.setFontSize(12);
    doc.text(certifications, 20, 180, { maxWidth: 170 });

    // Hobbies
    doc.setFontSize(16);
    doc.text("Hobbies", 20, 200);
    doc.setFontSize(12);
    doc.text(hobbies, 20, 210, { maxWidth: 170 });

    // Add a decorative line
    doc.setLineWidth(0.5);
    doc.line(20, 220, 180, 220);

    // Footer
    doc.setFontSize(8);
    doc.text('Generated using Online CV/Portfolio Generator', 20, 290);

    doc.save(`${name}_CV.pdf`);
}
