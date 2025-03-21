import NotificationButton from "./(notifications)/notifications";
import { Button } from "@/components/ui/button";
import PageTitle from "./page-title";

export default function DashboardHeader() {
    return (
        <div className="border-b border-neutral-200 bg-white">
            <div className="flex items-center justify-between p-4">
                <PageTitle />

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                    >
                        Aujourd'hui
                    </Button>
                    <NotificationButton />
                </div>
            </div>
        </div>
    );
}
