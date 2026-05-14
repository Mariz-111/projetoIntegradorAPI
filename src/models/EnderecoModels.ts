export interface Endereco {
    id?: number;
    cliente_id: number; 
    rua: string;
    numero: string;   
    bairro: string;
    cidade: string;
    estado: string;   
    cep: string;     
    complemento?: string; 
}