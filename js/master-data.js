let dataLevel = [
    { id: "admin", level: "Administrator" },
    { id: "user", level: "User" },
    { id: "umkm", level: "UMKM" },
    { id: "guest", level: "Guest" }
];

let selectedDeleteIndex = null;

function initMasterData(){
    loadDataLevel();
    doubleKlikLevelist();
    hapusLeveList()
}

function loadDataLevel() {

    const listLevel = document.getElementById("level-list");

    if(!listLevel) return;

    listLevel.innerHTML = "";

    dataLevel.forEach((item, index) => {
        listLevel.innerHTML += `
        <div class="list-item">
            <div>
                <h3>${item.level}</h3>
            </div>

            <button
                class="delete-btn"
                onclick="showDeletePopup(${index})"
            >
                <span class="material-symbols-sharp">
        delete
    </span>
            </button>
        </div>
    `;
    });
}

// DOUBLE CLICK Level List
function doubleKlikLevelist(){

    const listLevel = document.getElementById("level-list");

    if(!listLevel) return;

    listLevel.addEventListener("dblclick", showInputLevel);
}

// TAMPIL INPUT
function showInputLevel(){

    const listLevel = document.getElementById("level-list");

    // cegah input ganda
    if(document.getElementById("new-input")) return;

    const input = document.createElement("input");

    input.type = "text";
    input.id = "new-input";
    input.placeholder = "Tambah level...";

    input.classList.add("new-input");

    listLevel.appendChild(input);

    input.focus();

    // ENTER
    input.addEventListener("keydown", saveLevel);

    // blur
    input.addEventListener("blur", () => {
        input.remove();
    });
}

// SIMPAN DATA
function saveLevel(e){

    if(e.key !== "Enter") return;

    const input = e.target;

    const value = input.value.trim();

    if(value !== ""){

        dataLevel.push({
            id: value.toLowerCase(),
            level: value
        });

        loadDataLevel();
    }

    input.remove();
}

// tampil popup
function showDeletePopup(index){

    selectedDeleteIndex = index;

    document
        .getElementById("popup-delete")
        .classList.add("active");
}

// init popup
function hapusLeveList(){

    const cancelBtn =
        document.getElementById("cancel-delete-btn");

    const confirmBtn =
        document.getElementById("confirm-delete-btn");

    // batal
    cancelBtn.addEventListener("click", () => {

        document
            .getElementById("popup-delete")
            .classList.remove("active");
    });

    // hapus
    confirmBtn.addEventListener("click", () => {

        if(selectedDeleteIndex !== null){

            dataLevel.splice(selectedDeleteIndex, 1);

            loadDataLevel();
        }

        document
            .getElementById("popup-delete")
            .classList.remove("active");
    });
}