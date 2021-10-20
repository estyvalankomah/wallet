// import { observable, runInAction, decorate } from 'mobx';
// import WalletService from '../services/walletServices'

// class WalletStore{
//     constructor(){
//         this.walletService = new WalletService()
//     }

//     wallets = []
//     totalWallets = 0
//     pageNumber = 0

//     getWallets = async () =>{
//         try{
//             var params = {
//                 pageNumber: this.pageNumber
//             }

//             const urlParams = new urlParams(Object.entries(params));
//             const data = await this.walletService.get(urlParams)
//             runInAction(() => {
//                 this.wallet = data;
//             });
//         }catch(error){
//             runInAction(() => {
//                 console.log("An error occured")
//             });
//         }
//     }

//     postWallet = async (wallet)=>{
//         try {
//             const response = await this.walletService.post(wallet);
//             if (response.status === 201) {
//                 runInAction(() => {
//                     console.log(response)
//                 })
//             } 
//         } catch (error) {
//             runInAction(() => {
//                 console.log("An error occured")
//             });
//         }
//     }

//     updateWallet = async (wallet)=>{
//         try {
//             const response = await this.walletService.update(wallet)
//             if (response.status === 200) {
//                 runInAction(() => {
//                     console.log(response)
//                 })
//             } 
//         } catch (error) {
//             runInAction(() => {
//                 console.log("An error occured")
//             });
//         }
//     }

//     deleteWallet = async (id) => {
//         try {
//             const response = await this.walletService.delete(id);
//             if (response.status === 204) {
//                 runInAction(() => {
//                     console.log(response)
//                 })
//             } 
//         } catch (error) {
//             runInAction(() => {
//                 console.log("An error occured")
//             });
//         }
//     }
// }

// decorate(WalletStore, {
//     wallets: observable,
//     totalWallets: observable,
//     pageNumber: observable
//    });

// export default new WalletStore();

import { runInAction, extendObservable, action } from 'mobx'

export default extendObservable({
    wallets: [],
    loadWallets: action(async() =>{
        const response = await fetch('http://localhost:5000/api/v1/wallets?pageNumber=0')
        const json = await response.json()
        runInAction(
            () =>{
                this.wallets = json.data
            }
        )
    })
})