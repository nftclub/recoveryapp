/* ============================================
   RECOVERY JOURNEY APP - v2.0
   Identity-based behavioral transformation system
   ============================================ */

'use strict';

/* ============================================
   IDENTITY-BASED MESSAGE SYSTEM
   ============================================ */

const IDENTITY_CONFIG = {
    healthier: {
        subtitle: "Your body is healing, one day at a time",
        color: "#10b981",
        messages: [
            "Every clean day is your body rebuilding itself from the inside out.",
            "Your cells are celebrating your choices right now.",
            "Physical healing and mental strength are growing together in you.",
            "You are giving your body the gift it deserves: freedom.",
            "Health is not a destination — it's the path you're walking right now."
        ]
    },
    discipline: {
        subtitle: "Every choice builds the person you're becoming",
        color: "#667eea",
        messages: [
            "Discipline is choosing your future self over your present comfort.",
            "You are proving to yourself that you are in control.",
            "Each day you hold firm, the habit of strength grows stronger.",
            "Real discipline isn't about perfection — it's about returning.",
            "You are building the muscle of willpower with every decision."
        ]
    },
    freedom: {
        subtitle: "Breaking free is brave — you are brave",
        color: "#f59e0b",
        messages: [
            "Freedom is not given — it's reclaimed one day at a time.",
            "You are breaking patterns that took years to form. That's extraordinary.",
            "The chains are loosening. Keep going.",
            "Liberation lives on the other side of this urge. Push through.",
            "You chose yourself today. That is what freedom looks like."
        ]
    },
    control: {
        subtitle: "You are the author of your story",
        color: "#8b5cf6",
        messages: [
            "Control is not about being perfect — it's about coming back.",
            "Every 'no' you say to an urge is a 'yes' to your power.",
            "You are the architect of your habits. Build intentionally.",
            "Mastery starts exactly where you are: with this one choice.",
            "Your decisions today are writing the story of tomorrow."
        ]
    }
};

const WHY_CONFIG = {
    health:       { icon: "🏃", label: "Your health" },
    confidence:   { icon: "✨", label: "Your confidence" },
    relationship: { icon: "👨‍👩‍👧", label: "Your relationships" },
    money:        { icon: "💰", label: "Financial freedom" },
    discipline:   { icon: "🎯", label: "Your discipline" },
    custom:       { icon: "❤️", label: "Your personal reason" }
};

const LEVEL_CONFIG = [
    { minDay: 0,  maxDay: 3,  name: "Stabilizing",      phase: "Phase 1", icon: "🌱", barPct: 15,  color: "#10b981" },
    { minDay: 4,  maxDay: 7,  name: "Gaining Strength",  phase: "Phase 2", icon: "💪", barPct: 35,  color: "#3b82f6" },
    { minDay: 8,  maxDay: 29, name: "Rewiring",          phase: "Phase 3", icon: "⚡", barPct: 65,  color: "#8b5cf6" },
    { minDay: 30, maxDay: Infinity, name: "Identity Shift", phase: "Phase 4", icon: "🦋", barPct: 100, color: "#f59e0b" }
];

const MILESTONES = {
    3:  {
        icon: "🌱", title: "Day 3!",
        message: "You've broken through the hardest phase.",
        science: "Your dopamine system is beginning to stabilize. The cravings will become less intense from here."
    },
    7:  {
        icon: "⚡", title: "One Week!",
        message: "Your brain is rewiring.",
        science: "Neuroplasticity is at work: new neural pathways are forming, making it easier to resist urges every day."
    },
    14: {
        icon: "🧠", title: "Two Weeks!",
        message: "Your prefrontal cortex is regaining control.",
        science: "The executive control center of your brain is strengthening. Impulse control improves measurably at day 14."
    },
    30: {
        icon: "🦋", title: "30 Days!",
        message: "You've completed an identity shift.",
        science: "Research shows 30+ days of consistent behavior begins to form a new self-concept. You are becoming who you chose to be."
    }
};

const DAILY_REFLECTIONS = [
    "What small victory can you celebrate from today?",
    "What was the most challenging moment today, and how did you handle it?",
    "Who in your life would be proud of you right now?",
    "What does a better version of you look like tomorrow?",
    "What's one thing you're grateful for in your recovery journey?",
    "What triggered you today, and what helped you push through?",
    "If your future self could send you a message, what would it say?",
    "What have you learned about yourself this week?",
    "What would you tell someone just starting this journey?",
    "How are you kinder to yourself today than you were before?",
    "What strength did you discover in yourself recently?",
    "What does freedom mean to you today?",
    "How has your relationship with yourself changed on this journey?",
    "What are you looking forward to as you continue healing?"
];

const MOTIVATIONAL_MESSAGES = [
    "You are stronger than you think. Keep going!",
    "Every day is a new opportunity to grow and heal.",
    "Progress, not perfection. You're doing amazing!",
    "Your future self will thank you for not giving up today.",
    "One day at a time. You've got this!",
    "The pain you feel today will be the strength you feel tomorrow.",
    "You are capable of incredible things.",
    "Believe in yourself. Recovery is a journey worth taking.",
    "Small steps every day lead to monumental changes.",
    "You are not alone in this journey.",
    "Your courage to change is truly inspiring.",
    "Every moment is a chance to start fresh.",
    "You deserve a life of peace and happiness.",
    "You are writing a new chapter of your life story.",
    "Strength doesn't come from what you can do — it comes from overcoming what you thought you couldn't.",
    "You are braver than you believe and stronger than you seem.",
    "Fall seven times, stand up eight.",
    "Your journey is unique. Don't compare it to anyone else's.",
    "Healing is not linear, and that's perfectly okay.",
    "You are making choices today that your future self will be proud of.",
    "The comeback is always stronger than the setback.",
    "You didn't come this far to only come this far.",
    "Be patient with yourself. Real growth takes time.",
    "Your story isn't over yet. Keep writing it.",
    "Tough times don't last, but tough people do.",
    "You are enough, exactly as you are.",
    "Every sunrise brings a new beginning.",
    "You have survived 100% of your worst days. That's a perfect record.",
    "Change is hard at first, messy in the middle, and gorgeous at the end.",
    "The only way out is through. Keep moving forward.",
    "Your resilience is your greatest superpower.",
    "Today's struggles are building tomorrow's strengths.",
    "You are not your past. You are your unlimited potential.",
    "Small progress is still progress. Celebrate it.",
    "You are worthy of love, peace, and lasting recovery.",
    "Trust the process. Trust yourself.",
    "Your journey matters. You matter.",
    "Every choice to move forward is a victory to celebrate.",
    "You are discovering your true inner strength.",
    "Every breath is a new chance to choose healing."
];

/* ============================================
   APPLICATION STATE
   ============================================ */

let appState = {
    // Onboarding
    onboardingComplete: false,
    identity: null,        // healthier | discipline | freedom | control
    why: null,             // health | confidence | relationship | money | discipline | custom
    whyCustomText: '',

    // Progress
    currentStreak: 0,
    growthScore: 0,
    startDate: null,
    lastCheckDate: null,
    totalResets: 0,
    bestStreak: 0,
    totalDays: 0,
    resetHistory: [],

    // Messages
    lastMessageIndex: -1,

    // Urge Log
    urgeLogs: [],          // [{date, intensity, trigger}]
    todayUrgeLogged: false,
    todayUrgeDate: null,

    // Reflections
    reflections: [],       // [{date, question, answer}]
    todayReflectionDate: null,
    todayReflectionDone: false,

    // Milestones seen
    milestonesSeen: [],

    // Notifications
    urgeTypeTimes: {}      // trigger -> count
};

/* ============================================
   DOM CACHE
   ============================================ */

const DOM = {};

function cacheDOM() {
    const ids = [
        'onboardingOverlay','step1','step2','step3','mainApp',
        'step2Next','startJourneyBtn','readySummary','customWhyContainer','customWhyInput',
        'identitySubtitle','whyBanner','whyBannerIcon','whyBannerReason',
        'levelBadge','levelIcon','levelName','levelBar','levelPhase',
        'streakDisplay','growthDisplay','startDate','lastCheck',
        'crisisBtn','crisisModal','closeCrisisBtn',
        'crisisPhase1','crisisPhase2','crisisPhase3',
        'breathingCircle','breathingText','breathingInstruction','crisisTimerDisplay',
        'skipBreathingBtn','delayTimerDisplay','delayTimerProgress','skipDelayBtn',
        'crisisReflectionInput','saveCrisisReflectionBtn',
        'reflectionQuestion','reflectionInput','charCount','saveReflectionBtn',
        'urgeYesBtn','urgeNoBtn','urgeDetails','weeklyInsight','insightStats','logUrgeBtn',
        'messageDisplay','newMessageBtn',
        'totalResets','bestStreak','totalDays',
        'exportBtn','resetBtn',
        'resetModal','cancelBtn','confirmResetBtn',
        'milestoneModal','milestoneIcon','milestoneTitle','milestoneMessage',
        'milestoneScience','milestoneConfetti','closeMilestoneBtn',
        'successToast','toastMessage','premiumBtn'
    ];
    ids.forEach(id => { DOM[id] = document.getElementById(id); });
}

/* ============================================
   INIT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    cacheDOM();
    loadState();

    if (appState.onboardingComplete) {
        showMainApp();
    } else {
        showOnboarding();
    }

    attachAllListeners();
});

/* ============================================
   ONBOARDING
   ============================================ */

function showOnboarding() {
    DOM.onboardingOverlay.style.display = 'flex';
    DOM.mainApp.style.display = 'none';
    initOnboardingListeners();
}

function initOnboardingListeners() {
    // Step 1: Identity selection
    document.querySelectorAll('.identity-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.identity-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            appState.identity = card.dataset.identity;
            // Auto-advance after short delay
            setTimeout(() => goToStep(2), 400);
        });
    });

    // Step 2: WHY selection
    document.querySelectorAll('.why-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.why-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            appState.why = card.dataset.why;

            if (appState.why === 'custom') {
                DOM.customWhyContainer.style.display = 'block';
                DOM.customWhyInput.focus();
                DOM.step2Next.disabled = false;
            } else {
                DOM.customWhyContainer.style.display = 'none';
                DOM.step2Next.disabled = false;
            }
        });
    });

    DOM.step2Next.addEventListener('click', () => {
        if (appState.why === 'custom') {
            appState.whyCustomText = DOM.customWhyInput.value.trim() || 'My personal reason';
        }
        buildReadyStep();
        goToStep(3);
    });

    DOM.startJourneyBtn.addEventListener('click', () => {
        appState.onboardingComplete = true;
        appState.startDate = new Date().toISOString();
        appState.lastCheckDate = new Date().toISOString();
        saveState();
        DOM.onboardingOverlay.style.display = 'none';
        showMainApp();
    });
}

function goToStep(num) {
    document.querySelectorAll('.onboarding-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step${num}`).classList.add('active');
}

function buildReadyStep() {
    const identityLabels = {
        healthier: 'Becoming Healthier',
        discipline: 'Rebuilding Discipline',
        freedom: 'Breaking Free',
        control: 'Reclaiming Control'
    };
    const whyLabel = appState.why === 'custom'
        ? appState.whyCustomText
        : (WHY_CONFIG[appState.why]?.label || 'your reason');

    DOM.readySummary.textContent = `You're ${identityLabels[appState.identity] || 'on a journey'} — for ${whyLabel}.`;
}

/* ============================================
   MAIN APP
   ============================================ */

function showMainApp() {
    DOM.mainApp.style.display = 'block';
    DOM.onboardingOverlay.style.display = 'none';

    // Show fixed crisis button
    if (DOM.crisisBtn) DOM.crisisBtn.style.display = 'flex';

    updateStreakCounter();
    updateAllDisplays();
    displayRandomMessage();
    loadTodayReflection();
    loadTodayUrgeState();
    loadWeeklyInsight();
    checkMilestones();

    // Request notification permission after a short delay (less jarring)
    setTimeout(async () => {
        const granted = await requestNotificationPermission();
        if (granted) setupSmartNotifications();
    }, 3000);
}

/* ============================================
   STATE PERSISTENCE
   ============================================ */

function saveState() {
    try {
        localStorage.setItem('recoveryAppState_v2', JSON.stringify(appState));
    } catch(e) { console.error('Save error:', e); }
}

function loadState() {
    try {
        const saved = localStorage.getItem('recoveryAppState_v2');
        if (saved) {
            const parsed = JSON.parse(saved);
            appState = { ...appState, ...parsed };
            // Ensure arrays exist
            if (!Array.isArray(appState.urgeLogs)) appState.urgeLogs = [];
            if (!Array.isArray(appState.reflections)) appState.reflections = [];
            if (!Array.isArray(appState.resetHistory)) appState.resetHistory = [];
            if (!Array.isArray(appState.milestonesSeen)) appState.milestonesSeen = [];
        }
    } catch(e) { console.error('Load error:', e); }
}

/* ============================================
   STREAK LOGIC
   ============================================ */

function getTodayMidnight() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}

function updateStreakCounter() {
    if (!appState.lastCheckDate) return;
    const today = getTodayMidnight();
    const last = new Date(appState.lastCheckDate);
    last.setHours(0, 0, 0, 0);
    const diff = Math.floor((today - last) / 86400000);

    if (diff > 0) {
        appState.currentStreak += diff;
        appState.totalDays += diff;
        appState.growthScore += diff * 10; // 10 pts per day
        appState.lastCheckDate = new Date().toISOString();
        if (appState.currentStreak > appState.bestStreak) {
            appState.bestStreak = appState.currentStreak;
        }
        saveState();
    }
}

function resetProgress() {
    appState.resetHistory.push({
        date: new Date().toISOString(),
        streakEnded: appState.currentStreak,
        totalDaysAtReset: appState.totalDays
    });
    appState.totalResets++;
    appState.currentStreak = 0;
    appState.startDate = new Date().toISOString();
    appState.lastCheckDate = new Date().toISOString();
    appState.milestonesSeen = []; // reset milestone triggers
    saveState();
    updateAllDisplays();
    closeModal('resetModal');
    displayRandomMessage();
    showToast('Fresh start recorded. You\'re taking positive action! 💪');
}

/* ============================================
   UI UPDATES
   ============================================ */

function updateAllDisplays() {
    updateStreakDisplay();
    updateGrowthDisplay();
    updateStatsDisplay();
    updateDateDisplays();
    updateIdentityUI();
    updateWhyBanner();
    updateLevelBadge();
}

function updateStreakDisplay() {
    animateNumber(DOM.streakDisplay, parseInt(DOM.streakDisplay.textContent) || 0, appState.currentStreak, 800);
}

function updateGrowthDisplay() {
    animateNumber(DOM.growthDisplay, parseInt(DOM.growthDisplay.textContent) || 0, appState.growthScore, 1000);
}

function updateStatsDisplay() {
    DOM.totalResets.textContent = appState.totalResets;
    DOM.bestStreak.textContent = appState.bestStreak;
    DOM.totalDays.textContent = appState.totalDays;
}

function updateDateDisplays() {
    DOM.startDate.textContent = formatRelativeDate(new Date(appState.startDate || Date.now()));
    DOM.lastCheck.textContent = formatRelativeDate(new Date(appState.lastCheckDate || Date.now()));
}

function updateIdentityUI() {
    const id = appState.identity;
    if (!id || !IDENTITY_CONFIG[id]) return;
    DOM.identitySubtitle.textContent = IDENTITY_CONFIG[id].subtitle;
}

function updateWhyBanner() {
    if (!appState.why) return;
    const cfg = WHY_CONFIG[appState.why];
    if (!cfg) return;
    DOM.whyBannerIcon.textContent = cfg.icon;
    DOM.whyBannerReason.textContent = appState.why === 'custom'
        ? (appState.whyCustomText || 'Your personal reason')
        : cfg.label;
}

function updateLevelBadge() {
    const streak = appState.currentStreak;
    const lvl = LEVEL_CONFIG.find(l => streak >= l.minDay && streak <= l.maxDay) || LEVEL_CONFIG[0];
    DOM.levelIcon.textContent = lvl.icon;
    DOM.levelName.textContent = lvl.name;
    DOM.levelPhase.textContent = lvl.phase;
    DOM.levelBar.style.width = lvl.barPct + '%';
    DOM.levelBar.style.background = `linear-gradient(90deg, ${lvl.color}, ${lvl.color}cc)`;
}

function animateNumber(el, start, end, duration) {
    if (!el) return;
    const startTime = performance.now();
    function update(now) {
        const p = Math.min((now - startTime) / duration, 1);
        const ease = p * (2 - p);
        el.textContent = Math.floor(start + (end - start) * ease);
        if (p < 1) requestAnimationFrame(update);
        else el.textContent = end;
    }
    requestAnimationFrame(update);
}

function formatRelativeDate(date) {
    const today = getTodayMidnight();
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const diff = Math.floor((today - d) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff} days ago`;
    if (diff < 30) return `${Math.floor(diff/7)} week${Math.floor(diff/7)>1?'s':''} ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ============================================
   MOTIVATIONAL MESSAGES
   ============================================ */

function displayRandomMessage() {
    const pool = [
        ...MOTIVATIONAL_MESSAGES,
        ...(appState.identity && IDENTITY_CONFIG[appState.identity]
            ? IDENTITY_CONFIG[appState.identity].messages
            : [])
    ];
    let idx;
    do { idx = Math.floor(Math.random() * pool.length); }
    while (idx === appState.lastMessageIndex && pool.length > 1);
    appState.lastMessageIndex = idx;
    animateMessageChange(pool[idx]);
    saveState();
}

function animateMessageChange(msg) {
    if (!DOM.messageDisplay) return;
    DOM.messageDisplay.style.opacity = '0';
    DOM.messageDisplay.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        DOM.messageDisplay.textContent = msg;
        DOM.messageDisplay.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        DOM.messageDisplay.style.opacity = '1';
        DOM.messageDisplay.style.transform = 'translateY(0)';
    }, 300);
}

/* ============================================
   DAILY REFLECTION
   ============================================ */

function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function loadTodayReflection() {
    const todayKey = getTodayKey();
    const todayRef = appState.reflections.find(r => r.dateKey === todayKey);

    // Pick question based on day index
    const qIdx = appState.totalDays % DAILY_REFLECTIONS.length;
    DOM.reflectionQuestion.textContent = DAILY_REFLECTIONS[qIdx];

    if (todayRef) {
        DOM.reflectionInput.value = todayRef.answer;
        DOM.reflectionInput.disabled = true;
        DOM.saveReflectionBtn.textContent = '✓ Saved Today';
        DOM.saveReflectionBtn.disabled = true;
    }

    // Character counter
    DOM.reflectionInput.addEventListener('input', () => {
        DOM.charCount.textContent = `${DOM.reflectionInput.value.length}/300`;
    });
}

function saveReflection() {
    const answer = DOM.reflectionInput.value.trim();
    if (!answer) { showToast('Write something first!', 2000); return; }

    const todayKey = getTodayKey();
    const qIdx = appState.totalDays % DAILY_REFLECTIONS.length;

    appState.reflections.push({
        dateKey: todayKey,
        date: new Date().toISOString(),
        question: DAILY_REFLECTIONS[qIdx],
        answer
    });
    appState.growthScore += 5; // bonus pts

    saveState();
    DOM.reflectionInput.disabled = true;
    DOM.saveReflectionBtn.textContent = '✓ Saved Today';
    DOM.saveReflectionBtn.disabled = true;
    showToast('Reflection saved! +5 Growth Score 🌟', 3000);
    updateGrowthDisplay();
}

/* ============================================
   URGE LOG SYSTEM
   ============================================ */

function loadTodayUrgeState() {
    const todayKey = getTodayKey();
    const todayLog = appState.urgeLogs.find(u => u.dateKey === todayKey);
    if (todayLog) {
        DOM.urgeYesBtn.disabled = true;
        DOM.urgeNoBtn.disabled = true;
        DOM.urgeYesBtn.style.opacity = '0.5';
        DOM.urgeNoBtn.style.opacity = '0.5';
        if (todayLog.hadUrge) {
            DOM.urgeDetails.style.display = 'block';
        }
    }
}

function logUrge(hadUrge, intensity, trigger) {
    const todayKey = getTodayKey();
    appState.urgeLogs.push({
        dateKey: todayKey,
        date: new Date().toISOString(),
        hadUrge,
        intensity: intensity || null,
        trigger: trigger || null
    });
    if (trigger) {
        appState.urgeTypeTimes[trigger] = (appState.urgeTypeTimes[trigger] || 0) + 1;
    }
    appState.growthScore += 3; // logging = engagement pts
    saveState();
    updateGrowthDisplay();
}

function loadWeeklyInsight() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weekLogs = appState.urgeLogs.filter(u => new Date(u.date) >= sevenDaysAgo && u.hadUrge);

    if (weekLogs.length < 2) return;

    DOM.weeklyInsight.style.display = 'block';

    // Find strongest urge day
    const strongest = weekLogs.reduce((a, b) => (a.intensity || 0) > (b.intensity || 0) ? a : b);
    const strongestDay = new Date(strongest.date).toLocaleDateString('en-US', { weekday: 'long' });

    // Most common trigger
    const triggerCounts = {};
    weekLogs.forEach(u => {
        if (u.trigger) triggerCounts[u.trigger] = (triggerCounts[u.trigger] || 0) + 1;
    });
    const topTrigger = Object.entries(triggerCounts).sort((a,b) => b[1]-a[1])[0];

    // Trend: compare first half vs second half of week
    const half = Math.floor(weekLogs.length / 2);
    const firstAvg = weekLogs.slice(0, half).reduce((s, u) => s + (u.intensity||0), 0) / half;
    const secondAvg = weekLogs.slice(half).reduce((s, u) => s + (u.intensity||0), 0) / (weekLogs.length - half);
    const trendPct = firstAvg > 0 ? Math.round(((secondAvg - firstAvg) / firstAvg) * 100) : 0;
    const trendText = trendPct < 0 ? `${Math.abs(trendPct)}% less intense 📉` : `${trendPct}% more intense 📈`;

    DOM.insightStats.innerHTML = `
        <div class="insight-item">
            <span class="insight-label">Strongest urge day</span>
            <span class="insight-value">${strongestDay}</span>
        </div>
        ${topTrigger ? `<div class="insight-item">
            <span class="insight-label">Most vulnerable trigger</span>
            <span class="insight-value">${topTrigger[0]}</span>
        </div>` : ''}
        <div class="insight-item">
            <span class="insight-label">Urge trend this week</span>
            <span class="insight-value">${trendText}</span>
        </div>
    `;
}

/* ============================================
   CRISIS MODE
   Background-safe timer using timestamps
   ============================================ */

let breathingTimer = null;
let delayTimer = null;

function openCrisisMode() {
    openModal('crisisModal');
    // Reset to phase 1, show grounding question first
    document.querySelectorAll('.crisis-phase').forEach(p => p.classList.remove('active'));
    DOM.crisisPhase1.classList.add('active');
    // Small delay before auto-starting breathing so user sees the message
    setTimeout(() => startBreathingGuide(), 1200);
}

function startBreathingGuide() {
    // Save start timestamp to localStorage — survives background
    const startTime = Date.now();
    const totalDuration = 60000; // 60 seconds
    localStorage.setItem('crisis_breathing_start', startTime);

    const cycle = ['Breathe In', 'Hold', 'Breathe Out', 'Rest'];
    const cycleInstructions = ['Inhale slowly... 4 seconds', 'Hold gently...', 'Exhale fully... 4 seconds', 'Rest...'];
    let lastCycleIdx = -1;

    DOM.breathingCircle.classList.add('breathing-in');

    breathingTimer = setInterval(() => {
        // Calculate remaining time from timestamp (background-safe)
        const elapsed = Date.now() - startTime;
        const timeLeft = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));

        DOM.crisisTimerDisplay.textContent = timeLeft;

        // Breathing cycle based on elapsed time
        const cycleStep = Math.floor(elapsed / 4000) % cycle.length;
        if (cycleStep !== lastCycleIdx) {
            lastCycleIdx = cycleStep;
            DOM.breathingText.textContent = cycle[cycleStep];
            DOM.breathingInstruction.textContent = cycleInstructions[cycleStep];
            DOM.breathingCircle.classList.remove('breathing-in','breathing-hold','breathing-out','breathing-rest');
            DOM.breathingCircle.classList.add(['breathing-in','breathing-hold','breathing-out','breathing-rest'][cycleStep]);
        }

        if (elapsed >= totalDuration) {
            clearInterval(breathingTimer);
            localStorage.removeItem('crisis_breathing_start');
            goToCrisisPhase(2);
        }
    }, 500); // poll every 500ms for accuracy
}

function goToCrisisPhase(phase) {
    document.querySelectorAll('.crisis-phase').forEach(p => p.classList.remove('active'));
    document.getElementById(`crisisPhase${phase}`).classList.add('active');
    if (phase === 2) startDelayTimer();
}

function startDelayTimer() {
    const totalDuration = 600000; // 10 minutes ms
    const circumference = 326.7;

    // Save timestamp — if app goes background, we recover on return
    const startTime = Date.now();
    localStorage.setItem('crisis_delay_start', startTime);

    function tick() {
        const elapsed = Date.now() - startTime;
        const timeLeft = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));

        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        DOM.delayTimerDisplay.textContent = `${mins}:${secs.toString().padStart(2,'0')}`;
        const progress = elapsed / totalDuration;
        DOM.delayTimerProgress.style.strokeDashoffset = circumference * (1 - Math.min(progress, 1));

        if (elapsed >= totalDuration) {
            clearInterval(delayTimer);
            localStorage.removeItem('crisis_delay_start');
            goToCrisisPhase(3);
        }
    }

    tick(); // immediate first render
    delayTimer = setInterval(tick, 500);
}

// Called on visibilitychange — recover timer state if app came back from background
function recoverCrisisTimers() {
    const breathingStart = localStorage.getItem('crisis_breathing_start');
    const delayStart = localStorage.getItem('crisis_delay_start');

    if (breathingStart) {
        const elapsed = Date.now() - parseInt(breathingStart);
        if (elapsed < 60000) {
            // Still in breathing phase, re-open modal and resume
            openModal('crisisModal');
            document.querySelectorAll('.crisis-phase').forEach(p => p.classList.remove('active'));
            DOM.crisisPhase1.classList.add('active');
            startBreathingGuide(); // will use saved timestamp
        } else {
            localStorage.removeItem('crisis_breathing_start');
        }
    }

    if (delayStart) {
        const elapsed = Date.now() - parseInt(delayStart);
        if (elapsed < 600000) {
            openModal('crisisModal');
            document.querySelectorAll('.crisis-phase').forEach(p => p.classList.remove('active'));
            DOM.crisisPhase2.classList.add('active');
            startDelayTimer(); // will use saved timestamp
        } else {
            localStorage.removeItem('crisis_delay_start');
            // Timer already expired while in background → go to reflection
            openModal('crisisModal');
            goToCrisisPhase(3);
        }
    }
}

function closeCrisisMode() {
    clearInterval(breathingTimer);
    clearInterval(delayTimer);
    localStorage.removeItem('crisis_breathing_start');
    localStorage.removeItem('crisis_delay_start');
    closeModal('crisisModal');
    appState.growthScore += 15;
    saveState();
    updateGrowthDisplay();
}

function saveCrisisReflection() {
    const text = DOM.crisisReflectionInput.value.trim();
    if (text) {
        appState.reflections.push({
            dateKey: getTodayKey() + '_crisis',
            date: new Date().toISOString(),
            question: 'Crisis moment reflection',
            answer: text,
            type: 'crisis'
        });
        appState.growthScore += 10;
        saveState();
    }
    closeCrisisMode();
    showToast('You did it. That took real strength. 💪', 4000);
}

/* ============================================
   MILESTONE SYSTEM
   ============================================ */

function checkMilestones() {
    const streak = appState.currentStreak;
    const milestoneDay = [3, 7, 14, 30].find(d => streak >= d && !appState.milestonesSeen.includes(d));
    if (milestoneDay) {
        appState.milestonesSeen.push(milestoneDay);
        saveState();
        setTimeout(() => showMilestone(milestoneDay), 1500);
    }
}

function showMilestone(day) {
    const m = MILESTONES[day];
    if (!m) return;

    DOM.milestoneIcon.textContent = m.icon;
    DOM.milestoneTitle.textContent = m.title;
    DOM.milestoneMessage.textContent = m.message;
    DOM.milestoneScience.textContent = m.science;

    // Confetti
    DOM.milestoneConfetti.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'confetti-dot';
        dot.style.cssText = `
            left: ${Math.random()*100}%;
            animation-delay: ${Math.random()*1}s;
            background: ${['#667eea','#764ba2','#f093fb','#10b981','#f59e0b'][Math.floor(Math.random()*5)]};
        `;
        DOM.milestoneConfetti.appendChild(dot);
    }

    openModal('milestoneModal');
}

/* ============================================
   EXPORT
   ============================================ */

function exportData() {
    const data = {
        exportDate: new Date().toISOString(),
        state: appState,
        summary: {
            currentStreak: appState.currentStreak,
            growthScore: appState.growthScore,
            bestStreak: appState.bestStreak,
            totalDays: appState.totalDays,
            totalResets: appState.totalResets,
            identity: appState.identity,
            why: appState.why,
            totalReflections: appState.reflections.length,
            totalUrgeLogs: appState.urgeLogs.length
        }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recovery-journey-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Data exported! 📤', 3000);
}

/* ============================================
   MODAL HELPERS
   ============================================ */

function openModal(id) {
    const m = document.getElementById(id);
    if (m) { m.classList.add('active'); m.setAttribute('aria-hidden', 'false'); }
}
function closeModal(id) {
    const m = document.getElementById(id);
    if (m) { m.classList.remove('active'); m.setAttribute('aria-hidden', 'true'); }
}

/* ============================================
   TOAST
   ============================================ */

function showToast(msg, duration = 3000) {
    DOM.toastMessage.textContent = msg;
    DOM.successToast.classList.add('show');
    setTimeout(() => DOM.successToast.classList.remove('show'), duration);
}

/* ============================================
   ALL EVENT LISTENERS
   ============================================ */

function attachAllListeners() {
    // Message
    DOM.newMessageBtn?.addEventListener('click', () => {
        displayRandomMessage();
        showToast('New message! ✨', 2000);
    });

    // Reset flow
    DOM.resetBtn?.addEventListener('click', () => openModal('resetModal'));
    DOM.cancelBtn?.addEventListener('click', () => closeModal('resetModal'));
    DOM.confirmResetBtn?.addEventListener('click', resetProgress);
    DOM.resetModal?.addEventListener('click', e => { if (e.target === DOM.resetModal) closeModal('resetModal'); });

    // Export
    DOM.exportBtn?.addEventListener('click', exportData);

    // Crisis
    DOM.crisisBtn?.addEventListener('click', openCrisisMode);
    DOM.closeCrisisBtn?.addEventListener('click', closeCrisisMode);
    DOM.skipBreathingBtn?.addEventListener('click', () => {
        clearInterval(breathingTimer);
        goToCrisisPhase(2);
    });
    DOM.skipDelayBtn?.addEventListener('click', () => {
        clearInterval(delayTimer);
        goToCrisisPhase(3);
    });
    DOM.saveCrisisReflectionBtn?.addEventListener('click', saveCrisisReflection);
    DOM.crisisModal?.addEventListener('click', e => { if (e.target === DOM.crisisModal) closeCrisisMode(); });

    // Reflection
    DOM.saveReflectionBtn?.addEventListener('click', saveReflection);

    // Urge log
    DOM.urgeNoBtn?.addEventListener('click', () => {
        logUrge(false);
        DOM.urgeYesBtn.disabled = true;
        DOM.urgeNoBtn.disabled = true;
        DOM.urgeNoBtn.style.opacity = '0.6';
        DOM.urgeYesBtn.style.opacity = '0.6';
        showToast('Great job! No urges today. 🌟', 3000);
    });

    DOM.urgeYesBtn?.addEventListener('click', () => {
        DOM.urgeDetails.style.display = 'block';
        DOM.urgeYesBtn.classList.add('selected');
    });

    // Intensity buttons
    document.querySelectorAll('.intensity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.intensity-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    // Trigger buttons
    document.querySelectorAll('.trigger-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.trigger-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    DOM.logUrgeBtn?.addEventListener('click', () => {
        const intensityBtn = document.querySelector('.intensity-btn.selected');
        const triggerBtn = document.querySelector('.trigger-btn.selected');
        if (!intensityBtn || !triggerBtn) {
            showToast('Please select intensity and trigger.', 2500);
            return;
        }
        logUrge(true, parseInt(intensityBtn.dataset.intensity), triggerBtn.dataset.trigger);
        DOM.urgeYesBtn.disabled = true;
        DOM.urgeNoBtn.disabled = true;
        DOM.urgeDetails.innerHTML = '<p style="text-align:center;color:var(--success-color);font-weight:600;">✓ Urge logged. You showed up for yourself.</p>';
        loadWeeklyInsight();
        showToast('Urge logged. Self-awareness is strength. 💪', 3000);
    });

    // Milestone close
    DOM.closeMilestoneBtn?.addEventListener('click', () => closeModal('milestoneModal'));

    // Premium (placeholder)
    DOM.premiumBtn?.addEventListener('click', () => showToast('Premium coming soon! 🚀', 3000));

    // Keyboard
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModal('resetModal');
            closeModal('milestoneModal');
            closeCrisisMode();
        }
    });

    // Auto-update every minute
    setInterval(() => {
        updateStreakCounter();
        updateAllDisplays();
        checkMilestones();
    }, 60000);

    // Visibility change — recover timers + update streak
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateStreakCounter();
            updateAllDisplays();
            checkMilestones();
            recoverCrisisTimers();
        }
    });
}

/* ============================================
   PUSH NOTIFICATIONS
   Web Push API — no Firebase, no backend needed
   Works via Service Worker on Android TWA
   ============================================ */

async function requestNotificationPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    const permission = await Notification.requestPermission();
    return permission === 'granted';
}

function scheduleLocalNotification(title, body, delayMs) {
    if (!('serviceWorker' in navigator) || Notification.permission !== 'granted') return;
    const scheduled = JSON.parse(localStorage.getItem('scheduledNotifs') || '[]');
    scheduled.push({
        title, body,
        fireAt: Date.now() + delayMs,
        id: Math.random().toString(36).slice(2)
    });
    const future = scheduled.filter(n => n.fireAt > Date.now());
    localStorage.setItem('scheduledNotifs', JSON.stringify(future));
    navigator.serviceWorker.ready.then(reg => {
        reg.active?.postMessage({ type: 'SCHEDULE_NOTIF', scheduled: future });
    });
}

function setupSmartNotifications() {
    if (Notification.permission !== 'granted') return;
    const hour = new Date().getHours();
    const recentLogs = appState.urgeLogs.slice(-14);
    const nightLogs = recentLogs.filter(u => u.trigger === 'night').length;

    // Evening check-in if user is night-vulnerable
    if (nightLogs > 2 && hour < 20) {
        const whyLabel = appState.why ? (WHY_CONFIG[appState.why]?.label || 'your strength') : 'your strength';
        scheduleLocalNotification(
            'Recovery Journey 🌙',
            `Evening is coming. Remember: you're doing this for ${whyLabel}.`,
            (20 - hour) * 3600000
        );
    }

    // Morning encouragement
    if (hour < 9) {
        scheduleLocalNotification(
            'Good morning 🌱',
            `Day ${appState.currentStreak + 1} starts now. You've got this.`,
            (9 - hour) * 3600000
        );
    }

    // Milestone approaching
    const nextMilestone = [3,7,14,30].find(d => d > appState.currentStreak);
    if (nextMilestone && (nextMilestone - appState.currentStreak) === 1) {
        scheduleLocalNotification(
            `🏆 Tomorrow is Day ${nextMilestone}!`,
            'One more day and you unlock a major milestone. Stay strong tonight.',
            3600000
        );
    }
}

// Dev tools
window.recoveryApp = {
    state: () => appState,
    reset: () => { localStorage.removeItem('recoveryAppState_v2'); location.reload(); },
    version: '2.0.0'
};
