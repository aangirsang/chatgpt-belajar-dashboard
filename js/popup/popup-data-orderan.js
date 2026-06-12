let callBackPopupDataOrder = null;
let selectedPopupDataOrder = null;
let selectedUmkmPopupDataOrder = null;
let selectedStikerPopupDataOrder = [];
let isEditModeDataOrder = false;

function showPopupDataOrder(onSelect, selectOrder = null) {
    callBackPopupDataOrder = onSelect;
    selectedPopupDataOrder = selectOrder;

    if(selectedPopupDataOrder == null){
        bersihPopupDataOrder();
    } else {
        isEditModeDataOrder = true;
    }

    document
        .getElementById("popup-data-order")
        .classList.add("show");
    console.log(isEditModeDataOrder);
}
async function loadPopupDataOrder() {
    if(document.getElementById("popup-data-order")){
        return;
    }

    const response = await fetch(
        "/pages/components/popup-data-order.html"
    )

    const html = await response.text();

    document.body.insertAdjacentHTML("beforeend", html);

    initPopupDataOrder();
}
function tutupPopupDataOrder() {
    document
        .getElementById("popup-data-order")
        .classList.remove("show");
}

function initPopupDataOrder() {
    getEl("data-order-tanggal").textContent =
        new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    getEl("data-order-faktur").textContent = generateFaktur();


    getEl("btn-batal-data-order").addEventListener("click", () => tutupPopupDataOrder())
    getEl("btn-umkm-data-order").addEventListener("click", () => tampilPopupDataUmkm())
    getEl("btn-stiker-data-order").addEventListener("click", () => tampilPopupDataStiker())
    getEl("btn-simpan-data-order").addEventListener("click", () => simpanDataOrder())

}

async function tampilPopupDataUmkm(){
    await loadPopupUmkm();

    showPopupUmkm((umkm) => {

            selectedUmkmPopupDataOrder = umkm;

            getEl("data-order-nama-usaha").textContent =
                umkm.namaUsaha;

            getEl("data-order-nama-pemilik").textContent =
                umkm.namaPemilik;

            getEl("data-order-instagram").textContent =
                umkm.sosialMedia;

            getEl("data-order-kontak").textContent =
                umkm.noTelp;

            tampilBtnStikerDataOrder(false);
        },
        selectedUmkmPopupDataOrder
    );
}
async function tampilPopupDataStiker() {
    await loadPopupStiker();

    showPopupPilihStiker(
        (stikerTerpilih) => {

            selectedStikerPopupDataOrder =
                [...stikerTerpilih];

            renderListStikerDataOrder();
        },
        selectedUmkmPopupDataOrder,
        selectedStikerPopupDataOrder
    );
}

function bersihPopupDataOrder(){
    selectedPopupDataOrder = null;
    selectedUmkmPopupDataOrder = null;
    selectedStikerPopupDataOrder = [];

    renderListStikerDataOrder();

    tampilBtnStikerDataOrder(true);

    [
        "data-order-nama-usaha",
        "data-order-nama-pemilik",
        "data-order-instagram",
        "data-order-kontak"
    ].forEach(id => getEl(id).textContent = "---------");

    getEl("data-order-jumlah").textContent =
        "0 Lembar";


    getEl("data-order-tanggal").textContent =
        new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    getEl("data-order-faktur").textContent = generateFaktur();

    isEditModeDataOrder = false;
}
function tampilBtnStikerDataOrder(status) {
    const btnStiker = getEl("btn-stiker-data-order");
    btnStiker.disabled = status;
    if (status === true){
        btnStiker.classList.add("btn-disabled");
    } else {
        btnStiker.classList.remove("btn-disabled");
    }
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
function renderListStikerDataOrder(){

    const container =
        getEl("data-order-stiker-list");

    if(!selectedStikerPopupDataOrder ||
        selectedStikerPopupDataOrder.length === 0){

        container.innerHTML = `
            <div class="empty-data">
                Belum ada stiker dipilih
            </div>
        `;

        return;
    }

    container.innerHTML =
        selectedStikerPopupDataOrder.map(stiker => `
        <div class="item-card"
        id="item-card-${stiker.id}"
        onclick="lihatStiker(${stiker.id})">

            <div class="stiker-image">
                <img
                    src="${stiker.gambar1 || noImageStiker}"
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
                        onclick="event.stopPropagation()"
                        oninput="
                            this.value=this.value.replace(/[^0-9]/g,'');
                            updateJumlahCetakDataOrder(${stiker.id}, this.value);
                        "
                        placeholder="Masukkan jumlah cetak">
            
                    <span class="input-satuan-lembar">Lembar</span>
                </div>
            
                <button
                    type="button"
                    onclick="
                    event.stopPropagation();
                    hapusStikerDataOrder(${stiker.id})
                    ">
                    Hapus
                </button>
                            
            </div>


        </div>
    `).join("");
}

function hapusStikerDataOrder(id){

    selectedStikerPopupDataOrder =
        selectedStikerPopupDataOrder.filter(
            item => item.id !== id
        );

    renderListStikerDataOrder();
    updateTotalJumlahDataOrder()
}
function updateJumlahCetakDataOrder(id, value){

    const stiker = selectedStikerPopupDataOrder.find(
        item => item.id === id
    );

    if(stiker){

        stiker.jumlahCetak =
            value === ""
                ? 0
                : parseInt(value);

        updateTotalJumlahDataOrder();
    }
}
function updateTotalJumlahDataOrder(){

    const total = selectedStikerPopupDataOrder.reduce(
        (sum, item) => sum + (item.jumlahCetak || 0),
        0
    );

    getEl("data-order-jumlah").textContent =
        `${total} Lembar`;
}
function validasiDataOrder() {

    const get = id => document.getElementById(id);

    function tandaiInvalid(element) {

        if (!element) return;

        element.classList.remove("error-validasi");
        void element.offsetWidth;
        element.classList.add("error-validasi");

        setTimeout(() => {
            element.classList.remove("error-validasi");
        }, 800);
    }

    let valid = true;

    if (!selectedUmkmPopupDataOrder) {
        tandaiInvalid(get("form-data-order-grid-kiri"));
        valid = false;
    }

    if (selectedStikerPopupDataOrder.length === 0) {
        tandaiInvalid(get("form-data-order-grid-kanan"));
        valid = false;
    }

    // validasi jumlah cetak
    selectedStikerPopupDataOrder.forEach(stiker => {

        if (!stiker.jumlahCetak || stiker.jumlahCetak <= 0) {

            tandaiInvalid(
                get(`item-card-${stiker.id}`)
            );

            valid = false;
        }

    });

    return valid;
}
function simpanDataOrder() {

    if (!validasiDataOrder()) return;

    const total = selectedStikerPopupDataOrder.reduce(
        (sum, item) => sum + (item.jumlahCetak || 0),
        0
    );

    const orderId = isEditModeDataOrder
        ? selectedPopupDataOrder.id
        : Date.now();

    const dataOrderBaru = {
        id: orderId,
        dataPenggunaId: 1,
        umkmId: selectedUmkmPopupDataOrder.id,
        faktur: getEl("data-order-faktur").textContent.trim(),
        tanggalOrderan: isEditModeDataOrder
            ? selectedPopupDataOrder.tanggalOrderan
            : new Date().toLocaleDateString("id-ID"),
        totalStiker: total
    };

    if (isEditModeDataOrder) {

        const index = dataOrderan.findIndex(
            item => item.id === selectedPopupDataOrder.id
        );

        if (index !== -1) {
            dataOrderan[index] = dataOrderBaru;
        }

    } else {

        dataOrderan.push(dataOrderBaru);
    }

    // simpan detail stiker
    simpanDataOrderRinci(orderId);

    tutupPopupDataOrder();
}

function simpanDataOrderRinci(orderId) {
    console.log("STIKER:", selectedStikerPopupDataOrder);
    // hapus detail lama jika edit
    dataOrderanRinci =
        dataOrderanRinci.filter(
            item => item.dataOrderanId !== orderId
        );

    selectedStikerPopupDataOrder.forEach(stiker => {

        dataOrderanRinci.push({
            id: Date.now() + Math.random(),
            dataOrderanId: orderId,
            dataStikerId: stiker.id,
            jumlahCetak: stiker.jumlahCetak || 0
        });

    });
}

window.loadPopupDataOrder = loadPopupDataOrder;
window.showPopupDataOrderan = showPopupDataOrder;
window.tutupPopupDataOrder = tutupPopupDataOrder;
