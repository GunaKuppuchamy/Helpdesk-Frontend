export interface Users {

    user_id:string;
    name:string;
    email:string;
    password_hash:string;
    phNumber:number;
    role:'IT_team'|'user';
    BU:'DEX'|'DATA'|'ILD'|'IT'|'HR'|'SIMS';
    
}

