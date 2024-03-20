
export interface Usuario {
    name:   string;
    email:  string;
    password?:  string;
    role?:   string;
    google?: boolean;
    img?: string,
    uid?:    string;
}
