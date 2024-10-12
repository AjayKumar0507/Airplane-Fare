'use strict';

// Get all the radio buttons inside the airline divs
const airlineRadios = document.querySelectorAll('.airline input[type="radio"]');
const h3s = document.querySelectorAll('.airline h3');

for (let i = 0; i < airlineRadios.length; i++) {
    airlineRadios[i].addEventListener('change', function() {
        // Remove 'selected' and 'selected-h3' classes from all elements
        document.querySelectorAll('.airline').forEach(div => {
            div.classList.remove('selected');
        });
        document.querySelectorAll('.airline h3').forEach(h3 => {
            h3.classList.remove('selected-h3');
        });

        // Add 'selected' class to the closest parent airline div
        this.closest('.airline').classList.add('selected');

        // Add 'selected-h3' class to the corresponding h3 inside the same airline div
        this.closest('.airline').querySelector('h3').classList.add('selected-h3');
    });
}


function getDuration(departure, arrival) {

    if(departure == arrival){
        window.alert("Both Arrival and Departure Time can't be equal");
        return;
    }
    // Convert time string (HH:MM) to minutes from midnight
    function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    // Get the time in minutes
    const departureMinutes = timeToMinutes(departure);
    const arrivalMinutes = timeToMinutes(arrival);

    // Calculate the difference
    let duration = arrivalMinutes - departureMinutes;

    // If arrival is earlier than departure, it means the arrival is on the next day
    if (duration < 0) {
        duration += 24 * 60;  // Add 24 hours in minutes
    }

    // Convert the total duration in minutes to hours and minutes
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return [parseInt(hours) , parseInt(minutes)];
}




function predictFare(btn){
    btn.textContent = "Please Wait"
    btn.disabled = true
    console.log(btn)
    
    /*  ---------------- GETTING AIRLINES SELECTED ----------------  */
    const airlines = document.querySelectorAll('input[name="airline"]');
    let selectedAirline = null;
    airlines.forEach((airline) => {
        if (airline.checked) {
            selectedAirline = airline.id;
            console.log(airline.id);
        }
    });
    // if ( selectedAirline == null ){
    //     window.alert("Please select an airline");
    //     return;
    // }

    if(selectedAirline == "trujet")
        selectedAirline = 0;
    else if(selectedAirline == "spicejet")
        selectedAirline = 1;
    else if(selectedAirline == "vistara")
        selectedAirline = 5;
    else if(selectedAirline == "airindia")
        selectedAirline = 7;
    else if(selectedAirline == "jetAirways")
        selectedAirline = 10;
    

    /*----------------  GETTING SOURCE ----------------------- */
    const sources = document.getElementById("from");
    console.log(sources.value);
    const sourceSelected = sources.value;
    // if(sourceSelected == "Origin"){
    //     window.alert("Please choose your Origin");
    //     return;
    // }

    let isKolkota = 0;
    let isDelhi = 0;
    let isBangalore = 0;
    let isChennai = 0;
    let isMumbai = 0;

    if(sourceSelected == "Bangalore")
        isBangalore = 1;
    else if(sourceSelected == "Kolkota")
        isKolkota = 1;
    else if(sourceSelected == "Delhi")
        isDelhi = 1;
    else if(sourceSelected == "Chennai")
        isChennai = 1;
    else if(sourceSelected == "Mumbai")
        isMumbai = 1;
    


    
    
    /*----------------  GETTING DESTINATION ----------------------- */
    const destinations = document.getElementById("to");
    console.log(destinations.value);
    let destinationSelected = destinations.value;
    // if(destinationSelected == "Destination"){
    //     window.alert("Please choose your Destination");
    //     return;
    // }
    if(destinationSelected == "Kolkota")
        destinationSelected = 0;
    else if(destinationSelected == "Hyderabad")
        destinationSelected = 1;
    else if(destinationSelected == "Delhi")
        destinationSelected = 2;
    else if(destinationSelected == "Bangalore")
        destinationSelected = 3;
    else if(destinationSelected == "Cochin")
        destinationSelected = 4;

    console.log("hello"+destinationSelected);


    /*----------------  GETTING STOPS ----------------------- */
    const stops = document.getElementById("stops");
    // if(stops.value == "Stops"){
    //     window.alert("Please choose no of stops");
    //     return;
    // }
    const stopsSelected = parseInt(stops.value);
    console.log(stopsSelected);


    /* ------------------ GETTING JOURNEY DATE ----------------- */
    const journeyDateInput = document.getElementById('journey-date');
    const selectedDate = journeyDateInput.value;

    // if (selectedDate == ""){
    //     window.alert("Please select journey date");
    //     return;
    // }

    const journeyMonth = parseInt(selectedDate.split("-")[1]);
    const journeyDay = parseInt(selectedDate.split("-")[2]);
    console.log(journeyDay,journeyMonth); 




    /* ------------------ GETTING ARRIVAL TIME ----------------- */
    const arrivalTimeInput = document.getElementById('arrival-time');
    const selectedArrivalTime = arrivalTimeInput.value;
    console.log(selectedArrivalTime);

    // if (selectedArrivalTime == ""){
    //     window.alert("Please select Arrival Time");
    //     return;
    // }

    const arrivalHour = parseInt(selectedArrivalTime.split(":")[0]);
    const arrivalMinute = parseInt(selectedArrivalTime.split(":")[1]);
    console.log(arrivalHour , arrivalMinute); 


    /* ------------------ GETTING DEPARTURE TIME ----------------- */
    const departureTimeInput = document.getElementById('departure-time');
    const selectedDepartureTime = departureTimeInput.value;
    console.log(selectedDepartureTime);

    // if (selectedDepartureTime == ""){
    //     window.alert("Please select Departure Time");
    //     return;
    // }

    const departureHour = parseInt(selectedDepartureTime.split(":")[0]);
    const departureMinute = parseInt(selectedDepartureTime.split(":")[1]);
    console.log(departureHour , departureMinute); 


    const totalDuration = getDuration(selectedDepartureTime , selectedArrivalTime);
    console.log(totalDuration);
    

    const test_data = [
        selectedAirline , destinationSelected , stopsSelected,
        journeyDay , journeyMonth , departureHour , departureMinute,
        arrivalHour , arrivalMinute, totalDuration[0] , totalDuration[1],
        isBangalore , isKolkota , isDelhi , isChennai , isMumbai
    ];

    console.log(test_data);

    sendData([test_data]);

}



async function sendData(inputArray) {
    const response = await fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputArray) // Send a plain array
    });

    const result = await response.json();
    window.alert(result.predictions);
    const btn = document.querySelector('#predictBtn')
    btn.textContent = "Predict"
    btn.disabled = false
}
