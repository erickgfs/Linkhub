const API_URL = "https://jsonplaceholder.typicode.com/users";

async function getUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();

        const userEmailsFromGwenborough = users.filter(
            user => user.address.city === "Gwenborough"
        ).map(
            user => user.email
        );

        console.log("Emails dos usuarios da cidade Gwenborough:", userEmailsFromGwenborough);

        const orgWebsiteCount = users.reduce((count, user) => {
            if (user.website.includes(".org")) count++;
            return count;
        }, 0)

        console.log("Número de usuarios com site .org", orgWebsiteCount);

    } catch(error) {
        console.log("Erro ao buscar dados", error);
    }
}

getUsers();