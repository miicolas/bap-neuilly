import { ZodIssue } from "zod";
import { ColumnDef } from "@tanstack/react-table"

export interface SalonInvitationEmailProps {
    firstName?: string;
    lastName?: string;
    eventDate?: string;
    eventName?: string;
    numberOfGuests?: number;
    eventLocation?: string;
    ticketNumber?: string;
    pdfLink?: string;
}

export interface ExposantAwaitingValidationEmailProps {
    firstName?: string;
    lastName?: string;
    eventDate?: string;
    eventName?: string;
    companyName?: string;
    eventLocation?: string;
    exhibitorNumber?: string;
}

export interface NotificationItem {
    id?: string;
    title: string;
    description: string;
    url: string;
    read?: boolean;
    date?: string;
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
    id?: string
    ticketNumber: string
    lastName: string
    person: number
}

export type Exposant = {
    id?: string
    exposantId: string
    companyName: string
    type: string[]
    history: string
    companyLogo: string
}

export type ExposantAwaiting = {
    id?: string
    exposantId: string
    companyName: string
    status: string
}

export interface ExportExcelProps {
    dataToExport: { ticketNumber: string, lastName: string, person: number }[] | ExposantAwaiting[] | { exposantId: string; companyName: string; status: string }[];
}

