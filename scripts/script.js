const pageValues = {
    rotationDegree: 0,
    direction: 'up',
    pageOrder: ['home', 'about', 'work', 'talk'],
    logStyles: [
        'background: linear-gradient(45deg, #F800FF 0%, #3100FF 100%)'
        , 'color: white'
        , 'border-radius: 3px'
        , 'display: block'
        , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
        , 'padding: 25px 50px'
        , 'font-size: 25px'
        , 'line-height: 40px'
        , 'text-align: center'
        , 'font-weight: bold'
    ].join(';')
};

console.log('%c Welcome to J²! ', pageValues.logStyles);

const pageMethods = {
    spinMenu: function () {
        if (pageValues.rotationDegree == 360) {
            pageValues.direction = 'down';
        } else if (pageValues.rotationDegree == 0) {
            pageValues.direction = 'up';
        };
        if (pageValues.direction == 'down') {
            pageValues.rotationDegree-=90;
        } else if (pageValues.direction == 'up') {
            pageValues.rotationDegree+=90;
        };
        document.querySelector(domStrings.leftMenu).style.transform = `translateY(-50%) rotate(-${pageValues.rotationDegree}deg)`;
        document.querySelector(domStrings.rightMenu).style.transform = `translateY(-50%) rotate(${pageValues.rotationDegree}deg)`;
    },
    successNotification: function () {
        document.querySelector(domStrings.notification).style.opacity = "1";
        document.querySelector(domStrings.notification).style.zIndex = "100";
    },
    enlargeImage: function (imageDom) {
        document.querySelector(domStrings.enlargeImage).src = imageDom.getAttribute("src");
        document.querySelector(domStrings.enlargeSection).style.opacity = '1';
        document.querySelector(domStrings.enlargeSection).style.zIndex = '2000';
    },
    closeEnlarge: function () {
        document.querySelector(domStrings.enlargeSection).style.opacity = '0';
        document.querySelector(domStrings.enlargeSection).style.zIndex = '-1';
    },
    openMenu: function () {
        document.querySelector(domStrings.navigationMenuBackground).classList.add('fullscreen');
        document.querySelector(domStrings.closeFullMenu).style.visibilty = 'visible';
        document.querySelector(domStrings.navigationMenu).style.zIndex = '1000';
        document.querySelector(domStrings.navigationMenu).style.visibilty = 'visible';
        setTimeout(function () {
            document.querySelector(domStrings.navigationMenu).style.opacity = '1';
        }, 250)
    },
    closeMenu: function () {
        document.querySelector(domStrings.navigationMenuBackground).classList.remove('fullscreen');
        document.querySelector(domStrings.navigationMenu).style.opacity = '0';
        setTimeout(function() {
            document.querySelector(domStrings.navigationMenu).style.visibilty = 'hidden'
            document.querySelector(domStrings.navigationMenu).style.zIndex = '-1';
        }, 200);
    },
    dismissNotification: function () {
        document.querySelector(domStrings.notification).style.opacity = "0";
        document.querySelector(domStrings.notification).style.zIndex = "-100";
    },
    initEventListener: function () {
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('work-image') == true) {
                pageMethods.enlargeImage(e.target);
            } else if (e.target.id == "circleRightLogo" || e.target.id == "circleRight") {
                if (document.querySelector(domStrings.navigationMenuBackground).classList.contains('menu-full') == false) {
                    pageMethods.openMenu();
                }
            } else if (e.target.classList.contains('close-fullscreen') == true) {
                pageMethods.closeMenu();
            } else if (e.target.classList.contains('page-link') == true) {
                pageMethods.closeMenu();
            }
        });
        document.querySelector(domStrings.enlargeClose).addEventListener('click', function () {pageMethods.closeEnlarge()});
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
                    pageMethods.successNotification();
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
        if (document.querySelector(domStrings.rightMenu).classList.contains('menu-full') == false) {
            pageMethods.spinMenu();
        } 
        if (destination.anchor == 'home') {
            document.querySelector(domStrings.homePageVideo).play();
            document.querySelector(domStrings.homeSection).style.opacity = '1';
        }
        if (origin.anchor == 'home') {
            document.querySelector(domStrings.homeSection).style.opacity = '0';
        }
        document.title = `${destination.anchor.charAt(0).toUpperCase() + destination.anchor.slice(1)} - Digital Agency`
    },
    onSlideLeave: function(section, origin, destination, direction){
        if (document.querySelector(domStrings.rightMenu).classList.contains('menu-full') == false) {
            pageMethods.spinMenu();
        } 
    }
});

const floatlabels = new FloatLabels( '#talkForm', {
    requiredClass: 'required',
    style: 2
});

pageMethods.initEventListener();
document.querySelector(domStrings.homePageVideo).play();