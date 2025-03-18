import { ZodIssue } from "zod";
import { ColumnDef } from "@tanstack/react-table";

export interface SalonInvitationEmailProps {
    firstName?: string;
    lastName?: string;
    eventDate?: string;
    eventName?: string;
    numberOfGuests?: number;
    eventLocation?: string;
    ticketNumber?: string;
}

export interface ExposantAwaitingValidationEmailProps {
    firstName?: string;
    lastName?: string;
    eventDate?: string;
    eventName?: string;
    companyName?: string;
    eventLocation?: string;
    exposantId?: string;
    siret?: string;
    adresse?: string;
    city?: string;
    postalCode?: string;
}

export interface NotificationItem {
    id?: string;
    title: string;
    description: string;
    url: string;
    read?: boolean;
    date?: string;
    type: string;
}

export interface NotificationProps {
    key: number;
    item: NotificationItem;
}

export type FormResponse<T = unknown> = {
    status: "success" | "error";
    errors?: ZodIssue[];
    message?: string;
    content?: T;
};

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export type Visitor = {
    id?: string;
    ticketNumber: string;
    lastName: string;
    person: number;
};

export type Image = {
    id: string;
    picture: string;
    createdAt: Date;
    updatedAt: Date;
    exposantId: string;
};

export type Exposant = {
    id?: string;
    exposantId?: string;
    companyName: string;
    type: string;
    history: string;
    firstName: string;
    lastName: string;
    email: string;
    adresse: string;
    city: string;
    postalCode: string;
    siret: string;
    products: string;
    status: string;
    userId: string;
    slug: string;
    logo?: string;
    logoUrl?: string;
    picture?: string;
    pictureUrl?: string;
    picture2?: string;
    picture2Url?: string;
    picture3?: string;
    picture3Url?: string;
    picture4?: string;
    picture4Url?: string;
    images?: Image[];
};

export type ExposantAwaiting = {
    id?: string;
    exposantId: string;
    companyName: string;
    status: string;
    slug: string;
    images?: Image[];
};

export interface ExportExcelProps {
    dataToExport:
        | { ticketNumber: string; lastName: string; person: number }[]
        | ExposantAwaiting[]
        | { exposantId: string; companyName: string; status: string }[];
}

export interface FileUploadProps {
    fileName: string;
    label?: string;
    maxSize?: number;
    acceptedTypes?: string[];
    isLogo?: boolean;
    existingImage?: string | null;
    userId: string;
}

export type Event = {
    id?: string;
    eventName: string;
    eventDate: Date;
    eventDateEnd: Date;
    eventLocation: string;
    eventDescription: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface Session {
    session: {
        id: string;
        expiresAt: Date;
        token: string;
        createdAt: Date;
        updatedAt: Date;
        ipAddress: string;
        userAgent: string;
        userId: string;
        impersonatedBy: string | null;
    };
    user: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    };
}

export interface Admin {
    id?: string;
    name: string;
    email: string;
}
