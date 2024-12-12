function fileCommand() {
    fetch('http://localhost/oslab/file.php')
        .then(response => {
            console.log('Fetch response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            const fCommand = document.getElementById('f-Command');

            fCommand.innerHTML = ''; // Clear existing rows

            data.forEach(filea => {
                const row = document.createElement('tr');

                // Check if 'example' column is empty
                if (!filea.example || filea.example.trim() === "") {
                    row.innerHTML = `
                        <td>${filea.id}</td>
                        <td>${filea.command}</td>
                        <td>${filea.description}</td>
                        <td>${filea.Syntax}</td>
                        <td>command not found</td>
                    `;
                } else {
                    // Split by two newlines (\n\n) and trim each part
                    const base64Strings = filea.example
                        .split(/\n\s*\n/) // Split by two or more newlines
                        .map(s => s.trim())
                        .filter(s => s !== "");
                    
                    console.log("Base64 Strings:", base64Strings); // Debug log to check Base64 strings

                    const imgElements = base64Strings
                        .map((base64, index) => {
                            console.log(`Processing Base64 string ${index + 1}:`, base64); // Log each Base64 string
                            
                            // Ensure Base64 string starts with the correct image prefix
                            const base64WithPrefix = base64.startsWith('data:image') ? base64 : `data:image/jpeg;base64,${base64}`;

                            // Validate Base64 image format
                            const isValidBase64 = /^data:image\/[a-zA-Z]+;base64,/.test(base64WithPrefix);
                            console.log("Validating Base64:", base64WithPrefix, "Is valid:", isValidBase64); // Debug log to check validation

                            if (isValidBase64) {
                                return `<img src="${base64WithPrefix}" alt="Example ${index + 1}" style="max-width: 100px; max-height: 100px; margin-right: 5px;">`;
                            } else {
                                return `<span>Invalid Base64</span>`;
                            }
                        })
                        .join(''); // Join multiple images together

                    row.innerHTML = `
                        <td>${filea.id}</td>
                        <td>${filea.command}</td>
                        <td>${filea.description}</td>
                        <td>${filea.Syntax}</td>
                        <td>${imgElements}</td>
                    `;
                }

                fCommand.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching driver details:', error);
        });
}

window.onload = function () {
    fileCommand();
};
