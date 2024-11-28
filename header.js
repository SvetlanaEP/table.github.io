const tt = document.getElementById('nav_tooltip');

tt.style = 'display: none';

document.querySelectorAll('.third-panel__tab:not(.more)').forEach(
    wr => {
        const el = wr.querySelector('p');
        if(el.textContent.split(' ').length > 2) {
            if(el.textContent === 'КАК БЫЛО КАК НАДО'){
                el.innerHTML = 'КАК&nbsp;БЫЛО КАК&nbsp;НАДО'
            } else {
                const txts = el.textContent.split(' ');
                el.innerHTML = txts[0] + ' ' + txts.slice(1).join('&nbsp;')
            }
            
        }
        if(el.classList.contains('no-tt')) return;
        wr.onmouseover = () => {
            if(el.offsetWidth >= el.scrollWidth) return
            const rect = el.getBoundingClientRect();
            // // console.log(el.textContent)
            tt.querySelector('span').textContent = el.textContent;
            let box = tt.getBoundingClientRect();
            // if(box.width <= rect.width + 15) return;
            // let words = el.textContent.split(' ')
            // console.log(words)
            // let flag = false;
            // if(words.length > 2) flag = true;
            // if(words.length > 1){
            //     for(let word of words){
            //         tt.querySelector('span').textContent = word;
            //         let box = tt.getBoundingClientRect();
            //         console.log(word, box.width, rect.width)
            //         if(box.width >= rect.width ) flag = true;
            //     }
            // }
            tt.querySelector('span').textContent = el.textContent;
            // if(!flag && words.length > 1) {return} 
            tt.style = '';
            let x = rect.x + rect.width / 2 - box.width / 2;
            if(x < 0) x = 0;
            tt.style = `display: inline; top: ${rect.bottom + 2}px; left: ${x}px`;
        }
        wr.onmouseout = () => {
            tt.style = 'disaply: none; left: -100000px;'
        }
    }
)

window.addEventListener('touchstart', () => {
    tt.style = 'disaply: none; left: -100000px;'
})