/* Main view moew box 효과 */
const btnOpen = document.querySelector(".btnOpen");
const btnClose = document.querySelector(".btnClose");
const txt = document.querySelector("#main .txt");
const box = document.querySelector("#main .box");
const pic = document.querySelector("#main .pic");

const aside = document.querySelector("aside");
const _top = aside.querySelector(".top");
const _right = aside.querySelector(".right");
const _bottom = aside.querySelector(".bottom");
const _left = aside.querySelector(".left");
const _inner = aside.querySelector(".inner");
const speed = 500;


btnOpen.addEventListener("click",(e)=>{
    e.preventDefault();

    aside.style.display = "block";
    txt.classList.add("off");
    box.classList.add("off");
    pic.classList.add("off");

    new Anim(_top,{
        prop : 'width',
        value : "100%",
        duration : speed,
        callback: ()=>{
            new Anim(_right,{
                prop : "height",
                value : "100%",
                duration : speed,
                callback: ()=>{
                    new Anim(_bottom,{
                        prop : "width",
                        value : "100%",
                        duration : speed,
                        callback: ()=>{
                            new Anim(_left,{
                                prop : "height",
                                value : "100%",
                                duration : speed,
                                callback: ()=>{
                                    new Anim(_inner,{
                                        prop : "opacity",
                                        value : 1,
                                        duration : speed
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }

    })
})

btnClose.addEventListener("click",(e)=>{
    e.preventDefault();
   
    new Anim(_inner,{
        prop : "opacity",
        value : 0,
        duration : speed,
        callback: ()=>{
            new Anim(_top,{
                prop : "width",
                value : "0%",
                duration : speed
            });
            new Anim(_right,{
                prop : "height",
                value : "0%",
                duration : speed
            });
            new Anim(_bottom,{
                prop : "width",
                value : "0%",
                duration : speed
            });   
            new Anim(_left,{
                prop : "height",
                value : "0%",
                duration : speed,
                callback: ()=>{
                    aside.style.display = "none";
                    txt.classList.remove("off");
                    box.classList.remove("off");
                    pic.classList.remove("off");
                    
                }
            });
            
        }
    })
            
})

/* Shop 탭 효과 */
const dts = document.querySelectorAll("dt");
const dds = document.querySelectorAll("dd");
const dts_a = document.querySelectorAll("dt>a");


dts_a.forEach((el,index)=>{
    el.addEventListener("focusin",()=>{
        activation(dts,index);
        activation(dds,index);
    })

})

dts.forEach((el,index)=>{
    el.addEventListener("click",(e)=>{
        e.preventDefault();
        activation(dts,index);
        activation(dds,index);
    })

})

function activation(item,index){
    for(let el of item){
        el.classList.remove("on")
    }
    item[index].classList.add("on");
}

/* Shop 슬라이드 효과 */
const slider = document.querySelector(".slider");
const ul = slider.querySelector("ul");
const lis = ul.querySelectorAll("li");
const img = lis.querySelectorAll("img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const speedSlide = 1000;

let len = lis.length; 
let enableClick = true;

init();

next.addEventListener("click",(e)=>{
    e.preventDefault();

    if(enableClick){
        nextSlide();
        enableClick = false;
    }
})

prev.addEventListener("click",(e)=>{
    e.preventDefault();

    if(enableClick){
        prevSlide();
        enableClick = false;
    }
})

function init(){
    ul.style.left = "-100%";
    ul.prepend(ul.lastElementChild);
    ul.style.width = `${100 * len}%`; 
    lis.forEach((li)=>{
        li.style.width = `${100 / len}`;
    })
}

function nextSlide(){
    new Anim(ul,{
        prop : 'left',
        value : '-200%',
        duration : speedSlide,
        callback : ()=>{
            ul.style.left = "-100%";
            ul.append(ul.firstElementChild);
            enableClick = true;

        }
   })
}

function prevSlide(){
    new Anim(ul,{
        prop : 'left',
        value : "0%",
        duration : speedSlide,
        callback : ()=>{
            ul.style.left = "-100%";
            ul.prepend(ul.lastElementChild);
            enableClick = true;
        }
    })

}