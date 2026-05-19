// ========================================
// DATA
// ========================================

let dataStiker = [
    {
        id: "1",
        umkmId: "1",
        kodeStiker: "Tumpeng 01-0001",
        namaStiker: "Bulat 3x3",
        panjang: 3,
        lebar: 3,
        catatan: "Pisah bawah kiri kanan diujung kiri lingkaran",
        status: true
    },
    {
        id: "2",
        umkmId: "1",
        kodeStiker: "Tumpeng 01-0002",
        namaStiker: "Kotak 5x5",
        panjang: 5,
        lebar: 5,
        catatan: "Laminasi glossy",
        status: true
    },
    {
        id: "3",
        umkmId: "2",
        kodeStiker: "Bakso Mantap-0001",
        namaStiker: "Oval 4x2",
        panjang: 4,
        lebar: 2,
        catatan: "Potong rapat",
        status: true
    },
    {
        id: "4",
        umkmId: "2",
        kodeStiker: "Bakso Mantap-0002",
        namaStiker: "Bulat 2x2",
        panjang: 2,
        lebar: 2,
        catatan: "Untuk cup kecil",
        status: false
    },
    {
        id: "5",
        umkmId: "3",
        kodeStiker: "Kopi Santai-0001",
        namaStiker: "Persegi Panjang 8x4",
        panjang: 8,
        lebar: 4,
        catatan: "Background hitam",
        status: true
    },
    {
        id: "6",
        umkmId: "3",
        kodeStiker: "Kopi Santai-0002",
        namaStiker: "Bulat 5x5",
        panjang: 5,
        lebar: 5,
        catatan: "Logo tengah",
        status: true
    },
    {
        id: "7",
        umkmId: "4",
        kodeStiker: "Roti Enak-0001",
        namaStiker: "Kotak 6x6",
        panjang: 6,
        lebar: 6,
        catatan: "Matte finish",
        status: true
    },
    {
        id: "8",
        umkmId: "4",
        kodeStiker: "Roti Enak-0002",
        namaStiker: "Oval 7x3",
        panjang: 7,
        lebar: 3,
        catatan: "Tulisan emas",
        status: false
    },
    {
        id: "9",
        umkmId: "5",
        kodeStiker: "Mie Pedas-0001",
        namaStiker: "Bulat 4x4",
        panjang: 4,
        lebar: 4,
        catatan: "Untuk kemasan mangkok",
        status: true
    },
    {
        id: "10",
        umkmId: "5",
        kodeStiker: "Mie Pedas-0002",
        namaStiker: "Kotak 10x5",
        panjang: 10,
        lebar: 5,
        catatan: "Tempel samping",
        status: true
    },
    {
        id: "11",
        umkmId: "6",
        kodeStiker: "Ayam Crispy-0001",
        namaStiker: "Persegi 4x4",
        panjang: 4,
        lebar: 4,
        catatan: "Cetak merah",
        status: true
    },
    {
        id: "12",
        umkmId: "6",
        kodeStiker: "Ayam Crispy-0002",
        namaStiker: "Bulat 6x6",
        panjang: 6,
        lebar: 6,
        catatan: "Laminasi doff",
        status: true
    },
    {
        id: "13",
        umkmId: "7",
        kodeStiker: "Es Teh Segar-0001",
        namaStiker: "Oval 3x5",
        panjang: 3,
        lebar: 5,
        catatan: "Untuk botol",
        status: false
    },
    {
        id: "14",
        umkmId: "7",
        kodeStiker: "Es Teh Segar-0002",
        namaStiker: "Kotak 5x3",
        panjang: 5,
        lebar: 3,
        catatan: "Background putih",
        status: true
    },
    {
        id: "15",
        umkmId: "8",
        kodeStiker: "Sate Madura-0001",
        namaStiker: "Bulat 3x3",
        panjang: 3,
        lebar: 3,
        catatan: "Logo besar",
        status: true
    },
    {
        id: "16",
        umkmId: "8",
        kodeStiker: "Sate Madura-0002",
        namaStiker: "Kotak 7x7",
        panjang: 7,
        lebar: 7,
        catatan: "Cetak full color",
        status: true
    },
    {
        id: "17",
        umkmId: "9",
        kodeStiker: "Dimsum Mantul-0001",
        namaStiker: "Oval 6x2",
        panjang: 6,
        lebar: 2,
        catatan: "Tulisan kecil",
        status: true
    },
    {
        id: "18",
        umkmId: "9",
        kodeStiker: "Dimsum Mantul-0002",
        namaStiker: "Persegi 5x5",
        panjang: 5,
        lebar: 5,
        catatan: "Tempel tengah",
        status: false
    },
    {
        id: "19",
        umkmId: "10",
        kodeStiker: "Burger Boss-0001",
        namaStiker: "Kotak 4x6",
        panjang: 4,
        lebar: 6,
        catatan: "Kemasan burger",
        status: true
    },
    {
        id: "20",
        umkmId: "10",
        kodeStiker: "Burger Boss-0002",
        namaStiker: "Bulat 8x8",
        panjang: 8,
        lebar: 8,
        catatan: "Logo hitam putih",
        status: true
    },
    {
        id: "21",
        umkmId: "11",
        kodeStiker: "Nasi Goreng Jos-0001",
        namaStiker: "Oval 5x2",
        panjang: 5,
        lebar: 2,
        catatan: "Cetak tipis",
        status: true
    },
    {
        id: "22",
        umkmId: "11",
        kodeStiker: "Nasi Goreng Jos-0002",
        namaStiker: "Kotak 6x4",
        panjang: 6,
        lebar: 4,
        catatan: "Untuk box nasi",
        status: true
    },
    {
        id: "23",
        umkmId: "12",
        kodeStiker: "Pisang Coklat-0001",
        namaStiker: "Bulat 2x2",
        panjang: 2,
        lebar: 2,
        catatan: "Mini size",
        status: false
    },
    {
        id: "24",
        umkmId: "12",
        kodeStiker: "Pisang Coklat-0002",
        namaStiker: "Oval 4x6",
        panjang: 4,
        lebar: 6,
        catatan: "Warna kuning",
        status: true
    },
    {
        id: "25",
        umkmId: "13",
        kodeStiker: "Martabak Bang Udin-0001",
        namaStiker: "Kotak 9x4",
        panjang: 9,
        lebar: 4,
        catatan: "Tempel depan",
        status: true
    },
    {
        id: "26",
        umkmId: "13",
        kodeStiker: "Martabak Bang Udin-0002",
        namaStiker: "Bulat 5x5",
        panjang: 5,
        lebar: 5,
        catatan: "Logo tengah besar",
        status: true
    },
    {
        id: "27",
        umkmId: "14",
        kodeStiker: "Bakery Kita-0001",
        namaStiker: "Oval 3x4",
        panjang: 3,
        lebar: 4,
        catatan: "Tempel roti",
        status: true
    },
    {
        id: "28",
        umkmId: "14",
        kodeStiker: "Bakery Kita-0002",
        namaStiker: "Kotak 8x3",
        panjang: 8,
        lebar: 3,
        catatan: "Warna pastel",
        status: false
    },
    {
        id: "29",
        umkmId: "15",
        kodeStiker: "Jus Buah Fresh-0001",
        namaStiker: "Bulat 4x4",
        panjang: 4,
        lebar: 4,
        catatan: "Untuk cup jus",
        status: true
    },
    {
        id: "30",
        umkmId: "15",
        kodeStiker: "Jus Buah Fresh-0002",
        namaStiker: "Persegi 6x6",
        panjang: 6,
        lebar: 6,
        catatan: "Laminasi glossy",
        status: true
    }
];

let currentPageStiker = 1;
let openedDetailStiker = null;

const rowsPerPageStiker = 13;

let currentPageCariUmkm = 1;
const rowsPerPageCariUmkm = 9;

let sortStiker = "namaStiker";
let sortCariUmkm = "namaPemilik";
let sortDirectionStiker = "asc";

let selectedStiker;
let selectedCariUmkm;

let searchKeywordCariUmkm = "";
let searchKeywordStiker = "";

let isEditModeStiker = false;

// ========================================
// INIT
// ========================================

function initStiker(){

    loadTableStiker();
    loadTableCariUmkm();
    initSearchStiker();
    cariStikerUmkm();
    bersihStiker();

    document
        .getElementById("tambah-stiker-btn")
        .addEventListener("click", () => showPopupStiker());
    document
        .getElementById("stiker-umkm-btn")
        .addEventListener("click", showPopupCariUmkm);
    document
        .getElementById("batal-hapus-stiker")
        .addEventListener("click", () => tutupPopupStiker('popup-hapus-stiker')
        );
    document
        .getElementById("BatalPilihBtn")
        .addEventListener("click", () => tutupPopupStiker('popupStikerCariUmkm')
        );
    document
        .getElementById("batal-edit-stiker")
        .addEventListener("click", () => tutupPopupStiker('popup-stiker')
        );
    document
        .getElementById("hapus-stiker-btn")
        .addEventListener("click", () => hapusStiker()
        );
    document
        .getElementById("form-stiker")
        .addEventListener("submit", simpanStiker);

    document.removeEventListener("click", closeDetailStikerOutside);
    document.addEventListener("click", closeDetailStikerOutside);
}

// ========================================
// MAIN
// ========================================

function loadTableStiker(){

    // FILTER
    const filteredData = getFilteredDataStiker();

    // SORT
    const sortedData = getSortedDataStiker(filteredData);

    // PAGINATION
    const paginatedData = getPaginatedDataStiker(sortedData);

    // RENDER TABLE
    renderTableStiker(paginatedData);

    // RENDER PAGINATION
    loadPaginationStiker(filteredData.length);
}

function loadTableCariUmkm(){
    const filterData = filterDataCariUmkm();
    const sortedData = sortDataCariUmkm(filterData);
    const paginatedData = getPaginatedDataCariUmkm(sortedData);
    renderTabelCariUmkm(paginatedData);

    loadPaginationCariUmkm(filterData.length);

}

// ========================================
// FILTER
// ========================================

function getFilteredDataStiker(){

    return dataStiker.filter(item => {

        const umkm = getUMKM(item.umkmId);

        const semuaData = [
            ...Object.values(item),
            ...(umkm ? Object.values(umkm) : [])
        ]
            .join(" ")
            .toLowerCase();

        return semuaData.includes(
            searchKeywordStiker.toLowerCase()
        );
    });
}

function filterDataCariUmkm(){

    return dataUMKM.filter(item =>
        item.status && // hanya status aktif yang tampil
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(searchKeywordCariUmkm.toLowerCase())
    );
}
// ========================================
// SORT
// ========================================

function getSortedDataStiker(data){

    return [...data].sort((a, b) => {
        let valueA;
        let valueB;

        // SORT NAMA USAHA
        if(sortStiker === "namaUsaha"){
            valueA = getUMKM(a.umkmId)?.namaUsaha ?? "";
            valueB = getUMKM(b.umkmId)?.namaUsaha ?? "";
        }

        // SORT UKURAN
        else if(sortStiker === "ukuran"){
            valueA = `${a.panjang}x${a.lebar}`;
            valueB = `${b.panjang}x${b.lebar}`;
        }

        // DEFAULT
        else {
            valueA = a[sortStiker];
            valueB = b[sortStiker];
        }

        // BOOLEAN
        if(typeof valueA === "boolean"){
            valueA = valueA ? 1 : 0;
            valueB = valueB ? 1 : 0;
        }

        // STRING
        if(typeof valueA === "string"){
            const result = valueA.localeCompare(valueB);
            return sortDirectionStiker === "asc" ? result : -result;
        }

        // NUMBER
        const result = valueA - valueB;

        return sortDirectionStiker === "asc" ? result : -result;
    });
}

function sortDataCariUmkm(data){

    return [...data].sort((a, b) => {

        let valueA = a[sortCariUmkm] ?? "";
        let valueB = b[sortCariUmkm] ?? "";

        valueA = valueA.toString().toLowerCase();
        valueB = valueB.toString().toLowerCase();

        const result = valueA.localeCompare(valueB);

        return sortDirectionStiker === "asc"
            ? result
            : -result;
    });
}
// ========================================
// PAGINATION
// ========================================

function getPaginatedDataStiker(data){
    const start = (currentPageStiker - 1) * rowsPerPageStiker;
    const end = start + rowsPerPageStiker;
    return data.slice(start, end);
}

function getPaginatedDataCariUmkm(data){
    const start = (currentPageCariUmkm - 1) * rowsPerPageCariUmkm;
    const end = start + rowsPerPageCariUmkm;

    return data.slice(start, end);
}

// ========================================
// RENDER TABLE
// ========================================

function renderTableStiker(data){
    const tbody =
        document.getElementById(
            "stiker-tbl-body"
        );

    let html = "";

    data.forEach(item => {
        const umkm = getUMKM(item.umkmId);

        const isOpened = openedDetailStiker === item.id;

        html += createRowStiker(
            item,
            umkm,
            isOpened
        );
    });

    tbody.innerHTML = html;
}

function renderTabelCariUmkm(data){
    const tbody = document.getElementById("CariUmkmTBody");
    let html = "";

    data.forEach(item => {
        html += createRowCariUmkm(
            item
        );
    });

    tbody.innerHTML = html;
}

// ========================================
// CREATE ROW
// ========================================

function createRowStiker(item, umkm, isOpened ){
    return `
        <!-- ROW UTAMA -->
        <tr class="stiker-row"
            onclick="event.stopPropagation(); toggleDetailStiker('${item.id}')">

            <td>${item.kodeStiker}</td>
            <td>${umkm?.namaUsaha ?? '-'}</td>
            <td>${item.namaStiker}</td>
            <td>${item.panjang} x ${item.lebar}</td>
            <td>${item.status ? 'Aktif' : 'Non-Aktif'}</td>
            <td>
                <div class="actions">
                    <!-- EDIT -->
                    <button onclick="event.stopPropagation(); showPopupStiker('${item.id}')">
                        <span class="material-symbols-sharp">edit</span>
                    </button>

                    <!-- HAPUS -->
                    <button onclick="event.stopPropagation(); showPopupHapusStiker('${item.id}')">
                        <span class="material-symbols-sharp">delete</span>
                    </button>
                </div>
            </td>
        </tr>

        <!-- DETAIL -->
        <tr class="detail-row ${isOpened ? 'show' : ''}">
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
                                <td>${umkm?.namaPemilik ?? '-'}</td>
                                <td>${umkm?.alamat ?? '-'}</td>
                                <td>${umkm?.sosialMedia ?? '-'}</td>
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
        <!-- ROW UTAMA -->
        <tr class="${selectedCariUmkm?.id === item.id ? 'selected-row' : ''}"
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

function loadPaginationStiker(totalData){

    const pagination = document.getElementById("pagination");

    pagination.innerHTML = "";

    const totalPages =
        Math.ceil( totalData / rowsPerPageStiker);

    // PREV
    pagination.innerHTML += `
        <button
            onclick="
                changePageStiker(
                    ${currentPageStiker - 1}
                )
            "
            ${currentPageStiker === 1
        ? "disabled"
        : ""}
        >
            Prev
        </button>
    `;

    // NUMBER
    for(let i = 1; i <= totalPages; i++){

        pagination.innerHTML += `
            <button
                class="
                    ${i === currentPageStiker
            ? "active"
            : ""}
                "

                onclick="
                    changePageStiker(${i})
                "
            >

                ${i}

            </button>
        `;
    }

    // NEXT
    pagination.innerHTML += `
        <button
            onclick="
                changePageStiker(
                    ${currentPageStiker + 1}
                )
            "

            ${currentPageStiker === totalPages
        ? "disabled"
        : ""}
        >
            Next
        </button>
    `;
}

function loadPaginationCariUmkm(totalData) {
    const pagination = document.getElementById("pagination-cari-umkm");
    pagination.innerHTML = "";

    const totalPages = Math.max(1, Math.ceil(totalData / rowsPerPageCariUmkm));

    pagination.innerHTML += `
        <button
            onclick="changePageCariUmkm(${currentPageCariUmkm - 1})"
            ${currentPageCariUmkm === 1 ? "disabled" : ""}
        >
            Prev
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <button
                class="${i === currentPageCariUmkm ? "active" : ""}"
                onclick="changePageCariUmkm(${i})"
            >
                ${i}
            </button>
        `;
    }

    pagination.innerHTML += `
        <button
            onclick="changePageCariUmkm(${currentPageCariUmkm + 1})"
            ${currentPageCariUmkm === totalPages ? "disabled" : ""}
        >
            Next
        </button>
    `;
}

// ========================================
// SORT ACTION
// ========================================

function sortTableStiker(field){

    // FIELD SAMA
    if(sortStiker === field){

        sortDirectionStiker =
            sortDirectionStiker === "asc"
                ? "desc"
                : "asc";
    }

    // FIELD BARU
    else {

        sortStiker = field;

        sortDirectionStiker = "asc";
    }

    loadTableStiker();
}
function sortTableCariUmkm(field){

    // FIELD SAMA
    if(sortCariUmkm === field){

        sortDirectionStiker =
            sortDirectionStiker === "asc"
                ? "desc"
                : "asc";
    }

    // FIELD BARU
    else {

        sortCariUmkm = field;

        sortDirectionStiker = "asc";
    }

    loadTableCariUmkm();
}


// ========================================
// CHANGE PAGE
// ========================================

function changePageStiker(page){

    const totalData =
        getFilteredDataStiker().length;

    const totalPages =
        Math.ceil(
            totalData / rowsPerPageStiker
        );

    // VALIDASI PAGE
    if(page < 1 || page > totalPages){
        return;
    }

    currentPageStiker = page;

    openedDetailStiker = null;

    loadTableStiker();
}

function changePageCariUmkm(page){

    const totalData = filterDataCariUmkm().length;

    const totalPages = Math.ceil(totalData / rowsPerPageCariUmkm);

    if(page < 1 || page > totalPages){
        return;
    }

    currentPageCariUmkm = page;

    loadTableCariUmkm();
}


// ========================================
// TOGGLE DETAIL
// ========================================

function toggleDetailStiker(id){

    // TUTUP
    if(openedDetailStiker === id){

        openedDetailStiker = null;
    }

    // BUKA
    else {

        openedDetailStiker = id;
    }

    loadTableStiker();

    // AUTO SCROLL
    setTimeout(() => {

        const openedRow =
            document.querySelector(
                ".detail-row.show"
            );

        if(openedRow){

            openedRow.scrollIntoView({

                behavior: "smooth",

                block: "nearest"
            });
        }

    }, 50);
}

// ========================================
// CLOSE DETAIL OUTSIDE
// ========================================

function closeDetailStikerOutside(event){

    const clickedInside =
        event.target.closest(
            ".stiker-row, .detail-row"
        );

    // KLIK DIDALAM
    if(clickedInside){
        return;
    }

    // TIDAK ADA DETAIL TERBUKA
    if(openedDetailStiker === null){
        return;
    }

    // TUTUP DETAIL
    openedDetailStiker = null;

    loadTableStiker();
}


// ========================================
// HELPER
// ========================================

function getUMKM(id){

    return dataUMKM.find(
        item => item.id === id
    );
}

function bersihStiker(){
    selectedStiker = null;
    selectedCariUmkm = null;
    const ids = [
        'stiker-nama-usaha',
        'stiker-nama-pemilik',
        'stiker-alamat',
        'stiker-telp',
        'stiker-kode',
        'stiker-nama',
        'stiker-panjang',
        'stiker-lebar',
        'stiker-catatan'
    ];

    ids.forEach(id => {
       document.getElementById(id).value = "";
    });

    document.querySelectorAll('input[name="status-stiker"]').forEach(input => {
        input.checked = false;
    });
}

// ========================================
// SEARCH
// ========================================

function initSearchStiker(){

    const inputSearch =
        document.getElementById("search-stiker");

    inputSearch.addEventListener("input", function (){

        searchKeywordStiker =
            this.value.trim().toLowerCase();

        // RESET PAGE
        currentPageStiker = 1;

        // TUTUP DETAIL
        openedDetailStiker = null;

        // RELOAD TABLE
        loadTableStiker();
    });
}

function cariStikerUmkm(){
    const inputSearch =
        document.getElementById("cariUmkm");

        inputSearch.addEventListener("input", function () {

        searchKeywordCariUmkm =
            this.value.trim().toLowerCase();

        // RESET PAGE
        currentPageCariUmkm = 1;

        // RELOAD TABLE
        loadTableCariUmkm();
    });
}


// ========================================
// POPUP
// ========================================
function showPopupStiker(id = null){

    bersihStiker();

    const popup = document.getElementById("popup-stiker");

    // MODE TAMBAH
    if(id === null){

        isEditModeStiker = false;
        selectedStiker = null;
        selectedCariUmkm = null;

        popup.classList.add("show");

        console.log("Tambah Stiker");
        return;
    }

    // MODE EDIT
    isEditModeStiker = true;

    selectedStiker = dataStiker.find(item => item.id === id);

    if(!selectedStiker) return;

    selectedCariUmkm = getUMKM(selectedStiker.umkmId);

    if(selectedCariUmkm){
        document.getElementById("stiker-nama-usaha").value = selectedCariUmkm.namaUsaha;
        document.getElementById("stiker-nama-pemilik").value = selectedCariUmkm.namaPemilik;
        document.getElementById("stiker-telp").value = selectedCariUmkm.noTelp;
        document.getElementById("stiker-alamat").value = selectedCariUmkm.alamat;
    }

    document.getElementById("stiker-kode").value = selectedStiker.kodeStiker;
    document.getElementById("stiker-nama").value = selectedStiker.namaStiker;
    document.getElementById("stiker-panjang").value = selectedStiker.panjang;
    document.getElementById("stiker-lebar").value = selectedStiker.lebar;
    document.getElementById("stiker-catatan").value = selectedStiker.catatan;

    document.querySelector(
        `input[name="status-stiker"][value="${selectedStiker.status}"]`
    ).checked = true;

    popup.classList.add("show");

    console.log("Edit Stiker:", id);
    console.log("Umkm: ", selectedCariUmkm.namaUsaha);
}
function showPopupHapusStiker(id){

    selectedStiker = id;

    console.log("Stiker Id = " + id);

    document
        .getElementById(
            "popup-hapus-stiker"
        )
        .classList.add("active");
}
function tutupPopupStiker(popup){

    if(popup === "popup-stiker"){
        bersihStiker();
    }

    document.getElementById(popup).classList.remove("show");
    document.getElementById(popup).classList.remove("active");

}
function hapusStiker(){

    if(selectedStiker === null){
        return;
    }

    dataStiker = dataStiker.filter(
        item => item.id !== selectedStiker
    );

    selectedStiker = null;

    loadTableStiker();

    tutupPopupStiker("popup-hapus-stiker");
}
function showPopupCariUmkm() {
    searchKeywordCariUmkm = "";
    currentPageCariUmkm = 1;

    document.getElementById("cariUmkm").value = "";

    loadTableCariUmkm(); // wajib refresh table + pagination

    const popup = document.getElementById("popupStikerCariUmkm");
    popup.classList.add("show");
}

function pilihUmkm(id){

    const umkm = dataUMKM.find(item => item.id === id);

    if(!umkm) return;

    selectedCariUmkm = umkm;

    document.getElementById("stiker-nama-usaha").value = selectedCariUmkm.namaUsaha;
    document.getElementById("stiker-nama-pemilik").value = selectedCariUmkm.namaPemilik;
    document.getElementById("stiker-telp").value = selectedCariUmkm.noTelp;
    document.getElementById("stiker-alamat").value = selectedCariUmkm.alamat;

    tutupPopupStiker("popupStikerCariUmkm");

}

function validasiStiker() {

    const get = id => document.getElementById(id);

    function tandaiInvalid(element) {
        element.classList.remove("error-validasi");
        void element.offsetWidth;
        element.classList.add("error-validasi");

        setTimeout(() => {
            element.classList.remove("error-validasi");
        }, 800);
    }

    let valid = true;

    // VALIDASI UMKM
    if (!selectedCariUmkm) {
        tandaiInvalid(get("stiker-nama-usaha"));
        tandaiInvalid(get("stiker-nama-pemilik"));
        tandaiInvalid(get("stiker-telp"));
        valid = false;
    }

    // VALIDASI INPUT
    const fields = [
        "stiker-kode",
        "stiker-nama",
        "stiker-panjang",
        "stiker-lebar",
        "stiker-catatan",
        "stiker-alamat"
    ];

    fields.forEach(id => {
        const input = get(id);

        if (!input.value.trim()) {
            tandaiInvalid(input);
            valid = false;
        }
    });

    // status
    const status = document.querySelector('input[name="status-stiker"]:checked');

    if (!status) {
        tandaiInvalid(get('group-status-stiker'));
        valid = false;
    }

    return valid;
}

function simpanStiker(e){
    e.preventDefault();

    if(!validasiStiker()) return;

    const get = id => document.getElementById(id);
    const status = document.querySelector('input[name="status-stiker"]:checked');

    const stikerBaru = {
        id: isEditModeStiker ? selectedStiker.id : Date.now().toString(),
        umkmId: selectedCariUmkm.id,
        kodeStiker: get('stiker-kode').value.trim(),
        namaStiker: get('stiker-nama').value.trim(),
        panjang: Number(get('stiker-panjang').value),
        lebar: Number(get('stiker-lebar').value),
        catatan: get('stiker-catatan').value.trim(),
        status: status.value === 'true'
    };

    if (isEditModeStiker) {
        const index = dataStiker.findIndex(item => item.id === selectedStiker.id);

        if (index !== -1) {
            dataStiker[index] = stikerBaru;
        }
    } else {
        dataStiker.push(stikerBaru);
    }

    loadTableStiker();
    tutupPopupStiker("popup-stiker");
}


