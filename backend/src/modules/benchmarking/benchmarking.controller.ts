import { Controller, Post, Get, Headers, UseGuards, UnauthorizedException, Query } from '@nestjs/common';
import { BenchmarkingService } from './benchmarking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('benchmarking')
export class BenchmarkingController {
    constructor(private readonly benchmarkingService: BenchmarkingService) { }

    /**
     * Realizar Corte del Día.
     */
    @Post('snapshot')
    async takeSnapshot(@Headers('authorization') authHeader: string) {
        if (!authHeader) {
            throw new UnauthorizedException('Se requiere token de autenticación (Google OAuth)');
        }
        return this.benchmarkingService.processDailySnapshot(authHeader);
    }

    /**
     * Ejecutar consultas prueba registradas.
     */
    @Post('run-queries')
    async runQueries() {
        await this.benchmarkingService.runRegisteredQueries();
        return { message: 'Consultas de benchmarking ejecutadas con éxito' };
    }

    /**
     * Obtener ID proyecto actual.
     */
    @Get('project')
    async getProject() {
        const projectId = await this.benchmarkingService.getCurrentProjectId();
        return { project_id: projectId };
    }

    /**
     * Métricas reales pg_stat_statements.
     */
    @Get('metrics')
    async getMetrics(@Query('limit') limit?: string) {
        return this.benchmarkingService.getQueryMetrics(limit ? parseInt(limit) : 20);
    }
}
