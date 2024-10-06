$(document).ready(function () {
    let notesList = [];
    let currentIndex = 0;

    // Add button function
    $('#add-btn').click(function () {
        const value = $('#textarea').val().trim();
        if (value !== "") {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            notesList.push({ text: value, favourite: false, time: currentTime });
            $('#textarea').val('');
            display();
        }
    });

    //display function
    function display() {
        $('#list').empty();
        notesList.forEach(function (note, index) {
            $('#list').append(`
                <div class="slide" id="slide">
                  <button class="favourite-btn" data-index="${index}">${note.favourite ? 'Unfavourite' : 'Favourite'}</button>
                  <button class="delete-btn" data-index="${index}">Delete</button>
                  <p style="padding-top:15px;margin-left:5px;">${note.text}</p>
                  <p class="time-text">${note.time}</p>
                </div>  
            `);
        });

        updateSlider();
    }

    //updating the slider
    function updateSlider() {
        const slideToShow = 3;

        if (notesList.length > slideToShow) {
            $('#prev').show();
            $('#next').show();
        } else {
            $('#prev').hide();
            $('#next').hide();
        }

        const slideWidth = $('#slide').outerWidth(true);
        $('#list').css('transform', `translateX(${-currentIndex * slideWidth}px)`);
    }
    
    //next button function
    $('#next').click(function () {
        const slideToShow = 3;
        const slideWidth = $('#slide').outerWidth(true);

        if (currentIndex + slideToShow < notesList.length) {
            currentIndex += slideToShow;
        } else {
            currentIndex = 0;
        }

        $('#list').css('transform', `translateX(${-currentIndex * slideWidth}px)`);
    });

    //prev button function
    $('#prev').click(function () {
        const slideToShow = 3;
        const slideWidth = $('#slide').outerWidth(true);

        if (currentIndex - slideToShow >= 0) {
            currentIndex -= slideToShow;
        } else {
            currentIndex = 0;
        }

        $('#list').css('transform', `translateX(${-currentIndex * slideWidth}px)`);
    });

    //add favourite button function
    $('#list').on('click', '.favourite-btn', function () {
        const index = $(this).data('index');
        notesList[index].favourite = !notesList[index].favourite;
        display();
    });

    //delete function
    $('#list').on('click', '.delete-btn', function () {
        const index = $(this).data('index');
        notesList.splice(index, 1);
        display();
    });

    //favourites addition and showing
    $('#fav').click(function () {
        const favContainer = $('#cards');

        if (favContainer.is(':visible')) {
            // If the favourites container is visible, hide it
            favContainer.hide();
        } else {
            // Otherwise, show the favourites
            const favList = notesList.filter(note => note.favourite);
            favContainer.empty(); // Clear previous favourites

            if (favList.length === 0) {
                favContainer.append('<h3>No favourites...</h3>').fadeIn("slow");
            } else {
                favContainer.append('<h2 id="fav-head">Your Favourite Notes...</h2>').fadeIn("slow").append('<hr style="margin:10px 0px;" >');
                favList.forEach((note, index) => {
                    const card = $(`<div class="fav-card" id="fav-card-${index}">${note.text}</div>`);
                    favContainer.append(card);

                    // Animate the card to slide in from the bottom
                    setTimeout(() => {
                        card.css({ top: '0px', opacity: 1 });
                    }, index * 1000);
                });
            }

            favContainer.show();
        }
    });

    // Adding click event to remove favourite slide from favourites section
    $('#cards').on('click', '.fav-card', function () {
        const noteText = $(this).text().trim();
        const noteIndex = notesList.findIndex(note => note.text === noteText);
        if (noteIndex !== -1) {
            notesList[noteIndex].favourite = false;
            $(this).remove();
            display();
        }
    });
});