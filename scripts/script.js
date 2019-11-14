const loadingSection = document.getElementById('loading');
const loadStop = document.getElementById('loadstop');
const loadCircle = document.querySelector('div.circle');
const j2logo = document.querySelector('#loading img');
const circleMenuLeft = document.getElementById('circleLeft');
const circleMenuRight = document.getElementById('circleRight');
var circleMenuLeftRotation = 0;
var circleMenuRightRotation = 0;

window.addEventListener('load', () => {
    console.log('Page loaded');
    loadCircle.addEventListener('animationend', () => {
        console.log('Animation complete.')
        if (loadCircle.classList.contains('spin')) {
            loadCircle.classList.remove('spin');
            loadCircle.classList.add('fullwidth');
            j2logo.classList.add('j2hide');
            j2logo.style.opacity = "0";
            setTimeout(() => {
                loadingSection.style.backgroundColor = "transparent";
            }, 1000)
            console.log("Contains spin class");
        } else if (loadCircle.classList.contains('fullwidth') && j2logo.classList.contains('j2hide')) {
            loadCircle.classList.remove('fullwidth');
            loadCircle.style.visibility = "hidden";
            console.log("Contains fullwidth class");
            loadCircle.classList.remove('j2hide');
            j2logo.style.visibility = "hidden";
            loadingSection.style.height = "0px"; 
            console.log("Contains j2hide class");
        }
    });
});

$(document).ready(function() {
    $('#fullpage').fullpage({
        navigation: true,
        navigationPosition: 'left',
        scrollingSpeed: 400,
        onLeave: function(origin, destination, direction){
            circleMenuLeftRotation+=90;
            circleMenuLeft.style.transform = `translateY(-50%) rotate(${circleMenuLeftRotation}deg)`;
            circleMenuRightRotation-=90;
            circleMenuRight.style.transform = `translateY(-50%) rotate(${circleMenuRightRotation}deg)`;
        },
        loopBottom: true,
        loopTop: true
    });
});

