import { getRole } from "./get-role";

export async function checkRole(email: string, role: string) {
    const get_role = await getRole(email);

    if (get_role === role) {
        return true;
    }

    return false;
}
