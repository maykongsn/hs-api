import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
}

export function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if(!authorization) {
        return response.status(401).json({ error: "Token not provided" });
    }

    const [, token] = authorization.split(" ");

    try {
        const decoded = verify(token, process.env.SECRET);
        const { id } = decoded as TokenPayload;

        request.client.clientId = id;
        next();
    } catch(error) {
        return response.status(401).json({ error: "Invalid Token" });
    }
}
