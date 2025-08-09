export class Result<T = unknown> {
    private readonly _isSuccess: boolean;
    private  _errors: string[] = [];
    private readonly _successMessages: string[] = [];
    private _value: T | null = null;
  
    // Construtor privado para controle interno
    private constructor(isSuccess: boolean) {
      this._isSuccess = isSuccess;
    }
  
    // Criadores estáticos para sucesso e falha
    static Ok<T = null>(value: T | null = null): Result<T> {
      const result = new Result<T>(true);
      if (value !== null) {
        result._value = value;
      }
      return result;
    }
  
    static Fail<T = null>(error: string | string[]): Result<T> {
      const result = new Result<T>(false);
      result._errors = Array.isArray(error) ? error : [error];
      return result;
    }
  
    // Adiciona mensagens de sucesso
    withSuccess(message: string): this {
      if (!this._isSuccess) {
        throw new Error('Cannot add success messages to a failed result.');
      }
      this._successMessages.push(message);
      return this;
    }
  
    // Adiciona erros
    withError(error: string): this {
      if (this._isSuccess) {
        throw new Error('Cannot add errors to a successful result.');
      }
      this._errors.push(error);
      return this;
    }
  
    // Obtém o valor associado
    getValue(): T | null {
      if (!this._isSuccess) {
        throw new Error('Cannot retrieve value from a failed result.');
      }
      return this._value;
    }
  
    // Propriedades de leitura
    get isSuccess(): boolean {
      return this._isSuccess;
    }
  
    get isFailed(): boolean {
      return !this._isSuccess;
    }
  
    get errors(): string[] {
      return this._errors;
    }
  
    get successMessages(): string[] {
      return this._successMessages;
    }
  
    get value(): T | null {
      return this._value;
    }
}