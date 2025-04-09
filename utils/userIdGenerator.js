let counter = 1;
function generateUserId(role) {
  if (role === 'admin') return 'ADMIN01';
  const id = `USER${String(counter++).padStart(3, '0')}`;
  return id;
}
module.exports = generateUserId;
