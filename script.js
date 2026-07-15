const generateBtn = document.getElementById('generate-btn');
const bioOutput = document.getElementById('bio-output');

generateBtn.addEventListener('click', () => {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    // now: data.petName, data.species, data.goodWithDogs, etc.
    console.log(data);

    // --- soft-gate: everything from here ---
    const safteyFields = [
        { key: 'goodWithDogs', label: 'whether they\'re good with dogs' },
        { key: 'goodWithCats', label: 'whether they\'re good with cats' },
        { key: 'goodWithKids', label: 'whether they\'re good with children' },
        { key: 'compatibleWithStrangers', label: 'how they are with strangers/handling' },
    ];
    const missing = [];
    for (const field of safteyFields) {
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
    // --- gate ends; generation will go here later --- 

});






