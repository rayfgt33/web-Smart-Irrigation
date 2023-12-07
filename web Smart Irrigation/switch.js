
var button = document.getElementById('relayButton');

// Tambahkan teks dan fungsi onclick ke button
button.textContent = "OFF";
button.onclick = function() {
    var value = 0; // Nilai default untuk OFF
    button.style.backgroundColor = "#F9BFBF"
    if (button.textContent === "OFF") {
        button.textContent = "ON";
        value = 1; // Nilai saat ON
        button.style.backgroundColor = "#D9FCDB"
    } else {
        button.textContent = "OFF";
    }
    // Lakukan POST request sesuai dengan nilai yang ditentukan
    console.log(`${value}`);
    fetch(`https://blynk.cloud/external/api/update?token=yuAzKSHfrCcg2w26dD9V5pCMb3QvojeL&v3=${value}`, {
        method: 'GET'
    }).then(response => {
        console.log('Request complete! Response:', response);
    }).catch(error => {
        console.error('There was an error!', error);
    });

    // MAU KETIKA OFF DARI SANANYA JUGA OFFF
};


