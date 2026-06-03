let callBackPilihStiker = null;
let currentPagePopupStiker = 1;
const rowsPerPagePopupStiker = 11;
let sortPopupStiker = "namaPemilik";
let selectedPopupStiker = null;
let selectedPopupStikerUmkm = null;
let cariKeywordPopupStiker = "";
let sortDirectionPopupStiker = "asc";

function initPopupStiker() {
    initCariPopupPilihStiker();
    loadTablePopupStiker();

    document
        .getElementById("batal-pilih-stiker-btn-popup")
        ?.addEventListener("click", () => {

            console.log("klik batal");

            tutupPopupPilihStiker();
        });
}

async function loadPopupStiker() {

    // cek agar tidak dimuat dua kali
    if(document.getElementById("popup-cari-stiker")){
        return;
    }

    const response = await fetch(
        "/pages/components/popup-cari-stiker.html"
    );

    const html = await response.text();

    document.body.insertAdjacentHTML(
        "beforeend",
        html
    );

    initPopupStiker();
}

function showPopupPilihStiker(onSelect, selectedUmkm, selectedStiker = null) {

    callBackPilihStiker = onSelect;

    selectedPopupStikerUmkm = selectedUmkm;

    selectedPopupStiker = selectedStiker;

    // reset pencarian
    cariKeywordPopupStiker = "";
    getEl("cari-popup-stiker").value = "";

    if(selectedPopupStiker === null){

        // buka dari halaman pertama
        currentPagePopupStiker = 1;

    } else {

        const filtered = filterDataPopupStiker();
        const sorted = sortedDataPopupStiker(filtered);

        const index = sorted.findIndex(
            item => item.id === selectedPopupStiker.id
        );

        if(index >= 0){
            currentPagePopupStiker =
                Math.floor(index / rowsPerPagePopupStiker) + 1;
        } else {
            currentPagePopupStiker = 1;
        }
    }

    loadTablePopupStiker();

    document
        .getElementById("popup-cari-stiker")
        .classList.add("show");
}

function initCariPopupPilihStiker(){
    getEl("cari-popup-stiker").addEventListener("input", function(){
        cariKeywordPopupStiker = this.value.trim().toLowerCase();
        currentPagePopupStiker = 1;
        loadTablePopupStiker();
    });
}

function tutupPopupPilihStiker() {

    document
        .getElementById("popup-cari-stiker")
        .classList.remove("show");
}

function loadTablePopupStiker(){
    const filtered = filterDataPopupStiker();
    const sorted = sortedDataPopupStiker(filtered);
    const paginated = getPaginatedData(sorted, currentPagePopupStiker, rowsPerPagePopupStiker)

    renderTabelPopupStiker(paginated);
    loadPagination("pagination-popup-stiker", filtered.length, currentPagePopupStiker, rowsPerPagePopupStiker, changePagePopupStiker)
}
function filterDataPopupStiker(){

    return dataStiker.filter(item => {

        const cocokUmkm =
            selectedPopupStikerUmkm &&
            item.umkmId === selectedPopupStikerUmkm.id;

        const cocokKeyword =
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(cariKeywordPopupStiker);

        return item.status &&
            cocokUmkm &&
            cocokKeyword;
    });
}
function sortedDataPopupStiker(data){
    return [...data].sort((a,b) => {
        const valueA = (a[sortPopupStiker] ?? "").toString().toLowerCase();
        const valueB = (b[sortPopupStiker] ?? "").toString().toLowerCase();

        const result = valueA.localeCompare(valueB);

        return sortDirectionPopupStiker === "asc"
            ? result
            : -result;
    });
}
function renderTabelPopupStiker(data){

    const tbody = getEl("popup-stiker-tbody");

    tbody.innerHTML = data.map(item =>
        createRowPopupStiker(item)
    ).join("");

    const selectedRow =
        tbody.querySelector(".selected-row");

    selectedRow?.scrollIntoView({
        block: "center"
    });
}
function createRowPopupStiker(item){
    return `
        <tr class="${selectedPopupStiker?.id === item.id ? "selected-row" : ""}"
            ondblclick="pilihPopupStiker(${item.id})">
            <td>${item.kodeStiker}</td>
            <td>${item.namaStiker}</td>
            <td>${item.panjang} x ${item.lebar}</td>
        </tr>
    `;
}
function changePagePopupStiker(page){
    const totalPages = Math.ceil(filterDataPopupStiker().length / rowsPerPagePopupStiker);

    if(page < 1 || page > totalPages) return;

    currentPagePopupStiker = page;

    loadTablePopupStiker();
}
function pilihPopupStiker(id){
    const stiker = getStiker(id);
    if(!stiker) return;

    selectedPopupStiker = stiker;

    /*
    isiDataUmkm(umkm);

    if(!isEditModeStiker){
        getEl("stiker-kode").value = generateKodeStiker(umkm);
    }

     */
    if(callBackPilihStiker) {
        callBackPilihStiker(selectedPopupStiker);
    }

    tutupPopupPilihStiker();
}