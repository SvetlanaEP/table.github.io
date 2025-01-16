class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setup();
  }

  THRID_PANEL_TABS = [
    ["объявления", ""],
    ["вакансии", ""],
    ["ПОИСК", ""],
    ["соискатели", ""],
    ["отклики", ""],
    ["фио", ""],
    ["Адреса", ""],
    ["Компании", ""],
    ["Учебные заведения", ""],
    ["вакансии объединённые", ""],
    ["Сокращённые юридические формы", ""],
    ["Альтернативные учебные заведения", ""],
    ["Филиалы учебных", ""],
    // ["Квалификации", ""],
    ["Квалификации Специальности", ""],
    ["Телефонные коды", ""],
    ["Администраторы", ""],
    ["email рассылка", ""],
    ["КАК БЫЛО КАК НАДО", ""],
    ["ПРЕФИКСЫ СЧЕТОВ", ""],
    ["БАНКИ", ""],
    ["РУБРИКАТОР", ""],

  ];
  THIRD_PANEL_TAB_TEMPLATE = (
    tabName,
    icon,
    { classes, id, tabNameClasses } = {
      classes: "",
      id: "",
      tabNameClasses: "",
    }
  ) => {
    return /*html*/ `
        <div class="third-panel__tab" ${id ? `id=${id.trim()}` : ""}>
            ${
              icon
                ? `<span class="third-panel__tab-icon icon ads-icon in-panel ${classes}">${icon}</span>`
                : ""
            }
            <p class="third-panel__tab-text ${tabNameClasses}">${tabName}</p>
        </div>
    `;
  };

  render() {
    const win_scale = window.devicePixelRatio;

    let font_size = 18;

    if(win_scale === 1 && window.innerWidth >= 1536 - 3){
      font_size = 21.6;
    }

    if(win_scale > 1 && window.innerWidth >= 1536 - 3){
      font_size = 21.6;
    }

    // window.outerWidth * win_scale = 1920

    // outerWidth >= 1920 / win_scale

    const STYLE = /*html*/ `
            <style>
                .no-white{
                    white-space: nowrap !important;
                }
                .reversed{
                    display: inline-block !important;
                    transform: rotate(180deg);
                }
                .navbar-top-panel{
                    background-color: #414f51;
                    color: white;
                    height: 40px;
                    padding: 0 20px;
                    display:flex;
                    justify-content: flex-end;
                    align-items: center;
                    
                    a{
                        color: white;
                        text-decoration: none;
                        cursor: pointer;
                        display:flex;
                        align-items: center;
                       /* font-size: 18px;*/
                    }
                }
                navbar-elem{
                    width: 100%;
                }
                .panels__panel {
                    box-sizing: border-box;
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                    height: min-content;
                }
                #navbar {
                    display: flex;
                    flex-direction: column;
                }
                .second-panel__tab {
                    display: flex;
                    flex: 1;
                    justify-content: center;
                    height: 60px;
                    box-sizing: border-box;
                    font-size: 18px;
                    text-transform: capitalize;
                }
                .second-panel__tab > p {
                    font-size: inherit;
                }
                .second-panel .tab > span.icon {
                    font-size: 35px;
                }
                .second-panel .tab:hover > span.icon {
                    color: white;
                }
                .second-panel .tab:hover {
                    background-color: var(--blue);
                    color: white;
                }
                .second-panel .tab {
                    display: flex;
                    align-items: center;
                }
                .third-panel{
                    align-items: center;
                    row-gap: 20px;
                    box-sizing: border-box;
                    padding: 25px 10px 20px 10px;
                    background-color: var(--blue);
                    align-items: start;
                }
                
                .third-panel__tab {
                    padding-left: 4px;
                    padding-right: 4px;
                    box-sizing: border-box;
                    font-weight: 100;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    overflow: hidden;
                }
                .third-panel__tab_active{
                    color: var(--yellow);
                    font-weight: 900;
                    font-family: 'Inter-Bold'
                }
                span.third-panel__tab-icon {
                    font-weight: normal;
                    color: inherit;
                    font-size: 30px;
                    margin-bottom: 6px;
                }
                .third-panel__tab-text {
                    font-weight: inherit;
                    font-family: inherit;
                    color: inherit;
                    font-size: inherit;
                    text-transform: uppercase;
                    text-align: center;
                    width: 100%;
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: wrap;
                }
                .panels {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .other-tabs{
                    display: none;
                }
                .other-tabs_active{
                    display: contents;
                }
                .third-panel__tab.more{
                    align-self: end;
                }
                .third-panel__tab.more > p.third-panel__tab-text{
                    text-align: center;
                }
                .third-panel__tab.more > p.third-panel__tab-text > span{
                    position: absolute;
                }
                @media (width <= 880px) {
                    p.third-panel__tab-text, #nav_tooltip{
                        font-size: 18px;
                    }
                    div#navbar {
                        display: none;
                        grid-template-columns: 2fr 5fr;
                        padding: 0;
                    }
                    .panels {
                        display: grid;
                        width: 100%;
                        grid-template-rows: 1fr;
                    }
                    .second-panel{
                        grid-auto-flow: row;
                    }
                    .third-panel__tab.more{
                        display: none;
                    }

                    .panels__panel{
                        grid-template-columns: none;
                    }
                    div.third-panel{
                        align-items: center;
                        column-gap: 10px;
                        row-gap: 0;
                        padding: 0;
                        padding-right: 25px;
                        padding-left: 15px;
                        box-sizing: border-box;
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: repeat(11, minmax(50px, auto));
                    }
                    .other-tabs{
                        display: contents;
                    }
                    .second-panel__tab {
                        height: 50px;
                        background-color: white;
                        color: var(--blue);
                    }
                    .tab_active {
                        background-color: var(--blue);
                        color: var(--yellow);
                    }
                    .tab_active > p {
                        color: var(--yellow);
                    }
                    div.second-panel__tab > p {
                        font-size: 18px;
                        text-align: left;
                        width: 100%;
                        padding-left: 25px;
                    }
                    .third-panel__tab > span.icon{
                        height: auto;
                        font-size: 20px;
                    }
                    p.third-panel__tab-text {
                        box-sizing: border-box;
                        padding-left: 10px;
                        width: fit-content;
                        text-align: end;
                        font-size: 18px;
                        text-transform: uppercase;
                        white-space: nowrap;
                    }
                    .third-panel__tab-icon.icon {
                        display: block;
                        font-size: 26px;
                    }
                    .third-panel__tab {
                        width: 100%;
                        overflow: hidden;
                        display: flex;
                        flex-direction: row;
                        justify-content: start;
                        /* color: white; */
                        cursor: pointer;
                    }
                    div.control-panel {
                        margin-top: 20px;
                    }
                    .third-panel__content-wrapper {
                        background-color: white;
                    }
                }
                @media (width <= ${1560 / win_scale}px) {
                    .third-panel__tab {
                        flex: 1;
                        text-align: center;
                    }
                }
                @media (width <= 1250px) {
                    .third-panel__tab-text, #nav_tooltip, .navbar-top-panel {
                        font-size: 18px;
                    }
                }
                @media (width <= 1150px) {
                    .second-panel__tab, .navbar-top-panel,body > navbar-elem > div.navbar-top-panel > a {
                        font-size: 16px;
                    }
                    .third-panel__tab-text, #nav_tooltip {
                        font-size: 16px;
                    }
                }
                @media (width <= 910px){
                  .tab{
                  font-size: 14px;}
                }

                @media (width >= ${1536 / win_scale - 2 - (window.outerWidth - window.innerWidth)}px){
                  .third-panel__tab-text, #nav_tooltip, .navbar-top-panel, #navbar > div.panels__panel.second-panel > div > p,
                  body > navbar-elem > div.navbar-top-panel > a{
                    font-size: calc(${font_size / 1536} * 100vw);
                    padding-top: 0.01vw;
                  }
                  
                  .third-panel__tab{
                    margin-top: 0.01vw;
                    }
                    
                  .third-panel__tab-text{
                    padding-top: 0;
                    margin-top: 0.01vw;
                    }
                      
                  .other-tabs .third-panel__tab{
                    margin-top: 0;
                  }

                  .other-tabs p{
                    margin-top: 0;
                    padding-top: 0;
                  }

                  .third-panel__tab-icon{
                    font-size: 1.5625vw !important;
                    height: 1.5625vw !important;
                    padding-top: 0;
                  }

                  .second-panel__tab{
                    height: 3.125vw;
                  }

                  .navbar-top-panel{
                    height: 2.08333vw;
                  }

                  .third-panel{
                    padding-top: 1.30208333vw;
                    padding-bottom: 1.041666vw;
                    row-gap: 1.041666vw;
                  }

                  .navbar-top__link > img {
                    width: calc(${font_size / 1536} * 100vw);
                    height: calc(${font_size / 1536} * 100vw);
                  }

                  #navbar > div.third-panel.journals.panels__panel {
                    padding-left: 1.041666vw;
                  }

                  .third-panel__tab.more .icon{
                    padding-left: 0.260416667vw !important;
                  }
                  .third-panel__tab{
                    padding-inline: 0.208333vw;
                  }

                  #navbar > div.third-panel.journals.panels__panel > div > span, #navbar > div.third-panel.journals.panels__panel > div.other-tabs.other-tabs_active > div > span {
                    margin-bottom: 0.3125vw;
                  } 
                  .third-panel.journals.panels__panel{
                    padding-inline: 0 ! important;
                  }

                  .navbar-top-panel{
                    padding-right: 2.045vw !important;
                  }

                }
            </style>
        `;
    this.innerHTML = /*html*/ `
        ${STYLE}
            <div class="navbar-top-panel">
                <a href="#" class="navbar-top__link">
                <img src="assets/icons/fixed_icons/login.svg" width="20px" alt="">
                <img src="assets/icons/fixed_icons/login-red.svg" width="20px" alt="">
                 Войти</a>
            </div>
            <div class="mobile-control__menu-button">
                <p>Меню</p>
                <span class="icon burger"></span>
            </div>
            <div id="navbar">
                <div class="panels__panel second-panel ">
                    <div class="tab second-panel__tab" id="interface_tab">
                        <p>Интерфейс</p>
                    </div>
                    <div class="tab second-panel__tab" id="social_tab">
                        <p>Соц. сети</p>
                    </div>
                    <div class = "tab second-panel__tab tab_active" id="journals_tab" >
                        <p>Журналы</p>
                    </div>
                    <div class="tab second-panel__tab" id="import_tab">
                        <p>Импорт</p>
                    </div>
                    <div class="tab second-panel__tab" id="export_tab">
                        <p>Экспорт</p>
                    </div>

                    <div class="tab second-panel__tab" id="users_tab">
                        <p>Пользователи</p>
                    </div>
                    <div class="tab second-panel__tab" id="emails_tab">
                        <p>Email ящики</p>
                    </div>
                    <div class="tab second-panel__tab" style="word-break: normal !important">
                        <p>Ключи Пароли</p>
                    </div>
                    <div class="tab second-panel__tab">
                        <p>Разное</p>
                    </div>
                </div>
                <div class="third-panel journals panels__panel">
                    ${(() => {
                      let markup = "";
                      for (const tab of this.THRID_PANEL_TABS.slice(0, 8)) {
                        if (tab[0] == "вакансии объед") {
                          markup += this.THIRD_PANEL_TAB_TEMPLATE(
                            tab[0],
                            tab[1],
                            { tabNameClasses: "no-white" }
                          );
                          continue;
                        }
                        markup += this.THIRD_PANEL_TAB_TEMPLATE(tab[0], tab[1]);
                      }
                      return markup;
                    })()}
                    <div class="third-panel__tab more">
                        <p class="third-panel__tab-text no-tt">
                            <span style="width: 100%; text-align: center; position: static;">Все 21</span>
                            <br> журнала <span class="icon reversed" style="padding-left: 5px;"></span></p>
                    </div>
                    <div class="other-tabs">
                        ${(() => {
                          let markup = "";
                          for (const [
                            index,
                            tab,
                          ] of this.THRID_PANEL_TABS.slice(8).entries()) {
                            if (index == 8) {
                              markup += `<div class="third-panel__tab more"></div>`;
                            }
                            markup += this.THIRD_PANEL_TAB_TEMPLATE(
                              tab[0],
                              tab[1]
                            );
                          }
                          return markup;
                        })()}
                    </div>
                </div>
            </div>
            <span class="brad-crumb__item__text_">Журнал: СОКРАЩЁННЫЕ ЮРИДИЧЕСКИЕ ФОРМЫ</div>
        `;
  }

  setup() {
    const thirdPanel = this.querySelector(".third-panel")
    this.querySelectorAll(".second-panel__tab").forEach((el) => {
      this.querySelectorAll(".third-panel__tab").forEach((el) => {
        el.classList.remove("third-panel__tab_active");
        if (el.innerHTML.includes('Сокращённые юридические формы')) {
          el.classList.add('third-panel__tab_active')
        }
      })
      el.addEventListener("click", () => {
        if(el.getAttribute("id") == "journals_tab"){
          thirdPanel.setAttribute('style', 'display:grid;')
          this.querySelectorAll(".third-panel__tab").forEach((el) => {
            el.classList.remove("third-panel__tab_active");
            if(el.innerHTML.includes('Сокращённые юридические формы')){
              el.classList.add('third-panel__tab_active')
            }
          });
        }else{
          thirdPanel.setAttribute('style', 'display:none;')
        }
        el.classList.add("tab_active");
      });
      document.addEventListener("click", (event) => {
        const isAnotherTabClicked = Array.from(
          document.querySelectorAll(".second-panel__tab")
        ).filter((el) => {
          return el.contains(event.target);
        }).length;

        if (!el.contains(event.target) && isAnotherTabClicked) {
          el.classList.remove("tab_active");
        }
      });
    });

    const moreTab = this.querySelector(".third-panel__tab.more");
    moreTab.onclick = () => {
      const otherTabs = this.querySelector(".other-tabs");
      if (otherTabs.classList.contains("other-tabs_active")) {
        otherTabs.classList.remove("other-tabs_active");
        moreTab
          .querySelector("p")
          .querySelector("span.icon")
          .classList.add("reversed");
      } else {
        otherTabs.classList.add("other-tabs_active");
        moreTab
          .querySelector("p")
          .querySelector("span.icon")
          .classList.remove("reversed");
      }

      const menu = document.querySelector("#navbar");
      if (menu.classList.contains("mobile-menu-wrapper_active")) {
        menu.classList.remove("mobile-menu-wrapper_active");
      } else {
        menu.classList.add("mobile-menu-wrapper_active");
      }
    };

    this.querySelectorAll(".third-panel__tab:not(.more)").forEach(
      (el, index) => {
        el.onclick = (event) => {
          this.querySelectorAll(".third-panel__tab").forEach((el) => {
            el.classList.remove("third-panel__tab_active");
          });
          el.classList.add("third-panel__tab_active");
        };
        // if (index == 1) {
        //   el.classList.add("third-panel__tab_active");
        // }
      }
    );
    document.querySelector(".icon.burger").onclick = () => {
      const menu = document.querySelector("#navbar");
      if (menu.classList.contains("mobile-menu-wrapper_active")) {
        menu.classList.remove("mobile-menu-wrapper_active");
      } else {
        menu.classList.add("mobile-menu-wrapper_active");
      }
    };
    window.addEventListener("resize", () => {
      const menu = document.querySelector("#navbar");
      if (window.innerWidth <= 640) {
        menu.classList.remove("mobile-menu-wrapper_active");
        const bradCrumbs = document.querySelector(".brad-crumbs");
        bradCrumbs.classList.add("brad_crumbs_active");
      } else {
        const moreTab = document.querySelector(".third-panel__tab.more");
        const otherTabs = document.querySelector(".other-tabs");
        if (!menu.classList.contains('mobile-menu-wrapper_active')) {
          otherTabs.classList.remove("other-tabs_active");
          moreTab
            .querySelector("p")
            .querySelector("span.icon")
            .classList.add("reversed");
        } else {
          otherTabs.classList.add("other-tabs_active");
          moreTab
            .querySelector("p")
            .querySelector("span.icon")
            .classList.remove("reversed");
        }
    }
    });
  }
}

customElements.define("navbar-elem", Navbar);
