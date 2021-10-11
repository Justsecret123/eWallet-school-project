export class Expense {

    amount:number;
    category:string; 
    date:Date;
    keywords:string;

    constructor(amount:number, category:string, date:Date, keywords:string){
        this.amount = amount;
        this.category = category; 
        this.date = date; 
        this.keywords = keywords;
    }

}