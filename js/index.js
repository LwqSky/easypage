document.addEventListener("DOMContentLoaded", function () {
  // 获取所有的导航链接
  const navLinks = document.querySelectorAll("ul.sidenav li a");

  // 监听点击事件
  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      // 移除所有的active类
      navLinks.forEach(link => link.classList.remove("active"));

      // 添加active类到当前点击的链接
      this.classList.add("active");
    });
  });

  // 初始化时根据当前URL的锚点设置active样式
  const currentHash = window.location.hash;
  if (currentHash) {
    const activeLink = document.querySelector(`ul.sidenav li a[href="${currentHash}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }
});

//准备好的数据
let arr = [
  {
    stuID: 2019001,
    name: "张三",
    grade: "21计科一班",
    age: 20,
    phone: "13412345678",
  },
  {
    stuID: 2019002,
    name: "李四",
    grade: "21计科二班",
    age: 21,
    phone: "13812145679",
  },
  {
    stuID: 2019003,
    name: "王五",
    grade: "21计科三班",
    age: 22,
    phone: "13912345678",
  },
  {
    stuID: 2019004,
    name: "赵六",
    grade: "21信安一班",
    age: 23,
    phone: "13512345678",
  },
  {
    stuID: 2019005,
    name: "田七",
    grade: "21信安二班",
    age: 24,
    phone: "13612345678",
  }
];

let tbody = document.querySelector("tbody");

//渲染数据
renderData(arr);
function renderData(data) {
  //渲染前先清空tbody
  tbody.innerHTML = "";
  data.forEach((item, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.stuID}</td>
      <td>${item.name}</td>
      <td>${item.grade}</td>
      <td>${item.age}</td>
      <td>${item.phone}</td>
      <td>
        <button class="edit" data-id="${item.stuID}" >编辑</button>
        <button class="delete" data-id="${item.stuID}" >删除</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

//搜索功能
document.getElementById('searchButton').addEventListener('click', function () {
  // 获取搜索框中的值
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

  // 如果搜索框为空，显示所有学生信息
  if (searchTerm === '') {
    renderData(arr);
    return;
  }

  // 过滤数组，支持模糊搜索
  const filteredArr = arr.filter(student => {
    return student.name.toLowerCase().includes(searchTerm);
  });

  // 渲染过滤后的数据
  renderData(filteredArr);
});

//删除功能
tbody.addEventListener('click', e => {
  if (e.target.className === 'delete') {
    let stu_id = +e.target.getAttribute('data-id');
    let index = -1; // 初始化为-1，表示未找到
    for (let i = 0; i < arr.length; i++) {
      if (stu_id === arr[i].stuID) {
        index = i;
        break; // 当遍历找到之后，直接退出循环，无需继续查找
      }
    }
    if (index === -1) {
      alert('未找到该学生');
    } else {
      // 通过splice方法删除指定索引的元素
      arr.splice(index, 1);
    }
    renderData(arr);
  }
});

//添加学生功能
document.querySelector('.add-btn').addEventListener('click', e => {
  //阻止form表单自带的提交跳转功能
  e.preventDefault();
  //新增学生信息
  let studentId; //学号，使用数组最后一个元素+1
  if (arr.length === 0) {
    studentId = 2019001;
  } else {
    studentId = +arr[arr.length - 1].stuID + 1; //学号使用数组最后一个元素+1
  }
  let newName = document.querySelector('.name').value.trim();
  let newGrade = document.querySelector('.select-class').value;
  let newAge = document.querySelector('.age').value.trim();
  let newPhone = document.querySelector('.phone').value.trim();
  //阻止空表单提交
  if (newName === '' || newGrade === '' || newAge === '' || newPhone === '') {
    alert('请填写完整信息');
    return;
  }
  //新增学生信息
  arr.push({
    stuID: studentId,
    name: newName,
    grade: newGrade,
    age: newAge,
    phone: newPhone
  });
  //渲染数据
  renderData(arr);
  //当输入的内容提交后，重置表单内容
  document.querySelector('form').reset();
});




// 点击表格上的“添加学生信息”按钮
document.querySelector('.add').addEventListener('click', function () {
  // 获取导航栏的链接
  const navLinks = document.querySelectorAll("ul.sidenav li a");

  // 移除所有链接的active类
  navLinks.forEach(link => link.classList.remove("active"));

  // 添加active类到“添加学生”链接
  const addStudentLink = document.querySelector('ul.sidenav li a[href="#contact"]');
  addStudentLink.classList.add("active");

  // 移除“学生信息”链接的active类
  const studentInfoLink = document.querySelector('ul.sidenav li a[href="#studentInfo"]');
  studentInfoLink.classList.remove("active");
});


