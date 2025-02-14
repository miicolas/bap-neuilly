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

export interface DataTableProps<TData extends { ticketNumber: string; lastName: string; person: number }, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export type Visitor = {
    ticketNumber: string
    lastName: string
    person: number
}

export interface ExportExcelProps {
    dataToExport: { ticketNumber: string, lastName: string, person: number }[]
}