// 初始数据
const initialStudents = [
    { stuID: 2019001, name: "张三", grade: "21计科一班", age: 20, phone: "13412345678" },
    { stuID: 2019002, name: "李四", grade: "21计科二班", age: 21, phone: "13812145679" },
    { stuID: 2019003, name: "王五", grade: "21计科三班", age: 22, phone: "13912345678" },
    { stuID: 2019004, name: "赵六", grade: "21信安一班", age: 23, phone: "13512345678" },
    { stuID: 2019005, name: "田七", grade: "21信安二班", age: 24, phone: "13612345678" }
];

// DOM元素
const tbody = document.querySelector("tbody");
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const addForm = document.querySelector('form');

// 状态管理
let students = [...initialStudents];

// 导航栏处理
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("ul.sidenav li a");
    
    // 导航点击事件
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // 初始化active状态
    const currentHash = window.location.hash;
    if (currentHash) {
        const activeLink = document.querySelector(`ul.sidenav li a[href="${currentHash}"]`);
        activeLink?.classList.add("active");
    }
});

// 渲染学生列表
const renderStudents = (data = students) => {
    tbody.innerHTML = data.map(student => `
        <tr>
            <td>${student.stuID}</td>
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>${student.age}</td>
            <td>${student.phone}</td>
            <td>
                <button class="edit" data-id="${student.stuID}">编辑</button>
                <button class="delete" data-id="${student.stuID}">删除</button>
            </td>
        </tr>
    `).join('');
};

// 搜索功能
const handleSearch = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) {
        renderStudents();
        return;
    }
    
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm)
    );
    renderStudents(filteredStudents);
};

// 删除学生
const handleDelete = (studentId) => {
    students = students.filter(student => student.stuID !== studentId);
    renderStudents();
};

// 添加学生
const handleAdd = (event) => {
    event.preventDefault();
    
    const newName = document.querySelector('.name').value.trim();
    const newGrade = document.querySelector('.select-class').value;
    const newAge = document.querySelector('.age').value.trim();
    const newPhone = document.querySelector('.phone').value.trim();

    if (!newName || !newGrade || !newAge || !newPhone) {
        alert('请填写完整信息');
        return;
    }

    const newStudent = {
        stuID: students.length ? Math.max(...students.map(s => s.stuID)) + 1 : 2019001,
        name: newName,
        grade: newGrade,
        age: parseInt(newAge),
        phone: newPhone
    };

    students.push(newStudent);
    renderStudents();
    event.target.reset();
};

// 添加学生按钮导航
const handleAddNavigation = () => {
    const navLinks = document.querySelectorAll("ul.sidenav li a");
    navLinks.forEach(link => link.classList.remove("active"));
    
    const addStudentLink = document.querySelector('ul.sidenav li a[href="#contact"]');
    addStudentLink?.classList.add("active");
};

// 事件监听器
searchButton.addEventListener('click', handleSearch);
tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const studentId = parseInt(e.target.dataset.id);
        handleDelete(studentId);
    }
});
addForm.addEventListener('submit', handleAdd);
document.querySelector('.add').addEventListener('click', handleAddNavigation);

// 初始化渲染
renderStudents();


