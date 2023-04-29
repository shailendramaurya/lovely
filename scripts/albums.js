var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
//var link ="https://www.jiosaavn.com/song/thunderclouds/RT8zcBh9eUc";

var info;
async function init(){
const url="https://saavn.me/albums?id="+id;
fetch(url)
.then(response=>response.json())
.then(data=>{
info=data.data;
})
.then(()=>{
var title = info.name;
var background = info.image[2].link;
document.getElementById("albumcover").innerHTML += `<img src="${background}" width="100%">`;


for(var i=0;i<info.songs.length;i++){
var name = info.songs[i].name;
var thumb = info.songs[i].image[1].link;
var id = info.songs[i].id;

document.getElementById("songs").innerHTML += `
<a href="song.html?id=${id}" target="player">
<div id="card">
<div style="display:flex;">
<img src="${thumb}"><p id="songtitle"><h2>${name}</h2></p>
</div>
</div>
</a>
<br>
`;
}





})
.catch(err=>alert(err))
}