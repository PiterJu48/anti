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

/**
 * 로그인 기능
 */
async function login(userId, password) {
    // [데모용] 하드코딩된 관리자 계정 체크
    if (userId === 'admin' && password === '123456') {
        const userRole = 'admin';
        localStorage.setItem('user_role', userRole);
        localStorage.setItem('user_id', userId);
        return userRole;
    }

    const email = formatIdToEmail(userId);
    
    const { data, error } = await _supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        throw error;
    }

    // 역할(Role) 확인 로직 (metadata에 저장되어 있다고 가정)
    const userRole = data.user.user_metadata.role || 'farm'; // 기본값 농장주
    localStorage.setItem('user_role', userRole);
    localStorage.setItem('user_id', userId);

    return userRole;
}

/**
 * 로그아웃 기능
 */
async function logout() {
    await _supabase.auth.signOut();
    localStorage.clear();
    window.location.href = 'index.html';
}

/**
 * 세션 체크 및 페이지 리다이렉션
 */
async function checkAuth(requiredRole) {
    const currentRole = localStorage.getItem('user_role');
    const currentId = localStorage.getItem('user_id');

    // [데모용] 관리자 계정은 세션 체크 건너뜀
    if (currentId === 'admin' && currentRole === 'admin') {
        return;
    }

    const { data: { session } } = await _supabase.auth.getSession();
    
    if (!session) {
        window.location.href = 'index.html';
        return;
    }

    if (requiredRole && currentRole !== requiredRole) {
        alert('접근 권한이 없습니다.');
        window.location.href = 'index.html';
    }
}

// 전역에서 사용할 수 있도록 export (Vanilla JS 스타일)
window.auth = {
    login,
    logout,
    checkAuth,
    supabase: _supabase
};
