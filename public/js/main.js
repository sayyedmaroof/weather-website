console.log("This is a client side JavaScript file and this is successfully loaded in our page");


// targetting the form 
const weatherForm = document.querySelector("form");
const weatherSearch = document.getElementById("weatherSearch");

// messages section 
const messageOne = document.getElementById("messageOne");
const messageTwo = document.getElementById("messageTwo");


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = weatherSearch.value;
    const url = `http://localhost:3000/weather?address=${location}`

    messageOne.innerText = "Lodaing Data Please Wait"
    fetch(url).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.innerText = data.error
            }
            else {
                messageOne.innerText = data.location
                messageTwo.innerText = data.forecast
            }
        })
    })
})