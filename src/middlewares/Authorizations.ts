// import { Response, NextFunction } from 'express';

// const unauthorized = (res: Response, code: string) => res.status(401).json({ success: false, code });

// export const checkJWT =
//     (permission?: PERMISSIONS) =>
//     async (req: any, res: Response, next: NextFunction): Promise<any> => {
//         try {
//             const authToken = req.header('auth-token');

//             if (!authToken) {
//                 return unauthorized(res, 'UNAUTHORIZED');
//             }

//             const uid = await checkToken(authToken, TOKEN_TYPES.ACCESS);

//             if (uid === false) {
//                 return unauthorized(res, 'UNAUTHORIZED');
//             }

//             const user = await getProfile(uid);

//             if (user.isActive === 0) {
//                 return unauthorized(res, 'UNAUTHORIZED');
//             }

//             const isAuthorized = permission ? user[permission] === 1 : true;

//             if (!isAuthorized) {
//                 return unauthorized(res, 'UNAUTHORIZED');
//             } else {
//                 req.locals = { ACCESS_USER: user, AUTH_TOKEN: authToken };
//                 return next();
//             }
//         } catch (error) {
//             return unauthorized(res, 'UNAUTHORIZED');
//         }
//     };
