import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TransactionsPage from "./app/transactions/TransactionsPage.jsx";
import TransactionInfoPage from "./app/transactionInfo/TransactionInfoPage.jsx";

const router = createBrowserRouter([
    {
        path: "/transactions",
        element: <TransactionsPage />,
    },
    {
        path: "/transactions/:transactionHash",
        element: <TransactionInfoPage />,
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
