
export const generatePassportNumber = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let number = "";

    for (let i = 0; i < 2; i++) {
      number += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 7; i++) {
      number += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return number;
  };