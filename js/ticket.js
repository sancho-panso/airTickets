let forma = document.querySelector('.form');
let name = document.getElementById('Name');
let surname = document.getElementById('Surname');
let ID = document.getElementById('ID');
let notes = document.getElementById('Notes');
let from = document.getElementById('inputFrom');
let to = document.getElementById('inputTo');
let luggage = document.getElementById('bags');
let storage;

forma.onsubmit = function (e) {
        e.preventDefault();
        if(name.value === '' 
        || surname.value === '' 
        || ID.value === ''
        || to.value === 'Choose...' 
        || from.value === 'Choose...' 
        || luggage.value === 'Choose...' 
        ){
        alert("Please fill all required fields");
        }
        else
        {
        document.getElementById('print').className = '';
        let flight = new Flight();
        flight.number = Math.floor(Math.random() * 100)+10 +"ABC";
        flight.userName = name.value;
        flight.userSurName = surname.value;
        flight.userID = ID.value;
        flight.flightFrom = from.value;
        flight.flightTo = to.value;
        flight.price = Math.floor(Math.random() * 100)+10;
        flight.luggage = luggage.value;
        flight.notes = notes.value
        storage = localStorage.setItem('savedBooking', JSON.stringify(flight));
        }
      }


function Flight(number, 
                userName,
                userSurName,
                userID,
                flightFrom,
                flightTo,
                price,
                luggage,
                notes)
                {
    let flight = {};
        flight.number = number;
        flight.userName = userName;
        flight.userSurName = userSurName;
        flight.userID = userID;
        flight.flightFrom = flightFrom;
        flight.flightTo = flightTo;
        flight.price = price;
        flight.luggage = luggage;
        flight.notes = notes
     return flight;
};

(function(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
            var places = JSON.parse(xhr.responseText);
            let optionList = document.querySelector('.city');
            let optionList2 = document.querySelector('.cityTo');
            for (let index = 0; index < places.records.length; index++) {
                   let option = document.createElement('option');
                   option.value = places.records[index].fields.name;
                   option.innerText = places.records[index].fields.name;
                   optionList.appendChild(option);
                   let option2 = document.createElement('option');
                   option2.value = places.records[index].fields.name;
                   option2.innerText = places.records[index].fields.name;
                   optionList2.appendChild(option2);
            }
        }
    }

    xhr.open('GET', 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000');
    xhr.send();
   })();


document.querySelector('.booking').onclick= function(){
    document.querySelector('#formShow').className = '';
     }
document.querySelector('.print').onclick= function(){
    storage = JSON.parse(localStorage.getItem('savedBooking'))
    console.log(storage);
    document.getElementById('person').innerHTML = storage.userName + " " + storage.userSurName + " ID: "+ storage.userID;
    document.getElementById('data').innerHTML = "DATA: " + Date().slice(0,15);
    document.getElementById('from').innerHTML = "FROM: " + storage.flightFrom;
    document.getElementById('to').innerHTML = "FROM: " + storage.flightTo;
    document.getElementById('to').innerHTML = "TO: " + storage.flightTo;
    document.getElementById('timefrom').innerHTML = "Departure: 12:35";
    document.getElementById('timeto').innerHTML = "Arrival: 14:45";
    document.getElementById('duration').innerHTML = "Duration: 02:10";
    document.getElementById('duration').innerHTML = "Duration: 02:10";
    document.getElementById('notes').innerHTML = "Notes: " + storage.notes;
    document.getElementById('flightID').innerHTML = "Flight Nr: " + storage.number;
    document.getElementById('price').innerHTML = "Price: " + storage.price +" USD";
    let fee;
    (storage.luggage > 20) ? fee = 30 : fee = 0;
    let total = storage.price + fee;
    document.getElementById('luggage').innerHTML = "Luggage fee: " + fee + " USD";
    document.getElementById('total').innerHTML = "Total: " + total + " USD";
     }



