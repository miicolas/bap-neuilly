'use server';

import { revalidatePath } from "next/cache";
import { Notification } from "@/models/notification";
import { FormResponse } from "@/lib/type";

export async function MarkAllAsReadAction(): Promise<FormResponse> {
    try {
        await Notification.readAll();
        
        // Rafraîchir le dashboard pour mettre à jour les notifications
        revalidatePath("/dashboard/");
        
        return { 
            status: "success", 
            message: "Toutes les notifications ont été marquées comme lues" 
        };
    } catch (error) {
        console.error("Erreur lors du marquage des notifications:", error);
        return { 
            status: "error", 
            message: "Échec lors du marquage des notifications comme lues" 
        };
    }
} 