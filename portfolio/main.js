const workSlide = document.getElementById('work-slide');
const workCover = document.getElementsByClassName('work-cover');
const workImg = document.getElementsByClassName('work-img');
const workText = document.getElementsByClassName('work-text');
const closeBtn = document.getElementById('aside-close');
const asideMenu = document.getElementsByClassName('aside-menu');
let workWheelcnt = 0;
workSlide.addEventListener('wheel', () => {
    if (workWheelcnt < 5) {
        console.log('휠 체크', workWheelcnt);
        workCoverOpen();
        workWheelcnt += 1;
    }
});
const workCoverOpen = () => {
    workCover[workWheelcnt].style.display = 'none';
    workCover[workWheelcnt].style.fontSize = '0';
    workImg[workWheelcnt].style.borderBottomLeftRadius = 0;
    workImg[workWheelcnt].style.borderBottomRightRadius = 0;
    workImg[workWheelcnt].style.display = 'block';
    workText[workWheelcnt].style.display = 'block';
};

const asideClose = () => {
    for (i = 0; i < asideMenu.length; i++) {
        asideMenu[i].style.transform = 'rotate(-10deg)';
        asideMenu[i].style.transform = `translateY(${535 - 135 * i}px)`;
        asideMenu[i].style.visibility = 'hidden';
    }
    setTimeout(() => {
        closeBtn.style.transform = 'translateY(-500px)';
        // closeBtn.textContent = 'Open';
    }, 1880);
};
closeBtn.addEventListener('click', asideClose);
