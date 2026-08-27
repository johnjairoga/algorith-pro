import fs from 'fs';
import path from 'path';
import GHLClient from '../lib/ghl-client.js';

const tagsConfig = JSON.parse(
  fs.readFileSync(path.resolve('./config/tags.json'), 'utf-8')
);

class TagService {
  constructor(ghlClient = null) {
    this.ghl = ghlClient || new GHLClient();
  }

  async setupAll() {
    console.log('🔧 Iniciando setup de tags...\n');

    const results = {
      success: [],
      failed: [],
      byCategory: {},
      startTime: new Date(),
    };

    for (const category in tagsConfig.tags) {
      results.byCategory[category] = { success: [], failed: [] };
      console.log(`🏷️  Categoria: ${category}\n`);

      for (const tagName of tagsConfig.tags[category]) {
        try {
          await this.createTag(tagName);
          results.success.push(tagName);
          results.byCategory[category].success.push(tagName);
          console.log(`   ✅ ${tagName}`);
        } catch (error) {
          results.failed.push({
            category,
            name: tagName,
            error: error.message,
          });
          results.byCategory[category].failed.push(tagName);
          console.error(`   ❌ ${tagName}: ${error.message}`);
        }
      }

      console.log();
    }

    results.endTime = new Date();
    results.duration = results.endTime - results.startTime;

    return results;
  }

  async createTag(tagName) {
    return await this.ghl.createTag(tagName);
  }

  getTagConfig() {
    return tagsConfig.tags;
  }

  getTagsByCategory(category) {
    return tagsConfig.tags[category] || [];
  }

  getAllTags() {
    const allTags = [];
    for (const category in tagsConfig.tags) {
      allTags.push(...tagsConfig.tags[category]);
    }
    return allTags;
  }
}

export default TagService;
