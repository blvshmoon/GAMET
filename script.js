const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");

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
'kalau kamu lagi cape, terus respon aku ga sesuai sama apa yang kamu mau atau beda dari biasanya ( lebih cuek ), kamu marah atau malah nambah cape? dan kenapa?',
'semisalnya takdir berkata lain, kita yang awalnya mau tinggal bareng malah ga jadi, apa solusi dari masalah ini?',
'pas kita tinggal bareng nih, pasti selalu panggil sayang, nah kalau aku ga manggil sayang ke kamu seharian, kamu bakal mikir aku udah ga sayang atau aku udah bosen manggil sayang?',
'kalau aku manggil kamu nama doang di depan temen yang tau hubungan kita, itu jadi masalah bagi kamu ga?',
'kamu bisa ga kalau marah jangan malah tidur atau diem, ganti jadi bawel, rungsing, atau tantrum, bisa ga?',
'di hari masih kerja aku janji bakal ngajak kamu keluar buat jalan-jalan, tapi pas di weekend nya janji itu ga terlaksana, kamu bakal ngerasain apa?',
'aku ngajak temen kerja aku ke rumah kita berdua nanti, terus ga sengaja bahas sesuatu yang ga kamu suka, kamu bakal negur atau malah nanti negur nya ke aku doang?',
'sesuatu yang mustahil bakal terjadi, ga ada yang ga mungkin. kalau suatu saat kedua orang tua kamu tau hubungan kita berdua apa, setelahnya mereka pengen bawa kamu jauh dari aku, kamu menyikapi nya gimana? itu orang tua kamu, pasti kamu sayang',
'siap ga kamu kalau aku minta sesuatu yang ga kepikiran sama sekali di otak kamu?',
'ayo jujur sama aku ya, kamu masih tertarik sama lawan jenis, atau ga ada rasa tertarik sama sekali?',
'ada satu laki-laki yang merhatiin kamu banget, tau apapun yang kamu suka atau ga suka meski dia udah kamu hindari berkali-kali tapi dia ga nyerah. disalah satu kesempatan dia untuk dekat kamu itu, ada ga yang bakal kamu respon cara dia ngedeketin kamu?',
'kamu marah kalau aku bahas perempuan lain, misalnya perempuan di tiktok atau di media sosial lainnya yang lagi beredar?',
'kamu mau ngajarin sesuatu ga sama aku yang umurnya lebih muda dari kamu? itung-itung pengalaman hidup.',
'kalau aku lagi di dalam kondisi ga baik-baik aja, kamu bakal sadar? gimana caranya?',
'keadaan nya kita renggang karena masalah yang bisa dibilang gede, kira-kira siapa yang bakal ngerapihin masalah kerenggangan itu? aku atau kamu? jelasin.',
'suatu saat aku pasti negur kamu soal pakaian, tapi sebisa mungkin aku ngerangkai kata supaya kamu ga tersinggung atau merasa ga dihargai, kamu milih dengerin atau sebaliknya? bodoamat gitu.',
'jujur, bagi aku kamu perempuan yang bikin aku mau menata kembali masa depan indah disana, tapi di satu sisi pasti ada aja hal yang selalu bikin aku berpikiran sebaliknya, dan kamu kena imbasnya, kamu bakal bilang ke aku gimana?',
'siapa orang yang pertama kali bakal kamu hubungi kalau lagi berantem sama aku?',
'kamu lagi nangis nih terus aku liat, nah itu aku harus ngapain? soalnya aku takut kamu malah marah-marah kalau aku deketin pas lagi sensitif gitu.',
'siapa tau nanti kamu ngerasa ga kayak di posisi sebelumnya di hubungan ini, kamu ngerasa lebih turun posisi, yang tadinya di prioritasin jadi ga di prioritasin sama sekali, atau dibiarin sama aku. kamu ngeraih posisi sebelumnya atau langsung aja serang aku kenapa aku berubah gitu aja?',
'aku kan pelupa yang di sengaja, kalau aku pura-pura lupain hal-hal kecil tentang kamu, kamu gimana? respon nya',
'aku mau minta sesuatu dari kamu yang ga kamu pikirkan sama sekali sebelumnya, kamu siap ngasih nya?'
  ],

  Lia: [
'kamu suka kesel ga kalo aku terus nanya "kamu sayang sama aku ga??" ,kenapa??',
'menurut kamu aku masii egois ga waktu kita berantem??',
'menurut kamu apa kebiasaan aku yang sebenernya bikin kamu cape tapi kamu ga berani ngomong??',
'kapan terakhir kali kamu bohong ke aku meski bohong kecil dan kenapa kamu ngerasa perlu ngelakuin itu??',
'kalo kamu lagi cemburu aku harus ngapaian??',
'menurut kamu seberapa penting sii rasa cemburu di dalam hubungan??',
'ada ga hal yang menurut aku biasa aja tapi menurut kamu itu tuh ngeselin bangettt??',
'gimana caranya biar aku bisa jadi pasangan yang terbaik buat kamu??',
'ada ga masalah yang udaa kita anggap beres padahal masii pengen kamu bahas??',
'ada ga orang lain yang akhir² ini kamu chat secara intens??',
'menurut kamu alasan seseorang selingkuh itu kenapa??',
'aku udaa jadi support system kamu atau belum?? kenapa??',
'kalo kamu kecewa sama aku gimana caranya biar kamu bisa maafin aku??',
'menurut kamu selain selingkuh apa sii yang bisa bikin hubungan kita rusak??',
'ada ga hal yang belum kamu percayai sepenuhnya dari aku??',
'apa yang ada dipikaran kamu waktu pas pertama kali kenal??',
'kalo semisal kamu udaa tau semua keburukan aku apa yang bakal kamu lakuin??',
'hal apa yang sering bikin kamu overthinking??',
'sejauh ini aku lebih sering ngertiin kamu atau banyak salah pahamnya??',
'ada ga hal yang bikin kamu insecure di dalam hubungan ini??',
'apa yang kamu rasain waktu aku ceritain masa lalu aku??',
'dari 1-10 seberapa besar kamu ngerasa disayang sama aku?? kenapa??'
  ]
};

let angle = 0;

function drawWheel() {
  const arc = (2 * Math.PI) / options.length;

  for (let i = 0; i < options.length; i++) {
    ctx.beginPath();

    // warna beda
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

function closePopup() {
  document.getElementById("popup").classList.remove("show");
}

spinBtn.addEventListener("click", spinWheel);

// pertama kali gambar
drawWheel();
