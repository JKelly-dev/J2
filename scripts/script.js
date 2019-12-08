const circleMenuLeft = document.getElementById('circleLeft');
const circleMenuRight = document.getElementById('circleRight');
const homeSectionText = document.querySelector('#homeSection p');
const workSectionSlideText = document.querySelector('#workSection #slide1 p');
const formSelector = document.getElementById('talkForm');
const emailInput = formSelector.querySelector('.email')
var circleMenuLeftRotation = 0;
var circleMenuRightRotation = 0;
var contentChange = function () {
    if (window.innerWidth > 600) {
        homeSectionText.textContent = "Scroll down to get started";
        workSectionSlideText.textContent = "Click an arrow to view our work";
    } else {
        homeSectionText.textContent = "Swipe up to get started";
        workSectionSlideText.textContent = "Swipe left to view our work";
    }
}
var formValidation = function (email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return (true);
    } else {
        alert("Please enter a valid email address.");
        return (false);
    }
}

document.addEventListener('load', function() {
    contentChange();
});

formSelector.addEventListener('submit', function () {
    formValidation();
});

var myFullpage = new fullpage('#fullpage', {
        licenseKey: '32FDC319-24F94392-ABCB0861-ECB0F5E9',
        anchors: ['home', 'about', 'work', 'talk'],
        navigation: true,
        navigationPosition: 'left',
        scrollingSpeed: 400,
        onLeave: function(origin, destination, direction){
            circleMenuLeftRotation+=90;
            circleMenuLeft.style.transform = `translateY(-50%) rotate(${circleMenuLeftRotation}deg)`;
            circleMenuRightRotation-=90;
            circleMenuRight.style.transform = `translateY(-50%) rotate(${circleMenuRightRotation}deg)`;
        },
        onSlideLeave: function(section, origin, destination, direction){
            circleMenuLeftRotation+=90;
            circleMenuLeft.style.transform = `translateY(-50%) rotate(${circleMenuLeftRotation}deg)`;
            circleMenuRightRotation-=90;
            circleMenuRight.style.transform = `translateY(-50%) rotate(${circleMenuRightRotation}deg)`;
        },
        loopBottom: true,
        loopTop: true
});

window.addEventListener("resize", () => {
    contentChange();
});