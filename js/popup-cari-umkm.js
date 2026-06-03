let callbackPilihUmkm = null;

let currentPagePopupUmkm = 1;
const rowsPerPagePopupUmkm = 11;
let sortPopupUmkm = "namaPemilik";
let selectedPopupUmkm = null;
let cariKeywordPopupUmkm = "";
let sortDirectionPopupUmkm = "asc";

function initPopupCariUmkm() {

    initCariPopupUmkm();
    loadTablePopupUmkm();

    console.log("init popup");

    document
        .getElementById("batal-pilih-umkm-btn")
        ?.addEventListener("click", () => {

            console.log("klik batal");

            tutupPopupUmkm();
        });

}

function initCariPopupUmkm(){
    getEl("cari-popup-umkm").addEventListener("input", function(){
        cariKeywordPopupUmkm = this.value.trim().toLowerCase();
        currentPagePopupUmkm = 1;
        loadTablePopupUmkm();
    });
}

async function loadPopupUmkm() {

    // cek agar tidak dimuat dua kali
    if(document.getElementById("popup-cari-umkm")){
        return;
    }

    const response = await fetch(
        "/pages/components/popup-cari-umkm.html"
    );

    const html = await response.text();

    document.body.insertAdjacentHTML(
        "beforeend",
        html
    );

    initPopupCariUmkm();
}

function showPopupUmkm(onSelect, selectedUmkm = null) {

    callbackPilihUmkm = onSelect;

    selectedPopupUmkm = selectedUmkm;

    // reset pencarian
    cariKeywordPopupUmkm = "";
    getEl("cari-popup-umkm").value = "";

    if(selectedPopupUmkm === null){

        // buka dari halaman pertama
        currentPagePopupUmkm = 1;

    } else {

        const filtered = filterDataPopupUmkm();
        const sorted = sortedDataPopupUmkm(filtered);

        const index = sorted.findIndex(
            item => item.id === selectedPopupUmkm.id
        );

        if(index >= 0){
            currentPagePopupUmkm =
                Math.floor(index / rowsPerPagePopupUmkm) + 1;
        } else {
            currentPagePopupUmkm = 1;
        }
    }

    loadTablePopupUmkm();

    document
        .getElementById("popup-cari-umkm")
        .classList.add("show");
}

function tutupPopupUmkm() {

    document
        .getElementById("popup-cari-umkm")
        .classList.remove("show");
}

function sortTablePopupUmkm(field){
    if(sortPopupUmkm === field){
        sortDirectionPopupUmkm = sortDirectionPopupUmkm === "asc" ? "desc" : "asc";
    } else {
        sortPopupUmkm = field;
        sortDirectionPopupUmkm = "asc";
    }

    loadTablePopupUmkm();
}

function loadTablePopupUmkm(){
    const filtered = filterDataPopupUmkm();
    const sorted = sortedDataPopupUmkm(filtered);
    const paginated = getPaginatedData(sorted, currentPagePopupUmkm, rowsPerPagePopupUmkm)

    renderTabelPopupUmkm(paginated);
    loadPagination("pagination-popup-umkm", filtered.length, currentPagePopupUmkm, rowsPerPagePopupUmkm, changePagePopupUmkm)
}

function filterDataPopupUmkm(){
    return dataUMKM.filter(item =>
        item.status &&
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(cariKeywordPopupUmkm)
    );
}
function sortedDataPopupUmkm(data){
    return [...data].sort((a,b) => {
        const valueA = (a[sortPopupUmkm] ?? "").toString().toLowerCase();
        const valueB = (b[sortPopupUmkm] ?? "").toString().toLowerCase();

        const result = valueA.localeCompare(valueB);

        return sortDirectionPopupUmkm === "asc"
            ? result
            : -result;
    });
}
function renderTabelPopupUmkm(data){

    const tbody = getEl("popup-umkm-tbody");

    tbody.innerHTML = data.map(item =>
        createRowPopupUmkm(item)
    ).join("");

    const selectedRow =
        tbody.querySelector(".selected-row");

    selectedRow?.scrollIntoView({
        block: "center"
    });
}
function createRowPopupUmkm(item){
    return `
        <tr class="${selectedPopupUmkm?.id === item.id ? "selected-row" : ""}"
            ondblclick="pilihPopupUmkm(${item.id})">
            <td>${item.namaUsaha}</td>
            <td>${item.namaPemilik}</td>
            <td>${item.noTelp}</td>
            <td>${item.sosialMedia}</td>
        </tr>
    `;
}
function changePagePopupUmkm(page){
    const totalPages = Math.ceil(filterDataPopupUmkm().length / rowsPerPagePopupUmkm);

    if(page < 1 || page > totalPages) return;

    currentPagePopupUmkm = page;

    loadTablePopupUmkm();
}
function pilihPopupUmkm(id){
    const umkm = getUMKM(id);
    if(!umkm) return;

    selectedPopupUmkm = umkm;

    /*
    isiDataUmkm(umkm);

    if(!isEditModeStiker){
        getEl("stiker-kode").value = generateKodeStiker(umkm);
    }

     */
    if(callbackPilihUmkm) {
        callbackPilihUmkm(selectedPopupUmkm);
    }

    tutupPopupUmkm();
}

window.loadPopupCariUmkm = loadPopupUmkm;
window.showPopupCariUmkmP = showPopupUmkm;