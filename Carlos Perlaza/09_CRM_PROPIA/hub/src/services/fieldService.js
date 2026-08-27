import fs from 'fs';
import path from 'path';
import GHLClient from '../lib/ghl-client.js';

const fieldsConfig = JSON.parse(
  fs.readFileSync(path.resolve('./config/custom-fields.json'), 'utf-8')
);

class FieldService {
  constructor(ghlClient = null) {
    this.ghl = ghlClient || new GHLClient();
  }

  async setupAll() {
    console.log('🔧 Iniciando setup de campos personalizados...\n');

    const results = {
      success: [],
      failed: [],
      byCategory: {},
      startTime: new Date(),
    };

    for (const category in fieldsConfig.fields) {
      results.byCategory[category] = { success: [], failed: [] };
      console.log(`📋 Categoria: ${category}\n`);

      for (const field of fieldsConfig.fields[category]) {
        try {
          await this.createField(field);
          results.success.push(`${category}/${field.name}`);
          results.byCategory[category].success.push(field.name);
          console.log(`   ✅ ${field.displayName}`);
        } catch (error) {
          results.failed.push({
            category,
            name: field.displayName,
            error: error.message,
          });
          results.byCategory[category].failed.push(field.displayName);
          console.error(`   ❌ ${field.displayName}: ${error.message}`);
        }
      }

      console.log();
    }

    results.endTime = new Date();
    results.duration = results.endTime - results.startTime;

    return results;
  }

  async createField(fieldData) {
    const payload = {
      name: fieldData.name,
      displayName: fieldData.displayName,
      type: fieldData.type,
      description: fieldData.description,
    };

    if (fieldData.options) {
      payload.options = fieldData.options;
    }

    return await this.ghl.createCustomField(payload);
  }

  getFieldConfig() {
    return fieldsConfig.fields;
  }

  getFieldsByCategory(category) {
    return fieldsConfig.fields[category] || [];
  }
}

export default FieldService;
