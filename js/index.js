const btnGrabar = document.querySelector(".btnGrabar");
const detenerGrabar = document.querySelector(".btnDetenerGrabar");

btnGrabar.addEventListener("click", async () => {
  const media = await navigator.mediaDevices.getDisplayMedia({
    audio: { sampleRate: 44100 },
    video: { frameRate: { ideal: 60 } },
  });
  const mediarecorder = new MediaRecorder(media, {
    mimeType: "video/webm;codecs=vp8,opus",
    audioBitsPerSecond: 128000,
  });
  mediarecorder.start();

  const [video] = media.getVideoTracks();

  activarBoton();

  detenerGrabar.addEventListener("click", () => {
    video.addEventListener("ended", () => {
      mediarecorder.stop();
      desactivarBoton();
    });
  });

  video.addEventListener("ended", () => {
    mediarecorder.stop();
    desactivarBoton();
  });

  mediarecorder.addEventListener("dataavailable", (e) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(e.data);
    link.download = "captura.webm";
    link.click();
  });
});

const activarBoton = () => {
  detenerGrabar.classList.remove("desactivado");
  detenerGrabar.classList.add("activar");
};

const desactivarBoton = () => {
  detenerGrabar.classList.remove("activar");
  detenerGrabar.classList.add("desactivado");
};
