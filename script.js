/* ===== KIỂM TRA ĐĂNG NHẬP ===== */
const currentUser = localStorage.getItem("currentUser");
if (!currentUser) location.href = "login.html";

let users = JSON.parse(localStorage.getItem("users")) || {};
if (!users[currentUser]) location.href = "login.html";

/* ===== DỮ LIỆU MẪU ===== */
const defaultData = {
    1: [
    
        { code: "BAS1150", name: "Triết học Mác - Lênin", credit: 3, score: "" },
        { code: "BAS1201", name: "Đại số", credit: 3, score: "" },
        { code: "BAS1203", name: "Giải tích 1", credit: 3, score: "" },
        { code: "INT1154", name: "Tin học cơ sở 1", credit: 2, score: "" }
    ],
    2: [

        { code: "BAS1151", name: "Kinh tế chính trị Mác - Lênin", credit: 2, score: "" },
        { code: "BAS1157", name: "Tiếng anh (Course 1)", credit: 4, score: "" },
        { code: "BAS1204", name: "Giải tích 2", credit: 3, score: "" },
        { code: "BAS1270", name: "Vật lý ứng dụng", credit: 4, score: "" },
        { code: "BAS1221", name: "Pháp luật đại cương", credit: 2, score: "" },
        { code: "ELE1433", name: "Kỹ thuật số", credit: 2, score: "" },
        { code: "INT1155", name: "Tin học cơ sở 2", credit: 3, score: "" }
    ],
    3: [
        { code: "BAS1152", name: "Chủ nghĩa xã hội khoa học", credit: 2, score: "" },
        { code: "BAS1158", name: "Tiếng anh (Course 2)", credit: 4, score: "" },
        { code: "BAS1269", name: "Xác suất thống kê", credit: 3, score: "" },
        { code: "ELE1330", name: "Xử lý tín hiệu số", credit: 2, score: "" },
        { code: "INT1339", name: "Ngôn ngữ lập trình C++", credit: 3, score: "" },
        { code: "INT1358", name: "Toán rời rạc 1", credit: 3, score: "" }

    ],
    4: [
        { code: "BAS1122", name: "Tư tưởng Hồ Chí Minh", credit: 2, score: "" },
        { code: "BAS1159", name: "Tiếng anh (Course 3)", credit: 4, score: "" },
        { code: "ELE1319", name: "Lý thuyết thông tin", credit: 3, score: "" },
        { code: "INT1306", name: "Cấu trúc dữ liệu và giải thuật", credit: 3, score: "" },
        { code: "INT13145", name: "Kiến trúc máy tính", credit: 3, score: "" },
        { code: "INT1359", name: "Toán rời rạc 2", credit: 3, score: "" }
    ],
    5: [{ code: "INT1332", name: "Lập trình OOP", credit: 3, score: "" }],
    6: [{ code: "INT1336", name: "Mạng máy tính", credit: 3, score: "" }]
};

/* ===== DATA RIÊNG CHO USER ===== */
let data = users[currentUser].grades
    || JSON.parse(JSON.stringify(defaultData));

let currentSemester = 1;

/* ===== THÔNG TIN SINH VIÊN ===== */
function loadStudentInfo() {
    const p = users[currentUser].profile || {};
    const box = document.getElementById("studentInfo");

    box.innerHTML = p.fullname
        ? `<b>${p.fullname} – ${p.mssv || ""}</b><br>
           Lớp: ${p.class || ""} | Ngành: ${p.major || ""} | Khóa: ${p.course || ""}`
        : "<i>Chưa cập nhật thông tin cá nhân</i>";
}

/* ===== QUY ĐỔI ĐIỂM ===== */
function convertScore(score) {
    if (score >= 8.5 && score <9.0) return [3.7, "A"];
    if (score >=8.0 && score < 8.5) return [3.5, "B+"];
    if (score >= 7.0 && score <8.0) return [3, "B"];
    if (score >= 5.5 && score < 6.5) return [2, "C"];
    if (score >= 6.5 && score < 7.0) return [2.5, "C+"];
    if (score >= 4.0) return [1, "D"];
    return [0, "F"];
}

/* ===== LOAD HỌC KỲ ===== */
function loadSemester(sem) {
    currentSemester = sem;
    document.getElementById("semesterTitle").innerText = `Học kỳ ${sem}`;

    document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));
    document.querySelectorAll(".sidebar li")[sem - 1].classList.add("active");

    const tbody = document.getElementById("gradeTable");
    tbody.innerHTML = "";

    data[sem].forEach((m, i) => {
        const [s4, letter] = convertScore(Number(m.score));
        tbody.innerHTML += `
        <tr>
            <td>${m.code}</td>
            <td>${m.name}</td>
            <td>${m.credit}</td>
            <td>
                <input type="number" min="0" max="10" value="${m.score}"
                    onchange="updateScore(${i}, this.value)">
            </td>
            <td>${m.score === "" ? "" : s4}</td>
            <td>${m.score === "" ? "" : letter}</td>
            <td><button class="delete-btn" onclick="deleteSubject(${i})">❌</button></td>
        </tr>`;
    });

    calculateGPA();
}

/* ===== CẬP NHẬT ĐIỂM ===== */
function updateScore(index, value) {
    data[currentSemester][index].score = value;
    users[currentUser].grades = data;
    localStorage.setItem("users", JSON.stringify(users));
    loadSemester(currentSemester);
}

/* ===== GPA ===== */
function calculateGPA() {
    let semScore = 0, semCredit = 0;
    let totalScore = 0, totalCredit = 0;

    Object.values(data).forEach(sem =>
        sem.forEach(m => {
            if (m.score !== "") {
                const [s4] = convertScore(+m.score);
                totalScore += s4 * m.credit;
                totalCredit += m.credit;
            }
        })
    );

    data[currentSemester].forEach(m => {
        if (m.score !== "") {
            const [s4] = convertScore(+m.score);
            semScore += s4 * m.credit;
            semCredit += m.credit;
        }
    });

    document.getElementById("gpaSemester").innerText =
        semCredit ? (semScore / semCredit).toFixed(2) : "0.00";

    document.getElementById("gpaTotal").innerText =
        totalCredit ? (totalScore / totalCredit).toFixed(2) : "0.00";
}

/* ===== THÊM / XÓA MÔN ===== */
function addSubject() {
    const code = prompt("Mã môn:");
    const name = prompt("Tên môn:");
    const credit = prompt("Số tín chỉ:");

    if (!code || !name || !credit) return alert("Nhập thiếu thông tin");

    data[currentSemester].push({ code, name, credit: +credit, score: "" });
    users[currentUser].grades = data;
    localStorage.setItem("users", JSON.stringify(users));
    loadSemester(currentSemester);
}

function deleteSubject(index) {
    if (!confirm("Xóa môn học này?")) return;
    data[currentSemester].splice(index, 1);
    users[currentUser].grades = data;
    localStorage.setItem("users", JSON.stringify(users));
    loadSemester(currentSemester);
}

/* ===== ĐĂNG XUẤT ===== */
function logout() {
    localStorage.removeItem("currentUser");
    location.href = "login.html";
}

/* ===== INIT ===== */
loadStudentInfo();
loadSemester(1);
