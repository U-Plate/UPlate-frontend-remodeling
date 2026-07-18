import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'

const content = document.getElementById('onboarding-content')
const progressFill = document.getElementById('progress-fill')
const progressLabel = document.getElementById('progress-label')

const APP_STORE_URL = 'https://apps.apple.com/us/app/uplate/id6752828206'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.njr.boilerFuel'
const firebaseApp = initializeApp({
    apiKey: 'AIzaSyA5b8ckmysRAMlDEkOJnZDhdN_eyO-Nqb0',
    authDomain: 'boilerfuel-hello-world.firebaseapp.com',
    projectId: 'boilerfuel-hello-world',
    appId: '1:29513962283:android:dfa212019d615349ea2b6e',
})
const auth = getAuth(firebaseApp)

const goals = {
    lose: { label: 'Lose weight', icon: 'bi-arrow-down-right-circle', benefitTitle: "Here's how UPlate helps you cut.", benefit: 'Daily calorie and macro goals tuned to a safe, steady deficit.' },
    gain: { label: 'Gain muscle', icon: 'bi-lightning-charge', benefitTitle: "Here's how UPlate helps you bulk.", benefit: 'Daily calorie and macro goals tuned to a steady, lean surplus.' },
    healthy: { label: 'Eat healthier', icon: 'bi-heart-pulse', benefitTitle: "Here's how UPlate helps you eat healthier.", benefit: 'Daily calorie and macro goals tuned to balanced, wholesome eating.' },
    dining: { label: 'Better dining', icon: 'bi-stars', benefitTitle: "Here's how UPlate improves your dining.", benefit: 'Find the meals worth getting before you walk into the dining hall.' },
}

const state = {
    school: new URLSearchParams(window.location.search).get('school') || localStorage.getItem('uplate_university') || 'Purdue University',
    goal: null,
    trackMacros: true,
    name: '',
    email: '',
    age: '',
    sex: 'Female',
    weight: '',
    feet: '',
    inches: '',
    meals: 3,
    highProtein: false,
    pace: .5,
    activity: 'Moderately active',
    allergies: [],
    diet: [],
    avoids: [],
}

const flow = [
    'welcome', 'goal', 'helps', 'macroChoice', 'basics', 'measurements', 'rhythm', 'pace', 'activity', 'targets', 'allergies', 'avoid', 'account', 'success'
]
let stepIndex = 0

function activeFlow() {
    return flow.filter((step) => {
        if (['measurements', 'rhythm', 'pace', 'activity', 'targets'].includes(step) && !state.trackMacros) return false
        if (step === 'pace' && !['lose', 'gain'].includes(state.goal)) return false
        return true
    })
}

function currentStep() { return activeFlow()[stepIndex] }

function navigate(direction) {
    const steps = activeFlow()
    stepIndex = Math.max(0, Math.min(steps.length - 1, stepIndex + direction))
    render()
}

function escape(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]))
}

function stage(inner, centered = false) {
    return `<div class="onboarding-stage${centered ? ' onboarding-stage--center' : ''}">${inner}</div>`
}

function backButton() {
    return stepIndex > 0 ? '<button class="onboarding-back" type="button" data-action="back" aria-label="Go back"><i class="bi bi-arrow-left"></i></button>' : ''
}

function actions(label, options = {}) {
    return `<div class="onboarding-actions"><button class="onboarding-next" type="button" data-action="next" ${options.disabled ? 'disabled' : ''}>${label}${options.icon ? ` <i class="bi ${options.icon}"></i>` : ''}</button>${options.note ? `<p class="onboarding-note">${options.note}</p>` : ''}</div>`
}

function renderWelcome() {
    return stage(`
        <div class="onboarding-app-mark"><img src="./assets/logo/logo.png" alt="" /></div>
        <p class="onboarding-kicker">${escape(state.school)}</p>
        <h1 class="onboarding-title">Eat better, every day.</h1>
        <p class="onboarding-copy">Your campus dining, made personal, with menus, macros, and meals that fit you.</p>
        ${actions("Let's go", { note: 'Already have an account? Download UPlate and log in.' })}
    `, true)
}

function renderGoal() {
    return stage(`${backButton()}<h1 class="onboarding-title">What's your goal?</h1><p class="onboarding-copy">Pick one, we’ll build around it.</p>
        <div class="goal-grid">${Object.entries(goals).map(([key, goal]) => `<button type="button" class="onboarding-choice ${state.goal === key ? 'is-selected' : ''}" data-goal="${key}"><span class="goal-icon"><i class="bi ${goal.icon}"></i></span><span class="goal-label">${goal.label}</span></button>`).join('')}</div>
        ${actions('Continue', { disabled: !state.goal })}`)
}

function renderHelps() {
    const goal = goals[state.goal]
    const isDining = state.goal === 'dining'
    const benefits = isDining
        ? [['bi-funnel', 'Filter by dietary preferences', 'Instantly find meals that match your needs.'], ['bi-star', 'Find community favorites', 'Discover the most-liked dishes before you go.'], ['bi-camera', 'See real food photos', 'Know what’s worth getting at each hall.']]
        : [['bi-bullseye', 'Menu-aware targets', goal.benefit], ['bi-journal-text', 'Plan from today’s menu', 'Build a plate that fits from what each hall is serving.'], ['bi-check2', 'Stay on track effortlessly', 'Log a meal in a tap, with no guessing.']]
    return stage(`${backButton()}<p class="onboarding-kicker">Your goal: ${goal.label}</p><h1 class="onboarding-title">${goal.benefitTitle}</h1><div class="benefit-list">${benefits.map(([icon, title, copy]) => `<div class="benefit"><span class="benefit-icon"><i class="bi ${icon}"></i></span><div><h2>${title}</h2><p>${copy}</p></div></div>`).join('')}</div>${actions('Makes sense')}`)
}

function renderMacroChoice() {
    const goal = goals[state.goal]
    return stage(`${backButton()}<h1 class="onboarding-title">Want UPlate to track your macros?</h1><p class="onboarding-copy">To reach your ${goal.label.toLowerCase()} goal, tracking helps, but it’s your call.</p><div class="option-stack">
        <button type="button" class="onboarding-choice option-card ${state.trackMacros ? 'is-selected' : ''}" data-macro-choice="yes"><span class="recommendation">RECOMMENDED</span><span class="choice-icon"><i class="bi bi-bullseye"></i></span><span class="choice-title">Yes, track my macros</span><span class="choice-description">Personalized targets, one-tap logging, and progress toward your goal.</span></button>
        <button type="button" class="onboarding-choice option-card ${!state.trackMacros ? 'is-selected' : ''}" data-macro-choice="no"><span class="choice-icon"><i class="bi bi-journal-text"></i></span><span class="choice-title">Just show me good meals</span><span class="choice-description">Find dining hall meals filtered by what works for you.</span></button>
    </div><div class="onboarding-actions"><p class="onboarding-note">You can change this anytime in Settings.</p></div>`)
}

function renderBasics() {
    return stage(`${backButton()}<h1 class="onboarding-title">Let’s get the basics.</h1><p class="onboarding-copy">A few details now make your plan feel more like yours.</p><div class="onboarding-form"><label class="field-label">Name<input class="field-input" id="name" type="text" autocomplete="name" placeholder="What should we call you?" value="${escape(state.name)}"></label><label class="field-label">Email<input class="field-input" id="email" type="email" autocomplete="email" placeholder="you@school.edu" value="${escape(state.email)}"></label>${state.trackMacros ? `<div class="form-row"><label class="field-label">Age<input class="field-input" id="age" type="number" min="13" max="100" inputmode="numeric" placeholder="19" value="${escape(state.age)}"></label><div class="field-label">Sex<div class="segmented">${['Female', 'Male'].map((sex) => `<button class="onboarding-choice ${state.sex === sex ? 'is-selected' : ''}" type="button" data-sex="${sex}">${sex}</button>`).join('')}</div></div></div>` : ''}</div>${actions('Next')}`)
}

function renderMeasurements() {
    return stage(`${backButton()}<h1 class="onboarding-title">Your measurements</h1><p class="onboarding-copy">Used to estimate your daily needs.</p><div class="onboarding-form"><label class="field-label unit-field">Weight<input class="field-input" id="weight" type="number" min="1" inputmode="numeric" placeholder="Enter your weight" value="${escape(state.weight)}"><span class="field-unit">lb</span></label><div class="field-label">Height<div class="form-row"><label class="unit-field"><input class="field-input" id="feet" type="number" min="1" max="8" inputmode="numeric" placeholder="Feet" value="${escape(state.feet)}"><span class="field-unit">ft</span></label><label class="unit-field"><input class="field-input" id="inches" type="number" min="0" max="11" inputmode="numeric" placeholder="Inches" value="${escape(state.inches)}"><span class="field-unit">in</span></label></div></div></div>${actions('Next')}`)
}

function renderRhythm() {
    return stage(`${backButton()}<h1 class="onboarding-title">How do you eat?</h1><p class="onboarding-copy">Your cadence and macro split shape each day’s plan.</p><div class="onboarding-form"><div class="field-label">Meals per day<div class="stepper"><button type="button" class="onboarding-adjust" data-meals="-1" aria-label="One fewer meal">−</button><strong class="stepper-value">${state.meals}</strong><button type="button" class="onboarding-adjust" data-meals="1" aria-label="One more meal">+</button></div></div><div class="field-label">Macro split<div class="choice-list"><button type="button" class="onboarding-choice choice-row ${!state.highProtein ? 'is-selected' : ''}" data-split="balanced"><span class="choice-icon"><i class="bi bi-balance-scale"></i></span><span><span class="choice-title">Balanced</span><span class="choice-description">20% protein · 30% fat · 50% carbs</span></span><i class="bi bi-check2 selected-check"></i></button><button type="button" class="onboarding-choice choice-row ${state.highProtein ? 'is-selected' : ''}" data-split="protein"><span class="choice-icon"><i class="bi bi-arrow-left-right"></i></span><span><span class="choice-title">High-protein</span><span class="choice-description">30% protein · 25% fat · 45% carbs</span></span><i class="bi bi-check2 selected-check"></i></button></div></div></div>${actions('Next')}`)
}

function renderPace() {
    const isLose = state.goal === 'lose'
    const options = [.5, 1].map((pace, index) => ({ label: `${pace} lb / week`, detail: `${isLose ? '−' : '+'}${pace * 500} cal/day · ${index ? 'steady results' : 'easiest to sustain'}` }))
    return stage(`${backButton()}<h1 class="onboarding-title">Choose your pace.</h1><p class="onboarding-copy">Slow and steady is always a win.</p><div class="choice-list">${options.map((option, index) => `<button type="button" class="onboarding-choice choice-row ${state.pace === Number(index ? 1 : .5) ? 'is-selected' : ''}" data-pace="${index ? 1 : .5}"><span class="choice-icon"><i class="bi bi-speedometer2"></i></span><span><span class="choice-title">${option.label}</span><span class="choice-description">${option.detail}</span></span><i class="bi bi-check2 selected-check"></i></button>`).join('')}</div>${actions('Next')}`)
}

function renderActivity() {
    const activities = [['Sedentary', 'Little exercise'], ['Lightly active', '1–2 days/week'], ['Moderately active', '3–5 days/week'], ['Very active', '6–7 days/week']]
    return stage(`${backButton()}<h1 class="onboarding-title">How active are you?</h1><p class="onboarding-copy">Daily movement drives how many calories you need.</p><div class="choice-list">${activities.map(([label, detail]) => `<button type="button" class="onboarding-choice choice-row ${state.activity === label ? 'is-selected' : ''}" data-activity="${label}"><span class="choice-icon"><i class="bi bi-person-walking"></i></span><span><span class="choice-title">${label}</span><span class="choice-description">${detail}</span></span><i class="bi bi-check2 selected-check"></i></button>`).join('')}</div>${actions('Next')}`)
}

function targets() {
    const weight = Number(state.weight) || 150
    const base = Math.round((state.sex === 'Male' ? 15 : 13) * weight + 500)
    const modifier = state.goal === 'lose' ? -250 : state.goal === 'gain' ? 250 : 0
    const calories = Math.max(1400, base + modifier)
    const protein = state.highProtein ? Math.round(weight) : Math.round(weight * .8)
    const fat = Math.round(calories * (state.highProtein ? .25 : .3) / 9)
    const carbs = Math.round((calories - protein * 4 - fat * 9) / 4)
    return { calories, protein, fat, carbs }
}

function renderTargets() {
    const values = targets()
    return stage(`${backButton()}<h1 class="onboarding-title">Your daily targets</h1><p class="onboarding-copy">A useful starting point, you can tweak it anytime.</p><div class="targets"><div class="calorie-target"><strong>${values.calories.toLocaleString()}</strong><span>Calories</span></div><div class="macro-grid"><div class="macro-stat macro-stat--protein"><strong>${values.protein}g</strong><span>Protein</span></div><div class="macro-stat"><strong>${values.carbs}g</strong><span>Carbs</span></div><div class="macro-stat macro-stat--fat"><strong>${values.fat}g</strong><span>Fat</span></div></div></div>${actions('Looks good')}`)
}

function chip(label, group, selected) { return `<button class="onboarding-chip ${selected ? 'is-selected' : ''}" type="button" data-chip-group="${group}" data-chip="${label}">${label}</button>` }

function renderAllergies() {
    const allergies = ['Gluten', 'Dairy', 'Nuts', 'Shellfish', 'Soy', 'Eggs', 'Peanuts']
    const diets = ['Vegan', 'Vegetarian', 'Pescatarian', 'Halal', 'Kosher']
    return stage(`${backButton()}<h1 class="onboarding-title">Allergies & diet</h1><p class="onboarding-copy">Tap any that apply, skip if none.</p><div class="chip-group"><div><h2>Allergies</h2><div class="chip-list">${allergies.map((item) => chip(item, 'allergies', state.allergies.includes(item))).join('')}</div></div><div><h2>Diet style</h2><div class="chip-list">${diets.map((item) => chip(item, 'diet', state.diet.includes(item))).join('')}</div></div></div>${actions('Continue')}`)
}

function renderAvoid() {
    const quick = ['Mushrooms', 'Onion', 'Garlic', 'Cilantro', 'Coconut', 'Avocado', 'Tomatoes', 'Cheese']
    return stage(`${backButton()}<h1 class="onboarding-title">Anything to skip?</h1><p class="onboarding-copy">Add ingredients you’d rather avoid.</p><div class="onboarding-form"><label class="field-label">Ingredient<input class="field-input" id="custom-avoid" type="text" placeholder="e.g. mushrooms"></label></div><div class="chip-group"><div><h2>Quick add</h2><div class="chip-list">${quick.map((item) => chip(item, 'avoids', state.avoids.includes(item))).join('')}</div></div></div>${actions(state.avoids.length ? 'Continue' : 'Skip')}`)
}

function renderAccount() {
    return stage(`${backButton()}<h1 class="onboarding-title">Create your account.</h1><p class="onboarding-copy">Save your plan and pick up right where you left off in the app.</p><div class="auth-buttons"><button class="auth-button" type="button" data-provider="google"><i class="bi bi-google"></i>Continue with Google</button><button class="auth-button" type="button" data-provider="apple"><i class="bi bi-apple"></i>Continue with Apple</button></div><p id="account-error" class="form-error" role="alert"></p><p class="account-benefit"><i class="bi bi-shield-check"></i>Your account works on every UPlate device.</p><div class="onboarding-actions"><p class="onboarding-note">By continuing, you agree to UPlate’s Terms & Privacy Policy.</p></div>`)
}

function renderSuccess() {
    return stage(`<p class="onboarding-kicker">Account created</p><h1 class="onboarding-title">Download UPlate to finish.</h1><p class="onboarding-copy">Sign in with the same Google or Apple account to open your personalized plan.</p><div class="download-offer"><p>Included with your account</p><h2>1 week of UPlate Pro, free.</h2><span>Your week starts when you download the app and sign in.</span></div><div class="download-actions"><a class="download-button download-button--primary" href="${APP_STORE_URL}"><i class="bi bi-apple"></i><span>Download on the<br><strong>App Store</strong></span></a><a class="download-button" href="${PLAY_STORE_URL}"><i class="bi bi-android2"></i><span>Get it on<br><strong>Google Play</strong></span></a></div><p class="onboarding-note">Choose your app store to complete setup.</p>`, true)
}

function render() {
    const step = currentStep()
    const renderer = { welcome: renderWelcome, goal: renderGoal, helps: renderHelps, macroChoice: renderMacroChoice, basics: renderBasics, measurements: renderMeasurements, rhythm: renderRhythm, pace: renderPace, activity: renderActivity, targets: renderTargets, allergies: renderAllergies, avoid: renderAvoid, account: renderAccount, success: renderSuccess }[step]
    content.innerHTML = renderer()
    const steps = activeFlow()
    const visibleStep = Math.min(stepIndex + 1, steps.length - 1)
    progressFill.style.width = `${step === 'success' ? 100 : Math.max(7, visibleStep / (steps.length - 1) * 100)}%`
    progressLabel.textContent = step === 'success' ? 'All set' : `Step ${visibleStep} of ${steps.length - 1}`
    bindEvents()
}

function saveFields() {
    const fields = ['name', 'email', 'age', 'weight', 'feet', 'inches']
    fields.forEach((id) => { const input = document.getElementById(id); if (input) state[id] = input.value.trim() })
}

function addCustomAvoid() {
    const input = document.getElementById('custom-avoid')
    const value = input?.value.trim()
    if (value && !state.avoids.some((item) => item.toLowerCase() === value.toLowerCase())) state.avoids.push(value)
}

function toggleChoice(listName, value) {
    const list = state[listName]
    const index = list.indexOf(value)
    if (index === -1) list.push(value)
    else list.splice(index, 1)
}

function humanizeFirebaseError(code) {
    return ({ 'auth/account-exists-with-different-credential': 'An account already exists with a different sign-in method.', 'auth/popup-closed-by-user': 'Sign-in was cancelled.', 'auth/popup-blocked': 'Your browser blocked the sign-in window. Please allow popups and try again.', 'auth/operation-not-allowed': 'Apple Sign In has not been enabled for the UPlate Firebase project.', 'auth/unauthorized-domain': 'Apple Sign In is not authorized for this domain yet.', 'auth/configuration-not-found': 'Apple Sign In still needs its Firebase web configuration.' }[code] || 'We couldn’t sign you in. Please try again.')
}

function saveCompletedOnboarding(user) {
    state.email = user.email || state.email
    localStorage.setItem('uplate_web_onboarding', JSON.stringify({ name: state.name, email: state.email, school: state.school, goal: state.goal, trackMacros: state.trackMacros, completedAt: new Date().toISOString() }))
    localStorage.removeItem('uplate_pending_onboarding')
    stepIndex = activeFlow().indexOf('success')
    render()
}

async function signInWithProvider(providerName) {
    const error = document.getElementById('account-error')
    const buttons = content.querySelectorAll('[data-provider]')
    error.textContent = ''
    buttons.forEach((button) => { button.disabled = true })
    try {
        const provider = providerName === 'google' ? new GoogleAuthProvider() : new OAuthProvider('apple.com')
        if (providerName === 'apple') {
            provider.addScope('email')
            provider.addScope('name')
        }
        const result = await signInWithPopup(auth, provider)
        saveCompletedOnboarding(result.user)
    } catch (errorResponse) {
        error.textContent = humanizeFirebaseError(errorResponse.code)
        buttons.forEach((button) => { button.disabled = false })
    }
}

function bindEvents() {
    content.querySelector('[data-action="back"]')?.addEventListener('click', () => navigate(-1))
    content.querySelector('[data-action="next"]')?.addEventListener('click', () => {
        saveFields()
        if (currentStep() === 'basics' && (!state.name || !/^\S+@\S+\.\S+$/.test(state.email))) {
            const email = document.getElementById('email')
            if (email) { email.focus(); email.reportValidity() }
            return
        }
        if (currentStep() === 'measurements' && (!state.weight || !state.feet)) { document.getElementById('weight')?.focus(); return }
        if (currentStep() === 'avoid') addCustomAvoid()
        navigate(1)
    })
    content.querySelectorAll('[data-goal]').forEach((button) => button.addEventListener('click', () => { state.goal = button.dataset.goal; render() }))
    content.querySelectorAll('[data-macro-choice]').forEach((button) => button.addEventListener('click', () => { state.trackMacros = button.dataset.macroChoice === 'yes'; navigate(1) }))
    content.querySelectorAll('[data-sex]').forEach((button) => button.addEventListener('click', () => { saveFields(); state.sex = button.dataset.sex; render() }))
    content.querySelectorAll('[data-meals]').forEach((button) => button.addEventListener('click', () => { state.meals = Math.min(8, Math.max(1, state.meals + Number(button.dataset.meals))); render() }))
    content.querySelectorAll('[data-split]').forEach((button) => button.addEventListener('click', () => { state.highProtein = button.dataset.split === 'protein'; render() }))
    content.querySelectorAll('[data-pace]').forEach((button) => button.addEventListener('click', () => { state.pace = Number(button.dataset.pace); render() }))
    content.querySelectorAll('[data-activity]').forEach((button) => button.addEventListener('click', () => { state.activity = button.dataset.activity; render() }))
    content.querySelectorAll('[data-chip]').forEach((button) => button.addEventListener('click', () => { toggleChoice(button.dataset.chipGroup, button.dataset.chip); render() }))
    content.querySelectorAll('[data-provider]').forEach((button) => button.addEventListener('click', () => signInWithProvider(button.dataset.provider)))
}

render()
