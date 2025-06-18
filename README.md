# 📊 ReaX: Dynamic Feedback & Insights Platform

**ReaX** is a dynamic, full-stack feedback and analytics platform built for organizations to easily design, deploy, and analyze custom forms for surveys, evaluations, polls, and more.

It allows authenticated administrators to create flexible feedback forms (text, rating, dropdown, etc.), schedule their availability, collect user responses via links/QRs, and visualize aggregated insights through interactive dashboards. ReaX is built with scalability, security, and extensibility in mind.

---

## 🚀 Features

- 🛠️ **Admin Form Builder** — create custom forms with multiple field types
- 🕓 **Scheduled Activation** — forms auto-activate/deactivate based on timing
- 📩 **QR & Link Sharing** — easy distribution to users
- 🔐 **JWT-Based Role Access** — secure separation between admin and respondents
- 📈 **Visual Analytics Dashboard** — post-deadline insights and charts
- 📬 **Email Notifications** — alerts for completed submissions and results

---

## 🧑‍💻 Tech Stack

| Layer       | Tech Used                         |
|------------|-----------------------------------|
| Frontend   | React.js, Vite, Axios             |
| Backend    | Spring Boot, Java, REST APIs      |
| Database   | MongoDB                           |
| Auth       | JWT (JSON Web Tokens)             |
| Deployment | Docker (optional), Netlify/Render |
| Tools      | JIRA, GitHub, VSCode              |

---

## 📁 Folder Structure
reax/                       # Root of your Git repository
├── frontend/               # ReactJS (Vite-based) frontend
│   ├── src/                # App components, pages, hooks, etc.
│   ├── public/             # Static assets (icons, index.html)
│   ├── .env                # API base URL (e.g., VITE_API_BASE_URL)
│   └── package.json        # Dependencies, scripts
│
├── backend/                # Spring Boot backend
│   ├── src/                # Java source code
│   │   └── main/java/...   # Controllers, Services, Models
│   ├── resources/          # `application.properties`, static files
│   ├── .env (optional)     # DB creds or token secrets
│   └── pom.xml             # Maven config (or build.gradle)
│
├── docs/                   # Planning, architecture, flowcharts
│   ├── ERD.png
│   ├── architecture.md
│   └── jira_guidelines.md
│
├── .github/                # GitHub Actions (CI/CD workflows)
│   └── workflows/
│       └── node.yml
│       └── java.yml
│
├── .gitignore              # Global ignores (node_modules, target/, .env)
├── README.md               # Full project guide
└── docker-compose.yml      # Optional: Unified frontend+backend container


## Git Branching Structure Followed
<img width="757" alt="image" src="https://github.com/user-attachments/assets/da1901f2-9401-4225-9ac1-6365a156169f" />
