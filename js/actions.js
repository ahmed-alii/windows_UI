let startMenuWrapper = document.querySelector(".start-menu-wrapper");
let action_buttons = document.querySelectorAll(".action-buttons button");
let startButton = document.querySelector("#start_button")

let maxminButton = document.querySelectorAll(".minimise")
let closeButton = document.querySelectorAll(".close")
let deathScreen = document.querySelector(".blue-screen-of-death");

let wins = document.querySelectorAll(".window")

let breakpoint = 620;

let coordinates = {x: 20, y: 10, z: 20}


startButton.addEventListener("click", function (evt) {
    startMenuWrapper.classList.toggle("show")
})

action_buttons.forEach(el => el.addEventListener("click", function () {
    if (this.id === "quit") {
        deathScreen.classList.add("show");
        setTimeout(() => window.location.reload(), 2000)
    }

    if (this.querySelector("span").innerText) { //this opens the new window
        wins.forEach(el => {


            if (el.dataset.name === this.querySelector("span").innerText) {

                if (el.classList.contains("d-none")) { //app is not open

                    if (window.innerWidth <= breakpoint) { //on a smaller window
                        addToAppsList(el)
                        manageZIndex()
                        el.classList.remove("d-none")
                        el.style = `top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: ${coordinates.z}`
                        startMenuWrapper.classList.remove("show")
                    } else {
                        addToAppsList(el)
                        manageZIndex()
                        el.style = `top: ${coordinates.y}%; left: ${coordinates.x}%; z-index: ${coordinates.z}`
                        el.classList.remove("d-none")
                        startMenuWrapper.classList.remove("show")
                    }

                } else { // the app is open already
                    if (parseInt(el.style.zIndex) !== parseInt(coordinates.z)) {
                        manageZIndex()
                        el.style.zIndex = coordinates.z
                    }

                }


            }
        })

    }

}))

startMenuWrapper.addEventListener("click", function (evt) {
    if (evt.target === startMenuWrapper) {
        startMenuWrapper.classList.remove("show")
    }
})


// close minimize
maxminButton.forEach(el => el.addEventListener("click", function () {
    let win = this.closest(".window");
    win.classList.toggle("maximized")

}))
closeButton.forEach(el => el.addEventListener("click", function () {
    let win = this.closest(".window");
    win.classList.toggle("d-none")
    win.style = ""
    removeAppFromAppsList(win)
}))

function manageZIndex() {
    coordinates.x = coordinates.x + 3
    coordinates.y = coordinates.y + 4
    coordinates.z = coordinates.z + 1

    if (coordinates.x > 50) {
        coordinates.x = 20
    }
    if (coordinates.y > 14) {
        coordinates.y = 8
    }
}


// manage z-index of windows
wins.forEach(win => {
    win.addEventListener("click", function (evt) {

        if (evt.target.tagName !== "BUTTON") {
            if (parseInt(this.style.zIndex) !== parseInt(coordinates.z)) {
                manageZIndex()
                this.style.zIndex = coordinates.z
            } else {

            }
        }

    })
})


//Video play
let playButton = document.querySelectorAll(".play-button");
playButton.forEach(el => {
    el.addEventListener("click", function (evt) {
        let video = this.parentNode.querySelector("video")

        if (video.paused) {
            video.controls = true;
            video.play();
            video.nextElementSibling.classList.add("d-none")
        }
    });
})

document.querySelectorAll("video").forEach(el => {
    el.addEventListener("pause", pause)
})

function pause() {
    console.log("paused")
    this.controls = false
    this.nextElementSibling.classList.remove("d-none")
}


function addToAppsList(el) {

    let iconSVG = el.querySelector(".header .icon svg")
    let txtTitle = el.dataset.name

    let appsListContainer = document.querySelector("#apps_list")
    let appTemplate = appsListContainer.querySelector(".apps_template")


    let newApp = appTemplate.cloneNode(true)

    newApp.querySelector(".app_icon").appendChild(iconSVG.cloneNode(true))
    newApp.querySelector(".app_name").innerText = txtTitle

    newApp.classList.remove("apps_template")
    newApp.dataset.identifier = txtTitle

    appsListContainer.appendChild(newApp)
    newApp.addEventListener("click", function () {
        el.click()
    })

    handleAppsWidth()

}

function removeAppFromAppsList(win) {
    let appsListContainer = document.querySelector("#apps_list")
    let appInstance = appsListContainer.querySelector(`.app[data-identifier="${win.dataset.name}"]`)
    appInstance.remove()
    handleAppsWidth()
}

function handleAppsWidth() {

    let windowWidth = window.innerWidth
    let startWidth = document.querySelector(".taskbar_wrapper .start").clientWidth;
    let clockWidth = document.querySelector(".taskbar_wrapper .statusbar").clientWidth;
    let appListWidth = document.querySelector("#apps_list").clientWidth;
    let appListScrollWidth = document.querySelector("#apps_list").scrollWidth;
    let optimalWidth = windowWidth - startWidth - clockWidth - 6

    let appsListContainer = document.querySelector("#apps_list")

    if (appListWidth > optimalWidth) {
        appsListContainer.style.maxWidth = `${optimalWidth}px`

    }
    if (appListScrollWidth > optimalWidth) {
        console.log("more elements than...")
        let apps = appsListContainer.querySelectorAll(".app");
        let numberOfApps = apps.length
        let optimalAppsWidth = optimalWidth / numberOfApps;

        apps.forEach(app => {
            app.style.width = `${optimalAppsWidth}px`
        })

    }

    if (appListScrollWidth < optimalWidth) {
        let apps = appsListContainer.querySelectorAll(".app");
        apps.forEach(app => {
            app.style = ""
        })

    }
}

