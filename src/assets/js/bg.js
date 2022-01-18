
const rootStyle = document.documentElement.style

let prevX = 0
let prevY = 0
let centerWidth = document.body.clientWidth/2
let centerHeight = document.body.clientHeight/2

document.addEventListener("mousemove" , function(e) {

    if (prevX - e.clientX < 5 || prevX - e.clientX > 5) {
        prevX = e.clientX
        rootStyle.setProperty('--tx', `${(centerWidth - e.clientX)/10}px`);
    }

    if (prevY - e.clientY < 5 || prevY - e.clientY > 5) {
        prevY = e.clientY
        rootStyle.setProperty('--ty', `${(centerHeight - e.clientY)/10}px`);
    }
})