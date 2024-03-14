const loadPhone = async (searchText,isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones,isShowAll);
};
const displayPhone = (phones,isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  // clear the container before adding new cards
  phoneContainer.textContent = '';
  const showButton = document.getElementById('show-container');

   if(phones.length > 10 && !isShowAll) {
      showButton.classList.remove('hidden');
   }
   else{
    showButton.classList.add('hidden');
   }
  // display only 10 phones if not show all

  if(!isShowAll) {
    phones = phones.slice(0, 10);
  }
 
  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100  p-4 shadow-xl`;
    phoneCard.innerHTML = `
        <figure>
              <img
                src=${phone.image}
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}')" class="btn  btn-accent ">Show Details</button>
              </div>
            </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
 const loadingSpinner = document.getElementById("loading-spinner");
 if(isLoading){
  loadingSpinner.classList.remove("hidden");
 }
 else{
  loadingSpinner.classList.add("hidden");

 }
}

// show details button
const showDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  console.log(data);
}
// handle show all
const handleShowAll = () =>{
  handleSearch(true);

}
 

