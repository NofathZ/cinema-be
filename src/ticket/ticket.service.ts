import { Injectable } from "@nestjs/common";
import axios from 'axios'

Injectable();
export class TicketService {
  constructor() {}

  async getTicket() {
    const result = axios.get('https://seleksi-sea-2023.vercel.app/api/movies')
    return result
  }
}
