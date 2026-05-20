// ========================================
// DATA
// ========================================

let dataStiker = [
    { id: "1", umkmId: "1", kodeStiker: "Tumpeng 01 01", namaStiker: "Bulat 3x3", panjang: 3, lebar: 3, catatan: "Pisah bawah kiri kanan diujung kiri lingkaran", gambar1: "", gambar2: "", status: true },
    { id: "2", umkmId: "1", kodeStiker: "Tumpeng 01 02", namaStiker: "Kotak 5x5", panjang: 5, lebar: 5, catatan: "Laminasi glossy", gambar1: "", gambar2: "", status: true },

    { id: "3", umkmId: "2", kodeStiker: "Turunan Cabe 01", namaStiker: "Oval 4x2", panjang: 4, lebar: 2, catatan: "Potong rapat", gambar1: "", gambar2: "", status: true },
    { id: "4", umkmId: "2", kodeStiker: "Turunan Cabe 02", namaStiker: "Bulat 2x2", panjang: 2, lebar: 2, catatan: "Untuk cup kecil", gambar1: "", gambar2: "", status: false },

    { id: "5", umkmId: "3", kodeStiker: "Kopi Senja 01", namaStiker: "Persegi Panjang 8x4", panjang: 8, lebar: 4, catatan: "Background hitam", gambar1: "", gambar2: "", status: true },
    { id: "6", umkmId: "3", kodeStiker: "Kopi Senja 02", namaStiker: "Bulat 5x5", panjang: 5, lebar: 5, catatan: "Logo tengah", gambar1: "", gambar2: "", status: true },

    { id: "7", umkmId: "4", kodeStiker: "Batik Nusantara 01", namaStiker: "Kotak 6x6", panjang: 6, lebar: 6, catatan: "Matte finish", gambar1: "", gambar2: "", status: true },
    { id: "8", umkmId: "4", kodeStiker: "Batik Nusantara 02", namaStiker: "Oval 7x3", panjang: 7, lebar: 3, catatan: "Tulisan emas", gambar1: "", gambar2: "", status: false },

    { id: "9", umkmId: "5", kodeStiker: "Toko Mainan Ceria 01", namaStiker: "Bulat 4x4", panjang: 4, lebar: 4, catatan: "Untuk kemasan mangkok", gambar1: "", gambar2: "", status: true },
    { id: "10", umkmId: "5", kodeStiker: "Toko Mainan Ceria 02", namaStiker: "Kotak 10x5", panjang: 10, lebar: 5, catatan: "Tempel samping", gambar1: "", gambar2: "", status: true },

    { id: "11", umkmId: "6", kodeStiker: "Laundry Bersih 01", namaStiker: "Persegi 4x4", panjang: 4, lebar: 4, catatan: "Cetak merah", gambar1: "", gambar2: "", status: true },
    { id: "12", umkmId: "6", kodeStiker: "Laundry Bersih 02", namaStiker: "Bulat 6x6", panjang: 6, lebar: 6, catatan: "Laminasi doff", gambar1: "", gambar2: "", status: true },

    { id: "13", umkmId: "7", kodeStiker: "Sembako Jaya 01", namaStiker: "Oval 3x5", panjang: 3, lebar: 5, catatan: "Untuk botol", gambar1: "", gambar2: "", status: false },
    { id: "14", umkmId: "7", kodeStiker: "Sembako Jaya 02", namaStiker: "Kotak 5x3", panjang: 5, lebar: 3, catatan: "Background putih", gambar1: "", gambar2: "", status: true },

    { id: "15", umkmId: "8", kodeStiker: "Keripik Maknyus 01", namaStiker: "Bulat 3x3", panjang: 3, lebar: 3, catatan: "Logo besar", gambar1: "", gambar2: "", status: true },
    { id: "16", umkmId: "8", kodeStiker: "Keripik Maknyus 02", namaStiker: "Kotak 7x7", panjang: 7, lebar: 7, catatan: "Cetak full color", gambar1: "", gambar2: "", status: true },

    { id: "17", umkmId: "9", kodeStiker: "Mebel Sejahtera 01", namaStiker: "Oval 6x2", panjang: 6, lebar: 2, catatan: "Tulisan kecil", gambar1: "", gambar2: "", status: true },
    { id: "18", umkmId: "9", kodeStiker: "Mebel Sejahtera 02", namaStiker: "Persegi 5x5", panjang: 5, lebar: 5, catatan: "Tempel tengah", gambar1: "", gambar2: "", status: false },

    { id: "19", umkmId: "10", kodeStiker: "Fresh Juice Bar 01", namaStiker: "Kotak 4x6", panjang: 4, lebar: 6, catatan: "Kemasan burger", gambar1: "", gambar2: "", status: true },
    { id: "20", umkmId: "10", kodeStiker: "Fresh Juice Bar 02", namaStiker: "Bulat 8x8", panjang: 8, lebar: 8, catatan: "Logo hitam putih", gambar1: "", gambar2: "", status: true },

    { id: "21", umkmId: "11", kodeStiker: "Bakso Mantap 01", namaStiker: "Oval 5x2", panjang: 5, lebar: 2, catatan: "Cetak tipis", gambar1: "", gambar2: "", status: true },
    { id: "22", umkmId: "11", kodeStiker: "Bakso Mantap 02", namaStiker: "Kotak 6x4", panjang: 6, lebar: 4, catatan: "Untuk box nasi", gambar1: "", gambar2: "", status: true },

    { id: "23", umkmId: "12", kodeStiker: "Roti Bunda 01", namaStiker: "Bulat 2x2", panjang: 2, lebar: 2, catatan: "Mini size", gambar1: "", gambar2: "", status: false },
    { id: "24", umkmId: "12", kodeStiker: "Roti Bunda 02", namaStiker: "Oval 4x6", panjang: 4, lebar: 6, catatan: "Warna kuning", gambar1: "", gambar2: "", status: true },

    { id: "25", umkmId: "13", kodeStiker: "Cuci Motor Kilat 01", namaStiker: "Kotak 9x4", panjang: 9, lebar: 4, catatan: "Tempel depan", gambar1: "", gambar2: "", status: true },
    { id: "26", umkmId: "13", kodeStiker: "Cuci Motor Kilat 02", namaStiker: "Bulat 5x5", panjang: 5, lebar: 5, catatan: "Logo tengah besar", gambar1: "", gambar2: "", status: true },

    { id: "27", umkmId: "14", kodeStiker: "Hijab Cantik 01", namaStiker: "Oval 3x4", panjang: 3, lebar: 4, catatan: "Tempel roti", gambar1: "", gambar2: "", status: true },
    { id: "28", umkmId: "14", kodeStiker: "Hijab Cantik 02", namaStiker: "Kotak 8x3", panjang: 8, lebar: 3, catatan: "Warna pastel", gambar1: "", gambar2: "", status: false },

    { id: "29", umkmId: "15", kodeStiker: "Ayam Geprek Mantul 01", namaStiker: "Bulat 4x4", panjang: 4, lebar: 4, catatan: "Untuk cup jus", gambar1: "", gambar2: "", status: true },
    { id: "30", umkmId: "15", kodeStiker: "Ayam Geprek Mantul 02", namaStiker: "Persegi 6x6", panjang: 6, lebar: 6, catatan: "Laminasi glossy", gambar1: "", gambar2: "", status: true }
];
// ========================================
// STATE
// ========================================

let currentPageStiker = 1;
let currentPageCariUmkm = 1;

let openedDetailStiker = null;

const rowsPerPageStiker = 13;
const rowsPerPageCariUmkm = 9;

let sortStiker = "namaStiker";
let sortCariUmkm = "namaPemilik";
let sortDirectionStiker = "asc";

let selectedStiker = null;
let selectedCariUmkm = null;

let searchKeywordStiker = "";
let searchKeywordCariUmkm = "";

let isEditModeStiker = false;


// ========================================
// HELPER
// ========================================

const getEl = id => document.getElementById(id);
const getValue = id => getEl(id).value.trim();

function getUMKM(id){
    return dataUMKM.find(item => item.id === id);
}

function tandaiInvalid(el){
    el.classList.remove("error-validasi");
    void el.offsetWidth;
    el.classList.add("error-validasi");

    setTimeout(() => {
        el.classList.remove("error-validasi");
    }, 800);
}

function generateKodeStiker(umkm){
    const namaUsaha = umkm.namaUsaha.slice(0, 22).trim();

    const total = dataStiker.filter(
        item => item.umkmId === umkm.id
    ).length + 1;

    return `${namaUsaha} ${String(total).padStart(2, "0")}`;
}

function setPreviewGambar(index, path){
    const img = document.getElementById(
        `preview-gambar-${index}`
    );

    if(path){
        img.src = path;
        img.dataset.path = path;
    } else {
        img.src = noImage;
        img.dataset.path = "";
    }
}


// ========================================
// INIT
// ========================================

function initStiker(){
    loadTableStiker();
    loadTableCariUmkm();
    initSearch();
    setDefaultPreviewImage();
    initPopupLihatGambar();

    getEl("tambah-stiker-btn").addEventListener("click", () => showPopupStiker());
    getEl("stiker-umkm-btn").addEventListener("click", showPopupCariUmkm);

    getEl("batal-hapus-stiker").addEventListener("click", () => tutupPopupStiker("popup-hapus-stiker"));
    getEl("BatalPilihBtn").addEventListener("click", () => tutupPopupStiker("popupStikerCariUmkm"));
    getEl("batal-edit-stiker").addEventListener("click", () => tutupPopupStiker("popup-stiker"));

    getEl("hapus-stiker-btn").addEventListener("click", hapusStiker);
    getEl("form-stiker").addEventListener("submit", simpanStiker);

    getEl("upload-gambar-stiker").addEventListener("change", handleUploadGambarStiker);

    document.removeEventListener("click", closeDetailStikerOutside);
    document.addEventListener("click", closeDetailStikerOutside);

}


// ========================================
// SEARCH
// ========================================

function initSearch(){
    getEl("search-stiker").addEventListener("input", function(){
        searchKeywordStiker = this.value.trim().toLowerCase();
        currentPageStiker = 1;
        openedDetailStiker = null;
        loadTableStiker();
    });

    getEl("cariUmkm").addEventListener("input", function(){
        searchKeywordCariUmkm = this.value.trim().toLowerCase();
        currentPageCariUmkm = 1;
        loadTableCariUmkm();
    });
}


// ========================================
// FILTER
// ========================================

function getFilteredDataStiker(){
    return dataStiker.filter(item => {
        const umkm = getUMKM(item.umkmId);

        const semua = [
            ...Object.values(item),
            ...(umkm ? Object.values(umkm) : [])
        ].join(" ").toLowerCase();

        return semua.includes(searchKeywordStiker);
    });
}

function filterDataCariUmkm(){
    return dataUMKM.filter(item =>
        item.status &&
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(searchKeywordCariUmkm)
    );
}


// ========================================
// SORT
// ========================================

function getSortedDataStiker(data){
    return [...data].sort((a,b) => {

        let valueA;
        let valueB;

        if(sortStiker === "namaUsaha"){
            valueA = getUMKM(a.umkmId)?.namaUsaha ?? "";
            valueB = getUMKM(b.umkmId)?.namaUsaha ?? "";
        }
        else if(sortStiker === "ukuran"){
            valueA = `${a.panjang}x${a.lebar}`;
            valueB = `${b.panjang}x${b.lebar}`;
        }
        else {
            valueA = a[sortStiker];
            valueB = b[sortStiker];
        }

        if(typeof valueA === "boolean"){
            valueA = valueA ? 1 : 0;
            valueB = valueB ? 1 : 0;
        }

        const result = typeof valueA === "string"
            ? valueA.localeCompare(valueB)
            : valueA - valueB;

        return sortDirectionStiker === "asc" ? result : -result;
    });
}

function sortDataCariUmkm(data){
    return [...data].sort((a,b) => {
        const valueA = (a[sortCariUmkm] ?? "").toString().toLowerCase();
        const valueB = (b[sortCariUmkm] ?? "").toString().toLowerCase();

        const result = valueA.localeCompare(valueB);

        return sortDirectionStiker === "asc"
            ? result
            : -result;
    });
}


// ========================================
// PAGINATION
// ========================================

function getPaginatedData(data, page, rows){
    const start = (page - 1) * rows;
    return data.slice(start, start + rows);
}


// ========================================
// LOAD TABLE
// ========================================

function loadTableStiker(){
    const filtered = getFilteredDataStiker();
    const sorted = getSortedDataStiker(filtered);
    const paginated = getPaginatedData(sorted, currentPageStiker, rowsPerPageStiker);

    renderTableStiker(paginated);
    loadPagination("pagination", filtered.length, currentPageStiker, rowsPerPageStiker, changePageStiker);
}

function loadTableCariUmkm(){
    const filtered = filterDataCariUmkm();
    const sorted = sortDataCariUmkm(filtered);
    const paginated = getPaginatedData(sorted, currentPageCariUmkm, rowsPerPageCariUmkm);

    renderTabelCariUmkm(paginated);
    loadPagination("pagination-cari-umkm", filtered.length, currentPageCariUmkm, rowsPerPageCariUmkm, changePageCariUmkm);
}


// ========================================
// RENDER TABLE
// ========================================

function renderTableStiker(data){
    const tbody = getEl("stiker-tbl-body");

    tbody.innerHTML = data.map(item => {
        const umkm = getUMKM(item.umkmId);
        const opened = openedDetailStiker === item.id;

        return createRowStiker(item, umkm, opened);
    }).join("");
}

function renderTabelCariUmkm(data){
    const tbody = getEl("CariUmkmTBody");

    tbody.innerHTML = data.map(item =>
        createRowCariUmkm(item)
    ).join("");
}


// ========================================
// CREATE ROW
// ========================================

function createRowStiker(item, umkm, opened){
    return `
        <tr class="stiker-row" onclick="event.stopPropagation(); toggleDetailStiker('${item.id}')">
            <td>${item.kodeStiker}</td>
            <td>${umkm?.namaUsaha ?? "-"}</td>
            <td>${item.namaStiker}</td>
            <td>${item.panjang} x ${item.lebar}</td>
            <td>${item.status ? "Aktif" : "Non-Aktif"}</td>
            <td>
                <div class="actions">
                    <button onclick="event.stopPropagation(); showPopupStiker('${item.id}')">
                        <span class="material-symbols-sharp">edit</span>
                    </button>
                    <button onclick="event.stopPropagation(); showPopupHapusStiker('${item.id}')">
                        <span class="material-symbols-sharp">delete</span>
                    </button>
                </div>
            </td>
        </tr>

        <tr class="detail-row ${opened ? "show" : ""}">
            <td colspan="6">
                <div class="detail-content">
                    <table class="detail-horizontal-table">
                        <thead>
                            <tr>
                                <th>Nama Pemilik</th>
                                <th>Alamat</th>
                                <th>Sosial Media</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${umkm?.namaPemilik ?? "-"}</td>
                                <td>${umkm?.alamat ?? "-"}</td>
                                <td>${umkm?.sosialMedia ?? "-"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    `;
}

function createRowCariUmkm(item){
    return `
        <tr class="${selectedCariUmkm?.id === item.id ? "selected-row" : ""}"
            ondblclick="pilihUmkm('${item.id}')">
            <td>${item.namaUsaha}</td>
            <td>${item.namaPemilik}</td>
            <td>${item.noTelp}</td>
            <td>${item.sosialMedia}</td>
        </tr>
    `;
}


// ========================================
// PAGINATION BUTTON
// ========================================

function loadPagination(id, totalData, currentPage, rowsPerPage, callback){
    const pagination = getEl(id);
    pagination.innerHTML = "";

    const totalPages = Math.max(1, Math.ceil(totalData / rowsPerPage));

    pagination.innerHTML += `
        <button onclick="${callback.name}(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}>Prev</button>
    `;

    for(let i = 1; i <= totalPages; i++){
        pagination.innerHTML += `
            <button class="${i === currentPage ? "active" : ""}" onclick="${callback.name}(${i})">${i}</button>
        `;
    }

    pagination.innerHTML += `
        <button onclick="${callback.name}(${currentPage + 1})" ${currentPage === totalPages ? "disabled" : ""}>Next</button>
    `;
}


// ========================================
// PAGE CHANGE
// ========================================

function changePageStiker(page){
    const totalPages = Math.ceil(getFilteredDataStiker().length / rowsPerPageStiker);

    if(page < 1 || page > totalPages) return;

    currentPageStiker = page;
    openedDetailStiker = null;

    loadTableStiker();
}

function changePageCariUmkm(page){
    const totalPages = Math.ceil(filterDataCariUmkm().length / rowsPerPageCariUmkm);

    if(page < 1 || page > totalPages) return;

    currentPageCariUmkm = page;

    loadTableCariUmkm();
}


// ========================================
// SORT ACTION
// ========================================

function sortTableStiker(field){
    if(sortStiker === field){
        sortDirectionStiker = sortDirectionStiker === "asc" ? "desc" : "asc";
    } else {
        sortStiker = field;
        sortDirectionStiker = "asc";
    }

    loadTableStiker();
}

function sortTableCariUmkm(field){
    if(sortCariUmkm === field){
        sortDirectionStiker = sortDirectionStiker === "asc" ? "desc" : "asc";
    } else {
        sortCariUmkm = field;
        sortDirectionStiker = "asc";
    }

    loadTableCariUmkm();
}


// ========================================
// DETAIL
// ========================================

function toggleDetailStiker(id){
    openedDetailStiker = openedDetailStiker === id ? null : id;

    loadTableStiker();

    setTimeout(() => {
        document.querySelector(".detail-row.show")?.scrollIntoView({
            behavior:"smooth",
            block:"nearest"
        });
    }, 50);
}

function closeDetailStikerOutside(event){
    if(event.target.closest(".stiker-row, .detail-row")) return;
    if(openedDetailStiker === null) return;

    openedDetailStiker = null;
    loadTableStiker();
}


// ========================================
// FORM
// ========================================

function bersihStiker(){
    selectedStiker = null;
    selectedCariUmkm = null;

    [
        "stiker-nama-usaha",
        "stiker-nama-pemilik",
        "stiker-alamat",
        "stiker-telp",
        "stiker-kode",
        "stiker-nama",
        "stiker-panjang",
        "stiker-lebar",
        "stiker-catatan"
    ].forEach(id => getEl(id).value = "");

    document.querySelectorAll('input[name="status-stiker"]').forEach(input => {
        input.checked = false;
    });
    setPreviewGambar(1, "");
    setPreviewGambar(2, "");
}


// ========================================
// POPUP
// ========================================

function showPopupStiker(id = null){
    bersihStiker();

    const popup = getEl("popup-stiker");
    const btnCari = getEl("stiker-umkm-btn");

    if(id === null){
        isEditModeStiker = false;

        btnCari.disabled = false;
        btnCari.classList.remove("btn-disabled");

        popup.classList.add("show");
        return;
    }

    isEditModeStiker = true;

    btnCari.disabled = true;
    btnCari.classList.add("btn-disabled");

    selectedStiker = dataStiker.find(item => item.id === id);
    if(!selectedStiker) return;

    selectedCariUmkm = getUMKM(selectedStiker.umkmId);

    isiDataUmkm(selectedCariUmkm);
    isiDataStiker(selectedStiker);

    popup.classList.add("show");
}

function showPopupHapusStiker(id){
    selectedStiker = id;
    getEl("popup-hapus-stiker").classList.add("active");
}

function showPopupCariUmkm(){
    searchKeywordCariUmkm = "";
    currentPageCariUmkm = 1;

    getEl("cariUmkm").value = "";

    loadTableCariUmkm();

    getEl("popupStikerCariUmkm").classList.add("show");
}

function tutupPopupStiker(id){
    if(id === "popup-stiker") bersihStiker();

    getEl(id).classList.remove("show");
    getEl(id).classList.remove("active");
}


// ========================================
// FILL FORM
// ========================================

function isiDataUmkm(umkm){
    if(!umkm) return;

    getEl("stiker-nama-usaha").value = umkm.namaUsaha;
    getEl("stiker-nama-pemilik").value = umkm.namaPemilik;
    getEl("stiker-telp").value = umkm.noTelp;
    getEl("stiker-alamat").value = umkm.alamat;
}

function isiDataStiker(stiker){
    getEl("stiker-kode").value = stiker.kodeStiker;
    getEl("stiker-nama").value = stiker.namaStiker;
    getEl("stiker-panjang").value = stiker.panjang;
    getEl("stiker-lebar").value = stiker.lebar;
    getEl("stiker-catatan").value = stiker.catatan;
    setPreviewGambar(1, stiker.gambar1);
    setPreviewGambar(2, stiker.gambar2);

    document.querySelector(`input[name="status-stiker"][value="${stiker.status}"]`).checked = true;
}


// ========================================
// CRUD
// ========================================

function pilihUmkm(id){
    const umkm = getUMKM(id);
    if(!umkm) return;

    selectedCariUmkm = umkm;

    isiDataUmkm(umkm);

    if(!isEditModeStiker){
        getEl("stiker-kode").value = generateKodeStiker(umkm);
    }

    tutupPopupStiker("popupStikerCariUmkm");
}

function hapusStiker(){
    if(selectedStiker === null) return;

    dataStiker = dataStiker.filter(
        item => item.id !== selectedStiker
    );

    loadTableStiker();

    tutupPopupStiker("popup-hapus-stiker");
}


// ========================================
// VALIDASI
// ========================================

function validasiStiker(){
    let valid = true;

    if(!selectedCariUmkm){
        [
            "stiker-nama-usaha",
            "stiker-nama-pemilik",
            "stiker-telp"
        ].forEach(id => tandaiInvalid(getEl(id)));

        valid = false;
    }

    [
        "stiker-kode",
        "stiker-nama",
        "stiker-panjang",
        "stiker-lebar",
        "stiker-catatan",
        "stiker-alamat"
    ].forEach(id => {
        if(!getValue(id)){
            tandaiInvalid(getEl(id));
            valid = false;
        }
    });

    if(!document.querySelector('input[name="status-stiker"]:checked')){
        tandaiInvalid(getEl("group-status-stiker"));
        valid = false;
    }

    return valid;
}

function simpanStiker(e){
    e.preventDefault();

    if(!validasiStiker()) return;

    const status = document.querySelector('input[name="status-stiker"]:checked');

    const dataBaru = {
        id: isEditModeStiker ? selectedStiker.id : Date.now().toString(),
        umkmId: selectedCariUmkm.id,
        kodeStiker: getValue("stiker-kode"),
        namaStiker: getValue("stiker-nama"),
        panjang: Number(getValue("stiker-panjang")),
        lebar: Number(getValue("stiker-lebar")),
        catatan: getValue("stiker-catatan"),
        status: status.value === "true",
        gambar1: document.getElementById("preview-gambar-1").dataset.path || "",
        gambar2: document.getElementById("preview-gambar-2").dataset.path || ""
    };

    if(isEditModeStiker){
        const index = dataStiker.findIndex(item => item.id === selectedStiker.id);

        if(index !== -1){
            dataStiker[index] = dataBaru;
        }
    } else {
        dataStiker.push(dataBaru);
    }

    loadTableStiker();

    tutupPopupStiker("popup-stiker");
}


// ========================================
// IMAGE MENU
// ========================================

function toggleMenu(button){
    const current = button.nextElementSibling;

    document.querySelectorAll(".dropdown-menu").forEach(menu => {
        if(menu !== current){
            menu.classList.remove("show");
        }
    });

    current.classList.toggle("show");
}

document.addEventListener("click", e => {
    if(!e.target.closest(".desain-item")){
        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            menu.classList.remove("show");
        });
    }
});

// ========================================
// DEFAULT IMAGE
// ========================================

const noImage = `data:image/svg+xml;utf8,
<svg xmlns='http://www.w3.org/2000/svg' width='250' height='160' viewBox='0 0 250 160'>
    <rect width='250' height='160' fill='%23f3f4f6'/>
    <rect x='70' y='45' width='110' height='70' rx='8' fill='%23d1d5db'/>
    <circle cx='95' cy='65' r='10' fill='%239ca3af'/>
    <path d='M78 105 L110 80 L135 100 L160 72 L180 105 Z' fill='%239ca3af'/>
    <text x='125' y='140' font-size='14' text-anchor='middle' fill='%236b7280' font-family='Arial'>No Image</text>
</svg>`;

function setDefaultPreviewImage(){
    document.querySelectorAll(".preview-img").forEach(img => {
        img.src = img.getAttribute("src") || noImage;
        img.onerror = () => img.src = noImage;
    });
}

// ========================================
// IMAGE STIKER
// ========================================

let selectedGambarIndex = null;

function pilihGambar(index){
    selectedGambarIndex = index;

    document
        .getElementById("upload-gambar-stiker")
        .click();
}

function handleUploadGambarStiker(e){
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(ev){
        const base64 = ev.target.result;

        const img = getEl(`preview-gambar-${selectedGambarIndex}`);

        img.src = base64;
        img.dataset.path = base64;
    };

    reader.readAsDataURL(file);

    e.target.value = "";
}

function hapusGambar(index){
    const img = document.getElementById(
        `preview-gambar-${index}`
    );

    img.src = noImage;
    img.dataset.path = "";
}

function lihatGambar(index){
    const img = document.getElementById(
        `preview-gambar-${index}`
    );

    if(!img.src || img.src === noImage) return;

    document.getElementById("img-fullscreen").src = img.src;

    document
        .getElementById("popup-lihat-gambar")
        .classList.add("show");
}

function initPopupLihatGambar(){
    const popup = getEl("popup-lihat-gambar");

    document.addEventListener("keydown", function(e){
        if(e.key === "Escape" && popup.classList.contains("show")){
            tutupPopupStiker("popup-lihat-gambar");
        }
    });

    popup.addEventListener("click", function(e){
        if(e.target === popup){
            tutupPopupStiker("popup-lihat-gambar");
        }
    });
}