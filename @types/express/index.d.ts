declare global {
    namespace Express {
        interface User {
            id: String;
            isAdmin: boolean;
            userRouteAuthorized: boolean;
            email?: string;
        }
    }
}
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export default global;
