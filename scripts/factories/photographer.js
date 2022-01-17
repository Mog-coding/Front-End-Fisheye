function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data; //destructuration objet JS

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const $wrapper = `
        <img src="${picture}"/>
            <h2>${name}</h2>
            <div>${city},${country}</div>`;
        article.innerHTML =$wrapper;
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
