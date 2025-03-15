"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Copy,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export function FakeIdGenerator() {
  const [year, setYear] = useState<string>("90");
  const [month, setMonth] = useState<string>("01");
  const [day, setDay] = useState<string>("01");
  const [gender, setGender] = useState<string>("4"); // Female by default
  const [sequence, setSequence] = useState<string>("896");
  const [citizenship, setCitizenship] = useState<string>("0"); // Citizen by default
  const [idNumber, setIdNumber] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Calculate the Luhn digit
  const calculateCheckDigit = (digitsAsString: string): number => {
    const digits = digitsAsString
      .replace(/\D/g, "")
      .split("")
      .map((d) => Number(d));
    const checkSum = digits
      .reverse()
      .map((d, ix) => {
        if (ix % 2 === 0) {
          d *= 2;
          if (d > 9) {
            d -= 9;
          }
        }
        return d;
      })
      .reduce((memo, d) => (memo += d), 0);
    return (checkSum * 9) % 10;
  };

  // Generate ID number
  const generateIdNumber = () => {
    const withoutCheckDigit = `${year}${month}${day}${gender}${sequence}${citizenship}8`;
    const checkDigit = calculateCheckDigit(withoutCheckDigit);
    setIdNumber(`${withoutCheckDigit}${checkDigit}`);
    toast.success("ID number generated successfully");
  };

  // Generate options for select elements
  const generateOptions = (start: number, end: number, padZero = true) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      const value = padZero && i < 10 ? `0${i}` : `${i}`;
      options.push(value);
    }
    return options;
  };

  // Generate years (20-99)
  const years = generateOptions(20, 99, false);

  // Generate months (01-12)
  const months = generateOptions(1, 12);

  // Generate days (01-31)
  const days = generateOptions(1, 31);

  // Generate sequence numbers (000-999)
  const sequences = Array.from({ length: 1000 }, (_, i) =>
    i.toString().padStart(3, "0")
  );

  // Calculate age based on year
  const calculateAge = (birthYear: string) => {
    const currentYear = new Date().getFullYear();
    const fullBirthYear =
      Number.parseInt(birthYear) < 20
        ? 2000 + Number.parseInt(birthYear)
        : 1900 + Number.parseInt(birthYear);
    return currentYear - fullBirthYear;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateIdNumber();
  };

  // Randomize all fields
  const randomize = () => {
    const randomYear = years[Math.floor(Math.random() * years.length)];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomDay = days[Math.floor(Math.random() * days.length)];
    const randomGender = Math.random() > 0.5 ? "5" : "4";
    const randomSequence =
      sequences[Math.floor(Math.random() * sequences.length)];
    const randomCitizenship = Math.random() > 0.2 ? "0" : "1"; // 80% chance of citizen

    setYear(randomYear);
    setMonth(randomMonth);
    setDay(randomDay);
    setGender(randomGender);
    setSequence(randomSequence);
    setCitizenship(randomCitizenship);

    // Generate ID after a short delay to ensure state updates
    setTimeout(() => {
      generateIdNumber();
    }, 50);
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(idNumber);
    toast.success("Copied to clipboard");
  };

  // Generate ID number on initial render
  useEffect(() => {
    generateIdNumber();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-neutral-900">
          Generate (Fake) South-African ID Numbers
        </h1>
        <Link
          href="/"
          className="inline-flex items-center text-neutral-700 hover:text-black font-medium"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200 lg:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-neutral-900">
                ID Generator
              </h2>
              <button
                type="button"
                onClick={randomize}
                className="bg-black hover:bg-neutral-800 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Randomize
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-neutral-700"
                  aria-label="Year of Birth"
                >
                  Year of Birth
                </label>
                <select
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="block w-full rounded-md border border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y} (~{calculateAge(y)} years old)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="month"
                  className="block text-sm font-medium text-neutral-700"
                  aria-label="Month of Birth"
                >
                  Month of Birth
                </label>
                <select
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="block w-full rounded-md border border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="day"
                  className="block text-sm font-medium text-neutral-700"
                  aria-label="Day of Birth"
                >
                  Day of Birth
                </label>
                <select
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="block w-full rounded-md border border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-neutral-700"
                aria-label="Gender"
              >
                Gender
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="4"
                    checked={gender === "4"}
                    onChange={() => setGender("4")}
                    className="h-4 w-4 text-black focus:ring-neutral-500 border-neutral-300"
                  />
                  <label
                    htmlFor="female"
                    className="ml-2 text-sm text-neutral-700"
                  >
                    Female
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="5"
                    checked={gender === "5"}
                    onChange={() => setGender("5")}
                    className="h-4 w-4 text-black focus:ring-neutral-500 border-neutral-300"
                  />
                  <label
                    htmlFor="male"
                    className="ml-2 text-sm text-neutral-700"
                  >
                    Male
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-neutral-700 hover:text-black text-sm font-medium flex items-center"
              >
                {isOpen ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" /> Hide expert options
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" /> Show expert options
                  </>
                )}
              </button>

              {isOpen && (
                <div className="mt-4 space-y-4 p-4 bg-neutral-50 rounded-md border border-neutral-200">
                  <div className="space-y-2">
                    <label
                      htmlFor="sequence"
                      className="block text-sm font-medium text-neutral-700"
                      aria-label="Sequence"
                    >
                      Sequence
                    </label>
                    <select
                      id="sequence"
                      value={sequence}
                      onChange={(e) => setSequence(e.target.value)}
                      className="block w-full rounded-md border border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    >
                      {/* Only show a subset of sequences to avoid performance issues */}
                      {sequences.slice(0, 100).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-medium text-neutral-700"
                      aria-label="Citizenship"
                    >
                      Citizenship
                    </label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="citizen"
                          name="citizenship"
                          value="0"
                          checked={citizenship === "0"}
                          onChange={() => setCitizenship("0")}
                          className="h-4 w-4 text-black focus:ring-neutral-500 border-neutral-300"
                        />
                        <label
                          htmlFor="citizen"
                          className="ml-2 text-sm text-neutral-700"
                        >
                          Citizen
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="resident"
                          name="citizenship"
                          value="1"
                          checked={citizenship === "1"}
                          onChange={() => setCitizenship("1")}
                          className="h-4 w-4 text-black focus:ring-neutral-500 border-neutral-300"
                        />
                        <label
                          htmlFor="resident"
                          className="ml-2 text-sm text-neutral-700"
                        >
                          Resident
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-black hover:bg-neutral-800 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
              aria-label="Generate ID Number"
            >
              Generate ID Number
            </button>
          </form>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200 sticky top-4">
            <h2 className="text-xl font-semibold mb-4 text-neutral-900">
              Result
            </h2>
            <div className="p-4 bg-neutral-50 rounded-md border border-neutral-200">
              <p className="text-lg font-mono break-all text-neutral-800">
                {idNumber}
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={copyToClipboard}
                className="text-sm text-neutral-700 hover:text-black font-medium flex items-center"
              >
                <Copy className="w-4 h-4 mr-1" /> Copy to clipboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-56 max-w-7xl mx-auto left-0 right-0 bg-white p-4 border-t border-neutral-200">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900">
          More Information
        </h2>
        <p className="mb-2 text-neutral-700">
          See{" "}
          <a
            href="https://en.wikipedia.org/wiki/National_identification_number#South_Africa"
            className="text-neutral-900 hover:underline font-medium"
          >
            Wikipedia
          </a>{" "}
          or{" "}
          <a
            href="http://knowles.co.za/generating-south-african-id-numbers/"
            className="text-neutral-900 hover:underline font-medium"
          >
            this article
          </a>{" "}
          for more details about South African ID numbers.
        </p>
        <p className="text-neutral-700">
          Read{" "}
          <a
            href="https://github.com/Chris927/generate-sa-idnumbers"
            className="text-neutral-900 hover:underline font-medium"
          >
            the code
          </a>{" "}
          on GitHub.
        </p>
      </div>
    </div>
  );
}
