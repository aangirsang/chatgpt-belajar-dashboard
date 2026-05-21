let currentPageOrderan = 1;
let openedDetailOrderan = null;
const rowsPerPageOrderan = 15;

let sortOrderan = "faktur";
let sortDirectionOrderan = "asc";

let selectedOrderan = null;
let searchKeywordOrderan = "";
let isEditModeOrderan = false;

// ========================================
// INIT
// ========================================

function initOrderan(){
    loadTableOrderan();
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

        const semuaData = [
            ...Object.values(item),
            ...(umkm ? Object.values(umkm) : [])
        ]
            .join(" ")
            .toLowerCase();

        return semuaData.includes(
            searchKeywordOrderan.toLowerCase()
        );
    });
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

        totalStiker += rincian.jumlah;

        detailRows += `
            <tr>
                <td>${stiker?.namaStiker ?? "-"}</td>
                <td>${stiker?.panjang ?? 0} x ${stiker?.lebar ?? 0}</td>
                <td>${rinci.jumlah} Lembar</td>
            </tr>
        `;
    });

    return `
        <tr class="orderan-row" onclick="toggleDetailOrderan(${item.id})">
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
