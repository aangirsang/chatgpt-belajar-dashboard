let callBackPilihStiker = null;
let currentPagePopupStiker = 1;
const rowsPerPagePopupStiker = 11;
let sortPopupStiker = "namaPemilik";
let selectedPopupStiker = [];
let selectedPopupStikerUmkm = null;
let cariKeywordPopupStiker = "";
let sortDirectionPopupStiker = "asc";

function initPopupStiker() {
    initCariPopupPilihStiker();
    loadTablePopupStiker();

    document.addEventListener("click", e => {
        if(e.target.id === "batal-pilih-stiker-btn-popup"){
            tutupPopupPilihStiker();
        }
    });

    getEl("")
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

function showPopupPilihStiker(onSelect, selectedUmkm, selectedStiker = []) {

    callBackPilihStiker = onSelect;

    selectedPopupStikerUmkm = selectedUmkm;

    selectedPopupStiker = selectedStiker;

    // reset pencarian
    cariKeywordPopupStiker = "";

    const input = getEl("cari-popup-stiker");

    if (input) {
        input.value = "";
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

    renderTabelPopupStiker(sorted);
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
    const container =
        getEl("popup-stiker-list");

    container.innerHTML = data.map(item =>
        createCardPopupStiker(item)
    ).join("");

    initTooltipStiker();
}
function initTooltipStiker(){

    const tooltip =
        document.getElementById("tooltip-stiker");

    document
        .querySelectorAll(".item-card")
        .forEach(card => {

            card.addEventListener("mouseenter", () => {

                tooltip.textContent =
                    card.dataset.tooltip;

                tooltip.classList.add("show");
            });

            card.addEventListener("mousemove", e => {

                tooltip.style.left =
                    (e.clientX + 15) + "px";

                tooltip.style.top =
                    (e.clientY + 15) + "px";
            });

            card.addEventListener("mouseleave", () => {

                tooltip.classList.remove("show");
            });
        });
}
function createCardPopupStiker(item){

    const isSelected =
        selectedPopupStiker.some(
            stiker => stiker.id === item.id
        );

    return `
        <div
            class="item-card ${isSelected ? "selected" : ""}" 
            data-tooltip="${item.namaStiker} (${item.panjang} x ${item.lebar} cm)"
            onclick="toggleSelectPopupStiker(${item.id})">

            <div class="stiker-image">
                <img
                    src="${item.gambar1 || noImageStiker}"
                    alt="${item.namaStiker}">
            </div>

            <div class="stiker-info">
                <div class="stiker-nama">
                    ${item.namaStiker}
                </div>

                <div class="stiker-ukuran">
                    ${item.panjang} x ${item.lebar} cm
                </div>
            </div>
            <div class="btn-card">
                <button
                    type="button"
                    onclick="event.stopPropagation(); 
                    lihatStiker(${item.id})">
                    Lihat Stiker
                </button>
            </div>
        </div>
    `;
}
function pilihPopupStiker(){

    if(selectedPopupStiker.length === 0){
        alert("Pilih minimal satu stiker");
        return;
    }

    if(callBackPilihStiker){
        callBackPilihStiker(selectedPopupStiker);
    }

    tutupPopupPilihStiker();
}
function toggleSelectPopupStiker(id){

    const index = selectedPopupStiker.findIndex(
        item => item.id === id
    );

    if(index >= 0){

        // unselect
        selectedPopupStiker.splice(index, 1);

    } else {

        const stiker = getStiker(id);

        if(stiker){
            selectedPopupStiker.push(stiker);
        }
    }

    loadTablePopupStiker();
}

async function lihatStiker(id) {

    await loadPopupLihatStiker();

    const stiker = getStiker(id);

    if (!stiker) return;

    showPopupLihatStiker(stiker);
}
