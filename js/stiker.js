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

function getStiker(id){
    return dataStiker.find(item => item.id === id);
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
        img.src = noImageStiker;
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
        <tr class="stiker-row" onclick="event.stopPropagation(); toggleDetailStiker(${item.id})">
            <td>${item.kodeStiker}</td>
            <td>${umkm?.namaUsaha ?? "-"}</td>
            <td>${item.namaStiker}</td>
            <td>${item.panjang} x ${item.lebar}</td>
            <td>${item.status ? "Aktif" : "Non-Aktif"}</td>
            <td>
                <div class="actions">
                    <button onclick="event.stopPropagation(); showPopupStiker(${item.id})">
                        <span class="material-symbols-sharp">edit</span>
                    </button>
                    <button onclick="event.stopPropagation(); showPopupHapusStiker(${item.id})">
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
            ondblclick="pilihUmkm(${item.id})">
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

    const totalPages =
        Math.max(1, Math.ceil(totalData / rowsPerPage));

    const maxVisible = 3;

    pagination.innerHTML += `
        <button
            onclick="${callback.name}(${currentPage - 1})"
            ${currentPage === 1 ? "disabled" : ""}
        >
            Prev
        </button>
    `;

    let startPage =
        Math.max(
            1,
            currentPage - Math.floor(maxVisible / 2)
        );

    let endPage =
        startPage + maxVisible - 1;

    if(endPage > totalPages){
        endPage = totalPages;
        startPage =
            Math.max(
                1,
                endPage - maxVisible + 1
            );
    }

    // tombol halaman pertama
    if(startPage > 1){

        pagination.innerHTML += `
            <button onclick="${callback.name}(1)">
                1
            </button>
        `;

        if(startPage > 2){
            pagination.innerHTML += `
                <span class="pagination-dots">
                    ...
                </span>
            `;
        }
    }

    // tombol tengah
    for(let i = startPage; i <= endPage; i++){

        pagination.innerHTML += `
            <button
                class="${i === currentPage ? "active" : ""}"
                onclick="${callback.name}(${i})"
            >
                ${i}
            </button>
        `;
    }

    // tombol halaman terakhir
    if(endPage < totalPages){

        if(endPage < totalPages - 1){
            pagination.innerHTML += `
                <span class="pagination-dots">
                    ...
                </span>
            `;
        }

        pagination.innerHTML += `
            <button onclick="${callback.name}(${totalPages})">
                ${totalPages}
            </button>
        `;
    }

    pagination.innerHTML += `
        <button
            onclick="${callback.name}(${currentPage + 1})"
            ${currentPage === totalPages ? "disabled" : ""}
        >
            Next
        </button>
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

    console.log(dataBaru.gambar1)
    console.log(dataBaru.gambar2)

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

const noImageStiker = `data:image/svg+xml;utf8,
<svg xmlns='http://www.w3.org/2000/svg' width='250' height='160' viewBox='0 0 250 160'>
    <rect width='250' height='160' fill='%23f3f4f6'/>
    <rect x='70' y='45' width='110' height='70' rx='8' fill='%23d1d5db'/>
    <circle cx='95' cy='65' r='10' fill='%239ca3af'/>
    <path d='M78 105 L110 80 L135 100 L160 72 L180 105 Z' fill='%239ca3af'/>
    <text x='125' y='140' font-size='14' text-anchor='middle' fill='%236b7280' font-family='Arial'>No Image</text>
</svg>`;

function setDefaultPreviewImage(){
    document.querySelectorAll(".preview-img").forEach(img => {
        img.src = img.getAttribute("src") || noImageStiker;
        img.onerror = () => img.src = noImageStiker;
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

    const container = getEl(
        `preview-container-${selectedGambarIndex}`
    );

    const img = getEl(
        `preview-gambar-${selectedGambarIndex}`
    );

    // reset state
    container.classList.remove("loaded");

    // tampil loading
    container.classList.add("loading");

    compressImage(file, function(base64){

        const tempImg = new Image();

        tempImg.onload = function(){

            img.src = base64;
            img.dataset.path = base64;

            // selesai loading
            container.classList.remove("loading");
            container.classList.add("loaded");
        };

        tempImg.src = base64;
    });

    e.target.value = "";
}
function compressImage(file, callback){

    const reader = new FileReader();

    reader.onload = function(e){

        const img = new Image();

        img.onload = function(){

            const canvas = document.createElement("canvas");

            const maxWidth = 1200;

            let width = img.width;
            let height = img.height;

            if(width > maxWidth){

                height *= maxWidth / width;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0, width, height);

            callback(
                canvas.toDataURL(
                    "image/jpeg",
                    0.72
                )
            );
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

function hapusGambar(index){
    const img = document.getElementById(
        `preview-gambar-${index}`
    );

    img.src = noImageStiker;
    img.dataset.path = "";
}

function lihatGambar(index){
    const img = document.getElementById(
        `preview-gambar-${index}`
    );

    if(!img.src || img.src === noImageStiker) return;

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