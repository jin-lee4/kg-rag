class ApiService {
  constructor(url) {
    this.baseUrl = url;
  }

  async upload(fileForm) {
    /*
      @params:  fileForm - a FormData object containing a file (ie... form.append("file", file))
      @purpose: Upload a file to the backend for use in RAG pipeline
      @returns: JSON with 'uuid' key, representing the file that was uploaded (to be used in future requests)
    */
    // const response = await fetch(`${this.baseUrl}/api/v1/upload`, {
    //   method: 'POST',
    //   headers: {
    //     "Accept": "application/pdf",
    //     "Content-Type": "application/pdf"
    //   },
    //   body: fileForm
    // });

    const response = await fetch(`${this.baseUrl}/api/v1/upload`, {
      method: "POST",
      body: fileForm,
    });

    const data = await response.json();
    return data; // Return the parsed JSON data

    // return response;
  }

  async query(uuid, question, instructions = [], chatHistory = []) {
    /*
      @params:  uuid - a string UUID representing an uploaded document,
                question - a string representing a question to ask the AI,
                instructions - a list of Instruction's,
                chatHistory - a list of ordered string pairs represented as lists
      @purpose: POST to /api/v1/query to get AI response back for analysis
      @returns: JSON with 'response' key, indicating AI response

      Constructs JSON of form:
      {
        "uuid": "...",
        // what the AI will do
        "question": "...",
        // what the AI is/works towards
        "instructions": ["..."],
        "chat_history": [["...", "..."]]?
      }
    */

    console.log("uuid: ", uuid);
    console.log("question: ", question);
    console.log("instructions: ", instructions);

    const json = JSON.stringify({
      uuid: uuid,
      question: question,
      instructions: instructions.map((i) => i.instruction),
      chatHistory: chatHistory,
    });

    const response = await fetch(`${this.baseUrl}/api/v1/query`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: json,
    });

    const data = await response.json();
    return data; // Return the parsed JSON data
  }
}

class Instruction {
  constructor(instruction) {
    this.instruction = instruction;
  }
}

class AnalyzeInstruction extends Instruction {
  constructor() {
    super(
      "Identify gaps, considerations, and implications of your policies given your industry, needs, and organisation size."
    );
  }
}

class CompareInstruction extends Instruction {
  constructor(apiService) {
    super(
      "Check whether your policy complies with governmental policies, and aligns with industry standards."
    );
  }
}

class ClarifyInstruction extends Instruction {
  constructor(apiService) {
    super(
      "Clarify ambiguities in your policies to ensure they are easily understood and effectively implemented."
    );
  }
}

export {
  ApiService,
  Instruction,
  AnalyzeInstruction,
  CompareInstruction,
  ClarifyInstruction,
};
