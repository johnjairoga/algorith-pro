import fs from 'fs';
import path from 'path';
import GHLClient from '../lib/ghl-client.js';

const pipelinesConfig = JSON.parse(
  fs.readFileSync(path.resolve('./config/pipelines.json'), 'utf-8')
);

class PipelineService {
  constructor(ghlClient = null) {
    this.ghl = ghlClient || new GHLClient();
  }

  async setupAll() {
    console.log('🔧 Iniciando setup de todos os pipelines...\n');

    const results = {
      success: [],
      failed: [],
      startTime: new Date(),
    };

    for (const pipeline of pipelinesConfig.pipelines) {
      try {
        await this.createPipeline(pipeline);
        results.success.push(pipeline.name);
        console.log(`✅ ${pipeline.name}\n`);
      } catch (error) {
        results.failed.push({
          name: pipeline.name,
          error: error.message,
        });
        console.error(`❌ ${pipeline.name}: ${error.message}\n`);
      }
    }

    results.endTime = new Date();
    results.duration = results.endTime - results.startTime;

    return results;
  }

  async createPipeline(pipelineData) {
    const stages = pipelineData.stages.map((stage, index) => ({
      name: stage.name,
      position: index + 1
    }));

    const payload = {
      name: pipelineData.name,
      stages: stages,
    };

    return await this.ghl.createPipeline(payload);
  }

  async getPipelines() {
    return await this.ghl.getPipelines();
  }

  getPipelineConfig() {
    return pipelinesConfig.pipelines;
  }
}

export default PipelineService;
