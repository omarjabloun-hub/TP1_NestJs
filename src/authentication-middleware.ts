import { Inject, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export class AuthenticationMiddleware implements NestMiddleware {
    constructor(@Inject(JwtService) private jwtService: JwtService) {}
    use(req: any, res: any, next: () => void) {
        console.log("Authenticating Request...");
        // get the token from the header
        try{
            const token = req.headers.authorization.split(" ")[1];
            console.log(token);
            const decoded = this.jwtService.verify(token);

            req.userData = decoded;
            console.log(req.userData);

            next();
        }
        catch(error) {
            // console.log(error);
            return res.status(401).json({
                message : "Auth failed"
            });
        }

    }
}