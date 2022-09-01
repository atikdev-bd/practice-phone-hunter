const phoneApi = (search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

const displayPhone = (phones) => {
    const cardDiv = document.getElementById('cardId')
    const found = document.getElementById('phone-found');
    if (phones.length === 0) {
        found.classList.remove('d-none')
    }
    else {
        found.classList.add('d-none')
    }
    cardDiv.innerHTML = ''

    phones.forEach(phone => {
        const div = document.createElement("div");
        div.classList.add('col')
        div.innerHTML = `
           <div class="shadow p-4 mb-5 bg-light rounded card">
                <div class="border border-light shadow-lg p-3 mb-5 bg-body rounded">
                <img src="${phone.image}" class="card-img-top" alt="...">
                </div>
              <div class="card-body text-center">
                 <h5 class="card-title">${phone.phone_name}</h5>
                 <button onclick="phoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
              </div>
           </div>
          `;
        cardDiv.appendChild(div) 
        toggleSpiner(false);
    })
}

const search = () => {
    toggleSpiner(true)
    const searchId = document.getElementById('search-input')
    const searchText = searchId.value;
    phoneApi(searchText)
}

const toggleSpiner = (isLodding) => {
    const spiner = document.getElementById('lodding');
    if (isLodding) {
        spiner.classList.remove('d-none')
    }
    else {
        spiner.classList.add('d-none')
    }
}

const phoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

const displayDetails = (phone) => {
    console.log(phone)
    const divDisplay = document.getElementById('modal-id');
    divDisplay.innerText = `Brand : ${phone.brand}`

    const phoneDetails = document.getElementById('phone-detail')
    phoneDetails.innerHTML = `
         <h6>${phone.name}</h6>
         <p>Release date :${phone.releaseDate ? phone.releaseDate : 'N/A'}</p>
         <p>Bluetooth : ${phone.others.Bluetooth ? phone.others.Bluetooth : 'N/A'}</p>
         <p>Memory : ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'N/A'}</p>
     `;
}

phoneApi('Samsung')