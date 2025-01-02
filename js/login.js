// 准备好的数据
let user = [
    {
        username: "admin",
        password: "123456"
    },
    {
        username: "root",
        password: "123456"
    }
];

// 获取表单元素
let information = document.querySelector('form');

// 获取错误信息显示元素
let error = document.querySelector('.login-error');
// 添加表单提交事件监听器
information.addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止默认的表单提交行为


    // 获取用户名和密码输入框的值
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    //检测用户名或密码是否为空    
    if (username === "" || password === "") {
        error.innerHTML = "用户名或密码不能为空";
        error.style.display = "block"; // 显示错误信息

        return;
    }
    // 调用登录函数
    login(username, password);

});

// 登录函数
function login(username, password) {
    for (let i = 0; i < user.length; i++) {
        if (user[i].username === username && user[i].password === password) {
            error.innerHTML = "登录成功，三秒内跳转到主页";
            error.style.display = "block"; // 显示错误信息
            // 延迟3秒跳转到主页
            setTimeout(function () {
                window.location.href = "index.html";
            }, 3000);
            return;
        }
    }
    // 如果没有找到匹配的用户名和密码，则显示错误信息
    error.innerHTML = "用户名或密码错误";
    error.style.display = "block"; // 显示错误信息
}

