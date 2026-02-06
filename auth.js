function register() {
    const u = username.value;
    const p = password.value;

    if (!u || !p) return alert("Nhập đầy đủ!");

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[u]) return alert("Tài khoản đã tồn tại!");

    users[u] = { password: p, profile: {}, grades: null };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    location.href = "login.html";
}

function login() {
    const u = username.value;
    const p = password.value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[u] || users[u].password !== p)
        return alert("Sai tài khoản hoặc mật khẩu!");

    localStorage.setItem("currentUser", u);
    location.href = "profile.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    location.href = "login.html";
}

function saveProfile() {
    const u = localStorage.getItem("currentUser");
    if (!u) return location.href = "login.html";

    let users = JSON.parse(localStorage.getItem("users"));
    users[u].profile = {
        fullname: fullname.value,
        mssv: mssv.value,
        class: document.getElementById("class").value,
        major: major.value,
        course: course.value
    };

    localStorage.setItem("users", JSON.stringify(users));
    alert("Đã lưu thông tin!");
}
