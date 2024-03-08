import { randomUUID } from "node:crypto";

export class BaseEntity {
  readonly id: string;

  constructor() {
    this.id = randomUUID();
  }
}
