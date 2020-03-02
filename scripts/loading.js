const domStrings = {
    leftMenu: '#circleLeft',
    rightMenu: '#circleRight',
    typedContainer: '#typed-strings',
    typedElement: '#typed',
    workSectionSlideParagraph: '#workSection div p',
    teamSectionSlideText: '#teamSection div p',
    workSection: '#workSection',
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
    loadingLogo: '#loading img',
    workShowcaseImage: '#workSection .slide ul li img',
    enlargeImage: '.enlarge-image',
    enlargeSection: '.enlarge-section',
    enlargeClose: '.enlarge-close',
    closeFullMenu: '.close-fullscreen',
    navigationMenu: '.navigation-menu',
    navigationMenuBackground: '.navigation-background',
    rightCircleLogo: '#circleRightLogo',
    arrowPrev: '.fp-prev',
    arrowNext: '.fp-next',
    slideContainer: '#workSection .fp-slides .fp-slidesContainer',
};

function loadingAnimation () {
    if (document.readyState === 'complete') { 
        document.querySelector(domStrings.loadingCircle).classList.remove('spin');
        document.querySelector(domStrings.loadingCircle).classList.add('fullwidth');
        setTimeout(function () {
            document.querySelector(domStrings.loadingSection).style.background = "transparent";
            document.querySelector(domStrings.loadingLogo).style.opacity = '0';
            document.querySelector(domStrings.loadingLogo).style.visibility = "hidden";
        }, 1100)
        document.querySelector(domStrings.loadingCircle).addEventListener('animationend', function () { 
            document.querySelector(domStrings.loadingSection).style.opacity = '0';
            document.querySelector(domStrings.loadingSection).style.visibility = "hidden";
        })
    } else {
        document.querySelector(domStrings.loadingCircle).classList.remove('spin');
        void document.querySelector(domStrings.loadingCircle).offsetWidth;
        document.querySelector(domStrings.loadingCircle).classList.add('spin');
        setTimeout(function () {
            loadingAnimation();
        }, 1000);
    }
}

document.querySelector(domStrings.loadingCircle).addEventListener('animationend', function () {
    loadingAnimation();
})
