function togglePlaylist() {
    var playlist = document.getElementById("playlist");
    playlist.classList.toggle("show");
}


var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
//var id ="U3wEEo6F"
var info;
var objs;
const favicon = document.createElement('link');
favicon.rel = 'shortcut icon';

new Vue({
    el: "#app",
    data() {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: false,
            tracks: JSON.parse(localStorage.getItem("lovelytracks")) || [],
            trackTitles: '',
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null
        };
    },
    methods: {
        changeTrack(index) {
            this.currentTrackIndex = index;
        },
        addTrack: function(obj) {
            // Check if track already exists in array
            const isDuplicate = this.tracks.some(track => track.url === obj.url);
            if (isDuplicate) {
                var index = this.tracks.findIndex(x => x.url === obj.url);
                this.currentTrackIndex = index;
                console.log("Track is already in playlist, playing it");
                return;
            }
            this.tracks.unshift(obj);
            localStorage.setItem("lovelytracks", JSON.stringify(this.tracks)); // Update localStorage

        },
        clearTracks() {
            this.tracks.splice(1);
            localStorage.setItem("lovelytracks", JSON.stringify(this.tracks));
            this.$forceUpdate();
            for (let i = 0; i < this.tracks.length; i++) {
                var name = this.tracks[i].name;
                document.getElementById("playlist").innerHTML = `<p style="margin:15px;font-size:1.2em;">${name}</p>`
            }

        },
        init: async function() {
            const url = "https://saavn.me/songs?id=" + id;
            await fetch(url)
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
                    this.addTrack(objs); // push objs to the tracks array
                })
                .catch(err => console.log(err));
            this.nextTrack();
            this.prevTrack();
            this.$forceUpdate();
            this.play();


        }, //function end
        updateNotification() {

            if ("mediaSession" in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: this.tracks[this.currentTrackIndex].name,
                    artist: this.tracks[this.currentTrackIndex].artist,
                    album: this.tracks[this.currentTrackIndex].artist,
                    artwork: [{
                        src: this.tracks[this.currentTrackIndex].cover
                    }],
                });

                navigator.mediaSession.setActionHandler('previoustrack', () => {
                    // Play previous track.
                    this.prevTrack();
                });

                navigator.mediaSession.setActionHandler('nexttrack', () => {
                    // Play next track.
                    this.nextTrack();
                });

                navigator.mediaSession.setActionHandler('stop', () => {
                    // Stop playback and clear state if appropriate.
                    this.play();
                });
                navigator.mediaSession.setActionHandler('play', async () => {
                    // Resume playback
                    this.play();
                });

                navigator.mediaSession.setActionHandler('pause', () => {
                    // Pause active playback
                    this.play();
                });


            }

        },
        play() {


            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
                mediaSession.playbackState = "playing";
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
                mediaSession.playbackState = "paused";
            }
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },
        clickProgress(e) {
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        prevTrack() {
            this.transitionName = "scale-in";
            this.isShowCover = false;
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
                favicon.href = this.tracks[this.currentTrackIndex].cover;
                document.title = this.tracks[this.currentTrackIndex].name;
                this.updateNotification();

            } else {
                this.currentTrackIndex = this.tracks.length - 1;
                favicon.href = this.tracks[this.currentTrackIndex].cover;
                document.title = this.tracks[this.currentTrackIndex].name;
                this.updateNotification();
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        nextTrack() {
            this.transitionName = "scale-out";
            this.isShowCover = false;
            if (this.currentTrackIndex < this.tracks.length - 1) {
                this.currentTrackIndex++;
                favicon.href = this.tracks[this.currentTrackIndex].cover;
                document.title = this.tracks[this.currentTrackIndex].name;
                this.updateNotification();
            } else {
                this.currentTrackIndex = 0;
                favicon.href = this.tracks[this.currentTrackIndex].cover;
                document.title = this.tracks[this.currentTrackIndex].name;
                this.updateNotification();

            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
                if (this.isTimerPlaying) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            }, 300);
        },
        favorite() {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                this.currentTrackIndex
            ].favorited;
            localStorage.setItem("lovelytracks", JSON.stringify(this.tracks));
        }
    },
    created() {

        this.init();
        for (let i = 0; i < this.tracks.length; i++) {
            var name = this.tracks[i].name;
            document.getElementById("playlist").innerHTML += `<p style="margin:5px;font-size:1.2em;">${name}</p>`
        }

        favicon.href = this.tracks[this.currentTrackIndex].cover;
        document.head.appendChild(favicon);

        // set title
        document.title = this.tracks[this.currentTrackIndex].name;
        this.updateNotification()



        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function() {
            vm.generateTime();
        };
        this.audio.onloadedmetadata = function() {
            vm.generateTime();
        };
        this.audio.onended = function() {
            vm.nextTrack();
            this.isTimerPlaying = true;
            this.updateNotification();
        };

        // this is optional (for preload covers)
        for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            document.head.appendChild(link);
        }
    }
});