import { createContainer, InjectionMode, Lifetime } from "awilix";
import { create } from "domain";

export const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
});

// Distinguir entre producción entre desarrollo.
const fileExtension = process.env.NODE_ENV === "production" ? "js" : "ts";

// Para cargar los controladores, servicios y repos.
container.loadModules(
    [
        "src/controllers/**/*.controller.ts",
        "src/services/**/*.service.ts",
        "src/repositories/**/*.repository.ts",
    ],
    {
        formatName: "camelCase",
        resolverOptions: {
            lifetime: Lifetime.SCOPED,
        },
    }
);