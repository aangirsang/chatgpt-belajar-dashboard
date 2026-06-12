
let selectedPopupLihatStiker = null;

function initPopupLihatStiker() {
    setDefaultPreviewImage();

    document.addEventListener("click", e => {
        if(e.target.id === "tutup-popup-lihat-stiker"){
            tutupPopupLihatStiker();
        }
    });
}

async function loadPopupLihatStiker() {

    // cek agar tidak dimuat dua kali
    if(document.getElementById("popup-lihat-stiker")){
        return;
    }

    const response = await fetch(
        "/pages/components/popup-lihat-stiker.html"
    );

    const html = await response.text();

    document.body.insertAdjacentHTML(
        "beforeend",
        html
    );

    initPopupLihatStiker();
}

function showPopupLihatStiker(selectedStiker) {

    selectedPopupLihatStiker = selectedStiker;

    getEl("lihat-stiker-kode").textContent = selectedStiker.kodeStiker;
    getEl("lihat-stiker-nama").textContent = selectedStiker.namaStiker;
    getEl("lihat-stiker-ukuran").textContent = `${selectedStiker.panjang} x ${selectedStiker.lebar} cm`;
    getEl("lihat-stiker-status").textContent = `${selectedStiker.status ? "Aktif" : "Non-Aktif"}`;
    getEl("lihat-stiker-catatan").textContent = selectedStiker.catatan;

    setPreviewGambarPopupLihatStiker(1, selectedStiker.gambar1);
    setPreviewGambarPopupLihatStiker(2, selectedStiker.gambar2);

    document
        .getElementById("popup-lihat-stiker")
        .classList.add("show");
}
function tutupPopupLihatStiker() {

    document
        .getElementById("popup-lihat-stiker")
        .classList.remove("show");
}

function setPreviewGambarPopupLihatStiker(index, path){
    const img = document.getElementById(
        `popup-lihat-stiker-gambar-${index}`
    );

    if(path){
        img.src = path;
        img.dataset.path = path;
    } else {
        img.src = noImageStiker;
        img.dataset.path = "";
    }
}

window.loadPopupLihatStiker = loadPopupLihatStiker;
window.showPopupLihatStiker = showPopupLihatStiker;
window.tutupPopupLihatStiker = tutupPopupLihatStiker;