import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(
	<StrictMode>
		<ConvexProvider client={convex}>
			<Provider store={store}>
				<App />
			</Provider>
		</ConvexProvider>
	</StrictMode>,
);
