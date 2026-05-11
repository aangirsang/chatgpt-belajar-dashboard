let dataLevel = [
    { id: "admin", level: "Administrator" },
    { id: "user", level: "User" },
    { id: "umkm", level: "UMKM" },
    { id: "guest", level: "Guest" }
];

let dataKategori = [
    { id: "1", kategori: "Makanan dan Minuman" },
    { id: "2", kategori: "Fashion" },
    { id: "3", kategori: "Craft" },
    { id: "4", kategori: "Peternakan" }
];

let selectedDeleteIndex = null;
let selectedDeleteType = null;

// INIT
function initMasterData() {

    loadDataLevel();
    loadDataKategori();

    doubleKlikList("level-list", "level");
    doubleKlikList("kategori-list", "kategori");

    enableEditList("level-list", "level");
    enableEditList("kategori-list", "kategori");

    initDeletePopup();
}

// LOAD LEVEL
function loadDataLevel() {

    const listLevel = document.getElementById("level-list");

    if (!listLevel) return;

    listLevel.innerHTML = "";

    dataLevel.forEach((item, index) => {

        listLevel.innerHTML += `
            <div class="list-item">
                <div>
                    <h3>${item.level}</h3>
                </div>

                <button
                    class="delete-btn"
                    onclick="showDeletePopup(${index}, 'level')"
                >
                    <span class="material-symbols-sharp">
                        delete
                    </span>
                </button>
            </div>
        `;
    });
}

// LOAD KATEGORI
function loadDataKategori() {

    const listKategori = document.getElementById("kategori-list");

    if (!listKategori) return;

    listKategori.innerHTML = "";

    dataKategori.forEach((item, index) => {

        listKategori.innerHTML += `
            <div class="list-item">
                <div>
                    <h3>${item.kategori}</h3>
                </div>

                <button
                    class="delete-btn"
                    onclick="showDeletePopup(${index}, 'kategori')"
                >
                    <span class="material-symbols-sharp">
                        delete
                    </span>
                </button>
            </div>
        `;
    });
}

// DOUBLE CLICK
function doubleKlikList(listId, type) {

    const list = document.getElementById(listId);

    if (!list) return;

    list.addEventListener("dblclick", () => {
        showInput(listId, type);
    });
}

// TAMPIL INPUT
function showInput(listId, type) {

    const container = document.getElementById(listId);

    if (!container) return;

    // cegah input ganda
    if (document.getElementById("new-input")) return;

    const input = document.createElement("input");

    input.type = "text";
    input.id = "new-input";
    input.placeholder = "Tambah data...";

    input.classList.add("new-input");

    container.appendChild(input);

    input.focus();

    // KEYDOWN
    input.addEventListener("keydown", (e) => {

        // ESC = batal tambah
        if (e.key === "Escape") {

            input.remove();

            return;
        }

        // ENTER = simpan
        saveData(e, type);
    });

    // blur hapus input
    input.addEventListener("blur", () => {

        input.remove();
    });
}

// SIMPAN DATA
function saveData(e, type) {

    if (e.key !== "Enter") return;

    const input = e.target;

    const value = input.value.trim();

    // kosong
    if (value === "") return;

    // CEK DUPLICATE
    if (isDuplicate(value, type)) {

        input.classList.add("duplicate");

        setTimeout(() => {

            input.classList.remove(
                "duplicate"
            );

        }, 400);

        return;
    }

    // LEVEL
    if (type === "level") {

        dataLevel.push({

            id: value.toLowerCase(),

            level: value
        });

        loadDataLevel();
    }

    // KATEGORI
    if (type === "kategori") {

        dataKategori.push({

            id: Date.now().toString(),

            kategori: value
        });

        loadDataKategori();
    }

    input.remove();
}

// TAMPIL POPUP
function showDeletePopup(index, type) {

    selectedDeleteIndex = index;
    selectedDeleteType = type;

    document
        .getElementById("popup-delete")
        .classList.add("active");
}

// INIT POPUP
function initDeletePopup() {

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

        if (selectedDeleteIndex !== null) {

            if (selectedDeleteType === "level") {

                dataLevel.splice(selectedDeleteIndex, 1);

                loadDataLevel();
            }

            if (selectedDeleteType === "kategori") {

                dataKategori.splice(selectedDeleteIndex, 1);

                loadDataKategori();
            }
        }

        document
            .getElementById("popup-delete")
            .classList.remove("active");
    });
}

// DOUBLE CLICK LIST ITEM = EDIT
function enableEditList(listId, type) {

    const list = document.getElementById(listId);

    if (!list) return;

    list.addEventListener("dblclick", (e) => {

        const itemElement =
            e.target.closest(".list-item");

        // kalau bukan item
        if (!itemElement) return;

        // cegah edit multiple
        if (itemElement.querySelector("input")) return;

        const title =
            itemElement.querySelector("h3");

        const deleteBtn =
            itemElement.querySelector(".delete-btn");

        // disable tombol delete
        deleteBtn.classList.add("delete-disabled");

        const oldValue = title.textContent;

        // index item
        const items =
            [...list.querySelectorAll(".list-item")];

        const index =
            items.indexOf(itemElement);

        // buat input
        const input =
            document.createElement("input");

        input.type = "text";
        input.value = oldValue;

        input.classList.add("edit-input");

        // ganti h3 jadi input
        title.replaceWith(input);

        input.focus();
        input.select();

        // CANCEL
        function cancelEdit() {

            // aktifkan tombol delete
            deleteBtn.classList.remove(
                "delete-disabled"
            );

            // balikin text lama
            const h3 =
                document.createElement("h3");

            h3.textContent = oldValue;

            input.replaceWith(h3);
        }

        // SAVE
        function saveEdit() {

            const newValue =
                input.value.trim();

            // aktifkan lagi tombol delete
            deleteBtn.classList.remove(
                "delete-disabled"
            );

            if (newValue !== "") {

                // cek duplicate
                if (
                    isDuplicate(
                        newValue,
                        type,
                        index
                    )
                ) {

                    input.classList.add("duplicate");

                    setTimeout(() => {

                        input.classList.remove(
                            "duplicate"
                        );

                    }, 400);

                    return;
                }

                if (type === "level") {

                    dataLevel[index].level =
                        newValue;

                    dataLevel[index].id =
                        newValue.toLowerCase();

                    loadDataLevel();
                }

                if (type === "kategori") {

                    dataKategori[index].kategori =
                        newValue;

                    loadDataKategori();
                }
            }
            else {

                // kosong = balik lagi
                cancelEdit();
            }
        }

        // KEYDOWN
        input.addEventListener("keydown", (e) => {

            // ENTER = save
            if (e.key === "Enter") {

                saveEdit();
            }

            // ESC = cancel
            if (e.key === "Escape") {

                cancelEdit();
            }
        });

        // BLUR
        input.addEventListener("blur", saveEdit);
    });
}

function isDuplicate(value, type, currentIndex = -1) {

    const text =
        value.trim().toLowerCase();

    // LEVEL
    if (type === "level") {

        return dataLevel.some((item, index) => {

            return (
                item.level.toLowerCase() === text &&
                index !== currentIndex
            );
        });
    }

    // KATEGORI
    if (type === "kategori") {

        return dataKategori.some((item, index) => {

            return (
                item.kategori.toLowerCase() === text &&
                index !== currentIndex
            );
        });
    }

    return false;
}