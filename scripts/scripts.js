const japa = document.getElementById("japacasa");
const spjapa = document.getElementById("spjapa");
// const textH = document.getElementById("text-H");
// const spjapa2 = document.getElementById("spjapa2");

japa.addEventListener(
    "mouseover",
    (Event) => {
        spjapa.style.color = "white"
    }
)

japa.addEventListener(
    "mouseout",
    (event) => {
        spjapa.style.color = "red";
    }
);

// textH.addEventListener(
//     "mouseover",
//     (event) => {
//         console.log("foi")
//         spjapa2.style.border = "1px solid black";
//     }
// );

// textH.addEventListener(
//     "mouseout",
//     (event) => {
//         spjapa2.style.border = "0px solid black";
//     }
// );