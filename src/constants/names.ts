export const commonSurnames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Nkosi",
  "Dlamini",
  "Zulu",
  "Mokoena",
  "Ngcobo",
  "Mabasa",
  "Baloyi",
  "Mokgadi",
  "Mokgopo",
  "Mothapo",
  "Magagane"
];

export const commonGivenNames = [
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Thomas",
  "Mary",
  "Patricia",
  "Jennifer",
  "Linda",
  "Elizabeth",
  "Barbara",
  "Thabo",
  "Sipho",
  "Lerato",
  "Nomsa",
  "Bongani",
  "Tshilidzi",
  "Mpho",
  "Rendani",
  "Ntsako"
];

export const generateRandomName = () => {
  const surname = commonSurnames[Math.floor(Math.random() * commonSurnames.length)];
  const firstName = commonGivenNames[Math.floor(Math.random() * commonGivenNames.length)];
  const useMiddleName = Math.random() > 0.5;
  const middleName = useMiddleName ? commonGivenNames[Math.floor(Math.random() * commonGivenNames.length)] : "";
  
  return {
    surname,
    givenNames: useMiddleName ? `${firstName} ${middleName}` : firstName
  };
}; 