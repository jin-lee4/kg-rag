
class ApiService {
  constructor(url) {
    this.baseUrl = url;
  }

  async upload(file) {
    return null;
  }

  async query(uuid, question, instructions, chatHistory) {
    /*
      {
        "uuid": "...",
        // what the AI will do
        "question": "...",
        // what the AI is/works towards
        "instructions": ["..."],
        "chat_history": [["...", "..."]]?
      }
    */

    const json = JSON.stringify({
      "uuid": uuid,
      "question": question,
      "instructions": instructions,
      "chatHistory": chatHistory,
    });

    const response = await fetch(`${this.baseUrl}/api/v1/query`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: json,
    });

    return response;
  }
}

class Instruction {
  constructor(apiService) {
    if (new.target === Instruction) {
      throw new TypeError('Cannot construct Instruction instances directly');
    }
    this.apiService = apiService;
  }

  async query(uuid, question, chatHistory = []) {
    throw new Error('Method query() must be implemented.');
  }
}

class AnalyzeInstruction extends Instruction {
  constructor(apiService) {
    super(apiService);
  }

  async query(uuid, question, chatHistory = []) {
    let instructions = ["Identify gaps, considerations, and implications of your policies given your industry, needs, and organisation size."];
    return await this.apiService.query(uuid, question, instructions, chatHistory)
  }
}

class CompareInstruction extends Instruction {
  constructor(apiService) {
    super(apiService);
  }

  async query(uuid, question, chatHistory = []) {
    let instructions = ["Check whether your policy complies with governmental policies, and aligns with industry standards."];
    return await this.apiService.query(uuid, question, instructions, chatHistory)
  }
}

class ClarifyInstruction extends Instruction {
  constructor(apiService) {
    super(apiService);
  }

  async query(uuid, question, chatHistory = []) {
    let instructions = ["Clarify ambiguities in your policies to ensure they are easily understood and effectively implemented."];
    return await this.apiService.query(uuid, question, instructions, chatHistory)
  }
}

export { 
  ApiService, 
  Instruction, 
  AnalyzeInstruction, 
  CompareInstruction, 
  ClarifyInstruction 
};