// import { process } from './env.js';
import { Configuration, OpenAIApi } from 'openai';

const mascotText = document.getElementById('mascot-text');
// const configuration = new Configuration({ apiKey });
const apikeyBtn = document.getElementById('apikey-btn');
// const openai = new OpenAIApi();

apikeyBtn.addEventListener('click', () => {
  const apiKeyInput = document.getElementById('api-key-input');
  const apiKey = apiKeyInput.value;
  if (apiKey.length > 0) {
    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);
    apiKeyInput.value = '';
    document.getElementById('api-key-error').innerHTML = 'API key saved!';


document.getElementById("send-btn").addEventListener("click", () => {
    const setupTextArea = document.getElementById('setup-textarea');
    if (setupTextArea.value) {
        const userInput = setupTextArea.value;
        const setupInputContainer = document.getElementById('setup-input-container');
        const mascotImage = document.getElementById('mascot');
        mascotImage.style.display = 'none';
        const mascotThinking = document.getElementById('mascot-thinking');
        mascotThinking.style.display = 'flex';
    
        setupInputContainer.innerHTML = '<img src="./images/icons8-loading.gif" alt="loading" class="loading" id=loading />';
        
        const mascotText = document.getElementById('mascot-text');
        mascotText.innerHTML = 'Ok let me think...';
        fetchBotReply(userInput);
        fetchIdea(userInput);
    }
});


async function fetchBotReply(idea) {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a short message to enthusiastically say an idea sounds interesting and that you need some minutes to think about it.
      ###
      idea: I want to create an app that helps people find the best restaurants in their area.
      message: Oh wow, sounds awesome! It's making me hungry thinking about it! I'll spend a few moments considering that.
      ###
      idea: I want to create an app that helps people write a best man's speech for a wedding.
      message: An app to help people write a best man's speech? Now that's something I can get behind! I'll spend a few moments considering that.
      ###
      idea: I want to create an app that helps query documents for legal research.
      message: Now that IS definitely useful as trawling through legal documents takes an age! Let me think about that for a few moments.
      ###
      idea: ${idea}
      message: 
      `,
      max_tokens: 60
    })
    console.log(response.data)
    mascotText.innerText = response.data.choices[0].text.trim()
  } 

async function fetchIdea(idea) {
const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate an engaging, professional and marketable app idea based on the idea given by the user. Give a suggestion for the name of the app first in bold text and list the steps in bullet points.
    ###
    idea: I want to create an app that helps query documents for legal research.
    outline: To create a legal research app, follow these steps:

    Name: LegalResearch AI

    > Define Scope: Outline app objectives, target users, and desired features.
    
    > Research Legal Databases: Identify relevant APIs or data sources for legal documents.
    
    > Design User Interface: Create a user-friendly interface for querying and viewing legal documents.
    
    > Develop Backend: Build a server or backend system to process queries and interact with legal databases.
    
    > Integrate NLP: Use natural language processing techniques to enhance search capabilities.
    
    > Implement User Authentication: Ensure secure access and protect sensitive information.
    
    > Test and Refine: Thoroughly test the app, gather feedback, and make improvements.
    
    > Deploy and Maintain: Host the app, address security vulnerabilities, and update based on user feedback.
    
    > Consider legal and ethical considerations, consult legal professionals, and prioritize user needs and data accuracy.  
    ###
    idea:${idea}
    outline: 
    `,
    max_tokens: 700
})
document.getElementById('output-container').style.display = 'flex';
const outline = response.data.choices[0].text.trim()
document.getElementById('output-text').innerText = outline
document.getElementById('loading').style.display = 'none';
document.getElementByClassName('loading').style.display = 'none';
}
} 
else {
  document.getElementById('api-key-error').innerHTML = 'Please enter your OpenAI API key in order to use this app!';
}
});