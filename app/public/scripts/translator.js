var currentLanguage = "en"
document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById("dark")
    checkbox.addEventListener("change", (event) => {
        if (event.target.checked) {
            translate("km")
        } else {
            translate("en")
        }
    })
});

function translate(language) {
    console.log("why are we getting")
    const texts = document.querySelectorAll('.translate');
    if (currentLanguage == "en") {
        if (language == "km") {
            texts.forEach(elementText => {
                const content = elementText.innerText;
    
                fetch('/translate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: content, language })
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
    } 
}