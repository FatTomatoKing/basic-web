
import type {RouteRecordRaw} from "vue-router";

export class UserState {
    public token: string|null;
    public menuRoutes: RouteRecordRaw[]
    public username: string;
    public avatar: string;
}