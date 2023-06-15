import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

class BasicDto {
  user: string;
  password: string;
}

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (req, username, password): Promise<boolean> => {
    const credentials = this.configService.get<BasicDto>('basic');
    if (credentials.user === username && credentials.password === password) {
      return true;
    }
    throw new UnauthorizedException();
  };
}
