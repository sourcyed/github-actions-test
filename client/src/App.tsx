import { useState } from "react";
import { CategoryForm } from "./components/CategoryForm";
import { CategoryList } from "./components/CategoryList";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseTotal } from "./components/ExpenseTotal";
import { useCategories } from "./hooks/useCategories";
import { useExpenses } from "./hooks/useExpenses";

type View = "expenses" | "categories";

// Composition root: wires the data hook to the presentational components.
// No fetch/state logic here on purpose — see hooks/useExpenses.ts.
function App() {
	const { expenses, addExpense, editExpense, removeExpense } = useExpenses();
	const [view, setView] = useState<View>("expenses");
	const { categories, addCategory, editCategory, removeCategory } =
		useCategories();
	return (
		<>
			<nav className="view-nav">
				<button
					type="button"
					onClick={() => setView("expenses")}
					disabled={view === "expenses"}
					style={{ marginLeft: 10, marginRight: 10 }}
				>
					Expenses
				</button>
				<button
					type="button"
					onClick={() => setView("categories")}
					disabled={view === "categories"}
				>
					Categories
				</button>
			</nav>
			<h1>Expense tracker</h1>
			{view === "expenses" ? (
				<div>
					<ExpenseForm onAdd={addExpense} />
					<ExpenseList
						expenses={expenses}
						onUpdate={editExpense}
						onDelete={removeExpense}
					/>
				</div>
			) : (
				<div>
					<CategoryForm onAdd={addCategory} />
					<CategoryList
						categories={categories}
						onUpdate={editCategory}
						onDelete={removeCategory}
					/>
				</div>
			)}
			<ExpenseTotal expenses={expenses} />
		</>
	);
}

export default App;
