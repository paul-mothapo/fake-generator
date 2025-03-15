"use client";

import type React from "react";
import { useState } from "react";
import { Copy, RefreshCw, ChevronDown, ChevronUp, ChevronLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { nationalities } from "@/constants/countries";
import { generatePassportNumber } from "@/constants/randomPassport";
import { commonCities } from "@/constants/cities";
import { generateRandomDates } from "@/constants/dateUtils";
import { generateRandomName } from "@/constants/names";

export function FakePassportGenerator() {
  const [surname, setSurname] = useState<string>("");
  const [givenNames, setGivenNames] = useState<string>("");
  const [nationality, setNationality] = useState<string>("ZAF");
  const [birthDate, setBirthDate] = useState<string>("");
  const [placeOfBirth, setPlaceOfBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("F");
  const [dateOfIssue, setDateOfIssue] = useState<string>("");
  const [dateOfExpiry, setDateOfExpiry] = useState<string>("");
  const [passportNumber, setPassportNumber] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isJsonFormat, setIsJsonFormat] = useState<boolean>(true);

  const randomize = () => {
    const randomCity = commonCities[Math.floor(Math.random() * commonCities.length)];
    const randomNationality = nationalities[Math.floor(Math.random() * nationalities.length)];
    const randomName = generateRandomName();
    
    setSurname(randomName.surname);
    setGivenNames(randomName.givenNames);
    setNationality(randomNationality.code);
    setPlaceOfBirth(randomCity);
    setGender(Math.random() > 0.5 ? "M" : "F");
    
    const dates = generateRandomDates();
    setBirthDate(dates.birthDate);
    setDateOfIssue(dates.dateOfIssue);
    setDateOfExpiry(dates.dateOfExpiry);
    
    const newPassportNumber = generatePassportNumber();
    setPassportNumber(newPassportNumber);
  };

  const copyToClipboard = (field?: string) => {
    if (field) {
      let value = "";
      switch (field) {
        case "surname":
          value = surname;
          break;
        case "givenNames":
          value = givenNames;
          break;
        case "nationality":
          value = nationality;
          break;
        case "birthDate":
          value = birthDate;
          break;
        case "placeOfBirth":
          value = placeOfBirth;
          break;
        case "gender":
          value = gender;
          break;
        case "dateOfIssue":
          value = dateOfIssue;
          break;
        case "dateOfExpiry":
          value = dateOfExpiry;
          break;
        case "passportNumber":
          value = passportNumber;
          break;
      }
      navigator.clipboard.writeText(value);
      toast.success(`Copied ${field} to clipboard`);
    } else {
      const passportData = {
        surname,
        givenNames,
        nationality,
        birthDate,
        placeOfBirth,
        gender,
        dateOfIssue,
        dateOfExpiry,
        passportNumber
      };

      if (isJsonFormat) {
        navigator.clipboard.writeText(JSON.stringify(passportData, null, 2));
      } else {
        const plainText = Object.entries(passportData)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');
        navigator.clipboard.writeText(plainText);
      }
      toast.success("Copied all details to clipboard");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPassportNumber = generatePassportNumber();
    setPassportNumber(newPassportNumber);
    toast.success("Passport number generated successfully");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-neutral-900">
          Generate (Fake) Passport Details
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
                Passport Generator
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Surname
                </label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="block w-full rounded-md border border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Given Names
                </label>
                <input
                  type="text"
                  value={givenNames}
                  onChange={(e) => setGivenNames(e.target.value)}
                  className="block w-full rounded-md border border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Nationality
                </label>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="block w-full rounded-md border border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                >
                  {nationalities.map((nat) => (
                    <option key={nat.code} value={nat.code}>
                      {nat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="block w-full rounded-md border border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Place of Birth
                </label>
                <input
                  type="text"
                  value={placeOfBirth}
                  onChange={(e) => setPlaceOfBirth(e.target.value)}
                  className="block w-full rounded-md border border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Gender
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="F"
                      checked={gender === "F"}
                      onChange={() => setGender("F")}
                      className="h-4 w-4 text-black focus:ring-neutral-500 border-neutral-300"
                    />
                    <label htmlFor="female" className="ml-2 text-sm text-neutral-700">
                      Female
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="M"
                      checked={gender === "M"}
                      onChange={() => setGender("M")}
                      className="h-4 w-4 text-black focus:ring-neutral-500 border-neutral-300"
                    />
                    <label htmlFor="male" className="ml-2 text-sm text-neutral-700">
                      Male
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-700 hover:text-black text-sm font-medium flex items-center"
            >
              {isOpen ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" /> Hide additional details
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" /> Show additional details
                </>
              )}
            </button>

            {isOpen && (
              <div className="mt-4 space-y-4 p-4 bg-neutral-50 rounded-md border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Date of Issue
                    </label>
                    <input
                      type="date"
                      value={dateOfIssue}
                      onChange={(e) => setDateOfIssue(e.target.value)}
                      className="block w-full rounded-md border border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Date of Expiry
                    </label>
                    <input
                      type="date"
                      value={dateOfExpiry}
                      onChange={(e) => setDateOfExpiry(e.target.value)}
                      className="block w-full rounded-md border border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="bg-black hover:bg-neutral-800 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
            >
              Generate Passport Number
            </button>
          </form>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200 sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-neutral-900">Result</h2>
              <button
                onClick={() => setIsJsonFormat(!isJsonFormat)}
                className="text-sm text-neutral-600 hover:text-black underline"
              >
                Switch to {isJsonFormat ? "Plain Text" : "JSON"}
              </button>
            </div>
            <div className="p-4 bg-neutral-50 rounded-md border border-neutral-200">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-neutral-600">Passport Number</p>
                  <button
                    onClick={() => copyToClipboard("passportNumber")}
                    className="text-xs text-neutral-500 hover:text-black"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-lg font-mono break-all text-neutral-800">
                  {passportNumber}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <p className="text-sm text-neutral-600 mb-2">Full Details</p>
                {isJsonFormat ? (
                  <pre className="text-sm font-mono break-all text-neutral-800 whitespace-pre-wrap">
                    {JSON.stringify(
                      {
                        surname,
                        givenNames,
                        nationality,
                        birthDate,
                        placeOfBirth,
                        gender,
                        dateOfIssue,
                        dateOfExpiry,
                        passportNumber,
                      },
                      null,
                      2
                    )}
                  </pre>
                ) : (
                  <div className="space-y-2">
                    {[
                      { key: "surname", value: surname },
                      { key: "givenNames", value: givenNames },
                      { key: "nationality", value: nationality },
                      { key: "birthDate", value: birthDate },
                      { key: "placeOfBirth", value: placeOfBirth },
                      { key: "gender", value: gender },
                      { key: "dateOfIssue", value: dateOfIssue },
                      { key: "dateOfExpiry", value: dateOfExpiry },
                      { key: "passportNumber", value: passportNumber },
                    ].map(({ key, value }) => (
                      <div key={key} className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-neutral-600">{key}: </span>
                          <span className="font-mono text-neutral-800">{value}</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(key)}
                          className="text-neutral-500 hover:text-black"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => copyToClipboard()}
                className="text-sm text-neutral-700 hover:text-black font-medium flex items-center"
              >
                <Copy className="w-4 h-4 mr-1" /> Copy all to clipboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900">
          Important Notice
        </h2>
        <p className="text-neutral-700">
          This passport generator is for testing and educational purposes only. The generated
          passports are not valid for any official use and should not be used for any
          illegal activities.
        </p>
      </div>
    </div>
  );
}
