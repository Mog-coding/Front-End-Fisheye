let array1 = [0,1,2,3,4];

//array1.move(0,3); //index 0 en position index 3
moove(array1, 0, 3);
console.log(array1); //[1, 2, 3, 0, 4]

function moove(array, from, to){
  array.splice(to, 0, array.splice(from, 1)[0])
};

/***
 Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };
  rray1.move(0,3); //index 0 en position index 3 
  
 * 
 */