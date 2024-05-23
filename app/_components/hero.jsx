import React from "react";

export default function Hero() {
  return (
    <section className="bg-gray-5">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Track Your Spending
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Master Your Money.{" "}
            </strong>
          </h1>
          <p className="mt-4 sm:text-xl/relaxed">
            Start ceasing your budget and save your money
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-primary-500 sm:w-auto"
              href="/dashboard"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
