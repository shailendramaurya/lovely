function quality(){
  document.getElementById("quality").click();
}
  
function changeQuality(quality){
 var songData = JSON.parse(localStorage.getItem("lovelytracks"));
 for(let i=0;i<songData.length;i++){
   songData[i].url= songData[i].url.replace(/_(.*?)\./, `_${quality}.`)
   songData[i].source=songData[i].source.replace(/_(.*?)\./, `_${quality}.`)
   localStorage.setItem("lovelytracks", JSON.stringify(songData));
 }
}
function donateInit(){
document.getElementById("donation").style.display="block";
}
        function shoop(x, y, z) {
            // z = time; y = scaleFactor: 1,2,3 etc
            obj2unhoop = x;
            y = 1 - y * 0.1
            obj2unhoop.style.transform = 'scale(' + y + ',' + y + ')'
            setTimeout("obj2unhoop.style.transform='scale(1,1)';obj2unhoop.style.transform='rotate(0deg)'", z)
        }

        function showPlayer() {
            document.getElementById("home").style.display = "none";
            var elem = document.getElementById("player");
            elem.style.display = "block";
            document.getElementById("settings").style.display = "none";
            document.getElementById("settings_bg").style.display = "none";
        }

        function showHome() {
            document.getElementById("player").style.display = "none";
            var elem = document.getElementById("home");
            elem.style.display = "block";
            document.getElementById("settings").style.display = "none";
            document.getElementById("settings_bg").style.display = "none";
        }

        function showSettings() {
            var elem = document.getElementById("settings");
            var elembg = document.getElementById("settings_bg");

            elem.style.display = "block";
            elembg.style.display = "block";

        }