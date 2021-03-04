const limitation = {
    maxApartaments: 2
};

// Currencies info
const currencies = {
    RUB: {
        icon: '₽'
    },
    USD: {
        icon: '$'
    }
};

// Data to load and configs
const loads = {
    configs: {
        indexes: {
            apartament: 0
        }
    },
    apartaments: [
        {
            img: './static/images/apartament4.png',
            title: 'Hello world im testing this',
            lotNumber: 111,
            prices: {
                total: 22000000,
                perMeter: 1234,
                currency: 'RUB'
            },
            area: 74,
            floor: 57
        },
        {
            img: './static/images/apartament1.png',
            title: 'Hello world im testing this',
            lotNumber: 111,
            prices: {
                total: 1231240120,
                perMeter: 1234,
                currency: 'USD'
            },
            area: 74,
            floor: 57
        },
        {
            img: './static/images/apartament1.png',
            title: 'Hello world im testing this',
            lotNumber: 111,
            prices: {
                total: 1231240120,
                perMeter: 1234,
                currency: 'USD'
            },
            area: 74,
            floor: 57
        },
        {
            img: './static/images/apartament1.png',
            title: 'Hello world im testing this',
            lotNumber: 111,
            prices: {
                total: 1231240120,
                perMeter: 1234,
                currency: 'USD'
            },
            area: 74,
            floor: 57
        },
        {
            img: './static/images/apartament1.png',
            title: 'Hello world im testing this',
            lotNumber: 111,
            prices: {
                total: 1231240120,
                perMeter: 1234,
                currency: 'USD'
            },
            area: 74,
            floor: 57
        }
    ]
}

// Filtration functions
const selections = {
    apartaments: {
        '-1': (apartament) => true,
        '0': (apartament) => apartament.prices.total >= 20000000 && apartament.prices.total <= 30000000,
        '1': (apartament) => apartament.prices.total > 30000000 && apartament.prices.total <= 50000000,
        '2': (apartament) => apartament.prices.total > 50000000 && apartament.prices.total <= 100000000,
        '3': (apartament) => apartament.prices.total > 100000000
    }
}


let toPush = '';
const moreWrapper = document.querySelector('.more-wrapper');
const loadMore = () => {
    const options = document.querySelector('.options');
    const selected = document.querySelector('.select.active');
    const selectedDataSelect = selected.getAttribute('data-select');
    let apartaments = loads.apartaments.filter(selections.apartaments[selectedDataSelect]);
    
    const apartamentsCount = apartaments.length;
    for (i = loads.configs.indexes.apartament; i < apartamentsCount && i < loads.configs.indexes.apartament + limitation.maxApartaments; i++) {
        const apartament = apartaments[i];
        toPush += `<div class="option">
                    <div class="header">
                        <div class="option-img-wrapper">
                            <img src="${apartament.img}" alt="" class="option-img">
                        </div>
                    </div>
                    <div class="section">
                        <div class="heading">${apartament.title}</div>
                        <div class="text">Лот № ${apartament.lotNumber}</div>
                        <div class="info">
                            <div class="left">
                                <div class="top">
                                    <div class="price">${apartament.prices.total} ${currencies[apartament.prices.currency].icon}</div>
                                </div>
                                <div class="bottom">
                                    <div class="price-per-m">${apartament.prices.perMeter} ${currencies[apartament.prices.currency].icon} за м²</div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="top">
                                    <div class="area">Площадь ${apartament.area} м²</div>
                                </div>
                                <div class="bottom">
                                    <div class="floor">Этаж ${apartament.floor}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <div class="action-buttons">
                            <button class="cover gray">Назначить просмотр</button>
                        </div>
                    </div>
                </div>`
    }
    loads.configs.indexes.apartament = i;
    options.innerHTML = toPush;
    console.log(toPush);
    if (i >= apartamentsCount) moreWrapper.style.display = 'none'
    else  moreWrapper.style.display = 'block';
};

// Load apartaments data for first time
loadMore();
document.querySelector('.more-wrapper').onclick = loadMore;

const selectElements = document.querySelectorAll('.select-buttons-wrapper .select');
const selectsLength = selectElements.length;
for (let i = 0; i < selectsLength; i++) {
    selectElements[i].onclick = (e) => {
        document.querySelector('.select-buttons-wrapper .select.active').classList.remove('active');
        selectElements[i].classList.add('active')
        toPush = '';
        loads.configs.indexes.apartament = 0;
        // On selection function changing load new data
        loadMore();
    };
}