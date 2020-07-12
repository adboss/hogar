export interface footerLinks {
    web: string;
    link: string;
}

export interface footerColumns {
    column: number;
    rows: footerLinks[];
}

export interface email {
    email: string;
    message: string;
    name: string;
    phone: string;
    subject: string;
}

