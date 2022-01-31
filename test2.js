const photographers = [
    {
        name: "Mimi Keel",
        id: 243,
    },
    {
        name: "Ellie-Rose Wilkens",
        id: 930,
    }];

const result = photographers.filter(function (objet) {
 return objet.id === 930
})
console.log(result);

/*
const photographers = [ 10, 5, 12, 10, "truc"];
const result2 = photographers.filter(function(objet){
    return objet > 4
});
console.log(result2);
*/