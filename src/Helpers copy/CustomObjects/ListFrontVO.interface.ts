import { List } from "./List.Interface";

export class ListFrontVO<T> {
    constructor(){
        this.columns = [];
        this.rows = [];
    }
    columns: SelectObjectColumnVO[];
    rows: T[];
}

export class SelectObjectColumnVO{
    label : string;
    value : any;
    isVisible : boolean;
    bodyType: string;
    editable: boolean | null;
    frozen: boolean | null;
}

export class OrderSelectObjectVO
{
    order : number ;
    objects : SelectObjectColumnVO 
}

export class ListGroupedFrontVO<T>{
    tabName : string;
    tabValue: string | number;
    data:ListFrontVO<T> = new ListFrontVO();
}

export class GroupedVO<T>{
    token:string;
    value: string | number;
    data: List<T>;
}