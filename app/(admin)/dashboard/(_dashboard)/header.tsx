import NotificationButton from "./notification";

export default function DashboardHeader() {
    return (
        <div className="flex items-center justify-between gap-4 w-full pr-8">
            <p>Dashboard header</p>
            <div className="">
                <NotificationButton />
            </div>


        </div>
    );
}