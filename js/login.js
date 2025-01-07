// 用户数据
const users = [
    { username: "admin", password: "123456" },
    { username: "root", password: "123456" }
];

// DOM元素
const form = document.querySelector('form');
const errorElement = document.querySelector('.login-error');
const errorContainer = document.querySelector('.error-container');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const captchaInput = document.getElementById('captcha');
const captchaBox = document.getElementById('captcha-box');
const rememberCheckbox = document.getElementById('remember');

let currentCaptcha = '';

// 生成随机验证码
function generateCaptcha() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
        captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
}

// 显示验证码
function displayCaptcha() {
    currentCaptcha = generateCaptcha();
    captchaBox.textContent = currentCaptcha;
}

// 点击验证码刷新
captchaBox.addEventListener('click', displayCaptcha);

// 页面加载时生成验证码
document.addEventListener('DOMContentLoaded', () => {
    displayCaptcha();
    
    // 检查是否有保存的登录信息
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    
    if (savedUsername && savedPassword) {
        usernameInput.value = savedUsername;
        passwordInput.value = savedPassword;
        rememberCheckbox.checked = true;
    }
});

// 显示错误信息
const showError = (message) => {
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
    errorContainer.style.visibility = "visible";
};

// 保存登录信息
const saveLoginInfo = (username, password) => {
    if (rememberCheckbox.checked) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }
};

// 登录验证
const validateLogin = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
};

// 表单提交处理
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const captcha = captchaInput.value.trim();

    if (!username || !password) {
        showError("用户名或密码不能为空");
        return;
    }

    if (!captcha) {
        showError("请输入验证码");
        return;
    }

    if (captcha.toLowerCase() !== currentCaptcha.toLowerCase()) {
        showError("验证码错误");
        displayCaptcha();
        captchaInput.value = '';
        return;
    }

    if (validateLogin(username, password)) {
        // 保存登录信息
        saveLoginInfo(username, password);
        
        showError("登录成功，三秒内跳转到主页");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    } else {
        showError("用户名或密码错误");
        displayCaptcha();
        captchaInput.value = '';
    }
});

