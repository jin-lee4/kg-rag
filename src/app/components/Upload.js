"use client";
import { useState, useEffect } from "react";
import {
  ApiService,
  Instruction,
  AnalyzeInstruction,
  CompareInstruction,
  ClarifyInstruction,
} from "../util/backend.js";

const Upload = ({ modes, onSuggestions, onUploadStatus }) => {
  let service = new ApiService("http://localhost:8504");

  const test = async () => {
    let service = new ApiService("http://localhost:8504");
    let analyze_inst = new AnalyzeInstruction(service);
    let compare_inst = new CompareInstruction(service);
    let clarify_inst = new ClarifyInstruction(service);

    console.log("asking analyze question");
    console.log(
      await analyze_inst.query(
        "02b2b870-7ed9-4500-9931-2a17d0b06c70",
        "Who was empress elizabeth?"
      )
    );
  };

  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onUploadStatus(isUploaded);
  }, [isUploaded, onUploadStatus]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length) {
      setFile(files[0]);
      handleUpload();
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true); // Set loading to true when upload starts

    const formData = new FormData();
    formData.append("file", file);

    const apiResponse = await service.upload(formData);
    console.log("API response received");
    console.log("API Response:", apiResponse);

    const uuid = apiResponse.uuid;
    if (!uuid) {
      console.error("UUID not found in response:", apiResponse);
    }
    console.log("File uploaded successfully. File path:", uuid);

    //uploadResponse extracts PDF text with OCR
    const uploadResponse = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (uploadResponse.ok) {
      const result = await uploadResponse.json();
      const ocrResponse = await fetch("/api/ocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filePath: result.filePath }),
      });

      if (ocrResponse.ok) {
        const ocrResult = await ocrResponse.json();
        setText(ocrResult.text);
        setIsLoading(false);
        setIsUploaded(true);

        const response = await analyzeText(uuid, ocrResult.text); // Pass the UUID and text for analysis
        const suggestions = parseSuggestions(response.response);
        onSuggestions(suggestions);
        setIsUploaded(true);
      }
    } else {
      console.error("Upload failed");
    }
  };

  const analyzeText = async (uuid, extractedText) => {
    const instructions = {
      analyze: new AnalyzeInstruction(),
      compare: new CompareInstruction(),
      clarify: new ClarifyInstruction(),
    };

    // const selectedInstructions = modes.map((mode) => instructions[mode]);
    // console.log("selected instructions: ", selectedInstructions.type);
    console.log(uuid);

    const response = await service.query(
      uuid,
      extractedText,
      [
        new AnalyzeInstruction(),
        new ClarifyInstruction(),
        new Instruction(
          "You are a helpful assistant who is an expert in AI policies for tech companies with employees under 50 people. Provide suggestions on how to improve the company's draft of the given AI policies. Provide in the form of a list of suggestions (5 max). Do not add any other text besides the list."
        ),
      ],
      []
    );

    console.log("text analyzed successfully: ", response.response);
    return response;
  };

  const parseSuggestions = (responseText) => {
    const suggestionLines = responseText.split("\n");
    const suggestions = [];
    let currentSuggestion = "";

    suggestionLines.forEach((line) => {
      const isNumberedLine = /^\d+\./.test(line.trim());
      if (isNumberedLine) {
        if (currentSuggestion) {
          suggestions.push(currentSuggestion.trim());
        }
        currentSuggestion = line.trim();
      } else {
        currentSuggestion += ` ${line.trim()}`;
      }
    });

    if (currentSuggestion) {
      suggestions.push(currentSuggestion.trim());
    }

    return suggestions.map((suggestion, index) => ({
      title: `Analyze`,
      description: suggestion,
    }));
  };

  return (
    <div id="extracted-text-box">
      {isLoading ? (
        <div className="loading-indicator">
          <p>Uploading and processing file...</p>
          {/* You can add a spinner or other loading animation here */}
        </div>
      ) : isUploaded ? (
        <div id="extracted-text">
          <pre className="extracted-text">{text} </pre>
        </div>
      ) : (
        <div id="upload-box" onDragOver={handleDragOver} onDrop={handleDrop}>
          <div id="upload-content">
            <div>
              <label htmlFor="fileInput" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="111"
                  height="110"
                  viewBox="0 0 111 110"
                  fill="none"
                  className="icon"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.75 5.5C18.2312 5.5 17 6.73122 17 8.25V101.75C17 103.269 18.2312 104.5 19.75 104.5H55.9762C57.1648 104.5 57.8248 103.064 57.1475 102.087C56.3546 100.944 55.6556 99.7304 55.0616 98.4581C54.8278 97.9574 54.3321 97.625 53.7795 97.625H23.875V12.375H51.9766V44.7734C51.9766 46.2922 53.2078 47.5234 54.7266 47.5234H87.125V64.2795C87.125 64.8321 87.4574 65.3278 87.9581 65.5616C89.2304 66.1556 90.4438 66.8546 91.5871 67.6475C92.5639 68.3248 94 67.6648 94 66.4762V43.8012C94 43.0718 93.7103 42.3723 93.1945 41.8566L57.6434 6.30545C57.1277 5.78973 56.4282 5.5 55.6988 5.5H19.75ZM82.2636 40.6484L58.8516 17.2364V40.6484H82.2636Z"
                  />
                  <path d="M74.75 63.5938C75.5234 63.5938 76.125 62.9922 76.125 62.2188V58.0938C76.125 57.3344 75.5094 56.7188 74.75 56.7188H36.25C35.4906 56.7188 34.875 57.3344 34.875 58.0938V62.2188C34.875 62.9781 35.4906 63.5938 36.25 63.5938H74.75Z" />
                  <path d="M58.8529 71.7253C59.6957 70.7605 59.0527 69.0938 57.7717 69.0938H36.25C35.4906 69.0938 34.875 69.7094 34.875 70.4688V74.5938C34.875 75.3531 35.4906 75.9688 36.25 75.9688H55.0581C55.5568 75.9688 56.0138 75.6971 56.2706 75.2697C57.027 74.0111 57.8921 72.8253 58.8529 71.7253Z" />
                  <path d="M53.2109 83.2215C53.385 82.3317 52.7271 81.4688 51.8204 81.4688H36.25C35.4906 81.4688 34.875 82.0844 34.875 82.8438V86.9688C34.875 87.7281 35.4906 88.3438 36.25 88.3438H52.7523C52.7508 88.2294 52.75 88.1148 52.75 88C52.75 86.3653 52.9085 84.7676 53.2109 83.2215Z" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M62.2621 87.6857C61.7251 87.1488 61.7251 86.2782 62.2621 85.7412L75.526 72.4773C76.5999 71.4034 78.3411 71.4034 79.4151 72.4773L92.6789 85.7412C93.2159 86.2782 93.2159 87.1488 92.6789 87.6857L89.7621 90.6026C89.2251 91.1395 88.3545 91.1395 87.8176 90.6026L80.908 83.693V102.894C80.908 103.654 80.2924 104.269 79.533 104.269H75.408C74.6486 104.269 74.033 103.654 74.033 102.894V83.693L67.1235 90.6026C66.5865 91.1395 65.7159 91.1395 65.1789 90.6026L62.2621 87.6857Z"
                  />
                </svg>{" "}
              </label>
            </div>
            <div className="items-center justify-center flex flex-col space-y-3">
              <h4>
                <label htmlFor="fileInput">
                  Drag and drop an file or browse
                </label>
              </h4>
              <input
                id="fileInput"
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  handleFileChange(e);
                  handleUpload();
                }}
                className="hidden"
              />
              <p>File must be PDF</p>
              <button onClick={handleUpload} className="btn btn-primary">
                <p>Upload</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
