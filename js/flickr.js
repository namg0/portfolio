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
        alert("검색어가 없습니다. 검색어를 입력해주세요.");

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
            alert("검색어가 없습니다. 검색어를 입력해주세요");
        }
    }
});

function callData(url){
    frame.innerHTML = "";
    loading.classList.remove("off");
    frame.classList.remove("on");

fetch(url)
//해당 url값으로 비동기식 데이터 호출 : 호출된 값은 프로미스형태
.then(data=>{
    //호출된 데이터가 전달완료되면 해당 데이터값을 json객체로 변환
    //console.log(data);
    let result = data.json();
    //console.log(result);
    return result;
})
//변환된 json객체에서 필요한 정보값(photos)만 호출
.then(json=>{
    let items = json.photos.photo; //우리가 필요한 정보는 저 많은 정보중에 photos -> photo이다.
    console.log(items);//배열로 받음.[{}{}{}{}{}{}]

    if(items.length > 0){
       createList(items);
       delayLoading();
    }else{
            loading.classList.add("off");
            alert("검색하신 이미지의 데이터가 없습니다.");
    }
})
}

function createList(items){

    let htmls = '';

    items.map(data=>{
      // console.log(data); //위의 items에 요소하나하나를 배열을 돌면서 정보를 빼내줌

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
 //완성된 DOM문자열을(htmls) frame에 삽입해서 동적 리스트를 DOM생성
    frame.innerHTML = htmls;
}
    
function delayLoading(){
     const imgs = frame.querySelectorAll("img"); //현재(로딩이되는 동안) 로딩이 완료된 이미지의 갯수를 알아두는 변수
    //console.log(imgs);
    const len = imgs.length; //사실 길이가 중요한것. 로딩된 이미지의 갯수를 정수로 변환하는 코드

    let count = 0;
    //로딩이 완료된 이미지의 갯수를 반복해서 세어준다
    for(let el of imgs){
        // 요소.addEventListener("load",()=>{와 같은 의미이고 차이는 없으며 개발자의 취향에 따라서 이벤트 활성화구문이 다름
        el.onload = ()=>{
            //이미지가 하나씩 로딩 될때마다 count값이 1씩 증가
            count++;

            //count의 값이 이미지 전체의 갯수와 같으면 모두 로딩되었으므로 함수를 호출할수 있다
            if(count == len) isoLayout();


        }

        //만약 img DOM요소에 이미지소스가 없거나 액박이 뜨게되면 해당내용을 숨김
        el.onerror = (e)=>{
            e.currentTarget.closest(".item").style.display = "none"; 
        }
    }
}
//isotope 를 호출하는 함수를 만들어둠
function isoLayout(){

    frame.classList.add("on");
    loading.classList.add("off");

    new Isotope("#list",{
        itemSelector : ".item",
        columnWidth : ".item",
        transitionDuration : "0.5s"
    });
}

frame.addEventListener("click",(e)=>{
    e.preventDefault();

    // 만약 내가 선택한 것이 #list(frame)이면 작동을 멈춤
    if(e.target == frame) return;


    let target = e.target.closest(".item").querySelector(".thumb");

    // 썸네일(img작은이미지)를 클릭했을 때만 적용할 것.
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
    // 어느부분(img, div)을 클릭하든 가장 가까이 있는 li 즉, .tem을 찾아서 변수로 담음
    

    

});

// main에 이벤트를 위임 (pop제거)
// main에 이벤트를 위임했기때문에 main어느곳을 클릭해도 아래의 이벤트가 발생, aside가 없을때는 발생하지 않음
// main.addEventListener("click",(e)=>{
//     let target = e.target.closest("aside");
//     target.remove();
// });

// 닫기이벤트를 close버튼에 특정지어주기
main.addEventListener("click",(e)=>{
    let target = e.target.closest("aside");
    let close = target.querySelector(".close");
    // 내가 클릭한 타겟이  close버튼이어야지만 remove해줌
    if(e.target == close) target.remove();

});