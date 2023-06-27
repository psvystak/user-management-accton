export const generateUUID = (users) => {
  const hexDigits = '0123456789abcdefghijklmnopqrstuvwxyz';
  const arrayOfIds = users.map((user) => user.id);
  let uuid = '';

  for (let i = 0; i < 32; i += 1) {
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += hexDigits[Math.floor(Math.random() * 16)];
  }

  if (arrayOfIds.includes(uuid)) {
    return generateUUID(users);
  }
  return uuid;
};
