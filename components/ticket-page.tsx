"use client";

import { useState } from "react";

export default function TicketPage() {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDownload = async () => {
        setLoading(true);

        try {
            const res = await fetch(`/api/generateTicket`);

            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status}`);
            }

            // onvertir la réponse en fichier PDF
            const blob = await res.blob();

            // Créer un lien de téléchargement temporaire
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Billet_Neuilly_Salon_des_Créateurs.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Erreur lors du téléchargement du billet :", error);
            alert("Erreur lors de la génération du billet. Veuillez réessayer.");
        }

        setLoading(false);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <p>Télécharger le billet :</p>
            <button onClick={handleDownload} disabled={loading} className="p-2 bg-slate-300 rounded">
                {loading ? "Chargement..." : "Télécharger le Billet"}
            </button>
        </div>
    );
}
