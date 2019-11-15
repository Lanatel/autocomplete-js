let locationInputs = document.getElementsByClassName("location-autocomplete");

Array.from(locationInputs).forEach(input => autoComplete(input));

function autoComplete(locationInput) {

    let currentFocus, cities;

    locationInput.addEventListener('focus', function (e) {
        this.value = '';
        if (!cities) cities = require('./cities');
    });

    locationInput.addEventListener('input', function (e) {

        let list, value = this.value;

        closeAllLists();

        if (!value) return false;

        currentFocus = -1;

        list = document.createElement('DIV');
        list.setAttribute('class', 'autocomplete-items');
        this.parentNode.appendChild(list);

        cities.getCities(value).forEach((city) => {
            let listItem = document.createElement('DIV');
            listItem.setAttribute('data-value', city);
            listItem.innerHTML = `<strong>${city.substr(0, value.length)}</strong>${city.substr(value.length)}`;

            listItem.addEventListener('click', function (e) {
                locationInput.value = this.getAttribute('data-value');
            });

            list.appendChild(listItem);
        });

        if (! isFitUnderInput(list)) list.classList.add('autocomplete-top');
        
    });

    locationInput.addEventListener('keydown', function (e) {
        let resultLists = this.parentNode.getElementsByClassName('autocomplete-items');

        if (resultLists.length > 0) {

            let listItems = resultLists[0].getElementsByTagName('div');

            switch (e.code) {
                case 'ArrowDown':
                    currentFocus++;
                    makeElemActive(listItems);
                    break;
                case 'ArrowUp':
                    currentFocus--;
                    makeElemActive(listItems);
                    break;
                case 'Enter':
                    e.preventDefault();

                    if (currentFocus > -1 && listItems) listItems[currentFocus].click();
                    break;
            }
        }
    });

    document.addEventListener('click', function (e) {
        closeAllLists(e.target);
    });

    const makeElemActive = foundedItems => {
        if (foundedItems.length === 0) return false;

        removeActive(foundedItems);

        if (currentFocus >= foundedItems.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = foundedItems.length - 1;

        foundedItems[currentFocus].classList.add('autocomplete-active');
    }

    const removeActive = foundedItems => Array.from(foundedItems).forEach((item) => item.classList.remove('autocomplete-active'));

    const closeAllLists = clickedElem => {
        let autocompleteLists = document.getElementsByClassName('autocomplete-items');

        Array.from(autocompleteLists).forEach((list) => {
            if (clickedElem !== list)
                list.parentNode.removeChild(list);
        });
    }

    const isFitUnderInput = listBlock => (window.innerHeight - listBlock.getBoundingClientRect().top > listBlock.offsetHeight);
}
