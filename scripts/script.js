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
    homePageVideo: '.home-video',
    homeSection: '#homeSection',
    loadingSection: '#loading',
    loadingCircle: '#loading div',
    loadingLogo: '#loading img'
};

const pageValues = {
    leftMenuRotation: 0,
    rightMenuRotation: 0,
    pageOrder: ['home', 'about', 'work', 'talk'],
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
    loadingAnimation: function () {
        if (document.readyState === 'complete') { 
            document.querySelector(domStrings.loadingCircle).classList.remove('spin');
            document.querySelector(domStrings.loadingCircle).classList.add('fullwidth');
            setTimeout(function () {
                document.querySelector(domStrings.loadingSection).style.background = "transparent";
            }, 1500)
            document.querySelector(domStrings.loadingCircle).addEventListener('animationend', function () { 
                document.querySelector(domStrings.loadingLogo).style.opacity = '0';
                document.querySelector(domStrings.loadingLogo).style.visibility = "hidden";
                document.querySelector(domStrings.loadingSection).style.opacity = '0';
                document.querySelector(domStrings.loadingSection).style.visibility = "hidden";
            })
        } else {
            document.querySelector(domStrings.loadingCircle).classList.remove('spin');
            document.querySelector(domStrings.loadingCircle).classList.add('spin');
            setTimeout(function () {
                pageMethods.loadingAnimation();
            }, 1000);
        }
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
        document.querySelector(domStrings.loadingCircle).addEventListener('animationend', function () {
            pageMethods.loadingAnimation();
        })
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
            document.querySelector(domStrings.homeSection).style.opacity = '1';
        }
        if (origin.anchor == 'home') {
            document.querySelector(domStrings.homeSection).style.opacity = '0';
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

pageMethods.initEventListener();
document.querySelector(domStrings.homePageVideo).play();