import { IBase } from "./base";
import { IUser } from "./user";

export interface ITheme<PostType = string, UserType = IUser> extends IBase {
    subscribers: string[];
    posts: PostType[];
    themeName: string;
    userId: UserType;
}