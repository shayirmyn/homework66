export interface ISubmit {
    meal: string;
    calories: string;
    description: string;
}

export interface IGet {
    id: string;
    meal: string;
    calories: string;
    description: string;
}

export interface IApiGet {
    [id: string]: IGET;
}