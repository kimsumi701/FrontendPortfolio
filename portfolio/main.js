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
const chart = document.getElementsByClassName('skill-chart');

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
  scrollChangeMenu(page -1);
  //skill 스크롤 효과
  // if (page == 3) {
  //   Array.from(chart).forEach((item) => {
  //     item.classList.add('scroll-line');
  //   })
  // } else {
  //   Array.from(chart).forEach((item) => {
  //     item.classList.remove('scroll-line');
  //   })
  // }  
});

// 메뉴 클로즈/오픈
const navClose = () => {
  menuToggle = !menuToggle;
  if (menuToggle) {
    Array.from(navMenu).forEach((item) => {
        item.style.opacity = '0';
        item.style.visibility = 'hidden';
    });       
      
    closeBtn.children[1].textContent = 'Open';
    closeBtn.style.transform = 'translateY(-500px)';
    closeBtn.children[0].style.display = 'block';      
  } else {
    Array.from(navMenu).forEach((item) => {
      item.style.opacity = '1';
      item.style.visibility = 'visible';
    });
    closeBtn.children[1].textContent = 'Close';
    closeBtn.style.transform = 'translateY(20px)';                    
    closeBtn.children[0].style.display = 'none';         
    scrollChangeMenu(page - 1);
  }
};
closeBtn.addEventListener('click', navClose);

// 스크롤 메뉴 셀렉트(아이콘)
function scrollChangeMenu(select) {
  Array.from(navMenu).forEach((item) => {
    item.classList.remove('selected');
  })
  navMenu[select].classList.add('selected');
}


// 마우스 메뉴 셀렉트(아이콘)
const mouseSelectMenu = (event) => {        
  for (i = 0; i < navMenu.length; i++) {
    if (event.target == navMenu[i] || event.target.parentNode == navMenu[i]) {           
      console.log('asd');
      scrollChangeMenu(i);
      let location = document.getElementsByTagName('section')[i].offsetTop;
      window.scrollTo({ top: location, behavior: 'smooth' });
    } 
  }
};
document.getElementsByTagName('nav')[0].addEventListener('click', mouseSelectMenu);

//Contact
contactBtn.addEventListener('click', () => {
    document.getElementById('contact-side').style.left < '0' ? (document.getElementById('contact-side').style.left = '0') : (document.getElementById('contact-side').style.left = '-100%');
});
document.getElementById('contact-close-button').addEventListener('click', () => {
    document.getElementById('contact-side').style.left = '-100%';    
});

//skill 스크롤 애니메이션


// 프로젝트 영역 휠 이벤트
function disableScroll() {
  let x = window.scrollX;
  let y = window.scrollY;
  window.onscroll = function () {
      window.scrollTo(x, y);
  };
}
function enableScroll() {
    window.onscroll = function () {};
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
};
const workCoverOpen = () => {    
  workCover[workWheelcnt].style.display = 'none';
  workCover[workWheelcnt].style.fontSize = '0';
  workImg[workWheelcnt].style.borderBottomLeftRadius = 0;
  workImg[workWheelcnt].style.borderBottomRightRadius = 0;
  workImg[workWheelcnt].style.display = 'block';
  workText[workWheelcnt].style.display = 'block';     
  workWheelcnt > workBox.length ? workWheelcnt = workBox.length : workWheelcnt += 1;        
};
const workCoverClose = () => {
  workWheelcnt < 0 ? workWheelcnt = -1 : workWheelcnt -= 1;
  workCover[workWheelcnt].style.display = 'flex';
  workCover[workWheelcnt].style.alignItems = 'center';
  workCover[workWheelcnt].style.justifyContent = 'center';
  workCover[workWheelcnt].style.fontSize = '80px';    
  workImg[workWheelcnt].style.borderBottomLeftRadius = '20px';
  workImg[workWheelcnt].style.borderBottomRightRadius = '20px';
  workImg[workWheelcnt].style.display = 'none';
  workText[workWheelcnt].style.display = 'none';     
};
workSlide.addEventListener('wheel', (e) => {                    
  disableScroll();
  // prograss();   
  let direction = e.deltaY > 0 ? workCoverOpen() : workCoverClose();       
    
    
    // 델타값에 따라 workCover Open/Close, prograss 수정   
});
workSlide.addEventListener('mouseout', enableScroll);

/* 
addEventListener("mousewheel", e => {
  const direction = e.deltaY > 0 ? "Scroll Down" : "Scroll Up";;
  
  console.log(direction);
});

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
allKeys.forEach(ele => {
  ele.dataset.code && keyCodeToEle.set(ele.dataset.code, ele);
});
const capsLockKeyIndex = allKeys.indexOf(keyCodeToEle.get('CapsLock'));
const arrowKeyIndexes = ['Up', 'Left', 'Down', 'Right'].map(n => allKeys.indexOf(keyCodeToEle.get(`Arrow${n}`)));
const macroKeys = [document.querySelector('[data-code="Escape"]'), ...document.querySelectorAll('[data-macro]')];
const furthestKeys = {};
requestAnimationFrame(() => {
  const allKeyBounds = allKeys.map(n => n.getBoundingClientRect());
  for (const macro of macroKeys) {
    const index = allKeys.indexOf(macro);
    const color = macro.dataset.macro;
    furthestKeys[color] = 0;
    const macroBounds = allKeyBounds[index];
    for (let i = 0; i < allKeys.length; i++) {
      const ele = allKeys[i];
      if (macro === ele) continue;
      const eleBounds = allKeyBounds[i];
      const d = dist(
      macroBounds.x + macroBounds.width * 0.5, macroBounds.y + macroBounds.height * 0.5,
      eleBounds.x + eleBounds.width * 0.5, eleBounds.y + eleBounds.height * 0.5);

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
macroKeys.forEach(ele => {
  ele.addEventListener('click', () => animateMacro(ele));
});
function setKeyState(code, state) {
  const ele = keyCodeToEle.get(code);
  if (ele) {
    if (state) {
      keysDown.add(allKeys.indexOf(ele));
      ele.dataset.selected = 'true';
    } else
    {
      ele.dataset.selected = 'false';
      keysDown.delete(allKeys.indexOf(ele));
      if (macroKeys.includes(ele)) {
        animateMacro(ele);
      }
    }
    const [up, left, down, right] = arrowKeyIndexes.map(n => keysDown.has(n));
    if (up) rotation.x += 1;
    if (left) rotation.y += -1;
    if (down) rotation.x += -1;
    if (right) rotation.y += 1;
    keyboard.style.setProperty('--rot-x', `${rotation.x}deg`);
    keyboard.style.setProperty('--rot-y', `${rotation.y}deg`);
  }
}
window.addEventListener('keydown', e => {
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
window.addEventListener('keyup', e => {
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
window.addEventListener('blur', e => {
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
  const _x = x2 - x1,_y = y2 - y1;
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
  } else
  {
    for (const ele of document.querySelectorAll('[data-selected="true"], [data-color]')) {
      ele.dataset.selected = 'false';
      ele.dataset.color = '';
    }
  }
}

function draw(e) {
  if (!animating.length) return;
  const actions = Array(allKeys.length).fill(false);
  keysDown.forEach(i => actions[i] = true);
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
    } else
    {
      key.dataset.color = '';
      key.dataset.selected = 'false';
    }
  }
}