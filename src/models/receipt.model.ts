export class Receipt {
  constructor(
    public registrationNumber: string,
    public amount: number,
    public issuedDate?: string
  ) {}

  getRegistrationNumber = (): string => this.registrationNumber;

  getAmount = (): number => this.amount;

  getIssuedDate = (): string => this.issuedDate || new Date().toISOString();
}
