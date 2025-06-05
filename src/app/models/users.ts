export interface Users {

    user_id:string;
    name:string;
    email:string;
    phNumber:number;
    password_hash:string;
    role:'IT_team'|'user'|'admin';
    BU:'DEX'|'DATA'|'ILD'|'IT'|'HR'|'SIMS';

}

