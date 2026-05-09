// ISI TABEL PENGGUNA
function loadTablePengguna() {
    const dataPengguna = [
        {
            nama: "Andri Saiful Girsang",
            akun: "andri",
            level: "Administrator",
            status: "aktif"
        },
        {
            nama: "Haditama Yahya Girsang",
            akun: "hadi",
            level: "User",
            status: "aktif"
        }
    ];

    // SORT BERDASARKAN LEVEL
    dataPengguna.sort((a, b) =>
        a.level.localeCompare(b.level)
    );

    const tbody = document.getElementById('pengguna-tbl-body');
    tbody.innerHTML = '';

    dataPengguna.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>${item.akun}</td>
                <td>${item.level}</td>
                <td>${item.status}</td>
                <td>
                    <div class="actions">
                        <button onclick="showPopupEdit(this)">
                            <span class="material-symbols-sharp">edit</span>
                        </button>
                        <button onclick="showPopupHapus(this)">
                            <span class="material-symbols-sharp">delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

let selectedRow = null;

function showPopupHapus(button){

    selectedRow = button.closest('tr');

    document
        .getElementById('popup-hapus')
        .classList.add('active');
}

function showPopupEdit(button){
    selectedRow = button.closest('tr');
    document
        .getElementById('popup-edit')
        .classList.add('active');
}

function initPopupPengguna(){
    //POPUP HAPUS
    const batalBtn =
        document.getElementById('batal-btn');

    const konfirmasiBtn =
        document.getElementById('konfirmasi-hapus-btn');

    if(batalBtn){

        batalBtn.addEventListener('click', () => {

            document
                .getElementById('popup-hapus')
                .classList.remove('active');
        });
    }

    if(konfirmasiBtn){

        konfirmasiBtn.addEventListener('click', () => {

            if(selectedRow){
                selectedRow.remove();
            }

            document
                .getElementById('popup-hapus')
                .classList.remove('active');
        });
    }

    //POPUP EDIT
    const batalEditBtn = document.getElementById('batal-edit-btn')

    if(batalEditBtn) {
        batalEditBtn.addEventListener('click', () => {
            document.getElementById('popup-edit').classList.remove('active');
        })
    }
}
