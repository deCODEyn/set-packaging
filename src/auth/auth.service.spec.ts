import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { DEMO_USER } from '../constants/auth.constants';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'SUPER_SECRET_DEMO' });
    service = new AuthService(jwtService);
  });

  it('deve validar usuário correto', () => {
    const result = service.validateUser(DEMO_USER.username, DEMO_USER.password);
    expect(result).toEqual({ username: DEMO_USER.username });
  });

  it('deve falhar se usuário ou senha estiver incorreto', () => {
    const result = service.validateUser('wrong', 'wrong');
    expect(result).toBeNull();
  });

  it('deve gerar um token JWT válido', () => {
    const payload = { username: DEMO_USER.username };
    const result = service.login(payload);
    expect(result).toHaveProperty('access_token');
    expect(typeof result.access_token).toBe('string');
  });
});
