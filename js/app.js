const allFriends = {
    currentList: [],
    changeList: [],
    countFriends: 52,
    minAge: 0,
    maxAge: 150
};

const filters = document.querySelector(".filters-input");
const searchByNameUser = document.querySelector(".search-input-name");
const searchByGender = document.querySelector(".search-options__gender");
const searchByAge1 = document.querySelector(".search-input-age1");
const searchByAge2 = document.querySelector(".search-input-age2");
const searchByAge = document.querySelector(".search-options__age");
const friendZone = document.querySelector(".friends-zone");
const resetFilters = document.querySelector(".reset-button");

const getDataApi = async () => {
    const response = await fetch(`https://randomuser.me/api/?results=${allFriends.countFriends}`);
    const data = await response.json();
    allFriends.currentList = data.results;
    renderFriendsList(allFriends.currentList);
}      

const drawFriendsCards = (user) => {
    let temp = `<div class="user-card shadow-profile">
                    <div class="user-card__img"><img class="" src="${user.picture.large}"></div>
                        <div class="user-card__cnt">
                            <div class="profile-card__name"><span>${user.name.first}</span></div>
                            <div class="profile-card__name"><span>${user.name.last}</span></div>
                            <div class="profile-card__name"><span>${user.location.city}, ${user.nat}</span></div>
                            <div class="profile-card__name"><address>Place: ${user.location.street.name}, ${user.location.street.number}</address></div>
                        </div> 
                    <span class="user-card__age">${user.dob.age}</span>
                </div>`;
    friendZone.insertAdjacentHTML("beforeEnd", temp);
}

const renderFriendsList = (allFriends) => {
    friendZone.innerHTML = "";
    allFriends.forEach(friend => drawFriendsCards(friend));
}

const sortByMinAge = (arr) => arr.sort((a, b) => a.dob.age - b.dob.age);

const sortByMaxAge = (arr) => arr.sort((a, b) => b.dob.age - a.dob.age);

const sortByAscName = (arr) => arr.sort((a, b) => a.name.first < b.name.first ? -1 : 1);

const sortByDescName = (arr) => arr.sort((a, b) => a.name.first > b.name.first ? -1 : 1);

const filterByGender = (arr, gender) => arr.filter((arr) => arr.gender === gender);

const filterByAge = (arr, age1, age2) => arr.filter((arr) => age1 <= arr.dob.age && arr.dob.age <= age2);

const searchByName = (arr, searchText) => arr.filter((arr) => new RegExp(searchText, 'i').test(arr.name.first));

resetFilters.addEventListener("click", () => {
    searchByNameUser.value = "";
    filters.options[0].selected = true;
    searchByAge1.value = allFriends.minAge;
    searchByAge2.value = allFriends.maxAge;
    document.querySelector("[name='search-input-gender']:checked").checked = false;
    renderFriendsList(allFriends.currentList);
});

document.querySelector(".search-wrap-options").addEventListener("change", (e) => {
    changeList = [...allFriends.currentList];
    switch(e.target.name) {
        case "search-input-options":
            if(e.target.value === "nameAsc") changeList = sortByAscName(changeList);
            if(e.target.value === "nameDesc") changeList = sortByDescName(changeList);
            if(e.target.value === "ageAsc") changeList = sortByMinAge(changeList);
            if(e.target.value === "ageDesc") changeList = sortByMaxAge(changeList);
            renderFriendsList(changeList);
            break;
        case "search-input-name":
            changeList = searchByName(changeList, e.target.value);
            renderFriendsList(changeList);
            break;
        case "search-input-age":
            changeList = filterByAge(changeList, searchByAge1.value, searchByAge2.value);
            renderFriendsList(changeList);
            break;
        case "search-input-gender":
            if(e.target.value.toLowerCase().indexOf("male") !== -1) {
                changeList = filterByGender(changeList, e.target.value);
                renderFriendsList(changeList);
            } else {
                renderFriendsList(allFriends.currentList);
            }
            break;
    }
})

window.onload = function() {
    getDataApi()
}
