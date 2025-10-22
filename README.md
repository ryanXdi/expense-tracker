# Expense Tracker

A full-stack expense tracking application built with React and Node.js that helps users manage their income and expenses with category-based tracking and filtering.

## Features

- Add, view, and delete transactions
- Categorize expenses (Food, Transport, Entertainment, Bills, Shopping, Healthcare, Education, Other)
- Track income separately from expenses
- Filter transactions by time period (Today, This Week, This Month, All Time)
- Filter by category
- Real-time balance calculation
- Category-wise expense summary with visual progress bars
- Pagination for transaction history (10 per page)
- Tab-based navigation for better UX
- MongoDB database for data persistence

## Tech Stack

**Frontend:**
- React 19.1.1
- Context API for state management
- CSS3 with gradient styling

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- RESTful API architecture

## Project Structure

```
expense-tracker-react/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Transaction.js
│   ├── routes/
│   │   └── transactions.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTransaction.js
│   │   │   ├── Balance.js
│   │   │   ├── CategorySummary.js
│   │   │   ├── FilterControls.js
│   │   │   ├── Header.js
│   │   │   ├── IncomeExpenses.js
│   │   │   ├── Transaction.js
│   │   │   └── TransactionList.js
│   │   ├── context/
│   │   │   ├── AppReducer.js
│   │   │   └── GlobalState.js
│   │   ├── utils/
│   │   │   └── filterUtils.js
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── render.yaml
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

Backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Usage

1. **Add Transaction**: Click on "Add New" tab, enter description and amount (negative for expenses, positive for income)
2. **View Transactions**: See all transactions in the "Transactions" tab with pagination
3. **Filter**: Use time period and category filters to narrow down transactions
4. **View Summary**: Check the "Summary" tab for category-wise expense breakdown
5. **Delete Transaction**: Click the 'x' button on any transaction to remove it

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions` | Create new transaction |
| DELETE | `/api/transactions/:id` | Delete transaction by ID |

## Database Schema

**Transaction Model:**
```javascript
{
  text: String (required),
  amount: Number (required),
  category: String (enum),
  date: Date (default: now),
  timestamps: true
}
```

## Deployment

The application is configured for deployment on Render using the `render.yaml` blueprint file.

### Deploy Steps:

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Deploy using the blueprint

## Environment Variables

- `PORT` - Server port (default: 5001)
- `MONGO_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## License

MIT
