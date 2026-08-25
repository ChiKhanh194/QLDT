/* =========================================================
   KIỂM TRA ĐĂNG NHẬP
========================================================= */

const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    location.href = "login.html";
}

let users = JSON.parse(localStorage.getItem("users")) || {};

if (!users[currentUser]) {
    location.href = "login.html";
}


/* =========================================================
   DỮ LIỆU MẪU
   HỖ TRỢ ĐẦY ĐỦ 7 HỌC KỲ
========================================================= */

const defaultData = {

    /* -----------------------------------------------------
       HỌC KỲ 1 - NĂM HỌC 2023 - 2024
    ----------------------------------------------------- */
    1: [
        {
            code: "BAS1150",
            name: "Triết học Mác - Lênin",
            credit: 3,
            score: ""
        },
        {
            code: "BAS1201",
            name: "Đại số",
            credit: 3,
            score: ""
        },
        {
            code: "BAS1203",
            name: "Giải tích 1",
            credit: 3,
            score: ""
        },
        {
            code: "INT1154",
            name: "Tin học cơ sở 1",
            credit: 2,
            score: ""
        }
    ],


    /* -----------------------------------------------------
       HỌC KỲ 2 - NĂM HỌC 2023 - 2024
    ----------------------------------------------------- */
    2: [
        {
            code: "BAS1151",
            name: "Kinh tế chính trị Mác - Lênin",
            credit: 2,
            score: ""
        },
        {
            code: "BAS1157",
            name: "Tiếng anh (Course 1)",
            credit: 4,
            score: ""
        },
        {
            code: "BAS1204",
            name: "Giải tích 2",
            credit: 3,
            score: ""
        },
        {
            code: "BAS1270",
            name: "Vật lý ứng dụng",
            credit: 4,
            score: ""
        },
        {
            code: "BAS1221",
            name: "Pháp luật đại cương",
            credit: 2,
            score: ""
        },
        {
            code: "ELE1433",
            name: "Kỹ thuật số",
            credit: 2,
            score: ""
        },
        {
            code: "INT1155",
            name: "Tin học cơ sở 2",
            credit: 3,
            score: ""
        }
    ],


    /* -----------------------------------------------------
       HỌC KỲ 1 - NĂM HỌC 2024 - 2025
    ----------------------------------------------------- */
    3: [
        {
            code: "BAS1152",
            name: "Chủ nghĩa xã hội khoa học",
            credit: 2,
            score: ""
        },
        {
            code: "BAS1158",
            name: "Tiếng anh (Course 2)",
            credit: 4,
            score: ""
        },
        {
            code: "BAS1269",
            name: "Xác suất thống kê",
            credit: 3,
            score: ""
        },
        {
            code: "ELE1330",
            name: "Xử lý tín hiệu số",
            credit: 2,
            score: ""
        },
        {
            code: "INT1339",
            name: "Ngôn ngữ lập trình C++",
            credit: 3,
            score: ""
        },
        {
            code: "INT1358",
            name: "Toán rời rạc 1",
            credit: 3,
            score: ""
        }
    ],


    /* -----------------------------------------------------
       HỌC KỲ 2 - NĂM HỌC 2024 - 2025
    ----------------------------------------------------- */
    4: [
        {
            code: "BAS1122",
            name: "Tư tưởng Hồ Chí Minh",
            credit: 2,
            score: ""
        },
        {
            code: "BAS1159",
            name: "Tiếng anh (Course 3)",
            credit: 4,
            score: ""
        },
        {
            code: "ELE1319",
            name: "Lý thuyết thông tin",
            credit: 3,
            score: ""
        },
        {
            code: "INT1306",
            name: "Cấu trúc dữ liệu và giải thuật",
            credit: 3,
            score: ""
        },
        {
            code: "INT13145",
            name: "Kiến trúc máy tính",
            credit: 3,
            score: ""
        },
        {
            code: "INT1359",
            name: "Toán rời rạc 2",
            credit: 3,
            score: ""
        }
    ],


    /* -----------------------------------------------------
       HỌC KỲ 3 - NĂM HỌC 2024 - 2025
    ----------------------------------------------------- */
    5: [
        {
            code: "INT1332",
            name: "Lập trình OOP",
            credit: 3,
            score: ""
        }
    ],


    /* -----------------------------------------------------
       HỌC KỲ 1 - NĂM HỌC 2025 - 2026
    ----------------------------------------------------- */
    6: [
        {
            code: "INT1336",
            name: "Mạng máy tính",
            credit: 3,
            score: ""
        }
    ],


    /* -----------------------------------------------------
       HỌC KỲ 2 - NĂM HỌC 2025 - 2026

       QUAN TRỌNG:
       Học kỳ 7 được tạo sẵn để tránh lỗi
       data[7] is undefined.
    ----------------------------------------------------- */
    7: []
};


/* =========================================================
   DATA RIÊNG CHO USER
========================================================= */

/*
    Nếu user chưa có grades:
    -> tạo dữ liệu mặc định.

    Nếu user đã có grades cũ:
    -> lấy dữ liệu cũ.

    Sau đó luôn kiểm tra đủ 7 học kỳ.
*/

let data;

if (users[currentUser].grades) {

    data = JSON.parse(
        JSON.stringify(users[currentUser].grades)
    );

} else {

    data = JSON.parse(
        JSON.stringify(defaultData)
    );
}


/* =========================================================
   ĐẢM BẢO ĐỦ 7 HỌC KỲ
========================================================= */

/*
    Đây là phần sửa quan trọng nhất.

    Những tài khoản được tạo từ trước có thể chỉ có:
    1, 2, 3, 4, 5, 6

    nên khi mở học kỳ 7:
    data[7] === undefined

    Đoạn này sẽ tự động tạo:
    data[7] = []
*/

for (let i = 1; i <= 7; i++) {

    if (!Array.isArray(data[i])) {
        data[i] = [];
    }
}


/* =========================================================
   LƯU DATA SAU KHI BỔ SUNG HỌC KỲ
========================================================= */

users[currentUser].grades = data;

localStorage.setItem(
    "users",
    JSON.stringify(users)
);


/* =========================================================
   HỌC KỲ HIỆN TẠI
========================================================= */

let currentSemester = 1;


/* =========================================================
   THÔNG TIN SINH VIÊN
========================================================= */

function loadStudentInfo() {

    const p = users[currentUser].profile || {};

    const box = document.getElementById("studentInfo");

    if (!box) return;

    box.innerHTML = p.fullname

        ? `
            <b>${p.fullname} – ${p.mssv || ""}</b>
            <br>
            Lớp: ${p.class || ""}
            |
            Ngành: ${p.major || ""}
            |
            Khóa: ${p.course || ""}
        `

        : `
            <i>Chưa cập nhật thông tin cá nhân</i>
        `;
}


/* =========================================================
   QUY ĐỔI ĐIỂM
========================================================= */

function convertScore(score) {

    if (isNaN(score)) {
        return [0, "F"];
    }

    if (score >= 8.5 && score <= 10) {
        return [3.7, "A"];
    }

    if (score >= 8.0 && score < 8.5) {
        return [3.5, "B+"];
    }

    if (score >= 7.0 && score < 8.0) {
        return [3, "B"];
    }

    if (score >= 6.5 && score < 7.0) {
        return [2.5, "C+"];
    }

    if (score >= 5.5 && score < 6.5) {
        return [2, "C"];
    }

    if (score >= 4.0 && score < 5.5) {
        return [1, "D"];
    }

    return [0, "F"];
}


/* =========================================================
   LOAD HỌC KỲ
========================================================= */

function loadSemester(sem) {

    currentSemester = Number(sem);


    /* -----------------------------------------------------
       KIỂM TRA HỌC KỲ
    ----------------------------------------------------- */

    if (currentSemester < 1 || currentSemester > 7) {
        currentSemester = 1;
    }


    /* -----------------------------------------------------
       TIÊU ĐỀ
    ----------------------------------------------------- */

    const semesterTitle =
        document.getElementById("semesterTitle");

    if (semesterTitle) {

        const semesterNames = {
            1: "Học kỳ 1 - Năm học 2023 - 2024",
            2: "Học kỳ 2 - Năm học 2023 - 2024",
            3: "Học kỳ 1 - Năm học 2024 - 2025",
            4: "Học kỳ 2 - Năm học 2024 - 2025",
            5: "Học kỳ 3 - Năm học 2024 - 2025",
            6: "Học kỳ 1 - Năm học 2025 - 2026",
            7: "Học kỳ 2 - Năm học 2025 - 2026"
        };

        semesterTitle.innerText =
            semesterNames[currentSemester] ||
            `Học kỳ ${currentSemester}`;
    }


    /* -----------------------------------------------------
       ACTIVE SIDEBAR
    ----------------------------------------------------- */

    document
        .querySelectorAll(".sidebar li")
        .forEach(li => {
            li.classList.remove("active");
        });


    const semesterItems =
        document.querySelectorAll(".sidebar li");


    if (semesterItems[currentSemester - 1]) {

        semesterItems[currentSemester - 1]
            .classList.add("active");
    }


    /* -----------------------------------------------------
       ĐẢM BẢO DATA HỌC KỲ TỒN TẠI
    ----------------------------------------------------- */

    if (!Array.isArray(data[currentSemester])) {

        data[currentSemester] = [];

        users[currentUser].grades = data;

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );
    }


    /* -----------------------------------------------------
       BẢNG ĐIỂM
    ----------------------------------------------------- */

    const tbody =
        document.getElementById("gradeTable");

    if (!tbody) return;

    tbody.innerHTML = "";


    /* -----------------------------------------------------
       HIỂN THỊ MÔN
    ----------------------------------------------------- */

    data[currentSemester].forEach((m, i) => {

        const hasScore =
            m.score !== "" &&
            m.score !== null &&
            m.score !== undefined;

        const numericScore =
            Number(m.score);

        const [s4, letter] =
            convertScore(numericScore);


        tbody.innerHTML += `
            <tr>

                <td>
                    ${escapeHTML(m.code)}
                </td>

                <td>
                    ${escapeHTML(m.name)}
                </td>

                <td>
                    ${m.credit}
                </td>

                <td>

                    <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value="${hasScore ? m.score : ""}"
                        onchange="updateScore(${i}, this.value)"
                    >

                </td>

                <td>
                    ${hasScore ? s4 : ""}
                </td>

                <td>
                    ${hasScore ? letter : ""}
                </td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteSubject(${i})"
                        title="Xóa môn học"
                    >
                        ✅
                    </button>

                </td>

            </tr>
        `;
    });


    /* -----------------------------------------------------
       TÍNH GPA
    ----------------------------------------------------- */

    calculateGPA();
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   CẬP NHẬT ĐIỂM
========================================================= */

function updateScore(index, value) {

    if (!data[currentSemester]) {
        data[currentSemester] = [];
    }


    /* -----------------------------------------------------
       Cho phép xóa điểm
    ----------------------------------------------------- */

    if (value === "") {

        data[currentSemester][index].score = "";

    } else {

        let score = Number(value);

        /* Giới hạn điểm từ 0 đến 10 */

        if (isNaN(score)) {
            score = "";
        }

        if (score !== "") {

            if (score < 0) {
                score = 0;
            }

            if (score > 10) {
                score = 10;
            }
        }

        data[currentSemester][index].score = score;
    }


    /* -----------------------------------------------------
       LƯU
    ----------------------------------------------------- */

    users[currentUser].grades = data;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    /* -----------------------------------------------------
       LOAD LẠI
    ----------------------------------------------------- */

    loadSemester(currentSemester);
}


/* =========================================================
   TÍNH GPA
========================================================= */

function calculateGPA() {

    let semScore = 0;
    let semCredit = 0;

    let totalScore = 0;
    let totalCredit = 0;


    /* -----------------------------------------------------
       GPA TÍCH LŨY
    ----------------------------------------------------- */

    Object.values(data).forEach(sem => {

        if (!Array.isArray(sem)) return;


        sem.forEach(m => {

            if (
                m.score !== "" &&
                m.score !== null &&
                m.score !== undefined &&
                !isNaN(Number(m.score))
            ) {

                const [s4] =
                    convertScore(Number(m.score));

                const credit =
                    Number(m.credit) || 0;

                totalScore +=
                    s4 * credit;

                totalCredit +=
                    credit;
            }
        });
    });


    /* -----------------------------------------------------
       GPA HỌC KỲ HIỆN TẠI
    ----------------------------------------------------- */

    if (!Array.isArray(data[currentSemester])) {

        data[currentSemester] = [];
    }


    data[currentSemester].forEach(m => {

        if (
            m.score !== "" &&
            m.score !== null &&
            m.score !== undefined &&
            !isNaN(Number(m.score))
        ) {

            const [s4] =
                convertScore(Number(m.score));

            const credit =
                Number(m.credit) || 0;

            semScore +=
                s4 * credit;

            semCredit +=
                credit;
        }
    });


    /* -----------------------------------------------------
       HIỂN THỊ GPA HỌC KỲ
    ----------------------------------------------------- */

    const gpaSemester =
        document.getElementById("gpaSemester");

    if (gpaSemester) {

        gpaSemester.innerText =
            semCredit
                ? (semScore / semCredit).toFixed(2)
                : "0.00";
    }


    /* -----------------------------------------------------
       HIỂN THỊ GPA TÍCH LŨY
    ----------------------------------------------------- */

    const gpaTotal =
        document.getElementById("gpaTotal");

    if (gpaTotal) {

        gpaTotal.innerText =
            totalCredit
                ? (totalScore / totalCredit).toFixed(2)
                : "0.00";
    }
}


/* =========================================================
   THÊM MÔN
========================================================= */

function addSubject() {

    /* -----------------------------------------------------
       ĐẢM BẢO HỌC KỲ HIỆN TẠI TỒN TẠI

       Đây chính là phần sửa lỗi học kỳ 7.
    ----------------------------------------------------- */

    if (!Array.isArray(data[currentSemester])) {

        data[currentSemester] = [];
    }


    /* -----------------------------------------------------
       NHẬP MÃ MÔN
    ----------------------------------------------------- */

    const code =
        prompt("Mã môn:");

    if (!code || !code.trim()) {

        alert("Bạn chưa nhập mã môn!");

        return;
    }


    /* -----------------------------------------------------
       NHẬP TÊN MÔN
    ----------------------------------------------------- */

    const name =
        prompt("Tên môn:");

    if (!name || !name.trim()) {

        alert("Bạn chưa nhập tên môn!");

        return;
    }


    /* -----------------------------------------------------
       NHẬP SỐ TÍN CHỈ
    ----------------------------------------------------- */

    const creditInput =
        prompt("Số tín chỉ:");


    if (
        !creditInput ||
        creditInput.trim() === ""
    ) {

        alert("Bạn chưa nhập số tín chỉ!");

        return;
    }


    const credit =
        Number(creditInput);


    if (
        isNaN(credit) ||
        credit <= 0
    ) {

        alert("Số tín chỉ không hợp lệ!");

        return;
    }


    /* -----------------------------------------------------
       THÊM MÔN
    ----------------------------------------------------- */

    data[currentSemester].push({

        code: code.trim(),

        name: name.trim(),

        credit: credit,

        score: ""
    });


    /* -----------------------------------------------------
       LƯU DATA
    ----------------------------------------------------- */

    users[currentUser].grades = data;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    /* -----------------------------------------------------
       HIỂN THỊ LẠI
    ----------------------------------------------------- */

    loadSemester(currentSemester);
}


/* =========================================================
   XÓA MÔN
========================================================= */

function deleteSubject(index) {

    if (
        !Array.isArray(data[currentSemester])
    ) {
        return;
    }


    if (
        index < 0 ||
        index >= data[currentSemester].length
    ) {
        return;
    }


    const subject =
        data[currentSemester][index];


    const confirmDelete =
        confirm(
            `Xóa môn "${subject.name}"?`
        );


    if (!confirmDelete) {
        return;
    }


    /* -----------------------------------------------------
       XÓA
    ----------------------------------------------------- */

    data[currentSemester].splice(
        index,
        1
    );


    /* -----------------------------------------------------
       LƯU
    ----------------------------------------------------- */

    users[currentUser].grades = data;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    /* -----------------------------------------------------
       LOAD LẠI
    ----------------------------------------------------- */

    loadSemester(currentSemester);
}


/* =========================================================
   ĐĂNG XUẤT
========================================================= */

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    location.href =
        "login.html";
}


/* =========================================================
   INIT
========================================================= */

loadStudentInfo();

loadSemester(1);
