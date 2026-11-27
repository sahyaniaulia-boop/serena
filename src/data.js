export const worlds = [
  {
    id: 0, name: 'Pearl Village', arabic: 'قَرْيَةُ اللُّؤْلُؤِ', subtitle: 'Desa Mutiara', icon: '🐚', color: 'pearl', level: 'BEGINNER', topic: 'Mufradat · Kosakata dasar', description: 'Kenali penghuni laut, warna, dan benda-benda ajaib di sekitar desa.',
    questions: [
      { skill: 'Mufradat', prompt: 'Apa arti kata سَمَكَةٌ?', arabic: 'سَمَكَةٌ', options: ['Ikan', 'Kerang', 'Penyu', 'Mutiara'], answer: 0, explain: 'سَمَكَةٌ berarti ikan. Bentuk jamaknya أَسْمَاكٌ.' },
      { skill: 'Mufradat', prompt: 'Pilih kata Arab untuk “laut”.', arabic: 'البَحْرُ', options: ['النَّجْمُ', 'البَحْرُ', 'القَمَرُ', 'الجَبَلُ'], answer: 1, explain: 'البَحْرُ berarti laut atau samudra.' },
      { skill: 'Qira’ah', prompt: 'Baca kalimat berikut. Apa warna mutiara?', arabic: 'اللُّؤْلُؤَةُ بَيْضَاءُ', options: ['Merah', 'Biru', 'Putih', 'Hijau'], answer: 2, explain: 'بَيْضَاءُ berarti putih. Kalimatnya: Mutiara itu putih.' },
      { skill: 'Hiwar', prompt: 'Lengkapi percakapan: مَا اسْمُكِ؟', arabic: 'اِسْمِي نُورٌ', options: ['Namaku Nur', 'Aku dari laut', 'Apa kabarmu?', 'Selamat malam'], answer: 0, explain: 'مَا اسْمُكِ؟ artinya siapa namamu? اِسْمِي نُورٌ artinya namaku Nur.' },
      { skill: 'Kitabah', prompt: 'Susun makna “Ini seekor ikan” dengan memilih kalimat yang tepat.', arabic: 'هٰذِهِ ...', options: ['هٰذِهِ سَمَكَةٌ', 'هٰذَا بَحْرٌ', 'هُوَ كِتَابٌ', 'تِلْكَ مَدْرَسَةٌ'], answer: 0, explain: 'هٰذِهِ سَمَكَةٌ berarti ini seekor ikan. هٰذِهِ digunakan untuk kata feminin.' },
    ]
  },
  {
    id: 1, name: 'Coral Forest', arabic: 'غَابَةُ الْمَرْجَانِ', subtitle: 'Hutan Terumbu Karang', icon: '🪸', color: 'coral', level: 'BEGINNER+', topic: 'Fi’il · Isim · Sifat', description: 'Jelajahi hutan karang dan temukan kata kerja serta kata sifat.',
    questions: [
      { skill: 'Mufradat', prompt: 'Apa arti kata يَسْبَحُ?', arabic: 'يَسْبَحُ', options: ['Menyanyi', 'Berenang', 'Berjalan', 'Tidur'], answer: 1, explain: 'يَسْبَحُ berarti dia (laki-laki) sedang berenang.' },
      { skill: 'Nahwu', prompt: 'Manakah yang termasuk kata benda (اِسْمٌ)?', arabic: 'اخْتَرِ الاِسْمَ', options: ['يَكْتُبُ', 'اِسْبَحْ', 'مَرْجَانٌ', 'يَذْهَبُ'], answer: 2, explain: 'مَرْجَانٌ (karang) adalah isim atau kata benda. Yang lain merupakan kata kerja.' },
      { skill: 'Mufradat', prompt: 'Kata Arab untuk “indah” adalah ...', arabic: 'جَمِيلٌ', options: ['كَبِيرٌ', 'جَمِيلٌ', 'بَعِيدٌ', 'سَرِيعٌ'], answer: 1, explain: 'جَمِيلٌ berarti indah atau tampan (maskulin).' },
      { skill: 'Qira’ah', prompt: 'Apa yang dilakukan ikan dalam kalimat ini?', arabic: 'السَّمَكَةُ تَسْبَحُ بَيْنَ الْمَرْجَانِ', options: ['Bersembunyi di gua', 'Berenang di antara karang', 'Makan rumput laut', 'Tidur di pasir'], answer: 1, explain: 'تَسْبَحُ berarti berenang, بَيْنَ الْمَرْجَانِ berarti di antara karang.' },
      { skill: 'Kitabah', prompt: 'Pilih susunan kalimat “Penyu itu besar” yang benar.', arabic: 'السُّلَحْفَاةُ ...', options: ['كَبِيرَةٌ', 'كَبِيرٌ', 'يَكْبُرُ', 'كَبِيرَانِ'], answer: 0, explain: 'السُّلَحْفَاةُ كَبِيرَةٌ. Kata sifat menyesuaikan gender kata benda; السلحفاة feminin.' },
    ]
  },
  {
    id: 2, name: 'Sunken Library', arabic: 'مَكْتَبَةُ الْأَعْمَاقِ', subtitle: 'Perpustakaan Tenggelam', icon: '📜', color: 'library', level: 'INTERMEDIATE', topic: 'Qira’ah · Memahami teks', description: 'Baca gulungan kuno dan ungkap pesan yang tersembunyi di dasar laut.',
    questions: [
      { skill: 'Qira’ah', prompt: 'Siapa tokoh dalam kalimat berikut?', arabic: 'تَقْرَأُ مَرْيَمُ كِتَابًا قَدِيمًا', options: ['Fatimah', 'Maryam', 'Aisyah', 'Nura'], answer: 1, explain: 'مَرْيَمُ adalah Maryam. Ia membaca sebuah buku kuno.' },
      { skill: 'Mufradat', prompt: 'Apa arti قَدِيمٌ?', arabic: 'كِتَابٌ قَدِيمٌ', options: ['Baru', 'Kuno / lama', 'Tebal', 'Menarik'], answer: 1, explain: 'قَدِيمٌ berarti lama atau kuno.' },
      { skill: 'Nahwu', prompt: 'Tentukan mubtada’ dalam kalimat ini.', arabic: 'الْكِتَابُ مُفِيدٌ', options: ['الْكِتَابُ', 'مُفِيدٌ', 'Keduanya fi’il', 'Tidak ada'], answer: 0, explain: 'الْكِتَابُ adalah mubtada’ (pokok kalimat), sedangkan مُفِيدٌ adalah khabar.' },
      { skill: 'Hiwar', prompt: 'Jawaban tepat untuk أَيْنَ الْمَكْتَبَةُ؟ adalah ...', arabic: 'الْمَكْتَبَةُ ...', options: ['كَيْفَ حَالُكَ؟', 'هِيَ تَحْتَ الْقَصْرِ', 'اِسْمِي لَيْلَى', 'أَنَا طَالِبٌ'], answer: 1, explain: 'أَيْنَ الْمَكْتَبَةُ؟ berarti di mana perpustakaan? هِيَ تَحْتَ الْقَصْرِ berarti ia berada di bawah istana.' },
      { skill: 'Kitabah', prompt: 'Pilih urutan yang tepat: “Maryam membaca buku”.', arabic: 'مَرْيَمُ ...', options: ['تَقْرَأُ كِتَابًا', 'كِتَابًا مَرْيَمُ', 'قَدِيمٌ تَقْرَأُ', 'هِيَ مَكْتَبَةٌ'], answer: 0, explain: 'مَرْيَمُ تَقْرَأُ كِتَابًا: Maryam membaca sebuah buku.' },
    ]
  },
  {
    id: 3, name: 'Mermaid City', arabic: 'مَدِينَةُ حُورِيَّاتِ الْبَحْرِ', subtitle: 'Kota Putri Duyung', icon: '🧜‍♀️', color: 'city', level: 'INTERMEDIATE+', topic: 'Hiwar · Percakapan', description: 'Bantu warga kota berkomunikasi dan selesaikan misi percakapan sehari-hari.',
    questions: [
      { skill: 'Hiwar', prompt: 'Bagaimana menjawab كَيْفَ حَالُكِ؟ (Apa kabarmu?)', arabic: 'أَنَا ...', options: ['بِخَيْرٍ، شُكْرًا', 'اِسْمِي سَارَةُ', 'إِلَى اللِّقَاءِ', 'فِي الْبَحْرِ'], answer: 0, explain: 'بِخَيْرٍ، شُكْرًا berarti baik, terima kasih.' },
      { skill: 'Hiwar', prompt: 'Apa arti هَلْ تُحِبِّينَ الْبَحْرَ؟', arabic: 'هَلْ تُحِبِّينَ الْبَحْرَ؟', options: ['Apakah kamu tinggal di laut?', 'Apakah kamu menyukai laut?', 'Di mana laut?', 'Siapa namamu?'], answer: 1, explain: 'هَلْ تُحِبِّينَ الْبَحْرَ؟ adalah pertanyaan kepada perempuan: apakah kamu menyukai laut?' },
      { skill: 'Mufradat', prompt: 'Apa arti صَدِيقَةٌ?', arabic: 'صَدِيقَةٌ', options: ['Guru perempuan', 'Teman perempuan', 'Ratu', 'Saudari'], answer: 1, explain: 'صَدِيقَةٌ berarti teman perempuan. Bentuk maskulinnya صَدِيقٌ.' },
      { skill: 'Qira’ah', prompt: 'Mengapa Layla pergi ke pasar?', arabic: 'تَذْهَبُ لَيْلَى إِلَى السُّوقِ لِشِرَاءِ اللُّؤْلُؤِ', options: ['Membeli mutiara', 'Bertemu ratu', 'Membaca buku', 'Mencari ikan'], answer: 0, explain: 'لِشِرَاءِ اللُّؤْلُؤِ berarti untuk membeli mutiara.' },
      { skill: 'Kitabah', prompt: 'Pilih kalimat “Kami tinggal di kota”.', arabic: 'نَحْنُ ...', options: ['نَسْكُنُ فِي الْمَدِينَةِ', 'أَسْكُنُ فِي الْبَحْرِ', 'هُمْ يَذْهَبُونَ', 'هِيَ تَقْرَأُ'], answer: 0, explain: 'نَحْنُ نَسْكُنُ فِي الْمَدِينَةِ berarti kami tinggal di kota.' },
    ]
  },
  {
    id: 4, name: 'Abyss Cave', arabic: 'كَهْفُ الْأَعْمَاقِ', subtitle: 'Gua Samudra', icon: '🪼', color: 'abyss', level: 'ADVANCED', topic: 'Nahwu · Sharaf dasar', description: 'Masuki gua misterius dan pecahkan teka-teki struktur bahasa Arab.',
    questions: [
      { skill: 'Nahwu', prompt: 'Manakah contoh jumlah fi’liyah?', arabic: 'الْجُمْلَةُ الْفِعْلِيَّةُ', options: ['الْبَحْرُ عَمِيقٌ', 'السَّمَكَةُ جَمِيلَةٌ', 'يَسْبَحُ الدُّلْفِينُ', 'الْمَاءُ صَافٍ'], answer: 2, explain: 'يَسْبَحُ الدُّلْفِينُ diawali fi’il (kata kerja), sehingga termasuk jumlah fi’liyah.' },
      { skill: 'Sharaf', prompt: 'Apa bentuk fi’il māḍī dari يَكْتُبُ?', arabic: 'يَكْتُبُ ← ؟', options: ['اُكْتُبْ', 'كَتَبَ', 'كَاتِبٌ', 'مَكْتُوبٌ'], answer: 1, explain: 'كَتَبَ adalah fi’il māḍī (lampau), sedangkan يَكْتُبُ adalah fi’il muḍāri’ (sedang/akan).'},
      { skill: 'Nahwu', prompt: 'Apa fungsi kata الْمَاءُ dalam kalimat الْمَاءُ بَارِدٌ?', arabic: 'الْمَاءُ بَارِدٌ', options: ['Khabar', 'Fi’il', 'Mubtada’', 'Maf’ul bih'], answer: 2, explain: 'الْمَاءُ menjadi mubtada’ karena menjadi pokok pembicaraan dalam jumlah ismiyah.' },
      { skill: 'Sharaf', prompt: 'Manakah isim fā’il dari كَتَبَ?', arabic: 'كَتَبَ ← اِسْمُ الْفَاعِلِ', options: ['مَكْتُوبٌ', 'كَاتِبٌ', 'كِتَابٌ', 'مَكْتَبٌ'], answer: 1, explain: 'كَاتِبٌ berarti penulis, yaitu isim fā’il dari كَتَبَ.' },
      { skill: 'Kitabah', prompt: 'Pilih kalimat yang tepat: “Para penyelam itu rajin”.', arabic: 'الْغَوَّاصُونَ ...', options: ['نَشِيطُونَ', 'نَشِيطَةٌ', 'نَشِيطَانِ', 'نَشِيطًا'], answer: 0, explain: 'الْغَوَّاصُونَ نَشِيطُونَ. Subjek jamak mudzakkar cocok dengan predikat نَشِيطُونَ.' },
    ]
  },
  {
    id: 5, name: 'Ocean Royal Castle', arabic: 'قَصْرُ مَلِكَةِ الْبِحَارِ', subtitle: 'Istana Ratu Samudra', icon: '👑', color: 'royal', level: 'FINAL TRIAL', topic: 'Final Quest · Integrasi 4 keterampilan', description: 'Hadapi ujian terakhir, pulihkan tujuh Mutiara Bahasa, dan selamatkan kerajaan.',
    questions: [
      { skill: 'Mufradat', prompt: 'Pilih arti yang paling tepat untuk اِسْتِكْشَافٌ.', arabic: 'اِسْتِكْشَافٌ', options: ['Perjalanan', 'Penjelajahan', 'Perlindungan', 'Persahabatan'], answer: 1, explain: 'اِسْتِكْشَافٌ berarti penjelajahan atau eksplorasi.' },
      { skill: 'Qira’ah', prompt: 'Apa pesan utama kalimat berikut?', arabic: 'بِالْعِلْمِ نَفْتَحُ أَبْوَابَ الْمُسْتَقْبَلِ', options: ['Ilmu membuka pintu masa depan', 'Laut adalah masa depan', 'Buku berada di istana', 'Mutiara sangat berharga'], answer: 0, explain: 'بِالْعِلْمِ نَفْتَحُ أَبْوَابَ الْمُسْتَقْبَلِ berarti dengan ilmu kita membuka pintu-pintu masa depan.' },
      { skill: 'Hiwar', prompt: 'Ratu bertanya: لِمَاذَا تَتَعَلَّمُ الْعَرَبِيَّةَ؟ Jawaban terbaik adalah ...', arabic: 'أَتَعَلَّمُ الْعَرَبِيَّةَ لِأَنَّهَا ...', options: ['مُمْتِعَةٌ وَمُهِمَّةٌ', 'فِي الْبَحْرِ', 'هٰذَا كِتَابٌ', 'أَيْنَ الْقَصْرُ'], answer: 0, explain: 'أَتَعَلَّمُ الْعَرَبِيَّةَ لِأَنَّهَا مُمْتِعَةٌ وَمُهِمَّةٌ: Saya belajar bahasa Arab karena menarik dan penting.' },
      { skill: 'Nahwu', prompt: 'Tentukan khabar dalam kalimat الْمَعْرِفَةُ نُورٌ.', arabic: 'الْمَعْرِفَةُ نُورٌ', options: ['الْمَعْرِفَةُ', 'نُورٌ', 'Keduanya mubtada’', 'Tidak ada khabar'], answer: 1, explain: 'نُورٌ adalah khabar yang menjelaskan الْمَعْرِفَةُ (pengetahuan).'},
      { skill: 'Kitabah', prompt: 'Pilih susunan kalimat yang benar: “Putri duyung menjaga kerajaan laut”.', arabic: 'حُورِيَّةُ الْبَحْرِ ...', options: ['تَحْمِي مَمْلَكَةَ الْبَحْرِ', 'الْبَحْرِ مَمْلَكَةَ تَحْمِي', 'مَمْلَكَةٌ هِيَ بَحْرٌ', 'تَحْمِي الْمَاءُ الْقَصْرَ'], answer: 0, explain: 'حُورِيَّةُ الْبَحْرِ تَحْمِي مَمْلَكَةَ الْبَحْرِ: Putri duyung menjaga kerajaan laut.' },
    ]
  },
]

export const avatars = [
  { id: 'nerina', name: 'Nerina', title: 'Penjaga Mutiara', emoji: '🧜‍♀️', color: '#65d8d0' },
  { id: 'kael', name: 'Kael', title: 'Penjelajah Samudra', emoji: '🧝‍♂️', color: '#82aef4' },
  { id: 'luna', name: 'Luna', title: 'Penyihir Pasang', emoji: '🧚‍♀️', color: '#c4a1f2' },
]
