// Select DOM elements
const generateCardBtn = document.getElementById("generate-card");
const newCardBtn = document.getElementById("new-card-btn");
const downloadBtn = document.getElementById("download-btn");
const inputSection = document.getElementById("input-section");
const cardSection = document.getElementById("card-section");

const nameInput = document.getElementById("name");
const enrollmentInput = document.getElementById("enrollment");
const collegeInput = document.getElementById("college");
const locationInput = document.getElementById("location");
const photoInput = document.getElementById("photo");

const cardName = document.getElementById("card-name");
const cardEnrollment = document.getElementById("card-enrollment");
const cardCollege = document.getElementById("card-college");
const cardLocation = document.getElementById("card-location");
const cardPhoto = document.getElementById("card-photo");

// Function to generate the ID card
generateCardBtn.addEventListener("click", () => {
    const name = nameInput.value;
    const enrollment = enrollmentInput.value;
    const college = collegeInput.value;
    const location = locationInput.value;
    const photoFile = photoInput.files[0];

    if (name && enrollment && college && location && photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            cardPhoto.src = e.target.result;
        };
        reader.readAsDataURL(photoFile);

        // Set card information
        cardName.textContent = name;
        cardEnrollment.textContent = `Enrollment No: ${enrollment}`;
        cardCollege.textContent = `College: ${college}`;
        cardLocation.textContent = `Location: ${location}`;

        // Hide the input section and show the card section
        inputSection.style.display = "none";
        cardSection.style.display = "block";
    } else {
        alert("Please fill in all fields.");
    }
});

// // Function to download the ID card
// downloadBtn.addEventListener("click", () => {
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");

//     canvas.width = 300;
//     canvas.height = 400;

//     const img = new Image();
//     img.onload = function() {
//         context.drawImage(img, 50, 20, 100, 100); // Draw the photo
//         context.font = "16px Arial";
//         context.fillText(cardName.textContent, 50, 140);
//         context.fillText(cardEnrollment.textContent, 50, 160);
//         context.fillText(cardCollege.textContent, 50, 180);
//         context.fillText(cardLocation.textContent, 50, 200);

//         // Trigger the download
//         const link = document.createElement("a");
//         link.download = "id_card.png";
//         link.href = canvas.toDataURL("image/png");
//         link.click();
//     };
//     img.src = cardPhoto.src; // Set the image source to the ID card photo
// });

// Function to reset the form and hide the card
newCardBtn.addEventListener("click", () => {
    inputSection.style.display = "block";
    cardSection.style.display = "none";

    // Reset the input fields
    nameInput.value = "";
    enrollmentInput.value = "";
    collegeInput.value = "";
    locationInput.value = "";
    photoInput.value = "";
});
