document.addEventListener('DOMContentLoaded', () => {
    const texts = document.querySelectorAll('.translate');
    const language = "km";
    if (language == "en") {

    } else {
        texts.forEach(elementText => {
            const content = elementText.innerText;
    
            fetch('/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text: content, language})
            })
            .then(response => response.json())
            .then(data => {
                elementText.innerText = data.translation;
            })
            .catch(error => {
                console.error("Error: ", error)
            })
        });
    }
});