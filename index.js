const themeBtn = document.querySelector('#theme')
const wrapper = document.querySelector('.wrapper')
const saveCookie = document.querySelector('#saveCookie')
const resetCookie = document.querySelector('#resetCookie')
const cookieText = document.querySelector('.cookie-text')
let h = document.createElement('h2')


const extractCookie = () => {
    return document.cookie.split(';')
            .map(cookie => cookie.split('='))
            .reduce((accumulator, [key,value]) => 
                ({...accumulator, [key.trim()]: decodeURIComponent(value) }),
                {}
            )
}

const cookie = extractCookie()
h.textContent = cookie['simpleText']

document.addEventListener('DOMContentLoaded', function() {
    if (cookie['simpleText']){
        cookieText.appendChild(h)
    } 

    if (localStorage.getItem('darkMode') == 'true') {
        cookieText.classList.add('cookie-dark-mode')
        themeBtn.classList.add('light-button')
        wrapper.classList.add('dark')
    }
 }, false);


themeBtn.addEventListener('click', event => {
    if (wrapper.classList[1] == 'dark'){
        cookieText.classList.remove('cookie-dark-mode')
        themeBtn.classList.remove('light-button')
        wrapper.classList.remove('dark')
        localStorage.removeItem('darkMode', false)
    } else {
        cookieText.classList.add('cookie-dark-mode')
        themeBtn.classList.add('light-button')
        wrapper.classList.add('dark')
        localStorage.setItem('darkMode', true)
    }
})



saveCookie.addEventListener('click', ()=>{
    let date = new Date(Date.now() + 86400e3);
    document.cookie = "simpleText=This text is from your Cookies; expires="+date
    const cookie = extractCookie()
    h.textContent = cookie['simpleText']
    if (cookieText.hasChildNodes() !== false){
        cookieText.appendChild(h)
    }
})

resetCookie.addEventListener('click', ()=> {
    document.cookie = "simpleText=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    if (cookieText.hasChildNodes() !== false){
        cookieText.removeChild(h)
    }
})