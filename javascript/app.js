const slideInBtn = document.querySelector("header .fa-bars");
const slideOutBtn = document.querySelector("header .fa-times");
const navBar = document.querySelector(".header__nav")


slideInBtn.addEventListener("click", ()=>{
    navBar.classList.add("slide-in")
    slideInBtn.style.display = "none"
    slideOutBtn.style.display = "flex"
});

slideOutBtn.addEventListener("click", ()=>{
    navBar.classList.remove("slide-in")
    slideInBtn.style.display = "flex"
    slideOutBtn.style.display = "none"
})
