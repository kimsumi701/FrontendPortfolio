const navMenu = document.getElementsByClassName('nav-menu');
const selectIcon = document.querySelectorAll('.nav-menu img');
const closeBtn = document.getElementById('nav-close');
let menuToggle = false;
const contactBtn = document.getElementById('about-contact');
const prograssBar = document.getElementById('prograss-bar');
const workBox = document.getElementsByClassName('work-box');
const workSlide = document.getElementById('work-slide');
const workCover = document.getElementsByClassName('work-cover');
const workImg = document.getElementsByClassName('work-img');
const workText = document.getElementsByClassName('work-text');
let workWheelcnt = 0;

// 섹션별 이동
// 추가로 할것: 페이지 사이즈 바뀔때 
let mHtml = $('html');
let page = 1;
window.addEventListener(
    'wheel',
    function (event) {
        event.preventDefault();
    },
    { passive: false }
);
mHtml.animate({ scrollTop: 0 }, 10);
// 프로젝트 휠 이벤트랑 겹침 해결하기 
// 리사이징시 위치 맞추기
$('section').on('wheel', function (e) {
    if (mHtml.is(':animated')) return;
    if (e.originalEvent.deltaY > 0) {
        if (page == 4) return;
        page++;
    } else if (e.originalEvent.deltaY < 0) {
        if (page == 1) return;
        page--;
    }
    var posTop = (page - 1) * $(window).height();
    mHtml.animate({ scrollTop: posTop });
});

// 메뉴 클로즈/오픈
const asideClose = () => {
    menuToggle = !menuToggle;
    if (menuToggle) {
        for (i = 0; i < navMenu.length; i++) {
            navMenu[i].style.transform = `translateY(${505 - 135 * i}px)`;
            navMenu[i].style.visibility = 'hidden';
        }

        setTimeout(() => {
            closeBtn.children[1].textContent = 'Open';
            closeBtn.style.transform = 'translateY(-500px)';
            closeBtn.children[0].style.display = 'block';
        }, 1400);
    }    
};
closeBtn.addEventListener('click', asideClose);

// 메뉴 셀렉트(아이콘)
const selectMenu = (event) => {
    let checkObj = false;
    for (i = 0; i < navMenu.length; i++) {
        if (event.target == navMenu[i] || event.target.parentNode == navMenu[i]) {
            selectIcon[i].style.display = 'block';
            navMenu[i].style.borderBottomColor = '#eee';
        } else {
            selectIcon[i].style.display = 'none';            
            navMenu[i].style.borderBottomColor = '#aaa';
        }
    }
};
document.getElementsByTagName('nav')[0].addEventListener('click', selectMenu);

//Contact
contactBtn.addEventListener('click', () => { });

// 프로젝트 영역 휠 이벤트
function disableScroll() {6
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
}
function enableScroll(){
    window.onscroll = function(){};
}
const prograss = () => {    
    let pcount = 100 / workBox.length;
    if (prograssBar.style.width != '100%') {
        prograssBar.style.width = `${pcount * (workWheelcnt + 1)}%`;
        if (prograssBar.style.width == '100%') {
            prograssBar.style.borderTopRightRadius = '20px';
            prograssBar.style.borderBottomRightRadius = '20px';
        } else {
            prograssBar.style.borderTopRightRadius = 0;
            prograssBar.style.borderBottomRightRadius = 0;            
        }    
    } else {
        // enableScroll();
    }
    
}
const workCoverOpen = () => {
    workCover[workWheelcnt].style.display = 'none';
    workCover[workWheelcnt].style.fontSize = '0';
    workImg[workWheelcnt].style.borderBottomLeftRadius = 0;
    workImg[workWheelcnt].style.borderBottomRightRadius = 0;
    workImg[workWheelcnt].style.display = 'block';
    workText[workWheelcnt].style.display = 'block';
};
    
workSlide.addEventListener('wheel', () => {

    if (workWheelcnt < workBox.length) {
        console.log('휠 체크', workWheelcnt);
        disableScroll();
        prograss();
        workCoverOpen();        
        workWheelcnt += 1;
    }
});
workSlide.addEventListener('mouseout', enableScroll);
/* 

/**
  현재의 스크롤 상단 값을 반환받아 스크롤 이벤트 발생시 계속 같은 위치를 적용하도록 함.
    
}
 

*/
/**
 * 등록된 이벤트를 Overwrite 함.
 
 
*/

// 키보드(https://codepen.io/Alca/pen/vYeyOwd)
const keyboard = document.querySelector('.keyboard');
const rotation = { x: 20, y: 0 };
// const empty = document.querySelector('.empty');
// empty.style.color = 'white';
let animating = [];
let animatingColor;
const keysDown = new Set();
const keyCodeToEle = new Map();
const allKeys = [...document.querySelectorAll('.key')];
allKeys.forEach((ele) => {
    ele.dataset.code && keyCodeToEle.set(ele.dataset.code, ele);
});
const capsLockKeyIndex = allKeys.indexOf(keyCodeToEle.get('CapsLock'));
const arrowKeyIndexes = ['Up', 'Left', 'Down', 'Right'].map((n) => allKeys.indexOf(keyCodeToEle.get(`Arrow${n}`)));
const macroKeys = [document.querySelector('[data-code="Escape"]'), ...document.querySelectorAll('[data-macro]')];
const furthestKeys = {};
requestAnimationFrame(() => {
    const allKeyBounds = allKeys.map((n) => n.getBoundingClientRect());
    for (const macro of macroKeys) {
        const index = allKeys.indexOf(macro);
        const color = macro.dataset.macro;
        furthestKeys[color] = 0;
        const macroBounds = allKeyBounds[index];
        for (let i = 0; i < allKeys.length; i++) {
            const ele = allKeys[i];
            if (macro === ele) continue;
            const eleBounds = allKeyBounds[i];
            const d = dist(macroBounds.x + macroBounds.width * 0.5, macroBounds.y + macroBounds.height * 0.5, eleBounds.x + eleBounds.width * 0.5, eleBounds.y + eleBounds.height * 0.5);
            ele.macro = ele.macro || {};
            ele.macro[color] = d;
            if (d > furthestKeys[color]) {
                furthestKeys[color] = d;
            }
        }
    }
});
function animateMacro(ele) {
    const { macro } = ele.dataset;
    const [color, id] = macro.split(':');
    if (!keysDown.has(capsLockKeyIndex)) {
        if (['Space', 'ShiftLeft'].includes(id)) {
            return;
        }
    }
    animating.push({ time: performance.now(), macro, color });
    // animating.push({ time: performance.now(), color: macro.split(':')[0] });
    if (animating.length === 1) {
        _draw();
    }
}
macroKeys.forEach((ele) => {
    ele.addEventListener('click', () => animateMacro(ele));
});
function setKeyState(code, state) {
    const ele = keyCodeToEle.get(code);
    if (ele) {
        if (state) {
            keysDown.add(allKeys.indexOf(ele));
            ele.dataset.selected = 'true';
        } else {
            ele.dataset.selected = 'false';
            keysDown.delete(allKeys.indexOf(ele));
            if (macroKeys.includes(ele)) {
                animateMacro(ele);
            }
        }
        const [up, left, down, right] = arrowKeyIndexes.map((n) => keysDown.has(n));
        if (up) rotation.x += 1;
        if (left) rotation.y += -1;
        if (down) rotation.x += -1;
        if (right) rotation.y += 1;
        keyboard.style.setProperty('--rot-x', `${rotation.x}deg`);
        keyboard.style.setProperty('--rot-y', `${rotation.y}deg`);
    }
}
window.addEventListener('keydown', (e) => {
    if (e.code.startsWith('F') && !isNaN(e.code.slice(1))) {
        return;
    }
    e.preventDefault();
    setKeyState('CapsLock', e.getModifierState('CapsLock'));
    if (e.code === 'CapsLock') {
        return;
    }
    // if(animating.length) return;
    // empty.textContent = e.code;
    // const ele = document.querySelector(`[data-code=${e.code}]`);
    setKeyState(e.code, true);
});
window.addEventListener('keyup', (e) => {
    e.preventDefault();
    setKeyState('CapsLock', e.getModifierState('CapsLock'));
    if (e.code === 'CapsLock') {
        return;
    }
    // if(animating.length) return;
    // empty.textContent = e.code;
    // const ele = document.querySelector(`[data-code=${e.code}]`);
    setKeyState(e.code, false);
});
window.addEventListener('blur', (e) => {
    if (animating.length) animating.splice(0);
    for (const ele of document.querySelectorAll('[data-selected="true"], [data-color]')) {
        const index = allKeys.indexOf(ele);
        if (index !== capsLockKeyIndex) {
            ele.dataset.selected = 'false';
            ele.dataset.color = '';
            keysDown.delete(index);
        }
    }
});

function distSq(x1, y1, x2, y2) {
    const _x = x2 - x1,
        _y = y2 - y1;
    return _x * _x + _y * _y;
}
function dist(x1, y1, x2, y2) {
    const d = distSq(x1, y1, x2, y2);
    if (d === 0) return 0;
    return Math.sqrt(d);
}

function _draw(e) {
    draw(e);
    if (animating.length) {
        requestAnimationFrame(_draw);
    } else {
        for (const ele of document.querySelectorAll('[data-selected="true"], [data-color]')) {
            ele.dataset.selected = 'false';
            ele.dataset.color = '';
        }
    }
}

function draw(e) {
    if (!animating.length) return;
    const actions = Array(allKeys.length).fill(false);
    keysDown.forEach((i) => (actions[i] = true));
    const dilation = 100;
    for (let i = animating.length - 1; i >= 0; i--) {
        const a = animating[i];
        const time = e - a.time;
        const duration = furthestKeys[a.macro] + dilation;
        if (time >= duration) {
            animating.splice(i, 1);
            return;
        }
        for (let keyIndex = 0; keyIndex < allKeys.length; keyIndex++) {
            const key = allKeys[keyIndex];
            const d = key.macro[a.macro];
            const t = Math.abs(time - d);
            if (t < dilation && !actions[keyIndex]) {
                actions[keyIndex] = a.color;
            }
        }
    }
    for (let i = 0; i < actions.length; i++) {
        const key = allKeys[i];
        if (actions[i]) {
            key.dataset.selected = 'true';
            if (typeof actions[i] === 'string') {
                key.dataset.color = actions[i];
            }
        } else {
            key.dataset.color = '';
            key.dataset.selected = 'false';
        }
    }
}