import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class GHLClient {
  constructor() {
    this.locationId = process.env.GHL_LOCATION_ID;
    this.pitToken = process.env.GHL_PIT_TOKEN;
    this.apiUrl = process.env.GHL_API_URL || 'https://rest.gohighlevel.com/v1';

    if (!this.locationId || !this.pitToken) {
      throw new Error(
        'GHL_LOCATION_ID e GHL_PIT_TOKEN são obrigatórios. Configure .env com credenciais da subconta.'
      );
    }

    this.client = axios.create({
      baseURL: this.apiUrl,
      headers: {
        Authorization: `Bearer ${this.pitToken}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      }
    });
  }

  async createPipeline(pipelineData) {
    try {
      const payload = {
        name: pipelineData.name,
        locationId: this.locationId,
        stages: pipelineData.stages
      };

      const response = await this.client.post(
        `/opportunities/pipelines`,
        payload
      );
      console.log(`✅ Pipeline criado: ${pipelineData.name}`);
      console.log(`   Resposta bruta: ${JSON.stringify(response.data, null, 2)}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao criar pipeline ${pipelineData.name}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async createCustomField(fieldData) {
    try {
      const response = await this.client.post(
        `/locations/${this.locationId}/custom-fields`,
        fieldData
      );
      console.log(`✅ Campo personalizado criado: ${fieldData.name}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao criar campo ${fieldData.name}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async createTag(tagName) {
    try {
      const response = await this.client.post(
        `/locations/${this.locationId}/tags`,
        { name: tagName }
      );
      console.log(`✅ Tag criada: ${tagName}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao criar tag ${tagName}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async createWorkflow(workflowData) {
    try {
      const response = await this.client.post(
        `/locations/${this.locationId}/workflows`,
        workflowData
      );
      console.log(`✅ Workflow criado: ${workflowData.name}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao criar workflow ${workflowData.name}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async getLocationInfo() {
    try {
      const response = await this.client.get(`/locations/${this.locationId}`);
      return response.data;
    } catch (error) {
      // Se falla con path, intenta con query param
      if (error.response?.status === 404) {
        try {
          const response = await this.client.get('/locations', {
            params: { locationId: this.locationId }
          });
          return response.data;
        } catch (innerError) {
          console.error('❌ Erro ao obter info da localização:', innerError.response?.data || innerError.message);
          throw innerError;
        }
      }
      console.error('❌ Erro ao obter info da localização:', error.response?.data || error.message);
      throw error;
    }
  }

  async getPipelines() {
    try {
      const response = await this.client.get('/opportunities/pipelines', {
        params: { locationId: this.locationId }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao obter pipelines:', error.response?.data || error.message);
      throw error;
    }
  }

  async deletePipeline(pipelineId) {
    try {
      await this.client.delete(`/opportunities/pipelines/${pipelineId}`);
      console.log(`✅ Pipeline deletado: ${pipelineId}`);
      return { success: true, id: pipelineId };
    } catch (error) {
      console.error(`❌ Erro ao deletar pipeline ${pipelineId}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async getTags() {
    try {
      const response = await this.client.get(`/locations/${this.locationId}/tags`);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao obter tags:', error.response?.data || error.message);
      throw error;
    }
  }

  async deleteTag(tagId) {
    try {
      await this.client.delete(`/locations/${this.locationId}/tags/${tagId}`);
      console.log(`✅ Tag deletada: ${tagId}`);
      return { success: true, id: tagId };
    } catch (error) {
      console.error(`❌ Erro ao deletar tag ${tagId}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async createContact(contactData) {
    try {
      const response = await this.client.post(
        `/locations/${this.locationId}/contacts`,
        contactData
      );
      console.log(`✅ Contato criado: ${contactData.firstName} ${contactData.lastName}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao criar contato:`, error.response?.data || error.message);
      throw error;
    }
  }

  async getContacts(limit = 50, offset = 0) {
    try {
      const response = await this.client.get(
        `/locations/${this.locationId}/contacts`,
        { params: { limit, offset } }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao obter contatos:', error.response?.data || error.message);
      throw error;
    }
  }

  async createCalendar(calendarData) {
    try {
      const payload = {
        isActive: true,
        locationId: this.locationId,
        name: calendarData.name,
        description: calendarData.description || '',
        calendarType: this.mapCalendarType(calendarData.type),
        eventColor: calendarData.color || '#2E7D32',
        eventTitle: '{{contact.name}}',
        widgetType: 'classic',
        slotDuration: calendarData.duration || 30,
        slotDurationUnit: 'mins',
        slotInterval: calendarData.duration || 30,
        slotIntervalUnit: 'mins',
        slotBuffer: 0,
        slotBufferUnit: 'mins',
        preBuffer: 0,
        preBufferUnit: 'mins',
        appoinmentPerSlot: 1,
        appoinmentPerDay: 0,
        allowBookingAfter: 0,
        allowBookingAfterUnit: 'days',
        allowBookingFor: 0,
        allowBookingForUnit: 'days',
        enableRecurring: false,
        autoConfirm: true,
        allowReschedule: true,
        allowCancellation: true,
        googleInvitationEmails: false,
        ...(calendarData.teamMembers && { teamMembers: calendarData.teamMembers }),
      };

      const ghlClient = axios.create({
        baseURL: 'https://services.leadconnectorhq.com',
        headers: {
          Authorization: `Bearer ${this.pitToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Version': '2021-07-28'
        }
      });

      console.log(`   📡 POST https://services.leadconnectorhq.com/calendars/`);
      const response = await ghlClient.post(`/calendars/`, payload);
      console.log(`✅ Calendario criado: ${calendarData.name}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao criar calendario ${calendarData.name}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async updateCalendar(calendarId, calendarData) {
    try {
      const payload = {
        ...(calendarData.name && { name: calendarData.name }),
        ...(calendarData.description && { description: calendarData.description }),
        ...(calendarData.color && { eventColor: calendarData.color }),
        ...(calendarData.businessHours && { openHours: this.mapBusinessHours(calendarData.businessHours) }),
      };

      const v3Client = axios.create({
        baseURL: 'https://services.leadconnectorhq.com',
        headers: {
          Authorization: `Bearer ${this.pitToken}`,
          'Content-Type': 'application/json',
          'Version': 'v3'
        }
      });

      const response = await v3Client.put(`/calendars/${calendarId}`, payload);
      console.log(`✅ Calendario actualizado: ${calendarId}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao actualizar calendario ${calendarId}:`, error.response?.data || error.message);
      throw error;
    }
  }

  mapCalendarType(type) {
    const typeMap = {
      'booking': 'round_robin',
      'event': 'event',
      'availability': 'personal'
    };
    return typeMap[type] || 'event';
  }

  mapBusinessHours(businessHours) {
    if (!businessHours) return [];

    const { daysOfWeek, start, end } = businessHours;
    const [openHour, openMinute] = start.split(':').map(Number);
    const [closeHour, closeMinute] = end.split(':').map(Number);

    return [{
      daysOfTheWeek: daysOfWeek || [1, 2, 3, 4, 5, 6],
      hours: [{
        openHour,
        openMinute,
        closeHour,
        closeMinute
      }]
    }];
  }
}

export default GHLClient;
