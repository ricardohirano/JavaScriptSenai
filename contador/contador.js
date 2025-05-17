let contador = 0;
        const contadorElemento = document.getElementById('contador');
        const btnIcrementar = document.getElementById('incrementar');
        const btnDecrementar = document.getElementById('decrementar');
        // Ouvir ação do mouse na pagina html
        btnIcrementar.addEventListener('click',()=>{
            contador++; // ou contador = contador +1
            contadorElemento.textContent = contador;
        })
        btnDecrementar.addEventListener('click',()=>{
            contador--; // ou contador = contador -1
            contadorElemento.textContent = contador;
        })