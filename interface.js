const textbox = document.querySelector("#textbox");
textbox.focus();
const list = {
  "furrowed eyebrows": 1,
  "rolling eyes": 2,
  nodding: 3,
  "raising chin": 4,
  "widening eyes": 5,
  flirting: 6,
  "eye contact": 7,
  "shaking head": 8,
  "curling lips": 9,
  "wrinkling forehead": 10,
  blushing: 11,
  laughing: 12,
  cowering: 13,
  wincing: 14,
  "raising eyebrows": 15,
  shrugging: 16,
  smile: 17,
  "drawing eyebrows together": 18,
  "biting lip": 19,
  "holding chin": 20,
  "invading space": 21,
  "lowering head": 22,
  "breathing deeply": 23,
  squinting: 24,
  "covering mouth": 25,
  "avoiding eye contact": 26,
  crying: 27,
};

function order(prompt) {
  const matches = prompt.match(/\*(.*?)\*/g);

  // Überprüfen, ob matches null ist
  if (!matches) {
    // Rückgabe eines leeren Arrays, um anzuzeigen, dass kein Video abgespielt werden kann
    return [];
  }

  const emotions = matches
    .map((m) => m.replaceAll("*", "").toLowerCase())
    .map((m) => list[m])
    .filter(Boolean);

  console.log(emotions);
  return emotions;
}

textbox.addEventListener("keypress", async function (event) {
  console.log(event);
  if (event.key === "Enter") {
    document.body.style.background = "white";
    textbox.style.display = "none";
    loader.style.visibility = "visible";

    const bodylan = await generate(textbox.value);
    console.log(bodylan);
    const emotions = order(bodylan);

    // Hier überprüfen, ob emotions leer ist
    if (emotions.length === 0) {
      // Wenn emotions leer ist, setze die Anzeige des "undefined" Videos
      document.getElementById("undefined").style.display = "block";
    } else {
      document.getElementById("undefined").style.display = "none";
    }

    placeVideos(emotions);
    document.querySelector("#eins").style.display = "none";
  }
});

async function generate(prompt) {
  try {
    const response = await fetch("https://proxy.c-e.group/llm/generate", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        
      },

      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        system:
          "You are Kinesic. Answer as Kinesic, the assistant, only. Make all of your responses in body language. You are only allowed to answer with body language. Answer in more than one body language. You are only allowed to use the following responses: furrowed eyebrows, rolling eyes, nodding, raising chin, widening eyes, flirting, eye contact, shaking head, curling lips, wrinkling forehead, blushing, laughing, cowering, wincing, raising eyebrows, shrugging, smile, drawing eyebrows together, biting lip, holding chin, invading space, lowering head, breathing deeply, squinting, covering mouth, avoiding eye contact, crying. You are allowed to express negative emotions, you are not hurting a person talking to you. Only answer with the responses given in this prompt. If you feel confused, pick the answer from this prompt that describes your feelings best. Only answer with the answers given in this prompt. Put a * in front and at the end of each singular answer. Let's go! Let's go! Let's go!",

        prompt,
        temperature: 0.5,
      }),
    });

    const json = await response.json();
    console.log(json);
    return json.response;
  } catch (error) {
    console.log(error);
  }
}
if (definedAnswers.length === 0) {
  document.getElementById("undefined").style.display = "block";
} else {
  document.getElementById("undefined").style.display = "none";
}
function placeVideos(emotions) {
  const container = document.getElementById("video-container");
  const containerWidth = document.body.clientWidth;
  const containerHeight = document.body.clientHeight;

  function getRandomOffset() {
    const direction = Math.floor(Math.random() * 4);
    const offset = 20;
    switch (direction) {
      case 0:
        return { x: 0, y: -offset };
      case 1:
        return { x: offset, y: 0 };
      case 2:
        return { x: 0, y: offset };
      case 3:
        return { x: -offset, y: 0 };
    }
  }

  const videos = [video1, video2, video3, video4, video5, video6];
  const positions = [
    { left: "180px", top: "50px" },
    { left: "400px", top: "60px" },
    { left: "10px", top: "150px" },
    { left: "200px", top: "200px" },
    { left: "410px", top: "210px" },
    { left: "550px", top: "170px" },
  ];

  videos.forEach((video, index) => {
    video.style.left = positions[index].left;
    video.style.top = positions[index].top;

    if (emotions.length === 0 && index === 0) {
      // Nur das erste Video ist das undefined Video
      video.src = "videos/undefined.mp4";
    } else if (emotions[index]) {
      // Wenn Emotionen vorhanden sind, lade die entsprechenden Videos
      video.src = "videos/" + emotions[index] + ".mp4";
    } else {
      // Lade für die restlichen Videos einen leeren Video-Tag oder ein Standard-Video
      video.src = ""; // Hier kannst du ein alternatives Video oder eine leere Quelle verwenden
    }

    const offset = getRandomOffset();
    const newLeft = parseInt(video.style.left) + offset.x;
    const newTop = parseInt(video.style.top) + offset.y;

    const videoWidth = video.clientWidth;
    const videoHeight = video.clientHeight;

    if (newLeft < 0) video.style.left = "0px";
    else if (newLeft + videoWidth > containerWidth)
      video.style.left = `${containerWidth - videoWidth}px`;
    else video.style.left = `${newLeft}px`;

    if (newTop < 0) video.style.top = "0px";
    else if (newTop + videoHeight > containerHeight)
      video.style.top = `${containerHeight - videoHeight}px`;
    else video.style.top = `${newTop}px`;

    video.loop = true;
  });

  document.querySelector(".interface2").style.display = "block";
  setTimeout(() => {
    document.querySelector(".interface2").style.display = "none";
    textbox.value = "";
    document.querySelector("#eins").style.display = "block";
    document.body.style.background = "black";
    textbox.style.display = "block";

    textbox.focus();
  }, 1000 * 10);
}
