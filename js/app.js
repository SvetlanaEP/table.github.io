let filterContent = document.querySelectorAll('.filter-educations__content');
let filterButton = document.querySelectorAll('.filter-educations__description');
let filterChooseButton = document.querySelectorAll('.filter-educations__button');

// для отключения масштаба

function onResize() {
    const width = window.innerWidth;
    const body = document.body;
    // Сброс медиазапросов
    body.classList.remove('fixed-mobile', 'fixed-tablet', 'fixed-desktop');

    // Фиксируем текущий дизайн
    if (width <= 480) {
        body.classList.add('fixed-mobile-min');
    }
    if (width > 480 && width < 720) {
        body.classList.add('fixed-table');
    }
    if (width >= 720 && width < 850) {
        body.classList.add('fixed-table-max');
    }
    if (width >= 850 && width < 1200) {
        body.classList.add('fixed-desktop-min');
    }
    if (width >= 1200 && width < 1360) {
        body.classList.add('fixed-desktop');
    }
    if (width >= 1360 && width < 1920) {
        body.classList.add('fixed-2k');
    }
    if (width >=1920) {
        body.classList.add('fixed-max');
    }
}

onResize()

window.addEventListener('resize', onResize)


for (let i=0; i < filterButton.length; i++) {
    filterButton[i].addEventListener('click', () => {
        if (filterContent[i].classList.contains('filter-educations__content--none')) {
            openBlock(filterButton[i], filterContent[i])
            document.getElementById('overlay').style.display = 'block';
            document.body.classList.add('modal-open');

        } else {
            closeBlock(filterButton[i], filterContent[i])
            document.getElementById('overlay').style.display = 'none';
            document.body.classList.remove('modal-open');
        }

    })
}

for (let i=0; i < filterChooseButton.length; i++) {
    filterChooseButton[i].addEventListener('click', () => {
        closeBlock(filterButton[i], filterContent[i])
    })
}


function openBlock(button, block) {
    block.classList.remove('filter-educations__content--none');
    button.querySelector('.select-icons__arrow').classList.add('select-icons__arrow--open')

    button.style.border = '0.2vh solid #00B0D9';
    button.style.color = '#202020';
}

function closeBlock(button, block)  {
    button.style.border = '0.2vh solid #C1C1C1';
    button.querySelector('.select-icons__arrow').classList.remove('select-icons__arrow--open')

    block.classList.add('filter-educations__content--none');
    button.style.color = '#7D7D7D';
}

// Открытие формы для добавления данных

const addForm = document.querySelector('.add-data');
const addButton = document.querySelector('.soft-bar__container--add');
const addCloseButton = addForm.querySelector('.popup-form__close');
const addCancelButton = addForm.querySelector('.popup-form__button--cancel')



function openPopup(form) {
    form.classList.remove('popup-form--closed')
    document.getElementById('overlay').style.display = 'block';
    document.body.classList.add('modal-open');

    if (form===addForm) {
        const customSelect = document.querySelector('.custom-select-edit');
        const trigger = customSelect.querySelector('.custom-select__trigger');
        const hiddenInput = customSelect.querySelector('input[type="hidden"]');

            trigger.querySelector('span').textContent = 'Выберите тип организации';
            hiddenInput.value = '';

    }
}
function closePopup(form) {
    const textareaList = form.querySelectorAll('textarea')
    const iconClose = form.querySelectorAll('.clear-icon__del')

    textareaList.forEach(textarea => {
        textarea.value = ''
    })

    iconClose.forEach(icon => {
        icon.style.display = 'none'
    })

    if (form.querySelector('.duplicate-message')) {
        const duplicateMessage = form.querySelector('.duplicate-message');
        const textareaDuplicate = form.querySelectorAll('.popup-form__input');
        const selectDuplicate = form.querySelector('.custom-select-edit');

        duplicateMessage.style.display = 'none';
        textareaDuplicate.forEach((textarea) => {
            textarea.classList.remove('duplicate-textarea-style')
        });

        selectDuplicate.classList.remove('duplicate-textarea-style');
    }


    if (form.classList.contains('popup-form--open')) {
        form.classList.remove('popup-form--open')
    }

    form.classList.add('popup-form--closed')
    document.getElementById('overlay').style.display = 'none';
    document.body.classList.remove('modal-open');
}

addButton.addEventListener('click', () => {
    openPopup(addForm)
})

addCloseButton.addEventListener('click', () => {
    if (!addForm.classList.contains('popup-form--closed')) {
        closePopup(addForm)
    }
})

addCancelButton.addEventListener('click', () => {
    if (!addForm.classList.contains('popup-form--closed')) {
        closePopup(addForm)
    }
})

// Открыть форму для импорта

const importForm = document.querySelector('.import-data')
const importOpenPopup = document.querySelector('.soft-bar__button--import')
const importCloseButton = importForm.querySelector('.popup-form__close')
const importCancelButton = importForm.querySelector('.popup-form__button--cancel')

importOpenPopup.addEventListener('click', () => {
    openPopup(importForm)
})

importCloseButton.addEventListener('click', () => {
    closePopup(importForm)
})

importCancelButton.addEventListener('click', () => {
    closePopup(importForm)
})


// Про иконку-крестик в инпутах

const formInput = document.querySelectorAll('.input-item');
const clearIcon = document.querySelectorAll('.clear-icon:not(.clear-icon--custom-select)');

for (let i=0; i<clearIcon.length; i++) {

    formInput[i].addEventListener('input', function() {
        if (formInput[i].value.length > 0) {
            clearIcon[i].style.display = 'block';
        } else {
            clearIcon[i].style.display = 'none';
        }
    });

    clearIcon[i].addEventListener('click', function() {
        formInput[i].value = '';
        clearIcon[i].style.display = 'none';
        formInput[i].focus(); // Вернем фокус на инпут после очистки
    });
}

// Текущая дата

const dateElement = document.querySelector('#admin-info__current-date')

const currentDate = new Date();

const formattedDate = currentDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
})

dateElement.textContent = formattedDate;


// Получение элементов
const customSelectButton = document.querySelector('#top-select-trigger');
const customSelectList = document.getElementById('custom-select-list');
const customSelectItems = customSelectList.querySelectorAll('div');
const titleOne = document.querySelector('.custom-select__selected-0')
const titleTwo = document.querySelector('.custom-select__selected')
const arrowIconSelect = document.querySelector('.custom-select .select-icons__arrow')
const textMini = customSelectButton.querySelector('.custom-select-placeholder');

// Открытие/закрытие выпадающего списка
customSelectButton.addEventListener('click', () => {
    customSelectButton.parentElement.classList.toggle('open');

    titleOne.classList.toggle('visually-hidden')
    titleTwo.classList.toggle('visually-hidden')

    arrowIconSelect.classList.toggle('select-icons__arrow--open')

    if ( customSelectButton.parentElement.classList.contains('open')) {
        textMini.style.display = 'block'
        customSelectButton.style.alignItems = 'center'
        document.getElementById('overlay').style.display = 'block';
        document.body.classList.add('modal-open');
        customSelectButton.parentElement.style.zIndex = '10';
    } else {

        if (!document.querySelector('.custom-select__selected-0').classList.contains('custom-select__selected-0--black')) {
            customSelectButton.querySelector('.custom-select-placeholder').style.display = 'none'
            textMini.style.display = 'none'
            customSelectButton.style.alignItems = 'center'
        } else {
            customSelectButton.style.alignItems = 'baseline'
        }
        document.getElementById('overlay').style.display = 'none';
        document.body.classList.remove('modal-open');
        customSelectButton.parentElement.style.zIndex = '1';
    }
});

// Обработка выбора элемента списка
customSelectItems.forEach(item => {
    item.addEventListener('click', () => {
        customSelectButton.querySelector('.custom-select__selected-0').textContent = item.textContent;
        customSelectButton.parentElement.classList.remove('open');
        customSelectButton.parentElement.style.zIndex = '1';
        arrowIconSelect.classList.toggle('select-icons__arrow--open')
        titleOne.classList.toggle('visually-hidden')
        titleTwo.classList.toggle('visually-hidden')
        document.getElementById('overlay').style.display = 'none';
        document.body.classList.remove('modal-open');
    });
});
/*
// Закрытие выпадающего списка при клике вне его
document.addEventListener('click', (e) => {

    if (customSelectButton.parentElement.classList.contains('open')) {
        if (!customSelectButton.contains(e.target)) {
            customSelectButton.parentElement.classList.remove('open');
            titleOne.classList.toggle('visually-hidden')
            titleTwo.classList.toggle('visually-hidden')
            customSelectButton.parentElement.style.zIndex = '1';
            arrowIconSelect.classList.toggle('select-icons__arrow--open')

            if (customSelectButton.querySelector('.custom-select__selected-0').textContent === 'Тип организации') {
                console.log(customSelectButton.querySelector('.custom-select__selected-0').textContent === 'Тип организации')
                customSelectButton.querySelector('.custom-select-placeholder').style.display = 'none'
            }

            document.getElementById('overlay').style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    }
})*/

// Функция для закрытия модальных окон
function closeModals(evt) {
    const popups = document.querySelectorAll('.popup-form');

    // Проверяем, был ли клик на кнопке открытия модального окна
    if (evt.target.closest('.popup-form-open')) {
        return; // Если клик был на кнопке, выходим из функции
    }

    if (customSelectButton.parentElement.classList.contains('open')) {

        if (!customSelectButton.contains(evt.target)) {
            if (!document.querySelector('.custom-select__selected-0').classList.contains('custom-select__selected-0--black')) {
                customSelectButton.querySelector('.custom-select-placeholder').style.display = 'none'
                customSelectButton.style.alignItems = 'center'
            } else {
                customSelectButton.style.alignItems = 'baseline'
            }
            customSelectButton.parentElement.classList.remove('open');
            titleOne.classList.toggle('visually-hidden')
            titleTwo.classList.toggle('visually-hidden')
            customSelectButton.parentElement.style.zIndex = '1';
            arrowIconSelect.classList.toggle('select-icons__arrow--open')

            document.getElementById('overlay').style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    } else {
        // Проверяем каждый модальный элемент
        popups.forEach(popup => {
            // Проверяем, был ли клик вне модального окна
            if (!popup.classList.contains('popup-form--closed') && !popup.contains(event.target)) {
                popup.classList.add('popup-form--closed') // Закрываем модальное окно
                document.getElementById('overlay').style.display = 'none'; // Закрываем оверлей, если есть
                document.body.classList.remove('modal-open'); // Убираем класс из body
            }
        });
    }
}

// Добавляем обработчик события для клика на документ
document.addEventListener('click', closeModals);




// Сохранение позиции прокрутки и курсора в LocalStorage
window.addEventListener('beforeunload', () => {
    // Сохраняем текущие координаты прокрутки
    localStorage.setItem('scrollPosition', JSON.stringify({
        x: window.scrollX,
        y: window.scrollY
    }));

    // Сохраняем последнюю позицию курсора
    document.addEventListener('mousemove', (e) => {
        localStorage.setItem('mousePosition', JSON.stringify({
            x: e.clientX,
            y: e.clientY
        }));
    });
});

// Восстановление позиции прокрутки и курсора при загрузке страницы
window.addEventListener('load', () => {
    // Восстанавливаем положение прокрутки
    const scrollPosition = JSON.parse(localStorage.getItem('scrollPosition'));
    if (scrollPosition) {
        window.scrollTo(scrollPosition.x, scrollPosition.y);
    }

    // Восстанавливаем позицию курсора
    const mousePosition = JSON.parse(localStorage.getItem('mousePosition'));
    if (mousePosition) {
        const cursorDiv = document.createElement('div');
        cursorDiv.style.position = 'absolute';
        cursorDiv.style.top = mousePosition.y + 'px';
        cursorDiv.style.left = mousePosition.x + 'px';
        cursorDiv.style.width = '5px';
        cursorDiv.style.height = '5px';
        cursorDiv.style.backgroundColor = 'transparent';
        cursorDiv.style.borderRadius = '50%';
        cursorDiv.style.pointerEvents = 'none';
        document.body.appendChild(cursorDiv);

        // Убираем отображение курсора через несколько секунд
        setTimeout(() => {
            cursorDiv.remove();
        }, 3000);
    }
});


// Сортировка по клику на название колонки

document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('table');
    const headers = table.querySelectorAll('#table-title th');

    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            // Передаем индекс с учетом скрытого столбца
            const currentIndex = index + 1; // из-за скрытого столбца (для мобилки)
            sortTable(currentIndex, header);
        });
    });

    function sortTable(columnIndex, header) {
        const rowsArray = Array.from(table.querySelectorAll('tbody tr'));

        const isNumberColumn = columnIndex === 2; // Числовая колонка с индексом 2

        const isAscending = header.classList.contains('asc');

        rowsArray.sort((a, b) => {
            // Выбираем только текст из спана с классом data-item__content
            const cellA = a.cells[columnIndex]?.querySelector('.data-item__content')?.textContent.trim() || '';
            const cellB = b.cells[columnIndex]?.querySelector('.data-item__content')?.textContent.trim() || '';

            let comparison = 0;

            if (isNumberColumn) {
                // Преобразуем строки в числа
                const numA = parseFloat(cellA.replace(/[^\d.-]/g, '')); // Удаляем все буквы, оставляя только числа
                const numB = parseFloat(cellB.replace(/[^\d.-]/g, ''));

                // Проверка на NaN и сортировка
                if (isNaN(numA)) return 1;  // Помещаем NaN в конец
                if (isNaN(numB)) return -1; // Помещаем NaN в конец

                comparison = numA - numB;
            } else {
                // Сравнение строк (регистронезависимое)
                comparison = cellA.toLowerCase().localeCompare(cellB.toLowerCase());
            }

            return isAscending ? comparison : -comparison;
        });

        // Переключаем направление сортировки
        if (isAscending) {
            header.classList.remove('asc');
            header.classList.add('desc');
        } else {
            header.classList.remove('desc');
            header.classList.add('asc');
        }

        // Обновляем таблицу отсортированными строками
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
        rowsArray.forEach(row => tbody.appendChild(row));
    }
});


// Импорт

document.getElementById('import-popup').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        // Тут будет логика для обработки файла .xlsx
    }
});

function syncInputs(sourceId, targetId) {
    const sourceInput = document.getElementById(sourceId);
    const targetInput = document.getElementById(targetId);

    // Обновляем значение в целевом инпуте
    targetInput.value = sourceInput.value;
}




