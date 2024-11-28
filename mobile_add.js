

(
    () => {
        console.log('xp[')
        
        document.querySelectorAll('.third-panel__tab:not(.more)').forEach(el => {
            function handle_click(){
                console.log('click')
                document.querySelectorAll('.mobile-control-wrapper__grid-nav').forEach(m => {
                document.querySelector('.brad-crumb__item__text_').textContent = `Журнал: ${el.querySelector('p').textContent.toUpperCase()}`
                    
                localStorage.setItem('pc_active_item', `${el.querySelector('p').textContent.toLowerCase()}`)
                localStorage.setItem('active_tab', `${el.querySelector('p').textContent.toLowerCase()}`)
                  })

                  
                
                // const bradCrumbsItemTextControl = document.querySelector(
                // ".brad-crumb__item__text"
                // );

                // bradCrumbsItemTextControl.innerHTML = `ЖУРНАЛ ${el.querySelector('p').textContent.toUpperCase()}`;

            }
            el.addEventListener('click', handle_click)
        
        })

        document.querySelectorAll('.second-panel__tab').forEach(el => {
            const t = el.querySelector('p').textContent;
            el.addEventListener('click', () => {
                if(t !== 'Журналы') {
                    document.querySelector('.brad-crumb__item__text_').style = 'display: none'
                } else {
                    document.querySelector('.brad-crumb__item__text_').style = ''
                    document.querySelector('.brad-crumb__item__text_').textContent = 'Журнал: КВАЛИФИКАЦИИ СПЕЦИАЛЬНОСТИ'
                }
            })
        })
    })()