class MobileControlMini extends HTMLElement {
  constructor() {
    super();
    this.active = 1;
  }

  connectedCallback() {
    this.render();
    this.setup();
  }

  THRID_PANEL_TABS = [
    ["объявления", "", ""],
    ["вакансии", "", ""],
    ["вакансии объед", "", ""],
    ["соискатели", "", ""],
    ["отклики", "", ""],
    ["фио", "", ""],
    ["Адреса", "", ""],
    ["Компании", "", ""],
    ["Учебные заведения", "", ""],
    ["Сокр.Ю.Ф.", "", ""],
    ["Альтернативные", "", "Альтернативные учебные заведения"],
    ["Филиалы", "", ""],
    // ["Квалификации", ""],
    ["ПОИСК", "", ""],
    ["Квалификации Специальности", "", ""],
    ["Телефонные коды", "", ""],
    ["Администраторы", "", ""],
    ["email рассылка", "", ""],
    ["КАК БЫЛО КАК НАДО", "", ""],
    ["ПРЕФИКСЫ СЧЕТОВ", "", ""],
    ["БАНКИ", "", ""],
    ["РУБРИКАТОР", "", ""],
  ];
  TEMPLATE_TAB = (tabName, icon, fullName, { classes } = {}) => {
    return /*html*/ `
            <div class="mobile-control-wrapper__grid-nav ${classes}">
                <div class="mobile-control-wrapper__icon-wrapper ">
                    <span class="icon too-big-icon">${icon}</span>
                </div>
                <div class="mobile-control__tab-name" data-full_name="${fullName}">
                    <p>${tabName}</p>
                </div>
            </div>
        `;
  };

  render() {
    const STYLE = /*html*/ `<style>
                .mobile-control-wrapper__grid-nav_active {
                    color: var(--yellow);
                }
                .mobile-control-wrapper__grid {
                    display: none;
                }

                .mobile-control-wrapper__grid-nav-wrapper {
                    display: none;
                }
                .mobile-control-wrapper__grid-control {
                    display: none;
                }
                .mobile-control-wrapper__grid-control-wrapper > span.icon {
                    color: inherit;
                }

                .mobile-menu-mini-wrapper {
                    z-index: 20010;
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: fit-content;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                .mobile-menu-mini-wrapper_active {
                    display: flex;
                    height: 100%;
                }
                .mobile-control-wrapper__row {
                    display: flex;
                    flex-direction: row;
                }

                .mobile-control-wrapper__row.second {
                    display: none;
                }
                .brad-crumbs{
                    padding-top: 20px;
                    padding-left: 20px ;
                    display:none;  
                }
                .brad_crumbs_active{
                    display:flex
                }
                .brad-crumb__item__text_container{
                  width: 90%;
                  text-align: center;
                }
                .brad-crumb__item{
                    display:flex;
                    gap:45px;
                    font-weight: 600;
                }
                .brad-crumb__item__button{
                    background-color: unset;
                    border:none
                }
            </style>`;
    this.innerHTML = /*html*/ `
            ${STYLE}
            <div class="brad-crumbs">
                <div class="brad-crumb__item">
                    <button class="brad-crumb__item__button">
                        <img src="assets/icons/fixed_icons/go-back.svg" width="23" alt="">
                    </button>
                </div>
                <div class= "brad-crumb__item__text_container">
                  <span class="brad-crumb__item__text"></span>
                </div>
            </div>
            <div class="mobile-menu-mini-wrapper">
                <div class="mobile-menu-mini">
                    <div class="mobile-control-wrapper__grid-first-panel">
                        <span class="icon"></span>
                        <p>Войти</p>
                    </div>
                    <div class="mobile-control-wrapper__grid-nav-wrapper">
                        ${(() => {
      let markup = ``;
      for (const [
        index,
        tab,
      ] of this.THRID_PANEL_TABS.entries()) {
        markup += this.TEMPLATE_TAB(tab[0], tab[1], tab[2], {
          classes:
              index == this.active
                  ? "mobile-control-wrapper__grid-nav_active"
                  : "",
        });
      }
      return markup;
    })()}
                    </div>
                </div>

                <div class="mobile-control-wrapper__grid-down">
                    <div class="mobile-control-wrapper__grid-control">
                        <div class="mobile-control-wrapper__row">
                            <div class="mobile-control-wrapper__grid-control-wrapper">
                                <span class="icon"></span>
                                <p>Интерфейс</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper">
                                <span class="icon"></span>
                                <p>Соц. сети</p>
                            </div>
                            <div
                                class = "mobile-control-wrapper__grid-control-wrapper mobile-control-wrapper__grid-control-wrapper_active journals"
                                id = "journals" >
                                <span class="icon"></span>
                                <p>Журнал</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper">
                                <span class="icon"></span>
                                <p>Импорт</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper more-button">
                                <span class="icon"></span>
                                <p>Еще</p>
                            </div>
                        </div>

                        <div class="mobile-control-wrapper__row second">
                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>Экспорт</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>Пользователи</p>
                            </div>

                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>E-mail</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>Ключи.Пароли</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>Разное</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  openMenu() {
    document.querySelectorAll(".mobile-control-wrapper__grid-nav").forEach((el) => {
      // el.classList.remove("mobile-control-wrapper__grid-nav_active");
    });
    const mobileMenu = document.querySelector(".mobile-menu-mini");
    const mobileMenuWrapper = document.querySelector(
        ".mobile-menu-mini-wrapper"
    );
    const mainContainer = document.querySelector(".main-container");
    mobileMenuWrapper.classList.add("mobile-menu-mini-wrapper_active");
    mobileMenu.style.setProperty("display", "flex");
    mainContainer.style.setProperty("display", "none");
  }

  closeMenu() {
    const mobileMenu = document.querySelector(".mobile-menu-mini");
    const mobileMenuWrapper = document.querySelector(
        ".mobile-menu-mini-wrapper"
    );
    const mainContainer = document.querySelector(".main-container");
    mobileMenuWrapper.classList.remove("mobile-menu-mini-wrapper_active");
    mobileMenu.style.setProperty("display", "none");
    mainContainer.style.setProperty("display", "flex");
  }

  setActvie(index) {
    this.active = index;
  }

  openSecondRow() {
    const secondRow = document.querySelector(
        ".mobile-control-wrapper__row.second"
    );
    secondRow.style.display = "flex";
  }

  closeSecondRow() {
    const secondRow = document.querySelector(
        ".mobile-control-wrapper__row.second"
    );
    secondRow.style.display = "none";
  }

  setup() {
    let active = false
    document.querySelectorAll(".mobile-control-wrapper__grid-control-wrapper").forEach(el => {
      el.addEventListener('click', () => {
        if (el.getAttribute("id") == "journals") {
          active = true
          this.openMenu();
        } else {
          active = false
          this.closeMenu();
        }
      })
    })

    document
        .querySelectorAll(".mobile-control-wrapper__grid-nav")
        .forEach((nav) => {
          nav.onclick = () => {
            this.closeMenu();
          };
        });

    const controls = document.querySelectorAll(
        ".mobile-control-wrapper__grid-control-wrapper:not(.more-button)"
    );
    const bradCrumbs = document.querySelector(".brad-crumbs");
    const bradCrumbsItemTextControl = document.querySelector(
        ".brad-crumb__item__text"
    );
    const bradCrumbsItemButton = document.querySelector(
        ".brad-crumb__item__button"
    );
    const tabs = document.querySelectorAll(".mobile-control-wrapper__grid-nav");

    bradCrumbsItemButton.addEventListener("click", () => {
      bradCrumbs.classList.remove("brad_crumbs_active");
      active ? this.openMenu() : bradCrumbsItemTextControl.innerHTML = "";
    });



    controls.forEach((control) => {
      control.addEventListener("click", () => {
        controls.forEach((control) => {
          control.classList.remove(
              "mobile-control-wrapper__grid-control-wrapper_active"
          );
        });
        control.classList.add(
            "mobile-control-wrapper__grid-control-wrapper_active"
        );
        bradCrumbs.classList.add("brad_crumbs_active");
        bradCrumbsItemTextControl.innerHTML = control.querySelector("p").innerText;

        tabs.forEach((tab) => {
          tab.onclick = () => {
            tabs.forEach((tab) => {
              tab.classList.remove("mobile-control-wrapper__grid-nav_active");
            });
            tab.classList.add("mobile-control-wrapper__grid-nav_active");
            bradCrumbs.classList.add("brad_crumbs_active");

         //   let bradCrumbsText = tab.querySelector(".mobile-control__tab-name").dataset.full_name ?? tab.querySelector(".mobile-control__tab-name").innerText;

          //  bradCrumbsItemTextControl.innerHTML = control.querySelector("p").innerText + ": " + capitalizeFirstLetter(bradCrumbsText);
            // localStorage.setItem('mob_active_item', tab.querySelector(
            //   ".mobile-control__tab-name"
            // ).textContent);
            this.closeMenu();
          };
        });
      });
    });

    const goBack = document.querySelector(".mobile-cocntrol-wrapper__go-back");
    if (goBack) {
      goBack.onclick = () => {
        this.openMenu();
      };
    }

    const more = document.querySelector(
        ".mobile-control-wrapper__grid-control-wrapper.more-button"
    );
    more.onclick = () => {
      if (more.querySelector("p").textContent == "Еще") {
        more.querySelector("p").textContent = "Меньше";
        this.openSecondRow();
      } else {
        more.querySelector("p").textContent = "Еще";
        this.closeSecondRow();
      }
    };
  }
}

customElements.define("mobile-ui", MobileControlMini);

function check_and_load_mobile(){
  document.getElementById('nav_tooltip').style = 'disaply: none; left: -1000px;'
  const clientW = window.innerWidth;
  if (640 >= clientW) {
    const journals = document.getElementById('journals')
    const mobile_control = document.querySelectorAll('.mobile-control-wrapper__grid-nav')
    journals.click()
    mobile_control.forEach((item) => {
      const mobile_control__tab = item.querySelector('.mobile-control__tab-name');
      const text = mobile_control__tab.querySelector('p');
      if (['АЛЬТЕРНАТИВНЫЕ УЧЕБНЫЕ ЗАВЕДЕНИЯ', 'АЛЬТЕРНАТИВНЫЕ'].includes(text.textContent.toUpperCase())) {
        item.click()
        localStorage.removeItem('pc_active_item')
      }
    })
  } else {
    if(!localStorage.getItem('mob_active_item')) return;
    const fv = localStorage.getItem('mob_active_item').toUpperCase() || 'АЛЬТЕРНАТИВНЫЕ УЧЕБНЫЕ ЗАВЕДЕНИЯ';
    document.querySelectorAll('.third-panel__tab').forEach(el => {
      if(!el.querySelector('p')) return
      if(el.querySelector('p').textContent.toUpperCase() == fv) {
        el.click();
        localStorage.removeItem('mob_active_item')
      }
    })
  }
}


window.addEventListener('load', check_and_load_mobile)
window.addEventListener('resize', check_and_load_mobile)
