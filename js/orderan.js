let currentPageOrderan = 1;
let openedDetailOrderan = null;
const rowsPerPageOrderan = 5;

let sortOrderan = "faktur";
let sortDirectionOrderan = "asc";

let selectedOrderan = null;
let selectedOrderanUmkm = null;
let selectedOrderanStiker = [];
let searchKeywordOrderan = "";
let isEditModeOrderan = false;

let tanggalAwalOrderan = "";
let tanggalAkhirOrderan = "";



// ========================================
// INIT
// ========================================

async function initOrderan(){
    tanggalAwalOrderan = "";
    tanggalAkhirOrderan = "";


    loadTableOrderan();

    document.removeEventListener("click", closeDetailOrderanOutside);
    document.addEventListener("click", closeDetailOrderanOutside);

    // SEARCH
    document
        .getElementById("search-orderan")
        ?.addEventListener("input", cariOrderan);

    // RANGE TANGGAL
    document
        .getElementById("tanggal-awal")
        ?.addEventListener("change", filterTanggalOrderan);

    document
        .getElementById("tanggal-akhir")
        ?.addEventListener("change", filterTanggalOrderan);

    getEl("tambah-orderan-btn").addEventListener("click", () => showPopupOrderan())
    getEl("batal-edit-orderan").addEventListener("click", () => tutupPopupOrderan("popup-orderan"));

    getEl("orderan-umkm-btn")
        .addEventListener("click", async () => {

            await loadPopupUmkm();

            showPopupUmkm((umkm) => {

                selectedOrderanUmkm = umkm;

                getEl("orderan-nama-usaha").textContent =
                    umkm.namaUsaha;

                getEl("orderan-nama-pemilik").textContent =
                    umkm.namaPemilik;

                getEl("orderan-instagram").textContent =
                    umkm.sosialMedia;

                getEl("orderan-kontak").textContent =
                    umkm.noTelp;

                tampilBtnStiker(false);
            },
                selectedOrderanUmkm
            );
        });
    getEl("orderan-stiker-btn")
        .addEventListener("click", async () => {

            await loadPopupStiker();

            showPopupPilihStiker(
                (stikerTerpilih) => {

                    selectedOrderanStiker =
                        [...stikerTerpilih];

                    renderOrderanStikerList();
                },
                selectedOrderanUmkm,
                selectedOrderanStiker
            );
        });
}

// ========================================
// LOAD TABLE
// ========================================

function loadTableOrderan(){

    const filtered = getFilteredDataOrderan();
    const sorted = getSortedDataOrderan(filtered);
    const paginated = getPaginatedData(
        sorted,
        currentPageOrderan,
        rowsPerPageOrderan
    );

    renderTableOrderan(paginated);
    loadPagination("pagination", filtered.length, currentPageOrderan, rowsPerPageOrderan, changePageOrderan);
}

// ========================================
// FILTER
// ========================================

function getFilteredDataOrderan(){

    return dataOrderan.filter(item => {

        const umkm = getUMKM(item.umkmId);

        // SEARCH TEXT
        const semuaData = [
            ...Object.values(item),
            ...(umkm ? Object.values(umkm) : [])
        ]
            .join(" ")
            .toLowerCase();

        const cocokKeyword =
            semuaData.includes(
                searchKeywordOrderan.toLowerCase()
            );

        // ========================================
        // FILTER TANGGAL
        // ========================================

        // format item: dd-mm-yyyy
        const [hari, bulan, tahun] =
            item.tanggalOrderan.split("-");

        const tanggalItem =
            new Date(`${tahun}-${bulan}-${hari}`);

        let cocokTanggal = true;

        // hanya tanggal awal
        if(tanggalAwalOrderan && !tanggalAkhirOrderan){

            cocokTanggal =
                tanggalItem.getTime() ===
                new Date(tanggalAwalOrderan).getTime();
        }

        // hanya tanggal akhir
        else if(!tanggalAwalOrderan && tanggalAkhirOrderan){

            cocokTanggal =
                tanggalItem.getTime() ===
                new Date(tanggalAkhirOrderan).getTime();
        }

        // range tanggal
        else if(tanggalAwalOrderan && tanggalAkhirOrderan){

            const awal =
                new Date(tanggalAwalOrderan);

            const akhir =
                new Date(tanggalAkhirOrderan);

            akhir.setHours(23,59,59,999);

            cocokTanggal =
                tanggalItem >= awal &&
                tanggalItem <= akhir;
        }

        return cocokKeyword && cocokTanggal;
    });
}

function cariOrderan(){

    searchKeywordOrderan =
        document
            .getElementById("search-orderan")
            .value
            .toLowerCase()
            .trim();

    currentPageOrderan = 1;

    loadTableOrderan();
}

function filterTanggalOrderan(){

    tanggalAwalOrderan =
        document.getElementById("tanggal-awal").value;

    tanggalAkhirOrderan =
        document.getElementById("tanggal-akhir").value;

    currentPageOrderan = 1;

    loadTableOrderan();
}

// ========================================
// SORT
// ========================================

function getSortedDataOrderan(data){

    return [...data].sort((a,b) => {

        let valueA;
        let valueB;

        if(sortOrderan === "namaUsaha"){

            valueA = getUMKM(a.umkmId)?.namaUsaha ?? "";
            valueB = getUMKM(b.umkmId)?.namaUsaha ?? "";

        } else {

            valueA = a[sortOrderan];
            valueB = b[sortOrderan];
        }

        const result =
            typeof valueA === "string"
                ? valueA.localeCompare(valueB)
                : valueA - valueB;

        return sortDirectionOrderan === "asc"
            ? result
            : -result;
    });
}

// ========================================
// RENDER
// ========================================

function renderTableOrderan(data){

    const tbody = getEl("orderan-tbl-body");

    tbody.innerHTML = data.map(item => {

        const umkm = getUMKM(item.umkmId);

        const opened =
            openedDetailOrderan === item.id;

        return createRowsOrderan(
            item,
            umkm,
            opened
        );

    }).join("");
}

// ========================================
// GET ORDERAN RINCI
// ========================================

function getOrderanRinci(dataOrderanId){

    return dataOrderanRinci.filter(
        item => item.dataOrderanId === dataOrderanId
    );
}

// ========================================
// TOGGLE DETAIL
// ========================================

function toggleDetailOrderan(id){
    openedDetailOrderan = openedDetailOrderan === id ? null : id;
    loadTableOrderan();
    setTimeout(() => {
        document.querySelector(".detail-row.show")?.scrollIntoView( {
            behavior: "smooth",
            block:"nearest"
        });
    }, 50);
}

function closeDetailOrderanOutside(event){
    if(event.target.closest(".orderan-row, .detail-row")) return;
    if(openedDetailOrderan === null) return;

    openedDetailOrderan = null;
    loadTableOrderan();
}
// ========================================
// CREATE ROW
// ========================================

function createRowsOrderan(item, umkm, opened){

    const rincian = getOrderanRinci(item.id);

    let detailRows = "";

    let totalStiker = 0;

    rincian.forEach(rinci => {

        const stiker = dataStiker.find(
            stiker => stiker.id === rinci.dataStikerId
        );

        totalStiker += rinci.jumlah;

        detailRows += `
            <tr>
                <td>${stiker?.namaStiker ?? "-"}</td>
                <td>${stiker?.panjang ?? 0} x ${stiker?.lebar ?? 0}</td>
                <td>${rinci.jumlah} Lembar</td>
            </tr>
        `;
    });

    return `
        <tr class="orderan-row"  onclick="event.stopPropagation(); toggleDetailOrderan(${item.id})">
            <td>${item.faktur}</td>
            <td>${item.tanggalOrderan}</td>
            <td>${umkm?.namaUsaha ?? "-"}</td>
            <td>${item.totalStiker} Lembar</td>
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
                                <th>Nama Stiker</th>
                                <th>Ukuran</th>
                                <th>Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${detailRows}
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    `;
}

// ========================================
// PAGE CHANGE
// ========================================

function changePageOrderan(page){
    const totalPages = Math.ceil(getFilteredDataOrderan().length / rowsPerPageOrderan);

    if(page < 1 || page > totalPages) return;

    currentPageOrderan = page;

    loadTableOrderan();
}

// ========================================
// SORT ACTION
// ========================================

function sortTableOrderan(field){
    if(sortOrderan === field){
        sortDirectionOrderan = sortDirectionOrderan === "asc" ? "desc" : "asc";
    } else {
        sortOrderan = field;
        sortDirectionOrderan = "asc";
    }

    loadTableOrderan();
}

// ========================================
// FORM
// ========================================

function tampilBtnStiker(status) {
    const btnStiker = getEl("orderan-stiker-btn");
    btnStiker.disabled = status;
    if (status === true){
        btnStiker.classList.add("btn-disabled");
    } else {
        btnStiker.classList.remove("btn-disabled");
    }
}

function bersihOrderan(){
    selectedOrderan = null;
    selectedOrderanUmkm = null;
    selectedOrderanStiker = [];

    renderOrderanStikerList();

    tampilBtnStiker(true);



    [
        "orderan-nama-usaha",
        "orderan-nama-pemilik",
        "orderan-instagram",
        "orderan-kontak"
    ].forEach(id => getEl(id).textContent = "---------");


    getEl("orderan-tanggal").textContent =
        getEl("orderan-tanggal").textContent =
            new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });

    getEl("orderan-faktur").textContent = generateFaktur();
}

// ========================================
// POPUP
// ========================================

function showPopupOrderan(id = null){
    bersihOrderan();

    const popup = getEl("popup-orderan");
    const btnUmkm = getEl("orderan-umkm-btn");

    if(id === null){
        isEditModeOrderan = false;

        btnUmkm.disabled = false;
        btnUmkm.classList.remove("btn-disabled");

        popup.classList.add("show");
        return;
    }
    isEditModeOrderan = true;
    btnUmkm.disabled = true;
    btnUmkm.classList.add("btn-disabled");

    //return;
}

function tutupPopupOrderan(id){
    //if(id === "popup-stiker") bersihStiker();

    getEl(id).classList.remove("show");
    getEl(id).classList.remove("active");
}
function generateFaktur() {

    const tahun = new Date().getFullYear().toString().slice(-2);

    // Ambil semua faktur tahun ini
    const orderanTahunIni = dataOrderan.filter(item => {
        return item.faktur.startsWith(`RBBB-${tahun}`);
    });

    // Cari nomor terbesar
    let nomorTerbesar = 0;

    orderanTahunIni.forEach(item => {

        const nomor = parseInt(
            item.faktur.split("-")[1].slice(2)
        );

        if(nomor > nomorTerbesar){
            nomorTerbesar = nomor;
        }
    });

    // Nomor berikutnya
    const nomorBaru = nomorTerbesar + 1;

    // Format 0001
    const nomorFormat = String(nomorBaru).padStart(4, "0");

    return `RBBB-${tahun}${nomorFormat}`;
}

function renderOrderanStikerList(){

    const container =
        getEl("orderan-stiker-list");

    if(!selectedOrderanStiker ||
        selectedOrderanStiker.length === 0){

        container.innerHTML = `
            <div class="empty-data">
                Belum ada stiker dipilih
            </div>
        `;

        return;
    }

    container.innerHTML =
        selectedOrderanStiker.map(stiker => `
        <div class="item-card">

            <div class="stiker-image">
                <img
                    src="${stiker.gambar1}"
                    alt="${stiker.namaStiker}">
            </div>

            <div class="stiker-info">
                <div class="stiker-nama">
                    ${stiker.namaStiker}
                </div>

                <div class="stiker-ukuran">
                    ${stiker.panjang} x ${stiker.lebar} cm
                </div>
            </div>

            <div class="jumlah-cetak-group">

                <label>Jumlah Cetak</label>
            
                <div class="input-jumlah-wrapper">
                    <input
                        type="text"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        oninput="
                            this.value=this.value.replace(/[^0-9]/g,'');
                            updateJumlahCetak(${stiker.id}, this.value);
                        "
                        placeholder="Masukkan jumlah cetak">
            
                    <span class="input-satuan-lembar">Lembar</span>
                </div>
            
                <button
                    type="button"
                    onclick="hapusStikerOrderan(${stiker.id})">
                    Hapus
                </button>
            
            </div>


        </div>
    `).join("");
}

function hapusStikerOrderan(id){

    selectedOrderanStiker =
        selectedOrderanStiker.filter(
            item => item.id !== id
        );

    renderOrderanStikerList();
}
function updateJumlahCetak(id, value){

    const stiker = selectedOrderanStiker.find(
        item => item.id === id
    );

    if(stiker){
        stiker.jumlahCetak =
            value === ""
                ? 0
                : parseInt(value);
    }
}