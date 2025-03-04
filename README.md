# 🚀 AI Chatbot with Multiple AI Models (React + Bootstrap)

![Chatbot Preview](https://himkalp.in/wp-content/uploads/2025/03/chatbot.png)

A powerful **React-based AI Chatbot** that supports **multiple AI models** (Together AI, Fireworks AI, and Hugging Face). This chatbot features **real-time streaming**, a **typing indicator**, and a **simple UI** built with **Bootstrap**.

---

## **🔹 Features**

✔ **Multi-Model Support**: Choose between **Together AI, Fireworks AI, and Hugging Face**  
✔ **Real-Time Streaming**: AI responses appear **word-by-word** for a realistic chat experience  
✔ **Typing Indicator**: Shows **"Bot is typing..."** while waiting for a response  
✔ **Bootstrap UI**: Simple and responsive design  
✔ **API Key Management**: Uses environment variables for security

---

## **📌 Demo**

<!-- Add a link to a live demo if hosted -->

Try it live here: **[Live Demo](https://your-demo-link.com)**

---

## **🔧 Installation**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/amankkamboj/ai-chatbot.git
cd ai-chatbot
```

````

 **2️⃣ Install Dependencies**

```sh
npm install


 **3️⃣ Set Up Environment Variables**

Create a `.env` file in the project root and add your API keys:


REACT_APP_TOGETHER_AI_KEY=your_together_ai_api_key
REACT_APP_FIREWORKS_API_KEY=your_fireworks_api_key
REACT_APP_HUGGINGFACE_API_KEY=your_huggingface_api_key


**Get API Keys from:**

- 🔹 [Together AI](https://together.ai/)
- 🔹 [Fireworks AI](https://fireworks.ai/)
- 🔹 [Hugging Face](https://huggingface.co/)

---

 **🚀 Run the Chatbot**


npm start


The chatbot will be available at:
🔗 `http://localhost:3000`

---

**🛠️ How It Works**

 **1️⃣ Select AI Model**

Choose from:

- 🔹 **Together AI (DeepSeek-R1)**
- 🔹 **Fireworks AI (LLaMA 2-13B)**
- 🔹 **Hugging Face (Flan-T5 Large)**

 **2️⃣ Type a Message**

- The bot will show **"Typing..."** while generating a response.
- If **Together AI is selected**, the response is **streamed word-by-word**.
- The final AI-generated response is displayed.

---

 **📝 Code Explanation**

 **🔹 `Chatbot.js` (Main Component)**

- **Handles user input** and **sends API requests**.
- **Displays responses** from the selected AI model.
- **Manages typing indicator and streaming responses**.

javascript
const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");
const [selectedAI, setSelectedAI] = useState("together");
const [isTyping, setIsTyping] = useState(false);




 **🔹 AI API Calls**

Each AI model has **different response formats**, so we handle them correctly.

 **Together AI (DeepSeek-R1)**

- Uses **real-time streaming** for better UX.
- API: `https://api.together.xyz/v1/chat/completions`


{
  model: "deepseek-ai/DeepSeek-R1",
  messages: [{ role: "user", content: input }],
  stream: true
}


 **Fireworks AI (LLaMA 2-13B)**

- API: `https://api.fireworks.ai/inference/v1/completions`

```javascript
{
  model: "accounts/fireworks/models/llama-v2-13b-chat",
  prompt: input,
  max_tokens: 100
}
```

 **Hugging Face (Flan-T5 Large)**

- API: `https://api-inference.huggingface.co/models/google/flan-t5-large`


{
  inputs: input;
}
```

---

 **🎨 UI Design**

- Built with **React Bootstrap** for a clean and responsive UI.
- **Typing Indicator** shows an animated **spinner** while waiting for AI response.


{
  isTyping && (
    <div className="text-start text-muted">
      <Spinner animation="grow" size="sm" /> Bot is typing...
    </div>
  );
}


 **📌 Future Enhancements**

🔹 **Support more AI models** (e.g., OpenAI GPT, Cohere)
🔹 **Add voice input & text-to-speech**
🔹 **Dark mode support**
🔹 **Host on Vercel or Netlify**

---

 **🙌 Contributing**

1. **Fork the repo**
2. **Create a feature branch** (`git checkout -b feature-name`)
3. **Commit your changes** (`git commit -m "Added new feature"`)
4. **Push to GitHub** (`git push origin feature-name`)
5. **Open a Pull Request**

---

 **📜 License**

This project is **open-source** under the **MIT License**.

---

 **📞 Contact**

💡 Created by [**Aman Kamboj**]
📧 Email: **amankamboj2387@gmail.com**
🔗 GitHub: [**https://github.com/amankkamboj/**]
🔗 LinkedIn: [**https://www.linkedin.com/in/freelancer-aman-webdeveloper/**]
````
