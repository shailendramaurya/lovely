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