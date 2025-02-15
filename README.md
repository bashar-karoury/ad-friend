# Ad-Friend - Chrome Extension

Ad-Friend is a Chrome extension that replaces online ads with **customized content**, such as motivational quotes, jokes, stress-relief messages, and more. Instead of intrusive advertisements, you can now enjoy **meaningful and engaging content** while browsing the web.

## Features
- 🚀 **Ad Replacement**: Automatically replaces ads with personalized content.
- 🎨 **Custom Categories**: Choose from various categories like **Motivational, Jokes, Riddles, Quotes, and more**.
- ⚡ **Lightweight & Fast**: Minimal impact on browsing speed and performance.

## Installation
### From Chrome Web Store (Coming Soon)
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore/).
2. Search for **Ad-Friend**.
3. Click **Add to Chrome** and confirm installation.

### Manual Installation (Developer Mode)
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ad-friend.git
   ```
2. Open **Google Chrome** and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle at the top-right corner).
4. Click **Load unpacked** and select the cloned repository folder.
5. The extension will now be installed and active!

## Usage
1. Click on the **Ad-Friend** extension icon in the Chrome toolbar.
2. Select a content category (Motivational, Jokes, Riddles, etc.).
3. Enjoy an ad-free and customized browsing experience!

## Development
### Tech Stack
- **JavaScript** for content scripts and background processes.
- **Manifest v3** for Chrome extension compatibility.
- **HTML/CSS** for UI customization.
- **Local Storage** for user preferences (future API integration planned).

### Folder Structure
```
/ad-friend
│── /src
│   │── content.js  # Handles ad replacement logic
│   │── background.js  # Manages extension lifecycle
│   │── popup.html  # UI for category selection
│   │── styles.css  # Popup styling
│── manifest.json  # Extension configuration
│── README.md  # Project documentation
```

## Roadmap
- ✅ **Basic ad replacement functionality**
- ✅ **Custom content categories**
- ⏳ **User preferences for personalized selection**
- ⏳ **Dynamic content fetching for fresh updates**
- ⏳ **Enhanced AI-generated content**

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Make your changes and commit:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push to your fork and submit a Pull Request.

## License
This project is licensed under the **MIT License**.

## Contact
For questions or suggestions, reach out via **[GitHub Issues](https://github.com/bashar-karoury/ad-friend/issues)** or email **basharalkaroury@hotmail.com**.

---
✨ Enjoy distraction-free browsing with **Ad-Friend**! ✨

