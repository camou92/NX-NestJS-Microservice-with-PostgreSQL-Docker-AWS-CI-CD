import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { TokenPayload } from '../token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                // request may be undefined in some contexts (e.g. microservice calls),
                // so make sure we safely access cookies/tokens without throwing.
                (request: any) => {
                    if (!request) {
                        return undefined;
                    }

                    // first try the cookie value (http requests)
                    const fromCookie = request?.cookies?.Authentication;
                    if (fromCookie) {
                        return fromCookie;
                    }

                    // sometimes the token gets passed explicitly on the object (gRPC)
                    if (request.token) {
                        return request.token;
                    }

                    // also support Authorization header fallback
                    const header = request.headers?.authorization;
                    if (header && typeof header === 'string') {
                        const parts = header.split(' ');
                        if (parts.length === 2 && parts[0] === 'Bearer') {
                            return parts[1];
                        }
                    }

                    return undefined;
                },
            ]),
            secretOrKey: configService.getOrThrow('AUTH_JWT_SECRET'),
        })
    }

    validate(payload: TokenPayload){
        return payload
    }

}