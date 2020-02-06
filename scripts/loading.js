const loadingSection = document.getElementById('loading');
const loadStop = document.getElementById('loadstop');
const loadCircle = document.querySelector('div.circle');
const j2logo = document.querySelector('#loading img');
window.addEventListener('load', () => {
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