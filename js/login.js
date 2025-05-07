const check_xss = (input) => {
    const DOMPurify = window.DOMPurify;
    const sanitizedInput = DOMPurify.sanitize(input);

    if (sanitizedInput !== input) {
        alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
        return false;
    }
    return sanitizedInput;
};

const check_input = () => {
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    const c = '아이디, 패스워드를 체크합니다';
    // 전역 변수 추가, 맨 위 위치
    const idsave_check = document.getElementById('idSaveCheck');
    alert(c);
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue === '') {
        alert('이메일을 입력하세요.');
        return false;
    }

    if (passwordValue === '') {
        alert('비밀번호를 입력하세요.');
        return false;
    }

    const sanitizedPassword = check_xss(passwordValue);
    const sanitizedEmail = check_xss(emailValue);
    if (!sanitizedEmail) {
        return false;
    }
    if (!sanitizedPassword) {
        return false;
    }

    if (emailValue.length < 10) {
        alert('아이디는 최소 10글자 이상 입력해야 합니다.');
        return false;
    }
    if (passwordValue.length < 15) {
        alert('비밀번호는 반드시 15글자 이상 입력해야 합니다.');
        return false;
    }
    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        return false;
    }
    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        return false;
    }
    const repeatPattern = /(.{3,})\1+/;
    if (repeatPattern.test(emailValue)) {
        alert('아이디에 3글자 이상 반복되는 문자열은 사용할 수 없습니다.');
    return false;
    }
    const repeatNumbers = /(\d{2,})\1+/;
    if (repeatNumbers.test(emailValue)) {
        alert('아이디에 연속된 숫자 반복은 사용할 수 없습니다.');
    return false;
    }
    // 검사 마무리 단계 쿠키 저장, 최하단 submit 이전
    if(idsave_check.checked == true) { // 아이디 체크 o
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장
        alert("쿠키 값 :" + emailValue);
    }

    else{ // 아이디 체크 x
        setCookie("id", emailValue, 0); //날짜를 0 - 쿠키 삭제
    }   
                                                                             
    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);
    session_set(); // 세션 생성
    loginForm.submit();
    location.href = 'a.html';

   
};

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");

    if(get_id) {
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    session_check(); // 세션 유무 검사
}

function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + ";path=/" + ";SameSite=None; Secure";
}

function getCookie(name) {
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if (cookie != "") {
        var cookie_array = cookie.split("; ");
        for ( var index in cookie_array) {
            var cookie_name = cookie_array[index].split("=");
            if (cookie_name[0] == "id") {
                return cookie_name[1];
            }
        }
    }
    return ;
}

function login_failed() {
    let failcount = parseInt(getCookie("loginFail")) || 0;
    failcount++;
    setCookie("loginFail", failCount, 1);
    const statusArea = document.getElementById("login_status");
    if (failcount >= 3) {
        statusArea.innerHTML = '로그인 제한: ${failcount}회 실패하여 차단됨';
        document.getElementById("login_btn").disabled = true;
    } 
    else {
        statusArea.innerHTML = '⚠️ 로그인 실패: ${failcount}회';
    }
}

document.getElementById("login_btn").addEventListener('click', check_input);