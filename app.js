let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
const leads = JSON.parse(localStorage.getItem('myLeads')); 

if (leads) {
    myLeads =  leads;
    render(myLeads);
}

tabBtn.addEventListener( "click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url );
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })   //console.log(tabs[0].url)
})

function render(leads) {
    let listItems = ""; //seta um string vazia
    //imprime todos os itens do array em forma de lista (li)
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'> ${leads[i]}
            </a>
        </li>`;
        //console.log(listItems)
    }   
    ulEl.innerHTML = listItems;
}

//pega o valor do input e adiciona no array
inputBtn.addEventListener("click", function() {
    
    myLeads.push(inputEl.value); //adiciona o valor do input ao array

    localStorage.setItem("myLeads", JSON.stringify(myLeads)); //tranforma o array em string
    
    console.log(leads);

    render(myLeads); //mostra  os leads da lista 
    inputEl.value = " "; //limpa o campo input após clicar no botão
})

deleteBtn.addEventListener("dblclick",  function() {
    localStorage.clear(); //limpa o localStorage
    myLeads = []; //limpa o array "myLeads"
    render(myLeads); //limpa o DOM
})








