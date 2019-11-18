let locationInputs = document.getElementsByClassName('location-autocomplete');

Array.from(locationInputs).forEach(input => autoComplete(input));

function autoComplete(locationInput) {

    let currentFocus, cities, scroll;

    locationInput.addEventListener('focus', function (e) {
        this.value = '';
        if (!cities) cities = require('./cities');
    });

    locationInput.addEventListener('input', function (e) {
        let list, value = cities.convert(this.value);

        closeAllLists();

        if (!value) return false;

        currentFocus = -1;
        scroll = 0;

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

        setCssToPutListInProperPosition(list);
        
    });

    locationInput.addEventListener('keydown', function (e) {
        let resultLists = this.parentNode.getElementsByClassName('autocomplete-items');

        if (resultLists.length > 0) {
            let listItems = resultLists[0].getElementsByTagName('div');

            switch (e.code) {
                case 'ArrowDown':
                    onArrowDownHandler(listItems);
                    break;
                case 'ArrowUp':
                    onArrowUpHandler(listItems);
                    break;
                case 'Enter':
                    e.preventDefault();

                    if (currentFocus >= 0 && listItems) listItems[currentFocus].click();
                    break;
            }
        }
    });

    document.addEventListener('click', function (e) {
        closeAllLists(e.target);
    });

    const onArrowUpHandler = foundItems => {
        if (foundItems.length === 0) return false;

        if (currentFocus > 0) {
            removeActive(foundItems);

            if (currentFocus > 1) {
                if (currentFocus !== foundItems.length - 1) scroll -= foundItems[currentFocus].clientHeight;
                foundItems[0].parentNode.scrollTop = scroll;
            }
            currentFocus--;
            foundItems[currentFocus].classList.add('autocomplete-active');
        }
    };

    const onArrowDownHandler = foundItems => {
        if (foundItems.length === 0) return false;

        if (currentFocus < foundItems.length - 1) {
            removeActive(foundItems);

            currentFocus++;
            foundItems[currentFocus].classList.add('autocomplete-active');

            if (currentFocus > 1) {
                if (currentFocus !== foundItems.length - 1) scroll += foundItems[currentFocus].clientHeight;
                foundItems[0].parentNode.scrollTop = scroll;
            }
        }
    };

    const removeActive = foundItems => {
        return Array.from(foundItems)
            .forEach((item) => item.classList.remove('autocomplete-active'));
    };

    const closeAllLists = clickedElement => {
        let autocompleteLists = document.getElementsByClassName('autocomplete-items');

        Array.from(autocompleteLists).forEach((list) => {
            if (clickedElement !== list)
                list.parentNode.removeChild(list);
        });
    };

    const setCssToPutListInProperPosition = listBlock => {
        let heightUnderInput = window.innerHeight - listBlock.getBoundingClientRect().top,
            heightOverInput = listBlock.getBoundingClientRect().top,
            listBlockHeight = listBlock.offsetHeight,
            availableHeight;

        if (!(heightUnderInput > listBlockHeight) && !(heightUnderInput > heightOverInput)) {
            listBlock.classList.add('autocomplete-top');
            availableHeight = heightOverInput;
        } else {
            availableHeight = heightUnderInput;
        }

        let listBlockChildren = listBlock.childNodes;

        availableHeight -= 15;

        if (availableHeight < listBlockHeight && listBlockChildren.length > 3) {
            let listBlockChildHeight = listBlockChildren[0].offsetHeight;

            listBlock.style.height = listBlockChildHeight * Math.max(3, Math.floor(availableHeight / listBlockChildHeight)) + 'px';
            listBlock.style.overflowY = 'scroll';
        }
    }
}
