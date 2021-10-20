const apiUrl = "http://localhost:500/api/v1";

class WalletService{

    get = async (urlParams) => {
        const options = {
            method: "GET",
        }
        const request = new Request(apiUrl + "/wallets" + "?" + urlParams, options);
        const response = await fetch(request);
        return response.json();
    }

    post = async (wallet) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        var options = {
            method: "POST",
            headers,
            body: JSON.stringify(wallet)
        }
        const request = new Request(apiUrl + "/wallet", options);
        const response = await fetch(request);
        return response;
    }

    update = async (wallet) => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json");
        var options = {
            method: "PUT",
            headers,
            body: JSON.stringify(wallet)
        }
        const request = new Request(apiUrl + "/wallet/" + wallet.id, options);
        const response = await fetch(request);
        return response;
    }

    delete = async (id) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "DELETE",
            headers
        }
        const request = new Request(apiUrl + "/wallet/" + id, options);
        const response = await fetch(request);
        return response;
    }

    credit = async (wallet) => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json");
        var options = {
            method: "PUT",
            headers,
            body: JSON.stringify(wallet)
        }
        const request = new Request(apiUrl + "/wallet/credit", options);
        const response = await fetch(request);
        return response;
    }

    debit = async (wallet) => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json");
        var options = {
            method: "PUT",
            headers,
            body: JSON.stringify(wallet)
        }
        const request = new Request(apiUrl + "/wallet/credit", options);
        const response = await fetch(request);
        return response;
    }

}

export default WalletService;