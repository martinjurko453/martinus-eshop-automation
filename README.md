# 🧪 Martinus E-Shop Automation Project

## 🧭 Project Purpose
This project automates testing of main user flows on the [martinus.sk](https://www.martinus.sk) e-shop, including:
- adding a product to the shopping cart  
- checking that the correct product and price are shown  
- a negative scenario (searching for a non-existing product)

---

## ⚙️ Technologies Used
- **Playwright** – UI automation framework  
- **TypeScript** – strongly typed programming language  
- **Cucumber (Gherkin)** – BDD framework for readable test cases  
- **Node.js + npm** – runtime and package manager  
- **dotenv** – environment configuration  
- **Cucumber HTML report** – for test reporting  

---

## 💻 System Requirements
- Node.js **v18+**  
- npm **v9+**  
- Recommended IDE: **Visual Studio Code**  
- Works on **Windows, macOS, or Linux**

---

## 🔧 Installation
1. Clone this repository:
   ```bash
   git clone <repo-url>
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file:
   ```bash
   BASE_URL=https://www.martinus.sk
   HEADLESS=false
   ```

---

## ▶️ How to Run Tests

### Run all tests:
```bash
npm run test:bdd
```

### Run a specific scenario by tag:
```bash
npm run test:bdd -- --tags "@TC001"
```

### Run with HTML report:
```bash
npm run test:bdd:report
```

After running, you can find the test report here:
```
report.html
```

---

## 👥 Author
**Martin Jurko**  
Test Automation Engineer  
📧 martin.jurko.453@gmail.com  
📍 Bratislava, Slovakia  
