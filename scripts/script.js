const loadingSection = document.getElementById('loading');
const loadStop = document.getElementById('loadstop');
const loadCircle = document.querySelector('div.circle');
const j2logo = document.querySelector('#loading img');
const circleMenuLeft = document.getElementById('circleLeft');
const circleMenuRight = document.getElementById('circleRight');
const circleMenuBottom = document.getElementById('circleBottom');
const homeSectionText = document.querySelector('#homeSection p');
const workSectionSlideText = document.querySelector('#workSection #slide1 p');
var circleMenuLeftRotation = 0;
var circleMenuRightRotation = 0;

function contentChange () {
    if (window.innerWidth > 600) {
        homeSectionText.textContent = "Scroll down to get started."
        workSectionSlideText.textContent = "Click an arrow to view our work."
    } else {
        homeSectionText.textContent = "Swipe up to get started."
        workSectionSlideText.textContent = "Swipe left to view our work."
    }
}

window.addEventListener('load', () => {
    loadCircle.addEventListener('animationend', () => {
        if (loadCircle.classList.contains('spin')) {
            loadCircle.classList.remove('spin');
            loadCircle.classList.add('fullwidth');
            j2logo.classList.add('j2hide');
            j2logo.style.opacity = "0";
            setTimeout(() => {
                loadingSection.style.backgroundColor = "transparent";
                j2logo.style.opacity = "0";
                j2logo.style.visibility = "hidden";
            }, 1000)
        } else if (loadCircle.classList.contains('fullwidth') && j2logo.classList.contains('j2hide')) {
            loadCircle.classList.remove('fullwidth');
            loadCircle.style.visibility = "hidden";
            loadCircle.classList.remove('j2hide');
            loadingSection.style.height = "0px"; 
        }
    });
    contentChange();
});

var myFullpage = new fullpage('#fullpage', {
        licenseKey: '32FDC319-24F94392-ABCB0861-ECB0F5E9',
        anchors: ['home', 'about', 'work', 'talk'],
        navigation: true,
        slidesNavigation: true,
        navigationPosition: 'left',
        scrollingSpeed: 400,
        onLeave: function(origin, destination, direction){
            circleMenuLeftRotation+=90;
            circleMenuLeft.style.transform = `translateY(-50%) rotate(${circleMenuLeftRotation}deg)`;
            circleMenuRightRotation-=90;
            circleMenuRight.style.transform = `translateY(-50%) rotate(${circleMenuRightRotation}deg)`;
            if (origin.anchor == "work") {
                circleMenuBottom.style.opacity = "0";
            } else if (destination.anchor == "work") {
                setTimeout(() => {
                    circleMenuBottom.style.opacity = "1";
                }, 300)
            } 
        },
        loopBottom: true,
        loopTop: true
});

window.addEventListener("resize", () => {
    contentChange();
});