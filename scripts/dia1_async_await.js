async function getUsers() {
    try {

        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        let data = await response.json();
        // console.log(data);

        let filteredData = filterByCity(data, "Gwenborough");
        console.log(filteredData);

        let emailList = getEmails(filteredData);
        console.log(emailList);

        let numberWebSite = countWebSites(data, ".org");
        console.log(numberWebSite);
        
    } catch(error) {
        console.log("Erro ao buscar dados", error);
    }


}

function filterByCity(data, city) {
    let newData = data.filter(element => element.address.city === city);

    return newData;
}

function getEmails(users) {
    let emails = users.map(element => element.email);

    return emails;
}

function countWebSites(data, endUrl) {
    let countElements = data.reduce((accumulator, currentValue) => {
        if(currentValue.website.includes(endUrl)) {
            accumulator++
        };
        return accumulator;
    }, 0);

    return countElements;
}

getUsers();