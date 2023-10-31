const japa = document.getElementById("japacasa");
const spjapa = document.getElementById("spjapa");

japa.addEventListener(
    "mouseover",
    (Event) => {
        spjapa.style.color = "white"
    }
)

japa.addEventListener(
    "mouseout",
    (Event) => {
        spjapa.style.color = "red"
    }
)