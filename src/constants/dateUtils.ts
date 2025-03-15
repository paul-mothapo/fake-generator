export const generateRandomDates = () => {
  const now = new Date();
  
  const minBirthYear = now.getFullYear() - 80;
  const maxBirthYear = now.getFullYear() - 18;
  const birthYear = Math.floor(Math.random() * (maxBirthYear - minBirthYear + 1)) + minBirthYear;
  const birthMonth = Math.floor(Math.random() * 12) + 1;
  const birthDay = Math.floor(Math.random() * 28) + 1;
  const birthDateStr = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;
  
  const maxIssueYearsAgo = 9;
  const issueDate = new Date();
  issueDate.setFullYear(now.getFullYear() - Math.floor(Math.random() * maxIssueYearsAgo));
  
  const expiryDate = new Date(issueDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + 10);
  
  return {
    birthDate: birthDateStr,
    dateOfIssue: issueDate.toISOString().split('T')[0],
    dateOfExpiry: expiryDate.toISOString().split('T')[0]
  };
}; 