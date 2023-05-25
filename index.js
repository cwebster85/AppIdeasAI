import { Configuration, OpenAIApi } from "openai";

const mascotText = document.getElementById("mascot-text");
const apikeyBtn = document.getElementById("apikey-btn");

apikeyBtn.addEventListener("click", () => {
  const apiKeyInput = document.getElementById("api-key-input");
  const apiKey = apiKeyInput.value;
  
  if (apiKey.length > 0) {
    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);
    
    apiKeyInput.value = "";
    document.getElementById("api-key-error").innerHTML = "API key saved!";
    
    document.getElementById("send-btn").addEventListener("click", () => {
      const setupTextArea = document.getElementById("setup-textarea");
      
      if (setupTextArea.value) {
        const userInput = setupTextArea.value;
        const setupInputContainer = document.getElementById("setup-input-container");
        const mascotImage = document.getElementById("mascot");
        mascotImage.style.display = "none";
        const mascotThinking = document.getElementById("mascot-thinking");
        mascotThinking.style.display = "flex";
        setupInputContainer.innerHTML = '<img src="./images/icons8-loading.gif" alt="loading" class="loading" id=loading />';
        mascotText.innerHTML = "Ok let me think...";
        fetchBotReply(userInput);
        fetchIdea(userInput);
      }
    });
    
    async function fetchBotReply(idea) {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
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
        max_tokens: 60,
      });

      console.log(response.data);
      mascotText.innerText = response.data.choices[0].text.trim();
    }
    
    async function fetchIdea(idea) {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate an engaging, professional and marketable app idea based on the idea given by the user.
        ###
        idea: I want to create an app that helps query documents for legal research.
        description:
        This app is a cutting-edge app designed to revolutionize legal research and document retrieval for legal professionals. With its advanced search capabilities, intelligent algorithms, and user-friendly interface, LegalQuery Pro streamlines the process of querying legal documents, making it an indispensable tool for lawyers, paralegals, and law students.

        Key Features:

        Comprehensive Document Database:
        This app boasts an extensive database of legal documents, including case law, statutes, regulations, court filings, and legal articles. The app collaborates with reputable legal publishers and organizations to ensure a vast collection of up-to-date and authoritative sources.

        Advanced Search and Filters:
        The app utilizes sophisticated search algorithms to deliver accurate and relevant results. Users can enter keywords, phrases, case names, statutes, or citations to narrow down their queries. Advanced filters such as jurisdiction, date range, court level, and legal topic allow users to refine their search further.

        Natural Language Processing (NLP):
        This app employs NLP technology to enhance search capabilities. Users can input queries in natural language, and the app intelligently interprets the context, understanding legal terminology, synonyms, and common legal phrases to provide precise and targeted results.

        Document Analysis and Summaries:
        The app analyzes retrieved documents to generate concise summaries and key points, saving users valuable time in reviewing lengthy legal texts. Summaries can include relevant precedents, legal principles, and key findings to aid users in quickly assessing the document's relevance to their research.

        Citation Generator:
        This app includes a built-in citation generator that automatically generates accurate legal citations in various citation styles (e.g., Bluebook, APA, MLA). Users can easily copy and insert citations into their research papers, briefs, or legal documents, ensuring proper attribution and compliance with citation standards.

        Offline Access and Annotations:
        This app provides offline access to downloaded documents, enabling users to continue their research even without an internet connection. Additionally, users can highlight and annotate documents, making it easier to refer back to specific sections or add personal notes for future reference.

        Collaboration and Knowledge Sharing:
        The app allows users to collaborate and share documents with colleagues or clients securely. Users can create folders, organize research materials, and invite others to access and contribute to shared projects. This feature promotes efficient teamwork and knowledge sharing within legal teams.

        Legal Updates and Notifications:
        This app delivers real-time legal updates, ensuring users stay informed about new cases, legislation, and legal developments relevant to their areas of interest. Users can customize their notification preferences, ensuring they receive timely alerts on topics of importance.

        Monetization Strategies:

        Subscription Model: Offer tiered subscription plans with varying levels of access, advanced features, and document download limits.

        In-App Purchases: Provide access to premium legal publications, exclusive content, or specialized legal research tools as in-app purchases.

        Enterprise Solutions: Offer customized versions of this app for law firms and legal departments, providing enhanced collaboration features, advanced analytics, and dedicated support.

        Advertising and Sponsored Content: Collaborate with legal service providers, publishers, or law firms to display targeted advertisements or sponsored content within the app.

        Target Audience:
        This app primarily targets legal professionals, including lawyers, paralegals, legal researchers, and law students. It caters to individuals and organizations engaged in legal research and document analysis, streamlining their workflow and improving the efficiency of their legal research processes.

        Conclusion:
        This app revolutionizes legal research by providing a comprehensive and intuitive platform for querying legal documents. With its advanced search capabilities, intelligent algorithms, and collaborative features, LegalQuery Pro empowers legal professionals to conduct efficient and effective legal research, saving time and enhancing the accuracy of their work.


        ###
        idea: I want to create an app that helps people find the best restaurants in their area.
        description: 
        
        This is a comprehensive restaurant finder application that offers users a seamless and enjoyable dining experience. It goes beyond just locating nearby restaurants, providing a unique blend of features and functionality to assist users in discovering the perfect dining spot that suits their preferences. Whether users are looking for a casual eatery, a romantic fine dining restaurant, or a specific cuisine, Gourmet Explorer has it covered.
        
        Key Features:
        
        Personalized Recommendations:
        This app utilizes advanced algorithms and user preferences to deliver personalized restaurant recommendations. Users can input their dietary preferences, cuisine choices, ambiance preferences, and budget range to receive tailored suggestions for their next dining experience.
        
        Real-Time Availability:
        The app integrates with partner restaurants' reservation systems, allowing users to check real-time availability and book tables directly through the app. It provides accurate wait times, availability for walk-ins, and notifications for reservation confirmations and reminders.
        
        Reviews and Ratings:
        This app boasts an extensive database of user-generated reviews and ratings for restaurants. Users can read genuine feedback, leave their own reviews, and rate their dining experiences. The app employs a robust review filtering system to ensure high-quality and reliable feedback.
        
        Menu Exploration:
        The app includes a comprehensive menu section for each restaurant, allowing users to browse through their offerings. Users can explore detailed descriptions, view food photos, and access information about ingredients, allergens, and dietary options. Special menu items, promotions, and seasonal dishes are highlighted to entice users.
        
        Social Integration:
        This app connects with users' social media accounts, enabling them to share their restaurant experiences, check-ins, and reviews with friends and followers. It also provides a social feed where users can follow influencers, chefs, and fellow food enthusiasts for restaurant recommendations and culinary inspiration.
        
        Exclusive Deals and Rewards:
        The app partners with restaurants to offer exclusive deals, discounts, and loyalty programs for users. It provides access to limited-time promotions, happy hour specials, and loyalty rewards, enhancing the overall value and appeal for users.
        
        Seamless Navigation:
        This app integrates with popular mapping services to offer seamless navigation to restaurants. Users can get turn-by-turn directions, estimated travel times, and transportation options to reach their desired dining destinations conveniently.
        
        Curated Guides and Collections:
        The app features curated guides and collections, handpicked by local experts, food critics, and renowned chefs. These guides highlight hidden gems, trending restaurants, and thematic dining experiences to assist users in discovering unique culinary adventures.
        
        Monetization Strategies:
        
        Sponsored Placements: Restaurants can pay for enhanced visibility and prominent placement within search results, increasing their chances of attracting customers.
        
        Advertising: The app can display targeted advertisements from relevant businesses, such as food and beverage suppliers, cooking equipment brands, and culinary events.
        
        Premium Subscriptions: Offer a premium subscription tier with additional features like exclusive access to certain restaurants, priority reservations, and ad-free experience.
        
        Affiliate Partnerships: Collaborate with food delivery services or reservation platforms to earn referral fees for each successful transaction made through the app.
        
        Target Audience:
        This app targets food enthusiasts, travelers, and individuals who enjoy exploring the culinary scene. It caters to both local residents seeking new dining experiences and tourists searching for remarkable restaurants in unfamiliar locations.
        
        Conclusion:
        This app provides a comprehensive solution for restaurant discovery, reservations, and personalized recommendations, all in one app. With its user-friendly interface, reliable reviews, and innovative features, Gourmet Explorer is poised to become the go-to app for anyone seeking memorable dining experiences.
        ###
        idea:${idea}
        description:
        `,
        max_tokens: 900,
      });

      document.getElementById("output-container").style.display = "flex";
      const outline = response.data.choices[0].text.trim();
      document.getElementById("output-text").innerText = outline;
      document.getElementsByClassName("loading")[0].style.display = "none";

      fetchTitle(idea);
      
    }
    
    async function fetchTitle(idea) {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate a catchy title for the app idea given by the user. This is their idea: ${idea}.
        ###
        idea: I want to create an app that helps people find the best restaurants in their area.
        title: Gourmet Explorer
        ###
        idea: I want to create an app that helps query documents for legal research. 
        title: Legal Query Pro
        ###
        idea:${idea}
        title:
        `,
        max_tokens: 15,
        temperature: 0.7,
      });

      const title = response.data.choices[0].text.trim();
      document.getElementById("output-title").innerText = title;
      fetchImagePrompt(title, idea)
    }

    async function fetchImagePrompt(title, idea){
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Give a short description of an image which could be used for an app or website based on a title and idea. The description should be rich in visual detail but contain no text.
        ###
        title: Coffee Lovers
        idea: I want to create an app that helps people find the best coffee shops in their area.
        ###
        title: Legal Research AI
        idea: I want to create an app that helps query documents for legal research.
        ###
        title: ${title}
        idea: ${idea}
        image description: 
        `,
        temperature: 0.8,
        max_tokens: 100
      })
      fetchImageUrl(response.data.choices[0].text.trim())
    }
    
    async function fetchImageUrl(imagePrompt){
      const response = await openai.createImage({
        prompt: `${imagePrompt}. There should be no text in this image.`,
        n: 1,
        size: '256x256',
        response_format: 'b64_json' 
      })
      document.getElementById('output-img-container').innerHTML = `<img src="data:image/png;base64,${response.data.data[0].b64_json}">`
      setupInputContainer.innerHTML = `<button id="view-pitch-btn" class="view-pitch-btn">View Logo</button>`
      document.getElementById('view-logo-btn').addEventListener('click', ()=>{
        document.getElementById('setup-container').style.display = 'none'
        document.getElementById('output-container').style.display = 'flex'
        mascotText.innerText = `This idea is so good I'm jealous! It's gonna make you rich for sure! Remember, I want 10% 💰`
      })
    }

  } else {
    document.getElementById("api-key-error").innerHTML =
      "Please enter your OpenAI API key in order to use this app!";
  }
});
