function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

  var music = new sound("Groovy-funky-music-clip.mp3");
  var introMusic = new sound("Mysterious-synth-pad-104-bpm.mp3");
  var winMusic = new sound("8-bit-world.mp3");
  var lossMusic = new sound("Maria-theresia-von-paradis-sicilienne.mp3");
  var gameWonMusic = new sound("Motivational-upbeat-electronic-music-magical-path.mp3");
  var level2Music = new sound("Relaxing-thinking-time-music.mp3");