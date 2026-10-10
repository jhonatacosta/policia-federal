let context, drone;
export function stopSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}
export function narrate(text, onEnd = () => {}) {
  stopSpeech();
  if (!("speechSynthesis" in window)) return false;
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "pt-BR";
  speech.rate = 0.92;
  speech.pitch = 0.85;
  const voices = window.speechSynthesis.getVoices();
  speech.voice =
    voices.find((v) => v.lang === "pt-BR") ||
    voices.find((v) => v.lang.startsWith("pt")) ||
    null;
  speech.onend = onEnd;
  speech.onerror = onEnd;
  window.speechSynthesis.speak(speech);
  return true;
}
export function ambience(enabled) {
  if (!enabled) {
    if (context) context.suspend();
    return;
  }
  try {
    if (!context) {
      context = new (window.AudioContext || window.webkitAudioContext)();
      const gain = context.createGain();
      gain.gain.value = 0.025;
      gain.connect(context.destination);
      drone = context.createOscillator();
      drone.type = "sine";
      drone.frequency.value = 73.42;
      drone.connect(gain);
      drone.start();
      const other = context.createOscillator();
      other.frequency.value = 110;
      other.connect(gain);
      other.start();
    }
    context.resume();
  } catch {}
}
