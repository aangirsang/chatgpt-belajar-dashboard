// Data Pengguna
let dataPengguna = [
    {
        id: "1",
        nama: "Andri Saiful Girsang",
        akun: "andri",
        level: "Administrator",
        status: true,
        kataSandi: "password"
    },
    {
        id: "2",
        nama: "Haditama Yahya Girsang",
        akun: "hadi",
        level: "User",
        status: true,
        kataSandi: "password"
    }
];

let isEditMode = false;
let selectedIndex

// mengisi table
function loadTablePengguna() {

    // SORT BERDASARKAN LEVEL
    dataPengguna.sort((a, b) =>
        a.level.localeCompare(b.level)
    );

    const tbody = document.getElementById('pengguna-tbl-body');
    tbody.innerHTML = '';

    //mengisi field edit pada table
    dataPengguna.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>${item.akun}</td>
                <td>${item.level}</td>
                <td>${item.status ? 'Aktif' : 'Non-Aktif'}</td>
                <td>
                    <div class="actions">
                        <button onclick="showPopupEdit(${index})">
                            <span class="material-symbols-sharp">edit</span>
                        </button>
                        <button onclick="showPopupHapus(${index})">
                            <span class="material-symbols-sharp">delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

function showPopupHapus(index) {
    selectedIndex = index;
    document
        .getElementById('popup-hapus')
        .classList.add('active');
}

// tampil edit
function showPopupEdit(index) {
    bersih()
    isEditMode = true;
    selectedIndex = index;

    const pengguna = dataPengguna[index];

    document.getElementById('edit-nama').value = pengguna.nama;
    document.getElementById('edit-akun').value = pengguna.akun;
    document.getElementById("selectedText").textContent = pengguna.level;
    document.getElementById("selectedValue").value = pengguna.level;
    document.querySelector(
        `input[name="status"][value="${pengguna.status}"]`
    ).checked = true;
    document.getElementById('kata-sandi').value = pengguna.kataSandi;
    document.getElementById('popup-edit').classList.add('active');
    document.getElementById('previewImage').src = '';

}

function bersih() {
    document.getElementById('edit-nama').value = '';
    document.getElementById('edit-akun').value = '';
    document.getElementById('previewImage').src = '';
    document.getElementById('fileInput').value = '';
    document
        .querySelectorAll('input[name="status"]')
        .forEach(radio => {
            radio.checked = false;
        });
    document.getElementById('kata-sandi').value = '';
    document.getElementById('ulangi-kata-sandi').value = '';


    const selectedText = document.getElementById('selectedText');

    selectedText.textContent = 'Pilih Level Akun';
    selectedText.classList.add('empty');

    resetPasswordVisibility();
}

function initPopupPengguna() {
    const selectBox = document.getElementById("selectBox");

    const popupPengguna = document.getElementById('form-edit-pengguna');

    // Tombol-tombol
    const batalHapusBtn = document.getElementById('batal-btn');
    const konfirmasiHapusBtn = document.getElementById('konfirmasi-hapus-btn');
    const tambahBtn = document.getElementById('add-btn');
    const batalEditBtn = document.getElementById('batal-edit-btn')


    renderOptions(); // isi custom select
    initImageUpload(); // INPUT GAMBAR

    popupPengguna.addEventListener('submit', simpanPengguna); // Tombol Simpan
    batalEditBtn?.addEventListener('click', closePopupEdit); //Tombol Batal EDIT
    batalHapusBtn?.addEventListener('click', closePopupHapus); // Tombol Batal Hapus
    konfirmasiHapusBtn?.addEventListener('click', hapusPengguna); //Tombol Konfirmasi Hapus
    tambahBtn?.addEventListener('click', showPopupTambah); // tambah data pengguna

    // custom select
    selectBox.addEventListener("click", toggleCustomSelect); // toggle dropdown
    document.addEventListener("click", closeCustomSelectOutside); // klik luar custom select

}

// Simpan Pengguna
function simpanPengguna(e) {
    e.preventDefault();
    const penggunaBaru = {
        nama: document.getElementById('edit-nama').value,
        akun: document.getElementById('edit-akun').value,
        //level: document.getElementById('selectedValue').value, // menyimpan value dari custom select
        level: document.getElementById('selectedText').textContent, // minyimpan text dari custom select
        status: document.querySelector(
            'input[name="status"]:checked'
        ).value === 'true',
        kataSandi: document.getElementById('kata-sandi').value,
    };

    if (isEditMode) {
        // EDIT data
        dataPengguna[selectedIndex] = penggunaBaru;

    } else {

        // TAMBAH data
        dataPengguna.push(penggunaBaru);
    }

    loadTablePengguna();

    document
        .getElementById('popup-edit')
        .classList.remove('active');
}

// Buka explorer
function openExplorer() {
    fileInput.click();
}

// tombol tampil/sembunyikan password
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector("span");

    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "visibility_off";
    } else {
        input.type = "password";
        icon.textContent = "visibility";
    }
}

// reset tombol tampil/sembunyikan password
function resetPasswordVisibility() {
    const passwordInputs = document.querySelectorAll(
        '#kata-sandi, #ulangi-kata-sandi'
    );

    passwordInputs.forEach(input => {
        input.type = 'password';
        const button = input.parentElement.querySelector('.toggle-password');

        if (button) {
            const icon = button.querySelector('span');
            if (icon) {
                icon.textContent = 'visibility';
            }
        }
    });
}

// tampil popup tambah pengguna
function showPopupTambah() {

    isEditMode = false;

    bersih(); // kosongkan form

    document.getElementById('popup-edit').classList.add('active'); // tampilkan popup
}

// tutup popup pengguna
function closePopupEdit() {

    document.getElementById('popup-edit').classList.remove('active');

    bersih(); // optional reset form kalau perlu
}

// upload gambar
function initImageUpload() {

    const fileInput = document.getElementById("fileInput");
    const previewImage = document.getElementById("previewImage");

    if (!fileInput || !previewImage) return;

    // fallback kalau gambar error
    previewImage.addEventListener("error", () => {
        previewImage.src = "./images/no-image.png";
    });

    // buka file explorer
    window.openExplorer = function () {
        fileInput.click();
    };

    // preview gambar
    fileInput.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) return;

        previewImage.src = URL.createObjectURL(file);
        previewImage.style.display = "block";
    });
}


// hapus pengguna
function hapusPengguna() {

    if (selectedIndex === null) return;

    dataPengguna.splice(selectedIndex, 1);

    loadTablePengguna();

    document
        .getElementById('popup-hapus')
        .classList.remove('active');
}

// tutup popup hapus
function closePopupHapus() {
    selectedIndex = null; // reset state biar aman

    document
        .getElementById('popup-hapus')
        .classList.remove('active');
}

// isi costum select dari JS
function renderOptions() {
    const optionsList = document.getElementById("optionsList");
    const selectedText = document.getElementById("selectedText");
    const selectedValue = document.getElementById("selectedValue");
    const customSelect = document.getElementById("customSelect");

    optionsList.innerHTML = "";

    dataLevel.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = item.level;
        div.dataset.value = item.id;
        div.addEventListener("click", () => {
            selectedText.textContent = item.level;
            selectedText.classList.remove("empty");
            selectedValue.value = item.id;
            optionsList.style.display = "none";
            customSelect.classList.remove("active");
        });

        optionsList.appendChild(div);
    });
}

// custom select dropdown
function toggleCustomSelect() {
    const optionsList = document.getElementById("optionsList");
    const customSelect = document.getElementById("customSelect");

    const isOpen = optionsList.style.display === "block";

    optionsList.style.display = isOpen ? "none" : "block";
    customSelect.classList.toggle("active", !isOpen);
}

// klik diluar custom select
function closeCustomSelectOutside(e) {
    const optionsList = document.getElementById("optionsList");
    const customSelect = document.getElementById("customSelect");

    const isClickInside = customSelect.contains(e.target);

    if (!isClickInside) {
        optionsList.style.display = "none";
        customSelect.classList.remove("active");
    }
}
