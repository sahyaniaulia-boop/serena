import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Anchor, ArrowLeft, ArrowRight, Award, BookOpen, Check, ChevronRight, CircleHelp, Compass, Crown, Gem, Headphones, Heart, Lock, Map, Menu, Moon, Pause, Play, RotateCcw, Shell, Shield, Sparkles, Star, Volume2, VolumeX, Waves, X, Zap } from 'lucide-react'
import { avatars, worlds } from './data'

const SAVE_KEY = 'sirena-ocean-progress-v1'
const initialState = { player: null, avatar: 'nerina', completed: [], coins: 0, xp: 0, muted: false, visited: 0 }

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null')
    return saved ? { ...initialState, ...saved } : initialState
  } catch { return initialState }
}

function playTone(muted, type = 'click') {
  if (muted || typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const now = ctx.currentTime
    const patterns = {
      click: [{ f: 520, t: 0, d: .08, v: .045 }],
      correct: [{ f: 660, t: 0, d: .12, v: .055 }, { f: 880, t: .11, d: .18, v: .05 }],
      wrong: [{ f: 190, t: 0, d: .2, v: .05 }, { f: 145, t: .12, d: .2, v: .035 }],
      win: [{ f: 523, t: 0, d: .18, v: .06 }, { f: 659, t: .16, d: .18, v: .06 }, { f: 784, t: .32, d: .2, v: .06 }, { f: 1047, t: .5, d: .38, v: .055 }],
    }
    patterns[type].forEach(({ f, t, d, v }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type === 'wrong' ? 'triangle' : 'sine'
      osc.frequency.setValueAtTime(f, now + t)
      gain.gain.setValueAtTime(.0001, now + t)
      gain.gain.exponentialRampToValueAtTime(v, now + t + .015)
      gain.gain.exponentialRampToValueAtTime(.0001, now + t + d)
      osc.connect(gain); gain.connect(ctx.destination)
      osc.start(now + t); osc.stop(now + t + d + .02)
    })
    window.setTimeout(() => ctx.close().catch(() => {}), 1500)
  } catch { /* audio is an enhancement; never block gameplay */ }
}

function speakArabic(text) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ar-SA'
  utterance.rate = .78
  window.speechSynthesis.speak(utterance)
}

function Stat({ icon: Icon, label, value, tone = '' }) {
  return <div className="stat"><span className={`stat-icon ${tone}`}><Icon size={16} /></span><span><small>{label}</small><b>{value}</b></span></div>
}

function Brand({ compact = false }) {
  return <div className="brand"><span className="brand-mark"><Shell size={22} /></span><span><b>SIRENA</b>{!compact && <small>THE LOST KINGDOM OF THE OCEAN</small>}</span></div>
}

function OceanBackdrop() {
  return <div className="ocean-backdrop" aria-hidden="true"><div className="light-rays"/><div className="water-glow glow-one"/><div className="water-glow glow-two"/><div className="coral coral-left">✺</div><div className="coral coral-right">✿</div><div className="bubbles">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div><div className="sea-floor"/></div>
}

function App() {
  const [progress, setProgress] = useState(loadProgress)
  const [screen, setScreen] = useState(() => loadProgress().player ? 'map' : 'welcome')
  const [nameInput, setNameInput] = useState('')
  const [avatarPick, setAvatarPick] = useState('nerina')
  const [activeWorld, setActiveWorld] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [showVictory, setShowVictory] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => { localStorage.setItem(SAVE_KEY, JSON.stringify(progress)) }, [progress])

  const avatar = avatars.find(item => item.id === progress.avatar) || avatars[0]
  const completedCount = progress.completed.length
  const unlockedIndex = Math.min(completedCount, worlds.length - 1)
  const totalQuestions = worlds.reduce((sum, world) => sum + world.questions.length, 0)
  const currentWorld = worlds[activeWorld]
  const question = currentWorld?.questions[questionIndex]
  const overallPercent = Math.round((completedCount / worlds.length) * 100)
  const isWorldComplete = progress.completed.includes(activeWorld)

  const updateProgress = (patch) => setProgress(prev => ({ ...prev, ...patch }))
  const enterWorld = (index) => {
    if (index > unlockedIndex || progress.completed.includes(index)) return
    playTone(progress.muted, 'click')
    setActiveWorld(index); setQuestionIndex(0); setSelected(null); setFeedback(''); setScreen('lesson')
  }
  const beginAdventure = () => {
    const cleanName = nameInput.trim().slice(0, 18)
    if (!cleanName) return
    playTone(progress.muted, 'win')
    updateProgress({ player: cleanName, avatar: avatarPick, visited: 1 })
    setScreen('map')
  }
  const chooseAnswer = (index) => {
    if (feedback === 'correct' || selected !== null) return
    setSelected(index)
    if (index === question.answer) {
      setFeedback('correct'); playTone(progress.muted, 'correct')
      updateProgress({ xp: progress.xp + 20, coins: progress.coins + 10 })
    } else {
      setFeedback('wrong'); setShake(true); playTone(progress.muted, 'wrong')
      window.setTimeout(() => setShake(false), 420)
    }
  }
  const retryQuestion = () => { setSelected(null); setFeedback(''); setShake(false) }
  const nextQuestion = () => {
    if (questionIndex < currentWorld.questions.length - 1) {
      setQuestionIndex(v => v + 1); setSelected(null); setFeedback(''); playTone(progress.muted, 'click')
    } else {
      const freshCompleted = [...new Set([...progress.completed, activeWorld])]
      const finalClear = freshCompleted.length === worlds.length
      updateProgress({ completed: freshCompleted, coins: progress.coins + 50, xp: progress.xp + 100 })
      playTone(progress.muted, 'win')
      setShowVictory(true)
      if (finalClear) setTimeout(() => setScreen('ending'), 900)
    }
  }
  const continueAfterWin = () => {
    setShowVictory(false)
    if (activeWorld === worlds.length - 1) setScreen('ending')
    else { setActiveWorld(activeWorld + 1); setScreen('map') }
  }
  const resetGame = () => {
    if (!window.confirm('Hapus seluruh progres petualangan SIRENA di perangkat ini?')) return
    localStorage.removeItem(SAVE_KEY); setProgress(initialState); setScreen('welcome'); setShowVictory(false)
  }
  const toggleMute = () => setProgress(prev => ({ ...prev, muted: !prev.muted }))
  const questionProgress = ((questionIndex + (feedback === 'correct' ? 1 : 0)) / currentWorld.questions.length) * 100

  return <div className="app-shell"><OceanBackdrop />
    <header className="topbar"><Brand /><div className="top-actions">
      {progress.player && <><div className="top-player"><span className="mini-avatar">{avatar.emoji}</span><span>{progress.player}</span></div><Stat icon={Gem} label="Pearls" value={progress.coins} tone="gold"/><Stat icon={Zap} label="XP" value={progress.xp} tone="violet"/></>}
      <button className="icon-button" onClick={toggleMute} aria-label={progress.muted ? 'Unmute' : 'Mute'}>{progress.muted ? <VolumeX size={18}/> : <Volume2 size={18}/>}</button>
      {progress.player && <button className="icon-button reset-button" onClick={resetGame} title="Reset progres"><RotateCcw size={17}/></button>}
    </div></header>

    <main className="main-content">
      <AnimatePresence mode="wait">
        {screen === 'welcome' && <motion.section key="welcome" className="welcome-screen" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
          <div className="welcome-copy"><span className="eyebrow"><Sparkles size={14}/> AN UNDERWATER ARABIC ADVENTURE</span><h1>THE LOST<br/><em>KINGDOM</em><br/>OF THE OCEAN</h1><p className="welcome-lead">Sebuah kerajaan tenggelam. Enam wilayah misterius. Satu perjalanan untuk menemukan kembali bahasa yang hilang.</p><div className="welcome-tags"><span><Waves size={14}/> Explore</span><span><BookOpen size={14}/> Learn Arabic</span><span><Crown size={14}/> Restore the kingdom</span></div></div>
          <div className="welcome-art"><div className="moon-disc"/><div className="art-orbit orbit-a"/><div className="art-orbit orbit-b"/><div className="hero-mermaid">🧜‍♀️</div><div className="art-pearl pearl-a">✧</div><div className="art-pearl pearl-b">✦</div><div className="art-fish fish-a">🐠</div><div className="art-fish fish-b">🐟</div><div className="art-caption"><span>01 / THE CALL OF THE SEA</span><b>رحلة إلى أعماق البحار</b></div></div>
          <div className="welcome-bottom"><div className="scroll-note"><span className="scroll-line"/> YOUR JOURNEY BEGINS BELOW THE SURFACE</div><button className="primary-button" onClick={() => { playTone(progress.muted, 'click'); setScreen('create') }}>Enter the Ocean <ArrowRight size={17}/></button></div>
        </motion.section>}

        {screen === 'create' && <motion.section key="create" className="create-screen panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
          <button className="back-link" onClick={() => setScreen('welcome')}><ArrowLeft size={15}/> Back</button><span className="eyebrow"><Sparkles size={14}/> CHOOSE YOUR DESTINY</span><h2>Who will dive<br/><em>into the unknown?</em></h2><p className="muted-copy">Buat identitas penjelajahmu sebelum memasuki kerajaan Sirena.</p>
          <label className="field-label" htmlFor="player-name">YOUR NAME</label><input id="player-name" className="name-input" value={nameInput} onChange={e => setNameInput(e.target.value)} maxLength={18} placeholder="Masukkan nama petualang..." onKeyDown={e => e.key === 'Enter' && beginAdventure()}/>
          <label className="field-label">CHOOSE YOUR COMPANION</label><div className="avatar-grid">{avatars.map(item => <button key={item.id} className={`avatar-card ${avatarPick === item.id ? 'selected' : ''}`} onClick={() => setAvatarPick(item.id)}><span className="avatar-emoji">{item.emoji}</span><b>{item.name}</b><small>{item.title}</small>{avatarPick === item.id && <span className="avatar-check"><Check size={13}/></span>}</button>)}</div>
          <button className="primary-button full-button" disabled={!nameInput.trim()} onClick={beginAdventure}>Begin the adventure <ArrowRight size={17}/></button>
        </motion.section>}

        {screen === 'map' && <motion.section key="map" className="map-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="map-heading"><div><span className="eyebrow"><Compass size={14}/> WORLD MAP · OCEAN REALM</span><h2>Choose your <em>next dive.</em></h2><p className="muted-copy">Setiap wilayah menyimpan pengetahuan dan satu bagian dari cahaya kerajaan.</p></div><div className="progress-card"><div className="progress-top"><span>JOURNEY RESTORED</span><b>{overallPercent}%</b></div><div className="progress-track"><i style={{ width: `${overallPercent}%` }}/></div><small>{completedCount} of 6 realms completed</small></div></div>
          <div className="map-layout"><div className="map-visual"><div className="map-depth depth-one"/><div className="map-depth depth-two"/><svg className="route-lines" viewBox="0 0 700 590" preserveAspectRatio="none"><path d="M130 90 C260 80 245 175 355 180 S500 220 520 290 S400 365 300 380 S160 450 180 515" fill="none" stroke="rgba(139,226,220,.48)" strokeWidth="3" strokeDasharray="7 10"/></svg>
            {worlds.map((world, i) => { const done = progress.completed.includes(i); const unlocked = i <= unlockedIndex; const positions = [{ left: '15%', top: '10%' }, { left: '48%', top: '20%' }, { left: '73%', top: '39%' }, { left: '43%', top: '53%' }, { left: '17%', top: '70%' }, { left: '54%', top: '84%' }]; return <motion.button key={world.id} className={`map-node node-${world.color} ${unlocked ? 'unlocked' : 'locked'} ${done ? 'done' : ''} ${i === unlockedIndex && !done ? 'current' : ''}`} style={positions[i]} onClick={() => unlocked && !done && enterWorld(i)} whileHover={unlocked && !done ? { scale: 1.08 } : {}} whileTap={unlocked && !done ? { scale: .96 } : {}} disabled={!unlocked || done}><span className="node-icon">{done ? <Check size={22}/> : unlocked ? world.icon : <Lock size={19}/>}</span><b>{world.name}</b><small>{done ? 'CLEARED' : unlocked ? `REGION 0${i + 1}` : 'LOCKED'}</small></motion.button> })}
            <div className="map-player" style={{ left: ['15%','48%','73%','43%','17%','54%'][unlockedIndex], top: ['10%','20%','39%','53%','70%','84%'][unlockedIndex] }}><span>{avatar.emoji}</span><i/></div><div className="map-compass">N<br/><Compass size={21}/></div><div className="map-label">THE SIRENA TRENCHES <span>• 12,400 m below</span></div></div>
            <aside className="map-sidebar"><div className="guide-card"><span className="guide-avatar">🧜‍♀️</span><div><b>Princess Nerina</b><small>Ocean guide</small></div><Sparkles size={17}/><p>"Cahaya kerajaan mulai kembali! Pilih wilayah yang bercahaya dan kumpulkan mutiara pengetahuan."</p></div><div className="realm-card"><span className="eyebrow">CURRENT DESTINATION</span><div className="realm-art">{worlds[unlockedIndex].icon}</div><h3>{worlds[unlockedIndex].name}</h3><span className="arabic realm-arabic">{worlds[unlockedIndex].arabic}</span><p>{worlds[unlockedIndex].description}</p><div className="realm-meta"><span><BookOpen size={14}/> {worlds[unlockedIndex].topic}</span><span><Star size={14}/> {worlds[unlockedIndex].level}</span></div><button className="primary-button full-button" onClick={() => enterWorld(unlockedIndex)}>Dive into region <ArrowRight size={16}/></button></div><button className="text-button" onClick={() => setShowGuide(true)}><CircleHelp size={15}/> How to play</button></aside></div>
          <div className="map-legend"><span><i className="legend-dot active-dot"/> Available</span><span><i className="legend-dot done-dot"/> Restored</span><span><Lock size={12}/> Locked until previous realm is cleared</span></div>
        </motion.section>}

        {screen === 'lesson' && question && <motion.section key={`lesson-${activeWorld}-${questionIndex}`} className="lesson-screen" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}>
          <div className="lesson-top"><button className="back-link" onClick={() => setScreen('map')}><ArrowLeft size={15}/> World map</button><span className="lesson-world-label">{currentWorld.icon} {currentWorld.name}</span><span className="question-count">QUESTION {String(questionIndex + 1).padStart(2, '0')} / 05</span></div>
          <div className="lesson-progress"><div style={{ width: `${questionProgress}%` }}/></div>
          <div className="lesson-layout"><div className="lesson-aside"><div className={`lesson-emblem emblem-${currentWorld.color}`}>{currentWorld.icon}</div><span className="eyebrow">REALM {String(activeWorld + 1).padStart(2, '0')}</span><h2>{currentWorld.name}</h2><span className="arabic lesson-arabic">{currentWorld.arabic}</span><p>{currentWorld.topic}</p><div className="skill-chips"><span><BookOpen size={13}/> Learn</span><span><Sparkles size={13}/> Quest</span></div><div className="aside-tip"><Sparkles size={15}/><p>Perhatikan harakat pada setiap kata. Dengarkan pelafalan untuk membantumu memahami bunyinya.</p></div></div>
            <motion.div className={`question-card ${shake ? 'shake' : ''}`} animate={shake ? { x: [-7, 7, -5, 5, 0] } : { x: 0 }}><div className="question-meta"><span className="skill-tag">{question.skill}</span><span className="reward-tag"><Gem size={13}/> +10 pearls · +20 XP</span></div><h3>{question.prompt}</h3><div className="arabic-display"><span className="arabic">{question.arabic}</span><button className="audio-button" onClick={() => speakArabic(question.arabic)} title="Dengarkan pelafalan"><Headphones size={17}/></button></div><div className="answer-list">{question.options.map((option, index) => { const isCorrect = feedback && index === question.answer; const isWrong = feedback === 'wrong' && index === selected; return <button key={option} className={`answer-option ${isCorrect ? 'answer-correct' : ''} ${isWrong ? 'answer-wrong' : ''}`} onClick={() => chooseAnswer(index)} disabled={feedback === 'correct'}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{isCorrect && <Check size={18}/>} {isWrong && <X size={18}/>}</button> })}</div>
              <AnimatePresence>{feedback && <motion.div className={`feedback-box ${feedback}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}><div className="feedback-title">{feedback === 'correct' ? <><Check size={17}/> Excellent! Jawaban benar.</> : <><Heart size={17}/> Belum tepat. Coba sekali lagi!</>}</div><p>{feedback === 'correct' ? question.explain : 'Baca kembali pertanyaan dan perhatikan harakatnya. Kamu pasti bisa!'}</p></motion.div>}</AnimatePresence>
              <div className="question-footer"><span>{feedback === 'correct' ? 'Knowledge unlocked!' : feedback === 'wrong' ? 'Take another chance' : 'Choose the best answer'}</span>{feedback === 'correct' ? <button className="primary-button" onClick={nextQuestion}>{questionIndex === 4 ? 'Complete region' : 'Next question'} <ArrowRight size={16}/></button> : feedback === 'wrong' ? <button className="retry-button" onClick={retryQuestion}><RotateCcw size={15}/> Try again</button> : <span className="footer-hint">One answer at a time</span>}</div>
            </motion.div></div>
        </motion.section>}

        {screen === 'ending' && <motion.section key="ending" className="ending-screen panel" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}><div className="ending-crown">👑</div><span className="eyebrow"><Sparkles size={14}/> THE OCEAN REMEMBERS</span><h2>The kingdom<br/><em>is restored.</em></h2><span className="arabic ending-arabic">عَادَ النُّورُ إِلَى مَمْلَكَةِ سِيرِينَا</span><p>Selamat, {progress.player}! Kamu telah mengumpulkan kembali cahaya pengetahuan dan memulihkan Kerajaan Sirena. Petualanganmu adalah bukti bahwa belajar membuka dunia baru.</p><div className="ending-stats"><Stat icon={Gem} label="Pearls earned" value={progress.coins} tone="gold"/><Stat icon={Zap} label="Total XP" value={progress.xp} tone="violet"/><Stat icon={Award} label="Realms restored" value="6 / 6"/></div><button className="primary-button" onClick={() => setScreen('map')}>Explore the ocean again <Waves size={16}/></button></motion.section>}
      </AnimatePresence>
    </main>

    <footer className="footer"><span>© 2025 SIRENA OCEAN REALM</span><span>LEARN · EXPLORE · DISCOVER</span><span>صُنِعَ بِحُبٍّ وَمَعْرِفَةٍ</span></footer>

    <AnimatePresence>{showVictory && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="victory-modal" initial={{ opacity: 0, y: 25, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15 }}><button className="modal-close" onClick={() => setShowVictory(false)}><X size={18}/></button><div className="victory-icon">{currentWorld.icon}</div><span className="eyebrow">REALM RESTORED</span><h2>Wilayah dikuasai!</h2><span className="arabic victory-arabic">{currentWorld.arabic}</span><p>Kamu berhasil menyelesaikan seluruh tantangan di {currentWorld.name}. Satu cahaya kembali ke Kerajaan Sirena.</p><div className="reward-row"><span><Gem size={17}/> +50 Pearls</span><span><Zap size={17}/> +100 XP</span><span><Award size={17}/> Badge earned</span></div><button className="primary-button full-button" onClick={continueAfterWin}>{activeWorld === 5 ? 'See your victory' : 'Continue journey'} <ArrowRight size={16}/></button></motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{showGuide && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="guide-modal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}><button className="modal-close" onClick={() => setShowGuide(false)}><X size={18}/></button><span className="eyebrow"><Compass size={14}/> ADVENTURER'S GUIDE</span><h2>How to play</h2><div className="guide-steps"><p><b>01 · Explore</b><span>Pilih wilayah yang sudah terbuka di peta samudra.</span></p><p><b>02 · Learn</b><span>Pelajari mufradat, hiwar, qira’ah, dan kitabah melalui lima tantangan.</span></p><p><b>03 · Collect</b><span>Jawaban benar memberimu XP dan mutiara. Jawaban salah bisa dicoba lagi.</span></p><p><b>04 · Restore</b><span>Selesaikan seluruh tantangan untuk membuka wilayah berikutnya.</span></p></div><p className="guide-note">Progres disimpan otomatis di browser/perangkat ini.</p><button className="primary-button full-button" onClick={() => setShowGuide(false)}>Got it <Check size={16}/></button></motion.div></motion.div>}</AnimatePresence>
  </div>
}

export default App
