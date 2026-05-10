// ISI TABEL PENGGUNA
let dataPengguna = [
    {
        id: "1",
        nama: "Andri Saiful Girsang",
        akun: "andri",
        level: "Administrator",
        status: "aktif",
        kataSandi: "password"
    },
    {
        id: "2",
        nama: "Haditama Yahya Girsang",
        akun: "hadi",
        level: "User",
        status: "aktif",
        kataSandi: "password"
    }
];

const dataOptions = [
    { value: "admin", label: "Administrator" },
    { value: "user", label: "User" },
    { value: "umkm", label: "UMKM" },
    { value: "guest", label: "Guest" }
];

let isEditMode = false;

function loadTablePengguna() {


    // SORT BERDASARKAN LEVEL
    dataPengguna.sort((a, b) =>
        a.level.localeCompare(b.level)
    );

    const tbody = document.getElementById('pengguna-tbl-body');
    tbody.innerHTML = '';

    dataPengguna.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>${item.akun}</td>
                <td>${item.level}</td>
                <td>${item.status}</td>
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

function showPopupHapus(index){
    selectedIndex = index;
    document
        .getElementById('popup-hapus')
        .classList.add('active');
}

let selectedIndex
function showPopupEdit(index){
    isEditMode = true;
        selectedIndex = index;

    const pengguna = dataPengguna[index];

    document.getElementById('edit-nama').value = pengguna.nama;
    document.getElementById('edit-akun').value = pengguna.akun;
    document.getElementById("selectedText").textContent =
        pengguna.level;

    document.getElementById("selectedValue").value =
        pengguna.level;
    document.getElementById('edit-status').value = pengguna.status;

    document
        .getElementById('popup-edit')
        .classList.add('active');
}

function initPopupPengguna(){
    const batalBtn =
        document.getElementById('batal-btn');

    const konfirmasiBtn =
        document.getElementById('konfirmasi-hapus-btn');

    const tambahBtn =
        document.getElementById('add-btn');

    if(batalBtn){
        batalBtn.addEventListener('click', () => {
            document
                .getElementById('popup-hapus')
                .classList.remove('active');
        });
    }

    if(konfirmasiBtn){
        konfirmasiBtn.addEventListener('click', () => {
            dataPengguna.splice(selectedIndex, 1);

            loadTablePengguna();

            document
                .getElementById('popup-hapus')
                .classList.remove('active');
        });
    }

    //POPUP EDIT
    const batalEditBtn = document.getElementById('batal-edit-btn')

    if(batalEditBtn) {
        batalEditBtn.addEventListener('click', () => {
            document.getElementById('popup-edit').classList.remove('active');
        })
    }

    document
        .getElementById('form-edit-pengguna')
        .addEventListener('submit', function(e){

            e.preventDefault();
            const penggunaBaru = {
                nama: document.getElementById('edit-nama').value,
                akun: document.getElementById('edit-akun').value,
                level: document.getElementById('selectedText').textContent,
                status: document.getElementById('edit-status').value
            };

            // EDIT
            if(isEditMode){

                dataPengguna[selectedIndex] = penggunaBaru;

            } else {

                // TAMBAH
                dataPengguna.push(penggunaBaru);
            }

            loadTablePengguna();

            document
                .getElementById('popup-edit')
                .classList.remove('active');
        });

    // tambah data pengguna
    if(tambahBtn){

        tambahBtn.addEventListener('click', () => {

            isEditMode = false;

            // kosongkan form
            document.getElementById('edit-nama').value = '';
            document.getElementById('edit-akun').value = '';
            document.getElementById('previewImage').src = './images/no-image.png';
            document.getElementById('fileInput').value = '';
            document.getElementById('edit-status').value = '';
            document.getElementById('kata-sandi').value = '';
            document.getElementById('ulangi-kata-sandi').value = '';

            // tampilkan popup
            document
                .getElementById('popup-edit')
                .classList.add('active');
        });
    }

    // INPUT GAMBAR
    const fileInput = document.getElementById("fileInput");

    const previewImage = document.getElementById("previewImage");


    // simpan ke global agar bisa dipakai onclick HTML
    window.openExplorer = function(){

        fileInput.click();

    }

    // tampilkan gambar
    if(fileInput){

        fileInput.addEventListener("change", function(){

            const file = this.files[0];

            if(file){

                let imageURL;
                imageURL = URL.createObjectURL(file);

                previewImage.src = imageURL;

                previewImage.style.display = "block";

            }

        });

    }


// CUSTOM SELECT
    const optionsList = document.getElementById("optionsList");
    const selectedText = document.getElementById("selectedText");
    const selectedValue = document.getElementById("selectedValue");
    const customSelect = document.getElementById("customSelect");
    const selectBox = document.getElementById("selectBox");

// 🔥 generate options dari JS
    function renderOptions() {
        optionsList.innerHTML = "";

        dataOptions.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("option");
            div.textContent = item.label;
            div.dataset.value = item.value;

            div.addEventListener("click", () => {
                selectedText.textContent = item.label;
                selectedValue.value = item.value;

                optionsList.style.display = "none";
                customSelect.classList.remove("active");
            });

            optionsList.appendChild(div);
        });
    }

    renderOptions();

// toggle dropdown
    selectBox.addEventListener("click", () => {
        const isOpen = optionsList.style.display === "block";

        if (isOpen) {
            optionsList.style.display = "none";
            customSelect.classList.remove("active");
        } else {
            optionsList.style.display = "block";
            customSelect.classList.add("active");
        }
    });

// pilih option
    document.querySelectorAll(".option").forEach(option => {
        option.addEventListener("click", () => {
            document.getElementById("selectedText").textContent = option.textContent;
            document.getElementById("selectedValue").value = option.dataset.value;

            optionsList.style.display = "none";
            customSelect.classList.remove("active");
        });
    });

// klik luar
    document.addEventListener("click", (e) => {
        if (!customSelect.contains(e.target)) {
            optionsList.style.display = "none";
            customSelect.classList.remove("active");
        }
    });

}

const fileInput = document.getElementById("fileInput");


// Buka explorer
function openExplorer(){

    fileInput.click();

}

// Saat file dipilih


function togglePassword(inputId, button){

    const input = document.getElementById(inputId);
    const icon = button.querySelector("span");

    if(input.type === "password"){

        input.type = "text";

        icon.textContent = "visibility_off";

    }else{

        input.type = "password";

        icon.textContent = "visibility";
    }
}


