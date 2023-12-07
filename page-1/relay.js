document.addEventListener('DOMContentLoaded', function() {
    const relayUrl = 'https://blynk.cloud/external/api/get?token=yuAzKSHfrCcg2w26dD9V5pCMb3QvojeL&v4';
    const element = document.getElementById('relay'); // Ambil elemen dengan ID _100
  
    // Fungsi untuk mengambil data dari API
    function getDataFromAPI() {
      fetch(relayUrl)
        .then(response => response.text())
        .then(data => {
          // Ubah teks di dalam elemen sesuai dengan data dari API
          element.innerText = data;;
        })
        .catch(error => {
          console.error('Terjadi kesalahan:', error);
        });
    }
  
    // Panggil fungsi getDataFromAPI setiap 1 detik
    setInterval(getDataFromAPI, 1000);
  });
  