function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data; 
    //destructuration objet JS
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const lienUserCard = document.createElement( 'a' );
        lienUserCard.setAttribute("href", "photographer.html");
        lienUserCard.setAttribute("class", "containerUserCard");
        const $wrapper = `
        <img class="userCards imgCards" src="${picture}" alt="" />
        <h2 class="nameCards">${name}</h2>
        <div class="city">${city},${country}</div>
        <div class="tagline">${tagline}</div>
        <div class="price">${price}€/jour`;
        
        lienUserCard.innerHTML =$wrapper;
        return (lienUserCard);
    }
    return { name, picture, getUserCardDOM }
}