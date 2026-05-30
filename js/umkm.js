
let currentPage = 1;
let searchKeywordUmkm = "";
let openedDetailId = null;
const rowsPerPage = 13;

let sortField = "namaUsaha";
let sortDirection = "asc";

let selectedUmkm;

let isEditModeUmkm = false;

function initUmkm() {
    const popupUmkm = document.getElementById("popup-edit-umkm");

    const batalHapusBtn = document.getElementById('batal-hapus-btn');
    const konfirmasiHapusBtn = document.getElementById('konfirmasi-hapus-btn');
    const tambahBtn = document.getElementById('add-UMKM-btn');
    const batalEditBtn = document.getElementById('batal-umkm-btn');

    popupUmkm.addEventListener('submit', simpanUmkm);

    loadTableUMKM();
    bersihUmkm();

    // custom select
    customSelectUmkm()
    document.getElementById("selectBoxUmkmKategori")
        .addEventListener("click", bukaSelectUmkm);
    document.addEventListener("click", tutupSelectUmkm); // klik luar custom select

    tambahBtn?.addEventListener('click', () => showPopupTambahUMKM(false));
    batalHapusBtn?.addEventListener('click',() => closePopup("popup-hapus-umkm"));
    konfirmasiHapusBtn?.addEventListener('click', hapusUmkm);
    batalEditBtn?.addEventListener('click',() => closePopup("popup-edit-umkm"));

    const searchInput = document.getElementById("search-umkm");

    searchInput?.addEventListener("input", cariUmkm);
    document.addEventListener("click", closeDetailOutside);
}

// Bersih
function bersihUmkm(){

    const ids = [
        'umkm-nama-usaha',
        'umkm-deskripsi-usaha',
        'umkm-nama-pemilik',
        'umkm-ktp',
        'umkm-tanggal-lahir',
        'umkm-alamat',
        'umkm-email',
        'umkm-telp',
        'umkm-wa',
        'umkm-instagram',
        'umkm-facebook'

    ];

    ids.forEach(id => {
        document.getElementById(id).value = "";
    });

    // reset radio
    ['status', 'jenis-kelamin'].forEach(name =>
        document.querySelectorAll(`input[name="${name}"]`)
            .forEach(input => input.checked = false)
    );

    resetSelectUmkm();

}

// LOAD TABLE
function loadTableUMKM() {

    let filteredData = dataUMKM.filter(item => {

        // gabungkan semua value object jadi 1 text
        const semuaData = Object.values(item)
            .join(" ")
            .toLowerCase();

        return semuaData.includes(searchKeywordUmkm);
    });

    filteredData.sort((a, b) => {

        let valueA = a[sortField];
        let valueB = b[sortField];

        // boolean
        if(typeof valueA === "boolean"){

            valueA = valueA ? 1 : 0;
            valueB = valueB ? 1 : 0;
        }

        // string
        if(typeof valueA === "string"){

            const result = valueA.localeCompare(valueB);

            return sortDirection === "asc"
                ? result
                : -result;
        }

        // number
        const result = valueA - valueB;

        return sortDirection === "asc"
            ? result
            : -result;
    });

    const tbody = document.getElementById("umkm-tbl-body");

    tbody.innerHTML = '';

    // PAGINATION
    const start = (currentPage - 1) * rowsPerPage;

    const end = start + rowsPerPage;

    const paginatedData = filteredData.slice(start, end);

    paginatedData.forEach((item) => {

        const isOpened = openedDetailId === item.id;

        tbody.innerHTML += `
        
        <!-- ROW -->
        <tr class="umkm-row"
            onclick="toggleDetail(${item.id})">

            <td>${item.namaUsaha}</td>
            <td>${item.namaPemilik}</td>
            <td>${item.noTelp}</td>
            <td>${item.alamat}</td>
            <td>${
                dataKategori.find(k => k.id === item.kategoriId)?.kategori || "-"
            }</td>
            <td>${item.status ? 'Aktif' : 'Non-Aktif'}</td>

            <td>
                <div class="actions">
                    <button onclick="event.stopPropagation(); showPopupEditUMKM(${item.id})">
                        <span class="material-symbols-sharp">edit</span>
                    </button>

                    <button onclick="event.stopPropagation(); showPopupHapus(${item.id})">
                        <span class="material-symbols-sharp">delete</span>
                    </button>
                </div>

            </td>

        </tr>

        <!-- DETAIL -->
        <tr class="detail-row ${isOpened ? 'show' : ''}">
            <td colspan="7">
                <div class="detail-content">
                    <table class="detail-horizontal-table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Facebook</th>
                                <th>Instagram</th>
                                <th>WhatsApp</th>
                                <th>Tanggal Registrasi</th>
                                <th>Deskripsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${item.email}</td>
                                <td>${item.sosialMedia}</td>
                                <td>${item.sosialMedia}</td>
                                <td>${item.noTelp}</td>
                                <td>${item.tanggalRegistrasi}</td>
                                <td>${item.deskripsi}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
        `;
    });

    loadPaginationUmkm();
}

function sortTable(field){

    // jika klik field yang sama
    if(sortField === field){

        sortDirection =
            sortDirection === "asc"
                ? "desc"
                : "asc";

    } else {

        sortField = field;
        sortDirection = "asc";
    }

    loadTableUMKM();
}

// PAGINATION
function loadPaginationUmkm(){

    const pagination =
        document.getElementById("pagination");

    pagination.innerHTML = '';

    const filteredData = dataUMKM.filter(item => {

        const namaKategori =
            dataKategori.find(k => k.id === item.kategoriId)?.kategori || "";

        const semuaData = (
            Object.values(item).join(" ") + " " + namaKategori
        ).toLowerCase();
        return semuaData.includes(searchKeywordUmkm);
    });

    const totalPages =
        Math.ceil(filteredData.length / rowsPerPage);

    // PREV
    pagination.innerHTML += `
        <button
            onclick="changePage(${currentPage - 1})"
            ${currentPage === 1 ? 'disabled' : ''}>

            Prev

        </button>
    `;

    // NUMBER
    for(let i = 1; i <= totalPages; i++){

        pagination.innerHTML += `
            <button
                class="
                    ${i === currentPage ? 'active' : ''}
                "
                onclick="changePage(${i})">

                ${i}

            </button>
        `;
    }

    // NEXT
    pagination.innerHTML += `
        <button
            onclick="changePage(${currentPage + 1})"
            ${currentPage === totalPages ? 'disabled' : ''}>

            Next

        </button>
    `;
}

// CHANGE PAGE
function changePage(page){

    const filteredData = dataUMKM.filter(item => {

        const namaKategori =
            dataKategori.find(k => k.id === item.kategoriId)?.kategori || "";

        const semuaData = (
            Object.values(item).join(" ") + " " + namaKategori
        ).toLowerCase();

        return semuaData.includes(searchKeywordUmkm);
    });

    const totalPages =
        Math.ceil(filteredData.length / rowsPerPage);

    if(page < 1 || page > totalPages){
        return;
    }

    currentPage = page;

    // tutup detail saat pindah halaman
    openedDetailId = null;

    loadTableUMKM();
}

// TOGGLE DETAIL
function toggleDetail(id){

    // tutup jika klik yang sama
    if(openedDetailId === id){

        openedDetailId = null;

    } else {

        openedDetailId = id;
    }

    loadTableUMKM();

    // scroll agar detail tetap terlihat
    setTimeout(() => {

        const openedRow =
            document.querySelector(".detail-row.show");

        if(openedRow){

            openedRow.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }

    }, 50);
}
function closeDetailOutside(e){

    // cek apakah ada detail terbuka
    if(!openedDetailId) return;

    // row UMKM
    const clickedRow =
        e.target.closest(".umkm-row");

    // detail UMKM
    const clickedDetail =
        e.target.closest(".detail-row");

    // jika klik di luar row & detail
    if(!clickedRow && !clickedDetail){

        openedDetailId = null;

        loadTableUMKM();
    }
}

// Popup UMKM
function showPopupTambahUMKM() {
    isEditModeUmkm = false;

    bersihUmkm()

    document.getElementById('popup-edit-umkm').classList.add('active');
}
function showPopupEditUMKM(id){

    isEditModeUmkm = true;
    selectedUmkm = dataUMKM.findIndex(
        item => Number(item.id) === Number(id)
    );

    const umkm = dataUMKM[selectedUmkm];
    if (!umkm) return;

    const kategori = dataKategori.find(k => k.id === umkm.kategoriId);

    document.getElementById('umkm-nama-usaha').value = umkm.namaUsaha;
    document.getElementById('selectedText').textContent =
        kategori ? kategori.kategori : "Pilih Kategori Usaha";

    document.getElementById('selectedValueUmkmKategori').value = kategori ? kategori.id : "";
    document.getElementById('umkm-deskripsi-usaha').value = umkm.deskripsi;
    document.getElementById('umkm-nama-pemilik').value = umkm.namaPemilik;
    document.getElementById('umkm-ktp').value = umkm.noKtp;

    const [hari, bulan, tahun] = umkm.tanggalLahir.split('-');
    document.getElementById('umkm-tanggal-lahir').value = `${tahun}-${bulan}-${hari}`;

    document.getElementById('umkm-alamat').value = umkm.alamat;
    document.getElementById('umkm-email').value = umkm.email;
    document.getElementById('umkm-telp').value = umkm.noTelp;
    document.getElementById('umkm-wa').value = umkm.sosialMedia;
    document.getElementById('umkm-instagram').value = umkm.sosialMedia;
    document.getElementById('umkm-facebook').value = umkm.sosialMedia;

    document.querySelector(
        `input[name="status"][value="${umkm.status}"]`
    ).checked = true;

    document.querySelector(
        `input[name="jenis-kelamin"][value="${umkm.jenisKelamin}"]`
    ).checked = true;



    document.getElementById('popup-edit-umkm')
        .classList.add('active');
}
function validasiUmkm() {

    const get = id => document.getElementById(id);

    function tandaiInvalid(element) {
        element.classList.remove("error-validasi");
        void element.offsetWidth;
        element.classList.add("error-validasi");

        setTimeout(() => {
            element.classList.remove("error-validasi");
        }, 800);
    }

    const fields = [
        'umkm-nama-usaha',
        'umkm-deskripsi-usaha',
        'umkm-nama-pemilik',
        'umkm-ktp',
        'umkm-tanggal-lahir',
        'umkm-alamat',
        'umkm-email',
        'umkm-telp'
    ];

    let valid = true;

    fields.forEach(id => {
        const input = get(id);

        if (!input.value.trim()) {
            tandaiInvalid(input);
            valid = false;
        }
    });

    // kategori
    const kategori = get('selectedText').textContent.trim();

    if (kategori === "Pilih Kategori Usaha") {
        tandaiInvalid(get('selectBoxUmkmKategori'));
        valid = false;
    }

    // status
    const status = document.querySelector('input[name="status"]:checked');

    if (!status) {
        tandaiInvalid(get('group-status'));
        valid = false;
    }

    // jenis kelamin
    const jenisKelamin = document.querySelector('input[name="jenis-kelamin"]:checked');

    if (!jenisKelamin) {
        tandaiInvalid(get('group-jenis-kelamin'));
        valid = false;
    }

    return valid;
}

function simpanUmkm(e) {
    e.preventDefault();

    if (!validasiUmkm()) return;

    const get = id => document.getElementById(id);

    const [tahun, bulan, hari] = get('umkm-tanggal-lahir').value.split('-');

    const status = document.querySelector('input[name="status"]:checked');
    const jenisKelamin = document.querySelector('input[name="jenis-kelamin"]:checked');
    const kategoriId = Number(
        get('selectedValueUmkmKategori').value
    );

    const umkmBaru = {
        id: isEditModeUmkm
            ? dataUMKM[selectedUmkm].id
            : Date.now(),
        namaUsaha: get('umkm-nama-usaha').value.trim(),
        kategoriId,
        deskripsi: get('umkm-deskripsi-usaha').value.trim(),
        namaPemilik: get('umkm-nama-pemilik').value.trim(),
        noKtp: get('umkm-ktp').value.trim(),
        tanggalLahir: `${hari}-${bulan}-${tahun}`,
        alamat: get('umkm-alamat').value.trim(),
        email: get('umkm-email').value.trim(),
        noTelp: get('umkm-telp').value.trim(),
        sosialMedia: get('umkm-wa').value.trim(),
        status: status.value === 'true',
        jenisKelamin: jenisKelamin.value === 'true',
        tanggalRegistrasi: isEditModeUmkm
            ? dataUMKM[selectedUmkm].tanggalRegistrasi
            : new Date().toLocaleDateString('id-ID')
    };

    if (isEditModeUmkm) {
        dataUMKM[selectedUmkm] = umkmBaru;
    } else {
        dataUMKM.push(umkmBaru);
    }

    loadTableUMKM();
    closePopup('popup-edit-umkm');
    bersihUmkm();
}

//Popup Hapus
function showPopupHapus(index) {
    selectedUmkm = index;
    document
        .getElementById('popup-hapus-umkm')
        .classList.add('active');
}
function hapusUmkm(){
    if(selectedUmkm===null) return;

    dataUMKM = dataUMKM.filter(item => item.id !== selectedUmkm);

    loadTableUMKM();
    closePopup("popup-hapus-umkm");
}

// Tutup Popup
function closePopup(popup) {
    selectedUmkm = null; // reset state biar aman

    document
        .getElementById(popup)
        .classList.remove('active');
}

// Isi Custom Select
function customSelectUmkm() {
    const optionsList = document.getElementById("optionsListUmkmKategori");
    const selectedText = document.getElementById("selectedText");
    const selectedValue = document.getElementById("selectedValueUmkmKategori");
    const customSelect = document.getElementById("selectUmkmKategori");

    optionsList.innerHTML = "";

    dataKategori.forEach(item => {
        const div = document.createElement("div");
        div.classList.add('option');
        div.textContent = item.kategori;
        div.dataset.value = item.id;
        div.addEventListener('click', () => {
            selectedText.textContent = item.kategori;
            selectedText.classList.remove("empty");
            selectedValue.value = item.id;
            optionsList.style.display = "none";
            customSelect.classList.remove("active");
        });

        optionsList.appendChild(div);
    })
}
function bukaSelectUmkm() {
    const optionsList = document.getElementById("optionsListUmkmKategori");
    const customSelect = document.getElementById("selectUmkmKategori");

    const isOpen = optionsList.style.display === "block";

    optionsList.style.display = isOpen ? "none" : "block";
    customSelect.classList.toggle("active", !isOpen);
}
function tutupSelectUmkm(e) {
    const optionsList = document.getElementById("optionsListUmkmKategori");
    const customSelect = document.getElementById("selectUmkmKategori");

    if (!customSelect || !optionsList) return;

    const isClickInside = customSelect.contains(e.target);

    if (!isClickInside) {
        optionsList.style.display = "none";
        customSelect.classList.remove("active");
    }
}
function resetSelectUmkm() {
    const selectedText = document.getElementById("selectedText");
    const selectedValue = document.getElementById("selectedValueUmkmKategori");
    const optionsList = document.getElementById("optionsListUmkmKategori");
    const customSelect = document.getElementById("selectUmkmKategori");

    selectedText.textContent = "Pilih Kategori Usaha";
    selectedText.classList.add("empty");
    selectedValue.value = "";

    optionsList.style.display = "none";
    customSelect.classList.remove("active");
}

// Cari UMKM
function cariUmkm(){

    const input =
        document.getElementById("search-umkm");

    searchKeywordUmkm = input.value
        .toLowerCase()
        .trim();

    currentPage = 1;

    openedDetailId = null;

    loadTableUMKM();
}