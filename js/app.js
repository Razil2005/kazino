// ================================
// BETTING APP - MAIN LOGIC
// ================================

// State management
let betSlip = [];
let expandedExams = new Set();
let currentUser = null;

// Authentication functions
function initAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        updateAuthUI();
        loadUserBetslip();
    }
}

function login(username) {
    if (!username || username.trim() === '') {
        alert('İstifadəçi adı daxil edin!');
        return;
    }
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.includes(username.trim())) {
        alert('Bu istifadəçi tapılmadı! Əvvəlcə qeydiyyatdan keçin.');
        return;
    }
    
    currentUser = username.trim();
    localStorage.setItem('currentUser', currentUser);
    updateAuthUI();
    loadUserBetslip();
    closeAuthModal();
}

function register(username) {
    if (!username || username.trim() === '') {
        alert('İstifadəçi adı daxil edin!');
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.includes(username.trim())) {
        alert('Bu istifadəçi adı artıq mövcuddur!');
        return;
    }
    
    users.push(username.trim());
    localStorage.setItem('users', JSON.stringify(users));
    login(username);
}

function logout() {
    saveUserBetslip();
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    clearBetslip();
}

function updateAuthUI() {
    const authButtons = document.querySelector('.header-actions');
    if (currentUser) {
        authButtons.innerHTML = `
            <button class="btn-secondary btn-bet-history" style="margin-right: 10px;">KUPONLAR</button>
            <span style="color: #fff; margin-right: 15px;">👤 ${currentUser}</span>
            <button class="btn-secondary btn-logout">ÇIXIŞ</button>
        `;
        
        // Add event listeners to the new buttons
        setTimeout(() => {
            const historyBtn = document.querySelector('.btn-bet-history');
            const logoutBtn = document.querySelector('.btn-logout');
            if (historyBtn) historyBtn.addEventListener('click', openBetHistory);
            if (logoutBtn) logoutBtn.addEventListener('click', logout);
        }, 0);
    } else {
        authButtons.innerHTML = `
            <button class="btn-secondary" id="loginBtn">DAXİL OL</button>
            <button class="btn-primary" id="registerBtn">QEYDİYYAT</button>
        `;
        
        // Add event listeners to the new buttons
        setTimeout(() => {
            const loginBtn = document.getElementById('loginBtn');
            const registerBtn = document.getElementById('registerBtn');
            if (loginBtn) loginBtn.addEventListener('click', openLoginModal);
            if (registerBtn) registerBtn.addEventListener('click', openRegisterModal);
        }, 0);
    }
}

function saveUserBetslip() {
    if (currentUser && betSlip.length > 0) {
        const userBetslips = JSON.parse(localStorage.getItem('userBetslips') || '{}');
        userBetslips[currentUser] = betSlip;
        localStorage.setItem('userBetslips', JSON.stringify(userBetslips));
    }
}

function loadUserBetslip() {
    if (currentUser) {
        const userBetslips = JSON.parse(localStorage.getItem('userBetslips') || '{}');
        betSlip = userBetslips[currentUser] || [];
        updateBetslipUI();
        
        // Restore highlights
        betSlip.forEach(bet => {
            highlightSelectedBet(bet.id, true);
        });
    }
}

function openLoginModal() {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authModalTitle');
    const btn = document.getElementById('authSubmitBtn');
    const input = document.getElementById('authUsername');
    
    title.textContent = 'Daxil Ol';
    btn.textContent = 'DAXİL OL';
    input.value = '';
    
    // Remove old event listeners by cloning
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    // Add new event listener
    document.getElementById('authSubmitBtn').addEventListener('click', () => {
        const username = document.getElementById('authUsername').value;
        login(username);
    });
    
    modal.style.display = 'flex';
    setTimeout(() => input.focus(), 100);
}

function openRegisterModal() {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authModalTitle');
    const btn = document.getElementById('authSubmitBtn');
    const input = document.getElementById('authUsername');
    
    title.textContent = 'Qeydiyyat';
    btn.textContent = 'QEYDİYYAT';
    input.value = '';
    
    // Remove old event listeners by cloning
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    // Add new event listener
    document.getElementById('authSubmitBtn').addEventListener('click', () => {
        const username = document.getElementById('authUsername').value;
        register(username);
    });
    
    modal.style.display = 'flex';
    setTimeout(() => input.focus(), 100);
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
    document.getElementById('authUsername').value = '';
}

function openBetHistory() {
    const modal = document.getElementById('betHistoryModal');
    const historyContainer = document.getElementById('betHistoryContainer');
    
    // Get user's bet history
    const betHistory = JSON.parse(localStorage.getItem('betHistory') || '{}');
    const userBets = betHistory[currentUser] || [];
    
    if (userBets.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-history">
                <p>📝 Heç bir kupon tapılmadı</p>
                <span>Mərc etdikdə kuponlar burada görünəcək</span>
            </div>
        `;
    } else {
        historyContainer.innerHTML = userBets.map((bet, index) => `
            <div class="history-item">
                <div class="history-header">
                    <strong>Kupon #${userBets.length - index}</strong>
                    <span class="history-date">${bet.date}</span>
                </div>
                <div class="history-details">
                    <div class="history-row">
                        <span>Seçimlər:</span>
                        <span>${bet.betCount}</span>
                    </div>
                    <div class="history-row">
                        <span>Ǝmsal:</span>
                        <span class="odds-value">${bet.totalOdds}</span>
                    </div>
                    <div class="history-row">
                        <span>Məbləğ:</span>
                        <span>${bet.amount} AZN</span>
                    </div>
                    <div class="history-row">
                        <span>Mümkün Qazanç:</span>
                        <span class="win-value">${bet.potentialWin} AZN</span>
                    </div>
                </div>
                <div class="history-bets">
                    ${bet.bets.map(b => `
                        <div class="history-bet-item">
                            <div class="bet-details-column">
                                <span class="bet-exam">${b.examName}</span>
                                <span class="bet-category">${b.category || ''}</span>
                            </div>
                            <span class="bet-selection">${b.selection}</span>
                            <span class="bet-odds">${b.odds}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).reverse().join('');
    }
    
    modal.style.display = 'flex';
}

function closeBetHistory() {
    const modal = document.getElementById('betHistoryModal');
    modal.style.display = 'none';
}

// Helper function to get category name from bet ID
function getCategoryName(betId) {
    if (betId.includes('-pass-')) return '100 Bal Alacaq Tələbə';
    if (betId.includes('-fail-')) return 'Kəsiləcək Tələbə';
    if (betId.includes('-failCount-')) return 'Kəsiləcək Tələbə Sayı';
    if (betId.includes('-highestScorer-')) return 'Ən Çox Bal Alan Tələbə';
    if (betId.includes('-lowestScorer-')) return 'Ən Az Bal Alan Tələbə';
    if (betId.includes('-score80Plus-')) return '80+ Alacaq Tələbə';
    if (betId.includes('-score90Plus-')) return '90+ Alacaq Tələbə';
    if (betId.includes('-overunder-')) return '100 Bal Alan Sayı (Over/Under)';
    return '';
}

// DOM Elements
const examCardsContainer = document.getElementById('examCardsContainer');
const betslipContent = document.getElementById('betslipContent');
const betslipFooter = document.getElementById('betslipFooter');
const clearBetslipBtn = document.getElementById('clearBetslip');
const placeBetBtn = document.getElementById('placeBetBtn');
const betAmountInput = document.getElementById('betAmount');

// ================================
// INITIALIZE APP
// ================================
function initApp() {
    initAuth();
    renderExamCards();
    setupEventListeners();
    setupAuthModal();
    setupInitialAuthButtons();
}

// Setup initial auth buttons (on page load)
function setupInitialAuthButtons() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', openLoginModal);
    }
    if (registerBtn) {
        registerBtn.addEventListener('click', openRegisterModal);
    }
}

// Setup auth modal event listeners
function setupAuthModal() {
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const authUsername = document.getElementById('authUsername');
    
    // Remove any existing listeners
    const newBtn = authSubmitBtn.cloneNode(true);
    authSubmitBtn.parentNode.replaceChild(newBtn, authSubmitBtn);
    
    // This will be set dynamically in openLoginModal/openRegisterModal
}

// ================================
// RENDER EXAM CARDS
// ================================
function renderExamCards() {
    const html = EXAM_DATA.exams.map(exam => createExamCard(exam)).join('');
    examCardsContainer.innerHTML = html;
}

function createExamCard(exam) {
    const options = EXAM_DATA.getBettingOptions(exam.id);
    const examStudents = EXAM_DATA.getStudentsForExam(exam.id);
    
    return `
        <div class="exam-card" data-exam-id="${exam.id}">
            <div class="exam-header" onclick="toggleExam(${exam.id})">
                <div class="exam-info">
                    <h3>${exam.icon} ${exam.name}</h3>
                    <div class="exam-meta">
                        <span>📅 ${exam.date}</span>
                        <span>🕐 ${exam.time}</span>
                        <span>👥 ${exam.studentCount} Tələbə</span>
                    </div>
                </div>
                <div class="expand-icon">▼</div>
            </div>
            
            <div class="exam-options">
                <div class="options-content">
                    
                    <!-- Pass Students Options -->
                    <div class="option-group">
                        <h4>100 Bal Alacaq Tələbə</h4>
                        <div class="students-grid">
                            ${options.passStudents.map(opt => createStudentPassFailButton(exam.id, 'pass', opt)).join('')}
                        </div>
                    </div>

                    <!-- Fail Students Options -->
                    <div class="option-group">
                        <h4>Kəsiləcək Tələbə</h4>
                        <div class="students-grid">
                            ${options.failStudents.map(opt => createStudentPassFailButton(exam.id, 'fail', opt)).join('')}
                        </div>
                    </div>

                    <!-- Fail Count Options -->
                    <div class="option-group">
                        <h4>Kəsiləcək Tələbə Sayı</h4>
                        <div class="option-grid">
                            ${options.failCount.map(opt => createOddButton(exam.id, 'failCount', opt)).join('')}
                        </div>
                    </div>

                    <!-- Highest Scorer -->
                    <div class="option-group">
                        <h4>Ən Çox Bal Alan Tələbə</h4>
                        <div class="students-grid">
                            ${options.highestScorer.map(opt => createStudentPassFailButton(exam.id, 'highestScorer', opt)).join('')}
                        </div>
                    </div>

                    <!-- Lowest Scorer -->
                    <div class="option-group">
                        <h4>Ən Az Bal Alan Tələbə</h4>
                        <div class="students-grid">
                            ${options.lowestScorer.map(opt => createStudentPassFailButton(exam.id, 'lowestScorer', opt)).join('')}
                        </div>
                    </div>

                    <!-- 80+ Score -->
                    <div class="option-group">
                        <h4>80+ Alacaq Tələbə</h4>
                        <div class="students-grid">
                            ${options.score80Plus.map(opt => createStudentPassFailButton(exam.id, 'score80Plus', opt)).join('')}
                        </div>
                    </div>

                    <!-- 90+ Score -->
                    <div class="option-group">
                        <h4>90+ Alacaq Tələbə</h4>
                        <div class="students-grid">
                            ${options.score90Plus.map(opt => createStudentPassFailButton(exam.id, 'score90Plus', opt)).join('')}
                        </div>
                    </div>

                    <!-- Over/Under 100 Bal Alan Sayı -->
                    <div class="option-group">
                        <h4>100 Bal Alan Tələbə Sayı (Over/Under)</h4>
                        <div class="overunder-grid">
                            ${options.overUnder.map(opt => createOverUnderButton(exam.id, opt)).join('')}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
}

function createOddButton(examId, category, option) {
    const betId = `${examId}-${category}-${option.id}`;
    return `
        <button class="odd-button" data-bet-id="${betId}" data-category="${examId}-${category}" onclick="addToBetslip('${betId}', '${EXAM_DATA.exams.find(e => e.id == examId).name}', '${option.label}', ${option.odds}, '${examId}-${category}')">
            <span class="odd-label">${option.label}</span>
            <span class="odd-value">${option.odds}</span>
        </button>
    `;
}

function createStudentPassFailButton(examId, category, option) {
    const betId = `${examId}-${category}-${option.id}`;
    return `
        <button class="odd-button" data-bet-id="${betId}" data-category="${examId}-${category}" onclick="addToBetslip('${betId}', '${EXAM_DATA.exams.find(e => e.id == examId).name}', '${option.label}', ${option.odds}, '${examId}-${category}')">
            <span class="odd-label">${option.label}</span>
            <span class="odd-value">${option.odds}</span>
        </button>
    `;
}

function createOverUnderButton(examId, option) {
    const betId = `${examId}-overunder-${option.id}`;
    return `
        <button class="overunder-button" data-bet-id="${betId}" data-category="${examId}-overunder" onclick="addToBetslip('${betId}', '${EXAM_DATA.exams.find(e => e.id == examId).name}', '100 Bal: ${option.label}', ${option.odds}, '${examId}-overunder')">
            <span class="overunder-label">${option.label}</span>
            <span class="overunder-value">${option.odds}</span>
        </button>
    `;
}

function createStudentOdd(examId, student) {
    const bet90Id = `${examId}-student-${student.name}-90`;
    const bet100Id = `${examId}-student-${student.name}-100`;
    const category = `${examId}-student-${student.name}`;
    
    return `
        <div class="student-odd">
            <div class="student-name">${student.name}</div>
            <div class="student-odds">
                <span data-bet-id="${bet90Id}" data-category="${category}" onclick="toggleStudentBet(event, '${bet90Id}', '${EXAM_DATA.exams.find(e => e.id == examId).name}', '${student.name} - 90+', ${student.odds90}, '${category}')">
                    90+
                    <strong>${student.odds90}</strong>
                </span>
                <span data-bet-id="${bet100Id}" data-category="${category}" onclick="toggleStudentBet(event, '${bet100Id}', '${EXAM_DATA.exams.find(e => e.id == examId).name}', '${student.name} - 100 Bal', ${student.odds100}, '${category}')">
                    100
                    <strong>${student.odds100}</strong>
                </span>
            </div>
        </div>
    `;
}

// ================================
// EXAM CARD INTERACTION
// ================================
function toggleExam(examId) {
    const card = document.querySelector(`[data-exam-id="${examId}"]`);
    card.classList.toggle('expanded');
}

// ================================
// BETSLIP MANAGEMENT
// ================================
function addToBetslip(betId, examName, selection, odds, category) {
    // Check if bet already exists
    const existingIndex = betSlip.findIndex(bet => bet.id === betId);
    
    if (existingIndex !== -1) {
        // Remove if already selected
        removeBet(betId);
        return;
    }
    
    // Remove any existing bet from the same category (single selection)
    if (category) {
        const sameCategoryBets = betSlip.filter(bet => bet.category === category);
        sameCategoryBets.forEach(bet => {
            highlightSelectedBet(bet.id, false);
        });
        betSlip = betSlip.filter(bet => bet.category !== category);
    }
    
    // Add new bet
    const bet = {
        id: betId,
        examName,
        selection,
        odds: parseFloat(odds),
        category: category
    };
    
    betSlip.push(bet);
    
    // Update UI
    updateBetslipUI();
    highlightSelectedBet(betId, true);
    
    // Auto-save betslip
    if (currentUser) {
        saveUserBetslip();
    }
}

function toggleStudentBet(event, betId, examName, selection, odds, category) {
    event.stopPropagation();
    addToBetslip(betId, examName, selection, odds, category);
}

function removeBet(betId) {
    betSlip = betSlip.filter(bet => bet.id !== betId);
    updateBetslipUI();
    highlightSelectedBet(betId, false);
    
    // Auto-save betslip
    if (currentUser) {
        saveUserBetslip();
    }
}

function clearBetslip() {
    // Remove all highlights
    betSlip.forEach(bet => {
        highlightSelectedBet(bet.id, false);
    });
    
    betSlip = [];
    updateBetslipUI();
    
    // Auto-save betslip
    if (currentUser) {
        saveUserBetslip();
    }
}

function highlightSelectedBet(betId, isSelected) {
    const element = document.querySelector(`[data-bet-id="${betId}"]`);
    if (element) {
        if (isSelected) {
            element.classList.add('selected');
        } else {
            element.classList.remove('selected');
        }
    }
}

// ================================
// UPDATE BETSLIP UI
// ================================
function updateBetslipUI() {
    if (betSlip.length === 0) {
        // Show empty state
        betslipContent.innerHTML = `
            <div class="empty-betslip">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11H15M9 15H15M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <p>Kupon boşdur</p>
                <span>Mərc seçimi üçün əmsal seçin</span>
            </div>
        `;
        betslipFooter.style.display = 'none';
        return;
    }
    
    // Show betslip items
    betslipContent.innerHTML = betSlip.map(bet => `
        <div class="betslip-item">
            <button class="remove-bet" onclick="removeBet('${bet.id}')">×</button>
            <div class="betslip-item-header">
                <div>
                    <div class="betslip-item-title">${bet.examName}</div>
                    <div class="betslip-item-selection">${bet.selection}</div>
                </div>
                <div class="betslip-item-odds">${bet.odds.toFixed(2)}</div>
            </div>
        </div>
    `).join('');
    
    // Calculate totals
    const totalOdds = betSlip.reduce((acc, bet) => acc * bet.odds, 1);
    const betAmount = parseFloat(betAmountInput.value) || 10;
    const potentialWin = (totalOdds * betAmount).toFixed(2);
    
    // Update footer
    document.getElementById('betCount').textContent = betSlip.length;
    document.getElementById('totalOdds').textContent = totalOdds.toFixed(2);
    document.getElementById('potentialWin').textContent = `${potentialWin} AZN`;
    
    betslipFooter.style.display = 'block';
}

// ================================
// EVENT LISTENERS
// ================================
function setupEventListeners() {
    // Clear betslip
    clearBetslipBtn.addEventListener('click', clearBetslip);
    
    // Place bet button
    placeBetBtn.addEventListener('click', () => {
        if (!currentUser) {
            alert('❌ Mərc etmək üçün daxil olmalısınız!');
            openLoginModal();
            return;
        }
        
        if (betSlip.length === 0) {
            alert('❌ Kupon boşdur! Əvvəlcə mərc seçin.');
            return;
        }
        
        const totalOdds = betSlip.reduce((acc, bet) => acc * bet.odds, 1);
        const betAmount = parseFloat(betAmountInput.value) || 10;
        const potentialWin = (totalOdds * betAmount).toFixed(2);
        
        // Save to bet history
        const betHistory = JSON.parse(localStorage.getItem('betHistory') || '{}');
        if (!betHistory[currentUser]) {
            betHistory[currentUser] = [];
        }
        
        betHistory[currentUser].push({
            date: new Date().toLocaleString('az-AZ'),
            betCount: betSlip.length,
            totalOdds: totalOdds.toFixed(2),
            amount: betAmount,
            potentialWin: potentialWin,
            bets: betSlip.map(bet => ({
                examName: bet.examName,
                selection: bet.selection,
                odds: bet.odds.toFixed(2),
                category: getCategoryName(bet.id)
            }))
        });
        
        localStorage.setItem('betHistory', JSON.stringify(betHistory));
        
        alert(`
🎉 TƏBRIKLƏR!

Kupon Detalları:
━━━━━━━━━━━━━━
📋 Seçim sayı: ${betSlip.length}
💰 Məbləğ: ${betAmount} AZN
📊 Ümumi Əmsal: ${totalOdds.toFixed(2)}
🏆 Mümkün Qazanc: ${potentialWin} AZN

Kupon uğurla yerləşdirildi!
İmtahanlarda uğurlar! 🎓
        `);
        
        // Clear betslip after "placing bet"
        clearBetslip();
    });
    
    // Update potential win on amount change
    betAmountInput.addEventListener('input', () => {
        if (betSlip.length > 0) {
            updateBetslipUI();
        }
    });
}

// ================================
// INITIALIZE ON PAGE LOAD
// ================================
document.addEventListener('DOMContentLoaded', initApp);
