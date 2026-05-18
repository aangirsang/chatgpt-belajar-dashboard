let umkmChart
let orderChart
// LOAD HALAMAN CONTENT
async function loadPage(page) {

    const content = document.getElementById('content');
    const title = document.getElementById('page-title');

    // TITLE MANUAL
    const pageTitles = {
        dashboard: 'Dashboard',
        pengguna: 'Data Pengguna',
        'master-data': 'Master Data Aplikasi',
        'umkm': 'Anggota UMKM',
        laporan: 'Laporan Penjualan'
    };

    try {

        const response = await fetch(`pages/${page}.html`);

        const data = await response.text();
        //console.log(data);

        content.innerHTML = data;

        // AMBIL TITLE
        const pageTitle = pageTitles[page] || 'Aplikasi';

        // TITLE DI HALAMAN
        title.innerText = pageTitle;

        // TITLE TAB BROWSER
        document.title = pageTitle;

        /* global Chart */
        if(page === 'dashboard'){
            Chart.defaults.font.family = 'Poppins';
            Chart.defaults.font.size = 12;
            loadCharts();
            loadTableOrder();
        }

        if(page === 'pengguna'){
            loadTablePengguna();
            initPopupPengguna();
        }

        if(page === 'master-data'){
            initMasterData();
        }

        if(page === 'umkm'){
            initUmkm();
        }

        if(page === 'stiker'){
            initStiker();
        }

    } catch (error) {

        content.innerHTML = `
            <div class="card">
                <h2>Error</h2>
                <p>Halaman gagal dimuat</p>
            </div>
        `;

        document.title = 'Error';

        console.error(error);
    }
}

/* LOAD HALAMAN PERTAMA */
void loadPage('dashboard');

// SUBMENU
function toggleSubmenu(submenuId, arrowId){

    const submenu =
        document.getElementById(submenuId);

    const arrow =
        document.getElementById(arrowId);

    submenu.classList.toggle('active');

    arrow.classList.toggle('rotate');
}


//GANTI TEMA
const themeToggler = document.querySelector(".theme-toggler");

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    /* global Chart */
    if(document.body.classList.contains('dark-theme-variables')){
        Chart.defaults.color = '#edeffd';
    }else{
        Chart.defaults.color = '#363949';
    }

    umkmChart.destroy();
    orderChart.destroy();
    loadCharts();

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})


/* MENU AKTIF */
const menuItems = document.querySelectorAll('.sidebar a');

menuItems.forEach(item => {
    item.addEventListener('click', function () {

        menuItems.forEach(menu => {
            menu.classList.remove('active');
        });

        this.classList.add('active');
    });
});

//DIAGRAM BATANG
function loadCharts(){

    const dataUmkm = [
        { nama: 'Dapurnyaa Ria', total: 120 },
        { nama: 'Yoyu', total: 190 },
        { nama: 'Odang-Odeng', total: 80 },
        { nama: 'Turunan Cabe', total: 150 },
        { nama: 'Cahaya Sajaril', total: 130 },
        { nama: 'Dapurnyaa Ria', total: 20 },
        { nama: 'Bakulan Adek Gopal', total: 90 },
        { nama: 'Odang-Odeng', total:50 },
        { nama: 'Turunan Cabe', total: 150 },
        { nama: 'Cahaya Sajaril', total: 10 }
    ];

    const backgroundColor= [
        '#60A5FA',
        '#34D399',
        '#FBBF24',
        '#F87171',
        '#A78BFA',
        '#fb71f4',
        '#2DD4BF',
        '#f4c772',
        '#a3de4a',
        '#f88838'
    ]

    const barCtx = document.getElementById('barChart');
    const lineCtx = document.getElementById('lineChart');

    if (!barCtx || !lineCtx) {
        console.error("Canvas chart tidak ditemukan");
        return;
    }


    // SORT ASCENDING
    dataUmkm.sort((a, b) => b.total - a.total);

    // AMBIL 10 DATA
    const topData = dataUmkm.slice(0, 10);

    // AMBIL LABEL & DATA
    //const labels = dataUmkm.map(item => item.nama);

    // BATASI PANJANG LABEL
    const labels = topData.map(item => {
        if(item.nama.length > 20){
            return item.nama.substring(0, 20) + '...';
        }
        return item.nama;
    });

    const values = topData.map(item => item.total);

    // Diagram Batang

    /* global Chart */
    umkmChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jumlah Order',
                data: values,
                backgroundColor: backgroundColor,
                borderWidth: 0,
                borderRadius: 10,
                barThickness: 25
            }]
        },
        options: {
            indexAxis: 'y', // MEMBUAT MENJADI HORIZONTAL
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true
                }
            },
            scales: {
                x: {
                    display: false,
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                        display: false
                    },
                    ticks: {
                        stepSize: 5
                    }
                },
                y: {
                    grid: {
                        display: false
                    },

                }
            }
        }
    });


    // Diagram Garis

    const dataOrderan = [
        {bulan: "Desember", total: 250},
        {bulan: "Januari", total: 346},
        {bulan: "Februari", total: 380},
        {bulan: "Maret", total: 410},
        {bulan: "April", total: 350},
        {bulan: "Mei", total: 250}
    ]

    const bulans = dataOrderan.map(item => item.bulan)
    const valuesOrderan = dataOrderan.map(item => item.total);
    orderChart = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: bulans,
            datasets: [{
                label: 'Pesanan',
                data: valuesOrderan,
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                y: {
                    ticks: {
                        display: false
                    },
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

}

//ISI TABEL ORDER DASHBOARD
function loadTableOrder(){

    const dataOrder = [

        {
            tanggal: '2026-05-08',
            namaUmkm: 'Dapurnyaa Ria',
            namaStiker: 'Stiker Panjang 3x13',
            jumlah: 10
        },
        {
            tanggal: '2026-05-08',
            namaUmkm: 'Dapurnyaa Ria',
            namaStiker: 'Stiker Panjang 1x15',
            jumlah: 10
        },
        {
            tanggal: '2026-05-08',
            namaUmkm: 'Dapurnyaa Ria',
            namaStiker: 'Stiker Bulat 3X3',
            jumlah: 10
        },
        {
            tanggal: '2026-05-08',
            namaUmkm: 'Dapurnyaa Ria',
            namaStiker: 'Stiker Risol',
            jumlah: 4
        },
        {
            tanggal: '2026-05-08',
            namaUmkm: 'Dapurnyaa Ria',
            namaStiker: 'Stiker Bites',
            jumlah: 5
        },

        {
            tanggal: '2026-05-06',
            namaUmkm: 'Yoyu',
            namaStiker: 'Stiker Makanan',
            jumlah: 80
        },

        {
            tanggal: '2026-05-09',
            namaUmkm: 'Bakulan Adek Gopal',
            namaStiker: 'Stiker Kemasan',
            jumlah: 200
        },

        {
            tanggal: '2026-05-07',
            namaUmkm: 'Turunan Cabe',
            namaStiker: 'Stiker Pedas',
            jumlah: 150
        },

        {
            tanggal: '2026-05-06',
            namaUmkm: 'Yoyu',
            namaStiker: 'Stiker Makanan',
            jumlah: 80
        },

        {
            tanggal: '2026-05-09',
            namaUmkm: 'Odang-Odeng',
            namaStiker: 'Stiker Kemasan',
            jumlah: 200
        },

        {
            tanggal: '2026-03-07',
            namaUmkm: 'Turunan Cabe',
            namaStiker: 'Stiker Pedas',
            jumlah: 150
        },
        {
            tanggal: '2026-01-08',
            namaUmkm: 'Dapurnyaa Ria',
            namaStiker: 'Stiker Botol',
            jumlah: 120
        },

        {
            tanggal: '2026-04-06',
            namaUmkm: 'Yoyu',
            namaStiker: 'Stiker Makanan',
            jumlah: 80
        },

        {
            tanggal: '2026-03-09',
            namaUmkm: 'Odang-Odeng',
            namaStiker: 'Stiker Kemasan',
            jumlah: 200
        },

        {
            tanggal: '2026-02-07',
            namaUmkm: 'Turunan Cabe',
            namaStiker: 'Stiker Pedas',
            jumlah: 150
        },
        {
            tanggal: '2026-01-08',
            namaUmkm: 'Dapurnyaa Ria',
            namaStiker: 'Stiker Botol',
            jumlah: 120
        },

        {
            tanggal: '2026-02-06',
            namaUmkm: 'Yoyu',
            namaStiker: 'Stiker Makanan',
            jumlah: 80
        },

        {
            tanggal: '2026-05-09',
            namaUmkm: 'Odang-Odeng',
            namaStiker: 'Stiker Kemasan',
            jumlah: 200
        },

        {
            tanggal: '2026-03-07',
            namaUmkm: 'Turunan Cabe',
            namaStiker: 'Stiker Pedas',
            jumlah: 150
        }

    ];


    // SORT DESC TANGGAL
    dataOrder.sort((a, b) =>
        new Date(b.tanggal) - new Date(a.tanggal)
    );


    const tbody = document.getElementById('table-order-body');

    tbody.innerHTML = '';


    const limitedData = dataOrder.slice(0, 16);

    limitedData.forEach(item => {

        tbody.innerHTML += `
            <tr>
                <td>${item.tanggal}</td>
                <td>${item.namaUmkm}</td>
                <td>${item.namaStiker}</td>
                <td>${item.jumlah} Lembar</td>
            </tr>
        `;
    });

}

// PROFILE
const currentUser = {
    name: 'Andri',
    role: 'Administrator',
    photo: './images/profile.jpg'
};
document.getElementById('profile-container').innerHTML = `
    <div class="profile">

        <div class="info">
            <p>Hey, <b>${currentUser.name}</b></p>
            <small class="text-muted">${currentUser.role}</small>
        </div>

        <div class="profile-photo">
            <img src="${currentUser.photo}" alt="profile">
        </div>

    </div>
`;