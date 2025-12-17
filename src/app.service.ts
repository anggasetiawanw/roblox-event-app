import { Injectable } from '@nestjs/common';
import * as os from 'os';
@Injectable()
export class AppService {
  private readonly startedAt = new Date();
  getHealthStatus() {
    const mem = process.memoryUsage() as NodeJS.MemoryUsage & {
      external?: number;
    };
    const totalMem = os.totalmem();
    const freeMem = os.freemem();

    const toMB = (b: number) => Math.round((b / 1024 / 1024) * 100) / 100;
    const secondsToHuman = (sec: number) => {
      const s = Math.floor(sec);
      const d = Math.floor(s / 86400);
      const h = Math.floor((s % 86400) / 3600);
      const m = Math.floor((s % 3600) / 60);
      const r = s % 60;
      return `${d}d ${h}h ${m}m ${r}s`;
    };

    const load = os.loadavg(); // [1m, 5m, 15m] (on Windows returns [0,0,0])

    return {
      status: 'ok',
      message: 'Server running',
      timestamp: new Date().toISOString(),
      startedAt: this.startedAt.toISOString(),
      uptime: {
        processSeconds: Math.floor(process.uptime()),
        processHuman: secondsToHuman(process.uptime()),
        systemSeconds: Math.floor(os.uptime()),
      },
      process: {
        pid: process.pid,
        node: process.versions.node,
        env: process.env.NODE_ENV || 'development',
        pm2: {
          enabled: Boolean(process.env.pm_id || process.env.NODE_APP_INSTANCE),
          pm_id: process.env.pm_id ? Number(process.env.pm_id) : undefined,
          instance: process.env.NODE_APP_INSTANCE
            ? Number(process.env.NODE_APP_INSTANCE)
            : undefined,
          name: process.env.name || undefined,
        },
      },
      host: {
        hostname: os.hostname(),
        platform: os.platform(),
        arch: os.arch(),
        loadAvg: { '1m': load[0], '5m': load[1], '15m': load[2] },
        memory: {
          totalMB: toMB(totalMem),
          freeMB: toMB(freeMem),
          usedMB: toMB(totalMem - freeMem),
          usedPercent:
            Math.round(((totalMem - freeMem) / totalMem) * 10000) / 100,
        },
      },
      memory: {
        rssMB: toMB(mem.rss),
        heapUsedMB: toMB(mem.heapUsed),
        heapTotalMB: toMB(mem.heapTotal),
        externalMB: toMB(mem.external || 0),
        rssPercentOfSystem: Math.round((mem.rss / totalMem) * 10000) / 100,
      },
    };
  }
}
