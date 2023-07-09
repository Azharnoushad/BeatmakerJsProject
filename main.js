class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.playBtn = document.querySelector(".play");
    this.index = 0;
    this.bpm = 150;
  }

  repeatAudio() {
    const step = this.index % 8;
    const activePad = document.querySelectorAll(`.b${step}`);

    activePad.forEach((pad) => {
      pad.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;

          this.snareAudio.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;

          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  startAudio() {
    console.log(this);
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeatAudio();
    }, interval);
  }
  activePads() {
    this.classList.toggle("active");
  }
}

const drumKit = new DrumKit();

const startBeats = () => {
  drumKit.startAudio();
};

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePads);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});
drumKit.playBtn.addEventListener("click", startBeats);
