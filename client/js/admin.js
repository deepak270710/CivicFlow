fetch("/api/location")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("cases")
        data.forEach(report => {
            const div = document.createElement("div")
            div.className = "case"
            div.innerHTML = `
<b>${report.caseId}</b> - ${report.status}
<div class="details" id="details-${report._id}">
<p><b>Time:</b> ${new Date(report.createdAt).toLocaleString()}</p>
<img src="/uploads/${report.photo}" width="200">
<br><br>
Status:
<select onchange="updateStatus('${report._id}',this.value)">
<option ${report.status == "Pending" ? "selected" : ""}>Pending</option>
<option ${report.status == "In Progress" ? "selected" : ""}>In Progress</option>
<option ${report.status == "Fixed" ? "selected" : ""}>Fixed</option>
</select>
<div id="map-${report._id}" class="map"></div>
</div>
`
            div.onclick = function () {
                const details = document.getElementById("details-" + report._id)
                if (details.style.display === "none") {
                    details.style.display = "block"
                    setTimeout(() => {
                        const map = L.map("map-" + report._id).setView([report.latitude, report.longitude], 15)
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
                        L.marker([report.latitude, report.longitude]).addTo(map)
                    }, 100)
                } else {
                    details.style.display = "none"
                }
            }
            container.appendChild(div)
        })
    })

function updateStatus(id, status) {
    fetch("/api/location/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    })
        .then(res => res.json())
        .then(() => {
            alert("Status Updated")
        })
}


const form = document.getElementById("adminLoginForm")

form.addEventListener("submit", function (e) {

    e.preventDefault()

    const username = document.getElementById("adminUser").value
    const password = document.getElementById("adminPassword").value

    const message = document.getElementById("adminLoginSuccess")

    if (username === "admin" && password === "admin123") {

        message.textContent = "Admin login successful"

        setTimeout(() => {
            window.location.href = "admin.html"
        }, 1000)

    }
    else {

        message.style.color = "red"
        message.textContent = "Invalid admin credentials"

    }

})

async function loadComplaints() {

    const response = await fetch("http://localhost:3000/api/complaints");

    const complaints = await response.json();

    const cards = document.getElementById("complaintCards");

    cards.innerHTML = "";

    complaints.forEach(c => {

        let card = `
    <div class="card">

      <div class="card-top">
        <h3>${c.title}</h3>
        <span class="status pending">${c.status}</span>
      </div>

      <p>${c.category}</p>
      <p>Location: ${c.location}</p>
      <p>Submitted on ${new Date(c.createdAt).toLocaleDateString()}</p>

    </div>
    `;

        cards.innerHTML += card;

    });

}