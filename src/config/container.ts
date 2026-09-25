import { createContainer, asClass, InjectionMode } from 'awilix';
import { UserService } from '../services/users.service';
import { UserController } from '../controllers/users.controller';
import { HealthController } from '../controllers/health.controller';

export const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
});

container.register({
    // Controllers
    UserController: asClass(UserController).scoped(),
    healthController: asClass(HealthController).scoped(),

    // Services
    userService: asClass(UserService).scoped(),
})