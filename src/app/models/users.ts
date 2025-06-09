export interface Users {

    empid:string;
    name:string;
    email:string;
    phoneno:number;
    password:string;
    role:'admin'|'IT_team'|'user';
    bu:'DEX'|'DATA'|'ILD'|'IT'|'HR'|'SIMS';
    

}

