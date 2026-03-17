window.onload = function () {

  const canvas = document.getElementById("wheel");
  const ctx = canvas.getContext("2d");
  const spinBtn = document.getElementById("spinBtn");

  // 🔥 FIX SIZE BIAR MUNCUL DI HP
  canvas.width = 300;
  canvas.height = 300;

  // 🎡 isi wheel
  const options = [
    "Difa", "Lia",
    "Difa", "Lia",
    "Difa", "Lia",
    "Difa", "Lia"
  ];

  // 🎯 pertanyaan
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

  function drawWheel() {
    const arc = (2 * Math.PI) / options.length;

    for (let i = 0; i < options.length; i++) {
      ctx.beginPath();

      ctx.fillStyle = options[i] === "Difa" ? "#ffb6c1" : "#ff69b4";

      ctx.moveTo(150, 150);
      ctx.arc(150, 150, 150, i * arc, (i + 1) * arc);
      ctx.fill();

      ctx.save();
      ctx.translate(150, 150);
      ctx.rotate(i * arc + arc / 2);

      ctx.fillStyle = "white";
      ctx.font = "bold 16px Comic Sans MS";

      // ✨ glow
      ctx.shadowColor = "#ff69b4";
      ctx.shadowBlur = 12;

      ctx.fillText(options[i], 50, 5);

      ctx.shadowBlur = 0;

      ctx.restore();
    }
  }

  function spinWheel() {
    let spin = Math.random() * 360 + 720;
    let duration = 2000;
    let start = null;

    function animate(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      let rotation = spin * (progress / duration);

      ctx.clearRect(0, 0, 300, 300);
      ctx.save();
      ctx.translate(150, 150);
      ctx.rotate((angle + rotation) * Math.PI / 180);
      ctx.translate(-150, -150);
      drawWheel();
      ctx.restore();

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        angle += spin;
        showResult();
      }
    }

    requestAnimationFrame(animate);
  }

  function showResult() {
    const arc = 360 / options.length;
    const index = Math.floor((360 - (angle % 360)) / arc) % options.length;
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
