const formContainer = document.getElementById("form_container");
const container = document.getElementById("content");
const nav = document.getElementById("nav");
const userId = document.getElementById("userid");
const home = document.getElementById("home");
const dropDown = document.getElementById("Role");
let focus = "home";
let uid = "";
let flag = "";

const format = ["Name", "Edition", "Author", "Publisher", "Avl Copies"];

const Arr = [
    [
        ["Data Structures", "2nd", "Reema Thareja", "Oxford", 15],
        ["Introduction to Machine Learning", "3rd", "Ethem Alpaydin", "PHI Learning", 5],
        ["Deep Learning", "3rd", "Ian Goodfellow", "The MIT Press", 7]
    ],
    [
        ["Introduction to Algorithms", "4th", "Thomas H. Cormen", "The MIT Press", 10],
        ["Computer Networks", "5th", "Andrew S. Tanenbaum", "Pearson", 12],
        ["Operating System Concepts", "9th", "Abraham Silberschatz", "Wiley", 8]
    ],
    [
        ["Artificial Intelligence: A Modern Approach", "4th", "Stuart Russell", "Pearson", 6],
        ["Database System Concepts", "7th", "Silberschatz, Korth, Sudarshan", "McGraw Hill", 11],
        ["Software Engineering", "10th", "Ian Sommerville", "Pearson", 9]
    ],
    [
        ["Computer Vision", "3rd", "David L. Poole", "Springer", 14],
        ["Human-Computer Interaction", "4th", "Jenny Preece", "Wiley", 5],
        ["Computer Graphics", "2nd", "Donald Hearn", "Prentice Hall", 7]
    ]
];

const borrowed = [];

document.addEventListener("click", (e) => {
    if (e.target.id === "btn") {
        if (userId.value === "" && dropDown.value === "--Select--") {
            alert("Please enter a userID and role");
        } else if (userId.value === "" && dropDown.value !== "--Select--") {
            alert("Please enter your ID...");
        } else if (dropDown.value === "--Select--" && userId.value !== "") {
            alert("Please select your role");
        } else {
            e.preventDefault();
            uid = userId.value;
            flag = dropDown.value;
            focus = "home";
            formContainer.style.display = "none";
            document.getElementById("outer").style.display = "flex";
            container.style.display = "flex";
            nav.style.display = "flex";
            itemFocus(focus);
        }
    } else if (e.target.id === "log_out_btn") {
        uid = "";
        itemClose(focus);
        container.style.display = "none";
        nav.style.display = "none";
        document.getElementById("outer").style.display = "none";
        formContainer.style.display = "flex";
        userId.value = "";
    } else if (["profile_btn", "a", "profile_open", "u", "uid"].includes(e.target.id)) {
        profileClicked();
    } else {
        profileOutFocus();
        const idMap = {
            "home": "home",
            "0": "0",
            "1": "1",
            "2": "2",
            "3": "3",
            "d5": "d5",
            "d6": "d6",
            "d7": "d7",
            "d8": "d8"
        };
        const newFocus = idMap[e.target.id];
        if (newFocus) {
            itemClose(focus);
            focus = newFocus;
            itemFocus(focus);
        }
    }
});

function deptActivate(focus) {
    if (focus === "home") {
        const div1 = document.createElement("div");
        div1.className = "div2";
        const div2 = document.createElement("div");
        div2.className = "div2";
        const div3 = document.createElement("div");
        div3.className = "div3";
        const div4 = document.createElement("div");
        div4.className = "div3";

        const h = document.createElement("h");
        h.innerHTML = "12345";
        const p = document.createElement("p");
        p.innerHTML = "No. of books in our library";
        div3.appendChild(h);
        div3.appendChild(p);

        div2.appendChild(div3);

        const head = document.createElement("h1");
        head.innerHTML = "NTR Vignan Library";
        div1.appendChild(head);

        const h1 = document.createElement("h");
        h1.innerHTML = "76845";
        const p1 = document.createElement("p");
        p1.innerHTML = "No. of editions in our library";
        div4.appendChild(h1);
        div4.appendChild(p1);

        div2.appendChild(div4);

        container.appendChild(div1);
        container.appendChild(div2);
        container.appendChild(borrowList()); // Include the borrowed list
    } else {
        const c = document.createElement("div");
        c.className = "div2";
        c.appendChild(books(focus));
        container.appendChild(c);
    }
}

function itemFocus(focus) {
    const item = document.getElementById(focus);
    item.style.backgroundColor = "#081b29";
    item.style.borderRadius = "15px";
    item.style.color = "Deeppink";
    item.style.fontWeight = "900";
    deptActivate(focus);
}

function itemClose(focus) {
    const item = document.getElementById(focus);
    item.style = "";
    while (container.lastChild !== document.getElementById("profile_open")) {
        container.removeChild(container.lastChild);
    }
}

function profileClicked() {
    document.getElementById("profile_open").style.display = "flex";
    document.getElementById("uid").innerHTML = uid;
}

function profileOutFocus() {
    document.getElementById("profile_open").style.display = "none";
}

function books(focus) {
    const x = Number(focus);
    const A = Arr[x];
    const t = document.createElement("table");
    t.className = "div2";
    t.id = "table-1";

    const head = t.insertRow();
    format.forEach(header => {
        const node = head.insertCell();
        node.textContent = header;
    });
    const node = head.insertCell();
    node.textContent = "Borrow";

    A.forEach((book, i) => {
        const row = t.insertRow();
        book.forEach((data, j) => {
            const cell = row.insertCell();
            cell.textContent = j === 4 ? parseInt(data) : data;
        });

        const borrowCell = row.insertCell();
        const btn = document.createElement("button");
        btn.textContent = "Borrow";
        btn.id = `${focus}${i}`;
        btn.addEventListener("click", () => borrowBook(btn.id));
        borrowCell.appendChild(btn);
    });

    return t;
}

function borrowBook(id) {
    const [section, index] = [Number(id[0]), Number(id.slice(1))];
    const book = Arr[section][index];
    if (book[4] > 0) {
        book[4] -= 1;
        borrowed.push([book[0], uid, id]);
        console.log(borrowed);
    } else {
        alert("Sorry, this book is not available.");
    }
    itemClose(focus);
    itemFocus(focus);
}

function borrowList() {
    const t = document.createElement("table");
    t.className = "div2";

    borrowed.forEach((x, i) => {
        const row = t.insertRow();
        row.insertCell().textContent = x[0]; // Book Name
        row.insertCell().textContent = x[1]; // User ID
        if (x[1] === uid) { // Only allow return button if the current user borrowed the book
            const btn = document.createElement("button");
            btn.textContent = "Return";
            btn.id = i;
            btn.addEventListener("click", () => returnBook(i));
            row.insertCell().appendChild(btn);
        }
    });
    if(borrowed.length!==0){
        t.id = "table-1";
    }

    return t;
}

function returnBook(i) {
    const book = borrowed[i];
    borrowed.splice(i, 1); // Remove from borrowed list
    
    // Extract the book's section and index
    const [section, index] = [Number(book[2][0]), Number(book[2].slice(1))];
    Arr[section][index][4] += 1; // Increase book availability

    // Refresh the UI
    itemClose(focus);
    itemFocus(focus);
}

