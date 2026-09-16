const tools = {
  writer: {
    label: "AI WRITER",
    title: "Create something useful",
    placeholder: "Example: Write a short product description for a small online clothing business."
  },
  ideas: {
    label: "IDEA GENERATOR",
    title: "Turn problems into ideas",
    placeholder: "Example: Give me five AI product ideas for small businesses in Africa."
  },
  summary: {
    label: "SUMMARIZER",
    title: "Understand information faster",
    placeholder: "Paste text here and ask for a concise summary."
  },
  automation: {
    label: "AUTOMATION PLANNER",
    title: "Find opportunities to automate",
    placeholder: "Example: I run a small online shop. What tasks could I automate?"
  }
};

let selectedTool = "writer";

const toolButtons = document.querySelectorAll(".tool");
const toolLabel = document.querySelector("#toolLabel");
const toolTitle = document.querySelector("#toolTitle");
const prompt = document.querySelector("#prompt");
const generate = document.querySelector("#generate");
const result = document.querySelector("#result");
const copy = document.querySelector("#copy");

toolButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedTool = button.dataset.tool;

    toolButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    toolLabel.textContent = tools[selectedTool].label;
    toolTitle.textContent = tools[selectedTool].title;
    prompt.placeholder = tools[selectedTool].placeholder;
    result.innerHTML = '<span class="placeholder">Your AI-generated result will appear here.</span>';
  });
});

generate.addEventListener("click", async () => {
  const input = prompt.value.trim();

  if (!input) {
    result.textContent = "Please enter a request first.";
    return;
  }

  generate.disabled = true;
  generate.textContent = "Generating...";
  result.textContent = "Thinking...";

  // DEMO MODE:
  // This mock response keeps the project usable without an API key.
  // Replace this section with a request to your secure backend when
  // connecting a real AI provider.
  await new Promise(resolve => setTimeout(resolve, 700));

  result.textContent = createDemoResponse(selectedTool, input);

  generate.disabled = false;
  generate.textContent = "Generate →";
});

copy.addEventListener("click", async () => {
  const text = result.textContent.trim();

  if (!text || text === "Your AI-generated result will appear here.") return;

  try {
    await navigator.clipboard.writeText(text);
    copy.textContent = "Copied!";
    setTimeout(() => copy.textContent = "Copy", 1200);
  } catch {
    copy.textContent = "Select & copy";
  }
});

function createDemoResponse(tool, input) {
  const responses = {
    writer: `Draft based on your request:

${input}

A production version of this tool would send your request to an AI model and return a tailored response here.`,
    ideas: `Ideas based on your request:

1. A simple AI assistant for repetitive tasks.
2. An affordable automation dashboard for small businesses.
3. A creator-focused content workflow.
4. An AI document and information assistant.
5. A lightweight tool that combines several common AI workflows.

Your request: ${input}`,
    summary: `Summary request received:

${input}

A production version would process the supplied text with an AI model and return a concise summary.`,
    automation: `Automation opportunities to investigate:

• Repetitive customer questions
• Content drafting
• Document processing
• Data organization
• Routine reporting
• Scheduling and notifications

Your situation: ${input}`
  };

  return responses[tool];
}
