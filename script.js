const imagemGrande = document.querySelector("#imagem-grande");
const miniaturas = document.querySelectorAll("#miniaturas-container img");

miniaturas.forEach(miniatura=>{
    miniatura.addEventListener('click', function(){
        const caminhoImagemGrande = this.dataset.fullImage;
        imagemGrande.src = caminhoImagemGrande;
    })
})