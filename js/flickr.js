// key : 550234a469c2728e691ea9c24ed31ebe

const body = document.querySelector("body");
const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");
const input = document.querySelector("#search");
const btn = document.querySelector(".btnSearch");

const base = "https://www.flickr.com/services/rest/?";
const method = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const key = "550234a469c2728e691ea9c24ed31ebe";
const per_page = 20;
const format = "json";
const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;
const url2 = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=summerlookbook&privacy_filter=1`;

callData(url2);

btn.addEventListener("click",()=>{
    let tag = input.value;
    tag = tag.trim();

    const urlF = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

    if(tag !=""){
        callData(urlF);
    }else{
        alert("검색어가 없습니다. 검색어를 입력해주세요.")
    }

});

input.addEventListener("keypress",(e)=>{
    if(e.keyCode == 13){

        let tag = input.value;
        tag = tag.trim();

        const urlF = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

        if(tag !=""){
        callData(urlF);
        }else{
            alert("검색어가 없습니다. 검색어를 입력해주세요.")
        }
    }

});

function callData(url){

    frame.innerHTML = "";
    loading.classList.remove("off");
    frame.classList.remove("on");

fetch(url)

.then(data=>{
    let result = data.json();
    return result;
})

.then(json=>{
    let items = json.photos.photo;
    console.log(items);

    if(items.length > 0){
        createList(items);
        delayLoading();
    }else{
        loading.classList.add(".off");
        alert("검색하신 이미지의 데이터가 없습니다.")
    }
})
}

function createList(items){
    let htmls = '';

    items.map(data=>{
        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;

        let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;

        htmls +=`
            <li class="item">
                <div>
                    <a href="${imgSrcBig}">
                        <img class="thumb" src="${imgSrc}" alt="">
                    </a>
                    <p>${data.title}</p>
                </div>
            </li>
        `;
    })
    frame.innerHTML = htmls;
}

function delayLoading(){
    const imgs = frame.querySelectorAll("img");
    const len = imgs.length;
    let count = 0;

    for(let el of imgs){
        el.onload = ()=>{
            count++;

            if(count == len) isoLayout();
        }

        el.onerror = (e)=>{
            e.currentTarget.closest(".item").style.display = "none";
        }
    }
}

function isoLayout(){
    frame.classList.add("on");
    loading.classList.add("off");

    new Isotope("#list",{
        itemSelector : ".item",
        columnWidt : ".item",
        transitionDuration : "0.5s"
    });

}

frame.addEventListener("click",(e)=>{
    e.preventDefault();
    
    if(e.target == frame) return;

    let target = e.target.closest(".item").querySelector(".thumb");
    
    if(e.target == target){
        let imgSrc = target.parentElement.getAttribute('href');
        let pop = document.createElement("aside");
        let pops = `
                <img src="${imgSrc}">
                <span class="close">close</span>
        `;
        pop.innerHTML = pops;
        main.append(pop);
    }else{
        return;
    }
});


main.addEventListener("click",(e)=>{
    let target = e.target.closest("aside");
    let close = target.querySelector(".close");
    
    if(e.target == close) target.remove();
});