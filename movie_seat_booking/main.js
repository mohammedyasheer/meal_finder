const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
populateUI();  

let ticketPrice = +movieSelect.value; 



//SetMovieData

function setMovieData(selectedMovie, moviePrice) {
  localStorage.setItem('selectedMovie', selectedMovie);
  localStorage.setItem('moviePrice', moviePrice);
  
}

//adding count and total in the UI

function allselectedSeats() {
  const selectedSeat = document.querySelectorAll('.row .seat.selected');

  const seatIndex = [...selectedSeat].map(function(seat) {
      return[...seats].indexOf(seat);
  });
  localStorage.setItem('SelectedSeats', JSON.stringify(seatIndex));
  console.log(seatIndex);
   const seatSelectedCount = selectedSeat.length;
   count.innerText =seatSelectedCount;
   total.innerText = seatSelectedCount * ticketPrice;
  
}

//PopulateUI Method
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('SelectedSeats'));
  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) =>{
      if(selectedSeats.indexOf(index) > -1)
      {
          seat.classList.add('selected'); 
      } 
    });

  }
  const selectMovieIndex = localStorage.getItem('selectedMovie');
    if(selectMovieIndex !== null){
      movieSelect.selectedIndex = selectMovieIndex;


    }
}

// Select Movie
movieSelect.addEventListener('change', e =>{
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  allselectedSeats();
});
container.addEventListener('click', e => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected');  
    allselectedSeats();
  }
});

// init 
allselectedSeats();