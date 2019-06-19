const allFriends = {
    friends: []
};

const getDataApi = () => {
    return fetch('https://randomuser.me/api/?results=100').then((response) => {
        return response.json();
      }).then((data) => {
        allFriends.friends = data.results;
        changePage(1);
      });
}


const drawFriendsCards = (user) => {
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

const capitalFirstLet = (word) => word.charAt(0).toUpperCase() + word.slice(1);

let current_page = 1;
let records_per_page = 16;


function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
    
function changePage(page)
{
    let btn_next = document.getElementById("btn_next");
    let btn_prev = document.getElementById("btn_prev");
    let listing_table = document.getElementById("listingTable");
    let page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";
    for (let i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
        drawFriendsCards(allFriends.friends[i]);
    }
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    return Math.ceil(allFriends.friends.length / records_per_page);
}

window.onload = function() {
    getDataApi()
};
