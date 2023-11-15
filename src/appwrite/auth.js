import conf from '../conf/conf';
import { Client, Account, ID } from "appwrite";
//https://appwrite.io/docs/products/auth/quick-start

export class AuthService {
    client = new Client();
    account;

    // dynamically when user is created 
    //when object is created consturtor is automatically called
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            //creating object
        this.account = new Account(this.client);
            
    }
// creating a function
    async createAccount({email, password, name}) {
        try {
            // account.create('[USER_ID]', 'email@example.com', '');
            // syntax it take id as first para so gerante a id
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService