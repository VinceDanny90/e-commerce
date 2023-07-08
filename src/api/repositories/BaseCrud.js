import apiClient from '../apiClient'

class BaseCrud{
    _apiClient = apiClient;
    _resource;
    constructor(resource){
        this._resource = resource;
    }

    async create(payload){
        try {
           const { data } = await this._apiClient.post(`/${this._resource}` , payload)
           return data;
        } catch (error) {
            throw error
        }
    }
    async readAll(){
        try {
            const {data} = await this._apiClient.get(`/${this._resource}`)
            return data;
        } catch (error) {
            throw error;
        }    
    }
    async readById(id){
        try {
            const {data} = await this._apiClient.get(`/${this._resource}/${id}`)
            return data;
        } catch (error) {
            throw error;
        }    
    }
    async readBycategoryId(category_id){
        try {
            const {data} = await this._apiClient.get(`/${this._resource}/${category_id}`)
            return data;
        } catch (error) {
            throw error;
        }    
    }
    async update(id, payload) {
        try {
          const { data } = await this._apiClient.put(`/${this._resource}/${id}`, payload);
          return data;
        } catch (error) {
          throw error;
        }
      }
    async delete(id){
        try {
            const { data } =await this._apiClient.delete(`/${this._resource}/${id}`)
            return data;
        } catch (error) {
            throw error;
        }
    }
   
}

export default BaseCrud