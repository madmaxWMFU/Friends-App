const getDataApi = () => {
    return fetch('https://randomuser.me/api/?results=100').then((response) => {
        return response.json();
      }).then((data) => {
        drawFriendsCards(data.results);
      });
}



const drawFriendsCards = (arr) => {
    const allUsers = arr;
    allUsers.forEach(user => {
        let temp = `<div class="user-card">
            <div class="user-card__img"><img src="${user.picture.large}"></div>
            <div class="user-card__cnt">
                <label class="profile-card__name">${user.name.first} ${user.name.last}, ${user.nat}</label>
            </div>

        </div>`;
        document.querySelector(".friends-zone").insertAdjacentHTML("beforeEnd", temp);
    });
}

getDataApi()



{/* <div class="profile-card__txt">
<label>${user.location.city}</label>
<label>${user.location.street}</label>
<label>${user.email}</label>
<label>${user.phone}</label>
<label>${user.cell}</label>
</div> */}