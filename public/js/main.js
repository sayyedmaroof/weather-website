// targetting the form 
const weatherForm = document.querySelector("form");
const weatherSearch = document.getElementById("weatherSearch");

// messages section 
const messageOne = document.getElementById("messageOne");
const messageTwo = document.getElementById("messageTwo");

// iconbox 
const iconBox = document.querySelector('.iconBox');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = weatherSearch.value;
    const url = `/weather?address=${location}`

    messageOne.innerText = "Lodaing Data Please Wait"
    fetch(url).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.innerText = data.error
            }
            else {
                messageOne.innerText = data.location
                messageTwo.innerText = data.forecast
                iconBox.innerHTML = `<img src="${data.forecastIcon}" alt="">`
            }
        })
    })
})