const allFriends = {
    friends: []
};

const filters = document.querySelector(".filters");
const searchByName = document.querySelector(".");
const searchBygender = document.querySelector(".");
const searchByAge1 = document.querySelector(".");
const searchByAge2 = document.querySelector(".");


const getDataApi = async () => {
    const response = await fetch('https://randomuser.me/api/?results=20');
    const data = await response.json();
    allFriends.friends = data.results;
    // renderFriendsList(allFriends.friends);
    // console.log(sortByMinAge(allFriends.friends))
    // console.log(sortByMaxAge(allFriends.friends))
    // console.log(sortByAscName(allFriends.friends))
    // console.log(sortByDescName(allFriends.friends))
    // console.log(filterByGender(allFriends.friends, "female"))
    // console.log(filterByAge(allFriends.friends, 20, 30));
    console.log(searchByName(allFriends.friends, "ma"));
}
    
const capitalFirstLet = (word) => word.charAt(0).toUpperCase() + word.slice(1);            

const drawFriendsCards = (user) => {
    // console.log(user);
    let temp = `<div class="user-card shadow-profile">
        <div class="user-card__img"><img class="" src="${user.picture.large}"></div>
        <div>
            <div class="user-card__cnt">
                <div class="profile-card__name"><span>${capitalFirstLet(user.name.first)}</span></div>
                <div class="profile-card__name"><span>${capitalFirstLet(user.name.last)}</span></div>
                <div class="profile-card__name"><span>${capitalFirstLet(user.location.city)}, ${user.nat}</span></div>
            </div>
            <div class="profile-card__txt">
                <div><span>Place: ${capitalFirstLet(user.location.street)}</span></div>
                <div><span>E-mail: ${user.email}</span></div>
                <div><span>Phones: ${user.phone}/
                ${user.cell}</span></div>
            </div>
        </div> 
    </div>`;
    document.querySelector(".friends-zone").insertAdjacentHTML("beforeEnd", temp);
}

const renderFriendsList = (object) => {
    for (const iterator of object) {
        drawFriendsCards(iterator);
    }
}
const sortByMinAge = (arr) => arr.sort((a, b) => a.dob.age - b.dob.age);

const sortByMaxAge = (arr) => arr.sort((a, b) => b.dob.age - a.dob.age);

const sortByAscName = (arr) => arr.sort((a, b) => a.name.first < b.name.first ? -1 : 1);

const sortByDescName = (arr) => arr.sort((a, b) => a.name.first > b.name.first ? -1 : 1);

const filterByGender = (arr, gender) => arr.filter((arr) => arr.gender === gender);

const filterByAge = (arr, age1, age2) => arr.filter((arr) => age1 <= arr.dob.age && arr.dob.age <= age2);

const searchByName = (arr, searchText) => arr.filter((arr) => new RegExp(searchText, 'i').test(arr.name.first));

window.onload = function() {
    getDataApi()
};
