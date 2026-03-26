window.onload = function () {

  const canvas = document.getElementById("wheel");
  const ctx = canvas.getContext("2d");
  const spinBtn = document.getElementById("spinBtn");

  canvas.width = 300;
  canvas.height = 300;

  const options = [
    "Difa", "Lia",
    "Difa", "Lia",
    "Difa", "Lia",
    "Difa", "Lia"
  ];

  const questions = {
    Difa: [
      "Apa rahasia terbesar kamu?",
      "Siapa crush kamu sekarang?",
      "Hal paling memalukan?",
      "Pernah bohong ke teman?",
      "Makanan favorit?",
      "Hal yang kamu takutkan?",
      "Pernah suka sama teman sendiri?",
      "Apa impian kamu?",
      "Hal paling aneh yang pernah kamu lakukan?",
      "Pernah nangis gara-gara apa?",
      "Siapa orang paling penting buat kamu?",
      "Pernah nyontek?",
      "Apa kebiasaan buruk kamu?",
      "Film favorit?",
      "Lagu favorit?",
      "Hal paling bikin kamu malu?",
      "Pernah dimarahin guru?",
      "Apa yang bikin kamu bahagia?",
      "Pernah jatuh cinta?",
      "Apa warna favorit kamu?",
      "Kalau bisa jadi orang lain, mau jadi siapa?"
    ],

    Lia: [
      "Apa rahasia kamu?",
      "Siapa orang yang kamu suka?",
      "Hal paling memalukan?",
      "Pernah bohong?",
      "Makanan favorit?",
      "Hal yang paling kamu takutkan?",
      "Pernah suka diam-diam?",
      "Apa cita-cita kamu?",
      "Hal paling aneh yang pernah kamu lakukan?",
      "Pernah nangis karena apa?",
      "Siapa orang paling penting?",
      "Pernah nyontek?",
      "Kebiasaan buruk kamu?",
      "Film favorit?",
      "Lagu favorit?",
      "Hal paling bikin malu?",
      "Pernah kena hukuman?",
      "Apa yang bikin kamu senang?",
      "Pernah jatuh cinta?",
      "Warna favorit?",
      "Kalau jadi orang lain, mau jadi siapa?"
    ]
  };

  let angle = 0;
  let spinning = false;

  function drawWheel() {
    const arc = (2 * Math.PI) / options.length;

    for (let i = 0; i < options.length; i++) {
      const start = i * arc;
      const end = start + arc;

      ctx.beginPath();
      ctx.fillStyle = options[i] === "Difa" ? "#ffb6c1" : "#ff69b4";
      ctx.moveTo(150, 150);
      ctx.arc(150, 150, 150, start, end);
      ctx.fill();

      ctx.save();
      ctx.translate(150, 150);
      ctx.rotate(start + arc / 2);

      ctx.fillStyle = "white";
      ctx.font = "bold 14px Poppins";

      ctx.fillText(options[i], 60, 5);

      ctx.restore();
    }
  }

  function spinWheel() {
    if (spinning) return;
    spinning = true;

    let spin = Math.random() * 360 + 720; // putaran
    let duration = 3000;
    let start = null;

    function animate(timestamp) {
      if (!start) start = timestamp;

      let progress = timestamp - start;
      let ease = 1 - Math.pow(1 - progress / duration, 3);
      let currentRotation = spin * ease;

      ctx.clearRect(0, 0, 300, 300);

      ctx.save();
      ctx.translate(150, 150);
      ctx.rotate((angle + currentRotation) * Math.PI / 180);
      ctx.translate(-150, -150);

      drawWheel();

      ctx.restore();

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        angle += spin;
        spinning = false;
        showResult();
      }
    }

    requestAnimationFrame(animate);
  }

  function showResult() {
    const arc = 360 / options.length;

    // 🎯 biar sesuai pointer atas
    const adjustedAngle = (angle + 90) % 360;

    const index = Math.floor((360 - adjustedAngle) / arc) % options.length;
    const name = options[index];

    const personQuestions = questions[name];
    const randomQuestion =
      personQuestions[Math.floor(Math.random() * personQuestions.length)];

    document.getElementById("popupName").innerText = name;
    document.getElementById("popupText").innerText = randomQuestion;

    document.getElementById("popup").classList.add("show");
  }

  window.closePopup = function () {
    document.getElementById("popup").classList.remove("show");
  };

  spinBtn.addEventListener("click", spinWheel);

  drawWheel();
};
