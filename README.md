# RSD (رصد) - AI-Powered Smart Monitoring System

**🏆 Winner of the Sharqiah Government Innovation Hackathon (هاكاثون الابتكار الحكومي بالمنطقة الشرقية)**

RSD is an advanced, AI-driven monitoring and analysis dashboard designed specifically for government entities, particularly the Eastern Province Principality (إمارة المنطقة الشرقية) in Saudi Arabia. It serves as a centralized hub for real-time tracking, sentiment analysis, and predictive modeling of public complaints and governmental performance.

The platform leverages artificial intelligence to transform raw public feedback and complaints into actionable insights, proactively identifying emerging patterns and issuing automated recommendations to decision-makers.

## Key Features

*   **AI Hub (مركز الذكاء):**
    *   **Real-time Feed:** Live stream of incoming events and complaints categorized by sentiment and priority.
    *   **Emerging Patterns:** AI-detected trends and recurring issues before they escalate.
    *   **Automated Recommendations:** Smart, context-aware suggestions for decision-makers (e.g., escalating issues, assigning tasks).
    *   **Predictive Analytics:** Forecasting potential crises based on historical data and current sentiment.
*   **Interactive GIS Mapping:**
    *   **Heatmaps:** Visualizing complaint density and severity across various cities and districts in the Eastern Province.
    *   **Geospatial Analysis:** Pinpointing high-risk zones that require immediate intervention.
*   **Entity Performance Tracking:**
    *   **Leaderboards:** Ranking government departments based on their response times, resolution rates, and public sentiment score.
    *   **Detailed Entity Profiles:** In-depth metrics, word clouds of public feedback, and historical performance charts for individual ministries and municipalities.
*   **Advanced Complaint Management:**
    *   **Smart Tables:** Rich data grids with advanced filtering, sorting, and AI-assigned risk scoring.
    *   **Escalation Workflows:** Tracking the lifecycle of a complaint from submission to resolution, including inter-departmental escalations.
*   **Professional UI/UX:**
    *   **Government Aesthetic:** A precise, muted, and highly professional color palette utilizing official Saudi Green and semantic colors (Amber, Blue, Red) to convey information clearly without visual clutter.
    *   **Responsive Design:** Fully optimized for desktop, tablet, and mobile viewing.
    *   **Micro-interactions:** Smooth animations and transitions to enhance usability and modern feel.

## Technology Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Charts:** [Recharts](https://recharts.org/)
*   **Mapping:** Embedded SVG/Custom mapping components tailored for Saudi Arabia.

## Project Structure

```text
sharqiah-hackaton/
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
│   ├── components/       # Reusable UI components
│   │   ├── AIHub/        # AI-specific dashboard components
│   │   └── ...           # Shared components (Sidebar, Header, Maps, Tables)
│   ├── complaints/       # Complaint list and detailed view pages
│   ├── entity/           # Entity/Ministry detailed view pages
│   ├── login/            # Authentication page
│   ├── globals.css       # Global styles, variables, and custom animations
│   ├── layout.tsx        # Root layout including Sidebar and Header
│   └── page.tsx          # Main Dashboard Home (Overview)
├── public/               # Static assets (images, fonts, mock data)
├── tailwind.config.ts    # Tailwind CSS configuration and custom color themes
└── package.json          # Project dependencies and scripts
```

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your machine.

### Installation

1.  **Clone the repository:**
    *(Assuming you have the repository URL)*
    ```bash
    git clone <repository-url>
    cd sharqiah-hackaton
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn/pnpm:
    ```bash
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

*Developed for and won the Sharqiah Government Innovation Hackathon (هاكاثون الابتكار الحكومي بالمنطقة الشرقية).*
