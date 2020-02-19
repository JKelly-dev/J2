const domStrings = {
    leftMenu: '#circleLeft',
    rightMenu: '#circleRight',
    homeSectionParagraph: '#homeSection p',
    workSectionSlideParagraph: '#workSection div p',
    teamSectionSlideText: '#teamSection div p',
    talkForm: '#talkForm',
    emailInput: '#email-input',
    notification: '.notification',
    notificationText: '.notification-text',
    notificationEmail: '.notification-email',
    notificationClose: '.notification-image',
    homePageVideo: '.home-video'
};

const pageValues = {
    leftMenuRotation: 0,
    rightMenuRotation: 0,
    pageOrder: ['home', 'about', 'team', 'work', 'talk'],
};

const pageMethods = {
    spinMenu: function () {
        pageValues.leftMenuRotation+=90;
        document.querySelector(domStrings.leftMenu).style.transform = `translateY(-50%) rotate(${pageValues.leftMenuRotation}deg)`;
        pageValues.rightMenuRotation-=90;
        document.querySelector(domStrings.rightMenu).style.transform = `translateY(-50%) rotate(${pageValues.rightMenuRotation}deg)`;
    },
    contentChange: function () {
        if (window.innerWidth > 600) {

        } else {
    
        }
    },
    successNotification: function (email) {
        document.querySelector(domStrings.notificationEmail).textContent = email;
        document.querySelector(domStrings.notification).style.opacity = "1";
        document.querySelector(domStrings.notification).style.zIndex = "100";
    },
    dismissNotification: function () {
        document.querySelector(domStrings.notification).style.opacity = "0";
        document.querySelector(domStrings.notification).style.zIndex = "-100";
        
    },
    initEventListener: function () {
        document.querySelector(domStrings.notificationClose).addEventListener('click', function () {pageMethods.dismissNotification()});
        document.querySelector(domStrings.talkForm).addEventListener('submit', e => {
            e.preventDefault();
            let formData = new FormData(document.querySelector(domStrings.talkForm));
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
                    pageMethods.successNotification(document.querySelector(domStrings.emailInput).value);
                    document.querySelector(domStrings.talkForm).reset();
                } else {
                    alert('Error submitting form. Please try again.')
                }
            });
        });
    }
}

const myFullpage = new fullpage('#fullpage', {
    licenseKey: '32FDC319-24F94392-ABCB0861-ECB0F5E9',
    anchors: pageValues.pageOrder,
    navigation: true,
    navigationPosition: 'left',
    scrollingSpeed: 700,
    onLeave: function(origin, destination, direction){
        pageMethods.spinMenu();
        if (destination.anchor == 'home') {
            document.querySelector(domStrings.homePageVideo).play();
        }
    },
    onSlideLeave: function(section, origin, destination, direction){
        pageMethods.spinMenu();
    },
    loopBottom: true,
    loopTop: true
});

const floatlabels = new FloatLabels( '#talkForm', {
    requiredClass: 'required',
    style: 2
});
    
window.addEventListener('load', () => {
    const loadingSection = document.getElementById('loading');
    const loadCircle = document.querySelector('div.circle');
    const j2logo = document.querySelector('#loading img');
    setTimeout(() => {
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
    }, 200);
});

pageMethods.initEventListener();
document.querySelector(domStrings.homePageVideo).play();