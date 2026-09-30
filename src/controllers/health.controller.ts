import { Request, Response } from "express";
import { env } from "../config/env"; 
export class HealthController {

  public health = async (req: Request, res: Response): Promise<void> => {
    const uptimeSeconds = Math.floor(process.uptime());

    res.status(200).json({
      status: "UP",
      serviceName: env.appName,
      version: env.appVersion,
      environment: env.nodeEnv,
      timestamp: new Date().toISOString(),
      uptime: `${uptimeSeconds}s`,
      memoryUsage: {
        rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      },
    });
  };
}