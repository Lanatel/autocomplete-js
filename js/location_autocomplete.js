let locationInputs = document.getElementsByClassName("location-autocomplete");

Array.from(locationInputs).forEach(function (input) {
    autoComplete(input);
});

function autoComplete(locationInput) {

    let currentFocus, cities;

    locationInput.addEventListener('focus', function () {
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

        cities.getCities(value).forEach(function (city) {
            let listItem = document.createElement('DIV');
            listItem.setAttribute('data-value', city);
            listItem.innerHTML = `<strong>${city.substr(0, value.length) }</strong>`;
            listItem.innerHTML += city.substr(value.length);

            list.appendChild(listItem);
            listItem.addEventListener('click', function (e) {
                locationInput.value = this.getAttribute('data-value');
            })
        });

        setPosition(list);
    });

    locationInput.addEventListener('keydown', function (e) {
        let resultList = this.parentNode.getElementsByClassName('autocomplete-items');

        if (resultList.length > 0) {

            let listItems = resultList[0].getElementsByTagName('div');

            switch (e.code) {
                case 'ArrowDown':
                    currentFocus++;
                    makeElemActive(listItems);
                    break;
                case 'ArrowUp':
                    currentFocus --;
                    makeElemActive(listItems);
                    break;
                case 'Enter':
                    e.preventDefault();

                    if (currentFocus > -1)
                        if (listItems) listItems[currentFocus].click();
                    break;
            }
        }
    });

    document.addEventListener('click', function (e) {
        closeAllLists(e.target);
    });

    function makeElemActive(foundedItems) {
        if (foundedItems.length === 0) return false;

        removeActive(foundedItems);

        if (currentFocus >= foundedItems.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = foundedItems.length - 1;

        foundedItems[currentFocus].classList.add('autocomplete-active');
    }

    function removeActive(foundedItems) {
        Array.from(foundedItems).forEach(function (item) {
            item.classList.remove('autocomplete-active');
        });
    }

    function closeAllLists(clickedElem) {
        let autocompleteLists = document.getElementsByClassName('autocomplete-items');

        Array.from(autocompleteLists).forEach(function (list) {
            if (clickedElem !== list)
                list.parentNode.removeChild(list);
        });
    }

    function setPosition(listBlock) {

        if (window.innerHeight - listBlock.getBoundingClientRect().top < listBlock.offsetHeight) {
            listBlock.classList.add('autocomplete-top');

        }
    }
}
