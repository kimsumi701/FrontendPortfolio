const workSlide = document.getElementById('work-slide');
const workCover = document.getElementsByClassName('work-cover');
const workImg = document.getElementsByClassName('work-img');
const workText = document.getElementsByClassName('work-text');
const asideMenu = document.getElementsByClassName('aside-menu');
const selectIcon = document.querySelectorAll('.aside-menu img');
const closeBtn = document.getElementById('aside-close');
let menuToggle = false;
let workWheelcnt = 0;
// 프로젝트 영역 휠 이벤트
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
// 메뉴 클로즈/오픈
const asideClose = () => {
    menuToggle = !menuToggle;
    if (menuToggle) {
        for (i = 0; i < asideMenu.length; i++) {
            asideMenu[i].style.transform = `translateY(${505 - 135 * i}px)`;
            asideMenu[i].style.visibility = 'hidden';
        }

        setTimeout(() => {
            closeBtn.children[1].textContent = 'Open';
            closeBtn.style.transform = 'translateY(-500px)';
            closeBtn.children[0].style.display = 'block';
        }, 1400);
    }
    // asideMenu[3].style.transform = 'translateY(115px)';
    // asideMenu[2].style.transform = 'translateY(250px)';
    // asideMenu[1].style.transform = 'translateY(380px)';
    // asideMenu[0].style.transform = 'translateY(505px)';
};
closeBtn.addEventListener('click', asideClose);
// 메뉴 셀렉트(아이콘)
const selectMenu = (event) => {
    let checkObj = false;
    for (i = 0; i < asideMenu.length; i++) {
        if (event.target == asideMenu[i] || event.target.parentNode == asideMenu[i]) {
            selectIcon[i].style.display = 'block';
            asideMenu[i].style.borderBottomColor = '#eee';
        } else {
            selectIcon[i].style.display = 'none';
            asideMenu[i].style.borderBottomColor = 'rgba(238, 238, 238, 0.6)';
        }
    }
};
document.getElementsByTagName('aside')[0].addEventListener('click', selectMenu);
