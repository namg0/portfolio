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