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
    (event) => {
        spjapa.style.color = "red";
    }
);

async function fetchProdutos(){
    try{
        const response = await fetch('https://scarce-invented-basin.glitch.me/produtos');
        const data = await response.json();
        return data;
    }catch(error){
        console.error('Erro ao buscar os produtos', error);
        return[];
    }
}

async function preencheProdutos(){
    const produtos = await fetchProdutos();
    const contentHomeC = document.querySelector('.content_homeC');

    produtos.forEach(produto => {
        const foodCard = document.createElement('div');
        foodCard.classList.add('food-card');

        const imagem = document.createElement('img');
        imagem.src = produto.imagem;
        foodCard.appendChild(imagem);

        const nome = document.createElement('h2');
        nome.textContent = produto.nome;
        foodCard.appendChild(nome);

        if(produto.quantidade){
            const quantidade = document.createElement('h3');
            quantidade.textContent = produto.quantidade;
            foodCard.appendChild(quantidade);
        }

        if(produto.quantidadeDtd){
            const quantidadeDtd = document.createElement('h5');
            quantidadeDtd.textContent = produto.quantidadeDtd;
            foodCard.appendChild(quantidadeDtd);
        }

        const preco = document.createElement('h4');
        preco.textContent = produto.preco;
        foodCard.appendChild(preco);

        contentHomeC.appendChild(foodCard);
    });
}

window.addEventListener('DOMContentLoaded', preencheProdutos);