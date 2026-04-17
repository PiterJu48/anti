const SUPABASE_URL = 'https://worigkqyaitfhxrlqrww.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvcmlna3F5YWl0Zmh4cmxxcnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzk2OTIsImV4cCI6MjA5MTk1NTY5Mn0.QMXM0wKxkEJAI6j5uqwe20wyWwvEHO2HEL8iTr9wKto';

// Supabase 클라이언트 초기화
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 도메인 (내부 처리용)
const DUMMY_DOMAIN = '@animal-welfare.mafra.go.kr';

/**
 * 단순 ID를 이메일 형식으로 변환
 */
function formatIdToEmail(userId) {
    if (userId.includes('@')) return userId;
    return userId + DUMMY_DOMAIN;
}

// 초기 사용자 데이터 (localStorage에 없으면 사용)
const DEFAULT_USERS = [
    { id: 'admin', pw: '123456', name: '시스템 관리자', role: 'admin' },
    { id: 'farm1', pw: '1234', name: '행복농장주', role: 'farm' },
    { id: 'eval1', pw: '1234', name: '김평가원', role: 'evaluator' }
];

/**
 * 사용자 목록 가져오기
 */
function getUsers() {
    const users = localStorage.getItem('app_users');
    return users ? JSON.parse(users) : DEFAULT_USERS;
}

/**
 * 사용자 저장하기
 */
function saveUsers(users) {
    localStorage.setItem('app_users', JSON.stringify(users));
}

/**
 * 로그인 기능 (로컬 데이터 기반)
 */
async function login(userId, password) {
    const users = getUsers();
    const user = users.find(u => u.id === userId && u.pw === password);

    if (user) {
        localStorage.setItem('user_role', user.role);
        localStorage.setItem('user_id', user.id);
        localStorage.setItem('user_name', user.name);
        return user.role;
    } else {
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
}

/**
 * 계정 추가/수정/삭제 기능
 */
const accountManager = {
    getAll: getUsers,
    add: (newUser) => {
        const users = getUsers();
        if (users.find(u => u.id === newUser.id)) throw new Error('이미 존재하는 아이디입니다.');
        users.push(newUser);
        saveUsers(users);
    },
    update: (id, updatedData) => {
        const users = getUsers();
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedData };
            saveUsers(users);
        }
    },
    delete: (id) => {
        if (id === 'admin') throw new Error('관리자 계정은 삭제할 수 없습니다.');
        const users = getUsers();
        const filtered = users.filter(u => u.id !== id);
        saveUsers(filtered);
    }
};

/**
 * 로그아웃 기능
 */
async function logout() {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    window.location.href = 'index.html';
}

/**
 * 세션 체크
 */
async function checkAuth(requiredRole) {
    const currentRole = localStorage.getItem('user_role');
    const currentId = localStorage.getItem('user_id');

    if (!currentId) {
        window.location.href = 'index.html';
        return;
    }

    if (requiredRole && currentRole !== requiredRole) {
        alert('접근 권한이 없습니다.');
        window.location.href = 'index.html';
    }
}

// 전역 노출
window.auth = {
    login,
    logout,
    checkAuth,
    accounts: accountManager,
    supabase: _supabase // 농장 관리는 여전히 Supabase 사용 가능
};
