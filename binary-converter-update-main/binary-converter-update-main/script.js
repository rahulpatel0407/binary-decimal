let flag = 0;
let hideFlag = 0;
const menu = document.querySelector(".menu");
const menuBar = document.getElementById("menu-bar");
const link = document.querySelector(".links");
const linkInner = document.querySelector(".links-inner");
const links = document.querySelectorAll(".link-option");
const mains = document.querySelectorAll(".main");
const allInput = document.querySelectorAll(".input");
const apkCon = document.querySelector(".apk");
const hideApk = document.getElementById("hide-apk");
const footer = document.querySelector("footer");

let timeOutControl;
linkInner.addEventListener("scroll", () => {
  linkInner.classList.add("links-scroll");
  clearTimeout(timeOutControl);
  timeOutControl = setTimeout(() => {
    linkInner.classList.remove("links-scroll");
  }, 1000);
});

allInput.forEach((input) => {
  const closeX = document.createElement("span");
  const result = input.parentElement.parentElement.children[2];
  closeX.addEventListener("click", () => {
    input.value = "";
    result.innerHTML = "";
    if (input.parentElement.children[1] == closeX) {
      input.parentElement.removeChild(closeX);
    }
    result.classList.remove("result-ani");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  input.addEventListener("focus", (e) => {
    e.stopPropagation();
    const randomNo = Math.floor(Math.random() * 2);
    const borderColor = ["#ff226c", "#3484ff"];
    input.style.borderBottom = `3px solid ${borderColor[randomNo]}`;
    input.style.height = "48px";
    result.style.marginTop = "calc(2.3rem - 3px)";
    apkCon.style.display = "none";
    hideFlag = 1;
    const data = ["none", "App Banner", hideFlag];
    localStorage.setItem("hide", JSON.stringify(data));
  });
  input.addEventListener("blur", () => {
    result.style.marginTop = "2.3rem";
    input.style.height = "45px";
    input.style.borderBottom = "";
    apkCon.style.display = "none";
    hideFlag = 1;
    const data = ["none", "App Banner", hideFlag];
    localStorage.setItem("hide", JSON.stringify(data));
  });

  input.addEventListener("input", (e) => {
    e.stopPropagation();

    if (input.value.length > 0) {
      setTimeout(() => {
        window.scrollTo({
          top: 90,
          left: 0,
          behavior: "smooth",
        });
      }, 100);
      closeX.innerHTML = "&times";
      closeX.className = "close-x";
      input.parentElement.appendChild(closeX);
      result.classList.add("result-ani");
      document.addEventListener("scroll", () => {
        if (window.scrollY > 90) {
          menu.style.display = "none";
          hideApk.style.display = "none";
          link.style.display = "none";
        } else {
          menu.style.display = "block";
          hideApk.style.display = "block";
          menuBar.checked = false;
          link.style.display = "none";
          flag = 0;
        }
      });
    } else {
      if (input.parentElement.children[1] == closeX) {
        input.parentElement.removeChild(closeX);
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      result.classList.remove("result-ani");
    }
  });
});

let stopFlag = 0;
function removeLinks() {
  stopFlag++;
  if (stopFlag === 1) {
    flag = 0;
    menuBar.checked = false;
    menu.classList.add("menu-ani");
    setTimeout(() => {
      link.classList.remove("links-ani-2");
      link.style.display = "none";
    }, 200);
    setTimeout(() => menu.classList.remove("menu-ani"), 505);
    document.removeEventListener("click", removeLinks);
  } else {
    stopFlag = 0;
  }
}

link.addEventListener("click", (event) => event.stopPropagation());

menu.addEventListener("click", (event) => {
  event.stopPropagation();
  flag++;
  if (flag === 1 && !menuBar.checked) {
    stopFlag = 1;
    document.addEventListener("click", removeLinks);
    link.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
    link.classList.add("links-ani");
    link.style.display = "block";
    menu.classList.remove("spin2", "right-menu");
    menu.classList.add("menu-ani");
    setTimeout(() => {
      menu.classList.remove("menu-ani");
      link.classList.remove("links-ani");
    }, 505);
  } else {
    link.classList.add("links-ani-2");
    menu.classList.remove("spin2", "right-menu");
    menu.classList.add("menu-ani");
    setTimeout(() => {
      link.classList.remove("links-ani-2");
      link.style.display = "none";
    }, 200);
    setTimeout(() => menu.classList.remove("menu-ani"), 505);
    document.removeEventListener("click", removeLinks);
    flag = 0;
  }
});

const handleMainAnimate = (main) => {
  main.classList.add("spin");
  main.children[0].classList.add("opacity");
  setTimeout(() => main.classList.remove("spin"), 1305);
  setTimeout(() => main.children[0].classList.remove("opacity"), 1305);
  main.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });
};

const handleMain = (main, mainIndex, index) => {
  if (mainIndex === index) {
    trackIndex = index;
    menu.click();
    handleMainAnimate(main);
    main.style.display = "block";
    setTimeout(() => main.children[1].children[0].focus(), 1200);
    localStorage.setItem("trackIndex", JSON.stringify(trackIndex));
    allInput.forEach((input, inputIndex) => {
      if (inputIndex === mainIndex || inputIndex !== mainIndex) {
        const insideCloseX =
          input.parentElement.parentElement.children[1].children;
        if (insideCloseX.length === 2) {
          insideCloseX[1].click();
        }
      }
    });
  } else {
    main.classList.remove("spin");
    main.children[0].classList.remove("opacity");
    main.style.display = "none";
  }
};
let trackIndex = 0;

const localIndex = JSON.parse(localStorage.getItem("trackIndex"));
if (localIndex) {
  mains[localIndex].classList.add("active");
} else {
  mains[trackIndex].classList.add("active");
}
mains.forEach((main) => {
  menu.classList.add("spin2");
  setTimeout(() => {
    menu.classList.add("right-menu");
    hideApk.classList.add("left-banner");
    hideApk.style.opacity = 1;
  }, 1000);
  handleMainAnimate(main);
});

links.forEach((linkOption, index) => {
  linkOption.addEventListener("click", () => {
    mains.forEach((main, mainIndex) => handleMain(main, mainIndex, index));
  });
});

hideApk.addEventListener("click", () => {
  hideFlag++;
  if (hideFlag == 1) {
    hideApk.classList.remove("left-banner");
    hideApk.classList.add("menu-ani");
    setTimeout(() => hideApk.classList.remove("menu-ani"), 505);
    hideApk.innerText = "App Banner";
    apkCon.style.display = "none";
    const data = ["none", "App Banner", hideFlag];
    localStorage.setItem("hide", JSON.stringify(data));
  } else {
    hideApk.classList.remove("left-banner");
    hideApk.classList.add("menu-ani");
    setTimeout(() => hideApk.classList.remove("menu-ani"), 505);
    apkCon.style.display = "block";
    hideApk.innerText = "App Banner";
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
    const data = ["block", " hide App Banner", 0];
    localStorage.setItem("hide", JSON.stringify(data));
    hideFlag = 0;
  }
});

const isBanner = JSON.parse(localStorage.getItem("hide"));

if (isBanner) {
  apkCon.style.display = isBanner[0];
  hideApk.innerText = isBanner[1];
  hideFlag = isBanner[2];
}
