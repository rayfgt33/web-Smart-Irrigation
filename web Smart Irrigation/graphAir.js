const ctx3 = document.getElementById('graphAir');
const apiUrl3 = 'https://blynk.cloud/external/api/get?token=yuAzKSHfrCcg2w26dD9V5pCMb3QvojeL&v7';
let labels3 = [];
let dataValues3 = [];
let chart3; // Variabel untuk menyimpan objek grafik ketiga

// Fungsi untuk mengambil data dari API dan memperbarui data pada grafik ketiga
function updateThirdChart() {
  fetch(apiUrl3)
    .then(response => response.text())
    .then(data => {
      // Mengubah teks data menjadi array bilangan
      const dataArray = data.split(',').map(Number);

      // Menambah data baru ke dalam array dataValues3
      dataValues3.push(...dataArray);

      // Menghasilkan label waktu untuk sumbu x pada grafik ketiga
      const currentTime = new Date();
      labels3.push(currentTime.toLocaleTimeString()); // Menambah waktu saat ini sebagai label

      // Batasi jumlah data menjadi 100 terbaru
      if (dataValues3.length > 100) {
        labels3.splice(0, dataValues3.length - 100);
        dataValues3.splice(0, dataValues3.length - 100);
      }

      // Jika grafik ketiga belum ada, buat grafik baru
      if (!chart3) {
        chart3 = new Chart(ctx3, {
          type: 'line',
          data: {
            labels: labels3,
            datasets: [{
              label: 'Air Keluar (L)',
              data: dataValues3,
              borderColor: 'black' 
            }]
          },
          options: {
            scales: {
              x: {
                // Properti untuk sumbu x
                title: {
                  color: 'rgba(0, 0, 0, 0.7)' // Warna label sumbu x
                },
                ticks: {
                  color: 'rgba(0, 0, 0, 0.7)' // Warna label angka pada sumbu x
                }
              },
              y: {
                // Properti untuk sumbu y
                beginAtZero: true,
                title: {
                  color: 'rgba(0, 0, 0, 0.7)' // Warna label sumbu y
                },
                ticks: {
                  color: 'rgba(0, 0, 0, 0.7)' // Warna label angka pada sumbu y
                }
              }
            },
            plugins: {
              tooltip: {
                titleFont: {
                  weight: 'bold', // Membuat teks judul tooltip menjadi tebal
                  color: 'black' // Warna teks judul tooltip
                },
                bodyFont: {
                  weight: 'bold', // Membuat teks pada body tooltip menjadi tebal
                  color: 'black' // Warna teks pada body tooltip
                }
              },
              legend: {
                labels: {
                  color: 'rgba(0, 0, 0, 0.7)' // Warna teks pada legend
                }
              }
            }
          }
        });
      } else {
        // Jika grafik ketiga sudah ada, perbarui dataset pada grafik
        chart3.data.labels = labels3;
        chart3.data.datasets[0].data = dataValues3;
        chart3.update(); // Perbarui grafik ketiga
      }
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
}

// Panggil fungsi untuk menginisialisasi grafik ketiga pertama kali
updateThirdChart();

// Update grafik ketiga setiap 5 detik
setInterval(updateThirdChart, 1000); // Ubah interval sesuai kebutuhan
