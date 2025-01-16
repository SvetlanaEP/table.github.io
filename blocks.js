class App {
    constructor(params) {
        this.searchForm = document.querySelector('#search-input');
        this.label = document.querySelector('#label-for-search-input');
        this.params = params;
        this.clearButton = document.querySelector('#clear-button');
        this.hintsContainer = document.querySelector('#hints-container');
        this.hintsBlock = document.querySelector('#hints');
        this.resultsBlock = document.querySelector('#results-block');
        this.resultsBlock.style.display = 'none';        
        this.searchForm.addEventListener('keypress', event => {
            if (event.keyCode === 13) {
                const value = this.searchForm.value;
                const results = this.handleSearch(value);
                this.showResults(results[0]);
            }
        });
        this.removePlaceholderOnFocus();
        this.handleInput();
        this.setActiveTab('applicantsTab');
        this.setActionsForTabButtons();
        this.addEditing();
    }

    setActiveTab(tab) {
        this.activeTab = tab;
        this.showPlaceholder(this.params.tabs[this.activeTab].label);
    
        if (this.activeTab == 'educationalInstitutionsTab') {
            this.addRadioForEducationTab();
        } else {
            this.hideRadioButton();
        }
    }

    addRadioForEducationTab() {
        const wrapper = document.querySelector('#tab-button-wrapper');
        wrapper.style.display = 'flex';
        
        const value1 = document.querySelector('#radio-val-1');
        value1.addEventListener('click', () => {
            value1.classList.add('tab-radio-value-active');
            value2.classList.remove('tab-radio-value-active');
            wrapper.setAttribute('activeValue', '1');
            
            this.showPlaceholder(this.params.tabs[this.activeTab].label);
            this.searchForm.value = '';
            this.hideClearButton();
            this.clearHints();
            this.hideResults();
        })

        const value2 = document.querySelector('#radio-val-2');
        value2.addEventListener('click', () => {
            value2.classList.add('tab-radio-value-active');
            value1.classList.remove('tab-radio-value-active');
            wrapper.setAttribute('activeValue', '2');
            
            this.showPlaceholder(this.params.tabs[this.activeTab].label);
            this.searchForm.value = '';
            this.hideClearButton();
            this.clearHints();
            this.hideResults();
        })
    }

    hideRadioButton() {
        const wrapper = document.querySelector('#tab-button-wrapper');
        wrapper.style.display = 'none';
    }

    removePlaceholderOnFocus() {
        this.searchForm.addEventListener('focus', () => {
            this.searchForm.removeAttribute('placeholder');
            this.showLabel(this.params.tabs[this.activeTab].label);
        });
    
        this.searchForm.addEventListener('blur', () => {
            if (this.searchForm.value == '') {
                this.showPlaceholder(this.params.tabs[this.activeTab].label);
                this.showLabel('');
            }
        });
    }

    handleInput() {
        this.searchForm.addEventListener('input', () => {
            const value = this.searchForm.value;

            this.clearHints();

            if (value.length > 0) {
                this.showLabel(this.params.tabs[this.activeTab].label);
                const results = this.handleSearch(value);
                this.showHints(results, value);
                this.showClearButton();
            } else if (this.resultsBlock.style.display === 'none') {
                
                this.hideClearButton();
            }
        });
    }

    showLabel(label) {
        if (typeof label != 'string') {
            const tab = this.getRadioButtonValue();

            if (tab == 1) {
                label = label['schoolTab'];
            } else if (tab == 2) {
                label = label['collegeTab'];
            }
        }

        this.label.innerHTML = label;
        this.searchBlock = document.querySelector('.search-block');

        if (label = '') {
            this.searchBlock.style.height = '2px';
        } else {
            this.searchBlock.style.height = 'auto';
        }
    }

    showPlaceholder(placeholder) {
        if (typeof placeholder == 'string') {
            this.searchForm.placeholder = placeholder;
        } else {
            const tab = this.getRadioButtonValue();

            if (tab == 1) {
                this.searchForm.placeholder = placeholder['schoolTab'];
            } else if (tab == 2) {
                this.searchForm.placeholder = placeholder['collegeTab'];
            }
        }
    }

    getRadioButtonValue() {
        const wrapper = document.querySelector('#tab-button-wrapper');
        return wrapper.getAttribute('activeValue');
    }

    handleSearch(value, array) {
        let data = this.params.tabs[this.activeTab].data;

        if (typeof data.twoTabsArray !== 'undefined') {
            const tab = this.getRadioButtonValue();

            if (tab == 1) {
                data = this.params.tabs[this.activeTab].data['schoolTab'];
            } else {
                data = this.params.tabs[this.activeTab].data['collegeTab'];
            }
        }

        return this.params.tabs[this.activeTab].handleSearch(value, data);
    }

    showHints(hints, value) { 
        const maxHints = this.params.tabs[this.activeTab].maxHints;

        if(!hints.multiHint) {
            hints.slice(0, maxHints).forEach((hint, index) => {
                const hintCard = this.params.tabs[this.activeTab].getHint(hint, index, value, this);
    
                if (this.checkIsHintHaveBlueText(hintCard) && typeof hintCard.hiden == 'undefined' ) {
                    this.hintsContainer.appendChild(hintCard);
                    this.hintsBlock.style.display = 'block';
                }
            })
        } else {
            hints.array.slice(0, maxHints).forEach((hint, index) => {
                const hintCard = this.params.tabs[this.activeTab].getHint(hint, index, value, this);
                
                hintCard.forEach(hint => {
                    if (this.checkIsHintHaveBlueText(hint) && typeof hintCard.hiden == 'undefined' ) {
                        this.hintsContainer.appendChild(hint);
                        this.hintsBlock.style.display = 'block';
                    }
                })
            })
        }
    }

    checkIsHintHaveBlueText(hint) {
        const spans = hint.querySelectorAll('.hint-color-text');
        let finded = false;

        spans.forEach(span => {
            if (span.outerText !== '') {
                finded = true;
            }
        })

        // temp for debug
        return true;

        return finded;
    }

    clearHints() {
        this.hintsContainer.innerHTML = '';
        this.hintsBlock.style.display = 'none';
    }

    showClearButton() {
        this.clearButton.style.display = 'block';
        this.clearButton.addEventListener('click', () => {
            this.searchForm.value = '';
            this.showLabel('');
            this.hideClearButton();
            this.clearHints();
            this.hideResults();

            this.showPlaceholder(this.params.tabs[this.activeTab].label);
            this.showLabel('');
        });
    }
    
    hideClearButton() {
        this.clearButton.style.display = 'none';
    }

    showResults(result) {
        const resultsHTML = this.params.tabs[this.activeTab].resultsBlock(result);
        this.resultsBlock.innerHTML = resultsHTML;

        this.resultsBlock.style.display = 'block';
        this.clearHints();

        this.addResultItemsRemoving();
        this.addEditing();
    }

    hideResults() {
        this.resultsBlock.style.display = 'none';
    }

    addResultItemsRemoving() {
        document.querySelectorAll('.close-button').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                this.closest('.result-item').remove();
            });
        });
    }

    addEditing() {
        // for applicants tab
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function handleEditButtonClick() {
                const parentCard = this.closest('.results-search-card');
                const wrapper = parentCard.querySelector('.results-input-wrapper');
                const label = wrapper.querySelector('label');
        
                wrapper.classList.add('edit-active');
    
                const inputs = wrapper.querySelectorAll('input');
                const textareas = wrapper.querySelectorAll('textarea');
    
                inputs.forEach(input => allowEdit(input));
                textareas.forEach(input => allowEdit(input));

                button.removeEventListener('click', handleEditButtonClick);
                button.addEventListener('click', function handleEmptyClick() {
                    button.addEventListener('click', handleEditButtonClick);
                    button.removeEventListener('click', handleEmptyClick);
                });
    
                function allowEdit(element) {
                    if (element.display !== 'none') {
                        element.removeAttribute('disabled');
                        element.focus();
    
                        element.addEventListener('blur', () => disableEdit(element));
                        element.addEventListener('keypress', (e) => {
                            if (e.key === 'Enter') {
                                disableEdit(element)
                            }
                        });
                        
                        hideLabelAndSetPlaceholder();

                        element.addEventListener('input', () => {
                            if (element.value > 0) {
                                hideLabel(element);
                            } else {
                                showLabel(element);
                            }
                        })
                    }
                }
    
                function disableEdit(element) {
                    wrapper.classList.remove('edit-active');
                    element.setAttribute('disabled', 'true');
                    showLabelAndReturnPlaceholder();
                    showLabel(element);
                }

                function hideLabelAndSetPlaceholder() {
                    inputs.forEach(input => hideLabel(input));
                    textareas.forEach(input => hideLabel(input));
                }

                function showLabelAndReturnPlaceholder() {
                    inputs.forEach(input => showLabel(input));
                    textareas.forEach(input => showLabel(input));
                }

                function hideLabel(input) {
                    if (input.display !== 'none' && (input.placeholder === '_' || input.placeholder === '-')) {
                        label.style.color = 'transparent';
                        input.style.position = 'relative';
                        input.style.bottom = `${label.offsetHeight / 2}px`;

                        input.placeholder = label.innerHTML;
                        input.hidenPlaceholder = "_";
                    }
                    input.hidenPlaceholder = input.placeholder !== label.innerHTML ? input.placeholder : input.hidenPlaceholder;
                }

                function showLabel(input, placeholder = false) {
                    if (input.display !== 'none') {
                        label.style.color = '#9F9F9F';
                        input.style.position = '';

                        if (placeholder) {
                            input.placeholder = placeholder;
                        } else {
                            input.placeholder = input.hidenPlaceholder;
                        }
                    }
                }
            });
        });

        // for other tabs
        document.querySelectorAll('.block-edit-button').forEach(button => {
            button.addEventListener('click', () => {
                const parentCard = button.parentNode;
                const textForEdit = parentCard.querySelector('p');
                
                textForEdit.setAttribute('contenteditable', true);
                textForEdit.focus();

                textForEdit.addEventListener('blur', () => {
                    textForEdit.removeAttribute('contenteditable');
                })

                // textForEdit.style.maxWidth = textForEdit.offsetWidth > 150 ? textForEdit.offsetWidth + 'px' : '150px';

                const range = document.createRange();
                range.selectNodeContents(textForEdit);
                range.collapse(false);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            });
        });
        // for tables
        document.querySelectorAll('.table-edit-button').forEach(button => {
            button.addEventListener('click', () => {
                let parentTh;

                if (button.hasAttribute('forCell')) {
                    parentTh = document.querySelector(`#${button.getAttribute('forCell')}`);
                } else {
                    parentTh = button.parentNode;
                }
                
                let textForEdit;
                
                textForEdit = parentTh.querySelector('p');

                /* if (this.activeTab == 'branchesTab') {

                    
                } else {
                    textForEdit = parentTh.childNodes[0];
                }
                */

                textForEdit.contentEditable = true;

                const moveCursorToEnd = () => {
                    const range = document.createRange();
                    range.selectNodeContents(textForEdit);
                    range.collapse(false);
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                };

                textForEdit.focus();
                moveCursorToEnd();

                textForEdit.addEventListener('blur', () => {
                    textForEdit.contentEditable = false;
                });
                
                textForEdit.style.maxWidth = '-webkit-fill-available';
                textForEdit.style.wordWrap = 'break-word';
                textForEdit.style.overflow = 'hiden';
                textForEdit.style.outline = 'none';
                    /* const spanElement = document.createElement('span');
                    spanElement.textContent = textForEdit.textContent;
                    spanElement.style.outline = 'none';
            
                    parentTh.replaceChild(spanElement, textForEdit);
            
                    spanElement.contentEditable = true;
            
                    const moveCursorToEnd = () => {
                        const range = document.createRange();
                        range.selectNodeContents(spanElement);
                        range.collapse(false);
                        const selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                    };
            
                    spanElement.focus();
                    moveCursorToEnd();
            
                    spanElement.addEventListener('blur', () => {
                        spanElement.contentEditable = false;
                        parentTh.replaceChild(textForEdit, spanElement);
                    }); */
            
            });
        });
    }
    
    setActionsForTabButtons() {
        // set action for all tabs
        for (let key in this.params.tabs) {
            const button = document.querySelector(`#${key}`);

            button.addEventListener('click', () => {

                if (key !== this.params.tab) {
                    this.activeButton.classList.remove('third-panel__tab_active');
                }

                this.setActiveTab(key);
                button.classList.add('third-panel__tab_active');


                

                this.activeButton = button;

                this.searchForm.value = '';
                this.showLabel('');
                this.hideClearButton();
                this.clearHints();
                this.hideResults();
            });
        }

        // set active tab
        const button = document.querySelector(`#${this.activeTab}`);
        button.classList.add('third-panel__tab_active');
        this.activeButton = button;
    }
}

class HeaderScroll {
    constructor() {
        document.addEventListener('DOMContentLoaded', function () {
            const buttonScrollLeft = document.querySelector('#scrollLeft');
            const buttonScrollRight = document.querySelector('#scrollRight');
            const searchContainer = document.querySelector('#searchContainer');
            
            const searchContainerWidth = searchContainer.clientWidth;

            buttonScrollLeft.addEventListener('click', function () {
                searchContainer.scrollBy({ left: -searchContainerWidth, behavior: 'smooth' });
            });

            buttonScrollRight.addEventListener('click', function () {
                searchContainer.scrollBy({ left: searchContainerWidth, behavior: 'smooth' });
            });

            

            function handleScroll() {
                if (searchContainer.scrollLeft > 0) {
                    buttonScrollLeft.classList.add('scroll-button-active');
                } else {
                    buttonScrollLeft.classList.remove('scroll-button-active');
                }
        
                if (searchContainer.scrollLeft < searchContainer.scrollWidth - searchContainer.clientWidth) {
                    buttonScrollRight.classList.add('scroll-button-active');
                } else {
                    buttonScrollRight.classList.remove('scroll-button-active');
                }
            }

            handleScroll();

            searchContainer.addEventListener('scroll', handleScroll);
        });
    }
}

const params = {
    tabs: {
        vacanciesTab: {
            resultsBlock: function(result) {
                return `
                <div class="results-vacation">
                    <p class="results-label">Выбранная запись</p>
                    <div class="results-editable-block">
                        <p class="results-editable-text-bold">${result.name ? result.name : '_'}</p>
                        <div class="block-edit-button"></div>
                    </div>
                    <p class="results-id">${result.id ? result.id : '_'}</p>
                </div>
                `;
            },
            getHint(hint, index, value, self) {
                const name = hint.name;

                const titleWithColor = getHintTitleWithColor(name, value);

                const hintCard = document.createElement('div');
                hintCard.classList.add('hint-card');
                hintCard.classList.add('hint-card-one-line');
                hintCard.classList.add('vacanciesTab');
                hintCard.innerHTML = `
                    <h3 class="hint-title"><span class="hint-color-text">${titleWithColor}</span></h3>
                `;
                hintCard.addEventListener('click', () => {
                    const results = self.handleSearch(value, self.params.data);
                    self.showResults(results[index]);
                    setValueOnClick(results[index])
                });

                function setValueOnClick(hint) {
                    const searchForm = document.querySelector('#search-input');
                    searchForm.value = hint.name;
                }

                function getHintTitleWithColor(full, value) {
                    const matches = findMatches(full, value);
                    let result = '';
    
                    for (let i = 0; i < full.length; i++) {
                        if (i === matches) {
                            result += `</span>`;
                        }
                        result += full[i]
                    }
    
                    function findMatches(str1, str2) {
                        let n = 0;
                        const minLength = Math.min(str1.length, str2.length);
                        
                        for (let i = 0; i < minLength; i++) {
                            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                                n += 1;
                            } else {
                                break;
                            }
                        }
                        
                        return n;
                    }
    
                    return result;
                }

                return hintCard;
            },
            handleSearch: function(value, array) {
                const results = [];
    
                array.forEach((obj) => {
                    const objName = obj.name;
                    if (objName.toLowerCase().includes(value.toLowerCase())) {
                        results.push(obj);
                    }
                });
                
                return results;
            },
            data: [
                {
                    name: 'Грузчик',
                    id: 21
                },
                {
                    name: 'Грузчик-комплектовщик',
                    id: 22
                },
                {
                    name: 'Грузчик-мерчендайзер',
                    id: 23
                },
                {
                    name: 'Грузчик на склад',
                    id: 24
                },
                {
                    name: 'Грузчик на вахту',
                    id: 25
                },
                {
                    name: 'Грузчик на производство',
                    id: 26
                },
                {
                    name: 'Грузчик-разнорабочий',
                    id: 27
                },
                {
                    name: 'Грузчик-сборщик',
                    id: 28
                },
                {
                    name: 'Грузчик-упаковщик',
                    id: 29
                },
                {
                    name: 'Грузчик-экспедитор',
                    id: 30
                }
            ],
            label: 'Вакансия',
            maxHints: 10,
        },
        applicantsTab: {
            resultsBlock: function(result) {
                return `
                <h3 class="results-title">${result.id && result.personalData.phone ? 'ID ' + result.id : ''}</h3>
                <div class="results-row">
                    <div class="results-col">
                        <h3 class="results-col-title">Личные данные</h3>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Фамилия, имя и отчество</label>
                                <textarea disabled type="text" id="results-input" class="results-input only-mobile" placeholder="${result.personalData.fullname ? result.personalData.fullname : '_'}"></textarea>
                                <input disabled type="text" id="results-input" class="results-input only-desktop" placeholder="${result.personalData.fullname ? result.personalData.fullname : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Пол</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.personalData.gender ? result.personalData.gender : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Мобильный телефон</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.personalData.phone ? result.personalData.phone : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">E-mail</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.personalData.email ? result.personalData.email : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Статус</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.personalData.status ? result.personalData.status : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Дата рождения</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.personalData.dateOfBirth ? result.personalData.dateOfBirth : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Знак зодиака</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.personalData.zodiacSign ? result.personalData.zodiacSign : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Возраст</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.personalData.age ? result.personalData.age : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Семейное положение</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.personalData.maritalStatus ? result.personalData.maritalStatus : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Наличие детей</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.personalData.haveKids ? result.personalData.haveKids : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                    </div>
                    <div class="results-col">
                        <h3 class="results-col-title">Место проживания</h3>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Регион</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.placeOfResidence.region ? result.placeOfResidence.region : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Населенный пункт</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.placeOfResidence.city ? result.placeOfResidence.city : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Улица</label>
                                <textarea disabled type="text" id="results-input" class="results-input only-mobile" placeholder="${result.placeOfResidence.street ? result.placeOfResidence.street : '_'}"></textarea>
                                <input disabled type="text" id="results-input" class="results-input only-desktop" placeholder="${result.placeOfResidence.street ? result.placeOfResidence.street : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Дом</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.placeOfResidence.house ? result.placeOfResidence.house : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Корпус</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.placeOfResidence.corpse ? result.placeOfResidence.corpse : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Строение</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.placeOfResidence.building ? result.placeOfResidence.building : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Район</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.placeOfResidence.area ? result.placeOfResidence.area : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
        
                        <h3 class="results-col-title results-nationality">Гражданство</h3>
                        <div class="results-items">
                            ${result.nationality ? result.nationality.map((nation, index) => `
                                <p class="result-item">
                                    ${nation}
                                    <img src="assets/icons/fixed_icons/close.svg" alt="close-button" class="close-button" data-index="${index}">
                                </p>
                            `).join('') : ``}
                        </div>
                    </div>
                </div>
                <div class="results-row">
                    <div class="results-col">
                        <h3 class="results-col-title">Образование в школе, гимназии</h3>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Город обучения в школе, гимназии</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.schoolEducation.city ? result.schoolEducation.city : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper results-input-moretext">
                                <label for="results-input">Номер и название школы</label>
                                <textarea disabled class="results-input only-desktop" name="" id="" cols="30" rows="${result.schoolEducation.nuberAndNameOfSchool ? 2 : 1}" placeholder="${result.schoolEducation.nuberAndNameOfSchool ? result.schoolEducation.nuberAndNameOfSchool : '_'}"></textarea>
                                <textarea disabled class="results-input only-mobile" name="" id="" cols="30" rows="${result.schoolEducation.nuberAndNameOfSchool ? 3 : 1}" placeholder="${result.schoolEducation.nuberAndNameOfSchool ? result.schoolEducation.nuberAndNameOfSchool : '_'}"></textarea>
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Наличие медали</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.schoolEducation.medal ? result.schoolEducation.medal : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <p class="inpup-label">Период обучения</p>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Начало</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.schoolEducation.educationStartion ? result.schoolEducation.educationStartion : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Окончание</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.schoolEducation.educationEnding ? result.schoolEducation.educationEnding : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
        
                    </div>
                    <div class="results-col only-desktop"></div>
                </div>
                <div class="results-row">
                    <div class="results-col">
                        <h3 class="results-col-title">Средне-специальное образование</h3>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Город обучения</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.SecondaryVocationalEducation.city ? result.SecondaryVocationalEducation.city : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card results-input-moretext">
                            <div class="results-input-wrapper">
                                <label for="results-input">Название учебного заведения</label>
                                <textarea disabled class="results-input bigger-than641 dont-show-on-mobile" name="" id="secEducName" cols="30" rows="${result.SecondaryVocationalEducation.nameOfInstitution ? 4 : 1}" placeholder="${result.SecondaryVocationalEducation.nameOfInstitution ? result.SecondaryVocationalEducation.nameOfInstitution : '_'}"></textarea>
                                <textarea disabled class="results-input smaller-than641 dont-show-on-mobile" name="" id="secEducName" cols="30" rows="${result.SecondaryVocationalEducation.nameOfInstitution ? 3 : 1}" placeholder="${result.SecondaryVocationalEducation.nameOfInstitution ? result.SecondaryVocationalEducation.nameOfInstitution : '_'}"></textarea>
                                <textarea disabled class="results-input only-mobile" name="" id="secEducName" cols="30" rows="${result.SecondaryVocationalEducation.nameOfInstitution ? 5 : 1}" placeholder="${result.SecondaryVocationalEducation.nameOfInstitution ? result.SecondaryVocationalEducation.nameOfInstitution : '_'}"></textarea>
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Классификация</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.SecondaryVocationalEducation.classification ? result.SecondaryVocationalEducation.classification : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card results-input-moretext">
                            <div class="results-input-wrapper">
                                <label for="results-input">Специальность для классификации</label>
                                <input disabled type="text" id="results-input" class="results-input ${result.SecondaryVocationalEducation.secialty ? 'input-moretext' : ''} only-desktop" placeholder="${result.SecondaryVocationalEducation.secialty ? result.SecondaryVocationalEducation.secialty : '_'}">
                                <textarea disabled type="text" id="results-input" class="results-input ${result.SecondaryVocationalEducation.secialty ? 'input-moretext' : ''} only-mobile" placeholder="${result.SecondaryVocationalEducation.secialty ? result.SecondaryVocationalEducation.secialty : '_'}"></textarea>
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Направление</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.SecondaryVocationalEducation.direction ? result.SecondaryVocationalEducation.direction : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Форма обучения</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.SecondaryVocationalEducation.formOfEducation ? result.SecondaryVocationalEducation.formOfEducation : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Наличие красного диплома</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.SecondaryVocationalEducation.directionOfRedDiploma ? result.SecondaryVocationalEducation.directionOfRedDiploma : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <p class="inpup-label">Период обучения</p>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Начало</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.SecondaryVocationalEducation.sducationStartion ? result.SecondaryVocationalEducation.sducationStartion : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Окончание</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.SecondaryVocationalEducation.Окончание ? result.SecondaryVocationalEducation.Окончание : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                    </div>
                    <div class="results-col">
                        <h3 class="results-col-title">Высшее-профессиональное образование</h3>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Город обучения</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.higherProfessionalEducation.city ? result.higherProfessionalEducation.city : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card results-input-moretext">
                            <div class="results-input-wrapper results-input-moretext2">
                                <label for="results-input">Название учебного заведения</label>
                                <textarea disabled class="results-input" name="" id="highProfEducName" cols="30" rows="${result.higherProfessionalEducation.nameOfInstitution ? 4 : 1}" placeholder="${result.higherProfessionalEducation.nameOfInstitution ? result.higherProfessionalEducation.nameOfInstitution : '_'}"></textarea>
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Классификация</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.higherProfessionalEducation.classification ? result.higherProfessionalEducation.classification : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper results-input-moretext">
                                <label for="results-input">Специальность для классификации</label>
                                <input disabled type="text" id="results-input" class="results-input ${result.SecondaryVocationalEducation.secialty ? 'input-moretext' : ''} only-desktop" placeholder="${result.higherProfessionalEducation.secialty ? result.higherProfessionalEducation.secialty : '_'}">
                                <textarea disabled type="text" id="results-input" class="results-input ${result.SecondaryVocationalEducation.secialty ? 'input-moretext' : ''} only-mobile" placeholder="${result.higherProfessionalEducation.secialty ? result.higherProfessionalEducation.secialty : '_'}"></textarea>
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Направление</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.higherProfessionalEducation.direction ? result.higherProfessionalEducation.direction : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Форма обучения</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.higherProfessionalEducation.formOfEducation ? result.higherProfessionalEducation.formOfEducation : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Наличие красного диплома</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.higherProfessionalEducation.directionOfRedDiploma ? result.higherProfessionalEducation.directionOfRedDiploma : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <p class="inpup-label">Период обучения</p>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Начало</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.higherProfessionalEducation.educationStartion ? result.higherProfessionalEducation.educationStartion : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Окончание</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.higherProfessionalEducation.Окончание ? result.higherProfessionalEducation.Окончание : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                    </div>
                </div>
                <div class="results-row">
                    <div class="results-col">
                        <h3 class="results-col-title">Последнее место работы</h3>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Название компании</label>
                                <input disabled type="text" id="results-input" class="results-input only-desktop" placeholder="${result.lastPlaceOfWork.nameOfCompany ? result.lastPlaceOfWork.nameOfCompany : '_'}">
                                <textarea disabled type="text" id="results-input" class="results-input only-mobile" placeholder="${result.lastPlaceOfWork.nameOfCompany ? result.lastPlaceOfWork.nameOfCompany : '_'}"></textarea>
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Должность</label>
                                <input disabled class="results-input" name="" id="" cols="30" rows="4" placeholder="${result.lastPlaceOfWork.position ? result.lastPlaceOfWork.position : '_'}"></input>
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <p class="inpup-label">Начало работы</p>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Месяц</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.lastPlaceOfWork.educationStartionMounth ? result.lastPlaceOfWork.educationStartionMounth : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Год</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.lastPlaceOfWork.educationStartionYear ? result.lastPlaceOfWork.educationStartionYear : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <p class="inpup-label">Конец работы</p>
                        <label class="cr-wrapper results-checkbox">
                            <input type="checkbox" ${result.lastPlaceOfWork.upToThePresent ? 'checked' : ''}/>
                            <div class="cr-input"></div>
                            <span>По настоящее время</span>
                        </label>
        
        
                        <p class="inpup-label">Обязанности</p>
                        <div class="results-items">
                            ${result.lastPlaceOfWork.suties ? result.lastPlaceOfWork.suties.map(duty => `
                                <p class="result-item">
                                    ${duty}
                                    <img src="assets/icons/fixed_icons/close.svg" alt="close-button" class="close-button">
                                </p>
                            `).join('') : ``}
                        </div>
                    </div>
        
        
                    <div class="results-col">
                        <h3 class="results-col-title">Место работы</h3>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Название компании</label>
                                <input disabled type="text" id="results-input" class="results-input only-desktop" placeholder="${result.placeOfWork.nameOfCompany ? result.placeOfWork.nameOfCompany : '_'}">
                                <textarea disabled type="text" id="results-input" class="results-input only-mobile" placeholder="${result.placeOfWork.nameOfCompany ? result.placeOfWork.nameOfCompany : '_'}"></textarea>
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Должность</label>
                                <input disabled class="results-input" name="" id="" cols="30" rows="4" placeholder="${result.placeOfWork.position ? result.placeOfWork.position : '_'}"></input>
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <p class="inpup-label">Начало работы</p>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Месяц</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.placeOfWork.educationStartionMounth ? result.placeOfWork.educationStartionMounth : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Год</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.placeOfWork.educationStartionYear ? result.placeOfWork.educationStartionYear : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <p class="inpup-label">Окончание работы</p>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Месяц</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.placeOfWork.endOfWorkMounth ? result.placeOfWork.endOfWorkMounth : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        <div class="results-search-card">
                            <div class="results-input-wrapper">
                                <label for="results-input">Год</label>
                                <input disabled type="text" id="results-input" class="results-input" placeholder="${result.placeOfWork.endOfWorkYear ? result.placeOfWork.endOfWorkYear : '_'}">
                            </div>
                            <div class="edit-button"></div>
                        </div>
                        
                        <p class="inpup-label">Обязанности</p>
                        <div class="results-items">
                            ${result.placeOfWork.suties ? result.placeOfWork.suties.map(duty => `
                                <p class="result-item">
                                    ${duty}
                                    <img src="assets/icons/fixed_icons/close.svg" alt="close-button" class="close-button">
                                </p>
                            `).join('') : ``}
                        </div>
                    </div>
                </div>
        
                <div class="results-row info-row">
                    <div class="results-col results-fixed-col">
                        <h3 class="results-col-title">Отклики</h3>
                        ${result.responses.length > 0 ? result.responses.map(response => `
                            <div class="results-info">
                                <p contenteditable="true"
                                    onfocus="this.innerHTML = ''"
                                    onblur="if (this.innerHTML == '') {this.innerHTML = '${response}';}"
                                >
                                    ${response}
                                </p>
                            </div>
                        `).join('') : `<div class="results-info">
                                            <p contenteditable="true"
                                                onfocus="this.innerHTML = ''"
                                                onblur="if (this.innerHTML == '') {this.innerHTML = '_';}"
                                            >_</p>
                                        </div>`}
                    </div>
                    <div class="results-col results-fixed-col">
                        <h3 class="results-col-title">История резюме</h3>
                        ${result.resumeHistory.length > 0 ? result.resumeHistory.map(entry => `
                            <div class="results-info">
                                <p contenteditable="true"
                                    onfocus="this.innerHTML = ''"
                                    onblur="if (this.innerHTML == '') {this.innerHTML = '${entry}';}"
                                >
                                    ${entry}
                                </p>
                            </div>
                        `).join('') : `<div class="results-info">
                                            <p contenteditable="true"
                                                onfocus="this.innerHTML = ''"
                                                onblur="if (this.innerHTML == '') {this.innerHTML = '_';}"
                                            >_</p>
                                        </div>`}
                    </div>
                </div>`;
            },
            getHint: function(hint, index, value, self) {
                const fullname = hint.personalData?.fullname || '';
                const phone = hint.personalData?.phone || '';
                const region = hint.placeOfResidence?.region || '';
                const city = hint.placeOfResidence?.city || '';
                const valueArray = separateWords(value);
                let fullNameArray = separateWords(hint.personalData.fullname);
                let isCardMayBeHiden = false;

                hidePatrIfNameNotInputet();
                function hidePatrIfNameNotInputet() {
                    const isSurnameInputed = checkIsSurnameInputed();
                    const isNameInputed = checkIsNameInputed();
                    const isPatrInputed = checkIsPatrInputed();

                    if (!isNameInputed && isPatrInputed) {
                        isCardMayBeHiden = true;
                    }
                }
                function checkIsSurnameInputed() {
                    let res = false;
                    valueArray.forEach(word => {
                        if (checkIncludsFromStart(word, fullNameArray[0])) {
                            res = true;
                        }
                    })
                    return res;
                }
                function checkIsNameInputed() {
                    let res = false;
                    valueArray.forEach(word => {
                        if (checkIncludsFromStart(word, fullNameArray[1])) {
                            res = true;
                        }
                    })
                    return res;
                }
                function checkIsPatrInputed() {
                    let res = false;
                    valueArray.forEach(word => {
                        if (checkIncludsFromStart(word, fullNameArray[2])) {
                            res = true;
                        }
                    })
                    return res;
                }

                fullNameArray = swapNameAndPatr(fullNameArray, valueArray);

                function swapNameAndPatr(array, valueArray) {
                    if (valueArray[1] && array[1] && valueArray[2] && array[2]) {
                        const v1_in_h2 = checkIncludsFromStart(valueArray[0], array[1]);
                        const v2_in_h1 = checkIncludsFromStart(valueArray[1], array[0]);

                        const v1_in_h1 = checkIncludsFromStart(valueArray[0], array[0]);
                        const v2_in_h2 = checkIncludsFromStart(valueArray[1], array[1]);

                        const v3_in_h3 = checkIncludsFromStart(valueArray[2], array[2]);

                        if (v1_in_h2 && v2_in_h1 && !v1_in_h1 && !v2_in_h2) {
                            const buffer = array[0];

                            array[0] = array[1];
                            array[1] = buffer;

                            if (v3_in_h3) {
                                const buffer = array[1];

                                array[1] = array[2];
                                array[2] = buffer;
                            }
                        }

                    }
                    return array;
                }

                let fullName = '';
                let spaceWasIncluded = false;
                let wordsInFullName = 0;
                fullNameArray.forEach((word, index) => {
                    if ((atleastOneWordMatched(word, valueArray)/*  && wordsInHintEquilValue() */) || isPhoneNumIncluded()) {
                        addWordToFullName(word)
                    } else if (value[value.length - 1] == ' ') {
                        if (!spaceWasIncluded) {
                            addWordToFullName(word)
                            spaceWasIncluded = true;
                        }
                    }
                })

                /* fullNameArray.forEach(word => {
                    if (atleastOneWordMatched(word, valueArray)) {
                        fullName += `${word} `;
                    } else if (value[value.length - 1] == ' ') {
                        if (!spaceWasIncluded) {
                            fullName += `${word} `;
                            spaceWasIncluded = true;
                        }
                    } else {
                        fullName += '';
                    }
                }) */

                function addWordToFullName(word) {
                    fullName += `${word} `;
                    wordsInFullName++;
                }

                function wordsInHintEquilValue() {
                    const valueLength = removeEmptyStrings(valueArray).length;
                    const fullNameLength = removeEmptyStrings(separateWords(fullName)).length;
                    
                    return (fullNameLessThanValue() || (fullNameLength > valueLength && value[value.length - 1] !== ' '))
                }

                function fullNameLessThanValue() {
                    const valueLength = removeEmptyStrings(valueArray).length;
                    const fullNameLength = removeEmptyStrings(separateWords(fullName)).length;
                    
                    return (fullNameLength < valueLength)
                }
                
                function isAllThreeKeys() {
                    let result = true;

                    if (isPhoneNumIncluded()) {
                        return true;
                    } 

                    fullNameArray.forEach(key => {
                        if (!(value.toLowerCase().includes(key.toLowerCase()))) {
                            result = false;
                        }
                    })

                    return result;
                }
                
                function isPhoneNumIncluded() {
                    separatedString = removeEmptyStrings(separateWords(value));
                    let res = false;

                    separatedString.forEach(word => {
                        if (
                            // hint.personalData.phone.toLowerCase().includes(word.toLowerCase())
                            searchByPhone(word, hint.personalData.phone)
                        ) {
                            res = true;
                        }
                    })

                    return res;
                }

                function searchByPhone(value, phone) {
                    const onlyNumsValue = getOnlyNums(value);
                    const onlyNumsPhone = getOnlyNums(phone);

                    if (onlyNumsPhone.includes(onlyNumsValue) && onlyNumsValue !== '' && onlyNumsPhone !== '') {
                        return true;
                    } else {
                        return false;
                    }
                }
                function getOnlyNums(str) {
                    let onlyNums = '';
                    const nums = '1234567890'

                    for (let i = 0; i < str.length; i++) {
                        if (nums.includes(str[i])) {
                            onlyNums += str[i];
                        }
                    }

                    return onlyNums;
                }

                const subtitle = `${phone} ${region} город ${city}`;
                
                const hintCard = document.createElement('div');
                hintCard.classList.add('hint-card');
                hintCard.classList.add('applicantsTab');
                hintCard.innerHTML = `
                <h3 class="hint-title">${getHintTitleWithColor(fullName, value)}</h3>
                <p class="hint-subtitle">${(isAllThreeKeys() || isPhoneNumIncluded()) ? subtitle : ''}</p>
                `;
                
                if (isAllThreeKeys() || isPhoneNumIncluded()) {
                    hintCard.addEventListener('click', () => {
                        const results = self.handleSearch(value, self.params.data);
                        self.showResults(results[index]);
                        setValueOnClick(results[index]);
                    });
                }
                

                function setValueOnClick(hint) {
                    const searchForm = document.querySelector('#search-input');
                    searchForm.value = fullName;
                }

                function getHintTitleWithColor(hint, value) {
                    const hintWords = separateWords(hint);
                    const valueWords = separateWords(value);

                    let result = '';

                    hintWords.forEach(hintWord => {
                        let maxMatches = 0;
                        let maxMatchedWord = '';

                        valueWords.forEach(valueWord => {
                            const matchesNum = findMatches(valueWord, hintWord);
                            if (matchesNum > maxMatches) {
                                maxMatchedWord = valueWord;
                                maxMatches = matchesNum;
                            }
                        })

                        result += getPart(maxMatchedWord, hintWord) + ' ';
                    })
                    
                    function getPart(str1, str2) {
                        if (checkIncludsFromStart(str1, str2)) {
                            const except = '”“\"'

                            let result = '';
                            const matches = findMatches(str1, str2);

                            result += '<span class="hint-color-text">';
                            let spanClosed = false;
                            for (let i = 0; i < str2.length; i++) {
                                if (i >= matches) {
                                    result += `</span>`;
                                    spanClosed = true;
                                }
                                result += str2[i];
                            }

                            if (!spanClosed) {
                                result += `</span>`;
                            }

                            return result
                        } else {
                            return str2;
                        }
                    }

                    getPart(hint, value)
    
                    function findMatches(str1, str2) {
                        let n = 0;
                        const minLength = Math.min(str1.length, str2.length);
                        
                        for (let i = 0; i < minLength; i++) {
                            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                                n += 1;
                            } else {
                                break;
                            }
                        }
                        
                        return n;
                    }
                    function separateWords(str) {
                        try {
                            return str.split(" ");
                        } catch(e) {
                            console.log(`Error separating string: ${str}\nError: ${e}`)
                        }
                    }
                    
                    return result;
                }

                function checkIncludsFromStart(str1, str2) {
                    // str1 - value str2 - hint
                    const max = str1.length;
                    let result = true;

                    for(let i = 0; i < max; i++) {
                        if (String(str1[i]).toLowerCase() !== String(str2[i]).toLowerCase()) {
                            result = false;
                        }
                    }
                    return result;
                }

                function findMatches(str1, str2) {
                    let n = 0;
                    const minLength = Math.min(str1.length, str2.length);
                    
                    for (let i = 0; i < minLength; i++) {
                        if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                            n += 1;
                            console.log(str1, str2, n)
                        } else {
                            break;
                        }
                    }
                    
                    return n;
                }

                function separateWords(str) {
                    return str.split(" ");
                }

                function atleastOneWordMatched(value, valueArray) {
                    try {
                        let res = false;

                        valueArray.forEach(word => {
                            if (word.toLowerCase()) {
                                // if (word[0].toLowerCase() == value[0].toLowerCase()) {
                                if (checkIncludsFromStart(word, value)) {
                                    res = true;
                                }
                            }
                        }) 

                        return res;
                    } catch(e) {
                        console.log(`Error in atleastOneWordMatched!\nArgs: 1(${value}) 2(${valueArray})\nError text: ${e}`)
                        return false;
                    }
                }

                function removeEmptyStrings(array) {
                    return array.filter(item => item.trim() !== "");
                }

                hideHintsIfWordInputed();

                function isWordInFName(word, fname) {
                    let res = false;
                    fname.forEach(name => {
                        if (name.toLowerCase().includes(word.toLowerCase())) {
                            res = true;
                        }
                    })
                    return res;
                }
                function checkIsFullWordInputed(word, fname) {
                    let res = false;
                    fname.forEach(name => {
                        if (name.toLowerCase() == word.toLowerCase()) {
                            res = true;
                        }
                    })
                    return res;
                }
                function hideHintsIfWordInputed() {
                    const allWords = removeEmptyStrings(valueArray).length;
                    let fullInputedWords = 0;

                    valueArray.forEach(valWord => {
                        const wordIsNotAPhone = isWordInFName(valWord, fullNameArray);
                        const isFullWordInputed = checkIsFullWordInputed(valWord, fullNameArray);

                        if (wordIsNotAPhone && isFullWordInputed) {
                            fullInputedWords++;
                        }
                    })

                    if (allWords == fullInputedWords && value[value.length - 1] !== ' ' && !(checkIsSurnameInputed() && checkIsNameInputed() && checkIsPatrInputed())) {

                        hintCard.hiden = true;
                    }
                }

                if (isCardMayBeHiden) {
                    hintCard.hiden = true;
                }

                return hintCard;
                
            },
            handleSearch: function(value, array) {
                const results = [];
                
                array.forEach((obj) => {
                    separatedString = separateWords(value);
                    let everyWord = true;

                    separatedString.forEach(word => {
                        if (
                            checkIncludsFullName(word, obj.personalData.fullname) ||
                            // String(obj.personalData.fullname).toLowerCase().includes(String(word).toLowerCase()) ||

                            // obj.personalData.phone.toLowerCase().includes(word.toLowerCase()) ||
                            searchByPhone(word, obj.personalData.phone)
                        ) {} else {
                            everyWord = false
                        }
                    })

                    if (everyWord) {
                        results.push(obj);
                    }
                });

                function separateWords(str) {
                    return str.split(" ");
                }

                function searchByPhone(value, phone) {
                    const onlyNumsValue = getOnlyNums(value);
                    const onlyNumsPhone = getOnlyNums(phone);

                    if (onlyNumsPhone.includes(onlyNumsValue) && onlyNumsValue !== '' && onlyNumsPhone !== '') {
                        return true;
                    } else {
                        return false;
                    }
                }
                function getOnlyNums(str) {
                    let onlyNums = '';
                    const nums = '1234567890'

                    for (let i = 0; i < str.length; i++) {
                        if (nums.includes(str[i])) {
                            onlyNums += str[i];
                        }
                    }

                    return onlyNums;
                }

                function checkIncludsFullName(value, fullname) {
                    const fullNameArray = removeEmptyStrings(separateWords(fullname));
                    let result = false;

                    fullNameArray.forEach(name => {
                        if (checkIncludsFromStart( value,  name)) {
                            result = true;
                        }
                    })
                    
                    return result;
                }

                function removeEmptyStrings(array) {
                    return array.filter(item => item.trim() !== "");
                }

                function checkIncludsFromStart(str1, str2) {
                    // str1 - value str2 - hint
                    const max = str1.length;
                    let result = true;

                    for(let i = 0; i < max; i++) {
                        if (String(str1[i]).toLowerCase() !== String(str2[i]).toLowerCase()) {
                            result = false;
                        }
                    }
                    return result;
                }

                return results;
            },
            data: [
                
                {
                    id: 123,
                    personalData: {
                        fullname: 'Захаров Андрей Германович',
                        phone: '+7 987 654-5758',
                    },
                    placeOfResidence: {
                        city: 'Нижний Новгород',
                    },
                    nationality: [],
                    schoolEducation: {},
                    SecondaryVocationalEducation: {},
                    higherProfessionalEducation: {},
                    lastPlaceOfWork: {},
                    placeOfWork: {},
                    responses: [],
                    resumeHistory: []
                },
                {
                    id: 123,
                    personalData: {
                        fullname: 'Захаров Андрей Дмитриевич',
                        phone: '+7 987 654-9630',
                    },
                    placeOfResidence: {
                        city: 'Нижний Новгород',
                    },
                    nationality: [],
                    schoolEducation: {},
                    SecondaryVocationalEducation: {},
                    higherProfessionalEducation: {},
                    lastPlaceOfWork: {},
                    placeOfWork: {},
                    responses: [],
                    resumeHistory: []
                },
                {
                    id: 123,
                    personalData: {
                        fullname: 'Захаров Андрей Евгеньевич',
                        gender: 'Мужской',
                        phone: '+7 (987) 654-32-10',
                        email: 'ivanov_40mail.ru',
                        status: 'Безработный',
                        dateOfBirth: '14.06.2000',
                        zodiacSign: 'Близннецы',
                        age: '23',
                        maritalStatus: 'Женат/замужем',
                        haveKids: 'Нет',
                    },
                    placeOfResidence: {
                        region: 'Нижегородская область',
                        city: 'Нижний Новгород',
                        street: 'Проспект Кораблестроителей',
                        house: '7',
                        corpse: '2',
                        building: '-',
                        area: 'Сормовский район',
                    },
                    nationality: ['Российская Федерация', 'Беларусь'],
                    schoolEducation: {
                        city: 'Нижний Новгород',
                        nuberAndNameOfSchool: 'Школа 141 (ул. Вождей Революции, 29, Сормовский район)',
                        medal: 'Нет',
                        educationStartion: 'Май 1990',
                        educationEnding: 'Июнь 2000'
                    },
                    SecondaryVocationalEducation: {
                        city: 'Нижний Новгород',
                        nameOfInstitution: 'Сормовский механический техникум имени героя, Советского Союза П.А. Семенова (CМТ) (Свирская ул., 20, Сормовский район)', 
                        classification: 'Оператор станков',
                        secialty: 'Станочник (металлобработка)',
                        formOfEducation: 'Очная',
                        directionOfRedDiploma: 'Нет',
                        sducationStartion: 'Сентябрь 2010',
                        Окончание: 'Январь 2013',
                    },
                    higherProfessionalEducation: {
                        city: 'Нижний Новгород',
                        nameOfInstitution: 'Горьковский инженерно-строительный институт (ГИСИ), им. В.П. Чкалова', 
                        classification: 'Бакалавр',
                        secialty: 'Прикладная математика и информатика',
                        formOfEducation: 'Очная',
                        directionOfRedDiploma: 'Да',
                        educationStartion: 'Сентябрь 1980',
                        Окончание: 'Июль 1990',
                    },
                    lastPlaceOfWork: {
                        nameOfCompany: 'ООО “Все Вакансии Нижнего”',
                        position: 'Редактор',
                        educationStartionMounth: 'Январь',
                        educationStartionYear: '2023',
                        upToThePresent: true,
                        suties: [
                            'Общение с людьми',
                            'Документация',
                        ],
                    },
                    placeOfWork: {
                        nameOfCompany: 'ООО “Все Вакансии Нижнего”',
                        position: 'Редактор',
                        educationStartionMounth: 'Январь',
                        educationStartionYear: '2021',
                        endOfWorkMounth: 'Декабрь',
                        endOfWorkYear: '2022',
                        suties: [
                            'Общение с людьми',
                            'Документация',
                        ],
                    },
                    responses: [
                        'Менеджер по продаже строительных материалов (ИНН 5262217031 ООО “Все Вакансии Нижнего”) 31.03.2024 14:05:57',
                        'Грузчик на склад материала (ИНН 5262143446 ООО “Тепло в каждый дом”) 06.11.2022 08:19:07'
                    ],
                    resumeHistory: [
                        'Редактор 24.06.2023 12:08:34',
                        'Грузчик 12.09.2021 11:23:45'
                    ]
                }, 
                {
                    id: 123,
                    personalData: {
                        fullname: 'Захаров Андрей Александрович',
                        phone: '+7 987 654-8231',
                    },
                    placeOfResidence: {
                        region: 'Нижегородская область',
                        city: 'Нижний Новгород',
                    },
                    nationality: [],
                    schoolEducation: {},
                    SecondaryVocationalEducation: {},
                    higherProfessionalEducation: {},
                    lastPlaceOfWork: {},
                    placeOfWork: {},
                    responses: [],
                    resumeHistory: []
                },
                {
                    personalData: {
                        fullname: 'Захаров Андрей Владимирович',
                        phone: '+7 987 654-4692',
                    },
                    placeOfResidence: {
                        region: 'Нижегородская область',
                        city: 'Нижний Новгород',
                    },
                    nationality: [],
                    schoolEducation: {},
                    SecondaryVocationalEducation: {},
                    higherProfessionalEducation: {},
                    lastPlaceOfWork: {},
                    placeOfWork: {},
                    responses: [],
                    resumeHistory: []
                },
                {
                    id: 123,
                    personalData: {
                        fullname: 'Захаров Андрей Геннадиевич',
                        phone: '+7 987 654-3209',
                    },
                    placeOfResidence: {
                        region: 'Нижегородская область',
                        city: 'Нижний Новгород',
                    },
                    nationality: [],
                    schoolEducation: {},
                    SecondaryVocationalEducation: {},
                    higherProfessionalEducation: {},
                    lastPlaceOfWork: {},
                    placeOfWork: {},
                    responses: [],
                    resumeHistory: []
                },
                {
                    id: 123,
                    personalData: {
                        fullname: 'Захаров Андрей Дмитриевич',
                        phone: '+7 987 654-7015',
                    },
                    placeOfResidence: {
                        region: 'Нижегородская область',
                        city: 'Нижний Новгород',
                    },
                    nationality: [],
                    schoolEducation: {},
                    SecondaryVocationalEducation: {},
                    higherProfessionalEducation: {},
                    lastPlaceOfWork: {},
                    placeOfWork: {},
                    responses: [],
                    resumeHistory: []
                },
            ],
            label: 'Соискатели',
            maxHints: 7,
        },
        fullNameTab: {
            resultsBlock: function(result) {
                return `
                <div class="results-fullname">
                    <p class="results-label">ФИО по полям</p>
                    <div class="results-table-row">
                        <p class="results-value-label">Фамилия</p>
                        <div class="results-editable-block">
                            <p class="results-editable-text">${result.surname ? result.surname : '_'}</p>
                            <div class="block-edit-button"></div>
                        </div>
                        <p class="results-id">ID <span class="results-id-value">201</span></p>
                    </div>
                    <div class="results-table-row">
                        <p class="results-value-label">Имя</p>
                        <div class="results-editable-block">
                            <p class="results-editable-text">${result.name ? result.name : '_'}</p>
                            <div class="block-edit-button"></div>
                        </div>
                        <p class="results-id">ID <span class="results-id-value">79</span></p>
                    </div>
                    <div class="results-table-row">
                        <p class="results-value-label">Отчество</p>
                        <div class="results-editable-block">
                            <p class="results-editable-text">${result.patronymic ? result.patronymic : '_'}</p>
                            <div class="block-edit-button"></div>
                        </div>
                        <p class="results-id">ID <span class="results-id-value">5</span></p>
                    </div>
                </div>`
            },
            getHint: function(hint, index, value, self) {
                const name = hint.name;
                const patronymic = hint.patronymic;
                const surname = hint.surname;
                const valueArray = separateWords(value);
                const valueArrayLength = valueArray.length;
                let isCardMayBeHiden = false;
                
                const fullNameStr = `${hint.name? hint.name : '' } ${hint.patronymic ? hint.patronymic : '' } ${hint.surname ? hint.surname : '' }`;
                let fullNameArray = separateWords(fullNameStr);

                hidePatrIfInputedOnlySurname();
                function hidePatrIfInputedOnlySurname() {
                    const isSurnameInputed = checkIsSurnameInputed();
                    const isNameInputed = checkIsNameInputed();
                    const isPatrInputed = checkIsPatrInputed();

                    if (isSurnameInputed && !isNameInputed && isPatrInputed) {
                        isCardMayBeHiden = true;
                    }
                }
                function checkIsSurnameInputed() {
                    let res = false;
                    valueArray.forEach(word => {
                        if (checkIncludsFromStart(word, fullNameArray[2])) {
                            res = true;
                        }
                    })
                    return res;
                }
                function checkIsNameInputed() {
                    let res = false;
                    valueArray.forEach(word => {
                        if (checkIncludsFromStart(word, fullNameArray[0])) {
                            res = true;
                        }
                    })
                    return res;
                }
                function checkIsPatrInputed() {
                    let res = false;
                    valueArray.forEach(word => {
                        if (checkIncludsFromStart(word, fullNameArray[1])) {
                            res = true;
                        }
                    })
                    return res;
                }


                fullNameArray = swap(fullNameArray, valueArray);

                function swap(array, valueArray) {
                    if (valueArray[1] && array[1]) {
                        const v1_in_h2 = checkIncludsFromStart(valueArray[0], array[1]);
                        const v2_in_h1 = checkIncludsFromStart(valueArray[1], array[0]);

                        const v1_in_h1 = checkIncludsFromStart(valueArray[0], array[0]);
                        const v2_in_h2 = checkIncludsFromStart(valueArray[1], array[1]);

                        
                        if (v1_in_h2 && v2_in_h1 && !v1_in_h1 && !v2_in_h2) {
                            const buffer = array[0];

                            array[0] = array[1];
                            array[1] = buffer;
                        }
                    }
                    return array;
                }

                let fullName = '';
                let spaceWasIncluded = false;
                fullNameArray.forEach(word => {
                    if (atleastOneWordMatched(word, valueArray)) {
                        fullName += `${word} `;
                    } else if (value[value.length - 1] == ' ') {
                        if (!spaceWasIncluded) {
                            fullName += `${word} `;
                            spaceWasIncluded = true;
                        }
                    } else {
                        fullName += '';
                    }
                })

                // let fullString = `${atleastOneWordMatched(hint.name, valueArray) ? hint.name : '' } ${atleastOneWordMatched(hint.patronymic, valueArray) ? hint.patronymic : '' } ${atleastOneWordMatched(hint.surname, valueArray) ? hint.surname : '' }`;
                const stringForValue = fullName;
                fullName = getHintTitleWithColor(fullName, value);

                const hintCard = document.createElement('div');
                hintCard.classList.add('hint-card');
                hintCard.classList.add('hint-card-one-line');
                hintCard.classList.add('fullNameTab');
                hintCard.innerHTML = `
                    <h3 class="hint-title">${fullName}</h3>
                `;
                hintCard.addEventListener('click', () => {
                    const results = self.handleSearch(value, self.params.data);
                    self.showResults(results[index]);
                    setValueOnClick(results[index]);
                });

                function setValueOnClick(hint) {
                    const searchForm = document.querySelector('#search-input');
                    searchForm.value = stringForValue;
                }

                function getHintTitleWithColor(hint, value) {
                    const hintWords = separateWords(hint);
                    const valueWords = separateWords(value);

                    let result = '';

                    hintWords.forEach(hintWord => {
                        let maxMatches = 0;
                        let maxMatchedWord = '';

                        valueWords.forEach(valueWord => {
                            const matchesNum = findMatches(valueWord, hintWord);
                            if (matchesNum > maxMatches) {
                                maxMatchedWord = valueWord;
                                maxMatches = matchesNum;
                            }
                        })

                        result += getPart(maxMatchedWord, hintWord) + ' ';
                    })
                    
                    function getPart(str1, str2) {
                        const except = '”“\"'

                        let result = '';
                        const matches = findMatches(str1, str2);

                        result += '<span class="hint-color-text">';
                        let spanClosed = false;
                        for (let i = 0; i < str2.length; i++) {
                            if (i >= matches) {
                                result += `</span>`;
                                spanClosed = true;
                            }
                            result += str2[i];
                        }
                        
                        if (!spanClosed) {
                            result += `</span>`;
                        }

                        return result
                    }

                    getPart(hint, value)
                    
                    return result;
                }

                function findMatches(str1, str2) {
                    let n = 0;
                    const minLength = Math.min(str1.length, str2.length);
                    
                    for (let i = 0; i < minLength; i++) {
                        if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                            n += 1;
                        } else {
                            break;
                        }
                    }
                    
                    return n;
                }

                function separateWords(str) {
                    return str.split(" ");
                }

                function atleastOneWordMatched(value, valueArray) {
                    try {
                        let res = false;

                        valueArray.forEach(word => {
                            if (word.toLowerCase()) {
                                if (word[0].toLowerCase().includes(value[0].toLowerCase())) {
                                    res = true;
                                }
                            }
                        }) 

                        return res;
                    } catch(e) {
                        console.log(`Error in atleastOneWordMatched!\nArgs: 1(${value}) 2(${valueArray})\nError text: ${e}`)
                        return false;
                    }
                }

                function checkIncludsFromStart(str1, str2) {
                    // str1 - value str2 - hint
                    const max = str1.length;
                    let result = true;

                    for(let i = 0; i < max; i++) {
                        if (String(str1[i]).toLowerCase() !== String(str2[i]).toLowerCase()) {
                            result = false;
                        }
                    }
                    return result;
                }

                hideHintsIfWordInputed();

                function isWordInFName(word, fname) {
                    let res = false;
                    fname.forEach(name => {
                        if (name.toLowerCase().includes(word.toLowerCase())) {
                            res = true;
                        }
                    })
                    return res;
                }
                function checkIsFullWordInputed(word, fname) {
                    let res = false;
                    fname.forEach(name => {
                        if (name.toLowerCase() == word.toLowerCase()) {
                            res = true;
                        }
                    })
                    return res;
                }
                function hideHintsIfWordInputed() {
                    const allWords = removeEmptyStrings(valueArray).length;
                    let fullInputedWords = 0;

                    valueArray.forEach(valWord => {
                        const wordIsNotAPhone = isWordInFName(valWord, fullNameArray);
                        const isFullWordInputed = checkIsFullWordInputed(valWord, fullNameArray);

                        if (wordIsNotAPhone && isFullWordInputed) {
                            fullInputedWords++;
                        }
                    })

                    if (allWords == fullInputedWords && value[value.length - 1] !== ' ') {
                        hintCard.hiden = true;
                    }
                }

                function removeEmptyStrings(array) {
                    return array.filter(item => item.trim() !== "");
                }

                if (isCardMayBeHiden) {
                    hintCard.hiden = true;
                }

                return hintCard;
            },
            handleSearch: function(value, array) {
                const results = [];
                
                array.forEach((obj) => {
                    separatedString = separateWords(value);
                    let everyWord = true;
                    let nameOrSurnmNotFinded = true;

                    separatedString.forEach(word => {
                        if (
                            /* String(obj.name).toLowerCase().includes(String(word).toLowerCase()) ||
                            String(obj.patronymic).toLowerCase().includes(String(word).toLowerCase()) ||
                            String(obj.surname).toLowerCase().includes(String(word).toLowerCase()) */

                            checkIncludsFromStart(word, obj.name) ||
                            checkIncludsFromStart(word, obj.patronymic) ||
                            checkIncludsFromStart(word, obj.surname)
                        ) {
                           if (checkIncludsFromStart(word, obj.name) ||
                           checkIncludsFromStart(word, obj.surname)) {
                            nameOrSurnmNotFinded = false;
                           }
                        } else {
                            everyWord = false
                        }
                    })

                    if (everyWord && !nameOrSurnmNotFinded) {
                        results.push(obj);
                    }
                });

                function checkIncludsFromStart(str1, str2) {
                    // str1 - value str2 - hint
                    const max = str1.length;
                    let result = true;

                    for(let i = 0; i < max; i++) {
                        if (String(str1[i]).toLowerCase() !== String(str2[i]).toLowerCase()) {
                            result = false;
                        }
                    }
                    return result;
                }

                function separateWords(str) {
                    return str.split(" ");
                }
                return results;
            },
            data: [
                {'name': 'Алевтина', 'patronymic': '', 'surname': ''},
                {'name': 'Александр', 'patronymic': '', 'surname': ''},
                {'name': 'Александра', 'patronymic': '', 'surname': ''},
                {'name': 'Алексей', 'patronymic': '', 'surname': ''},
                {'name': 'Алексеев', 'patronymic': '', 'surname': ''},
                {'name': 'Алексеева', 'patronymic': '', 'surname': ''},
                {'name': 'Алена', 'patronymic': '', 'surname': ''},

                {'name': 'Алексей', 'patronymic': '', 'surname': 'Евгениевич'},
                {'name': 'Алексей', 'patronymic': '', 'surname': 'Евгеньевич'},
                {'name': 'Алексей', 'patronymic': '', 'surname': 'Евдокимов'},
                {'name': 'Алексей', 'patronymic': '', 'surname': 'Евлоев'},
                {'name': 'Алексей', 'patronymic': '', 'surname': 'Евсеев'},
                {'name': 'Алексей', 'patronymic': '', 'surname': 'Евстигнеев'},
                {'name': 'Алексей', 'patronymic': '', 'surname': 'Евтушенко'},
                
                {'name': 'Алексей', 'patronymic': 'Евгеньевич', 'surname': 'Захаров'},
                {'name': 'Алексей', 'patronymic': 'Евгеньевич', 'surname': 'Закиров'},
                {'name': 'Алексей', 'patronymic': 'Евгеньевич', 'surname': 'Зайцев'},
                {'name': 'Алексей', 'patronymic': 'Евгеньевич', 'surname': 'Зверев'},
                {'name': 'Алексей', 'patronymic': 'Евгеньевич', 'surname': 'Зинченко'},
                {'name': 'Алексей', 'patronymic': 'Евгеньевич', 'surname': 'Зотов'},
                {'name': 'Алексей', 'patronymic': 'Евгеньевич', 'surname': 'Зуев'}
            ],
            label: 'ФИО',
            maxHints: 7
        },
        addressesTab: {
            resultsBlock: function(result) {
                    return `<div class="results-address">
                                ${typeof result.showGreen !== 'undefined' ? `
                                    <div class="results-notification">
                                        <img src="assets/icons/fixed_icons/ok.svg" alt="Ok">
                                        <p>Еще можно указать дом и квартиру</p>
                                    </div>` : ''
                                }
                                <div class="results-block-row">
                                    <div class="results-block-col address-by-parts-col">
                                        <p class="results-label">Адрес по частям</p>

                                        <div class="results-table-row">
                                            <p class="results-value-label">Индекс</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.index ? result.index : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Регион</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.region ? result.region : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Район региона</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.regionDistrict ? result.regionDistrict : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Деревня (поселок) региона</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.regionVillage ? result.regionVillage : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Город / н.п.</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.cityOrSettlement ? result.cityOrSettlement : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Деревня (поселок) города</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.cityVillage ? result.cityVillage : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Район города</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.cityDistrict ? result.cityDistrict : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Название участка дороги</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.roadSectionName ? result.roadSectionName : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Название улицы</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.streetName ? result.streetName : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Номер дома</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.houseNumber ? result.houseNumber : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Тип строения</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.buildingType ? result.buildingType : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Номер строения</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.buildingNumber ? result.buildingNumber : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Тип помещения</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.roomType ? result.roomType : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Номер помещения</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.roomNumber ? result.roomNumber : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Номер этажа</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.floorNumber ? result.floorNumber : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Название помещения</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.roomName ? result.roomName : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Абонентский ящик</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text">${result.postBox ? result.postBox : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="results-block-col additional-info-col">
                                        <p class="results-label">Дополнительная информация</p>

                                        <div class="results-table-row">
                                            <p class="results-value-label">Геокоординаты широта</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text coordinates">${result.latitude ? result.latitude : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row">
                                            <p class="results-value-label">Геокоординаты долгота</p>
                                            <div class="results-editable-block">
                                                <p class="results-editable-text coordinates">${result.longitude ? result.longitude : '_'}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                        <div class="results-table-row results-table-row-with-indicator">
                                            <p class="results-value-label">Ближайшее метро</p>
                                            <div class="results-editable-block results-editable-block-with-indicator desktop-with-indicator">
                                                <div class="${result.distanceMetro ? 'red-indicator' : ''}"></div>
                                                <p class="results-editable-text">${result.nearestMetro ? result.nearestMetro : '_'} ${result.distanceMetro ? result.distanceMetro : ''}</p>
                                                <div class="block-edit-button"></div>
                                            </div>
                                            <div class="results-editable-block results-editable-block-with-indicator mobile-with-indicator">
                                                <div class="indicator-label">
                                                    <p class="results-editable-text">${result.nearestMetro ? result.nearestMetro : '_'}</p>
                                                    <p class="results-editable-text">${result.distanceMetro ? result.distanceMetro : ''}</p>
                                                </div>
                                                <div class="block-edit-button"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
            },
            handleSearch: function(value, array) {
                const results = [];
                const separatedString = separateWords(value);
                const {region, cityOrSettlement, roadSectionName, streetName, cityVillage, regionDistrict, regionVillage} = array;
                
                array.forEach((obj) => {
                    let everyWordFounded = true;
                    let greenShow = true;

                    separatedString.forEach((word) => {
                        if (
                            obj.region.toLowerCase().includes(word.toLowerCase()) ||
                            obj.cityOrSettlement.toLowerCase().includes(word.toLowerCase()) ||
                            obj.roadSectionName.toLowerCase().includes(word.toLowerCase()) ||

                            checkMatchesInWords(obj.streetName, word) ||

                            obj.cityVillage.toLowerCase().includes(word.toLowerCase()) ||
                            obj.regionDistrict.toLowerCase().includes(word.toLowerCase()) ||
                            obj.regionVillage.toLowerCase().includes(word.toLowerCase()) ||

                            obj.houseNumber.toLowerCase().includes(word.toLowerCase()) ||
                            obj.buildingType.toLowerCase().includes(word.toLowerCase()) ||
                            obj.buildingNumber.toLowerCase().includes(word.toLowerCase()) 
                        ) {
                            if (obj.houseNumber.toLowerCase().includes(word.toLowerCase())) {
                                greenShow = false;
                            }
                        } else {
                            everyWordFounded = false;
                        }
                    })

                    if (greenShow) {
                        obj.showGreen = true;
                    }

                    if (everyWordFounded) {
                        results.push(obj);
                    }
                });

                function checkMatchesInWords(stringFromObj, valueWord) {
                    strFromObjArray = separateWords(stringFromObj, valueWord);

                    isMatchesFinded = false;

                    strFromObjArray.forEach(str => {
                        if (str.toLowerCase().includes(valueWord.toLowerCase())) {
                            isMatchesFinded = true;
                        }
                    })

                    return isMatchesFinded;
                }

                function separateWords(str) {
                    const str1 = str.replace(/дом/g, '');
                    const str2 = str1.replace(/,/g, '');



                    return str2.split(" ").filter(word => word !== '');
                }
                
                /* function sortResults(results) {
                    results.forEach(hint => {
                        const region = hint.region ? hint.region : '';
                        const regionDistrict = hint.regionDistrict ? hint.regionDistrict : '';
                        const cityOrSettlement = hint.cityOrSettlement ? hint.cityOrSettlement : '';
                        const regionVillage = hint.regionVillage ? hint.regionVillage : '';
                        const cityVillage = hint.cityVillage ? hint.cityVillage : '';
                        const cityDistrict = hint.cityDistrict ? hint.cityDistrict : '';
                        const streetName = hint.streetName ? hint.streetName : '';
                        const houseNumber = hint.houseNumber ? hint.houseNumber : '';    
                        const buildingType = hint.buildingType ? hint.buildingType : '';
                        const buildingNumber = hint.buildingNumber ? hint.buildingNumber : '';    
                        const roadSectionName = hint.roadSectionName ? hint.roadSectionName : '';  

                        let title = `
                        ${region ? region + ', ' : ''}
                        ${regionDistrict ? regionDistrict + ', ' : ''}
                        ${cityOrSettlement ? cityOrSettlement + ', ' : ''}
                        ${regionVillage ? regionVillage + ', ' : ''}
                        ${cityVillage ? cityVillage + ', ' : ''}
                        ${cityDistrict ? cityDistrict + ', ' : ''}
                        ${roadSectionName ? roadSectionName + ' ' : ''}
                        ${streetName ? streetName + ', ' : ''}
                        ${houseNumber ? houseNumber + ', ' : ''}
                        ${buildingType ? buildingType + ', ' : ''}
                        ${buildingNumber ? buildingNumber + ', ' : ''}`;

                        hint.str = title;
                    })

                    const res = results.sort((a, b) => {
                        const nameA = a.str.toUpperCase();
                        const nameB = b.str.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    })

                    return res;
                } */
                
                return results;
            },
            getHint(hint, index, value, self) {
                const region = hint.region ? hint.region : '';
                const regionDistrict = hint.regionDistrict ? hint.regionDistrict : '';
                const cityOrSettlement = hint.cityOrSettlement ? hint.cityOrSettlement : '';
                const regionVillage = hint.regionVillage ? hint.regionVillage : '';
                const cityVillage = hint.cityVillage ? hint.cityVillage : '';
                const cityDistrict = hint.cityDistrict ? hint.cityDistrict : '';
                const streetName = hint.streetName ? hint.streetName : '';
                const houseNumber = hint.houseNumber ? hint.houseNumber : '';    
                const buildingType = hint.buildingType ? hint.buildingType : '';
                const buildingNumber = hint.buildingNumber ? hint.buildingNumber : '';    
                const roadSectionName = hint.roadSectionName ? hint.roadSectionName : '';    

                let title = `${region ? region + ', ' : ''}${regionDistrict ? regionDistrict + ', ' : ''}${cityOrSettlement ? 'город ' + cityOrSettlement + ', ' : ''}${regionVillage ? regionVillage + ', ' : ''}${cityVillage ? cityVillage + ', ' : ''}${cityDistrict ? cityDistrict + ', ' : ''}${roadSectionName ? roadSectionName + ' ' : ''}${streetName ? streetName + ', ' : ''}${houseNumber ? 'дом ' + houseNumber + ', ' : ''}${buildingType ? buildingType + ', ' : ''}${buildingNumber ? buildingNumber + ', ' : ''}`;

                let titleArray = title.split('');


                for (let i = titleArray.length - 1; i >= 0; i--) {
                    if (titleArray[i] === ',') {
                        titleArray.splice(i, 1);
                        break;
                    }
                }

                title = titleArray.join('');

                const hintCard = document.createElement('div');
                hintCard.classList.add('hint-card');
                hintCard.classList.add('hint-card-one-line');
                hintCard.classList.add('addressesTab');
                hintCard.innerHTML = `
                    <h3 class="hint-title">${getHintTitleWithColor(title, value)}</h3>
                `;
                hintCard.addEventListener('click', () => {
                    const results = self.handleSearch(value, self.params.data);
                    self.showResults(results[index]);
                    setValueOnClick(results[index]);
                });

                function setValueOnClick(hint) {
                    const searchForm = document.querySelector('#search-input');
                    searchForm.value = title;
                }

                function getHintTitleWithColor(hint, value) {
                    const hintWords = separateWords(hint);
                    const valueWords = separateWords(value);

                    let result = '';

                    hintWords.forEach(hintWord => {
                        let maxMatches = 0;
                        let maxMatchedWord = '';

                        valueWords.forEach(valueWord => {
                            const matchesNum = findMatches(valueWord, hintWord);
                            if (matchesNum > maxMatches) {
                                maxMatchedWord = valueWord;
                                maxMatches = matchesNum;
                            }
                        })

                        result += getPart(maxMatchedWord, hintWord) + ' ';
                    })
                    
                    function getPart(str1, str2) {
                        if (str2.toLowerCase().includes(str1.toLowerCase())) {
                            let result = '';
                            const matches = findMatches(str1, str2);

                            result += '<span class="hint-color-text">';
                            let spanClosed = false;
                            for (let i = 0; i < str2.length; i++) {
                                if (i >= matches) {
                                    result += `</span>`;
                                    spanClosed = true;
                                }
                                result += str2[i];
                            }

                            if (!spanClosed) {
                                result += `</span>`;
                            }

                            return result;
                        } else {
                            return str2;
                        }
                    }

                    getPart(hint, value)
    
                    function findMatches(str1, str2) {
                        let n = 0;
                        const minLength = Math.min(str1.length, str2.length);
                        
                        for (let i = 0; i < minLength; i++) {
                            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                                n += 1;
                            } else {
                                break;
                            }
                        }
                        
                        return n;
                    }
                    function separateWords(str) {
                        return str.split(" ");
                    }
                    
                    return result;
                }

                return hintCard;
            },
            data: [
                /* {
                    index: "603122",
                    region: "Нижегородская область",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "Советский",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "7",
                    buildingType: "корпус",
                    buildingNumber: "3",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "56.29411",
                    longitude: "44.044605",
                    nearestMetro: "Горьковская ",
                    distanceMetro: "(3.8 км)"
                }, */

                // данные из первой части шаблона
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                  
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "сельский поселок  Новинки",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                  
                {
                    index: "",
                    region: "Нижегородска область",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Богородск",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "",
                    streetName: "",
                    houseNumber: "",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                  
                {
                    index: "",
                    region: "Нижегородская область",
                    regionDistrict: "Богородский район",
                    regionVillage: "",
                    cityOrSettlement: "",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "",
                    streetName: "",
                    houseNumber: "",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                  
                {
                    index: "",
                    region: "Нижегородская область",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Семенов",
                    cityVillage: "деревня Богоявление",
                    cityDistrict: "",
                    roadSectionName: "",
                    streetName: "",
                    houseNumber: "",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                  
                {
                    index: "",
                    region: "Нижегородская область",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Бор",
                    cityVillage: "",
                    cityDistrict: "микрорайон Везломская Слобода",
                    roadSectionName: "улица",
                    streetName: "Богоявленская",
                    houseNumber: "",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                                
                {
                    index: "",
                    region: "Нижегородская область",
                    regionDistrict: "Воскресенский район",
                    regionVillage: "село Богородское",
                    cityOrSettlement: "",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "",
                    streetName: "",
                    houseNumber: "",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                }, 
                
                // данные из второй части шаблона                         
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "1",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                                
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "1А",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                                
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "2",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                                
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "4",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                                
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "5А",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                                
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "6",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },             
                
                // данные из третей части шаблона
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "7",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                                
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "7А",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                                
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "7Б",
                    buildingType: "",
                    buildingNumber: "",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                                
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "5",
                    buildingType: "корпус",
                    buildingNumber: "7",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                                
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "7",
                    buildingType: "корпус",
                    buildingNumber: "1",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                                
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "7",
                    buildingType: "корпус",
                    buildingNumber: "2",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "",
                    longitude: "",
                    nearestMetro: "",
                    distanceMetro: ""
                },                                
                {
                    index: "",
                    region: "",
                    regionDistrict: "",
                    regionVillage: "",
                    cityOrSettlement: "Нижний Новгород",
                    cityVillage: "",
                    cityDistrict: "",
                    roadSectionName: "улица",
                    streetName: "Богородского",
                    houseNumber: "7",
                    buildingType: "корпус",
                    buildingNumber: "3",
                    roomType: "",
                    roomNumber: "",
                    floorNumber: "",
                    roomName: "",
                    postBox: "",
                    latitude: "56.29411",
                    longitude: "44.044605",
                    nearestMetro: "Горьковская",
                    distanceMetro: "(3.8 км)"
                },                                
                    
            ],
            label: 'Город, улица, дом',
            maxHints: 7,
        },
        companiesTab: {
            resultsBlock: function(result) {
                return `
                <div class="results-companies">
                    <p class="results-label">Выбранная запись</p>
                    <div class="results-editable-block">
                        <p class="results-editable-text-bold">${result.companyName ? result.companyName : '_'}</p>
                        <div class="block-edit-button"></div>
                    </div>
                    <div class="results-block-row">
                        <div class="results-block-col first-col">
                            <div class="results-table-row">
                                <p class="results-value-label">Статус</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.status ? result.status : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row legal-address">
                                <p class="results-value-label">Юр. адрес</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.legalAddress ? result.legalAddress : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Директор</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.director ? result.director : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label results-moved-up">ИНН</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.INN ? result.INN : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label results-moved-up">КПП</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.KPP ? result.KPP : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label results-moved-up">ОГРН</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OGRN ? result.OGRN : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label results-moved-up">ОКАТО</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKATO ? result.OKATO : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label results-moved-up">ОКТМО</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKTMO ? result.OKTMO : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label results-moved-up">ОКПО</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKPO ? result.OKPO : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label results-moved-up">ОКОГУ</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKOGU ? result.OKOGU : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label results-moved-up">ОКФС</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKFS ? result.OKFS : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label results-moved-up">ОКВЭД</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKVED ? result.OKVED : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                        </div>
                        <div class="results-block-col second-col">
                            <div class="results-table-row">
                                <p class="results-value-label">Телефон</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.phone ? result.phone : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Email</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.email ? result.email : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            },
            handleSearch: function(value, array) {
                const results = [];
                const separatedString = separateWords(value);
                
                array.forEach((obj) => {
                    let everyWordFounded = true;

                    separatedString.forEach((word) => {
                        if (
                            checkMatchesInWords(obj.companyName, word) ||
                            checkMatchesInWords(obj.legalAddress, word) ||
                            obj.INN.toLowerCase().includes(word.toLowerCase()) ||
                            obj.OGRN.toLowerCase().includes(word.toLowerCase())
                        ) {} else {
                            everyWordFounded = false;
                        }
                    })

                    if (everyWordFounded) {
                        results.push(obj);
                    }
                });

                function checkMatchesInWords(stringFromObj, valueWord) {                    
                    strFromObjArray = separateWords(stringFromObj, valueWord);

                    isMatchesFinded = false;

                    strFromObjArray.forEach(str => {
                        if (str.toLowerCase().includes(valueWord.toLowerCase())) {
                            isMatchesFinded = true;
                        }
                    })

                    return isMatchesFinded;
                }

                function separateWords(str) {
                    return str.split(" ").filter(word => word !== '');
                }
                
                return results;
            },
            getHint(hint, index, value, self) {
                const companyName = hint.companyName ? hint.companyName : '';
                const legalAddress = hint.legalAddress ? hint.legalAddress : '';
                const INN = hint.INN ? hint.INN : '';
                const OGRN = hint.OGRN ? hint.OGRN : '';

                let title = `${getHintTitleWithColor(INN, value)} ${getHintTitleWithColor(companyName, value)}`;
                let subtitle = `${legalAddress}`;

                let titleArray = title.split('');
                title = titleArray.join('');

                const hintCard = document.createElement('div');
                hintCard.classList.add('hint-card');
                hintCard.classList.add('hint-card-one-line');
                hintCard.classList.add('companiesTab');
                hintCard.innerHTML = `
                    <h3 class="hint-title">ИНН ${title}</h3>
                    <p class="hint-subtitle">${getHintTitleWithColor(subtitle, value)}</p>`;

                hintCard.addEventListener('click', () => {
                    const results = self.handleSearch(value, self.params.data);
                    self.showResults(results[index]);
                    setValueOnClick(results[index]);
                });

                function setValueOnClick(hint) {
                    const searchForm = document.querySelector('#search-input');
                    searchForm.value = hint.companyName;
                }

                function getHintTitleWithColor(hint, value) {

                    const hintWords = separateWords(hint);
                    const valueWords = separateWords(value);

                    let result = '';

                    hintWords.forEach(hintWord => {
                        let maxMatches = 0;
                        let maxMatchedWord = '';

                        //check start and end
                        const except = '”“\"'

                        const start = hintWord[0];
                        const end = hintWord[hintWord.length - 1];
                        const params = {
                            startRemoved: false,
                            endRemoved: false
                        }

                        if (except.includes(start)) {
                            hintWord = hintWord.substring(1);
                            params.startRemoved = true
                        }
                        if (except.includes(end)) {
                            hintWord = hintWord.slice(0, -1);
                            params.endRemoved = true
                        }

                        valueWords.forEach(valueWord => {
                            const matchesNum = findMatches(valueWord, hintWord);
                            if (matchesNum > maxMatches) {
                                maxMatchedWord = valueWord;
                                maxMatches = matchesNum;
                            }
                        })

                        resultWord = getPart(maxMatchedWord, hintWord) + ' ';

                        //return start and end
                        if (params.startRemoved) {
                            resultWord = start + resultWord;
                        }
                        if (params.endRemoved) {
                            resultWord = resultWord + end;
                        }

                        result += resultWord;
                    })
                    
                    function getPart(str1, str2) {
                        if (str2.toLowerCase().includes(str1.toLowerCase())) {
                            //main
                            let result = '';
                            const matches = findMatches(str1, str2);


                            result += '<span class="hint-color-text">';
                            let spanClosed = false;
                            for (let i = 0; i < str2.length; i++) {
                                if (i >= matches) {
                                    result += `</span>`;
                                    spanClosed = true;
                                }
                                result += str2[i];
                            }

                            if (!spanClosed) {
                                result += `</span>`;
                            }

                            return result
                        } else {
                            return str2
                        }
                    }

                    getPart(hint, value)
    
                    function findMatches(str1, str2) {
                        let n = 0;
                        const minLength = Math.min(str1.length, str2.length);
                        
                        for (let i = 0; i < minLength; i++) {
                            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                                n += 1;
                            } else {
                                break;
                            }
                        }
                        
                        return n;
                    }
                    function separateWords(str) {
                        return str.split(" ");
                    }
                    
                    return result;
                }

                return hintCard;
            },
            data: [
                /* {
                    companyName: "ООО “ВСЕ ВАКАНСИИ НИЖНЕГО”",
                    status: "Действующая организация",
                    legalAddress: "603022, город Нижний Новгород, проспект Гагарина, дом 3",
                    director: "Захаров Алексей Евгеньевич, ИНН 526200537777",
                    INN: "5262217031",
                    KPP: "526201001",
                    OGRN: "1075262018138",
                    OKATO: "22401379000",
                    OKTMO: "22701000001",
                    OKPO: "82374902",
                    OKOGU: "4210014",
                    OKFS: "16",
                    OKVED: "58.13",
                    phone: "+7 952 7770000",
                    email: "-"
                },     */               
                //перавая часть
                {
                    companyName: "ООО \"ВС”",
                    status: "",
                    legalAddress: "603002, город Нижний Новгород, улица Вокзальная, дом 27, помещение 2",
                    director: "",
                    INN: "5257092436",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },                   
                {
                    companyName: "ООО \"ЧОО \"СОЮЗ-ВС”",
                    status: "",
                    legalAddress: "603157, город Нижний Новгород, Сормовское шоссе, дом 24, офис 41/45",
                    director: "",
                    INN: "5263092579",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },                   
                {
                    companyName: "ООО “ВС-ПЛАСТ”",
                    status: "",
                    legalAddress: "603163, город Нижний Новгород, улица Родионова, дом 195, корпус 2, помещение 4",
                    director: "",
                    INN: "5221001330",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },                   
                {
                    companyName: "ОАО “ТРК ВС РФ ЗВЕЗДА”",
                    status: "",
                    legalAddress: "129164, город Москва, проспект Мира, дом 126",
                    director: "",
                    INN: "7717653542",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },                   
                {
                    companyName: " ООО “ВС”",
                    status: "",
                    legalAddress: "160019, город Вологда, улица Горького, дом 3",
                    director: "",
                    INN: "3525156081",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },                   
                {
                    companyName: "ООО ”ВС”",
                    status: "",
                    legalAddress: "115230, город Москва, Каширское шоссе, дом 4, корпус 3, помещение 12А/1П ",
                    director: "",
                    INN: "9724147847",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },                   
                {
                    companyName: "ООО ”ВС”",
                    status: "",
                    legalAddress: "610027, город Киров, улица Дерендяева, дом 80, офис 21 ",
                    director: "",
                    INN: "4345296483",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },   
                //вторая
                {
                    companyName: "ООО \"ВСЕ СТОЛИКИ”",
                    status: "",
                    legalAddress: "603001, город Нижний Новгород, улица Рождественская, дом 21, помещение  П18",
                    director: "",
                    INN: "5260476471",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО \"ВСЕ ДЛЯ МЕБЕЛИ”",
                    status: "",
                    legalAddress: "603003, город Нижний Новгород, улица Станционная, дом 52, офис 23",
                    director: "",
                    INN: "5263119990",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО “ВСЕ ГОРОДА”",
                    status: "",
                    legalAddress: "603140, город Нижний Новгород, проспект Ленина, дом 16, квартира 8",
                    director: "",
                    INN: "5258143436",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ОАО “ВСЕ ЛАМПЫ”",
                    status: "",
                    legalAddress: "603002, город Нижний Новгород, улица Коммунистическая, дом 17, квартира 3",
                    director: "",
                    INN: "5257187670",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО “КОМПАНИЯ “ВСЕ”",
                    status: "",
                    legalAddress: "603043, город Нижний Новгород, проспект Октября, дом 16, квартира 53",
                    director: "",
                    INN: "5258051305",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО ”ВСЕ В ПОРЯДКЕ”",
                    status: "",
                    legalAddress: "603155, город Нижний Новгород, Верхне-Волжская набережная, дом 17, помещение 4",
                    director: "",
                    INN: "5260459300",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО ”ВСЕ ВАКАНСИИ НИЖНЕГО”",
                    status: "",
                    legalAddress: "603022, город Нижний Новгород, проспект Гагарина, дом 3",
                    director: "",
                    INN: "5262217031",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                //третья
                {
                    companyName: " ООО \"ВСЕ В ПОРЯДКЕ”",
                    status: "",
                    legalAddress: "603155, город Нижний Новгород, Верхне-Волжская набережная, дом 17, помещение 4",
                    director: "",
                    INN: "5260459300",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО \"ВСЕ В ДОМ”",
                    status: "",
                    legalAddress: "603105, город Нижний Новгород, улица Белинского, дом 41, помещение П1",
                    director: "",
                    INN: "5262384113",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО “ВСЕ ВАКАНСИИ НИЖНЕГО”",
                    status: "",
                    legalAddress: "603022, город Нижний Новгород, проспект Гагарина, дом 3",
                    director: "",
                    INN: "5262217031",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ИП Абазов Всеволод Сергеевич",
                    status: "",
                    legalAddress: "603000, город Нижний Новгород ",
                    director: "",
                    INN: "526208359507",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ИП Берзлагин Всеволод Владимирович",
                    status: "",
                    legalAddress: "603000, город Нижний Новгород",
                    director: "",
                    INN: "5525611251067",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ИП Иванов Всеволод Владимирович",
                    status: "",
                    legalAddress: "603000, город Нижний Новгород",
                    director: "",
                    INN: "526109761346",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ИП Мотин Всеволод Иванович",
                    status: "",
                    legalAddress: "603000, город Нижний Новгород",
                    director: "",
                    INN: "526017080650",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },

                //четвертая вкладка
                {
                    companyName: "ООО \"ВСЕ ВАКАНСИИ НИЖНЕГО”",
                    status: "",
                    legalAddress: "603022, город Нижний Новгород, проспект Гагарина, дом 3",
                    director: "",
                    INN: "55262217031",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО \"ВСЕ В-АВТО”",
                    status: "",
                    legalAddress: "188640, Ленинградская область, город Всеволожск, шоссе Дорога Жизни, дом 22, помещение  9-Н",
                    director: "",
                    INN: "54706032202",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО “ВСЕ В АЖУРЕ”",
                    status: "",
                    legalAddress: "160019, город Вологда, улица Чернышевского, д 121, квартира 69",
                    director: "",
                    INN: "3525348139",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО “ВСЕ В АЖУРЕ”",
                    status: "",
                    legalAddress: "620137, город Екатеринбург, улица Июльская, дом 25",
                    director: "",
                    INN: "6670328207",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО “ВСЕВАВТО”",
                    status: "",
                    legalAddress: "188640, Ленинградская область, город Всеволожск, улица Межевая, дом 18А",
                    director: "",
                    INN: "4703119007",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО “ВСЕ ВАКАНСИИ”",
                    status: "",
                    legalAddress: "153021, город Иваново, улица Кузнецова, дом 98",
                    director: "",
                    INN: "1809008950",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
                {
                    companyName: "ООО “ВСЕ ВАМ”",
                    status: "",
                    legalAddress: "610048, город Киров, улица Воровского, дом 143, квартира 64",
                    director: "",
                    INN: "43445440507",
                    KPP: "",
                    OGRN: "",
                    OKATO: "",
                    OKTMO: "",
                    OKPO: "",
                    OKOGU: "",
                    OKFS: "",
                    OKVED: "",
                    phone: "",
                    email: ""
                },
            ],
            label: 'Название, адрес, ИНН или ОГРН компании или ИП',
            maxHints: 7,
        },
        emailTab: {
            resultsBlock: function(result) {
                return `<div class="results-email">
                    <p class="results-label">Выбранная запись</p>
                    <div class="results-editable-block">
                        <p class="results-editable-text-bold">${result.email ? result.email : '_'}</p>
                        <div class="block-edit-button"></div>
                    </div>
                    <p class="results-id">Id 21</p>
                </div>`;
            },
            handleSearch: function(value, array) {
                const results = [];
                
                array.forEach((obj) => {
                    if (
                        obj.email.toLowerCase().includes(value.toLowerCase())
                    ) {
                        results.push(obj);
                    }
                    
                });

                return results;
            },
            getHint(hint, index, value, self) {
                const name = hint.email;

                const titleWithColor = getHintTitleWithColor(name, value);

                const hintCard = document.createElement('div');
                hintCard.classList.add('hint-card');
                hintCard.classList.add('hint-card-one-line');
                hintCard.classList.add('emailTab');
                hintCard.innerHTML = `
                    <h3 class="hint-title"><span class="hint-color-text">${titleWithColor}</span></h3>
                `;
                hintCard.addEventListener('click', () => {
                    const results = self.handleSearch(value, self.params.data);
                    self.showResults(results[index]);
                    setValueOnClick(results[index]);
                });

                function setValueOnClick(hint) {
                    const searchForm = document.querySelector('#search-input');
                    searchForm.value = hint.email;
                }

                function getHintTitleWithColor(full, value) {
                    const matches = findMatches(full, value);
                    let result = '';
    
                    for (let i = 0; i < full.length; i++) {
                        if (i === matches) {
                            result += `</span>`;
                        }
                        result += full[i]
                    }
    
                    function findMatches(str1, str2) {
                        let n = 0;
                        const minLength = Math.min(str1.length, str2.length);
                        
                        for (let i = 0; i < minLength; i++) {
                            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                                n += 1;
                            } else {
                                break;
                            }
                        }
                        
                        return n;
                    }
    
                    return result;
                }

                return hintCard;
            },
            data: [
                {email: '111nik',},
                {email: '111nata',},
                {email: '111net',},
                {email: '111nick',},
                {email: '111new',},
                {email: '111nat',},
                {email: '111natali',},

                {email: '111nat_40gmail.com',},
                {email: '111nat_40mail.ru',},
                {email: '111nat_40yandex.ru',},
                {email: '111nat_40bk.ru',},
                {email: '111nat_40ya.ru',},
                {email: '111nat_40inbox.ru',},
                {email: '111nat_40list.ru',},
            ],
            label: 'Адрес электронной почты',
            maxHints: 7,
        },
        banksTab: {
            resultsBlock: function(result) {
                return `<div class="results-banks">
                <div class="results-block-row">
                    <div class="results-block-col requisites-col">
                        <p class="results-label">Реквизиты Банка</p>
                        
                        <div class="results-table-row">
                            <p class="results-value-label">Юрлицо</p>
                            <div class="results-editable-block">
                                <p class="results-editable-text">${result.organization ? result.organization : '_'}</p>
                                <div class="block-edit-button"></div>
                            </div>
                        </div>
                        <div class="results-table-row">
                            <p class="results-value-label">БИК</p>
                            <div class="results-editable-block">
                                <p class="results-editable-text">${result.BIK ? result.BIK : '_'}</p>
                                <div class="block-edit-button"></div>
                            </div>
                        </div>
                        <div class="results-table-row">
                            <p class="results-value-label">Корсчет</p>
                            <div class="results-editable-block">
                                <p class="results-editable-text">${result.correspondentAccount ? result.correspondentAccount : '_'}</p>
                                <div class="block-edit-button"></div>
                            </div>
                        </div>
                        <div class="results-table-row">
                            <p class="results-value-label">ИНН</p>
                            <div class="results-editable-block">
                                <p class="results-editable-text">${result.INN ? result.INN : '_'}</p>
                                <div class="block-edit-button"></div>
                            </div>
                        </div>
                        <div class="results-table-row">
                            <p class="results-value-label">КПП</p>
                            <div class="results-editable-block">
                                <p class="results-editable-text">${result.KPP ? result.KPP : '_'}</p>
                                <div class="block-edit-button"></div>
                            </div>
                        </div>
                    </div>
                    <div class="results-block-col additional-info-col">
                        <p class="results-label">Дополнительная информация</p>
                        <div class="results-table-row">
                            <p class="results-value-label">ID</p>
                            <div class="results-editable-block">
                                <p class="results-editable-text">${result.additionalInfo.id ? result.additionalInfo.id : '_'}</p>
                                <div class="block-edit-button"></div>
                            </div>
                        </div>
                        <div class="results-table-row">
                            <p class="results-value-label">Статус</p>
                            <div class="results-editable-block">
                                <p class="results-editable-text">${result.additionalInfo.status ? result.additionalInfo.status : '_'}</p>
                            </div>
                        </div>
                        <div class="results-table-row">
                            <p class="results-value-label">Город</p>
                            <div class="results-editable-block">
                                <p class="results-editable-text">${result.cityOrSettlement ? result.cityOrSettlement : '_'}</p>
                                <div class="block-edit-button"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            },
            handleSearch: function(value, array) {
                const results = [];
                const separatedString = separateWords(value);
                
                array.forEach((obj) => {
                    let everyWordFounded = true;

                    separatedString.forEach((word) => {
                        if (
                            checkMatchesInWords(obj.organization, word) ||
                            checkMatchesInWords(obj.addressStr, word) ||
                            obj.BIK.toLowerCase().includes(word.toLowerCase()) ||
                            obj.correspondentAccount.toLowerCase().includes(word.toLowerCase()) ||
                            obj.INN.toLowerCase().includes(word.toLowerCase())
                        ) {} else {
                            everyWordFounded = false;
                        }
                    })

                    if (everyWordFounded) {
                        results.push(obj);
                    }
                });

                function checkMatchesInWords(stringFromObj, valueWord) {
                    strFromObjArray = separateWords(stringFromObj, valueWord);

                    isMatchesFinded = false;

                    strFromObjArray.forEach(str => {
                        if (str.toLowerCase().includes(valueWord.toLowerCase())) {
                            isMatchesFinded = true;
                        }
                    })

                    return isMatchesFinded;
                }

                function separateWords(str) {
                    return str.split(" ").filter(word => word !== '');
                }
                
                return results;
            },
            getHint(hint, index, value, self) {
                const organization = hint.organization ? hint.organization : '';
                const address = hint.addressStr
                const INN = hint.INN ? hint.INN : '';
                const correspondentAccount = hint.correspondentAccount ? hint.correspondentAccount : '';

                let title = `${INN} ${organization} Корсчёт ${correspondentAccount}`;
                let subtitle = `${address}`;

                let titleArray = title.split('');
                title = titleArray.join('');

                const hintCard = document.createElement('div');
                hintCard.classList.add('hint-card');
                hintCard.classList.add('hint-card-one-line');
                hintCard.classList.add('banksTab');
                hintCard.innerHTML = `
                    <h3 class="hint-title hint-bold">ИНН ${getHintTitleWithColor(title, value)}</h3>
                    <p class="hint-subtitle hint-bold">${getHintTitleWithColor(subtitle, value)}</p>`;

                hintCard.addEventListener('click', () => {
                    const results = self.handleSearch(value, self.params.data);
                    self.showResults(results[index]);
                    setValueOnClick(results[index]);
                });

                function setValueOnClick(hint) {
                    const searchForm = document.querySelector('#search-input');
                    searchForm.value = hint.organization;
                }

                function getHintTitleWithColor(hint, value) {

                    const hintWords = separateWords(hint);
                    const valueWords = separateWords(value);

                    let result = '';

                    hintWords.forEach(hintWord => {
                        let maxMatches = 0;
                        let maxMatchedWord = '';

                        valueWords.forEach(valueWord => {
                            const matchesNum = findMatches(valueWord, hintWord);
                            if (matchesNum > maxMatches) {
                                maxMatchedWord = valueWord;
                                maxMatches = matchesNum;
                            }
                        })

                        result += getPart(maxMatchedWord, hintWord) + ' ';
                    })
                    
                    function getPart(str1, str2) {
                        const except = '”“\"'

                        let result = '';
                        const matches = findMatches(str1, str2);

                        result += '<span class="hint-color-text">';
                        let spanClosed = false;
                        for (let i = 0; i < str2.length; i++) {
                            if (i >= matches) {
                                result += `</span>`;
                                spanClosed = true;
                            }
                            result += str2[i];
                        }
                        
                        if (!spanClosed) {
                            result += `</span>`;
                        }

                        return result
                    }

                    getPart(hint, value)
    
                    function findMatches(str1, str2) {
                        let n = 0;
                        const minLength = Math.min(str1.length, str2.length);
                        
                        for (let i = 0; i < minLength; i++) {
                            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                                n += 1;
                            } else {
                                break;
                            }
                        }
                        
                        return n;
                    }
                    function separateWords(str) {
                        return str.split(" ");
                    }
                    
                    return result;
                }

                return hintCard;
            },
            data: [
                {
                    organization: "ПАО “НБД-Банк”",
                    BIK: "",
                    correspondentAccount: "30101810400000000705",
                    INN: "5200000222",
                    KPP: "",
                    additionalInfo: {
                        id: "",
                        status: "",
                    },
                    addressStr: "042202705 город Нижний Новгород, площадь Горького, дом 6",
                    cityOrSettlement: "Нижний Новгород"
                },
                {
                    organization: "НИЖЕГОРОДСКИЙ РФ АО “РОССЕЛЬХОЗБАНК”",
                    BIK: "",
                    correspondentAccount: "30101810000000000846",
                    INN: "7725114488",
                    KPP: "",
                    additionalInfo: {
                        id: "",
                        status: "",
                    },
                    addressStr: "042202846 город Нижний Новгород, улица Кулибина, дом 3",
                    cityOrSettlement: "Нижний Новгород"
                },
                {
                    organization: "НИЖЕГОРОДСКИЙ ФИЛИАЛ АБ “РОССИЯ”",
                    BIK: "",
                    correspondentAccount: "30101810300000000876",
                    INN: "7831000122",
                    KPP: "",
                    additionalInfo: {
                        id: "",
                        status: "",
                    },
                    addressStr: "042202876 город Нижний Новгород, улица Ульянова, дом 26/11 ",
                    cityOrSettlement: "Нижний Новгород"
                },
                {
                    organization: "Поволжский филиал АО “Райффайзенбанк”",
                    BIK: "",
                    correspondentAccount: "30101810300000000847",
                    INN: "7744000302",
                    KPP: "",
                    additionalInfo: {
                        id: "",
                        status: "",
                    },
                    addressStr: "042202847 город Нижний Новгород, улица Белинского, дом 61, корпус 1",
                    cityOrSettlement: "Нижний Новгород"
                },
                {
                    organization: "ПРИВОЛЖСКИЙ ФИЛИАЛ ПАО РОСБАНК",
                    BIK: "",
                    correspondentAccount: "30101810400000000747",
                    INN: "7730060164",
                    KPP: "",
                    additionalInfo: {
                        id: "",
                        status: "",
                    },
                    addressStr: "042202747 город Нижний Новгород, улица Керченская, дом 13",
                    cityOrSettlement: "Нижний Новгород"
                },
                {
                    organization: "ВОЛГО-ВЯТСКИЙ БАНК ПАО СБЕРБАНК",
                    BIK: "",
                    correspondentAccount: "30101810900000000603",
                    INN: "7707083893",
                    KPP: "",
                    additionalInfo: {
                        id: "",
                        status: "",
                    },
                    addressStr: "042202603 город Нижний Новгород, улица Октябрьская, дом 35",
                    cityOrSettlement: "Нижний Новгород"
                },
                {
                    organization: "Нижегородский филиал АО Ингосстрах Банк",
                    BIK: "",
                    correspondentAccount: "30101810922020000807",
                    INN: "7714056040",
                    KPP: "",
                    additionalInfo: {
                        id: "",
                        status: "",
                    },
                    addressStr: "042202807 город Нижний Новгород, проспект Ленина, дом 100, корпус 1",
                    cityOrSettlement: "Нижний Новгород"
                },
            ],
            label: 'Название, БИК, Корсчет или ИНН банка',
            maxHints: 8,
        },
        educationalInstitutionsTab: {
            resultsBlock: function(result) {
                result = typeof result.altNamesHint == 'undefined' ? result : result.obj;

                return handleRadioButton();
                function handleRadioButton() {
                    const wrapper = document.querySelector('#tab-button-wrapper');
                    const tab = wrapper.getAttribute('activeValue');

                    let results;
                    if (1) {
                        results = resultsBlockShoolTab();
                    } else if (2) {
                        results = resultsBlockCollegeTab();
                    }
                    return results;
                }

                function resultsBlockShoolTab() {
                    return `<div class="results-education">
                    <p class="results-label">Выбранная запись</p>
                    <div class="results-editable-block">
                        <p class="results-editable-text-bold">${result.name ? result.name : '_'} ${result.region ? result.region : '_'}</p>
                        <div class="block-edit-button"></div>
                    </div>
                    <div class="results-block-row">
                        <div class="results-block-col first-col">
                            <div class="results-table-row">
                                <p class="results-value-label">Альтер. название</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.alternativeName ? result.alternativeName : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Статус</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.status ? result.status : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Юр. адрес</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.legalAddress ? result.legalAddress : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Директор</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.director ? result.director : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ИНН</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.INN ? result.INN : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">КПП</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.KPP ? result.KPP : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ОГРН</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OGRN ? result.OGRN : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ОКАТО</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKATO ? result.OKATO : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ОКТМО</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKTMO ? result.OKTMO : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ОКПО</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKPO ? result.OKPO : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ОКОГУ</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKOGU ? result.OKOGU : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ОКФС</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKFS ? result.OKFS : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>

                            ${result.OKVED.map(okved => `
                            <div class="results-table-row">
                                <p class="results-value-label">ОКВЭД</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${okved ? okved : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            `).join('')}

                            ${result.formerNames.map(name => `
                            <div class="results-table-row">
                                <p class="results-value-label">Бывш.1</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text editable-wide">${name ? name : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            `).join('')}

                        </div>
                        <div class="results-block-col second-col">
                            <div class="results-table-row">
                                <p class="results-value-label">Телефон</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.phone ? result.phone : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Email</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.email ? result.email : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>`;
                }

                function resultsBlockCollegeTab() {
                    return `<div class="results-education">
                    <p class="results-label">Выбранная запись</p>
                    <div class="results-editable-block">
                        <p class="results-editable-text-bold">${result.name ? result.name : '_'}</p>
                        <div class="block-edit-button"></div>
                    </div>
                    <div class="results-block-row">
                        <div class="results-block-col first-col">
                            <div class="results-table-row">
                                <p class="results-value-label">Альтер. название</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.alternativeName ? result.alternativeName : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Статус</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.status ? result.status : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Юр. адрес</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.legalAddress ? result.legalAddress : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Директор</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.director ? result.director : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ИНН</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.INN ? result.INN : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">КПП</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.KPP ? result.KPP : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ОГРН</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OGRN ? result.OGRN : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ОКАТО</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKATO ? result.OKATO : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ОКТМО</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKTMO ? result.OKTMO : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ОКПО</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKPO ? result.OKPO : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ОКОГУ</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKOGU ? result.OKOGU : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ОКФС</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.OKFS ? result.OKFS : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
        
                            ${result.OKVED.map(okved => `
                            <div class="results-table-row">
                                <p class="results-value-label">ОКВЭД</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${okved ? okved : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            `).join('')}
        
                            ${result.formerNames.map(name => `
                            <div class="results-table-row">
                                <p class="results-value-label">Бывш.1</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text editable-wide">${name ? name : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            `).join('')}
        
                        </div>
                        <div class="results-block-col second-col">
                            <div class="results-table-row">
                                <p class="results-value-label">Телефон</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.phone ? result.phone : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Email</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.email ? result.email : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                }    
            },  
            handleSearch: function(value, array) {
                return handleRadioButton();
                function handleRadioButton() {
                    const wrapper = document.querySelector('#tab-button-wrapper');
                    const tab = wrapper.getAttribute('activeValue');
                    
                    let results;
                    if (tab == 1) {
                        results = handleSearchShoolTab();
                    } else if (tab == 2) {
                        results = handleSearchCollegeTab();
                    }
                    return results;
                }

                function handleSearchShoolTab() {
                    const results = [];
                    let separatedString = separateWords(value);
    
                    altNamesForResults = [];
                    
                    array.forEach((obj) => {
                        let everyWordFounded = true;
    
                        separatedString.forEach((word) => {
                            if (
                                checkMatchesInWords(obj.name, word) ||
                                checkMatchesInWords(obj.region, word) ||
                                isOneOfAltNames(obj, word) ||
                                obj.INN.toLowerCase().includes(word.toLowerCase()) ||
                                checkMatchesInWords(obj.legalAddress, word) ||
                                obj.alternativeName.toLowerCase().includes(word.toLowerCase())
                            ) {
                            } else {
                                everyWordFounded = false;
                            }
                        })
    
                        if (everyWordFounded) {
                            results.push(obj);
                        }
                    });
    
                    altNamesForResults.forEach((obj) => {
                        results.push(obj);
                    })
    
                    function isOneOfAltNames(obj, word) {
                        let findedInNames = false;
                        obj.formerNames.forEach(name => {
                            if (checkMatchesInWords(name, word)) {
                                findedInNames = true;
                                
                                if (!altNamesForResults.some(item => item.name === name)) {
                                    altNamesForResults.push({
                                        altNamesHint: true,
                                        name: name,
                                        obj: obj
                                    })
                                }
                            }
                        })
                        return findedInNames;
                    }
    
                    function checkMatchesInWords(stringFromObj, valueWord) {
                        strFromObjArray = separateWords(stringFromObj);
    
                        isMatchesFinded = false;
    
                        strFromObjArray.forEach(str => {
                            if (str.toLowerCase().includes(valueWord.toLowerCase())) {
                                isMatchesFinded = true;
                            }
                        })
    
                        return isMatchesFinded;
                    }
    
                    function separateWords(str) {
                        try {
                            return str.split(" ").filter(word => word !== '');
                        } catch(e) {
                            console.log(`Error separating string: ${str}\nError: ${e}`)
                        }
                    }
                    
                    return results;
                }

                function handleSearchCollegeTab() {
                    const results = [];
                    
                    let separatedString = separateWords(value);

                    let lowerCaseArray = separatedString.map(word => word.toLowerCase());

                    altNamesForResults = [];
                    
                    array.forEach((obj) => {
                        let everyWordFounded = true;

                        separatedString.forEach((word) => {
                            if (word.toLowerCase() == 'инн') {

                            } else if (
                                checkMatchesInWords(obj.name, word) ||
                                isOneOfAltNames(obj, word) ||
                                obj.INN.toLowerCase().includes(word.toLowerCase()) ||
                                checkMatchesInWords(obj.legalAddress, word) ||
                                obj.alternativeName.toLowerCase().includes(word.toLowerCase())
                            ) {
                            } else {
                                everyWordFounded = false;
                            }
                        })

                        if (everyWordFounded) {
                            results.push(obj);
                        }
                    });

                    altNamesForResults.forEach((obj) => {
                        results.push(obj);
                    })

                    function isOneOfAltNames(obj, word) {
                        let findedInNames = false;
                        obj.formerNames.forEach(name => {
                            if (checkMatchesInWords(name, word)) {
                                findedInNames = true;
                                
                                if (!altNamesForResults.some(item => item.name === name)) {
                                    altNamesForResults.push({
                                        altNamesHint: true,
                                        name: name,
                                        obj: obj
                                    })
                                }
                            }
                        })
                        return findedInNames;
                    }

                    function checkMatchesInWords(stringFromObj, valueWord) {
                        strFromObjArray = separateWords(stringFromObj, valueWord);

                        isMatchesFinded = false;

                        strFromObjArray.forEach(str => {
                            if (str.toLowerCase().includes(valueWord.toLowerCase())) {
                                isMatchesFinded = true;
                            }
                        })

                        return isMatchesFinded;
                    }

                    function separateWords(str) {
                        try {
                            let result = str.split(" ").filter(word => word !== '');

                            return result;
                        } catch(e) {
                            console.log(`Error separating string: ${str}\nError: ${e}`)
                        }
                    }
                    
                    return results;
                }
            },
            getHint(hint, index, value, self) {
                return handleRadioButton();
                function handleRadioButton() {
                    const wrapper = document.querySelector('#tab-button-wrapper');
                    const tab = wrapper.getAttribute('activeValue');

                    let results;
                    if (tab == 1) {
                        results = getHintShoolTab();
                    } else if (tab == 2) {
                        results = getHintCollegeTab();
                    }
                    return results;
                }

                function getHintShoolTab() {
                    if (typeof hint.altNamesHint == 'undefined') {
                        let title = `${hint.name}`;
                        let altNamesStr = `${hint.formerNames ? hint.formerNames.map((alt, index) => `${alt}${hint.formerNames.length - 1 !== index ? `, <br/>` : ''}`).join('') : ``}`;
    
                        let titleArray = title.split('');
                        title = titleArray.join('');
    
                        const hintCard = document.createElement('div');
                        hintCard.classList.add('hint-card');
                        hintCard.classList.add('hint-card-one-line');
                        hintCard.classList.add('educationalInstitutionsTab');
                        hintCard.innerHTML = `
                            <h3 class="hint-title">${getHintTitleWithColor(title, value)}</h3>
                            <h3 class="hint-title">${getHintTitleWithColor(hint.region, value)}</h3>
                            <p class="hint-subtitle">бывш. ${altNamesStr}</p>
                            `;
    
                        hintCard.addEventListener('click', () => {
                            const results = self.handleSearch(value, self.params.data);
                            self.showResults(results[index]);
                            setValueOnClick(results[index]);
                        });

                        function setValueOnClick(hint) {
                            const searchForm = document.querySelector('#search-input');
                            searchForm.value = hint.name + hint.region;
                        }
    
                        return hintCard;
                    } else {
                        let title = `${hint.name}`;
                        let inn = `${hint.obj.INN}`;
                        let nameNow = `сейчас ${hint.obj.alternativeName}`;
                        let fullNameNow = `${hint.obj.name}`
                        let address = `${hint.obj.legalAddress}`;
    
                        let titleArray = title.split('');
                        title = titleArray.join('');
    
                        const hintCard = document.createElement('div');
                        hintCard.classList.add('hint-card');
                        hintCard.classList.add('hint-card-one-line');
                        hintCard.classList.add('educationalInstitutionsTab');
                        hintCard.innerHTML = `
                            <h3 class="hint-title">${getHintTitleWithColor(title, value)}</h3>
                            <p class="hint-subtitle">ИНН ${getHintTitleWithColor(inn, value)}</p>
                            <p class="hint-subtitle">${getHintTitleWithColor(nameNow, value)}</p>
                            <p class="hint-subtitle">${getHintTitleWithColor(fullNameNow, value)}</p>
                            <p class="hint-subtitle">${getHintTitleWithColor(address, value)}</p>
                            `;
    
                        hintCard.addEventListener('click', () => {
                            const results = self.handleSearch(value, self.params.data);
                            self.showResults(results[index]);
                            setValueOnClick(results[index]);
                        });

                        function setValueOnClick(hint) {
                            const searchForm = document.querySelector('#search-input');
                            searchForm.value = hint.name + hint.region;
                        }
    
                        return hintCard;
                    }
    
                }

                function getHintCollegeTab() {
                    if (typeof hint.altNamesHint == 'undefined') {
                        let title = `${hint.alternativeName}`;
                        let inn = `${hint.INN}`;
                        let name = `${hint.name}`;
                        let address = `${hint.legalAddress}`;
                        let altNamesStr = `${hint.formerNames ? hint.formerNames.map((alt, index) => `${alt}${hint.formerNames.length - 1 !== index ? ', ' : ''}`).join('') : ``}`;
            
                        let titleArray = title.split('');
                        title = titleArray.join('');
            
                        const hintCard = document.createElement('div');
                        hintCard.classList.add('hint-card');
                        hintCard.classList.add('hint-card-one-line');
                        hintCard.innerHTML = `
                            <h3 class="hint-title">${getHintTitleWithColor(title, value)}</h3>
                            <p class="hint-subtitle">ИНН ${getHintTitleWithColor(inn, value)}</p>
                            <p class="hint-subtitle">${getHintTitleWithColor(name, value)}</p>
                            <p class="hint-subtitle">${getHintTitleWithColor(address, value)}</p>
                            <p class="hint-subtitle">бывш. ${getHintTitleWithColor(altNamesStr, value)}</p>
                            `;
            
                        hintCard.addEventListener('click', () => {
                            const results = self.handleSearch(value, self.params.data);
                            self.showResults(results[index]);
                            setValueOnClick(results[index]);
                        });

                        function setValueOnClick(hint) {
                            const searchForm = document.querySelector('#search-input');
                            searchForm.value = `ИНН ${hint.INN} ${hint.alternativeName}`;
                        }
            
                        return hintCard;
                    } else {
                        let title = `${hint.name}`;
                        let inn = `${hint.obj.INN}`;
                        let nameNow = `сейчас ${hint.obj.alternativeName}`;
                        let fullNameNow = `${hint.obj.name}`
                        let address = `${hint.obj.legalAddress}`;
            
                        let titleArray = title.split('');
                        title = titleArray.join('');
            
                        const hintCard = document.createElement('div');
                        hintCard.classList.add('hint-card');
                        hintCard.classList.add('hint-card-one-line');
                        hintCard.innerHTML = `
                            <h3 class="hint-title">${getHintTitleWithColor(title, value)}</h3>
                            <p class="hint-subtitle">ИНН ${getHintTitleWithColor(inn, value)}</p>
                            <p class="hint-subtitle">${getHintTitleWithColor(nameNow, value)}</p>
                            <p class="hint-subtitle">${getHintTitleWithColor(fullNameNow, value)}</p>
                            <p class="hint-subtitle">${getHintTitleWithColor(address, value)}</p>
                            `;
            
                        hintCard.addEventListener('click', () => {
                            const results = self.handleSearch(value, self.params.data);
                            self.showResults(results[index]);
                            setValueOnClick(results[index]);
                        });

                        function setValueOnClick(hint) {
                            const searchForm = document.querySelector('#search-input');
                            searchForm.value = `ИНН ${hint.INN} ${hint.alternativeName}`;
                        }
            
                        return hintCard;
                    }
                }
                
                function getHintTitleWithColor(hint, value) {

                    const hintWords = separateWords(hint);
                    const valueWords = separateWords(value);

                    let result = '';

                    hintWords.forEach(hintWord => {
                        let maxMatches = 0;
                        let maxMatchedWord = '';

                        valueWords.forEach(valueWord => {
                            const matchesNum = findMatches(valueWord, hintWord);
                            if (matchesNum > maxMatches) {
                                maxMatchedWord = valueWord;
                                maxMatches = matchesNum;
                            }
                        })

                        result += getPart(maxMatchedWord, hintWord) + ' ';
                    })
                    
                    function getPart(str1, str2) {
                        if (str2.toLowerCase().includes(str1.toLowerCase())) {
                            const except = '”“\"'

                            let result = '';
                            const matches = findMatches(str1, str2);

                            result += '<span class="hint-color-text">';
                            let spanClosed = false;
                            for (let i = 0; i < str2.length; i++) {
                                if (i >= matches) {
                                    result += `</span>`;
                                    spanClosed = true;
                                }
                                result += str2[i];
                            }

                            if (!spanClosed) {
                                result += `</span>`;
                            }

                            return result
                        } else {
                            return str2;
                        }
                    }

                    getPart(hint, value)
    
                    function findMatches(str1, str2) {
                        let n = 0;
                        const minLength = Math.min(str1.length, str2.length);
                        
                        for (let i = 0; i < minLength; i++) {
                            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                                n += 1;
                            } else {
                                break;
                            }
                        }
                        
                        return n;
                    }
                    function separateWords(str) {
                        try {
                            return str.split(" ");
                        } catch(e) {
                            console.log(`Error separating string: ${str}\nError: ${e}`)
                        }
                    }
                    
                    return result;
                }
            },

            data: {
                twoTabsArray: true,
                schoolTab: [{
                    name: "Гимназия №25 им. А.С. Пушкина",
                    region: 'город Нижний Новгород, Сормовский район',
                    alternativeName: "",
                    status: "Действующая организация",
                    legalAddress: "603022, город Нижний Новгород, проспект Гагарина, дом 3",
                    director: "Захаров Алексей Евгеньевич, ИНН 526200537777",
                    INN: "5262217031",
                    KPP: "526201001",
                    OGRN: "1075262018138",
                    OKATO: "22401379000",
                    OKTMO: "22701000001",
                    OKPO: "82374902",
                    OKOGU: "4210014",
                    OKFS: "16",
                    OKVED: [
                        '58.13',
                        '58.13',
                    ],
                    formerNames: [
                        'Школа №25 МБОУ',
                        'Гимназия №25 им. А.С. Пушкина'
                    ],
                    phone: "+7 952 7770000",
                    email: "",
                    isBranch: false
                },],
                collegeTab: [
                    {
                        name: "Петербургский государственный университет путей сообщения Императора Александра I",
                        alternativeName: "ПГУПС",
                        status: "",
                        legalAddress: "190031, город Санкт-Петербург, Московский проспект, дом 9",
                        director: "",
                        INN: "7812009592",
                        KPP: "",
                        OGRN: "",
                        OKATO: "",
                        OKTMO: "",
                        OKPO: "",
                        OKOGU: "",
                        OKFS: "",
                        OKVED: [],
                        formerNames: [
                            'ЛИИЖТ им.Образцова',
                            'ЛИИПС',
                            'ИИПС'
                        ],
                        phone: "",
                        email: "",
                        isBranch: false
                    },
                    {
                        name: "Великолукский филиал федерального государственного бюджетного образовательного учреждения высшего образования \"Петербургский государственный университет путей сообщения Императора Александра I\"",
                        alternativeName: "ПГУПС (ВФ)",
                        status: "",
                        legalAddress: "182101, Псковская область, город Великие Луки, проспект Гагарина, дом 95",
                        director: "",
                        INN: "7812009592",
                        KPP: "",
                        OGRN: "",
                        OKATO: "",
                        OKTMO: "",
                        OKPO: "",
                        OKOGU: "",
                        OKFS: "",
                        OKVED: [],
                        formerNames: [
                            'ЛИИЖТ им.Образцова',
                            'ЛИИПС',
                            'ИИПС'
                        ],
                        phone: "",
                        email: "",
                        isBranch: true
            
                    },
                    {
                        name: "Петрозаводский  филиал федерального государственного бюджетного образовательного учреждения высшего образования \"Петербургский государственный университет путей сообщения Императора Александра I\"",
                        alternativeName: "ПГУПС (ПФ)",
                        status: "",
                        legalAddress: "185035, Республика Карелия, город  Петрозаводск, улица Анохина, дом 1",
                        director: "",
                        INN: "7812009592",
                        KPP: "",
                        OGRN: "",
                        OKATO: "",
                        OKTMO: "",
                        OKPO: "",
                        OKOGU: "",
                        OKFS: "",
                        OKVED: [],
                        formerNames: [
                            'ЛИИЖТ им.Образцова',
                            'ЛИИПС',
                            'ИИПС'
                        ],
                        phone: "",
                        email: "",
                        isBranch: true
            
                    },
                    {
                        name: "Филиал федерального государственного бюджетного образовательного учреждения высшего образования \"Петербургский государственный университет путей сообщения Императора Александра I\" в г. Брянске",
                        alternativeName: "ПГУПС (БФ)",
                        status: "",
                        legalAddress: "241020, город Брянск, улица Дзержинского, дом 47",
                        director: "",
                        INN: "7812009592",
                        KPP: "",
                        OGRN: "",
                        OKATO: "",
                        OKTMO: "",
                        OKPO: "",
                        OKOGU: "",
                        OKFS: "",
                        OKVED: [],
                        formerNames: [
                            'ЛИИЖТ им.Образцова',
                            'ЛИИПС',
                            'ИИПС'
                        ],
                        phone: "",
                        email: "",
                        isBranch: true
            
                    },
                    {
                        name: "Филиал федерального государственного бюджетного образовательного учреждения высшего образования \"Петербургский государственный университет путей сообщения Императора Александра I\" в г. Калининграде",
                        alternativeName: "ПГУПС (КФ)",
                        status: "",
                        legalAddress: "236039, город Калининград, улица Южновокзальная, дом 9",
                        director: "",
                        INN: "7812009592",
                        KPP: "",
                        OGRN: "",
                        OKATO: "",
                        OKTMO: "",
                        OKPO: "",
                        OKOGU: "",
                        OKFS: "",
                        OKVED: [],
                        formerNames: [
                            'ЛИИЖТ им.Образцова',
                            'ЛИИПС',
                            'ИИПС'
                        ],
                        phone: "",
                        email: "",
                        isBranch: true
            
                    },
                    {
                        name: "Филиал федерального государственного бюджетного образовательного учреждения высшего образования \"Петербургский государственный университет путей сообщения Императора Александра I\" в г. Калининграде",
                        alternativeName: "ПГУПС (КФ)",
                        status: "",
                        legalAddress: "236039, город Калининград, улица Южновокзальная, дом 9",
                        director: "",
                        INN: "7812009592",
                        KPP: "",
                        OGRN: "",
                        OKATO: "",
                        OKTMO: "",
                        OKPO: "",
                        OKOGU: "",
                        OKFS: "",
                        OKVED: [],
                        formerNames: [
                            'ЛИИЖТ им.Образцова',
                            'ЛИИПС',
                            'ИИПС'
                        ],
                        phone: "",
                        email: "",
                        isBranch: true
            
                    },
                    {
                        name: "Филиал федерального государственного бюджетного образовательного учреждения высшего образования \"Петербургский государственный университет путей сообщения Императора Александра I\" в г. Калуге",
                        alternativeName: "ПГУПС (КФ)",
                        status: "",
                        legalAddress: "248000, город Калуга, улица Вилонова, дом 11 ",
                        director: "",
                        INN: "7812009592",
                        KPP: "",
                        OGRN: "",
                        OKATO: "",
                        OKTMO: "",
                        OKPO: "",
                        OKOGU: "",
                        OKFS: "",
                        OKVED: [],
                        formerNames: [
                            'ЛИИЖТ им.Образцова',
                            'ЛИИПС',
                            'ИИПС'
                        ],
                        phone: "",
                        email: "",
                        isBranch: true
            
                    },
                    {
                        name: "Филиал федерального государственного бюджетного образовательного учреждения высшего образования \"Петербургский государственный университет путей сообщения Императора Александра I\" в г. Орле",
                        alternativeName: "ПГУПС (ОФ)",
                        status: "Действующая организация",
                        legalAddress: "302004, город Орёл, улица Студенческая, дом 2",
                        director: "Захаров Алексей Евгеньевич, ИНН 526200537777",
                        INN: "7812009592",
                        KPP: "526201001",
                        OGRN: "1075262018138",
                        OKATO: "22401379000",
                        OKTMO: "22701000001",
                        OKPO: "82374902",
                        OKOGU: "4210014",
                        OKFS: "16",
                        OKVED: [
                            '85.22',
                            '85.21'
                        ],
                        formerNames: [
                            'ЛИИЖТ им.Образцова',
                            'ЛИИПС',
                            'ИИПС'
                        ],
                        phone: "+7 952 7770000",
                        email: "",
                        isBranch: true
            
                    },
                ],
            },
            label: {
                schoolTab: 'Номер, название, ИНН или адрес школы',
                collegeTab: 'Названия, ИНН или адрес учебного заведения'
            },
            maxHints: 9,
        },
        legalEntitiesTab: {
            resultsBlock: function(result) {
                return `<div class="results-legalentities">
                    <p class="results-label">Выбранная запись</p>
                    <div class="results-editable-block">
                        <p class="results-editable-text-bold">${result.organization ? result.organization : '_'}</p>
                        <div class="block-edit-button"></div>
                    </div>
                    <p class="results-id">Id ${result.id ? result.id : '_'}</p>
                </div>`
            },
            handleSearch: function(value, array) {
                const results = [];
                
                array.forEach((obj) => {
                    if (
                        obj.shortName.toLowerCase().includes(value.toLowerCase()) ||
                        obj.organization.toLowerCase().includes(value.toLowerCase())
                    ) {
                        results.push(obj);
                    }
                });

                return results;
            },
            getHint(hint, index, value, self) {
                const title = hint.shortName;
                const subtitle = hint.organization;


                const hintCard = document.createElement('div');
                hintCard.classList.add('hint-card');
                hintCard.classList.add('hint-card-one-line');
                hintCard.classList.add('legalEntitiesTab');
                hintCard.innerHTML = `
                <h3 class="hint-title">${getHintTitleWithColor(title, value)}</h3>
                <p class="hint-subtitle">${subtitle}</p>`;
                hintCard.addEventListener('click', () => {
                    const results = self.handleSearch(value, self.params.data);
                    self.showResults(results[index]);
                    setValueOnClick(results[index]);
                });

                function setValueOnClick(hint) {
                    const searchForm = document.querySelector('#search-input');
                    searchForm.value = hint.shortName;
                }

                function getHintTitleWithColor(full, value) {
                    const matches = findMatches(full, value);
                    let result = '<span class="hint-color-text">';
    
                    for (let i = 0; i < full.length; i++) {
                        if (i === matches) {
                            result += `</span>`;
                        }
                        result += full[i]
                    }
    
                    function findMatches(str1, str2) {
                        let n = 0;
                        const minLength = Math.min(str1.length, str2.length);
                        
                        for (let i = 0; i < minLength; i++) {
                            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                                n += 1;
                            } else {
                                break;
                            }
                        }
                        
                        return n;
                    }
                    return result;
                }

                return hintCard;
            },
            data: [
                {
                    organization: "Государственное бюджетное образовательное учреждение начального профессионального образования",
                    id: "291",
                    shortName: "ГБОУ НПО"
                },
                {
                    organization: "Государственное бюджетное образовательное учреждение среднего профессионального образования",
                    id: "291",
                    shortName: "ГБОУ СПО"
                },
                {
                    organization: "Государственное бюджетное профессиональное образовательное учреждение",
                    id: "291",
                    shortName: "ГБПОУ"
                },
                {
                    organization: "Государственное бюджетное учреждение",
                    id: "291",
                    shortName: "ГБУ"
                },
                {
                    organization: "Государственное бюджетное учреждение здравоохранения",
                    id: "291",
                    shortName: "ГБУЗ"
                },
                {
                    organization: "Государственное бюджетное учреждение здравоохранения Нижегородской области",
                    id: "291",
                    shortName: "ГБУЗ НО"
                },
            ],
            label: 'Сокращенные юр.формы',
            maxHints: 7,
        },
        alternativeTab: {
            resultsBlock: function(result) {
                return `<div class="results-alternatives">
                <table>
                    <tr>
                        <th class="first-table-col">ID</th>
                        <th class="table-r-border-none">${result.id}</th>
                        <th class="table-border-l-none"></th>
                    </tr>
                    <tr>
                        <th class="first-table-col">Аббревиатура ИНН, год</th>
                        <th class="table-r-border-none">${result.abbreviationAndYear.abbreviation + '<br/>'}
                            ${result.abbreviationAndYear.INN}</th>
                        <th class="table-border-l-none">${result.abbreviationAndYear.year}</th>
                    </tr>
                    <tr>
                        <th class="first-table-col">Полное название</th>
                        <th class="table-r-border-none" id="cell1">
                            <p>
                                ${result.fullName + '\n' + result.city}
                            </p>
                        </th>
                        <th class="table-border-l-none table-border-l-none-with-button">
                            <div class="table-edit-button" forCell="cell1"></div>
                        </th>
                    </tr>
                    <tr>
                        <td rowspan="4" class="first-table-col alt-name">Альтернативные названия</td>
                        <td class="table-r-border-none">${result.alternativeNames[0].name + '<br/>'}
                            ${result.alternativeNames[0].fullName}</td>
                        <td class="table-border-l-none">${result.alternativeNames[0].year}</td>
                    </tr>
                    <tr>
                        <td class="table-r-border-none">${result.alternativeNames[1].name + '<br/>'}
                            ${result.alternativeNames[1].fullName}</td>
                        <td class="table-border-l-none">${result.alternativeNames[1].year}</td>
                    </tr>
                    <tr>
                        <td class="table-r-border-none">${result.alternativeNames[2].name + '<br/>'}
                            ${result.alternativeNames[2].fullName}</td>
                        <td class="table-border-l-none">${result.alternativeNames[2].year}</td>
                    </tr>
                    <tr>
                        <td class="table-r-border-none">${result.alternativeNames[3].name + '<br/>'}
                            ${result.alternativeNames[3].fullName}</td>
                        <td class="table-border-l-none">${result.alternativeNames[3].year}</td>
                    </tr>
                    <tr>
                        <th class="first-table-col">Адрес</th>
                        <th class="table-r-border-none" id="cell2">
                            <p>                    
                                ${result.address}
                            <p/>    
                        </th>
                        <th class="table-border-l-none table-border-l-none-with-button">
                            <div class="table-edit-button" forCell="cell2"></div>
                        </th>
                    </tr>
                </table>
            </div>            
                `
            },
            handleSearch: function(value, array) {
                const results = [];
                const separatedString = separateWords(value);
                
                array.forEach((obj) => {
                    let everyWordFounded = true;

                    separatedString.forEach((word) => {
                        if (
                            checkMatchesInWords(obj.fullName, word) ||
                            obj.abbreviationAndYear.abbreviation.toLowerCase().includes(word.toLowerCase())
                        ) {} else {
                            everyWordFounded = false;
                        }
                    })

                    if (everyWordFounded) {
                        results.push(obj);
                    }
                });

                function checkMatchesInWords(stringFromObj, valueWord) {
                    strFromObjArray = separateWords(stringFromObj, valueWord);

                    isMatchesFinded = false;

                    strFromObjArray.forEach(str => {
                        if (str.toLowerCase().includes(valueWord.toLowerCase())) {
                            isMatchesFinded = true;
                        }
                    })

                    return isMatchesFinded;
                }

                function separateWords(str) {
                    return str.split(" ").filter(word => word !== '');
                }
                
                return results;
            },
            getHint(hint, index, value, self) {
                const abbreviation = hint.abbreviationAndYear.abbreviation ? hint.abbreviationAndYear.abbreviation : '';
                const fullName = hint.fullName ? hint.fullName : '';
                const address = hint.address ? hint.address : '';

                let title = `${abbreviation}`;
                let subtitle = `${fullName}`;

                let altNamesStr = `${hint.alternativeNames ? hint.alternativeNames.map((alt, index) => `${alt.name}${hint.alternativeNames.length - 1 !== index ? ', ' : ''}`).join('') : ``}`;

                let titleArray = title.split('');
                title = titleArray.join('');

                const hintCard = document.createElement('div');
                hintCard.classList.add('hint-card');
                hintCard.classList.add('hint-card-one-line');
                hintCard.classList.add('alternativeTab');
                hintCard.innerHTML = `
                    <h3 class="hint-title">${getHintTitleWithColor(title, value)}</h3>
                    <p class="hint-subtitle">${getHintTitleWithColor(subtitle, value)}</p>
                    <p class="hint-subtitle">бывш. ${getHintTitleWithColor(altNamesStr, value)}</p>
                    <p class="hint-subtitle">${getHintTitleWithColor(address, value)}</p>`;

                hintCard.addEventListener('click', () => {
                    const results = self.handleSearch(value, self.params.data);
                    self.showResults(results[index]);
                    setValueOnClick(results[index]);
                });

                function setValueOnClick(hint) {
                    const searchForm = document.querySelector('#search-input');
                    searchForm.value = hint.fullName;
                }

                function getHintTitleWithColor(hint, value) {

                    const hintWords = separateWords(hint);
                    const valueWords = separateWords(value);

                    let result = '';

                    hintWords.forEach(hintWord => {
                        let maxMatches = 0;
                        let maxMatchedWord = '';

                        valueWords.forEach(valueWord => {
                            const matchesNum = findMatches(valueWord, hintWord);
                            if (matchesNum > maxMatches) {
                                maxMatchedWord = valueWord;
                                maxMatches = matchesNum;
                            }
                        })

                        result += getPart(maxMatchedWord, hintWord) + ' ';
                    })
                    
                    function getPart(str1, str2) {
                        if (str2.toLowerCase().includes(str1.toLowerCase())) {
                            const except = '”“\"'

                            let result = '';
                            const matches = findMatches(str1, str2);

                            result += '<span class="hint-color-text">';
                            let spanClosed = false;
                            for (let i = 0; i < str2.length; i++) {
                                if (i >= matches) {
                                    result += `</span>`;
                                    spanClosed = true;
                                }
                                result += str2[i];
                            }
                            
                            if (!spanClosed) {
                                result += `</span>`;
                            }

                            return result;
                        } else {
                            return str2;
                        }
                    }

                    getPart(hint, value)
    
                    function findMatches(str1, str2) {
                        let n = 0;
                        const minLength = Math.min(str1.length, str2.length);
                        
                        for (let i = 0; i < minLength; i++) {
                            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                                n += 1;
                            } else {
                                break;
                            }
                        }
                        
                        return n;
                    }
                    function separateWords(str) {
                        return str.split(" ");
                    }
                    
                    return result;
                }

                return hintCard;
            },        
            data: [
                {
                    id: "1020",
                    abbreviationAndYear: {
                        abbreviation: "ННГАСУ",
                        INN: "5260002707",
                        year: "1997"
                    },
                    fullName: "Нижегородский государственный архитектурно-строительный университет",
                    city: 'Нижний Новгород',

                    alternativeNames: [
                        {
                            name: "НГАСА",
                            fullName: "Нижегородская государственная архитектурно-строительная академия",
                            year: "1993"
                        },
                        {
                            name: "НАСИ",
                            fullName: "Нижегородский ордена Трудового Красного Знамени архитектурно-строительный институт",
                            year: "1991"
                        },
                        {
                            name: "ГИСИ им В.П. Чкалова",
                            fullName: "Горьковский инженерно-строительный институт им. В.П.Чкалова",
                            year: "1938"
                        },
                        {
                            name: "ГИСИ",
                            fullName: "Горьковский инженерно-строительный институт",
                            year: "1932"
                        }
                    ],
                    address: '603000, город Нижний Новгород, улица Ильинская, дом 65'
                }
            ],
            label: 'Альтернативное название',
            maxHints: 7,
        },
        branchesTab: {
            resultsBlock: function(result) {
                addsubtitleToHint();
                function addsubtitleToHint() {

                }

                return `<div class="results-branches">
                <table class="desktop-table">
                    <tr>
                        <th class="first-table-col grey-table-cell first-table-col">ID</th>
                        <th class="table-r-border-none grey-table-cell second-table-col">
                            ИНН<br/>
                            Статус/Дата ликв.<br/>
                            Название без ЮФ<br/>
                            <span class="abbr-name">Сокращенное название<span/>
                        </th>
                        <th class="table-border-l-none grey-table-cell third-table-col">Полное название</th>
                        <th class="table-border-l-none grey-table-cell fourth-table-col">
                            Адрес<br/>
                            ОКВЭД
                        </th>
                    </tr>

                    ${result.branches ? result.branches.map((branch) => `
                        <tr>
                            <th class="first-table-col grey-table-cell first-table-col">${branch.id ? branch.id : '_'}</th>
                            <th class="table-r-border-none second-table-col">
                                ${branch.INN ? branch.INN + '<br/>' : '_'}
                                ${branch.statusOrLiquidationDate ? branch.statusOrLiquidationDate + '<br/>' : '_'}
                                ${branch.nameWithoutLegalForm ? branch.nameWithoutLegalForm + '<br/>' : '_'}
                                ${branch.abbreviation ? branch.abbreviation : '_'}
                            </th>
                            <th class="table-border-l-none cell-with-editing third-table-col">
                                <div class="incell">
                                    <p>${branch.fullName ? branch.fullName : '_'}</p>    
                                    <div class="table-edit-button"></div>
                                </div>
                            </th>
                            <th class="table-border-l-none fourth-table-col">
                                ${branch.address ? branch.address + '<br/>' : '_'}    
                                ${branch.OKVED ? branch.OKVED : '_'}    
                            </th>
                        </tr>
                    `).join('') : ``}

                </table>
                <table class="mobile-table">
                    <tr class="mobile-table-titles">
                        <td class="first-table-col">ID</td>
                        <td>ИНН
                            Статус/Дата ликв.
                            Название без ЮФ
                            Сокр. название</td>
                        <td>Адрес
                            ОКВЭД</td>
                    </tr>
                    
                    <tr>
                        <th colspan="3" class="second-table-col mobile-cell-editable">
                            <div class="mobile-cell-editable-text">
                                <div>
                                    <p class="cell-label mobile-table-titles">Полное название</p>
                                    <p id="cell-full-name">Государственное бюджетное профессиональное образовательное учреждение Нижегородской области "Нижегородский медицинский колледж"</p>
                                </div>
                                <div class="table-edit-button" forCell="cell-full-name"></div>
                            </div>
                        </th>
                    </tr>

                    <tr class="mobile-table-titles-black">
                        <td class="first-table-col">1020</td>
                        <td>5258024460
                        Действующее
                        НМК
                        ГБПОУ НО НМК</td>
                        <td>город Нижний Новгород, улица Июльских дней, дом 8
                        85.21</td>
                    </tr>
                </table>
            </div>`
            },
            handleSearch: function(value, array) {
                const results = {
                    multiHint: true,
                    array: []
                };
                const separatedString = separateWords(value);

                array.forEach((obj) => {
                    let atleastOneBranchMatched = false;

                    obj.branches.forEach((branch) => {
                        let everyWordInBranchFounded = true;

                        separatedString.forEach((word) => {
                            if (
                                checkMatchesInWords(branch.fullName, word) ||
                                branch.INN.toLowerCase().includes(word.toLowerCase()) ||
                                branch.abbreviation.toLowerCase().includes(word.toLowerCase())
                            ) {
                            } else {
                                everyWordInBranchFounded = false;
                            }
                        })

                        if (everyWordInBranchFounded) {
                            branch.showThisHintOfMultiHints = true;
                            atleastOneBranchMatched = true;
                        }
                    })

                    if (atleastOneBranchMatched) {
                        results.array.push(obj);
                    }
                });

                function checkMatchesInWords(stringFromObj, valueWord) {
                    strFromObjArray = separateWords(stringFromObj, valueWord);

                    isMatchesFinded = false;

                    strFromObjArray.forEach(str => {
                        if (str.toLowerCase().includes(valueWord.toLowerCase())) {
                            isMatchesFinded = true;
                        }
                    })

                    return isMatchesFinded;
                }

                function separateWords(str) {
                    return str.split(" ").filter(word => word !== '');
                }
            
                return results;
            },
            getHint(hint, i, value, self) {
                const hintsArray = [];

                hint.branches.forEach((branch, index) => {
                    const abbreviation = branch.abbreviation;
                    const fullName = branch.fullName;
                    const address = branch.address;
    
                    const title = getHintTitleWithColor(abbreviation, value);
                    const subtitleName = getHintTitleWithColor(fullName, value);
                    const subtitleAddress = getHintTitleWithColor(address, value);
    
                    const branchesInfo = getBranchesInfo(hint, index); 
                    
                    const hintCard = document.createElement('div');
                    hintCard.classList.add('hint-card');
                    hintCard.classList.add('hint-card-one-line');
                    hintCard.classList.add('branchesTab');
                    hintCard.innerHTML = `
                        <h3 class="hint-title"><span class="hint-color-text">${title}</span></h3>
                        <p class="hint-subtitle">${subtitleName}</p>
                        <p class="hint-subtitle">${subtitleAddress}</p>
                        <p class="hint-subtitle">${branchesInfo}</p>
                    `;
                    hintCard.addEventListener('click', () => {
                        const results = self.handleSearch(value, self.params.data);
                        
                        self.showResults(results.array[i]);
                        setValueOnClick(results.array[i]);

                        /* if (typeof results.multiHint !== 'undefined') {
                            console.log(1, results)
                            self.showResults(results.array[index]);
                        } else {
                            console.log(2, results)
                            self.showResults(results[index]);
                        } */
                    });

                    function setValueOnClick(hint) {
                        const searchForm = document.querySelector('#search-input');
                        console.log(hint)
                        searchForm.value = hint.branches[0].abbreviation;
                    }

                    if (branch.showThisHintOfMultiHints) {
                        hintsArray.push(hintCard);
                    }
                })
                
                function getBranchesInfo(hint, index) {
                    const count = hint.branches.length;
                    let info = '';
                    if (index === 0) {
                        if (count > 1) {
                            info = `<span class="branches-count">Есть филиалы ${count - 1}</span>`
                        } else {
                            info = `<span class="no-branches">Нет филиалов</span>`
                        }
                    } 

                    return info;
                }

                function getHintTitleWithColor(full, value) {
                    const matches = findMatches(full, value);
                    let result = '';
    
                    for (let i = 0; i < full.length; i++) {
                        if (i === matches) {
                            result += `</span>`;
                        }
                        result += full[i]
                    }
    
                    function findMatches(str1, str2) {
                        let n = 0;
                        const minLength = Math.min(str1.length, str2.length);
                        
                        for (let i = 0; i < minLength; i++) {
                            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                                n += 1;
                            } else {
                                break;
                            }
                        }
                        
                        return n;
                    }
    
                    return result;
                }

                return hintsArray;
            },
            data: [
                {
                    branches: [
                        {
                            id: "",
                            INN: "5260001076",
                            statusOrLiquidationDate: "",
                            nameWithoutLegalForm: "",
                            abbreviation: "ВГУВТ",
                            fullName: "Волжский государственный университет водного транспорта",
                            address: "город Нижний Новгород, улица Нестерова, дом 5",
                            OKVED: ""
                        },
                        {
                            id: "",
                            INN: "5260001076",
                            statusOrLiquidationDate: "",
                            nameWithoutLegalForm: "",
                            abbreviation: "ВГУВТ(НП)",
                            fullName: "Навашинское представительство Волжский государственный университет водного транспорта",
                            address: "Нижегородская область, город Навашино, улица Проезжая, дом 4/14",
                            OKVED: ""
                        },
                        {
                            id: "",
                            INN: "5260001076",
                            statusOrLiquidationDate: "",
                            nameWithoutLegalForm: "",
                            abbreviation: "ВГУВТ(ПФ)",
                            fullName: "Пермский филиал Волжский государственный университет водного транспорта",
                            address: "город Пермь, бульвар Гагарина, дом 35",
                            OKVED: ""
                        },
                        {
                            id: "",
                            INN: "5260001076",
                            statusOrLiquidationDate: "",
                            nameWithoutLegalForm: "",
                            abbreviation: "ВГУВТ(СФ)",
                            fullName: "Самарский филиал Волжский государственный университет водного транспорта",
                            address: "город Самара, улица Молодогвардейская, дом 62/64",
                            OKVED: ""
                        },
                        {
                            id: "",
                            INN: "5260001076",
                            statusOrLiquidationDate: "",
                            nameWithoutLegalForm: "",
                            abbreviation: "ВГУВТ(УФ)",
                            fullName: "Уфимский филиал Волжский государственный университет водного транспорта",
                            address: "город Уфа, улица Ахметова, дом 275",
                            OKVED: ""
                        },
                        {
                            id: "",
                            INN: "5260001076",
                            statusOrLiquidationDate: "",
                            nameWithoutLegalForm: "",
                            abbreviation: "ВГУВТ(РФ)",
                            fullName: "Рыбинское Ордена «Знак Почёта» училище имени В.И. Калашникова — филиал Волжский государственный университет водного транспорта",
                            address: "Ярославская область, город Рыбинск, улица Вихарева, дом 3",
                            OKVED: ""
                        },
                        {
                            id: "",
                            INN: "5260001076",
                            statusOrLiquidationDate: "",
                            nameWithoutLegalForm: "",
                            abbreviation: "ВГУВТ(КФ)",
                            fullName: "Институт морского и речного флота имени Героя Советского Союза М.П.Девятаева — Казанский филиал Волжский государственный университет водного транспорта",
                            address: "город Казань, улица Портовая, дом 19",
                            OKVED: ""
                        },
                    ]
                },

                {
                    branches: [
                        {
                        id: "1020",
                        INN: "5258024460",
                        statusOrLiquidationDate: "Действующее",
                        nameWithoutLegalForm: "НМК",
                        abbreviation: "ГБПОУ НО НМК",
                        fullName: "Государственное бюджетное профессиональное образовательное учреждение Нижегородской области \"Нижегородский медицинский колледж\"",
                        address: "город Нижний Новгород, улица Июльских дней, дом 8",
                        OKVED: "85.21"
                    },
                    {
                        id: "240",
                        INN: "5258024460",
                        statusOrLiquidationDate: "Действующее",
                        nameWithoutLegalForm: "НМК (ЛФ)",
                        abbreviation: "ГБПОУ НО НМК (ЛФ)",
                        fullName: "Государственное бюджетное профессиональное образовательное учреждение Нижегородской области \"Нижегородский медицинский колледж\" Лысковский филиал",
                        address: "Нижегородская область, город Лысково, улица 50 лет ВЛКСМ, дом 14",
                        OKVED: "80.22.1"
                    },
                    {
                        id: "241",
                        INN: "5258024460",
                        statusOrLiquidationDate: "Действующее",
                        nameWithoutLegalForm: "НМК (ДФ)",
                        abbreviation: "ГБПОУ НО НМК (ДФ)",
                        fullName: "Государственное бюджетное профессиональное образовательное учреждение Нижегородской области \"Нижегородский медицинский колледж\" Дзержинский филиал",
                        address: "Нижегородская область, город Дзержинск, ул Маяковского, д 5",
                        OKVED: "80.22.1"
                    },
                    {
                        id: "242",
                        INN: "5258024460",
                        statusOrLiquidationDate: "Действующее",
                        nameWithoutLegalForm: "НМК (ПФ)",
                        abbreviation: "ГБПОУ НО НМК (ПФ)",
                        fullName: "Государственное бюджетное профессиональное образовательное учреждение Нижегородской области \"Нижегородский медицинский колледж\" Павловский филиал",
                        address: "Нижегородская область, город Павлово, улица Советская, дом 24",
                        OKVED: "80.22.1"
                    },
                    {
                        id: "243",
                        INN: "5258024460",
                        statusOrLiquidationDate: "Действующее",
                        nameWithoutLegalForm: "НМК (СФ)",
                        abbreviation: "ГБПОУ НО НМК (СФ)",
                        fullName: "Государственное бюджетное профессиональное образовательное учреждение Нижегородской области \"Нижегородский медицинский колледж\" Семеновский филиал",
                        address: "Нижегородская область, город Семеново, улица Гагарина, дом 11",
                        OKVED: "80.22.1"
                    },
                    {
                        id: "244",
                        INN: "5258024460",
                        statusOrLiquidationDate: "Действующее",
                        nameWithoutLegalForm: "НМК (БФ)",
                        abbreviation: "ГБПОУ НО НМК (БФ)",
                        fullName: "Государственное бюджетное профессиональное образовательное учреждение Нижегородской области \"Нижегородский медицинский колледж\" Богородский филиал",
                        address: "Нижегородская область, город Богородск, улица Свердлова, дом 35",
                        OKVED: "80.22.1"
                    },
                    {
                        id: "244",
                        INN: "5258024460",
                        statusOrLiquidationDate: "Действующее",
                        nameWithoutLegalForm: "НМК (ГФ)",
                        abbreviation: "ГБПОУ НО НМК (ГФ)",
                        fullName: "Государственное бюджетное профессиональное образовательное учреждение Нижегородской области \"Нижегородский медицинский колледж\" Городетский филиал",
                        address: "Нижегородская область, Городецкий район, город Заволжье, проспект Дзержинского, дом 58",
                        OKVED: "80.22.1"
                    },
                ]
                },

                {
                    branches: [
                        {
                            id: "",
                            INN: "5261002795",
                            statusOrLiquidationDate: "",
                            nameWithoutLegalForm: "",
                            abbreviation: "НГАУ",
                            fullName: "Нижегородский государственный агротехнологический ",
                            address: "университет, город Нижний Новгород, проспект Гагарина, дом 97",
                            OKVED: ""
                        },
                    ]
                },
            ],
            label: 'Филиал(ы) и Представительство(а) для учебных заведений',
            maxHints: 7,
        },
        qualificationsTab: {
            resultsBlock: function(result) {
                return `<div class="results-qualifications">
                            <p class="results-label">Выбранная запись</p>
                            <div class="results-table-row">
                                <p class="results-value-label">Квалификация</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.qualification ? result.qualification : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">ID</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.ID ? result.ID : '_'}</p>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Тип</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.type ? result.type : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                        </div>`
            },
            handleSearch: function(value, array) {
                const results = [];
                const separatedString = separateWords(value);
                
                array.forEach((obj) => {
                    let everyWordFounded = true;

                    separatedString.forEach((word) => {
                        if (
                            checkMatchesInWords(obj.qualification, word)
                        ) {} else {
                            everyWordFounded = false;
                        }
                    })

                    if (everyWordFounded) {
                        results.push(obj);
                    }
                });

                function checkMatchesInWords(stringFromObj, valueWord) {
                    strFromObjArray = separateWords(stringFromObj, valueWord);

                    isMatchesFinded = false;

                    strFromObjArray.forEach(str => {
                        if (str.toLowerCase().includes(valueWord.toLowerCase())) {
                            isMatchesFinded = true;
                        }
                    })

                    return isMatchesFinded;
                }

                function separateWords(str) {
                    return str.split(" ").filter(word => word !== '');
                }
                
                return results;
            },
            getHint(hint, index, value, self) {
                const qualification = hint.qualification;

                let title = `${qualification}`;

                const hintCard = document.createElement('div');
                hintCard.classList.add('hint-card');
                hintCard.classList.add('hint-card-one-line');
                hintCard.classList.add('qualificationsTab');
                hintCard.innerHTML = `
                    <h3 class="hint-title">${getHintTitleWithColor(title, value)}</h3>`;

                hintCard.addEventListener('click', () => {
                    const results = self.handleSearch(value, self.params.data);
                    self.showResults(results[index]);
                    setValueOnClick(results[index]);
                });

                function setValueOnClick(hint) {
                    const searchForm = document.querySelector('#search-input');
                    searchForm.value = hint.qualification;
                }

                function getHintTitleWithColor(hint, value) {

                    const hintWords = separateWords(hint);
                    const valueWords = separateWords(value);

                    let result = '';

                    hintWords.forEach(hintWord => {
                        let maxMatches = 0;
                        let maxMatchedWord = '';

                        valueWords.forEach(valueWord => {
                            const matchesNum = findMatches(valueWord, hintWord);
                            if (matchesNum > maxMatches) {
                                maxMatchedWord = valueWord;
                                maxMatches = matchesNum;
                            }
                        })

                        result += getPart(maxMatchedWord, hintWord) + ' ';
                    })
                    
                    function getPart(str1, str2) {
                        const except = '”“\"'

                        let result = '';
                        const matches = findMatches(str1, str2);

                        result += '<span class="hint-color-text">';
                        let spanClosed = false;
                        for (let i = 0; i < str2.length; i++) {
                            if (i >= matches) {
                                result += `</span>`;
                                spanClosed = true;
                            }
                            result += str2[i];
/* 
                            if (!except.includes(str2[i])) {
                            } else {
                                
                            } */
                        }
                        
                        if (!spanClosed) {
                            result += `</span>`;
                        }

                        return result
                    }

                    getPart(hint, value)
    
                    function findMatches(str1, str2) {
                        let n = 0;
                        const minLength = Math.min(str1.length, str2.length);
                        
                        for (let i = 0; i < minLength; i++) {
                            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                                n += 1;
                            } else {
                                break;
                            }
                        }
                        
                        return n;
                    }
                    function separateWords(str) {
                        return str.split(" ");
                    }
                    
                    return result;
                }

                return hintCard;
            },
            data: [
                {
                    qualification: "Электрослесарь подземный",
                    ID: "",
                    type: ""
                },
                {
                    qualification: "Электрослесарь по обслуживанию автоматики и средств измерений электростанций",
                    ID: "948",
                    type: "ССУЗ"
                },
                {
                    qualification: "Электрослесарь по ремонту и обслуживанию автоматики и средств измерений электростанций",
                    ID: "",
                    type: ""
                },
                {
                    qualification: "Электрослесарь по ремонту оборудования распределительных устройств",
                    ID: "",
                    type: ""
                },
                {
                    qualification: "Электрослесарь по ремонту электрических машин",
                    ID: "",
                    type: ""
                },
                {
                    qualification: "Электрослесарь по ремонту электрооборудования электростанций",
                    ID: "",
                    type: ""
                }
            ],
            label: 'Квалификации',
            maxHints: 7,
        },
      
        phoneCodesTab: {
            resultsBlock: function(result) {
                return `<div class="results-phoneCodes">
                            <div class="results-table-row">
                                <p class="results-value-label">ID</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.ID ? result.ID : '_'}</p>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Логотип</p>
                                <div class="results-editable-block">
                                    <img class="operators-logo" src="assets/icons/fixed_icons/tele2.svg" alt="Operator Logo"><img/>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Телефонный номер</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.phoneNumber ? result.phoneNumber : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Регион</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.region ? result.region : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Оператор</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.operator ? result.operator : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Владелец</p>
                                <div class="results-editable-block">
                                    <p class="results-editable-text">${result.owner ? result.owner : '_'}</p>
                                    <div class="block-edit-button"></div>
                                </div>
                            </div>
                            <div class="results-table-row">
                                <p class="results-value-label">Объявление</p>
                                <div class="results-editable-block">
                                    <div class="results-editable-text">
                                        <p>${result.advertisement[0].date ? result.advertisement[0].date : '_'} <a href="#" class="blue-link">${result.advertisement[0].link ? result.advertisement[0].link : '_'}</a></p>
                                        <p>${result.advertisement[1].date ? result.advertisement[1].date : '_'} <a href="#" class="blue-link">${result.advertisement[1].link ? result.advertisement[1].link : '_'}</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            },
            handleSearch: function(value, array) {
                const results = [];
                const separatedString = separateWords(value);
                
                array.forEach((obj) => {
                    let everyWordFounded = true;

                    separatedString.forEach((word) => {
                        if (
                            obj.phoneNumber.toLowerCase().includes(word.toLowerCase())
                        ) {} else {
                            everyWordFounded = false;
                        }
                    })

                    if (everyWordFounded) {
                        results.push(obj);
                    }
                });

                function separateWords(str) {
                    return str.split(" ").filter(word => word !== '');
                }
                
                return results;
            },
            getHint(hint, index, value, self) {
                const phoneNumber = hint.phoneNumber;
                const owner = hint.owner;
                const operator = hint.operator;

                const hintCard = document.createElement('div');
                hintCard.classList.add('hint-card');
                hintCard.classList.add('hint-card-one-line');
                hintCard.classList.add('phoneCodesTab');
                hintCard.innerHTML = `
                    <h3 class="hint-title">${getHintTitleWithColor(phoneNumber, value)} ${operator}</h3>
                    <p class="hint-subtitle">${getHintTitleWithColor(owner, value)}</p>`;

                hintCard.addEventListener('click', () => {
                    const results = self.handleSearch(value, self.params.data);
                    self.showResults(results[index]);
                    setValueOnClick(results[index]);
                });

                function setValueOnClick(hint) {
                    const searchForm = document.querySelector('#search-input');
                    searchForm.value = hint.phoneNumber;
                }

                function getHintTitleWithColor(hint, value) {

                    const hintWords = separateWords(hint);
                    const valueWords = separateWords(value);

                    let result = '';

                    hintWords.forEach(hintWord => {
                        let maxMatches = 0;
                        let maxMatchedWord = '';

                        valueWords.forEach(valueWord => {
                            const matchesNum = findMatches(valueWord, hintWord);
                            if (matchesNum > maxMatches) {
                                maxMatchedWord = valueWord;
                                maxMatches = matchesNum;
                            }
                        })

                        result += getPart(maxMatchedWord, hintWord) + ' ';
                    })
                    
                    function getPart(str1, str2) {
                        const except = '”“\"'

                        let result = '';
                        const matches = findMatches(str1, str2);

                        result += '<span class="hint-color-text">';
                        let spanClosed = false;
                        for (let i = 0; i < str2.length; i++) {
                            if (i >= matches) {
                                result += `</span>`;
                                spanClosed = true;
                            }
                            result += str2[i];
/* 
                            if (!except.includes(str2[i])) {
                            } else {
                                
                            } */
                        }
                        
                        if (!spanClosed) {
                            result += `</span>`;
                        }

                        return result
                    }

                    getPart(hint, value)
    
                    function findMatches(str1, str2) {
                        let n = 0;
                        const minLength = Math.min(str1.length, str2.length);
                        
                        for (let i = 0; i < minLength; i++) {
                            if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
                                n += 1;
                            } else {
                                break;
                            }
                        }
                        
                        return n;
                    }
                    function separateWords(str) {
                        return str.split(" ");
                    }
                    
                    return result;
                }

                return hintCard;
            },
            data: [
                {
                    ID: "234",
                    // logo: "LOGO",
                    phoneNumber: "+79527770000",
                    region: "Нижегородская область",
                    operator: "Теле 2",
                    owner: "Захаров Алексей Евгеньевич",
                    advertisement: [
                        { date: "31.03.2024", link: "ссылка 1" },
                        { date: "08.03.2024", link: "ссылка 2" }
                    ]
                },
                {
                    ID: "",
                    logo: "",
                    phoneNumber: "+79527770001",
                    region: "",
                    operator: "Теле 2",
                    owner: "ООО «Все Вакансии Нижнего»",
                    advertisement: [
                        { date: "", link: "" },
                        { date: "", link: "" }
                    ]
                },
            ],
            label: 'Телефон',
            maxHints: 7,
        }
    },
}

const app = new App(params);
const headerScroll = new HeaderScroll();