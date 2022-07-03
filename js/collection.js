/*
API 키
AIzaSyBLdlm9RlOXSuE2ACgPflc0wFh_G0MgGRs
플레이리스트
PLPBzlS6qg86cVO0sR226ra-7HQXoj-sDi
*/

const vidList = document.querySelector(".vidList");
const key = "AIzaSyBLdlm9RlOXSuE2ACgPflc0wFh_G0MgGRs";
const playlistId = "PLPBzlS6qg86cVO0sR226ra-7HQXoj-sDi";
const num = 4;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

fetch(url)
.then((data)=>{
    return data.json();
})
.then(json=>{
    let items = json.items;
    console.log(items);
    let result = '';

    items.map((item)=>{

        let title = item.snippet.title;
        if(title.length > 30){
            title = title.substr(0,30) + "...";
        } 

        let con = item.snippet.description;
       if(con.length > 100){
            con = con.substr(0,100) + "...";
       }

        let date = item.snippet.publishedAt;
        date = date.split("T")[0];

        result +=`
            <article>
                <a href="${item.snippet.resourceId.videoId}" class="pic">
                    <img src="${item.snippet.thumbnails.medium.url}">
                </a>
                <div class="con">
                    <h2>${title}</h2>
                    <p>${con}</p>
                    <span>${date}</span>
                </div>
            </article>
        `;

    })

    vidList.innerHTML = result;


});

vidList.addEventListener("click",(e)=>{
    e.preventDefault();

    const vidId = e.target.closest("a").getAttribute("href");

    let pop = document.createElement("figure");
    pop.classList.add("pop");
    pop.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
                    <span class="btnClose">close</span>
    `;
    vidList.append(pop);
});


vidList.addEventListener("click",(e)=>{
    const pop = vidList.querySelector(".pop");
    if(pop){
        const close = pop.querySelector("span");
        if(e.target == close) pop.remove(); 
    } 
});