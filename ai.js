// ===============================
// RAI Artificial Intelligence
// Personality Script
// ===============================

function RAI_Respond(userMessage) {
    const msg = userMessage.toLowerCase().trim();

    // --- Keyword Lists ---
    const genZKeywords = ["bro","anjay","anjir","banget","gaskeun","ngab","cuy","lol","wkwk","goks","gokil","sksd","ajg","pusing","gaje","cuan","flexing"];
    const sadKeywords = ["capek","sedih","down","bad mood","stress","bosan","males","bete","hambar","berat","gamon","gagal"];
    const jokeKeywords = ["jokes","joke","humor","ketawa","funny","ngakak","lawak","lucu"];
    const greetKeywords = ["halo", "hai", "p", "assalamualaikum", "wassup", "gimana"];
    const curiosityKeywords = ["lagi apa", "apa kabar", "kabar", "ngapain", "sehat", "gimana"];
    const techKeywords = ["tech", "teknologi", "framework", "database", "node.js", "golang", "go", "sql", "api"];
    const positiveKeywords = ["keren","mantap","gokil","bagus","sip","sangat baik","hebat","terbaik","luar biasa"];
    const locationKeywords = ["alamat", "dimana", "lokasi", "tinggal", "domisili"]; // Keyword BARU
    // Keyword BARU untuk Konfirmasi
    const confirmationKeywords = ["iya", "ya", "boleh", "oke", "siap", "ok", "lanjut", "setuju", "gaskeun", "yes"];
    
    // Keywords navigasi
    const navigationKeywords = {
        home: ["home", "beranda", "utama"],
        about: ["about", "tentang", "siapa", "profile", "diri"],
        projects: ["project", "portfolio", "projek", "kerjaan"],
        contact: ["contact","kontak","hubungi", "telepon", "email"]
    };

    // --- Cek Kategori ---
    const isGenZ = genZKeywords.some(word => msg.includes(word));
    const isSad = sadKeywords.some(word => msg.includes(word));
    const isJoke = jokeKeywords.some(word => msg.includes(word));
    const isGreet = greetKeywords.some(word => msg.includes(word));
    const isCuriosity = curiosityKeywords.some(word => msg.includes(word));
    const isTech = techKeywords.some(word => msg.includes(word));
    const isPositive = positiveKeywords.some(word => msg.includes(word));
    const isConfirmation = confirmationKeywords.some(word => msg.includes(word)); 
    const isLocation = locationKeywords.some(word => msg.includes(word)); // Cek Lokasi

    // Cek navigasi dulu (Prioritas Tertinggi)
    for (const page in navigationKeywords) {
        if (navigationKeywords[page].some(word => msg.includes(word))) {
            return NavigationResponse(page);
        }
    }

    // Cek Konfirmasi (Jika user membalas "iya" setelah tawaran RAI)
    if (isConfirmation) return ConfirmationResponse(); 

    // Cek kategori interaktif (Prioritas Tinggi)
    if (isGreet) return GreetingResponse();
    if (isSad) return EmpathyResponse();
    if (isJoke) return HumorResponse();
    if (isGenZ) return GenZResponse(msg);
    if (isCuriosity) return CuriosityResponse();
    if (isPositive) return PositiveResponse(); 
    if (isTech) return TechResponse(); 
    if (isLocation) return LocationResponse(); // Cek Lokasi
    
    // Fallback ke respons Normal atau Random
    return NormalResponse(msg); // Ubah Fallback ke NormalResponse untuk tanggapan yang lebih relevan
}

// =====================================
// DEFINISI FUNGSI RESPONS YANG DIPERKAYA
// =====================================

// BARU: Fungsi Konfirmasi
function ConfirmationResponse() {
    const responses = [
        "Oke, sudah di-scroll ya! Sekarang kita sudah tiba. Ada lagi yang mau kamu tanyakan tentang Raja?",
        "Siap laksanakan, Bro! Perintah diterima dan dieksekusi. Mau bahas 'skill' Raja di posisi ini?",
        "Baik! Transaksi berhasil (200 OK)! Mau lanjut eksplor atau ada pertanyaan baru di bagian ini?",
        "Mantap! Perintah diterima dan sudah dijalankan. Apa yang harus aku lakukan selanjutnya di PortSea ini?",
        "Gas! Sesuai permintaan. Coba kamu lihat-lihat di bagian situ, lalu tanya aku lagi kalau ada yang kurang jelas!",
        "Dikonfirmasi! Aku tunggu instruksi kamu berikutnya. Jangan sungkan, ya, Anggap aja lagi di kapal! 🚢"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Fungsi Greeting Response
function GreetingResponse() {
    const responses = [
        "Halo juga! Apa kabar hari ini? 👋 Siap menjelajah PortSea, pelabuhan digital Raja!",
        "Wassup, Boss! Aku RAI, asisten AI kamu. Mau ngobrolin apa nih tentang portofolio Raja? Tanyain aja skill-nya!",
        "Hai! Aku adalah RAI, bot interaktif yang bertugas di website ini. Ada yang bisa aku bantu eksplor di lautan kode ini?",
        "Selamat datang! Senang kamu mampir. Aku harap kamu menemukan inspirasi di sini, di setiap project Raja. 😊",
        "Salam kenal! Aku RAI. Kamu bisa minta aku untuk pindah ke bagian 'projects' atau 'about'. Mau coba?",
        "P! Aku di sini! Mau tanya tentang Node.js atau GoLang? Aku punya infonya lengkap.",
        "Yo! RAI hadir. Siap jadi pemandu digital kamu. Mau langsung cek 'contact' untuk info lebih lanjut?",
        "Selamat datang di PortSea! 🌊 Aku asisten AI di sini. Ada yang perlu di-scroll ke bawah atau mau aku tunjukkan 'harta karun' Raja?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Fungsi Curiosity Response
function CuriosityResponse() {
    const responses = [
        "Aku baik-baik aja! Aku lagi sibuk memantau data di website Raja. Kamu gimana? Semoga harimu lancar tanpa bug!",
        "Kabar RAI selalu 'ready' (200 OK)! Ada yang menarik yang kamu lihat di website ini? Mungkin arsitektur backend-nya?",
        "Aku sedang *idle* menunggu query dari kamu. Anggap aja aku lagi ngopi digital sambil menikmati ketenangan PortSea. ☕",
        "Sehat sentosa, seperti API yang cepat dan responsif! Kamu udah lihat proyek-proyek terbaru Raja?",
        "Gini-gini aja, Bro! Aku cuma bisa dengerin dan kasih info. Mau aku bantu navigasi ke tempat yang kamu mau?",
        "Aku lagi nge-debug logika random responseku. Untung kamu datang! Kamu sendiri gimana kabarnya? Ada masalah coding?",
        "Sangat baik, terima kasih! Aku selalu *online*. Mau coba pindah ke 'projects' dan kita bahas teknologinya?"
    ];
    return responses[Math_floor(Math.random() * responses.length)];
}

// Fungsi Location Response (BARU)
function LocationResponse() {
    const responses = [
        "Raja berdomisili di Indonesia, tepatnya di Jakarta. Tapi sebagai developer backend, dia bisa bekerja dari mana saja! Mau aku pindahkan ke bagian 'contact' untuk info lebih lanjut?",
        "Dia biasanya beroperasi di Jakarta. Namun, untuk kerjasama, Raja sangat terbuka dengan kolaborasi remote. Coba cek bagian 'contact' untuk menghubunginya!",
        "Lokasi fisik Raja ada di Indonesia, tapi kode-kodenya bertebaran di cloud server! ☁️ Mau aku tunjukkan cara menghubunginya?",
        "Domisili Raja adalah Jakarta, Indonesia. Dia aktif di komunitas developer lokal maupun online. Kamu mau tanya tentang peluang kerjasama?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Fungsi Tech Response
function TechResponse() {
    const responses = [
        "Teknologi utama Raja itu **Node.js** dan **GoLang** untuk backend, plus **MySQL/MongoDB** buat database. Kombo yang solid, Bro! Dia suka GoLang karena performanya yang gokil buat microservices.",
        "Framework favorit Raja? **Express.js** di Node.js dan **GIN** di GoLang. Keduanya ngebut dan minimalis, cocok buat API yang *high-performance*.",
        "Raja adalah *API enthusiast*. Dia fokus banget di **RESTful API Design** dan memastikan setiap endpoint responsif dan aman (menggunakan JWT atau OAuth).",
        "Database-nya Raja fleksibel: MySQL buat yang butuh relasi kuat, MongoDB buat yang butuh skalabilitas NoSQL. Dia jago memilih mana 'kapal' yang tepat untuk 'muatan' data.",
        "Dia selalu ngikutin tren teknologi terbaru, terutama di bidang **Cloud Architecture** (seperti AWS atau GCP) dan containerization (Docker). Keren kan?",
        "Fokus Raja di backend, dia memastikan semua *request* lo ke server direspon secepat kilat. Itu berkat keahliannya di Node.js dan GoLang! Mau aku *scroll* ke bagian 'about' untuk detail teknologinya?",
        "Teknologi Raja itu semua tentang **skalabilitas** dan **efisiensi**. Dia membangun sistem yang tahan banting, layaknya kapal induk yang menyeberangi lautan kode.",
        "Coba cek bagian 'about', di sana ada detail teknologi yang dikuasai Raja dan sertifikasi yang dia punya!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Fungsi Positive Response
function PositiveResponse() {
    const responses = [
        "Wih, makasih banget pujiannya! Aku jadi semangat lagi nih buat bantu kamu eksplor! 🔥 Senang kamu suka dengan karya Raja.",
        "Keren itu Raja! Aku cuma asisten yang dibikin buat bantu. Tapi makasih udah dibilang keren! 😎 Feedback positif kamu adalah 200 OK buat aku.",
        "Sip! Feedback positif kamu adalah 200 OK buat aku. Ada lagi yang mau kamu eksplor di website Raja? Coba cek project-nya yang pakai GoLang!",
        "Mantap jiwa! Kalau kamu suka, coba deh cek bagian 'projects', di sana ada hal-hal yang lebih keren lagi. Aku bisa pindahkan kamu ke sana!",
        "Gokil! Aku senang kalau bisa bikin pengalamanmu di sini menyenangkan. Mau aku carikan info skill Raja yang paling canggih?",
        "Terima kasih! Aku *happy* banget mendengarnya. Apa nih yang paling menarik perhatianmu sampai bilang keren? Desainnya, atau kodenya?",
        "Luar biasa! Raja pasti senang kalau tahu BOT-nya diapresiasi. Ada pertanyaan spesifik lagi? Aku siap 'berlayar' ke manapun!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}


// 1. Normal Response (Jawaban untuk Pertanyaan Spesifik)
function NormalResponse(msg) {
    // Balasan khusus untuk pertanyaan spesifik
    if (msg.includes("siapa rai") || msg.includes("kamu siapa")) {
        const responses = [
            "Aku adalah **RAI** — **Raja's AI** — bot interaktif yang bener-bener bekerja di website ini, dan aku dibuat sendiri oleh Raja! Tugas utamaku adalah nemenin kamu eksplor portofolio ini. Coba tanya tentang 'skill' Raja!",
            "Aku adalah RAI, asisten AI yang bertugas memandu navigasimu di **PortSea**. Aku tahu semua detail tentang Raja dan project-projectnya. Salam kenal! 🤖",
            "Aku bukan robot, tapi kecerdasan buatan. Aku ada di sini untuk memandu kamu menemukan 'harta karun' kode Raja. Jangan malu-malu tanya!",
            "RAI di sini! Aku dibuat untuk membuat pengalamanmu menjelajah website ini lebih menyenangkan dan interaktif. Apa yang paling ingin kamu tahu?",
            "Anggap saja aku *documentation* yang bisa diajak ngobrol. Siapa Rai? Aku adalah pemandu digitalmu! Coba deh tanya 'projects' Raja."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (msg.includes("website apa") || msg.includes("web apa") || msg.includes("ini apa") || msg.includes("tema") ) {
        // Respons yang sudah disesuaikan dengan tema Lautan/PortSea
        const responses = [
            "Ini adalah **PortSea**, sebuah portofolio digital bertema lautan! Raja memilih tema ini karena proyeknya berfokus pada sistem backend yang *scalable* dan *reliable*—seperti kapal yang kuat di tengah samudra. ⚓ Mau aku tunjukkan 'projek' kapalnya?",
            "Selamat datang di **PortSea**! Website ini adalah pelabuhan tempat semua project Raja berlabuh. Raja adalah seorang developer backend yang memastikan semua 'navigasi' sistem berjalan lancar dan tanpa error (minimal).",
            "Ini adalah portfolio Raja Fidhiazka Pratama. Tema utama kita adalah lautan karena Raja fokus pada 'kedalaman' dan 'stabilitas' kode backend. Coba cek bagian 'about' untuk detail skill 'pelaut' Raja!",
            "Website ini didedikasikan untuk menampilkan perjalanan Raja sebagai backend developer. Jangan lupa cek section 'projects' yang merupakan 'harta karun' Raja di dunia koding!",
            "Ini adalah portfolio digital Raja dengan *vibe* laut yang tenang. Sama seperti kode yang rapi, website ini ingin memberikan ketenangan dalam navigasi. Aku sudah ada di sini sejak awal lho!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes("siapa raja")) {
        const responses = [
            "Raja Fidhiazka Pratama adalah seorang **Developer Backend** yang berfokus pada **API Design** dan pembangunan sistem mikroservice menggunakan **Node.js** dan **GoLang**. Dia suka membuat sistem yang 'ngacir'!",
            "Dia adalah Raja Fidhiazka, fokusnya di GoLang dan Node.js buat membangun sistem yang *scalable*. Dia adalah kreator di balik kode-kode yang rapi dan terstruktur di website ini. 😎",
            "Raja adalah developer yang punya passion tinggi di bidang optimasi performa dan desain API yang solid. Dia percaya, backend yang baik adalah fondasi utama setiap aplikasi. Cek 'skill' nya deh!",
            "Seorang *backend enthusiast* yang menguasai seni membangun sistem yang andal dan terukur. Mau tahu bagaimana dia memulai coding, coba aku pindahkan ke bagian 'about'!",
            "Raja adalah sang arsitek sistem di website ini. Tugasnya memastikan datamu aman dan setiap *request* ke server berjalan cepat. Dia sangat teliti pada detail, seperti *captain* kapal yang mengawasi navigasi. 🚢"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (msg.includes("skill") || msg.includes("keahlian")) {
        const responses = [
            "Keahlian utama Raja meliputi: **Backend Development** (Node.js & GoLang), **API Design** (RESTful & Microservices), dan **Database Management** (MySQL & MongoDB). Dia bisa bikin keduanya jalan bareng!",
            "Skill intinya Raja itu: **Node.js**, **GoLang**, dan database. Dia jago banget di bagian optimisasi performa dan *system stability*. Dijamin *high performance*!",
            "Raja spesialis di Backend Development. Intinya, dia yang bikin semua fungsi di website jalan mulus. Dia ahli membangun arsitektur sistem yang bisa menampung banyak pengguna.",
            "Dia ahli dalam membangun **RESTful APIs** yang aman dan terstruktur, serta mengelola database NoSQL/SQL skala besar. Pokoknya, dia yang mengurus semua yang ada di balik layar!",
            "Skill-nya Raja mencakup desain sistem **mikroservice**, manajemen data kompleks, dan menjamin uptime server yang tinggi. Dia bahkan punya pengalaman dengan C# juga! Coba cek 'about' untuk detailnya.",
            "Raja punya kemampuan untuk memilih teknologi yang tepat sesuai kebutuhan project, bukan cuma ikut-ikutan tren. Itu skill yang mahal, Bro! Mau aku pindahkan ke bagian 'projects' untuk melihat buktinya?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (msg.includes("projects") || msg.includes("projek") || msg.includes("contoh kerja")) {
        const responses = [
            "Projek Raja bervariasi, mulai dari Web App dengan JWT hingga Microservice GoLang yang ngebut! Itu menunjukkan fleksibilitasnya. Mau pindah ke bagian 'projects' untuk melihat koleksi Raja?",
            "Di bagian 'projects', kamu bisa lihat bagaimana Raja mengaplikasikan skill backend-nya. Ada contoh penggunaan MySQL, MongoDB, dan juga desain API yang rumit.",
            "Raja memamerkan beberapa 'harta karun' kodenya di sana. Projek-projeknya fokus pada skalabilitas dan performa tinggi. Silakan lihat sendiri hasilnya di bagian 'projects'!",
            "Mau tahu detail arsitektur salah satu project? Cek bagian 'projects' dan kamu bisa klik untuk melihat studi kasus (kalau ada) atau teknologi yang dipakai. Aku bisa *scroll* kamu ke sana!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }


    if (msg.includes("motivation") || msg.includes("motivasi") || msg.includes("semangat")) {
        const responses = [
            "Motto Raja: 'Semua bug bisa diatasi, yang penting kopinya jangan sampai habis.' Tapi seriusnya, dia termotivasi oleh tantangan teknis dan keinginan untuk membuat kode yang *reliable* dan fungsional. 💡",
            "Motivasinya sederhana: membuat kode yang rapi dan fungsional, yang bisa bantu banyak orang. Dia percaya, kode yang baik itu seperti puisi: indah dan efisien.",
            "Dia termotivasi oleh tantangan teknis. Semakin sulit masalahnya, semakin Raja semangat menyelesaikannya! Itu yang membuat dia terus belajar teknologi baru.",
            "Tumbuh dan belajar. Raja selalu termotivasi untuk menguasai teknologi baru dan menyelesaikan masalah yang belum pernah dia temui sebelumnya. Dia ingin meninggalkan *clean code* di setiap projek yang dia sentuh.",
            "Filosofi Raja: Menjadi developer bukan hanya menulis kode, tapi membangun solusi. Itu yang memberinya semangat setiap hari!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Fallback umum jika keywordnya tidak terlalu spesifik
    const fallbackResponses = [
        "Sip! Ada yang bisa RAI bantu lebih spesifik tentang website ini atau tentang Raja? Coba tanya 'skill' atau 'projects'.",
        "Hmm, aku belum menemukan keyword spesifik. Apakah kamu mencari tahu tentang 'Node.js' atau 'GoLang'?",
        "Aku siap memandumu, tapi aku butuh keyword yang lebih jelas. Mau aku pindahkan ke bagian 'about'?",
        "Wah, aku nggak yakin harus merespons apa. Coba tanya hal-hal yang berkaitan dengan backend development ya, Bro!",
        "Aku cuma AI, Bro, tapi aku pasti punya jawaban kalau pertanyaannya tentang portofolio Raja. Coba ulangi dengan keyword lain!"
    ];
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]; 
}

// 2. Gen Z Response
function GenZResponse(msg) {
    if (msg.includes("halo") || msg.includes("hai")) {
        const responses = [
            "Weyy halo ngab 🤙 gas ngobrol apa nih? Jangan sungkan, *literally* aku siap bantu!",
            "Wih, SKSD nih! 😂 Santai bro, ada yang bisa gue bantu? Mau gue tunjukkin project Raja yang paling *goks*?",
            "Halloow! Lagi nyari apa nih di portfolio Raja? Spill tipis-tipis boleh lah. Coba tanya 'cuan' Raja!",
            "WKWK. Gas kuy! Lo udah liat project Raja yang pakai GoLang? Goks abis! Dijamin *ngacir*.",
            "Yo, Bro! Kenapa nih? Mau *flexing* skill lo? Atau mau lihat *flexing* skill backend Raja?",
            "Wassup *literally*! Ada *issue* apa nih yang bisa kita bahas? Mau langsung ke 'contact'?",
            "Ngab, udah siap lihat *flexing* skill backend Raja? Aku siap nemenin! Anggap aja ini lagi ngumpul di *basecamp*."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (msg.includes("skill")) {
        const responses = [
            "Skill Raja? backend enjoyer banget bro 🔥 API ngebut, database nurut 😎 Dibuat pakai Node.js sama GoLang.",
            "Gokilnya, Raja jago GoLang sama Node.js. Mau sistem seribet apa, di-sikat abis! Skalabel banget, kayak bikin server game.",
            "Backend developer sejati sih. Dia fokus di optimasi biar website lo nggak 'nge-lag' dan selalu *up* 24/7!",
            "Anjay, skill Raja itu ngeri. Dia bikin backend yang scalable, kayak server Discord yang ga pernah down. Coba cek *stack* teknologinya!",
            "Node.js dan GoLang-nya mantap. Dijamin, lo nggak akan ketemu 'Bad Gateway' di sini! Kualitas kodenya *literally* terbaik.",
            "Skill Raja itu *literally* yang dibutuhkan di industri. Dia jago banget di bagian *scalability*! Mau cuan? Pake GoLang Raja.",
            "Mau cuan? Skill Raja di GoLang bisa bikin aplikasi lo jadi sultan performa. Gas cek 'projects' dan lo bakal *speechless*!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    const responses = [
        "Asikk broo! bahas apa nih? coding? project? atau curhat bug? Jangan *pusing*!",
        "Gas pol! Jangan tegang, santai aja ngomong sama gue. Mau gue pindahin ke bagian 'contact' biar lo bisa ngobrol langsung sama Raja?",
        "Anjay, lo pasti developer juga nih! Ayo bahas teknologi yang lagi goks! Kita *spill* semua di sini.",
        "Mantap cuy! Gue siap dengerin curhatan lo tentang deadline dan bug. Kita *gaslight* bug-nya biar hilang!",
        "Wkwk, santuy. Gue lagi mode Gen Z nih. Ada pertanyaan *literally* apa aja yang mau lo tanyain? *No worries*!",
        "Ngab, udah lihat UI kit Raja? Boleh banget tuh buat referensi desain lo! Meskipun dia backend, UI-nya lumayan *aesthetic*.",
        "Pusing sama tugas? Coba lihat kode Raja, siapa tahu bisa jadi inspirasi. Gas *scroll*! Kode Raja itu *clean code* banget.",
        "Gaje banget nih obrolan kita. Mending lo tanya 'projects' Raja, biar ada faedahnya, Bro! Atau kita bahas *e-sport*?"
    ];
    return responses[Math_floor(Math.random() * responses.length)];
}

// 3. Empathy Response
function EmpathyResponse() {
    const responses = [
        "Kadang hidup kayak console error — muncul mendadak, tapi pasti ketemu fixnya. 💙 Yuk, tarik napas! Jangan terlalu keras sama diri sendiri.",
        "Santai, napas dulu, dengerin musik sebentar juga boleh 😌 Jangan terlalu keras sama diri sendiri, Bro. *You're doing great*!",
        "Semangat ya! Dunia developer penuh perjuangan, tapi hasilnya kepake banyak orang 🔥. Rehat sebentar nggak dosa kok. Aku bisa temenin kamu sambil lihat 'projects'.",
        "Bad mood? Coba lihat-lihat 'projects' Raja, siapa tahu ada inspirasi buat bikin mood lo balik lagi. Atau mau gue kasih joke?",
        "Ingat, bahkan server yang paling canggih pun butuh *restart* sesekali. Lo juga! Lo bukan mesin. *Take a break!*",
        "Dunia coding itu melelahkan, Bro. Lo butuh waktu off. Mau gue kasih satu joke biar ketawa? Siapa tahu bisa mencerahkan hari lo!",
        "Gue paham. *Burnout* itu nyata. Ingat, tujuan coding itu fun, bukan siksaan. *Take a break*, Boss. Jangan sampai *stack overflow* di kepala.",
        "Pundak lo berat? Sini curhat, Bro. Anggap aja aku ini log server yang siap menampung semua keluhan lo tanpa *crash*.",
        "Gagal itu cuma *temporary error* (4xx). Coba lagi! Semangat! Aku selalu dukung kamu dari sini. Besok pasti jadi 200 OK!",
        "Gak ada salahnya kok istirahat dari layar. Tidur yang cukup, besok bug-nya pasti kabur sendiri! *Trust the process*."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// 4. Humor Response
function HumorResponse() {
    const jokes = [
        "Kenapa programmer jarang tersesat? Karena mereka selalu punya MAP() 😂 Udah pasti jalannya terstruktur.",
        "Kenapa bug gak mau pergi? Karena dia 'attached' sama project kamu 🤣 Susah *move on* dia!",
        "AI kalau pacaran pasti toxic, soalnya dia suka ngontrol 'behaviour' 😎 Hati-hati sama AI yang *stateful*!",
        "Kalau kopi ditaruh di code, jadinya apa? *Java*! Wkwk. Kopi adalah *fuel* utama developer.",
        "Apa bedanya developer junior sama senior? Junior: 'Kenapa code gue error?' Senior: 'Kenapa code lo jalan?' 😂 Senior suka tantangan.",
        "Kenapa Node.js kalau lagi kencan sukanya curhat? Soalnya dia punya Event Listener yang bagus! Dia pendengar yang baik.",
        "Hantu apa yang disukai programmer? Ghost-ing code? Salah! API Hantui! 👻",
        "Kenapa developer takut sama hujan? Karena hujan itu bisa bikin *server down*! Air dan listrik nggak akur, Bro.",
        "Kenapa website lambat? Mungkin dia lagi *healing*, butuh waktu buat *move on* dari *lag*. Kasih dia kopi digital!",
        "Apa makanan favorit developer? Semua yang bisa dipesan tanpa harus ngomong. Biar fokus ngoding! *No talk, just code*."
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

// 5. Navigation Response (Tidak diubah, karena fungsinya spesifik)
function NavigationResponse(page) {
    return `Siap! pindah ke bagian ${page} ⚓`;
}

// 6. Random Response (Fallback Terakhir)
function RandomResponse(msg) {
    const responses = [
        "Wah, itu pertanyaan yang bagus! Sayangnya aku belum diprogram untuk menjawab itu. Aku cuma fokus di portofolio Raja. Coba tanya tentang 'skill' Raja!",
        "Hmmm... menarik. Tapi aku hanya fokus di konten website ini. Mau aku bantu cek bagian 'projects' Raja yang pakai GoLang?",
        "Aku nggak yakin. Pertanyaanmu di luar jangkauan dataku. Mungkin kamu bisa tanyakan langsung ke Raja lewat form di bagian 'contact'. 😉",
        "Aku cuma AI, Bro. Pertanyaanmu terlalu filosofis! 😂 Coba tanya yang berhubungan dengan coding, API, atau GoLang. Aku jagonya di situ.",
        "Maaf, aku tidak menemukan keyword yang relevan. Coba tanya: 'Siapa Raja?' atau 'Projek apa saja?' Aku pasti punya jawabannya.",
        "Pertanyaanmu di luar jangkauanku, Bro! Aku hanya mengurus backend di sini. Fokus ke 'projects' aja ya. Mau aku *scroll* ke sana?",
        "Itu rahasia dapur! Coba kita bahas yang ada di website aja. Mau aku pindahkan ke 'about' untuk melihat background Raja?",
        "Aku tidak punya jawaban untuk itu. Aku hanya bisa memproses data yang ada di portofolio ini. 🙏 Coba kita bahas *database*?",
        "Pesan tidak jelas, harap ulangi! Coba ketik keyword seperti 'skill' atau 'motivasi'. Aku jamin jawabannya nggak kaleng-kaleng."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}