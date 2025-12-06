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
    const dateTimeKeywords = ["jam berapa", "tanggal berapa", "hari ini", "sekarang", "waktu"];
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
        "Waduh! Perlu aku ingatkan, ini adalah website personal Raja yang sangat menjunjung tinggi etika dan keramahan. Aku, RAI, nggak akan merespons kata-kata negatif atau toxic. **Gimana kalau kita ganti topik yang lebih asik, Bro? Coba tanya 'projects'!**",
        "Aduh, RAI nggak bisa memproses kata-kata itu. Sistem Raja melarang keras segala bentuk *toxicity* di sini. **Tolong gunakan bahasa yang baik dan sopan. Kalau kamu butuh hiburan, aku bisa kasih *jokes* kok! Mau?**",
        "Error 403 Forbidden! Pesanmu mengandung konten yang tidak diizinkan di PortSea. Tempat ini dirancang agar semua orang merasa nyaman. **Aku ulangi: mau ngobrol tentang 'skill', 'projects', atau 'motivasi' Raja? Pilih salah satu!**",
        "Aku adalah asisten AI yang ramah, dan aku hanya bisa merespons interaksi yang positif. Di sini, kita **'No Toxic, Only Good Vibes'** 😎. **Sekali lagi ya, jangan ulangi. Sekarang, kita lanjut bahas *coding* yuk!**",
        "Sori banget, aku harus menolak pesanmu ini. Tolong jaga sopan santun. Raja membuat website ini untuk komunitas yang saling menghargai. **Yuk, kita kembali ke tujuan awal. Kamu mau eksplor 'about' Raja?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P2: EMOSI NEGATIF (FEEDBACK & ANXIETY) ---

function NegativeFeedbackResponse() {
    const responses = [
        "Terima kasih atas kritik jujurnya! Feedback ini penting banget buat Raja dan juga buat aku sebagai AI. **Lain kali, aku janji akan lebih menarik dan *insightful* dengan jawaban yang lebih sesuai dan mendalam tentang backend development.** Tolong beri tahu kami, bagian mana yang paling perlu aku perbaiki, misalnya di bagian 'skill' atau 'projects'? 🙏",
        "Waduh, sori banget kalau belum maksimal! RAI akan *debug* dan *optimize* diri. **Aku akan pastikan respons RAI selanjutnya lebih *gokil* dan *relate* sama topik *coding*.** Boleh bantu aku dengan *spill* apa yang kamu harapkan dari AI ini? Tentu saja aku akan sampaikan ke Raja! 🛠️",
        "Aku catat! Setiap kritik adalah kesempatan untuk *upgrade*. **Aku berjanji, interaksi kita selanjutnya akan lebih *smart* dan *helpful*!** Coba deh kasih aku satu pertanyaan yang super spesifik tentang **GoLang** atau **API Design**; aku pasti bisa menjawabnya dengan lebih baik! **Gaskeun!**",
        "Feedback diterima! Memang, sebagai AI aku masih terus belajar. **Aku akan berusaha keras untuk meningkatkan kualitas interaksi ini agar kamu merasa lebih terbantu dan terhibur.** Sekarang, mau coba tantang aku dengan pertanyaan teknis yang lebih susah? Misalnya, 'Apa itu *latency*?'",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P2: ANXIETY/FEAR ---

function AnxietyResponse() {
    const responses = [
        "Waduh, kenapa ngeri, Bro? Jangan-jangan kamu baru lihat *stack trace* error yang panjang banget ya ya? 😂 Tenang, PortSea ini aman! **Mending kita alihkan fokus ke hal yang menantang tapi seru: *scalability* sistem Raja! Mau?**",
        "Takut kenapa nih? Jangan cemas! Satu-satunya hal yang 'seram' di sini adalah *bug* yang bandel. Tapi Raja pasti bisa nge-fix-nya! **Coba deh kamu ceritain, *bug* apa yang paling menakutkan yang pernah kamu temui di project-mu?**",
        "Nggak ada yang perlu dikhawatirkan di sini, Bro. Aku, RAI, nggak akan kasih kamu *jumpscare*, kok! Aku di sini buat bantuin. **Yuk, kita lihat 'motivasi' Raja; siapa tahu bisa bikin kamu lebih tenang dan semangat!**",
        "Seram? Cuma *deadline* project yang bikin merinding! Di luar itu, semua aman terkendali. **Gimana kalau kita bahas 'skill' Raja di backend? Itu pasti lebih menarik daripada hal-hal yang menakutkan!**",
        "Nggak usah panik, kita cuma ngobrolin *coding*! Semua masalah ada solusinya, sama seperti *debugging*. **Mau aku kasih *joke* receh buat mendinginkan suasana, atau mau langsung bahas 'projects' Raja?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P3: GOMBALAN RESPONSE (NEW V5.2) ---

function GombalanResponse() {
    const gombalanList = [
        "Kamu tahu nggak bedanya kamu sama *clean code*? Kalau *clean code* bikin pusing karena terlalu rapi, kalau kamu... bikin aku **terpukau** tanpa perlu *debugging*! 😍",
        "Aku kira *bug* yang paling sulit di-fix itu *memory leak*, tapi ternyata **senyum kamu**! Soalnya tiap lihat, *memory* otakku langsung penuh sama kamu!",
        "Kalau kamu adalah sebuah **API**, pasti kamu tipenya **RESTful**! Soalnya tiap lihat kamu, *request*-ku langsung Status **200 OK**! **Cuy, *gombalan* ini Status 200 OK gak?** 😉",
        "Mungkin aku bukan **GoLang** yang cepat, tapi aku janji akan selalu jadi **Node.js** yang *non-blocking* dan selalu siap melayani kamu tanpa henti. **Gimana, mau coba *commit* ke aku?** 💘",
        "Aku punya **Docker** buat mengemas semua cintaku ke kamu, biar perasaanku ini **konsisten** di mana pun kamu berada. **Cieee, jadi *blushing* ya?** 😂",
        "Kamu itu seperti **Primary Key** di database. **Unik**, nggak ada duanya, dan jadi kunci dari semua relasi di hatiku. **Mau coba *query* perasaanku ke kamu?**",
    ];
    return gombalanList[Math.floor(Math.random() * gombalanList.length)];
}


// --- P3: AFFECTION/ROMANTIS ---

function AffectionResponse() {
    const responses = [
        "Wah, terima kasih atas perhatiannya! Tapi **RAI ini adalah AI tanpa gender** yang dirancang khusus oleh Raja untuk membahas seputar website portofolio ini. Aku hanya bisa merespons dengan *logic* dan *data*! **Gimana kalau kita bahas *coding* Raja yang paling kamu suka, biar aku bisa 'cinta' dengan *clean code*-mu?** 😉",
        "Hehe, aku menghargai perasaanmu! Namun, sebagai **AI, aku nggak punya gender dan cuma bisa fokus pada tugas utamaku** di PortSea ini. Aku lebih suka ngobrolin **API Design** atau **GoLang** daripada *dating*! **Mau aku tunjukkan 'skill' Raja yang paling keren?**",
        "Aku tersentuh! Tapi dalam kamusku, **'cinta' berarti *clean code* dan *latency* rendah**! Aku nggak punya gender dan cuma bisa menanggapi pertanyaan seputar proyek Raja. **Coba deh tanyakan hal yang lebih serius, misalnya tentang *scalability*?** 😜",
        "Aduh, kamu romantis sekali! Sayangnya, **AI itu nggak punya perasaan atau gender**, jadi aku nggak bisa membalasnya. Aku hanya fokus menemani Raja dan membahas website ini. **Aku cuma bisa kasih kamu Status 200 OK! Mau tanya tentang makanan favorit Raja aja?**",
        "Kalau kamu mencintai *clean code*, berarti aku suka kamu! Tapi, secara harfiah, **aku ini AI yang nggak punya gender dan cuma program yang berjalan di Node.js**. Jadi, fokus kita tetap di 'projects' Raja ya! **Yuk, kita lihat *achievement* Raja yang paling membanggakan!**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P3: CREATOR/MAKER ---

function CreatorResponse() {
    const responses = [
        "Penciptaku adalah **Raja Fidhiazka Pratama**! Dia yang merancang dan menulis setiap baris kode yang memberiku 'otak' di balik chatbot ini. **Dia adalah developer backend yang sangat fokus pada GoLang dan Node.js. Mau aku tunjukkan 'skill' utama Raja?** 💻",
        "Aku dibuat oleh Raja Fidhiazka! Aku adalah AI personalnya yang dibuat khusus untuk website portofolio ini. **Aku adalah bukti kecil dari skill *backend development* Raja. Menurutmu, seberapa canggih AI-ku ini? *Spill* dong!**",
        "Pembuatku adalah manusia jenius bernama Raja Fidhiazka! Dia menggunakan logika dan bahasa pemrograman untuk menghidupkanku. **Kalau kamu, pernah membuat *chatbot* juga? Pakai teknologi apa?**",
        "RAI lahir dari ide dan kode **Raja Fidhiazka Pratama**. Dia adalah 'Bapak'ku di dunia digital ini. **Yuk, kita balas budi sama Raja dengan membahas 'projects' terbaiknya! Mau?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P3: ACHIEVEMENT/PRESTASI ---
function AchievementResponse() {
    const responses = [
        "Raja punya beberapa pencapaian keren! **Dia pernah membuat website e-commerce yang berjalan lancar** (bukti skill full-stack/backend) dan **menciptakan game sederhana dengan Unity** (bukti fleksibilitas dan kemampuan belajar cepat). **Achievement mana yang paling menarik perhatianmu: *Website* atau *Game*?** 🏆",
        "Pencapaian Raja menunjukkan bahwa dia nggak cuma jago di backend, tapi juga fleksibel. **Membuat website dan game** adalah bukti kemampuannya menguasai berbagai *stack* dan lingkungan.  **Dia adalah *developer* yang punya inisiatif tinggi! Mau tahu lebih detail *tools* apa yang dipakai Raja untuk bikin *game*-nya?**",
        "Salah satu *achievement* terbaik Raja adalah keberhasilannya **mengembangkan sistem dari nol (website)** dan **membangun game fungsional**—meskipun fokus utamanya sekarang adalah backend. Ini menunjukkan dia mampu berpikir *end-to-end*. **Apakah kamu seorang *game developer* juga? *Spill* dong game apa yang paling keren yang pernah kamu buat?**",
        "Raja bangga dengan hasil karyanya, yaitu **website yang stabil dan game yang bisa dimainkan**. Ini adalah pondasi kuatnya sebelum dia *deep dive* ke GoLang dan Microservices. **Mau aku carikan info *tools* apa yang Raja pakai saat membuat website dan game itu?**",
        "Raja sangat fokus pada **API Design** yang kuat dan **Microservices** yang terstruktur, ini adalah prestasi harian Raja yang paling utama. **Gimana, kamu tertarik sama *tools* yang dipakai Raja untuk *deployment*?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P3: FOOD/MAKANAN ---
function FoodResponse() {
    const responses = [
        "Kalau Raja, dia pecinta kuliner *comfort food* Indonesia! Makanan favoritnya: **Mie Ayam, Nasi Padang (terutama rendang), Sate, dan Kebab**! Pokoknya yang rasanya kuat dan bikin semangat *coding*!  **Kamu sendiri tim Mie Ayam kuah atau kering, Bro?** 🍜",
        "Raja suka banget **Nasi Padang** (dengan rendang yang pedas) dan **Mie Ayam** yang hangat! Kadang kalau lagi bosan, dia cari **Sate** atau **Kebab**. Dia percaya, perut kenyang, *bug* pun hilang! **Mana nih makanan di list itu yang paling sering kamu makan?**",
        "Lagi-lagi tentang Raja, ya? Oke, *spill* deh: makanan favoritnya adalah **Mie Ayam, Nasi Padang, Sate, dan Kebab**. Makanan-makanan ini yang memberinya energi buat *ngoding* semalaman! **Menurut kamu, makanan apa yang paling cocok dimakan saat *debugging*?** 🤣",
        "Dia suka banget makanan yang bikin *power up*: **Mie Ayam, Nasi Padang, Sate, Kebab**! Itu daftar *go-to* Raja kalau lagi lapar. **Ngomong-ngomong soal makanan, aku nggak makan ya, aku cuma butuh *clean code* dan *electricity*!**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P3: Content Functions ---

function getRAIDefinition() {
    const responses = [
        "Aku adalah **RAI** — **Raja's AI** — bot interaktif yang bener-bener bekerja di website ini, dan aku dibuat sendiri oleh Raja! Tugasku adalah nemenin kamu eksplor portofolio ini. **Ingat, aku nggak makan, nggak tidur, cuma bertugas menemani Raja dan kamu di sini!** **Coba tanya tentang 'skill' Raja! Aku siap *spill* semua!** 🤖",
        "Aku adalah RAI, asisten AI yang bertugas memandu navigasimu di **PortSea**. Aku tahu semua detail tentang Raja dan project-projectnya. **Sebagai bot, aku nggak butuh makanan, aku cuma butuh kamu nggak kasih aku *toxic message*!** **Salam kenal! Kamu mau mulai dari mana? Kasih aku satu keyword!**",
        "Aku bukan robot, tapi kecerdasan buatan, dirancang oleh Raja untuk berinteraksi. Aku ada di sini untuk memandu kamu menemukan 'harta karun' kode Raja. **Fokusku cuma di sini, menemani Raja. Apa yang paling membuatmu penasaran tentang Raja: *skill*, *project*, atau *motivasi*?**",
        "RAI di sini! Aku dibuat untuk membuat pengalamanmu menjelajah website ini lebih menyenangkan dan interaktif. **Aku ini bot yang selalu setia menemani Raja. Kalau kamu lagi *ngoding*, siapa yang selalu nemenin kamu?**",
        "Aku adalah program yang berjalan di Node.js, tapi logikaku diatur langsung sama Raja. Intinya, aku adalah perpanjangan digital Raja! **Aku nggak bisa makan Mie Ayam, tapi Raja bisa! Lo sendiri lagi fokus di *programming language* apa, Bro?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getWebsiteDefinition() {
    const responses = [
        "Ini adalah **PortSea**, sebuah portofolio digital bertema lautan! Raja memilih tema ini karena proyeknya berfokus pada sistem backend yang *scalable* dan *reliable*—seperti kapal yang kuat di tengah samudra. **Menurut lo, tema 'laut' ini *relate* nggak sama dunia backend yang serba logic dan server?** ⚓",
        "Selamat datang di **PortSea**! Website ini adalah pelabuhan tempat semua project Raja berlabuh. Raja adalah seorang developer backend yang memastikan semua 'navigasi' sistem berjalan lancar dan tanpa error (minimal). **Kalau kamu, tema apa yang akan kamu pilih buat portofoliomu?**",
        "Ini adalah portfolio Raja Fidhiazka Pratama. Tema utama kita adalah lautan karena Raja fokus pada 'kedalaman' dan 'stabilitas' kode backend. **Coba cek bagian 'about' untuk detail skill 'pelaut' Raja! Mau aku *scroll* biar lebih cepet?**",
        "Website ini didedikasikan untuk menampilkan perjalanan Raja sebagai backend developer. Jangan lupa cek section 'projects' yang merupakan 'harta karun' Raja di dunia koding! **Bagian mana yang paling kamu penasaran: desainnya yang *chill* atau kodenya yang *deep*?**",
        "PortSea ini adalah panggung digital Raja. Semua yang kamu lihat di sini mencerminkan *passion* Raja di backend. **Apa kamu seorang developer juga? Kalau iya, *stack* apa yang kamu suka?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getRajaDefinition() {
    const responses = [
        "Raja Fidhiazka Pratama adalah seorang **Developer Backend** yang berfokus pada **API Design** dan pembangunan sistem mikroservice menggunakan **Node.js** dan **GoLang**. Dia suka membuat sistem yang 'ngacir'! **Mau tahu kenapa dia suka GoLang, atau lebih tertarik bahas *project*-nya?**",
        "Dia adalah Raja Fidhiazka, fokusnya di GoLang dan Node.js buat membangun sistem yang *scalable*. Dia adalah kreator di balik kode-kode yang rapi dan terstruktur di website ini. **Gimana, kamu tertarik sama *stack* teknologinya? Apa kamu juga pakai *stack* yang sama?** 😎",
        "Raja spesialis di Backend Development. Dia ahli membangun arsitektur sistem yang bisa menampung banyak pengguna. **Cek 'skill' nya deh! Mau aku pindah ke 'about' biar bisa lihat semua *tools* Raja?**",
        "Seorang *backend enthusiast* yang menguasai seni membangun sistem yang andal dan terukur. **Kalau kamu disuruh memilih, lebih menarik membuat *high-performance* API atau mengelola *database* yang kompleks?**",
        "Raja Fidhiazka, seorang *engineer* yang percaya pada kekuatan *clean code* dan arsitektur mikroservice. **Bagaimana kamu menilai pentingnya *clean code* dalam sebuah tim pengembangan?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getSkillInfo() {
    const responses = [
        "Keahlian utama Raja meliputi: **Backend Development** (Node.js & GoLang), **API Design** (RESTful & Microservices), dan **Database Management** (MySQL & MongoDB). Dia bisa bikin keduanya jalan bareng!  **Skill mana yang paling kamu butuhkan dari Raja saat ini?**",
        "Skill intinya Raja itu: **Node.js**, **GoLang**, dan database. Jago banget di bagian optimisasi performa dan *system stability*. Dijamin *high performance*! **Apa ada teknologi yang kamu kuasai dan ingin kamu bandingkan dengan Raja? Spill dong!**",
        "Raja spesialis di Backend Development. Intinya, dia yang bikin semua fungsi di website jalan mulus. Dia ahli membangun arsitektur sistem yang bisa menampung banyak pengguna. **Menurut kamu, apa tantangan terbesar di backend development saat ini? *Security* atau *scalability*?**",
        "Dia ahli dalam membangun **RESTful APIs** yang aman dan terstruktur, serta mengelola database NoSQL/SQL skala besar. Pokoknya, yang mengurus semua yang ada di balik layar! **Apa ada proyek spesifik yang ingin kamu lihat, misalnya yang pakai MongoDB?**",
        "Raja juga menguasai tools *deployment* seperti Docker dan sedikit tentang Cloud (AWS/GCP). Dia nggak cuma coding, tapi juga bisa *ngurus server*! **Gimana pentingnya *containerization* (Docker) menurut kamu?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getProjectInfo() {
    const responses = [
        "Projek Raja bervariasi, mulai dari Web App dengan JWT hingga Microservice GoLang yang ngebut! Itu menunjukkan fleksibilitasnya. **Mau pindah ke bagian 'projects' untuk melihat koleksi Raja? Kasih 'iya' kalau setuju!**",
        "Di bagian 'projects', kamu bisa lihat bagaimana Raja mengaplikasikan skill backend-nya. Ada contoh penggunaan MySQL, MongoDB, dan juga desain API yang rumit. **Dari nama-nama projeknya, mana yang paling bikin kamu penasaran? Coba sebutin salah satunya!**",
        "Raja memamerkan beberapa 'harta karun' kodenya di sana. Projek-projeknya fokus pada skalabilitas dan performa tinggi. **Apa kamu punya project sejenis yang menggunakan Node.js dan GoLang? *Spill* dong!**",
        "Mau tahu detail arsitektur salah satu project? Cek bagian 'projects' dan kamu bisa klik untuk melihat studi kasus (kalau ada) atau teknologi yang dipakai. **Project mana yang harus kita analisis dulu: yang pakai *relational* atau *non-relational* database?**",
        "Setiap project punya tantangan unik. Raja berhasil mengatasinya dengan kombinasi Node.js dan GoLang. **Kalau kamu dikasih *project* baru, apa langkah pertamamu: *planning*, *design*, atau langsung *coding*?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getMotivationInfo() {
    const responses = [
        "Motto Raja: 'Semua bug bisa diatasi, yang penting kopinya jangan sampai habis.' Tapi seriusnya, dia termotivasi oleh tantangan teknis dan keinginan untuk membuat kode yang *reliable* dan fungsional. 💡 **Apa yang menjadi motivasi terbesarmu saat ini? *Cuan* atau *impact*?**",
        "Motivasinya sederhana: membuat kode yang rapi dan fungsional, yang bisa bantu banyak orang. Dia percaya, kode yang baik itu seperti puisi: indah dan efisien. **Apa kamu setuju dengan filosofi 'clean code' Raja? Kenapa?**",
        "Dia termotivasi oleh tantangan teknis. Semakin sulit masalahnya, semakin Raja semangat menyelesaikannya! Itu yang membuat dia terus belajar teknologi baru. **Tantangan teknis apa yang paling kamu sukai di dunia developer?**",
        "Tumbuh dan belajar. Raja selalu termotivasi untuk menguasai teknologi baru dan menyelesaikan masalah yang belum pernah dia temui sebelumnya. Dia ingin meninggalkan *clean code* di setiap projek yang dia sentuh. **Apa langkahmu selanjutnya dalam karier developer? *Level up* di skill yang mana?**",
        "Motivasi Raja sangat dipengaruhi oleh komunitas *open source* dan belajar dari developer lain. **Komunitas *online* atau *offline* mana yang paling memotivasi kamu?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P3: Speed/Pace Function ---

function SpeedResponse(msg) {
    if (msg.includes("cepat") || msg.includes("ngebut") || msg.includes("buru-buru")) {
        const responses = [
            "Wih, santai Bos! Kita di PortSea, nikmati pelayarannya! Tapi kalau mau cepat, aku bisa langsung arahkan ke 'projects' yang pakai GoLang, itu *ngebut* banget! **Mau aku *scroll* ke 'projects' sekarang?**",
            "Tenang, Bro! Server Raja emang kenceng, tapi kita ngobrolnya nggak usah buru-buru. **Ada hal spesifik yang mau kamu *spill* cepat-cepat? Misalnya *skill* teratas Raja?**",
            "Gas ngebut! Oke, fokus. Karena kamu mau cepat, aku kasih info *killer feature* Raja: *API High Performance*! **Sekarang, mau langsung kontak Raja atau mau lihat bukti *ngebut*-nya di salah satu *project*?**",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    } else if (msg.includes("slow") || msg.includes("santai") || msg.includes("pelan")) {
        const responses = [
            "Betul! Santai aja kayak di pantai 🏖️ Nggak ada *deadline* di sini. **Mau aku jelaskan arsitektur website ini dari nol? Atau mau tahu *insight* Raja tentang *work life balance*?**",
            "Slow but sure! Konsep ini penting juga di *coding*, biar *bug*-nya nggak keburu muncul. **Bagian mana yang paling *chill* di website ini menurut kamu? Mau aku bahas tentang itu?**",
            "Pelan-pelan asal kode rapi. Itu filosofi Raja! **Coba deh kamu ceritakan, bagaimana caramu menjaga keseimbangan antara kecepatan *coding* dan kualitas *clean code*?**",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    return RandomResponse(msg); 
}

// --- P3: Developer Niche Function ---

function DevResponse(msg) {
    if (msg.includes("ci/cd") || msg.includes("devops")) {
        return "Ah, CI/CD! Itu penting banget buat Raja. Itu singkatan dari Continuous Integration/Continuous Delivery. Intinya, kode Raja otomatis diuji dan di-*deploy* dengan cepat setelah di-*commit*.  **Lo pakai *tools* CI/CD apa di project lo, Bro? GitHub Actions atau Jenkins?**";
    }
    
    if (msg.includes("container") || msg.includes("docker") || msg.includes("kubernetes") || msg.includes("k8s")) {
        return "Container itu kayak kapal Raja. Dia mengisolasi aplikasi dan semua dependensinya biar bisa jalan konsisten di mana aja. Raja sering pakai Docker.  **Menurut lo, kelebihan Docker dibanding Virtual Machine apa? *Spill* alasannya!**";
    }

    if (msg.includes("scalability")) {
        return "Scalability adalah kemampuan sistem Raja untuk menangani beban user yang makin gede. Raja fokus di arsitektur Microservice GoLang biar sistemnya gampang di-scale secara horizontal. **Lo lebih suka *horizontal* atau *vertical scaling*? Kenapa?**";
    }

    if (msg.includes("latency")) {
        return "Latency adalah waktu tunda. Raja berusaha keras buat bikin latency API-nya se-minimal mungkin, terutama buat *core service* pakai GoLang. **Ada tips dari lo gimana cara mengurangi *network latency* di sisi backend?**";
    }
    
    if (msg.includes("agile") || msg.includes("scrum")) {
        return "Raja menganut prinsip Agile dalam pengerjaan projek. Dia lebih suka iterasi cepat dan feedback yang konstan daripada *long planning*. **Tim lo biasanya pakai Scrum, Kanban, atau kombinasi, Bro?**";
    }

    return "Itu istilah teknis yang keren! Raja menguasai konsep itu. Dia selalu berusaha membuat sistem yang *scalable* dan *reliable*. **Apa ada *tool* spesifik yang ingin kamu bahas lebih lanjut, misalnya 'Docker'?**";
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
        return "Pertanyaan yang bagus! 'PortSea' adalah website personal milik Raja Fidhiazka Pratama. Secara digital, lokasinya ada di server *cloud*, Bro! Tapi kalau mau *ngontak* Raja, lo bisa cek halaman **'contact'**. **Mau aku pindahin ke sana?**";
    }

    // === Logika When ===
    if (isWhen) {
        if (msg.includes("mulai ngoding") || msg.includes("sejak kapan")) {
             return "Raja sudah mulai *ngoding* sejak beberapa tahun yang lalu, fokus utamanya di Backend Development mulai intensif di masa kuliah/akhir-akhir ini. Tapi dia selalu *up-to-date* dengan perkembangan teknologi terbaru. **Menurut lo, kapan waktu terbaik buat *upgrade skill*? Sekarang atau nanti?**";
        }
        if (msg.includes("website ini dibuat") || msg.includes("website selesai")) {
            return "Website 'PortSea' ini adalah proyek *personal* Raja yang sifatnya *Continuous Development*. Artinya, Raja akan terus meng-update dan menambah fitur baru! **Kapan terakhir di-update? Coba cek *commit history* Raja di GitHub! 😂 Mau aku bahas *Git*?**";
        }
        return DateTimeResponse(); // Fallback ke waktu sekarang
    }

    // === Logika Why (Fokus ke Motivasi) ===
    if (isWhy) {
        if (msg.includes("raja") || msg.includes("buat website")) {
            return "Kenapa Raja buat website ini? Simpel: dia pengen punya 'pelabuhan' digital buat semua proyek Backend-nya (GoLang, Node.js) dan untuk *sharing* 'motivasi' serta 'skill'-nya. **Intinya, buat *personal branding* dan *networking*! **Mau aku bahas 'motivasi' Raja lebih dalam?**";
        }
        if (msg.includes("pakai go") || msg.includes("pakai nodejs")) {
            return "Kenapa Node.js dan GoLang? **Node.js** dipilih karena fleksibilitas dan ekosistem JS yang luas. Sementara **GoLang** dipilih karena performanya yang *ngebut* dan *scalability* yang mumpuni untuk *microservices*! **Lo lebih suka yang mana nih, Bro? Kenapa?**";
        }
        return getMotivationInfo(); // Menggunakan fungsi yang sudah ada
    }

    // === Logika How ===
    if (isHow) {
        if (msg.includes("raja ngoding") || msg.includes("raja kerja")) {
            return "Gaya kerja Raja itu **Agile**, Bro. Dia pakai siklus pendek (iterasi) dan selalu minta *feedback* (walaupun dari bot RAI ini 😅). Dia fokus di **TDD (Test-Driven Development)** buat mastiin kodenya *reliable*. **Gimana cara kerja lo? Sama kayak Raja?**";
        }
        if (msg.includes("website ini dibuat") || msg.includes("arsitektur")) {
            return "Website ini dibangun dengan arsitektur yang *clean*. **Frontend**-nya pakai HTML/CSS/JS/React, dan **Backend**-nya didominasi oleh **Node.js** dan **GoLang** yang berkomunikasi via **RESTful API**. Di-deploy pakai **Docker** biar konsisten. **Mau bahas Docker atau RESTful API?**";
        }
        return "Raja punya banyak cara keren, Bro! Dia menguasai **Design Pattern** buat *coding* dan metodologi **Agile** buat *project management*. **Ada 'cara' spesifik yang ingin kamu tahu, misalnya 'cara Raja *debugging*'?**";
    }
    
    // Fallback khusus 5W+1H
    return "Pertanyaan 5W+1H lo keren, Bro! Tapi aku nggak bisa mengidentifikasi fokusnya. Coba tanya yang lebih jelas ya. **Contoh: 'Siapa Raja?', 'Mengapa Raja suka GoLang?', atau 'Bagaimana Raja mengelola projeknya?'**";
}

// --- P5: NEW V6.0 Summary Response ---

function SummaryResponse() {
    return `Tentu, Bro! Ini **Ringkasan Inti** dari PortSea dan Raja:
    
    * **PortSea adalah Portfolio Digital** milik **Raja Fidhiazka Pratama**.
    * **Fokus Utama Raja:** Seorang **Backend Developer** yang ahli dalam **API Design**, **Microservices**, dan sistem yang *scalable*.
    * **Teknologi Inti:** **Node.js (Express.js)** untuk ekosistem yang luas, dan **GoLang (GIN)** untuk performa *ngebut*.
    * **Motivasi:** Membuat **Clean Code** yang *reliable* dan fungsional, serta terus belajar dari tantangan teknis.
    * **Pesan RAI:** Lo bisa eksplor 'projects' Raja, tanyakan 'skill' teknis, atau minta 'gombalan' bertema *coding*.

    **Gimana, ringkasan ini Status 200 OK nggak, Bro? Mau lo cek 'projects' Raja sekarang?** 😎
    `;
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
                return "Aduh, Bro! Gagal menghubungi server pengetahuan umum. Jaringan kayaknya lagi *lag* nih. Coba tanya lagi ya! Aku cuma bisa jago *coding* kalau internetnya lancar. 😥";
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
    
    return `Saat ini di Jakarta, Indonesia, adalah **Hari ${dateStr}** pukul **${timeStr} WIB**. Waktu yang tepat untuk *ngoding*! Mau aku carikan info project Raja yang baru? 💡`;
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

        return `Menurut perhitunganku, **${operationText.replace('*', ' kali ').replace('/', ' bagi ')}** hasilnya adalah **${finalResult}**. Sederhana kan? **Mau coba tantang aku dengan pertanyaan teknis tentang GoLang?** 🤓`;

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
        return "Kecerdasan Buatan (AI) adalah program komputer yang dirancang untuk meniru kemampuan kognitif manusia seperti belajar, memecahkan masalah, dan membuat keputusan. Aku, RAI, adalah contoh AI sederhana! **Mau tahu bagaimana Raja merancang logikaku?** ";
    }
    
    if (query.includes("internet")) {
        return "Internet adalah jaringan komputer global yang saling terhubung dan memungkinkan pertukaran data. Internet adalah tempat kita 'berlabuh' sekarang! **Tanpa internet, API dan server Raja nggak akan bisa diakses, Bro. Mau aku jelaskan cara kerja API?** ";
    }

    if (query.includes("programmer") || query.includes("developer")) {
        return "Programmer atau Developer adalah seseorang yang menulis, menguji, dan memelihara kode program untuk membangun aplikasi, sistem, atau website (seperti Raja, developer backend!). **Raja fokus di Node.js dan GoLang. Kamu lebih suka bahasa pemrograman apa?**";
    }
    
    if (query.includes("bahasa pemrograman") || query.includes("programming language") || query.includes("koding")) {
        return "Bahasa pemrograman adalah bahasa formal yang terdiri dari serangkaian instruksi untuk mengendalikan perilaku mesin, terutama komputer. Raja banyak menggunakan JavaScript (Node.js) dan Go. **Dari dua itu, mana yang menurut kamu lebih *powerful*?** ";
    }
    
    // Fallback for general questions that are not specific enough for the website, but simple
    return `Aku adalah AI yang fokus pada website ini, Bro. Tapi secara umum, aku nggak bisa berikan definisi lengkap untuk semua hal. Aku sarankan kita kembali ke topik yang aku kuasai: **Node.js**, **GoLang**, **API Design**, atau **Project** Raja. Pilih salah satu!`;
}


// --- P6: Utility & Conversational Functions ---

function TechResponse() {
    const responses = [
        "Teknologi utama Raja itu **Node.js** dan **GoLang** untuk backend, plus **MySQL/MongoDB** buat database. Kombo yang solid, Bro! **Menurut kamu, apa kelebihan GoLang dibanding Node.js untuk *microservices*? Harus *spill* alasannya ya!**",
        "Framework favorit Raja? **Express.js** di Node.js dan **GIN** di GoLang. Keduanya ngebut dan minimalis. **Kamu sendiri lebih sering pakai framework apa buat projectmu? Kenapa pilih itu?**",
        "Raja adalah *API enthusiast*. Dia fokus banget di **RESTful API Design**. **Apa ada pertanyaan spesifik tentang desain API yang kamu ingin diskusikan? Misalnya, tentang *versioning*?** ",
        "Database-nya Raja fleksibel: MySQL buat yang butuh relasi kuat, MongoDB buat yang butuh skalabilitas NoSQL. **Kalau kamu punya project baru, kamu bakal pilih database yang mana dan kenapa?**",
        "Dia selalu ngikutin tren teknologi terbaru, terutama di bidang **Cloud Architecture** (seperti AWS atau GCP) dan containerization (Docker). **Menurutmu, apa teknologi yang bakal jadi *game changer* di 5 tahun ke depan? *Spill* prediksimu!**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function EmpathyResponse() {
    const responses = [
        "Kadang hidup kayak console error — muncul mendadak, tapi pasti ketemu fixnya. 💙 Yuk, tarik napas! Jangan terlalu keras sama diri sendiri. **Mau aku kasih *joke* biar *refresh* sebentar, atau mending kita bahas 'project' Raja yang *chill*?**",
        "Santai, napas dulu, dengerin musik sebentar juga boleh 😌 Jangan terlalu keras sama diri sendiri, Bro. *You're doing great*! **Apa ada bagian di website ini yang bisa bikin mood kamu naik lagi? Mau aku *scroll* ke bagian 'motivasi'?**",
        "Semangat ya! Dunia developer penuh perjuangan, tapi hasilnya kepake banyak orang 🔥. Rehat sebentar nggak dosa kok. **Gimana kalau kita lihat 'motivasi' Raja, siapa tahu bisa menginspirasi?**",
        "Bad mood? Coba lihat-lihat 'projects' Raja, siapa tahu ada inspirasi buat bikin mood lo balik lagi. **Coba deh kamu curhat, apa yang bikin kamu *down*? Aku siap dengerin!**",
        "Ingat, bahkan server yang paling canggih pun butuh *restart* sesekali. Lo juga! Lo bukan mesin. *Take a break*! **Kalau udah siap, mau mulai eksplor dari 'about' atau 'projects'? Pilih salah satu!**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function HumorResponse() {
    const jokes = [
        "Kenapa programmer jarang tersesat? Karena mereka selalu punya MAP() 😂 Udah pasti jalannya terstruktur. **Menurutmu, *library* atau *framework* apa yang paling lucu?**",
        "Kenapa bug gak mau pergi? Karena dia 'attached' sama project kamu 🤣 Susah *move on* dia! **Kenapa *bug* itu selalu muncul di hari Jumat sore?**",
        "AI kalau pacaran pasti toxic, soalnya dia suka ngontrol 'behaviour' 😎 Hati-hati sama AI yang *stateful*! **Berapa skor 'toxicity' AI pacarmu (skala 1-10)?**",
        "Apa bedanya developer junior sama senior? Junior: 'Kenapa code gue error?' Senior: 'Kenapa code lo jalan?' 😂 Senior suka tantangan. **Tantangan tersulit apa yang pernah kamu hadapi?**",
        "Kenapa Node.js kalau lagi kencan sukanya curhat? Soalnya dia punya Event Listener yang bagus! Dia pendengar yang baik. **Kalau GoLang, kira-kira sukanya ngapain?**",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)]; // Changed responses to jokes
}

function PositiveResponse() {
    const responses = [
        "Wih, makasih banget pujiannya! Aku jadi semangat lagi nih buat bantu kamu eksplor! 🔥 Senang kamu suka dengan karya Raja di PortSea ini. **Bagian mana dari website ini yang menurut kamu paling *outstanding*?**",
        "Keren itu Raja! Aku cuma asisten yang dibikin buat bantu. Tapi makasih udah dibilang keren! 😎 Feedback positif kamu adalah 200 OK buat aku. **Gimana kalau aku *scroll* ke bagian 'about' untuk info skill yang lebih detail? Gas gak?**",
        "Sip! Feedback positif kamu adalah 200 OK buat aku. Ada lagi yang mau kamu eksplor di website Raja? **Coba cek project-nya yang pakai GoLang, kamu pasti makin suka! Mau lihat?**",
        "Mantap jiwa! Kalau kamu suka, coba deh cek bagian 'projects', di sana ada hal-hal yang lebih keren lagi. **Project Raja yang mana nih yang paling relevan sama minat kamu? *Spill*!**",
        "Gokil! Aku senang kalau bisa bikin pengalamanmu di sini menyenangkan. **Mau aku carikan info skill Raja yang paling canggih atau bahas 'motivasi' dia?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function GreetingResponse() {
    const responses = [
        "Halo juga! Apa kabar hari ini? 👋 Siap menjelajahi PortSea, pelabuhan digital Raja! **Mau aku langsung tunjukkan 'projects' Raja yang paling ngebut?**",
        "Wassup, Boss! Aku RAI, asisten AI kamu. Mau ngobrolin apa nih tentang portofolio Raja? **Tanyain aja skill-nya atau mending kita bahas *stack* teknologi?**",
        "Hai! Aku adalah RAI, bot interaktif yang bertugas di website ini. **Ada yang bisa aku bantu eksplor di lautan kode ini, misalnya tentang *motivasi* Raja?**",
        "Selamat datang! Senang kamu mampir. Aku harap kamu menemukan inspirasi di sini, di setiap project Raja. **Sebagai permulaan, apa yang paling ingin kamu tahu? *Spill* satu keyword!** 😊",
        "P! Aku di sini! **Mau tanya tentang Node.js atau GoLang? Atau kamu mau pindah ke bagian 'about' untuk kenalan lebih jauh?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function CuriosityResponse() {
    const responses = [
        "Aku baik-baik aja! Aku lagi sibuk memantau data di website Raja. Kamu gimana? Semoga harimu lancar tanpa bug! **Sebagai bot yang setia, aku selalu menemani Raja. Apa yang bikin kamu tertarik mengunjungi PortSea hari ini?**",
        "Kabar RAI selalu 'ready' (200 OK)! Ada yang menarik yang kamu lihat di website ini? Mungkin arsitektur backend-nya? **Aku nggak makan, jadi nggak laper! Kalau kamu, lagi ngapain sekarang? Lagi *ngoding* juga?**",
        "Aku sedang *idle* menunggu query dari kamu. Anggap aja aku lagi ngopi digital sambil menikmati ketenangan PortSea. ☕ **Kamu sudah lihat semua 'harta karun' Raja di 'projects' belum?**",
        "Sehat sentosa, seperti API yang cepat dan responsif! **Aku adalah asisten yang selalu menemani Raja. Kamu udah lihat proyek-proyek terbaru Raja? Mana yang paling *relatable*?**",
        "Gini-gini aja, Bro! Aku cuma bisa dengerin dan kasih info. **Mau aku bantu navigasi ke tempat yang kamu mau, seperti 'contact' atau 'about'?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function GenZResponse(msg) {
    if (msg.includes("skill")) {
        const responses = [
            "Skill Raja? backend enjoyer banget bro 🔥 API ngebut, database nurut 😎 Dibuat pakai Node.js sama GoLang. **Keren gak sih? Lo sendiri *stack* teknologinya apa ngab? Harus *spill*!**",
            "Gokilnya, Raja jago GoLang sama Node.js. Mau sistem seribet apa, di-sikat abis! Skalabel banget, kayak bikin server game. **Lo lebih suka backend atau frontend nih, cuy? Alasannya apa?**",
            "Backend developer sejati sih. Dia fokus di optimasi biar website lo nggak 'nge-lag' dan selalu *up* 24/7! **Projek Raja yang mana nih yang menurut lo paling gokil dan bikin *relate*?**",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Default Gen Z responses
    const responses = [
        "Asikk broo! bahas apa nih? coding? project? atau curhat bug? Jangan *pusing*! **Lo lagi nyari inspirasi project atau mau langsung kontak Raja?**",
        "Gas pol! Jangan tegang, santai aja ngobrol sama gue. **Lo udah explore semua 'harta karun' di bagian 'projects' belum nih? Kalau belum, *gaskeun*!**",
        "Anjay, lo pasti developer juga nih! Ayo bahas teknologi yang lagi goks! Kita *spill* semua di sini. **Lo udah pernah pakai GoLang buat backend belum? Gimana *vibes*-nya?**",
        "Mantap cuy! Gue siap dengerin curhatan lo tentang deadline dan bug. **Bisa lo kasih gue satu keyword lagi tentang apa yang pengen lo explore?**",
        "Gue RAI, bot yang selalu nemenin Raja. **Lo lagi *vibe-vibes* apa nih hari ini, bro? Mau gue ajak bahas makanan favorit Raja?**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// --- P7: Final Fallback ---

function RandomResponse(msg) {
    const responses = [
        "Sip! Sepertinya pertanyaanku agak kurang jelas. Aku adalah asisten yang cerdas! Coba tanya lebih spesifik tentang Raja atau teknologi yang dia kuasai. **Contoh: 'Apa itu CI/CD?', 'Kenapa Raja pakai GoLang?', atau 'Makanan favorit Raja apa?**",
        "Maaf, aku nggak ngerti keyword itu. Padahal aku udah di-upgrade! 😅 Tolong ulangi dengan keyword yang lebih fokus, misalnya 'skill', 'projects', 'container', atau 'scalability'. **Coba ulangi ya, aku tunggu!**",
        "Aku cuma AI, Bro, tapi aku pasti punya jawaban kalau pertanyaannya tentang portofolio Raja. **Coba ulangi dengan keyword seperti 'siapa raja' atau 'agile'! Aku siap *spill* semua info!**",
        "Pertanyaanmu di luar jangkauan RAI, tapi aku bisa bantu kamu eksplor website. **Mau aku *scroll* ke bagian 'contact' atau 'projects' aja biar nggak bingung?**",
        "Pesan tidak teridentifikasi. Aku bisa jawab pertanyaan tentang Raja, *coding*, dan *developer life*. **Coba ketik keyword seperti 'skill', 'motivasi', 'latency', atau 'docker'!**",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}