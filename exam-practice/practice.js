
var abc = "hello"

sub = abc.substring(0, 2)

var fruitString = ["apple","mango","banana"]

fruitString.forEach (function(fruit) {

    console.log(fruit.charAt(0))
});


var greeting = function greet(name){
    return "Hello" +" "+ name;
}

var greeted = greeting("Ahmed");
console.log(greeted);

function nameFunction() {
    var images = document.getElementsByTagName("p");

    for (var i = 0;i<images.length;i++){
        images[i].style.color = "orange";
    }

}

window.onload = nameFunction;
