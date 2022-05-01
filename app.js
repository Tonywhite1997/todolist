const itemInput = document.querySelector("#item")
const itemContainer = document.querySelector("#items-book")
const donator = document.querySelector("#donator")
const amount = document.querySelector("#amount")
const submit = document.querySelector("#submit")
const saveList = document.querySelector("#saveList")
const savedItems = document.querySelector("#savedItems")

itemInput.addEventListener("keypress", ({target, key}) =>{
    const {value} = target;
    let list = document.createElement("li");
    list.innerText = value;
    if (key === "Enter"){
        if(itemInput.value === ""){
            return
        }
        itemContainer.appendChild(list)
        itemInput.value = ""
    }
})
saveList.addEventListener("click", () =>{
    let theList = itemContainer.children;
    for(let i = 0; i< theList.length; i++){
        console.log(`${i}. ${theList[i].innerText}`);
    }
})

let donating = [];
submit.addEventListener('click', () =>{
    donating = [`${donator.value} donated ${amount.value}. Thank you!`];
    donator.value = "";
    amount.value = "";
    alert("Thank you for donating.");
})
