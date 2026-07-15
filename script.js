const generateBtn = document.getElementById('generate-btn');
const bioOutput = document.getElementById('bio-output');

generateBtn.addEventListener('click', async () => {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    // now: data.petName, data.species, data.goodWithDogs, etc.
    console.log(data);

    // --- soft-gate: everything from here ---
    const safetyFields = [
        { key: 'goodWithDogs', label: 'whether they\'re good with dogs' },
        { key: 'goodWithCats', label: 'whether they\'re good with cats' },
        { key: 'goodWithKids', label: 'whether they\'re good with children' },
        { key: 'compatibleWithStrangers', label: 'how they are with strangers/handling' },
    ];
    const missing = [];
    for (const field of safetyFields) {
        if (!data[field.key]) {
            missing.push(field.label);
        }
    }
    if (missing.length > 0) {
        const message = "You haven't marked: " + missing.join(", ") +
            ".\n\nPublishing without this can lead to a mismatched home. Generate anyway?";

        const proceed = window.confirm(message);
        if (!proceed) {
            return;
        }
    }
    // --- generation ---
    bioOutput.textContent = "Generating…";

    try {
        const res = await fetch("/api/generate", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        console.log("RESULT:", result);      // <-- add this line
        bioOutput.textContent = result.bio;
        bioOutput.style.display = "block";
        bioOutput.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
        bioOutput.textContent = "Something went wrong. Please try again.";
    }

});






