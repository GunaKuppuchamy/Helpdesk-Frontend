export interface Users {

    user_id:string;
    name:string;
    email:string;
    password_hash:string;
    role:'IT_team'|'user';
    BU:'DEX'|'DATA'|'ILD'|'IT'|'HR'|'SIMS';
    created_at:Date;
    status:'Active'|'Inactive';

}

