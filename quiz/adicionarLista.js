const novaTarefa = document.getElementById('novaTarefa')
const adicionar = document.getElementById('adicionar')
const lista = document.getElementById('lista')

adicionar.addEventListener('click', () => {
    const textoTarefa = novaTarefa.value.trim();/*trim serve para apagar os espaços antes e depois*/
    if(textoTarefa){/* utilizado para nao ter tarefas vazias*/
        const itemLista = document.createElement('li');
        itemLista.textContent = textoTarefa
        lista.appendChild(itemLista);
        novaTarefa.value = '';
    }
})