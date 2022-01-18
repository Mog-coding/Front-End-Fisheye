function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data; 
    //destructuration objet JS
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const $wrapper = `
        <img class="userCards" src="${picture}" alt="" />
        <h2>${name}</h2>
        <div class="city">${city},${country}</div>
        <div class="tagline">${tagline}</div>
        <div class="price">${price}€/jour`;
        article.innerHTML =$wrapper;
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
