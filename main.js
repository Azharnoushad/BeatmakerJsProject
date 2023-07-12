class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.playBtn = document.querySelector(".play");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  repeat() {
    let step = this.index % 8;
    this.index++;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.play();
          this.kickAudio.currentTime = 0;
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.play();
          this.snareAudio.currentTime = 0;
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.play();
          this.hihatAudio.currentTime = 0;
        }
      }
    });
  }

  start() {
    const interval = (60 / this.bpm) * 1000;

    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerHTML = "Play";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerHTML = "Stop";
      this.playBtn.classList.remove("active");
    }
  }

  activePad() {
    this.classList.toggle("active");
  }

  animationEnd() {
    this.style.animation = "";
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectValue = e.target.value;

    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectValue;
        break;
    }
  }
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempotext = document.querySelector(".tempo-nr");
    tempotext.innerHTML = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;

    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

const playBeats = () => {
  drumKit.start();
  drumKit.updateBtn();
};

// Add event listernerssss-===============================================

drumKit.playBtn.addEventListener("click", playBeats);
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", drumKit.animationEnd);
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((mute) => {
  mute.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
