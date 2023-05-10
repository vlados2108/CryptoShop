import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "./trpc";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Show from "./pages/Show";
import SignInForm from "./pages/SignInForm";
import { RegistrationForm } from "./pages/RegistrationForm";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <>
                <SignInForm />
                <RegistrationForm />
              </>
            }
          />
          <Route path="/Home/:userId" element={<Home />} />
          <Route path="/:userId/:id" element={<Show />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </trpc.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
