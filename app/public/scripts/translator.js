var currentLanguage = "en"

function toggleTranslate() {
    if (currentLanguage === "en") {
        translate("km")
        currentLanguage = "km"
    } else {
        translate("en")
        currentLanguage = "en"
    }
}

function translate(language) {
    const texts = document.querySelectorAll('.translate');
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