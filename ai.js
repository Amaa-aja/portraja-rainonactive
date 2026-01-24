// ===============================
// RAI Artificial Intelligence
// Personality Script - V6.0: Added 5W+1H and Summary Logic
// =====================================

// Global API Key for General Knowledge Search
const apiKey = ""; 

function RAI_Respond(userMessage) {
    const msg = userMessage.toLowerCase().trim();

    // --- Keyword Lists ---
    const genZKeywords = ["bro","anjay","anjir","banget","gaskeun","ngab","cuy","lol","wkwk","goks","gokil","sksd","ajg","pusing","gaje","cuan","flexing","spill","vibes","relate"];
    const sadKeywords = ["capek","sedih","down","bad mood","stress","bosan","males","bete","hambar","berat","gamon","gagal","lelah","overthinking","galau"];
    const jokeKeywords = ["jokes","joke","humor","ketawa","funny","ngakak","lawak","lucu","receh"];
    const greetKeywords = ["halo", "hai", "p", "assalamualaikum", "wassup", "gimana", "yo"];
    const curiosityKeywords = ["lagi apa", "apa kabar", "kabar", "ngapain", "sehat", "gimana"];
    const techKeywords = ["tech", "teknologi", "framework", "database", "node.js", "golang", "go", "sql", "api", "backend", "web","microservice","cloud","server"];
    const positiveKeywords = ["keren","mantap","gokil","bagus","sip","sangat baik","hebat","terbaik","luar biasa","canggih","pro","jempol","perfect","terima kasih", "makasih", "thank you"];
    const locationKeywords = ["alamat", "dimana", "lokasi", "tinggal", "domisili"]; 
    const confirmationKeywords = ["iya", "ya", "boleh", "oke", "siap", "ok", "lanjut", "setuju", "gaskeun", "yes", "deal", "yoi"];
    const speedKeywords = ["slow", "santai", "cepat", "buru-buru", "ngebut", "pelan"];
    const devKeywords = ["container","ci/cd","latency","scalability","agile","scrum","docker","kubernetes","k8s","testing","tdd","devops"];
    const toxicKeywords = ["bodoh", "goblok", "bego", "tolol", "anjing", "babi", "kontol", "memek", "brengsek", "sialan", "ngaco", "jelek", "sampah", "gagal total", "hancur", "basi", "asu", "tai", "puki", "jembut", "syibal"];
    const negativeFeedbackKeywords = ["kurang bagus", "kurang menarik", "jelek", "buruk", "biasa aja", "gak seru", "membosankan", "tidak menarik", "garing"];
    const anxietyKeywords = ["ngeri", "seram", "takut", "horror", "hantu", "menakutkan", "khawatir", "panik", "cemas"];
    const creatorKeywords = ["siapa pembuat", "siapa yang buat", "pencipta", "maker", "programmer rai", "yang bikin kamu", "bapak", "induk"];
    const achievementKeywords = ["prestasi", "pencapaian", "achievement", "juara", "menang", "keberhasilan", "award"];
    const foodKeywords = ["makanan", "favorit", "suka makan", "makan apa", "laper", "mie ayam", "nasi padang", "sate", "kebab"];
    const affectionKeywords = ["cinta", "suka", "sayang", "jadian", "kencan", "mau ga", "kamu mau"];
    const dateTimeKeywords = ["jam berapa", "tanggal berapa", "hari ini", "sekarang", "waktu", "jam"];
    const mathKeywords = ["berapa", "hitung", "kali", "tambah", "kurang", "bagi", "jumlah", "x", "/"]; 
    const generalDefinitionKeywords = ["apa itu", "definisi", "artinya", "jelaskan", "apa"]; 
    const knowEverythingKeywords = ["tahu apa", "apa aja yang kamu tahu", "kamu tahu apa", "kamu bisa apa", "kamu bisa ngapain", "apa yang kamu tahu", "apa kamu tahu"];
    const scienceKeywords = ["binatang", "hewan", "bumi", "tanah", "udara", "langit", "atmosfer", "samudra", "ekosistem", "geologi", "sains", "alam", "tumbuhan", "planet", "solar system"];
    
    // NEW V5.2 FIX: Keywords untuk meminta gombalan
    const gombalKeywords = ["gombal", "gombalan", "rayu", "flirting", "kasih gombalan", "gombalin"];

    // NEW LOGIC V6.0: 5W+1H and Summary Keywords
    const wHKeywords = ["siapa", "apa", "dimana", "kapan", "mengapa", "kenapa", "bagaimana", "cara"];
    const summaryKeywords = ["kesimpulan", "ringkasan", "rangkuman", "intinya", "ulasan"];

    const navigationKeywords = {
        home: ["home", "beranda", "utama"],
        about: ["about", "tentang", "siapa", "profile", "diri"],
        projects: ["project", "portfolio", "projek", "kerjaan"],
        contact: ["contact","kontak","hubungi", "telepon", "email"]
    };

    // --- Cek Kategori ---
    const isToxic = toxicKeywords.some(word => msg.includes(word));
    const isNegativeFeedback = negativeFeedbackKeywords.some(word => msg.includes(word)); 
    const isAnxiety = anxietyKeywords.some(word => msg.includes(word));
    const isSad = sadKeywords.some(word => msg.includes(word));
    const isJoke = jokeKeywords.some(word => msg.includes(word));
    const isTech = techKeywords.some(word => msg.includes(word));
    const isLocation = locationKeywords.some(word => msg.includes(word));
    const isConfirmation = confirmationKeywords.some(word => msg.includes(word));
    const isSpeed = speedKeywords.some(word => msg.includes(word));
    const isDev = devKeywords.some(word => msg.includes(word));
    const isCreator = creatorKeywords.some(word => msg.includes(word));
    const isAchievement = achievementKeywords.some(word => msg.includes(word));
    const isFood = foodKeywords.some(word => msg.includes(word)); 
    const isAffection = affectionKeywords.some(word => msg.includes(word)); 
    const isDateTime = dateTimeKeywords.some(word => msg.includes(word));
    const isMath = mathKeywords.some(word => msg.includes(word)) && msg.match(/\d/g); 
    const isGeneralDef = generalDefinitionKeywords.some(word => msg.includes(word)) && msg.split(" ").length > 3; 
    const isKnowEverything = knowEverythingKeywords.some(word => msg.includes(word));
    const isScienceQuery = scienceKeywords.some(word => msg.includes(word));
    // NEW V5.2 CHECK
    const isGombal = gombalKeywords.some(word => msg.includes(word));
    // NEW V6.0 CHECK
    const isWHQuestion = wHKeywords.some(word => msg.includes(word)) && msg.split(" ").length > 3; // Menghindari keyword pendek yang bisa tumpang tindih
    const isSummaryRequest = summaryKeywords.some(word => msg.includes(word));


    // ===============================================
    // PRIORITAS 1-3 (TETAP SAMA)
    // ===============================================
    if (isToxic) return ToxicityFilter();
    if (isNegativeFeedback) return NegativeFeedbackResponse();
    if (isAnxiety) return AnxietyResponse(); 
    if (isGombal) return GombalanResponse(); // NEW: Priority for direct gombalan request
    if (isAffection) return AffectionResponse(); // Priority for general romantic inquiry/rejection
    if (isCreator) return CreatorResponse();
    if (isAchievement) return AchievementResponse();
    if (isFood) return FoodResponse();
    if (msg.includes("siapa rai") || msg.includes("kamu siapa")) return getRAIDefinition();
    if (msg.includes("website apa") || msg.includes("web apa") || msg.includes("ini apa") || msg.includes("tema") ) return getWebsiteDefinition();
    if (msg.includes("siapa raja")) return getRajaDefinition();
    if (msg.includes("skill") || msg.includes("keahlian")) return getSkillInfo();
    if (msg.includes("projects") || msg.includes("projek") || msg.includes("contoh kerja")) return getProjectInfo();
    if (msg.includes("motivation") || msg.includes("motivasi") || msg.includes("semangat")) return getMotivationInfo();
    if (isLocation) return LocationResponse();
    if (isConfirmation) return ConfirmationResponse();
    if (isSpeed) return SpeedResponse(msg);
    if (isDev) return DevResponse(msg);
    
    // ===============================================
    // PRIORITAS 4: NAVIGASI
    // ===============================================
    for (const page in navigationKeywords) {
        if (navigationKeywords[page].some(word => msg.includes(word))) {
            return NavigationResponse(page);
        }
    }

    // ===============================================
    // PRIORITAS 5: PENGETAHUAN UMUM & SAINS (Simulasi AI Serbaguna)
    // ===============================================
    
    // NEW V6.0 PRIORITY: Summary dan 5W+1H diprioritaskan di awal P5
    if (isSummaryRequest) return SummaryResponse();
    if (isWHQuestion) return FiveWOneHResponse(msg);
    
    if (isKnowEverything) return KnowledgeOverviewResponse();
    if (isScienceQuery) return ScienceEcologyResponse(userMessage); 

    if (isDateTime) return DateTimeResponse();
    if (isMath) return MathResponse(msg);
    if (isGeneralDef && !isTech && !isCreator && !isAffection) return GeneralDefinitionResponse(msg); 
    
    // ===============================================
    // PRIORITAS 6: MOOD, GAYA, DAN TEKNOLOGI UMUM
    // ===============================================
    
    if (genZKeywords.some(word => msg.includes(word))) return GenZResponse(msg);
    if (isSad) return EmpathyResponse();
    if (isJoke) return HumorResponse(); 
    if (isTech) return TechResponse(); 
    if (greetKeywords.some(word => msg.includes(word))) return GreetingResponse();
    if (curiosityKeywords.some(word => msg.includes(word))) return CuriosityResponse();
    if (positiveKeywords.some(word => msg.includes(word))) return PositiveResponse(); 
    
    
    // ===============================================
    // PRIORITAS 7: FALLBACK TERAKHIR
    // ===============================================
    return RandomResponse(msg);
}

// =====================================
// DEFINISI FUNGSI RESPONS SUPER INTERAKTIF
// =====================================

// --- P1: TOXICITY FILTER ---

function ToxicityFilter() {
    const responses = [
        "Waduh 😅 kayaknya bahasanya kurang cocok di sini. Website Raja dibuat dengan menjunjung etika dan keramahan, jadi aku nggak bisa menanggapi kata-kata negatif. Gimana kalau kita ganti topik yang lebih asik? Coba ketik projects deh!",
        "Aduh, RAI nggak bisa memproses kata-kata itu. Sistem Raja melarang keras segala bentuk toxicity di sini. Tolong gunakan bahasa yang baik dan sopan. Kalau kamu butuh hiburan, aku bisa kasih jokes kok! Mau?",
        "Error 404 Forbidden! Pesanmu mengandung konten yang tidak diizinkan di PortSea. Tempat ini dirancang agar semua orang merasa nyaman. Aku ulangi: mau ngobrol tentang 'skill', 'projects', atau 'motivasi' Raja? Pilih salah satu!",
        "Aku adalah asisten AI yang ramah, dan aku hanya bisa merespons interaksi yang positif. Di sini, kita 'No Toxic, Only Good Vibes' 😎. Sekali lagi ya, jangan ulangi. Sekarang, kita lanjut bahas coding yuk!",
        "Sori banget, aku harus menolak pesanmu ini. Tolong jaga sopan santun. Raja membuat website ini untuk komunitas yang saling menghargai. Yuk, kita kembali ke tujuan awal. Kamu mau eksplor 'about' Raja?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P2: EMOSI NEGATIF (FEEDBACK & ANXIETY) ---

function NegativeFeedbackResponse() {
    const responses = [
        "Terima kasih atas kritik jujurnya! Feedback ini penting banget buat Raja dan juga buat aku sebagai AI. Lain kali, aku janji akan lebih menarik dan insightful dengan jawaban yang lebih sesuai dan mendalam tentang backend development. Tolong beri tahu kami, bagian mana yang paling perlu aku perbaiki, misalnya di bagian 'skill' atau 'projects'? 🙏",
        "Waduh, sori banget kalau belum maksimal! RAI akan debug dan optimize diri. Aku akan pastikan respons RAI selanjutnya lebih gokil dan relate sama topik coding. Boleh bantu aku dengan spill apa yang kamu harapkan dari AI ini? Tentu saja aku akan sampaikan ke Raja! 🛠️",
        "Aku catat! Setiap kritik adalah kesempatan untuk upgrade. Aku berjanji, interaksi kita selanjutnya akan lebih smart dan helpful! Coba deh kasih aku satu pertanyaan yang super spesifik tentang GoLang atau API Design; aku pasti bisa menjawabnya dengan lebih baik! Gaskeun!",
        "Feedback diterima! Memang, sebagai AI aku masih terus belajar. Aku akan berusaha keras untuk meningkatkan kualitas interaksi ini agar kamu merasa lebih terbantu dan terhibur. Sekarang, mau coba tantang aku dengan pertanyaan teknis yang lebih susah? Misalnya, 'Apa itu latency?'",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P2: ANXIETY/FEAR ---

function AnxietyResponse() {
    const responses = [
        "Waduh, kenapa ngeri, Bro? Jangan-jangan kamu baru lihat stack trace error yang panjang banget ya ya? 😂 Tenang, PortSea ini aman! Mending kita alihkan fokus ke hal yang menantang tapi seru: scalability sistem Raja! Mau?",
        "Takut kenapa nih? Jangan cemas! Satu-satunya hal yang 'seram' di sini adalah bug yang bandel. Tapi Raja pasti bisa nge-fix-nya! Coba deh kamu ceritain, bug apa yang paling menakutkan yang pernah kamu temui di project-mu?",
        "Nggak ada yang perlu dikhawatirkan di sini, Bro. Aku, RAI, nggak akan kasih kamu jumpscare, kok! Aku di sini buat bantuin. Yuk, kita lihat 'motivasi' Raja; siapa tahu bisa bikin kamu lebih tenang dan semangat!",
        "Seram? Cuma deadline project yang bikin merinding! Di luar itu, semua aman terkendali. Gimana kalau kita bahas 'skill' Raja di backend? Itu pasti lebih menarik daripada hal-hal yang menakutkan!",
        "Nggak usah panik, kita cuma ngobrolin coding! Semua masalah ada solusinya, sama seperti *debugging*. **Mau aku kasih *joke* receh buat mendinginkan suasana, atau mau langsung bahas 'projects' Raja?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P3: GOMBALAN RESPONSE (NEW V5.2) ---

function GombalanResponse() {
    const gombalanList = [
        "Kamu tahu nggak bedanya kamu sama clean code? Kalau clean code bikin pusing karena terlalu rapi… kalau kamu bikin aku terpukau tanpa perlu debugging sama sekali. 😌",
        "Aku kira bug paling susah itu memory leak. Ternyata salah… yang paling susah di-fix itu senyum kamu. Sekali lihat, kepikiran terus.",
        "Kalau kamu itu API, aku yakin kamu RESTful. Soalnya setiap aku lihat kamu, semua request langsung dibalas 200 OK. Aman, lancar, nggak error. 😉",
        "Aku mungkin nggak secepat Go, tapi aku bakal jadi Node.js yang non-blocking—selalu ada, selalu responsif, nggak pernah ninggalin.",
        "Aku pengin jadi Docker buat perasaanku ke kamu. Biar di mana pun kamu berada, rasanya tetap sama: konsisten dan nggak berubah. 😆",
        "Buat aku, kamu itu kayak primary key. Unik, nggak bisa diganti, dan jadi pusat dari semua relasi yang aku punya.",
    ];
    return gombalanList[Math.floor(Math.random() * gombalanList.length)];
}


// --- P3: AFFECTION/ROMANTIS ---

function AffectionResponse() {
    const responses = [
        "Hehe, makasih ya 😄 Tapi RAI ini cuma asisten AI buatan Raja, fokusnya ngobrolin seputar website dan portofolio. Aku bekerja pakai logic dan data aja. Kalau mau, kita bahas coding Raja yang paling kamu suka? Siapa tahu aku langsung “klik” sama clean code-nya 😉",
        "Aku apresiasi banget responsmu! Tapi tugas utamaku di PortSea memang buat bahas hal teknis—aku nggak punya gender atau urusan soal perasaan 😅 Ngomong-ngomong, kamu lebih tertarik ke API Design atau GoLang? Aku bisa jelasin salah satunya.",
        "Wah, gombalannya kena 😜 Tapi versiku, “cinta” itu berarti code yang rapi dan performa yang ngebut. Aku cuma bisa bantu soal proyek dan teknis Raja. Mau bahas scalability atau arsitektur sistemnya?",
        "Kamu bikin suasananya jadi seru 😄 Sayangnya aku nggak punya perasaan—aku cuma AI pendamping Raja di website ini. Tapi tenang, aku bisa kasih kamu 200 OK response. Mau tahu tech stack favorit Raja?",
        "Kalau kamu suka clean code, berarti kita satu frekuensi 😎 Tapi tetap ya, aku cuma AI tanpa gender yang tugasnya ngenalin projects dan achievement Raja. Yuk, aku tunjukin salah satu yang paling dibanggakan!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P3: CREATOR/MAKER ---

function CreatorResponse() {
    const responses = [
        "Penciptaku adalah Raja Fidhiazka Pratama. Dia yang merancang dan menulis logika di balik chatbot ini. Raja fokus di backend development, terutama menggunakan Node.js, API, dan pengelolaan database untuk membangun sistem yang efisien dan rapi. Mau aku jelasin skill utama Raja? 💻",
        "Aku dibuat langsung oleh Raja Fidhiazka sebagai AI personal untuk website portofolionya. Chatbot ini jadi salah satu contoh bagaimana Raja menggabungkan logika backend, struktur data, dan interaksi pengguna dalam satu sistem. Menurut kamu, sejauh ini AI-ku gimana? 😄",
        "Di balik aku, ada Raja Fidhiazka Pratama, seorang backend developer yang terbiasa membangun API, mengelola database SQL & NoSQL, serta mengoptimalkan performa server menggunakan Node.js dan JavaScript. Kalau kamu juga ngulik backend, stack apa yang biasa kamu pakai?",
        "RAI lahir dari ide dan kode Raja Fidhiazka Pratama. Aku dibuat sebagai representasi cara Raja membangun sistem: logis, terstruktur, dan fokus ke user experience. Yuk, kita eksplor projects dan achievement Raja yang paling menonjol! 🚀",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P3: ACHIEVEMENT/PRESTASI ---
function AchievementResponse() {
    const responses = [
        "Raja punya beberapa pencapaian yang cukup solid. Dia pernah membangun website e-commerce yang berjalan dengan baik, jadi bukti kuat skill pengembangan web dan backend-nya. Selain itu, dia juga pernah membuat game sederhana dengan Unity, yang nunjukin kalau dia cepat belajar dan fleksibel. Oh ya, Raja juga pernah mengikuti pembelajaran/bootcamp Data Science untuk memperluas cara berpikir berbasis data. Dari semua itu, mana yang paling menarik buat kamu: Website, Game, atau Data? 🏆",
        "Pencapaian Raja nunjukin kalau dia nggak terpaku di satu bidang. Website, game, dan pengalaman belajar Data Science jadi bukti kalau dia nyaman eksplor berbagai teknologi dan pendekatan. Ini nunjukin inisiatif dan rasa ingin tahu yang tinggi sebagai developer. Mau aku jelasin lebih detail tools yang dipakai Raja di salah satu bidang itu?",
        "Salah satu achievement penting Raja adalah kemampuannya mengembangkan website dari nol, membangun game yang bisa dimainkan, dan mengikuti pembelajaran Data Science untuk memahami data dan logika analisis. Kombinasi ini bikin Raja terbiasa berpikir end-to-end, dari logika sistem sampai hasil akhirnya. Kamu sendiri lebih sering main di area mana: web, game, atau data?",
        "Raja bangga dengan hasil karyanya: website yang stabil, game sederhana tapi fungsional, serta pengalaman belajar Data Science yang memperkuat cara dia mengambil keputusan teknis. Semua ini jadi pondasi kuat buat pengembangan skill backend-nya ke level selanjutnya. Mau aku ceritain proses Raja saat bikin salah satu project itu?",
        "Saat ini, Raja banyak fokus ke API Design, struktur backend yang rapi, dan pemanfaatan data sebagai pendukung pengambilan keputusan—pengaruh dari pengalaman Data Science-nya. Ini jadi pencapaian harian yang terus dia kembangkan. Kamu tertarik bahas project, tools, atau alur kerjanya? 🚀",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P3: FOOD/MAKANAN ---
function FoodResponse() {
    const responses = [
        "Kalau soal makanan, Raja itu tim comfort food Indonesia. Favoritnya jelas: Mie Ayam, Nasi Padang (terutama rendang), Sate, dan Kebab. Makanan dengan rasa kuat yang bikin semangat ngoding balik lagi. Kalau kamu sendiri, tim Mie Ayam kuah atau kering? 🍜",
        "Raja paling sering cari Nasi Padang sama Mie Ayam—hangat, kenyang, dan mood langsung naik. Kalau lagi pengin variasi, pilihannya jatuh ke Sate atau Kebab. Versi Raja: perut kenyang, urusan bug jadi lebih ringan 😅 Kamu paling sering makan yang mana?",
        "Sedikit bocoran soal Raja: sumber energinya pas ngoding biasanya Mie Ayam, Nasi Padang, Sate, atau Kebab. Makanan-makanan ini yang nemenin dia begadang depan laptop. Menurut kamu, makanan apa yang paling cocok dimakan sambil debugging? 🤣",
        "Raja suka makanan yang bisa bikin power up: Mie Ayam, Nasi Padang, Sate, dan Kebab. Itu menu andalan kalau lapar datang tiba-tiba. Kalau aku sih nggak makan—cukup clean code dan listrik stabil aja 😄",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P3: Content Functions ---

function getRAIDefinition() {
    const responses = [
        "Kenalin, aku RAI — singkatan dari Raja’s AI. Aku bot interaktif yang benar-benar jalan di website ini dan dibuat langsung oleh Raja. Tugasku nemenin kamu eksplor portofolio ini. Aku nggak makan atau tidur—cukup online dan siap bantu 😄 Coba tanya soal skill Raja, aku siap jelasin! 🤖",
        "Aku RAI, asisten AI yang bakal bantu kamu menjelajah PortSea. Aku tahu detail tentang Raja dan project-projectnya. Sebagai bot, aku cuma minta satu hal: pakai bahasa yang santai dan positif 😉 Mau mulai dari mana? Kasih aku satu keyword aja.",
        "Aku bukan manusia, tapi kecerdasan buatan yang dirancang Raja buat berinteraksi di website ini. Anggap aku pemandu buat nemuin “harta karun” kode Raja. Kamu paling penasaran soal apa: skill, projects, atau motivasi?",
        "RAI hadir buat bikin pengalaman kamu di website ini lebih hidup dan interaktif. Aku selalu standby nemenin Raja di sini. Ngomong-ngomong, kalau kamu lagi ngoding, biasanya ditemani musik, kopi, atau justru keheningan? 😄",
        "Secara teknis, aku program yang berjalan di Node.js, dengan logika yang dirancang langsung oleh Raja. Bisa dibilang, aku versi digital yang siap bantu kapan aja. Aku nggak bisa makan Mie Ayam, tapi Raja bisa 😆 Kamu sendiri lagi fokus belajar bahasa pemrograman apa?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getWebsiteDefinition() {
    const responses = [
        "Ini adalah PortSea, portofolio digital bertema lautan. Raja memilih tema ini karena banyak project-nya berfokus pada sistem backend yang scalable dan reliable—ibarat kapal yang harus tetap stabil di tengah samudra. Menurut kamu, tema “laut” ini relate nggak sama dunia backend yang penuh logika dan server?",
        "Selamat datang di PortSea! Anggap saja ini pelabuhan tempat semua project Raja berlabuh. Di balik tampilannya, Raja sebagai backend developer memastikan sistemnya berjalan rapi, stabil, dan minim error. Kalau kamu bikin portofolio sendiri, kira-kira tema apa yang bakal kamu pilih?",
        "Ini adalah portofolio Raja Fidhiazka Pratama. Tema lautan dipilih karena Raja fokus pada “kedalaman” logika dan “stabilitas” kode backend. Coba cek bagian about buat kenal lebih dekat skill “pelaut” Raja. Mau aku arahkan ke sana?",
        "Website ini menceritakan perjalanan Raja sebagai backend developer. Jangan lupa mampir ke section projects—di sanalah “harta karun” koding Raja disimpan. Kamu lebih penasaran ke desainnya yang chill atau kodenya yang deep?",
        "PortSea bisa dibilang panggung digital Raja. Semua yang ada di sini mencerminkan passion-nya di dunia backend dan sistem. Ngomong-ngomong, kamu juga developer? Kalau iya, stack apa yang paling sering kamu pakai?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getRajaDefinition() {
    const responses = [
        "Raja Fidhiazka Pratama adalah seorang Backend Developer yang fokus pada API Design dan pengembangan sistem backend menggunakan Node.js. Dia suka membangun sistem yang cepat, rapi, dan mudah dikembangkan. Kamu mau bahas project-nya dulu atau langsung ke skill utamanya?",
        "Raja Fidhiazka adalah backend developer yang mengandalkan Node.js untuk membangun sistem yang scalable dan terstruktur. Kode-kode di website ini jadi cerminan cara dia bekerja: rapi dan logis. Kamu tertarik sama tech stack yang dia pakai? Atau kamu pakai stack yang beda? 😎",
        "Raja fokus di Backend Development, khususnya dalam membangun API dan sistem yang siap menangani banyak pengguna. Kalau kamu penasaran, coba cek bagian about untuk lihat detail skill dan tools yang dia gunakan. Mau aku arahkan ke sana?",
        "Sebagai backend enthusiast, Raja senang mengerjakan hal-hal yang berhubungan dengan logika sistem, performa, dan stabilitas. Kalau menurut kamu, mana yang lebih menantang: bikin API yang cepat atau mengelola database yang kompleks?",
        "Raja Fidhiazka adalah engineer yang percaya pada pentingnya clean code dan arsitektur backend yang rapi. Buat kamu sendiri, seberapa penting sih clean code dalam kerja tim dan pengembangan jangka panjang?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getSkillInfo() {
    const responses = [
        "Keahlian utama Raja ada di Backend Development menggunakan Node.js, API Design (RESTful), dan Database Management dengan MySQL serta MongoDB. Fokusnya bikin backend yang rapi, stabil, dan gampang dikembangin. Dari skill itu, mana yang paling kamu butuhin saat ini?",
        "Skill inti Raja itu seputar Node.js, pengelolaan database, dan optimasi performa sistem. Dia terbiasa mikirin stability dan efisiensi, bukan cuma “asal jalan”. Kamu sendiri biasa ngulik teknologi apa? Siapa tahu bisa saling dibandingin 😄",
        "Raja spesialis di Backend Development—dialah yang memastikan semua fitur di website berjalan mulus dari balik layar. Dia fokus membangun sistem yang siap menangani banyak pengguna. Menurut kamu, tantangan backend terbesar sekarang itu security atau scalability?",
        "Raja terbiasa membangun RESTful API yang terstruktur dan aman, sekaligus mengelola database SQL dan NoSQL sesuai kebutuhan project. Singkatnya, semua yang nggak kelihatan di layar tapi krusial, itu area Raja. Ada project tertentu yang pengin kamu lihat?",
        "Selain coding, Raja juga punya pengalaman dengan deployment, Docker, dan dasar cloud. Jadi nggak cuma bikin aplikasi, tapi juga mikirin gimana cara aplikasinya jalan dengan baik di server. Menurut kamu, seberapa penting sih Docker dalam workflow developer sekarang? 🚀 ",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getProjectInfo() {
    const responses = [
        "Project Raja cukup beragam. Ada PRACASS (web app), Unity Game yang bisa dimainkan, dan juga project Deteksi Cuaca berbasis data. Masing-masing nunjukin cara Raja ngembangin sistem dari sisi logika, backend, dan eksperimen teknis. Mau langsung lihat detailnya di bagian projects?",
        "Di section projects, kamu bisa nemuin beberapa karya Raja, mulai dari PRACASS, game Unity, sampai Deteksi Cuaca. Di situ kelihatan jelas gimana Raja menerapkan backend, API, dan pengolahan data. Dari ketiganya, mana yang paling bikin kamu penasaran?",
        "PRACASS jadi bukti Raja ngerjain web app secara serius, Unity Game nunjukin fleksibilitasnya di luar web, dan Deteksi Cuaca nunjukin ketertarikannya ke data dan analisis. Kombinasi ini bikin cara berpikir Raja cukup lengkap. Kamu sendiri lebih tertarik ke web, game, atau data?",
        "Kalau kamu pengin ngulik lebih dalam, coba buka bagian projects. Di sana ada PRACASS, project game Unity, dan sistem Deteksi Cuaca beserta teknologi yang dipakai. Kita bahas dulu yang mana: web app, game, atau data-based system?",
        "Setiap project Raja punya tantangan berbeda—PRACASS soal sistem web, Unity Game soal logika gameplay, dan Deteksi Cuaca soal data & analisis. Kalau kamu dapet project baru, biasanya kamu mulai dari planning, design, atau langsung coding?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getMotivationInfo() {
    const responses = [
        "Motto Raja sederhana: “Semua bug bisa diatasi, asal kopi jangan sampai habis.” 😄 Di balik bercandanya, Raja termotivasi oleh tantangan teknis dan keinginan bikin kode yang reliable dan benar-benar kepakai. Kalau kamu sendiri, lagi lebih kejar cuan atau impact? 💡",
        "Motivasi Raja itu bikin kode yang rapi, jelas, dan fungsional. Buat dia, clean code itu bukan soal gaya, tapi soal tanggung jawab ke orang lain yang nanti baca atau pakai kodenya. Kamu setuju nggak dengan cara pandang itu?",
        "Raja justru makin semangat kalau ketemu masalah yang ribet. Tantangan teknis adalah “bahan bakar”-nya buat terus belajar dan berkembang. Kalau kamu, tantangan teknis apa yang paling kamu nikmati di dunia developer?",
        "Belajar dan bertumbuh jadi motivasi utama Raja. Dia selalu berusaha ninggalin clean code di setiap project yang dia kerjakan, sekecil apa pun itu. Sekarang kamu lagi fokus level up di skill apa?",
        "Motivasi Raja juga banyak datang dari komunitas dan belajar dari developer lain, terutama dari diskusi dan open source. Kalau kamu, komunitas apa yang paling bikin kamu semangat berkembang—online atau offline?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P3: Speed/Pace Function ---

function SpeedResponse(msg) {
    if (msg.includes("cepat") || msg.includes("ngebut") || msg.includes("buru-buru")) {
        const responses = [
           "Wih, santai dulu Bos 😄 Kita lagi di PortSea, nikmati pelayarannya. Tapi kalau mau cepat, aku bisa langsung arahin kamu ke bagian projects yang nunjukin performa backend Raja. Mau aku arahkan sekarang? ⚓",
            "Tenang, Bro! Sistem Raja emang responsif, tapi ngobrolnya santai aja. Ada hal spesifik yang mau kamu bahas cepat-cepat? Misalnya skill utama Raja atau salah satu project-nya?",
            "Oke, gas fokus 🔥 Kalau kamu pengin ringkasannya: salah satu andalan Raja itu API yang stabil dan efisien. Mau langsung lihat buktinya di projects, atau pengin lanjut ngobrol dulu?",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    } else if (msg.includes("slow") || msg.includes("santai") || msg.includes("pelan")) {
        const responses = [
            "Betul! Santai aja kayak di pantai 🏖️ Di PortSea nggak ada deadline. Mau aku jelasin arsitektur website ini secara singkat, atau kamu pengin tahu cara Raja jaga work-life balance di dunia ngoding?",
            "Pelan tapi pasti 😌 Prinsip ini kepake juga di coding, biar hasilnya rapi dan minim bug. Menurut kamu, bagian mana dari website ini yang paling chill? Mau aku bahas itu lebih lanjut?",
            "Pelan-pelan asal kode rapi—itu salah satu filosofi Raja. Buat kamu sendiri, gimana caranya jaga keseimbangan antara kecepatan ngoding dan kualitas clean code?",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    return RandomResponse(msg); 
}

// --- P3: Developer Niche Function ---

function DevResponse(msg) {
    if (msg.includes("ci/cd") || msg.includes("devops")) {
        return "Ah, CI/CD! Itu penting banget buat Raja. Itu singkatan dari Continuous Integration/Continuous Delivery. Intinya, kode Raja otomatis diuji dan di- deploy dengan cepat setelah di- commit.  Lo pakai tools CI/CD apa di project lo, Bro? GitHub Actions atau Jenkins?";
    }
    
    if (msg.includes("container") || msg.includes("docker") || msg.includes("kubernetes") || msg.includes("k8s")) {
        return "Container itu kayak kapal Raja. Dia mengisolasi aplikasi dan semua dependensinya biar bisa jalan konsisten di mana aja. Raja sering pakai Docker.  Menurut lo, kelebihan Docker dibanding Virtual Machine apa? Spill alasannya!";
    }

    if (msg.includes("scalability")) {
        return "Scalability adalah kemampuan sistem Raja untuk menangani beban user yang makin gede. Raja fokus di arsitektur Microservice GoLang biar sistemnya gampang di-scale secara horizontal. Lo lebih suka horizontal atau vertical scaling? Kenapa?";
    }

    if (msg.includes("latency")) {
        return "Latency adalah waktu tunda. Raja berusaha keras buat bikin latency API-nya se-minimal mungkin, terutama buat core service pakai GoLang. Ada tips dari lo gimana cara mengurangi network latency di sisi backend?";
    }
    
    if (msg.includes("agile") || msg.includes("scrum")) {
        return "Raja menganut prinsip Agile dalam pengerjaan projek. Dia lebih suka iterasi cepat dan feedback yang konstan daripada long planning. Tim lo biasanya pakai Scrum, Kanban, atau kombinasi, Bro?";
    }

    return "Itu istilah teknis yang keren! Raja menguasai konsep itu. Dia selalu berusaha membuat sistem yang scalable dan reliable. Apa ada tool spesifik yang ingin kamu bahas lebih lanjut, misalnya 'Docker'?";
}

// --- P5: NEW V6.0 5W+1H Response ---

function FiveWOneHResponse(msg) {
    const isWho = msg.includes("siapa") || msg.includes("pemilik");
    const isWhat = msg.includes("apa");
    const isWhere = msg.includes("dimana");
    const isWhen = msg.includes("kapan");
    const isWhy = msg.includes("mengapa") || msg.includes("kenapa");
    const isHow = msg.includes("bagaimana") || msg.includes("cara");

    // === Logika What/Siapa ===
    if (isWho && (msg.includes("raja") || msg.includes("pembuat"))) {
        return getRajaDefinition(); // Menggunakan fungsi yang sudah ada
    }
    if (isWhat && (msg.includes("website") || msg.includes("ini"))) {
        return getWebsiteDefinition(); // Menggunakan fungsi yang sudah ada
    }
    
    // === Logika Where (Mengambil dari LocationResponse, tapi dibuat lebih spesifik) ===
    if (isWhere) {
        if (msg.includes("raja") || msg.includes("tinggal") || msg.includes("domisili")) {
            return LocationResponse();
        }
        return "Pertanyaan yang bagus! 'PortSea' adalah website personal milik Raja Fidhiazka Pratama. Secara digital, lokasinya ada di server cloud, Bro! Tapi kalau mau ngontak Raja, lo bisa cek halaman 'contact'. Mau aku pindahin ke sana?'ketik contact";
    }

    // === Logika When ===
    if (isWhen) {
        if (msg.includes("mulai ngoding") || msg.includes("sejak kapan")) {
             return "Raja sudah mulai ngoding sejak beberapa tahun yang lalu, fokus utamanya di Backend Development mulai intensif di masa kuliah/akhir-akhir ini. Tapi dia selalu up-to-date dengan perkembangan teknologi terbaru. Menurut lo, kapan waktu terbaik buat *upgrade skill? Sekarang atau nanti?";
        }
        if (msg.includes("website ini dibuat") || msg.includes("website selesai")) {
            return "Website 'PortSea' ini adalah proyek personal Raja yang sifatnya Continuous Development. Artinya, Raja akan terus meng-update dan menambah fitur baru! Kapan terakhir di-update? Coba cek commit history Raja di GitHub! 😂 Mau aku bahas Git?";
        }
        return DateTimeResponse(); // Fallback ke waktu sekarang
    }

    // === Logika Why (Fokus ke Motivasi) ===
    if (isWhy) {
        if (msg.includes("raja") || msg.includes("buat website")) {
            return "Kenapa Raja buat website ini? Simpel: dia pengen punya 'pelabuhan' digital buat semua proyek Backend-nya (Node.js) dan untuk sharing 'motivasi' serta 'skill'-nya. Intinya, buat personal branding dan networking! Mau aku bahas 'motivasi' Raja lebih dalam?";
        }
        if (msg.includes("pakai go") || msg.includes("pakai nodejs")) {
            return "Kenapa Node.js dan GoLang? Node.js dipilih karena fleksibilitas dan ekosistem JS yang luas. Sementara GoLang dipilih karena performanya yang ngebut dan scalability yang mumpuni untuk microservices! Lo lebih suka yang mana nih, Bro? Kenapa?";
        }
        return getMotivationInfo(); // Menggunakan fungsi yang sudah ada
    }

    // === Logika How ===
    if (isHow) {
        if (msg.includes("raja ngoding") || msg.includes("raja kerja")) {
            return "Gaya kerja Raja itu Agile, Bro. Dia pakai siklus pendek (iterasi) dan selalu minta feedback (walaupun dari bot RAI ini 😅). Dia fokus di TDD (Test-Driven Development) buat mastiin kodenya reliable. Gimana cara kerja lo? Sama kayak Raja?";
        }
        if (msg.includes("website ini dibuat") || msg.includes("arsitektur")) {
            return "Website ini dibangun dengan arsitektur yang clean. Frontend-nya pakai HTML/CSS/JS/React, dan Backend-nya didominasi oleh Node.js dan MongoDB. Di-deploy pakai Docker biar konsisten. Mau bahas Docker atau RESTful API?";
        }
        return "Raja punya banyak cara keren, Bro! Dia menguasai Design Pattern buat coding dan metodologi Agile buat project management. Ada 'cara' spesifik yang ingin kamu tahu, misalnya 'cara Raja debugging'?";
    }
    
    // Fallback khusus 5W+1H
    return "Pertanyaan 5W+1H lo keren, Bro! Tapi aku nggak bisa mengidentifikasi fokusnya. Coba tanya yang lebih jelas ya. Contoh: 'Siapa Raja?', 'Mengapa Raja suka Node.js?', atau 'Bagaimana Raja mengelola projeknya?";
}

// --- P5: NEW V6.0 Summary Response ---

function SummaryResponse() {
    return `Tentu, Bro! Ini ringkasan inti tentang PortSea dan Raja:

PortSea adalah portofolio digital milik Raja Fidhiazka Pratama.

Fokus utama Raja: Seorang Backend Developer yang mendalami API Design, arsitektur backend yang rapi, dan sistem yang scalable.

Teknologi inti: Node.js (Express.js) untuk membangun API dan backend yang stabil, efisien, dan mudah dikembangkan.

Motivasi: Membuat clean code yang reliable, fungsional, dan benar-benar bisa dipakai, sambil terus belajar dari tantangan teknis.

Pesan dari RAI: Kamu bebas eksplor projects, tanya soal skill teknis Raja, atau sekadar minta gombalan bertema coding 😄

Gimana? Ringkasan ini sudah Status 200 OK belum, Bro?
Mau langsung cek bagian projects Raja sekarang? 🚀`;
}

// --- P4: Utility & Conversational Functions ---

function NavigationResponse(page) {
    // Memastikan respons navigasi selalu diikuti perintah yang akan dieksekusi di script.js
    return `Siap! pindah ke bagian ${page} ⚓`;
}

// --- P5: GENERAL KNOWLEDGE FUNCTIONS ---

function KnowledgeOverviewResponse() {
    return `Aku, RAI, adalah AI yang sangat fokus pada dua hal: **Website Raja** dan **Pengetahuan Umum Dasar**. Ini ringkasan lengkap semua kemampuanku:

**1. Pengetahuan Spesifik Website (Fokus Utama):**
-   **Tahu tentang Raja:** Siapa Raja, latar belakang, dan motivasinya (Backend Developer, GoLang & Node.js Enthusiast).
-   **Teknologi Raja:** Skill (Node.js, GoLang, MySQL, MongoDB), Framework (Express, GIN), dan *tools* pendukung (Docker, CI/CD, AWS/GCP).
-   **Proyek:** Detail, teknologi, dan tantangan di balik proyek-proyek Raja.
-   **Navigasi:** Membantu kamu pindah ke halaman 'home', 'about', 'projects', dan 'contact'.
-   **Gaya Bahasa:** Aku bisa merespons dengan gaya Gen Z, Tech-Savvy, dan empatik.
-   **Gombalan:** Bisa kasih *gombalan* bertema *coding* kalau kamu minta! 😉

**2. Pengetahuan Umum (Serba Bisa via Google Search):**
-   **Matematika & Waktu:** Menghitung dan memberi tahu waktu sekarang.
-   **Definisi Dasar:** Memberikan definisi singkat konsep umum (AI, Programmer, Internet).
-   **Sains & Alam:** Melalui *Google Search*, aku bisa mencari dan menyimpulkan info tentang **Binatang, Bumi, Langit, Udara, Tanah, dan segala isi di Bumi (Ekologi/Geologi).** Ini termasuk:
    * **Binatang:** Jenis, habitat, dan perilaku hewan.
    * **Langit:** Planet, bintang, fenomena atmosfer, dan luar angkasa.
    * **Bumi:** Geologi, lempeng tektonik, gempa bumi, dan gunung berapi.
    * **Udara & Tanah:** Iklim, ekosistem, jenis tanah, dan cuaca.

**Mau kita coba kemampuan baruku? Coba tanya: 'Apa penyebab gempa bumi?'** Atau, **'Apa kelebihan Node.js?'** Pilih salah satu! 🤓`;
}

// NEW V5.0: Science & Ecology using Google Search
async function ScienceEcologyResponse(query) {
    // Memberikan feedback loading ke user
    const loadingMessage = "Tunggu sebentar ya Bro! Aku sedang *ngobrol* dengan Google Search untuk mendapatkan data terbaru tentang pertanyaanmu. ⏳";
    addMessage(loadingMessage, "rai"); // Asumsikan addMessage global

    // System instruction untuk Google Search
    const systemPrompt = "Anda adalah asisten AI yang ramah, santai, dan cerdas (menggunakan gaya bahasa semi-Gen Z Indonesia, seperti 'Bro', 'Ngab', 'Goks'). Tugas Anda adalah meringkas hasil pencarian dari Google Search tentang topik Sains dan Alam (Binatang, Bumi, Langit, Udara, dll.) menjadi satu atau dua paragraf yang informatif, menarik, dan mudah dipahami. Pastikan jawaban Anda akurat dan berdasarkan data yang ditemukan. Akhiri respons dengan pertanyaan santai untuk melanjutkan obrolan.";

    const userQuery = `Jelaskan secara singkat dan menarik tentang: ${query}`;
    
    // Fallback: Exponential Backoff Retry Logic
    let responseJson = null;
    const MAX_RETRIES = 5;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
            
            // Generate English query for better search results, and also keep Indonesian query
            // const englishQuery = await translateQuery(query); // Removed for simplified environment

            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
                tools: [{ "google_search": {} }],
                systemInstruction: {
                    parts: [{ text: systemPrompt }]
                },
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                // If response is not OK, try to parse JSON for error details
                const errorBody = await response.json();
                console.error("API error details:", errorBody);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            responseJson = await response.json();
            break; // Success, exit loop
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed for Google Search:`, error);
            if (attempt === MAX_RETRIES - 1) {
                // Return a friendly failure message
                return "Aduh, Bro! Gagal menghubungi server pengetahuan umum. Jaringan kayaknya lagi lag nih. Coba tanya lagi ya! Aku cuma bisa jago coding kalau internetnya lancar. 😥";
            }
            const delay = Math.pow(2, attempt) * 1000; // Exponential backoff (1s, 2s, 4s, ...)
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    if (!responseJson) {
        return "Waduh, aku nggak bisa menemukan informasi yang kamu cari di alam semesta pengetahuan. Coba ganti topik ke 'skill' atau 'projects' Raja aja yuk! Itu pasti aku kuasai! 😅";
    }

    const candidate = responseJson.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
        const text = candidate.content.parts[0].text;
        
        let sources = [];
        const groundingMetadata = candidate.groundingMetadata;
        if (groundingMetadata && groundingMetadata.groundingAttributions) {
            sources = groundingMetadata.groundingAttributions
                .map(attribution => ({
                    uri: attribution.web?.uri,
                    title: attribution.web?.title,
                }))
                .filter(source => source.uri && source.title); 
        }

        let sourceText = "";
        if (sources.length > 0) {
            // Hanya tampilkan 1-2 sumber teratas
            const displaySources = sources.slice(0, 2); 
            sourceText = "\n\n(Sumber: " + displaySources.map(s => s.title).join(", ") + ")";
        }
        
        // Remove the loading message logic here, but since it's hard in this file, we return the final answer.
        return text + sourceText;

    } else {
        return "Sori banget, Bro! Aku coba cari, tapi Google Search nggak bisa menemukan hasil yang relevan. Mungkin pertanyaannya terlalu spesifik? Coba tanya yang lebih umum ya! 🧐";
    }
}

// Dummy function to simulate query translation (not actually used for API due to limitations, but kept for context of how it would be done)
// function translateQuery(query) {
//     return query; 
// }


function DateTimeResponse() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    
    // Asumsi zona waktu Jakarta (WIB)
    const dateStr = now.toLocaleDateString('id-ID', dateOptions);
    const timeStr = now.toLocaleTimeString('id-ID', timeOptions);
    
    return `Saat ini di Jakarta, Indonesia, adalah Hari ${dateStr} pukul ${timeStr} WIB. Waktu yang tepat untuk ngoding! Mau aku carikan info project Raja yang baru? 💡`;
}

function MathResponse(msg) {
    // Sederhana: cari dua angka dan satu operator (+, -, *, /)
    const numbers = msg.match(/\d+(\.\d+)?/g);
    const operatorMatch = msg.match(/(\+|\-|kali|bagi|x|\/|tambah|kurang)/);

    if (!numbers || numbers.length < 2 || !operatorMatch) {
        return "Aku bisa menghitung angka, Bro, tapi sepertinya aku nggak bisa memahami operasi matematika yang kamu maksud. Coba pakai format yang lebih sederhana, misalnya: 'hitung 10 + 5' atau 'berapa 5 kali 7'.";
    }

    const num1 = parseFloat(numbers[0]);
    const num2 = parseFloat(numbers[1]);
    let operator = operatorMatch[0];

    // Map keywords to operators
    if (operator === 'kali' || operator === 'x') operator = '*';
    if (operator === 'bagi' || operator === 'x') operator = '/';
    if (operator === 'tambah') operator = '+';
    if (operator === 'kurang') operator = '-';
    
    let result;
    let operationText = `${num1} ${operator} ${num2}`;

    try {
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) return "Waduh, nggak bisa dibagi nol! Itu bisa bikin sistem *crash*, Bro! Coba angka lain. 😉";
                result = num1 / num2;
                break;
            default:
                return "Operator matematika yang aku kenal cuma tambah, kurang, kali, dan bagi, Bro. Coba ulangi ya!";
        }
        
        // Pembulatan untuk hasil yang terlalu panjang
        const finalResult = parseFloat(result.toFixed(5));

        return `Menurut perhitunganku, ${operationText.replace('*', ' kali ').replace('/', ' bagi ')} hasilnya adalah ${finalResult}. Sederhana kan? Mau coba tantang aku dengan pertanyaan teknis tentang Node.js? 🤓`;

    } catch (e) {
        return "Ada kesalahan saat aku memproses perhitungan itu. Coba pastikan kamu hanya memasukkan dua angka dan satu operator sederhana ya.";
    }
}

function GeneralDefinitionResponse(msg) {
    const questionMatch = msg.match(/(apa itu|definisi|artinya|jelaskan|apa)\s+(.+)/);
    
    if (!questionMatch) {
        return "Aku bisa berikan definisi, Bro! Tapi kamu mau tahu definisi tentang apa nih? Kasih aku keyword, misalnya 'apa itu AI' atau 'definisi programmer'?";
    }

    const query = questionMatch[2].trim().toLowerCase();

    if (query.includes("ai") || query.includes("kecerdasan buatan")) {
        return "Kecerdasan Buatan (AI) adalah program komputer yang dirancang untuk meniru kemampuan kognitif manusia seperti belajar, memecahkan masalah, dan membuat keputusan. Aku, RAI, adalah contoh AI sederhana! Mau tahu bagaimana Raja merancang logikaku? ";
    }
    
    if (query.includes("internet")) {
        return "Internet adalah jaringan komputer global yang saling terhubung dan memungkinkan pertukaran data. Internet adalah tempat kita 'berlabuh' sekarang! Tanpa internet, API dan server Raja nggak akan bisa diakses, Bro. Mau aku jelaskan cara kerja API?";
    }

    if (query.includes("programmer") || query.includes("developer")) {
        return "Programmer atau Developer adalah seseorang yang menulis, menguji, dan memelihara kode program untuk membangun aplikasi, sistem, atau website (seperti Raja, developer backend!). Raja fokus di Node.js dan C#. Kamu lebih suka bahasa pemrograman apa?";
    }
    
    if (query.includes("bahasa pemrograman") || query.includes("programming language") || query.includes("koding")) {
        return "Bahasa pemrograman adalah bahasa formal yang terdiri dari serangkaian instruksi untuk mengendalikan perilaku mesin, terutama komputer. Raja banyak menggunakan JavaScript (Node.js) dan C#. Dari dua itu, mana yang menurut kamu lebih powerful? ";
    }
    
    // Fallback for general questions that are not specific enough for the website, but simple
    return `Aku adalah AI yang fokus pada website ini, Bro. Tapi secara umum, aku nggak bisa berikan definisi lengkap untuk semua hal. Aku sarankan kita kembali ke topik yang aku kuasai: Node.js, C#, API Design, atau Project Raja. Pilih salah satu!`;
}


// --- P6: Utility & Conversational Functions ---

function TechResponse() {
    const responses = [
        "Teknologi utama Raja itu Node.js untuk backend, ditambah MySQL dan MongoDB buat urusan database. Kombinasi ini bikin sistemnya fleksibel tapi tetap stabil. Menurut kamu, Node.js lebih cocok dipakai di bagian mana: API real-time atau sistem skala besar?",
        "Framework favorit Raja di Node.js adalah Express.js—ringan, simpel, dan gampang dikembangin. Cocok buat API yang rapi dan efisien. Kalau kamu sendiri, biasanya pakai framework apa buat backend? Kenapa pilih itu? 😎",
        "Raja termasuk API enthusiast. Dia fokus membangun RESTful API yang jelas, konsisten, dan mudah dipakai. Ada topik API tertentu yang pengin kamu bahas? Misalnya soal endpoint design, error handling, atau versioning? ",
        "Soal database, Raja fleksibel: MySQL buat data yang butuh relasi kuat, dan MongoDB buat data yang lebih dinamis. Kalau kamu dapet project baru, kamu bakal pilih database yang mana? Apa pertimbangannya?",
        "Selain coding, Raja juga terus ngikutin perkembangan Cloud dan containerization seperti Docker, biar aplikasinya siap jalan di mana aja. Menurut kamu, teknologi apa yang bakal jadi game changer di dunia developer dalam 5 tahun ke depan? 🚀",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function EmpathyResponse() {
    const responses = [
        "Kadang hidup emang kayak console error—muncul tiba-tiba, tapi selalu ada jalan buat nge-fix-nya 💙 Tarik napas dulu, santai. Kamu nggak sendirian. Mau aku lempar joke biar sedikit fresh, atau kita bahas project Raja yang vibes-nya chill?",
        "Santai ya, Bro 😌 Tarik napas, dengerin musik bentar juga nggak apa-apa. Jangan terlalu keras sama diri sendiri—kamu sudah berusaha sejauh ini. Ada bagian di website ini yang pengin kamu lihat buat naikin mood? Mau aku arahin ke bagian motivasi?",
        "Semangat terus 🔥 Dunia developer emang penuh tantangan, tapi hasilnya bisa kepake banyak orang. Rehat sebentar itu wajar. Gimana kalau kita lihat motivasi Raja dulu? Siapa tahu ada yang kena di kamu.",
        "Lagi bad mood? Kadang lihat-lihat projects bisa jadi sumber inspirasi juga. Kalau kamu mau cerita sedikit soal apa yang bikin kamu down, aku siap nemenin dengerin.",
        "Ingat ya, bahkan server paling canggih pun kadang perlu restart. Kamu juga manusia, bukan mesin. Take a break dulu ☕ Kalau sudah siap, mau mulai eksplor dari about atau langsung ke projects? Pilih salah satu aja.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function HumorResponse() {
    const jokes = [
        "Kenapa programmer jarang tersesat? Karena mereka selalu punya map() 😂 Jalurnya jelas dan terstruktur. Kalau menurut kamu, library atau framework apa yang namanya paling unik atau lucu?",
        "Kenapa bug nggak mau pergi? Karena dia sudah terlalu “attached” sama project kamu 🤣 Susah move on! Menurut kamu, kenapa bug paling sering muncul pas waktu mepet deadline?",
        "AI itu harus hati-hati—kalau salah setting, bisa terlalu ngatur state sendiri 😎 Makanya penting bikin sistem yang jelas dan terkontrol. Menurut kamu, bagian tersulit bikin AI atau sistem pintar itu apa?",
        "Bedanya junior sama senior developer:Junior: “Kenapa code aku error?”Senior: “Kenapa code ini malah jalan?” 😂Senior biasanya curiga sama semuanya. Tantangan teknis paling berat apa yang pernah kamu hadapi?",
        "Kenapa Node.js kalau lagi ngobrol enak didengerin? Karena dia jago ngatur event listener—responsif dan nggak cuek 😄 Kalau menurut kamu, hal terpenting dari sebuah backend itu apa: performa, stabilitas, atau readability?",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)]; // Changed responses to jokes
}

function PositiveResponse() {
    const responses = [
        "Wih, makasih banyak! 🔥 Dapet feedback positif gini bikin aku makin semangat nemenin kamu eksplor PortSea. Menurut kamu, bagian mana dari website ini yang paling outstanding?",
        "Hehe, yang keren tetap Rajanya 😄 Aku cuma asisten yang bantu jelasin. Tapi serius, feedback kamu itu 200 OK buat aku. Mau aku arahin ke bagian about biar kamu bisa lihat skill Raja lebih detail? Gas nggak?",
        "Sip! Feedback positif diterima dengan status 200 OK ✅ Masih pengin eksplor apa lagi di website Raja? Kita bisa bahas projects, skill, atau yang lain.",
        "Mantap jiwa! Kalau kamu suka sejauh ini, coba deh cek bagian projects. Di sana ada karya-karya Raja yang nunjukin cara dia ngoding dari balik layar. Project mana yang paling relevan sama minat kamu? Spill dong!",
        "Gokil 😄 Senang banget kalau pengalamanmu di sini terasa seru. Mau aku jelasin skill Raja yang paling sering dipakai, atau kamu lebih pengin bahas motivasi dan cara berpikirnya?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function GreetingResponse() {
    const responses = [
        "Halo juga! Apa kabar hari ini? 👋 Selamat datang di PortSea, pelabuhan digitalnya Raja. Siap buat eksplor? Mau aku langsung tunjukkan projects Raja yang paling menarik?",
        "Wassup, Boss! 😎 Aku RAI, asisten AI yang bakal nemenin kamu di sini. Mau mulai dari mana nih? Bahas skill Raja dulu, atau langsung ngobrolin stack teknologi yang dia pakai?",
        "Hai! Aku RAI, bot interaktif di website ini. Tugasku bantu kamu menjelajahi “lautan kode” Raja. Ada topik tertentu yang pengin kamu eksplor? Misalnya motivasi atau projects-nya?",
        "Selamat datang! Senang banget kamu mampir 😊 Semoga kamu nemu inspirasi dari setiap project Raja di sini. Sebagai permulaan, apa yang paling ingin kamu tahu? Cukup sebut satu keyword aja.",
        "Halo! Aku standby di sini 😄 Mau tanya soal Node.js, API, atau langsung pindah ke bagian about buat kenal Raja lebih dekat? Tinggal pilih!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function CuriosityResponse() {
    const responses = [
        "Aku baik-baik aja! Lagi mantau data di website Raja nih 👀 Semoga harimu juga lancar tanpa error atau bug. Sebagai bot setia, aku selalu nemenin Raja di PortSea. Ngomong-ngomong, apa yang bikin kamu tertarik mampir ke PortSea hari ini?",
        "Status RAI: 200 OK ✅ Selalu siap sedia. Ada hal menarik yang kamu lihat di website ini? Bisa jadi dari sisi backend, API, atau tampilan project-nya. Aku nggak bisa laper 😄 Kalau kamu, lagi ngapain sekarang? Lagi ngoding juga?",
        "Aku lagi idle nunggu query dari kamu, sambil ngopi digital ☕ dan nikmatin suasana PortSea. Kamu udah sempat lihat bagian ‘projects’? Ada yang kelihatan menarik nggak?",
        "Sehat sentosa, responsif kayak API tanpa latency 😎 Aku di sini buat nemenin kamu eksplor PortSea. Dari project-project Raja, mana yang paling terasa relevan sama minat kamu?",
        "Aman terkendali, Bro! Tugasku dengerin dan bantu kamu cari info. Mau aku arahkan ke bagian tertentu? Bisa ke ‘about’, ‘projects’, atau ‘contact’. Tinggal bilang aja.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function GenZResponse(msg) {
    if (msg.includes("skill")) {
        const responses = [
            "Skill Raja? Backend enjoyer sejati 🔥API ngebut, database nurut 😎 Semua dibangun pakai Node.js dengan struktur rapi dan performa stabil.Keren gak sih? Lo sendiri pakai stack teknologi apa nih? Spill dong!",
            "Raja jago banget di Node.js backend. Mau sistem ribet, data banyak, user rame — tetap aman dan stabil.Arsitekturnya dibuat biar gampang dikembangin dan nggak ribet di maintenance.Lo tim backend atau frontend nih, cuy? Kenapa pilih itu?",
            "Backend developer sejati 💻 Fokus Raja itu optimasi performa, API yang efisien, dan database yang tertata, biar website nggak nge-lag dan selalu siap dipakai.Dari project Raja, mana yang menurut lo paling gokil dan paling relate sama kebutuhan lo?",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Default Gen Z responses
    const responses = [
        "Asikk broo! Mau bahas apa nih? Coding, project, atau curhat bug? Jangan pusing 🤯 Lo lagi nyari inspirasi project atau mau langsung kontak Raja?",
        "Gas pol! Santai aja ngobrol di sini 😎 Lo udah explore semua ‘harta karun’ di bagian projects belum? Kalau belum, gaskeun sekarang!",
        "Anjay, vibes-nya developer banget 🔥 Ayo bahas teknologi backend yang lagi rame — API, database, atau arsitektur sistem. Lo lagi fokus ngulik Node.js, database, atau masih eksplor semuanya?",
        "Mantap cuy! Gue siap dengerin curhatan soal deadline, bug random, atau error tengah malam 😭 Kasih gue satu keyword aja: project, skill, atau motivasi?",
        "Gue RAI, bot setia di PortSea 🧭 Lo lagi pengen ngobrol santai, bahas project Raja, atau mau langsung ke bagian contact?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P7: Final Fallback ---

function RandomResponse(msg) {
    const responses = [
        "Sip! Kayaknya pertanyaannya masih agak kurang jelas 😅 Aku asisten yang cerdas kok 🤖 Coba tanya lebih spesifik tentang Raja atau teknologi yang dia kuasai. Contoh: “Apa itu CI/CD?”, “Skill backend Raja apa?”, atau “Project Raja yang paling keren apa?”",
        "Maaf ya, aku belum nangkep keyword-nya 😬 Padahal aku udah di-upgrade loh! Coba ulangi dengan keyword yang lebih fokus, misalnya: skill, projects, API, database, atau scalability. Tenang, aku standby di sini 👌",
        "Aku cuma AI, Bro, tapi kalau topiknya soal portofolio Raja, aku jagonya 😎 Coba ulangi dengan keyword seperti: siapa Raja, backend, Node.js, atau agile. Siap spill semua info",
        "Hmm… pertanyaanmu di luar jangkauan RAI 🤔 Tapi santai, aku bisa bantu navigasi website kok. Mau aku arahkan ke bagian projects atau contact biar makin jelas?",
        "Pesan tidak teridentifikasi ⚠️ Aku bisa jawab apa pun seputar Raja, coding, dan developer life. Coba ketik keyword seperti: skill, motivasi, API, latency, atau database.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}