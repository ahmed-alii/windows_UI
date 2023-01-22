let clock_digital = document.querySelector(".digital-clock")
let date_ = document.querySelector(".date")

window.onload = ()=>{
    setTimeout(() => {
        document.querySelector("#preloader").remove()
        startupSequence()
    }, 1000)
}


let dragables = document.querySelectorAll(".draggable");
dragables.forEach(el => {dragElement(el);})

displayClockDigital(clock_digital);
displayCurrentDate(date_)

// initialise scrollbars
document.querySelectorAll('.window .content:not(.no-scroll)').forEach(el => {
    new SimpleBar(el, {autoHide: false});
})

hideAllWindows()

manageCollapse()


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (elmnt.querySelector(".header")) {
        elmnt.querySelector(".header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function displayClockDigital(el) {
    el.innerText = formatAMPM(new Date)
    setInterval(() => {
        el.innerText = formatAMPM(new Date)
    }, 1000);
}

function displayCurrentDate(el) {
    el.innerText = new Date().toLocaleDateString();
}

function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}


function hideAllWindows() {
    document.querySelectorAll(".window").forEach(win => {
        win.classList.add("d-none")
    })
}

function manageCollapse(){
    let collapseHeader = document.querySelectorAll(".collapse-wrapper > .header_bar")
    collapseHeader.forEach(collapse => {

        collapse.addEventListener("click", function (){
            collapse.parentElement.classList.toggle("collapse")
        })
    })

}

function startupSequence(){
    let icons = document.querySelectorAll(".desktop_icon")
    icons.forEach(icon => {
        icon.classList.remove("d-none")
    })

    document.querySelector(".window.welcome").classList.remove("d-none")
    // let current = 0
    // let interval = setInterval(()=> {
    //     if (current < icons.length){
    //         icons[current].classList.remove("d-none")
    //         current++
    //     }else{
    //         clearInterval(interval)
    //         document.querySelector(".window.welcome").classList.remove("d-none")
    //     }
    //
    // }, 300)
}
