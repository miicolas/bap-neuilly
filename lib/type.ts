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
    title: string;
    description: string;
    url: string;
    read?: boolean;
    date?: string;
}

export interface NotificationProps {
    index: number;
    item: NotificationItem;
}
