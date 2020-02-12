const circleMenuLeft = document.getElementById('circleLeft');
const circleMenuRight = document.getElementById('circleRight');
const homeSectionText = document.querySelector('#homeSection p');
const workSectionSlideText = document.querySelector('#workSection div p');
const teamSectionSlideText = document.querySelector('#teamSection div p');
const talkForm = document.getElementById('talkForm');
const pageOrder = ['home', 'about', 'team', 'work', 'talk'];
var circleMenuLeftRotation = 0;
var circleMenuRightRotation = 0;

var myFullpage = new fullpage('#fullpage', {
    licenseKey: '32FDC319-24F94392-ABCB0861-ECB0F5E9',
    anchors: pageOrder,
    navigation: true,
    navigationPosition: 'left',
    scrollingSpeed: 700,
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

var floatlabels = new FloatLabels( '#talkForm', {
    requiredClass: 'required',
    style: 2,
});
      
talkForm.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(talkForm);
  fetch(talkForm.getAttribute('action'), {
    method: 'POST',
    headers: {
      'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: new URLSearchParams(formData).toString()
  })
  .then(res => {
    if (res) {
        alert('worked');
    }
  });
});

var contentChange = function () {
    if (window.innerWidth > 600) {
        /*
        homeSectionText.textContent = "Scroll down to get started";
        workSectionSlideText.textContent = "Click the arrows to view our work";
        teamSectionSlideText.textContent = "Click the arrows to view our team";*/
    } else {/*
        homeSectionText.textContent = "Swipe up to get started";
        workSectionSlideText.textContent = "Swipe left to view our work";
        teamSectionSlideText.textContent = "Swipe left to view our team";*/
    }
}
window.addEventListener('load', function () {
    contentChange();
})

window.addEventListener("resize", () => {
    contentChange();
});
