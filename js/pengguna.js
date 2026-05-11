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
const fileInput = document.getElementById("fileInput");

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

function showPopupHapus(index){
    selectedIndex = index;
    document
        .getElementById('popup-hapus')
        .classList.add('active');
}

// tampil edit
function showPopupEdit(index){
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

    resetPasswordVisibility()
}

function bersih(){
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
}

function initPopupPengguna(){
    const optionsList = document.getElementById("optionsList");
    const customSelect = document.getElementById("customSelect");
    const selectBox = document.getElementById("selectBox");

    const batalEditBtn = document.getElementById('batal-edit-btn')
    const batalBtn = document.getElementById('batal-btn');
    const konfirmasiBtn = document.getElementById('konfirmasi-hapus-btn');
    const tambahBtn = document.getElementById('add-btn');

    renderOptions();

    // Tombol Batal
    if(batalBtn){
        batalBtn.addEventListener('click', () => {
            document
                .getElementById('popup-hapus')
                .classList.remove('active');
        });
    }

    //Tombol Konfirmasi Hapus
    if(konfirmasiBtn){
        konfirmasiBtn.addEventListener('click', () => {
            dataPengguna.splice(selectedIndex, 1);

            loadTablePengguna();

            document
                .getElementById('popup-hapus')
                .classList.remove('active');
        });
    }

    //Tombol Batal EDIT
    if(batalEditBtn) {
        batalEditBtn.addEventListener('click', () => {
            document.getElementById('popup-edit').classList.remove('active');
        })
    }

    // Tombol Simpan
    document
        .getElementById('form-edit-pengguna')
        .addEventListener('submit', function(e){

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

            if(isEditMode){
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
        });

    // tambah data pengguna
    if(tambahBtn){

        tambahBtn.addEventListener('click', () => {

            isEditMode = false;

            // kosongkan form
            bersih();


            resetPasswordVisibility()

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



// klik luar custom select
    document.addEventListener("click", (e) => {
        if (!customSelect.contains(e.target)) {
            optionsList.style.display = "none";
            customSelect.classList.remove("active");
        }
    });

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

// Buka explorer
function openExplorer(){
    fileInput.click();
}

// tombol tampil/sembunyikan password
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

// reset tombol tampil/sembunyikan password
function resetPasswordVisibility(){
    const passwordInputs = document.querySelectorAll(
        '#kata-sandi, #ulangi-kata-sandi'
    );

    passwordInputs.forEach(input => {
        input.type = 'password';
        const button = input.parentElement.querySelector('.toggle-password');

        if(button){
            const icon = button.querySelector('span');
            if(icon){
                icon.textContent = 'visibility';
            }
        }
    });
}


