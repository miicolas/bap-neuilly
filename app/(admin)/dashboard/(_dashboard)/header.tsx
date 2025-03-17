import NotificationButton from "./(notifications)/notifications";

export default function DashboardHeader() {
    return (
        <div className="flex items-center justify-between gap-4 w-full p-4">
            <p>Dashboard header</p>
            <div>
                <NotificationButton />
            </div>


        </div>
    );
}