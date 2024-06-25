function add_track(obj){
if(localStorage.getItem("lovelytracks") == null){
    localStorage.setItem("lovelytracks", JSON.stringify([obj]));
  }

    
    var orignal_arr = JSON.parse(localStorage.getItem("lovelytracks")) || [];
    
    const isDuplicate = orignal_arr.some(track => track.url === obj.url);
            if (isDuplicate) {
                var index = orignal_arr.findIndex(x => x.url === obj.url);
                console.log("Track is already in playlist");
                return;
            }
            
orignal_arr.unshift(obj);
localStorage.setItem("lovelytracks", JSON.stringify(orignal_arr));

            // Update localStorage
            
}


function fetch_id(id) {
            const url = "https://lovely-api.vercel.app/songs?id=" + id;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    info = data.data;
                })
                .then(() => {
                    var title = info[0].name;
                    var thumb = info[0].image[2].link;
                    var audio = info[0].downloadUrl[3].link;
                    var artists = info[0].primaryArtists;
                    objs = {
                        name: title,
                        artist: artists,
                        cover: thumb,
                        source: audio,
                        url: audio,
                        favorited: false
                    };
                  add_track(objs);
                })
                .catch(err => console.log(err));
}




function search_saavnapi(){
  var query = document.getElementById("search_box").value;
  var saavnapi = "https://jiosaavn-api-privatecvc.vercel.app/search/songs?limit=40&query="+query;
  document.getElementById("song_results").innerHTML = "<h2>Please Wait...</h2>"
  fetch(saavnapi)
.then(response=>response.json())
.then(data=>{
  document.getElementById("song_results").innerHTML ="";
  for(var i=0;i<data.data.results.length;i++){
var name = data.data.results[i].name;
var thumb = data.data.results[i].image[1].link;
var id = data.data.results[i].id;

document.getElementById("song_results").innerHTML += `<a><div onclick="fetch_id('${id}')" id="card">
<img src="${thumb}">
<p>${name}</p>
</div></a>`
}

  
})
.catch(err=>alert(err))

  
}



function search(){
var query = document.getElementById("search_box").value;
var url = "https://lovely-api.vercel.app/search/all?query="+query;
fetch(url)
.then(response=>response.json())
.then(data=>{
document.getElementById("trending").style.display="none";
if(data.data.songs.results.length>0){
document.getElementById("song_results_title").innerHTML =`<h1>Results</h1><h2>Songs</h2>`;
document.getElementById("song_results").innerHTML = "";

}
//songs
for(var i=0;i<data.data.songs.results.length;i++){
var name = data.data.songs.results[i].title;
var thumb = data.data.songs.results[i].image[1].link;
var id = data.data.songs.results[i].id;
                    
document.getElementById("song_results").innerHTML += `<a><div onclick="fetch_id('${id}')" id="card">
<img src="${thumb}">
<p>${name}</p>
</div></a>`
}


//view more button
document.getElementById("song_results").innerHTML += `<button id="view_more" onclick="search_saavnapi()">View More</button>`


//albums
document.getElementById("albums").innerHTML = "";
if(data.data.albums.results.length==0){
document.getElementById("albums").innerHTML = "<h2>No results were found :-(</h2>";

}
for(var i=0;i<data.data.albums.results.length;i++){
var name = data.data.albums.results[i].title;
var thumb = data.data.albums.results[i].image[1].link;
var id = data.data.albums.results[i].id;
document.getElementById("albums").innerHTML += `<div id="card" onclick="window.location.href='albums.html?id=${id}'">
<img src="${thumb}">
<p>${name}</p>
</div></a>`
}

//playlists
document.getElementById("playlists").innerHTML = "";
if(data.data.playlists.results.length==0){
document.getElementById("playlists").innerHTML = "<h2>No results were found :-(</h2>";

}

for(var i=0;i<data.data.playlists.results.length;i++){
var name = data.data.playlists.results[i].title;
var thumb = data.data.playlists.results[i].image[1].link;
var id = data.data.playlists.results[i].id;
document.getElementById("playlists").innerHTML += `<div id="card" onclick="window.location.href='playlist.html?id=${id}'">
<img src="${thumb}">
<p>${name}</p>
</div></a>`
}


}).catch(err=>alert(err));

}


var info;
var infomain;
async function init(){
const url="https://lovely-api.vercel.app/modules?language=hindi";
fetch(url)
.then(response=>response.json())
.then(data=>{
info=data.data;
})
.then(()=>{
console.log(JSON.stringify(info))


//trending songs
for(var i=0;i<info.trending.songs.length;i++){
var name = info.trending.songs[i].name;
var thumb = info.trending.songs[i].image[1].link;
var id = info.trending.songs[i].id;
document.getElementById("trending_songs").innerHTML += `<a><div onclick="fetch_id('${id}')" id="card">
<img src="${thumb}">
<p>${name}</p>
</div></a>`
}

//trending albums
for(var i=0;i<info.trending.albums.length;i++){
var name = info.trending.albums[i].name;
var thumb = info.trending.albums[i].image[1].link;
var id = info.trending.albums[i].id;
document.getElementById("trending_albums").innerHTML += `<div id="card" onclick="window.location.href='albums.html?id=${id}'">
<img src="${thumb}">
<p>${name}</p>
</div>`
}

//albums
for(var i=0;i<info.albums.length;i++){
var name = info.albums[i].name;
var thumb = info.albums[i].image[1].link;
var id = info.albums[i].id;
document.getElementById("albums").innerHTML += `<div id="card" onclick="window.location.href='albums.html?id=${id}'">
<img src="${thumb}">
<p>${name}</p>
</div>`
}

//playlists
for(var i=0;i<info.playlists.length;i++){
var name = info.playlists[i].title;
var thumb = info.playlists[i].image[0].link;
var id = info.playlists[i].id;
document.getElementById("playlists").innerHTML += `<div id="card" onclick="window.location.href='playlist.html?id=${id}'">
<img src="${thumb}">
<p>${name}</p>
</div>`
}

//charts
for(var i=0;i<info.charts.length;i++){
var name = info.charts[i].title;
var thumb = info.charts[i].image[0].link;
var id = info.charts[i].id;
document.getElementById("charts").innerHTML += `<div id="card" onclick="window.location.href='playlist.html?id=${id}'">
<img src="${thumb}">
<p>${name}</p>
</div>`
}


})
.catch(err=>alert(err))
}
